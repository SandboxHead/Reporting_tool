import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MytemplateComponent } from './mytemplate/mytemplate.component';
import { LoginComponent } from './login/login.component';
import { TemplateEditorComponent } from './template-editor/template-editor.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: 'bar-chart', component: MytemplateComponent },
  { path: 'login', component: LoginComponent},
  { path: 'template', component: TemplateEditorComponent},
  { path: 'dashboard', component: DashboardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
