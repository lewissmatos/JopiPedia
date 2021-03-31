import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { HomeComponent } from './components/home/home.component';
import { AdminTemasComponent } from './components/admin-temas/admin-temas.component';
import { AdminPreguntasComponent } from './components/admin-preguntas/admin-preguntas.component';
import { AdminUsersComponent } from './components/admin-users/admin-users.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [HomeComponent, AdminTemasComponent, AdminPreguntasComponent, AdminUsersComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule
  ]
})
export class AdminModule { }
