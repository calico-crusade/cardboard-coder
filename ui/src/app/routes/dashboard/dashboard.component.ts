import { Component, OnInit, ViewChild } from '@angular/core';
import { NuMonacoEditorEvent } from '@ng-util/monaco-editor';
import { ModalComponent, ModalService } from 'src/app/components';
import { ALL_ACTIONS, AstAction, GameService, IAction } from 'src/app/services';

const MODELS = `declare function move(dir: 'forward' | 'backward' | 'left' | 'right', count: number = 1): boolean;`;
const NEXT_MODELS = MODELS + `
declare function jump(dir: 'forward' | 'backward' | 'left' | 'right'): boolean;
declare function attack(dir: 'forward' | 'backward' | 'left' | 'right', power: number = 1): boolean;
`;

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

    code = `Character.move('forward');
Character.move('left');
Character.jump('forward');

//Do some stuff`;

    constructor(
        private _srv: GameService,
        private _mdl: ModalService
    ) { }

    ngOnInit(): void {
        
    }

    onInit(editor: NuMonacoEditorEvent) {
        if (editor.type !== 'init') return;
        const model = this.generateModel(ALL_ACTIONS);
        this.updateInteli(model);
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
declare class Character {
    ${items}
}`
    }

    private updateInteli(model: string) {
        if (this.lib) this.lib.dispose();
        if (this.model) this.model.dispose();

        // extra libraries
        const libSource = model;
        const libUri = 'ts:filename/actions.d.ts';
        this.lib = monaco.languages.typescript.javascriptDefaults.addExtraLib(libSource, libUri);
        this.model = monaco.editor.createModel(libSource, 'typescript', monaco.Uri.parse(libUri));
    }
}
