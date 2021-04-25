import { InvertAuthGuard } from './guards/invert-auth.guard';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NeumorphismComponent } from './components/neumorphism/neumorphism.component';

const routes: Routes = [
  { path: '**', pathMatch: 'full', redirectTo: 'auth'},
  { path: 'login', component: LoginComponent, canActivate: [InvertAuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [InvertAuthGuard] },
  //{ path: 'neumorphism', component: NeumorphismComponent, canActivate: [InvertAuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
