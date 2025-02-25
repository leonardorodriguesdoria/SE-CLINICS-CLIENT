import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { AngularMaterialModule } from '../angularMaterialModule/angular-material.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, AngularMaterialModule],
  providers: [AuthService],
})
export class SharedModule {}
