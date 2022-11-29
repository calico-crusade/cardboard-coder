/**
 * Represents an instance of the current character
 */
declare class CharacterModel {

    /**
     * Moves the character in the given direction.
     * @param dir The direction to move the character in
     */
    static move(dir: 'forward' | 'backward' | 'left' | 'right'): void;

    /**
     * Jumps the character in the given direction. 
     * Can be used to traverse holes.
     * @param dir The direction to jump the character in
     */
    static jump(dir: 'forward' | 'backward' | 'left' | 'right'): void;
    
    /**
     * Attacks with the character in the given direction
     * @param dir The direction to attack in
     * @param power How much power to put behind the attack
     */
    static attack(dir: 'forward' | 'backward' | 'left' | 'right', power: number): void;

    /** 
     * Moves the character up a square 
     */
    static up(): void;

    /** 
     * Moves the character down a square
     */
    static down(): void;

    /** 
     * Moves the character left a square 
     */
    static left(): void;

    /** 
     * Moves the character right a square 
     */
    static right(): void;
}