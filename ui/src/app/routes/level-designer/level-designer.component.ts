import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalComponent, ModalInstance, ModalService } from 'src/app/components';
import { Cell, DEFAULT_ICONS, Level, LevelIcon, Tile } from 'src/app/services';

@Component({
    templateUrl: './level-designer.component.html',
    styleUrls: ['./level-designer.component.scss']
})
export class LevelDesignerComponent implements OnInit {

    private importIns?: ModalInstance;
    @ViewChild('importpop') importPopup!: ModalComponent;

    private resizeIns?: ModalInstance;
    @ViewChild('resizepop') resizePopup!: ModalComponent;

    @Input() level?: Level;

    importData: string = '';
    replacer?: LevelIcon;

    get icons() { 
        const icons = this.level?.icons || DEFAULT_ICONS;
        return Object.keys(icons).map(t => icons[t]);
    }

    constructor(
        private _mdl: ModalService
    ) { }

    ngOnInit(): void {
        if (!this.level) this.level = this.generateLevel(20);
    }

    tileClicked(cell: Cell) {
        if (!this.replacer || !this.level) return;

        const current = this.level.board[cell.x][cell.y];
        if (current.locked) return;

        if (current.key === this.replacer.name) {
            current.key = 'free';
            return;
        }

        current.key = this.replacer.name;
    }

    private clone<T>(item: T) {
        return <T>JSON.parse(JSON.stringify(item));
    }

    private generateLevel(size: number): Level {
        const board: Tile[][] = [];
        const wallTile: Tile = { key: 'wall', locked: true };
        const freeTile: Tile = { key: 'free' };
        const playerTitle: Tile = { key: 'player' };
        const goalTile: Tile = { key: 'goal' };

        for(let x = 0; x < size; x++)
        for(let y = 0; y < size; y++) {
            if (!board[x]) board[x] = [];

            if (x == 0 || y == 0 || x == size - 1 || y == size - 1) {
                board[x][y] = wallTile;
                continue;
            }

            board[x][y] = freeTile;
        }

        board[1][1] = playerTitle;
        board[size - 2][size - 2] = goalTile;

        const level: Level = {
            id: 'level-1',
            name: 'Tutorial Level',
            description: 'A generated level',
            ordinal: 1,
            board: board,
            startingCode: '',
            finishingCode: '',
            availableActions: ['move', 'jump', 'attack', 'pickup', 'use', 'left', 'right', 'up', 'down'],
            maxMoves: 999,
            maxStamina: 999,
            gridSize: size,
            icons: DEFAULT_ICONS
        };
        return this.clone(level);
    }

    async export() {
        const data = JSON.stringify(this.level);
        await navigator.clipboard.writeText(data);
    }

    startImport() {
        this.importIns = this._mdl.show(this.importPopup);
    }

    import() {
        const data = JSON.parse(this.importData);
        this.level = data;
        this.importIns?.cancel();
    }

    startResize() {
        this.resizeIns = this._mdl.show(this.resizePopup);
    }

    resize() {
        if (!this.level) return;
        this.level = this.generateLevel(this.level.gridSize);
        this.resizeIns?.cancel();
    }
}
