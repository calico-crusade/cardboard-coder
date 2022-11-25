import { Injectable } from "@angular/core";

const CHARACTER_CODE = `
(function execute(Character) {
    <!-- CODE HERE -->
    return Character.actions;
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
}

@Injectable({ providedIn: 'root' })
export class GameService {

    compile(code: string): { actions: AstAction[], error?: string } {
        const output = CHARACTER_CODE.replace('<!-- CODE HERE -->', code);
        let cha = new CharacterClass(30);
        try {
            let actions = eval(output)(cha);
            return { actions };
        }
        catch (err: any) {
            return { actions: [], error: err?.toString() }
        }
    }
}