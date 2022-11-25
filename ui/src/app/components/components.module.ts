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

const EXPORTS = [
    IconComponent,
    ImageProxyDirective,
    IconButtonComponent, 
    ContainerComponent, 
    GridDesignerComponent,
    PlaySpaceComponent,
    ModalComponent
];

@NgModule({
    declarations: [ ...EXPORTS, ],
    exports: [ ...EXPORTS, ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        MagicCircleModule
    ]
})
export class ComponentsModule { }