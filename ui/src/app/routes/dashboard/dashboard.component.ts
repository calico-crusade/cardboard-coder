import { Component, OnInit, ViewChild } from '@angular/core';
import { NuMonacoEditorEvent } from '@ng-util/monaco-editor';
import { ModalComponent, ModalService } from 'src/app/components';
import { ALL_ACTIONS, AstAction, GameService, IAction } from 'src/app/services';

@Component({
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    private model?: monaco.editor.ITextModel;
    private lib?: monaco.IDisposable;

    @ViewChild('actionspop') actionsPopup!: ModalComponent;
    @ViewChild('designerpop') designerPopup!: ModalComponent;
    actions: AstAction[] = [];
    error?: string;

    options = {
        theme: 'vs-dark',
        language: 'javascript'
    }

    code = `Player.move('up');
Player.move('left');
Player.jump('up');

//Do some stuff`;

    constructor(
        private _srv: GameService,
        private _mdl: ModalService
    ) { }

    ngOnInit(): void {
        
    }

    onInit(editor: NuMonacoEditorEvent) {
        if (editor.type !== 'init') return;
        const code = this.generateModel(ALL_ACTIONS);
        this._srv.applyIntellisense(code);
    }

    compile() {
        const { actions, error } = this._srv.compile(this.code);
        this.actions = actions;
        this.error = error;
        this._mdl.show(this.actionsPopup);
    }

    designer() {
        this._mdl.show(this.designerPopup);
    }

    private generateModel(actions: IAction[]) {
        const items = actions.map(t => t.declaration).join('\n');
        return `/**
* Represents an instance of the current character
*/
declare class Player {
    ${items}
}`
    }
}
