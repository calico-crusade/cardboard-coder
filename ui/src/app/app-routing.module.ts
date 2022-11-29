import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './routes/dashboard/dashboard.component';
import { LevelDesignerComponent } from './routes/level-designer/level-designer.component';
import { LevelSelectorComponent } from './routes/level-selector/level-selector.component';
import { LevelComponent } from './routes/level/level.component';

const routes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent
    }, {
        path: 'level-designer',
        component: LevelDesignerComponent
    }, {
        path: 'levels',
        component: LevelSelectorComponent
    }, {
        path: 'level/:id',
        component: LevelComponent
    }, {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
    }, {
        path: '**',
        redirectTo: 'error'
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
