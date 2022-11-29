import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NuMonacoEditorComponent, NuMonacoEditorEvent } from '@ng-util/monaco-editor';
import { ModalComponent, ModalService } from 'src/app/components';
import { ALL_ACTIONS, AstAction, GameService, IAction, Level, LEVELS, SubscriptionHandler, UtilityService } from 'src/app/services';
import { ActionResult, ProcessorService } from 'src/app/services/game/processor.service';

@Component({
    templateUrl: './level.component.html',
    styleUrls: ['./level.component.scss']
})
export class LevelComponent implements OnInit, OnDestroy {

    private _subs = new SubscriptionHandler();
    private _readonly = false;

    @ViewChild('actionspop') compilationPopup!: ModalComponent;
    @ViewChild('editor') editor!: NuMonacoEditorComponent;

    loading: boolean = false;
    id!: string;
    level!: Level;
    code: string = '';
    actions: IAction[] = [];

    compilation: AstAction[] = [];
    error?: string;

    get readonly() { return this._readonly; }
    set readonly(value: boolean) {
        this._readonly = value;
        this._game.readonly(this.editor, value);
    }

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _game: GameService,
        private _modal: ModalService,
        private _util: UtilityService,
        private _process: ProcessorService
    ) { }

    ngOnInit(): void {
        this._subs
            .subscribe(this._route.params, t => {
                this.loading = true;
                this.id = t['id'];
                this.reset();
                this.loading = false;
            });
    }

    ngOnDestroy(): void {
        this._subs.unsubscribe();
    }

    nuOnInit(event: NuMonacoEditorEvent) {
        if (event.type !== 'init') return;

        const items = this.actions.map(t => t.declaration).join('\n');
        const code = `/**
        * Represents an instance of the current character
        */
        declare class Player {
            ${items}
        }`;
        this._game.applyIntellisense(code);
    }

    compile() {
        const { actions, error } = this._game.compile(this.code);
        this.compilation = actions;
        this.error = error;
        this._modal.show(this.compilationPopup);
    }

    async play() {
        this.readonly = true;
        this.reset(false);

        const { game, error, actions } = await this._process.create(this.code, this.level);
        if (error || !game) {
            this.readonly = false;
            return;
        }

        for(let action of actions) {
            const perform = game.next(action);
            console.log('Action', {
                action,
                perform,
                game,
                actions
            });

            if (perform === ActionResult.Success) {
                await this._util.sleep(0.1);
                continue;
            }

            if (perform === ActionResult.Finished) {
                this.readonly = false;
                return;
            }

            await this._process.error(perform);
            this.readonly = false;
            return;
        }

        await this._process.error('Puzzel was not completed!');
        this.readonly = false;
    }

    reset(setCode: boolean = true) {
        const level = LEVELS.get(this.id);
        if (!level) {
            this._router.navigate(['/dashboard']);
            return;
        }

        this.level = level;
        if (setCode) this.code = level.startingCode;
        this.actions = ALL_ACTIONS.filter(t => level.availableActions.indexOf(t.name) !== -1);
    }
}
