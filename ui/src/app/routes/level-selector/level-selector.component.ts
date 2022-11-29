import { Component, OnInit } from '@angular/core';
import { Level, LEVELS } from 'src/app/services';

@Component({
    templateUrl: './level-selector.component.html',
    styleUrls: ['./level-selector.component.scss']
})
export class LevelSelectorComponent implements OnInit {

    loading: boolean = false;

    levels: Level[] = [];

    constructor() { }

    ngOnInit(): void {
        this.levels = LEVELS.levels.sort((a, b) => a.ordinal - b.ordinal);
    }

    private process() {

    }

}
