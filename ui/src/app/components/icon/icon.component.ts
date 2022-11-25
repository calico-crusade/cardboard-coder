import { Component, ElementRef, Input, OnInit } from '@angular/core';

@Component({
    selector: 'icon',
    template: `<ng-content></ng-content>`
})
export class IconComponent implements OnInit {
    private _fill: boolean = false;
    private _spin: boolean = false;
    private _size?: string;

    @Input('font-size') set size(value: string | undefined){ this._size = value; this.process(); }
    @Input('fill') set fill(value: boolean) { this._fill = value; this.process(); }
    @Input('spin') set spin(value: boolean) { this._spin = value; this.process(); }

    constructor(
        private el: ElementRef
    ) { }

    ngOnInit(): void { this.process(); }

    private process() {
        if (this._size) this.el.nativeElement.style['font-size'] = this._size;
        this.add('material-symbols-outlined');
        this.set('fill-icon', this._fill);
        this.set('spin', this._spin);
    }

    add(name: string) {
        this.el.nativeElement.classList.add(name);
    }

    rem(name: string) {
        this.el.nativeElement.classList.remove(name);
    }

    set(name: string, add: boolean) {
        if (add) this.add(name);
        else this.rem(name);
    }
}
