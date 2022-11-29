import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { SubscriptionHandler } from 'src/app/services';
import { ModalComponent } from '../modal.component';
import { IConfirmRequest, ModalInstance, ModalService } from '../modal.service';

@Component({
    selector: 'cc-confirm-modal',
    templateUrl: './confirm-modal.component.html',
    styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit, OnDestroy {

    private _subs = new SubscriptionHandler();
    private _sub?: Subscription;

    @ViewChild('prompt') prompt!: ModalComponent;

    request?: IConfirmRequest;
    instance?: ModalInstance;

    constructor(
        private _modal: ModalService
    ) { }

    ngOnInit(): void {
        this._subs
            .subscribe(this._modal.onConfirm, t => this.process(t));
    }

    ngOnDestroy(): void {
        this._subs.unsubscribe();
    }

    click(value: string) {
        this._sub?.unsubscribe();
        this.request?.resolve(value);
        this.instance?.cancel();
    }

    private process(req: IConfirmRequest) {
        this.request = req;
        this.instance = this._modal.show(this.prompt);

        this._sub = this.instance.watcher.subscribe(t => {
            this.request?.resolve(undefined);
            this._sub?.unsubscribe();
        });
    }
}
