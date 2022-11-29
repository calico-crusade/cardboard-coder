import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './layout/app.component';
import { ComponentsModule } from './components';
import { NuMonacoEditorModule } from '@ng-util/monaco-editor';
import { DashboardComponent } from './routes/dashboard/dashboard.component';
import { LevelDesignerComponent } from './routes/level-designer/level-designer.component';
import { LevelComponent } from './routes/level/level.component';
import { LevelSelectorComponent } from './routes/level-selector/level-selector.component';

@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        LevelDesignerComponent,
        LevelComponent,
        LevelSelectorComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        CommonModule,
        AppRoutingModule,
        ComponentsModule,
        NuMonacoEditorModule.forRoot({
            baseUrl: 'lib',
            monacoLoad: (m) => {
                monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
                    noSemanticValidation: true,
                    noSyntaxValidation: false
                });
                monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
                    target: monaco.languages.typescript.ScriptTarget.Latest,
                    allowNonTsExtensions: true,
                    noLib: true
                });
            }
        })
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
