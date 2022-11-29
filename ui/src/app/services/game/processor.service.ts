import { Injectable } from "@angular/core";
import { ModalService } from "src/app/components";
import { AstAction, GameService } from "./game.service";
import { Level } from "./level.model";

export type Point = { x: number, y: number };

export enum ActionResult {
    Finished = 'You have completed the puzzel! GG!',
    Success = 'The action completed successfully',
    NoMoreActions = 'You have reached the maximum number of available actions',
    UnknownAction = 'Could not determine the type of action',
    UnknownPosition = 'Could not determine the players position',
    UnknownDirection = 'Invalid direction value. Acceptable values are: up, left, right, and down.',
    NotEnoughStamina = "You don't have enough stamina to complete this action.",
    InvalidTarget = 'The actions target location is invalid.',
    MoveTargetInvalid = 'The square you attempted to move to was not free.'
}

export class PlayInstance {

    get position(): Point {
        for(let x = 0; x < this.level.gridSize; x++)
        for(let y = 0; y < this.level.gridSize; y++)
            if (this.level.board[y][x].key === 'player') 
                return { x, y };
        return { x: -1, y: -1 };
    }

    public staminaUsed: number = 0;

    constructor(
        public level: Level,
        public actions: AstAction[]
    ) { }

    get(pos: Point) {
        const cols = this.level.board[pos.y];
        if (!cols) return undefined;
        return cols[pos.x];
    }

    next(action: AstAction) {
        switch(action.name) {
            case 'move': return this.move(action.parameters[0]);
            case 'jump': return this.jump(action.parameters[0]);
            case 'attack': return this.attack(action.parameters[0], action.parameters[1]);
        }

        return ActionResult.UnknownAction;
    }

    validateDirection(dir: string) { return ['up', 'down', 'left', 'right'].indexOf(dir) !== -1; }

    validatePosition(pos?: Point) { return !!pos && pos.x >= 0 && pos.y >= 0; }

    swap(a: Point, b: Point) {
        const source = this.level.board[a.y][a.x];
        const target = this.level.board[b.y][b.x];

        this.level.board[a.y][a.x] = target;
        this.level.board[b.y][b.x] = source;
    }

    increment(dir: string, source: Point): Point {
        switch(dir) {
            case 'up': return { x: source.x, y: source.y - 1 };
            case 'down': return { x: source.x, y: source.y + 1 };
            case 'left': return { x: source.x - 1, y: source.y };
            case 'right': return { x: source.x + 1, y: source.y };
        }
        return { x: -1, y: -1 };
    }

    attack(dir: string, count: number) {
        const pos = this.position;
        if (!this.validatePosition(pos)) return ActionResult.UnknownPosition;
        if (!this.validateDirection(dir)) return ActionResult.UnknownDirection;
        if (this.staminaUsed + count > this.level.maxStamina) return ActionResult.NotEnoughStamina;

        return ActionResult.Success;
    }

    jump(dir: string) {
        const pos = this.position;
        if (!this.validatePosition(pos)) return ActionResult.UnknownPosition;
        if (!this.validateDirection(dir)) return ActionResult.UnknownDirection;

        return ActionResult.Success;
    }

    move(dir: string) {
        const pos = this.position;
        if (!this.validatePosition(pos)) return ActionResult.UnknownPosition;
        if (!this.validateDirection(dir)) return ActionResult.UnknownDirection;

        const targetPos = this.increment(dir, pos);
        if (!this.validatePosition(targetPos)) return ActionResult.InvalidTarget;

        const target = this.get(targetPos);
        if (!target) return ActionResult.InvalidTarget;
        if (target.key === 'goal') return ActionResult.Finished;
        if (target.key !== 'free') return ActionResult.MoveTargetInvalid;

        this.swap(pos, targetPos);
        return ActionResult.Success;
    }
}

@Injectable({ providedIn: 'root' })
export class ProcessorService {

    constructor(
        private _game: GameService,
        private _modal: ModalService
    ) { }

    error(description: string) {
        return this._modal.confirm('Compilation Error: ' + description, 'An Error Occurred!', 'warning', { text: 'Ok', icon: 'done', value: 'true' });
    }

    async create(code: string, level: Level) {
        const { actions, error } = this._game.compile(code, level.maxMoves);
        if (error) {
            await this.error(error);
            return { actions, error, game: undefined };
        }

        const game = new PlayInstance(level, actions);
        return { actions, error: undefined, game };
    }
}