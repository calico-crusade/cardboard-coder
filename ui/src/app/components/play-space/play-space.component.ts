import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DEFAULT_ICONS, Level, Cell } from 'src/app/services';

@Component({
    selector: 'cc-play-space',
    templateUrl: './play-space.component.html',
    styleUrls: ['./play-space.component.scss']
})
export class PlaySpaceComponent {

    @Input() level!: Level;
    @Output('cell-clicked') onCellClicked: EventEmitter<Cell> = new EventEmitter();

    get icons() {
        return this.level.icons || DEFAULT_ICONS;
    }

    constructor() { }

    clicked(x: number, y: number) {
        const tile = this.level.board[x][y];
        this.onCellClicked.emit({ x, y, tile });
    }
}
