import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { ModalInstance, ModalService } from '../modal/modal.service';



@Component({
    selector: 'cc-grid-designer',
    templateUrl: './grid-designer.component.html',
    styleUrls: ['./grid-designer.component.scss']
})
export class GridDesignerComponent implements OnInit {

    @ViewChild('loadpopup') pop!: ModalComponent;
    private _pop?: ModalInstance;

    icons: { [key: string]: string } = {
        wall: 'grid_view',
        hole: 'check_box_outline_blank',
        free: '',
        goal: 'flag',
        enemy: 'bug_report',
        npc: 'elderly_woman'
    };
    gridSize: number = 20;
    grid!: string[][];
    selected: string = 'grid_view';
    loadGrid: string = '';

    get iconSets() {
        let icons: { icon: string, name: string }[] = [];
        for(let key in this.icons) {
            icons.push({ icon: this.icons[key], name: key });
        }
        return icons;
    }

    constructor(
        private _mdl: ModalService
    ) { this.grid = this.generate(); }

    ngOnInit(): void {
        
    }

    generate() {
        const grid: string[][] = [];


        for(let x = 0; x < this.gridSize; x++)
        for(let y = 0; y < this.gridSize; y++) {
            if (!grid[x]) grid[x] = [];

            if (x == 0 || y == 0 || x == this.gridSize - 1 || y == this.gridSize - 1) {
                grid[x][y] = this.icons['wall'];
                continue;
            }

            grid[x][y] = this.icons['free'];
        }
        console.log('Grid', { grid });

        return grid;
    }

    set(x: number, y: number) {
        const cur = this.grid[x][y];
        if (this.selected === cur) {
            this.grid[x][y] = this.icons['free'];
            return;
        }

        this.grid[x][y] = this.selected;
    }

    toggle(x: number, y: number) {
        let icons = this.iconSets;
        const current = this.grid[x][y];
        let ci = icons.findIndex(t => t.icon === current) + 1;
        if (ci >= icons.length) ci = 0;
        if (ci < 0) ci = icons.length - 1;

        this.grid[x][y] = icons[ci].icon;
    }

    toggleSelected() {
        let icons = this.iconSets;
        let ci = icons.findIndex(t => t.icon === this.selected) + 1;
        if (ci >= icons.length) ci = 0;
        if (ci < 0) ci = icons.length - 1;
        this.selected = icons[ci].icon;
    }

    async save() {
        let rows = [];

        for(let x = 0; x < this.gridSize; x++) {
            let cols = this.grid[x].map(t => `'${t}'`);
            rows.push(cols.join(', '));
        }

        const output = '[\n\t[' + rows.join('],\n\t[') + ']\n]';
        await navigator.clipboard.writeText(output);
    }

    load() {
        this._pop = this._mdl.show(this.pop);
    }

    doLoad() {
        const grid = eval(this.loadGrid);
        this.grid = grid;
        this._pop?.cancel();
    }
}