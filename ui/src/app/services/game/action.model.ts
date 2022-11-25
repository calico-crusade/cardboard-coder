export interface IAst {

}

export interface IAction {
    name: string;
    declaration: string;
    parameters: string[];

    execute: (pars: any[]) => IAst;
}

export class Move implements IAction {
    name = 'move';
    declaration = `/**
    * Moves the character in the given direction.
    * @param dir The direction to move the character in
    */
   static move(dir: 'forward' | 'backward' | 'left' | 'right'): void;`
    parameters = ['string'];

    execute(pars: any[]) {
        return { }
    }
}

export class Jump implements IAction {
    name = 'jump';
    declaration = `/**
    * Jumps the character in the given direction. 
    * Can be used to traverse holes.
    * @param dir The direction to jump the character in
    */
   static jump(dir: 'forward' | 'backward' | 'left' | 'right'): void;`
    parameters = ['string'];

    execute(pars: any[]) {
        return { }
    }
}

export class Attack implements IAction {
    name = 'attack';
    declaration = `/**
    * Attacks with the character in the given direction
    * @param dir The direction to attack in
    * @param power How much power to put behind the attack
    */
   static attack(dir: 'forward' | 'backward' | 'left' | 'right', power: number): void;`
    parameters = ['string', 'number'];

    execute(pars: any[]) {
        return { }
    }
}

export const ALL_ACTIONS = [
    new Move(),
    new Jump(),
    new Attack()
];