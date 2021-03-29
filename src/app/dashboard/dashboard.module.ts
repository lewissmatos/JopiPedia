import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CardComponent } from './components/card/card.component';
import { ProfileComponent } from './components/profile/profile.component';


@NgModule({
  declarations: [
    HomeComponent, 
    NavbarComponent, 
    SidebarComponent,
    CardComponent,
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ],
  exports: [
    NavbarComponent,
    SidebarComponent
  ]
})
export class DashboardModule { }
