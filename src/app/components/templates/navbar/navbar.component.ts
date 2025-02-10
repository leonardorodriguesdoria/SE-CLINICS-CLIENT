import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuRoutes } from '../../../custom-routes';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent extends MenuRoutes {
  constructor(router: Router) {
    super(router);
    //super.goToProfessionals();
    //super.goToAbout();
    //super.goToHome();
  }

  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
