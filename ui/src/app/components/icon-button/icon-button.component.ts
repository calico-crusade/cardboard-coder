import { Component, EventEmitter, Input, Output } from '@angular/core';

export type AvailableTypes = 'circle' | 'rounded' | 'flat' | 'inline';

@Component({
    selector: 'icon-btn',
    templateUrl: './icon-button.component.html',
    styleUrls: ['./icon-button.component.scss']
})
export class IconButtonComponent {

    @Input() type: AvailableTypes = 'flat';
    @Input() text?: string;
    @Input() disabled?: string;

    @Input() fill: boolean = false;
    @Input() spin: boolean = false;
    @Input('font-size') size?: string;

    @Input() routerLink: any[] = [];

    @Output() onclick: EventEmitter<void> = new EventEmitter();

    inGroup: boolean = false;
    get isDisabled() { return this.disabled === ''; }

    constructor() { }
}
