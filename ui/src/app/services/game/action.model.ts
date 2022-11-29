export interface IAction {
    name: string;
    declaration: string;
    parameters: string[];
}

export const ALL_ACTIONS: IAction[] = [
    {
        name: 'move',
        declaration: `/**
* Moves the character in the given direction.
* @param dir The direction to move the character in
*/
static move(dir: 'up' | 'down' | 'left' | 'right'): void;`,
        parameters: ['string']
    },
    {
        name: 'jump',
        declaration: `/**
* Jumps the character in the given direction. 
* Can be used to traverse holes.
* @param dir The direction to jump the character in
*/
static jump(dir: 'up' | 'down' | 'left' | 'right'): void;`,
        parameters: ['string']
    },
    {
        name: 'attack',
    declaration: `/**
* Attacks with the character in the given direction
* @param dir The direction to attack in
* @param power How much power to put behind the attack
*/
static attack(dir: 'up' | 'down' | 'left' | 'right', power: number): void;`,
    parameters: ['string', 'number']
    },
    {
        name: 'up',
        parameters: [],
        declaration: `/** 
* Moves the character up a square 
*/
static up(): void;`
    },
    {
        name: 'down',
        parameters: [],
        declaration: `/** 
* Moves the character down a square
*/
static down(): void;`
    },
    {
        name: 'left',
        parameters: [],
        declaration: `/** 
* Moves the character left a square 
*/
static left(): void;`
    },
    {
        name: 'right',
        parameters: [],
        declaration: `/** 
* Moves the character right a square 
*/
static right(): void;`
    }
];