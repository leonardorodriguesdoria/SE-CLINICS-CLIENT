import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterUserComponent } from './register-user/register-user.component';
import { LoginUserComponent } from './login-user/login-user.component';
import { HomeComponent } from './home/home.component';
import { ProfessionalsComponent } from './professionals/professionals.component';
import { AboutComponent } from './about/about.component';
import { AngularMaterialModule } from '../../angularMaterialModule/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AppointmentsComponent } from './appointments/appointments.component';

@NgModule({
  declarations: [
    RegisterUserComponent,
    LoginUserComponent,
    HomeComponent,
    ProfessionalsComponent,
    AboutComponent,
    UserProfileComponent,
    AppointmentsComponent,
  ],
  imports: [CommonModule, AngularMaterialModule, ReactiveFormsModule],
  exports: [RegisterUserComponent, LoginUserComponent, HomeComponent],
})
export class PagesModule {}
