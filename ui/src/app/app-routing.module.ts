import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './routes/dashboard/dashboard.component';
import { LevelDesignerComponent } from './routes/level-designer/level-designer.component';

const routes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent
    }, {
        path: 'level',
        component: LevelDesignerComponent
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
