import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { WorkerEditComponent } from './components/worker-edit/worker-edit.component';
import { WorkerViewComponent } from './components/worker-view/worker-view.component';
import { WorkersListComponent } from './components/workers-list/workers-list.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: WorkersListComponent },
    { path: '', component: SidebarComponent, outlet: 'sidebar' },
    { path: 'edit-worker', component: WorkerEditComponent },
    { path: 'view-worker', component: WorkerViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
