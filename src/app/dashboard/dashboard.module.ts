import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CardComponent } from './components/card/card.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FormsModule } from '@angular/forms';
import { RecordsComponent } from './components/records/records.component';
import { TestComponent } from './components/test/test.component';
import { SearchPeopleComponent } from './components/search-people/search-people.component';


@NgModule({
  declarations: [
    HomeComponent, 
    NavbarComponent, 
    SidebarComponent,
    CardComponent,
    ProfileComponent,
    RecordsComponent,
    TestComponent,
    SearchPeopleComponent,    
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule
  ],
  exports: [
    NavbarComponent,
    SidebarComponent
  ]
})
export class DashboardModule { }
