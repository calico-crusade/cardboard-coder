import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

    show: boolean = false;
    
    @Input() title?: string;
    @Input() icon?: string;
    @Input('class') className?: string;
    @Input('background-click') offClick: boolean = true;

    @Output() closed: EventEmitter<void> = new EventEmitter();

    constructor() { }

    close(isBackground: boolean) {
        if (isBackground && !this.offClick) return;

        this.closed.emit();
        this.show = false;
    }
}
