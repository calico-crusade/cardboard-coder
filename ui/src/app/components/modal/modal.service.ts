import { Injectable } from "@angular/core";
import { Subject, Subscription } from "rxjs";
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

@Injectable({ providedIn: 'root' })
export class ModalService {

    show(component: ModalComponent, title?: string, icon?: string) {
        if (title) component.title = title;
        if (icon) component.icon = icon;
        component.show = true;
        return new ModalInstance(component);
    }
}