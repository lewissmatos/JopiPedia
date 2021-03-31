import { AdminGuard } from './guards/admin.guard';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminPreguntasComponent } from './components/admin-preguntas/admin-preguntas.component';
import { AdminTemasComponent } from './components/admin-temas/admin-temas.component';
import { AdminUsersComponent } from './components/admin-users/admin-users.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/admin/home' },
  { path: 'home', component: HomeComponent, canActivate: [AdminGuard] },
  { path: 'admin-preguntas', component: AdminPreguntasComponent, canActivate: [AdminGuard] },
  { path: 'admin-temas', component: AdminTemasComponent, canActivate: [AdminGuard] },
  { path: 'admin-users', component: AdminUsersComponent, canActivate: [AdminGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
