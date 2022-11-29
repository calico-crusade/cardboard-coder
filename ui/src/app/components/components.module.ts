import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IconComponent } from "./icon/icon.component";
import { ImageProxyDirective } from "./image-proxy.directive";
import { MagicCircleModule } from "./magic-circle";
import { ModalComponent } from './modal/modal.component';
import { IconButtonComponent } from './icon-button/icon-button.component';
import { ContainerComponent } from './container/container.component';
import { GridDesignerComponent } from './grid-designer/grid-designer.component';
import { PlaySpaceComponent } from './play-space/play-space.component';
import { MarkdownDirective } from "./markdown.directive";
import { IconDropdownComponent } from './icon-dropdown/icon-dropdown.component';
import { ConfirmModalComponent } from './modal/confirm-modal/confirm-modal.component';
import { RouterModule } from "@angular/router";

const EXPORTS = [
    IconComponent,
    ImageProxyDirective,
    IconButtonComponent, 
    ContainerComponent, 
    GridDesignerComponent,
    PlaySpaceComponent,
    ModalComponent,
    IconDropdownComponent, 
    ConfirmModalComponent,
    MarkdownDirective
];

@NgModule({
    declarations: [ ...EXPORTS, ],
    exports: [ ...EXPORTS, ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        MagicCircleModule,
        RouterModule
    ]
})
export class ComponentsModule { }