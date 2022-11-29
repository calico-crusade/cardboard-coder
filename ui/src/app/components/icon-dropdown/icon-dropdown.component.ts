import { Component, Input, ViewChild } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { ModalService } from '../modal/modal.service';
export type AvailableTypes = 'circle' | 'rounded' | 'flat' | 'inline';

@Component({
    selector: 'icon-dropdown',
    templateUrl: './icon-dropdown.component.html',
    styleUrls: ['./icon-dropdown.component.scss']
})
export class IconDropdownComponent {

    @ViewChild('modal') modal!: ModalComponent;

    @Input() type: AvailableTypes = 'flat';
    @Input() text?: string;
    @Input() icon!: string;
    @Input() disabled?: string;

    @Input() fill: boolean = false;
    @Input() spin: boolean = false;
    @Input('font-size') size?: string;

    inGroup: boolean = false;
    get isDisabled() { return this.disabled === ''; }

    constructor(
        private _modal: ModalService
    ) { }

    expose() { this._modal.show(this.modal); }
}
