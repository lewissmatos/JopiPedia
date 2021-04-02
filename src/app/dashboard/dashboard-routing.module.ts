import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RecordsComponent } from './components/records/records.component';
import { TestComponent } from './components/test/test.component';
import { SearchPeopleComponent } from './components/search-people/search-people.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/dashboard/home' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'records', component: RecordsComponent, canActivate: [AuthGuard] },
  { path: 'search-people', component: SearchPeopleComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'test/:id', component: TestComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
