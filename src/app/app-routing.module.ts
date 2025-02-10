import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterUserComponent } from './components/pages/register-user/register-user.component';
import { LoginUserComponent } from './components/pages/login-user/login-user.component';
import { HomeComponent } from './components/pages/home/home.component';
import { ProfessionalsComponent } from './components/pages/professionals/professionals.component';
import { AboutComponent } from './components/pages/about/about.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterUserComponent },
  { path: 'login', component: LoginUserComponent },
  { path: 'professionals', component: ProfessionalsComponent },
  { path: 'about', component: AboutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
