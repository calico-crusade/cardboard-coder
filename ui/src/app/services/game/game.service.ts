import { Injectable } from "@angular/core";
import { NuMonacoEditorComponent } from "@ng-util/monaco-editor";

type NuModel = monaco.editor.ITextModel;
type NuLib = monaco.IDisposable;

const CHARACTER_CODE = `
(function execute(Player) {
    <!-- CODE HERE -->
    return Player.actions;
})`

export interface AstAction {
    name: string;
    parameters: any[];
}

class CharacterClass {
    actions: AstAction[] = [];

    constructor(public max: number) {}

    addAction(name: string, ...args: any[]) { 
        this.actions.push({ name, parameters: [ ...args ] }); 
        if (this.actions.length > this.max)
            throw 'Too many actions';
    }
    move(dir: string) { this.addAction('move', dir) }
    jump(dir: string) { this.addAction('jump', dir); }
    attack(dir: string, count: number) { this.addAction('attack', dir, count); }

    up() { this.move('up'); }
    down() { this.move('down'); }
    left() { this.move('left'); }
    right() { this.move('right'); }
}

@Injectable({ providedIn: 'root' })
export class GameService {

    private static libs: {
        [key: string]: { 
            model: NuModel; 
            library: NuLib;
        }
    } = {};

    getLib(url: string) { return GameService.libs[url] || { model: undefined, library: undefined }; }
    setLib(url: string, model: NuModel, library: NuLib) { GameService.libs[url] = { model, library }; }

    compile(code: string, max: number = 30): { actions: AstAction[], error?: string } {
        const output = CHARACTER_CODE.replace('<!-- CODE HERE -->', code);
        let cha = new CharacterClass(max);
        try {
            let actions = eval(output)(cha);
            return { actions };
        }
        catch (err: any) {
            return { actions: [], error: err?.toString() }
        }
    }

    applyIntellisense(code: string, uri: string = 'ts:game/actions.d.ts') {
        let { model, library } = this.getLib(uri);
        model?.dispose();
        library?.dispose();
        library = monaco.languages.typescript.javascriptDefaults.addExtraLib(code, uri);
        model = monaco.editor.createModel(code, 'typescript', monaco.Uri.parse(uri));
        this.setLib(uri, model, library);
    }

    readonly(comp: NuMonacoEditorComponent, value: boolean) {
        comp.editor.updateOptions({ readOnly: value });
    }
}