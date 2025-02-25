import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { AppComponent } from './app.component';

//Modules
import { AppRoutingModule } from './app-routing.module';
import { TemplateModule } from './components/templates/template.module';
import { AngularMaterialModule } from './angularMaterialModule/angular-material.module';
import { PagesModule } from './components/pages/pages.module';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TemplateModule,
    AngularMaterialModule,
    HttpClientModule,
    PagesModule,
    SharedModule,
  ],
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
