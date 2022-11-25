import { Component, Input } from '@angular/core';

@Component({
    selector: 'container',
    templateUrl: './container.component.html',
    styleUrls: ['./container.component.scss']
})
export class ContainerComponent {

    @Input() loading: boolean = false;
    @Input('handle-scroll') scroll: boolean = false;
    @Input('class') className: string = '';

    constructor() { }
}
