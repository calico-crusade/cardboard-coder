
export interface Cell {
    x: number;
    y: number;
    tile: Tile
};

export interface LevelIcons {
    [key: string]: LevelIcon;
}

export interface Tile {
    key: string;
    meta?: { [key: string]: any };
    locked?: boolean;
}

export interface LevelIcon {
    key: string;
    name: string;
    description: string;
    max?: number;
}

export interface Level {
    id: string;
    name: string;
    description: string;
    ordinal: number;
    board: Tile[][];
    startingCode: string;
    finishingCode: string;
    availableActions: string[];
    maxMoves: number;
    maxPower: number;
    gridSize: number;
    icons?: LevelIcons;
    fontSize?: string;
}

export const DEFAULT_ICONS: LevelIcons = {
    wall: {
        key: 'outdoor_garden',
        name: 'wall',
        description: 'An impassable object. Cannot be jumped or walked through'
    },
    hole: {
        key: 'check_box_outline_blank',
        name: 'hole',
        description: 'An obstacle that needs to be jumped over.'
    },
    free: {
        key: 'texture',
        name: 'free',
        description: 'A free space that the player can stand on'
    },
    goal: {
        key: 'flag',
        name: 'goal',
        description: 'The objective of the level',
        max: 1
    },
    enemy: {
        key: 'bug_report',
        name: 'enemy',
        description: 'An enemy that must be defeated in order to pass'
    },
    player: {
        key: 'elderly_woman',
        name: 'player',
        description: "The player's character",
        max: 1
    },
    key: {
        key: 'key',
        name: 'key',
        description: 'A key the player can collect to open a door. Can only be used once.'
    },
    'closed door': {
        key: 'door_front',
        name: 'closed door',
        description: 'A closed door that is impassable without a key.'
    },
    'opened door': {
        key: 'door_open',
        name: 'opened door',
        description: 'A door that has been opened with a key.'
    }
};