import { Injectable } from "@angular/core";
import { Subject, Subscription } from "rxjs";
import { AvailableTypes } from "../icon-button/icon-button.component";
import { ModalComponent } from "./modal.component";

export class ModalInstance {
    private _sub: Subject<boolean> = new Subject();
    private _subs: Subscription[] = [];

    get watcher() { return this._sub.asObservable(); }

    constructor(
        public component: ModalComponent
    ) {
        this._subs.push(
            this.component.closed.subscribe(t => this.resolve(true))
        );
    }

    private resolve(canceled: boolean) {
        this._sub.next(!canceled);
        this.component.show = false;

        for(const sub of this._subs) sub.unsubscribe();
    }

    cancel() { this.resolve(true); }
    ok(){ this.resolve(false); }
}

export interface IConfirmButton {
    text?: string;
    type?: AvailableTypes;
    icon: string;
    value: string;
}

export interface IConfirmRequest {
    resolve: (value: string | undefined) => void;
    title: string;
    icon: string;
    description: string;
    buttons: IConfirmButton[];
}

@Injectable({ providedIn: 'root' })
export class ModalService {

    private _confirm = new Subject<IConfirmRequest>();

    get onConfirm() { return this._confirm.asObservable(); }

    show(component: ModalComponent, title?: string, icon?: string) {
        if (title) component.title = title;
        if (icon) component.icon = icon;
        component.show = true;
        return new ModalInstance(component);
    }

    confirm(description: string, ...buttons: IConfirmButton[]): Promise<string>;
    confirm(declaration: string, title: string, ...buttons: IConfirmButton[]): Promise<string>;
    confirm(declaration: string, title: string, icon: string, ...buttons: IConfirmButton[]): Promise<string>;
    confirm(description: string, t1?: string | IConfirmButton, t2?: string | IConfirmButton, ...buttons: IConfirmButton[]) {
        let title = 'Are you sure?';
        let icon = 'forum';
        if (t1 && typeof t1 === 'string') {
            title = t1;
        } else if (t1 && typeof t1 !== 'string') {
            buttons.push(t1);
        }

        if (t2 && typeof t2 === 'string') {
            icon = t2;
        } else if (t2 && typeof t2 !== 'string') {
            buttons.push(t2);
        }

        if (buttons.length == 0) 
            buttons = [
                { text: 'Ok', icon: 'done', type: 'rounded', value: 'true' },
                { text: 'Cancel', icon: 'close', type: 'rounded', value: 'false' }
            ];
        return new Promise<string | undefined>((resolve, _) => {
            this._confirm.next({
                title,
                icon,
                description,
                buttons,
                resolve
            });
        });
    }
}