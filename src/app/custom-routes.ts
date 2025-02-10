import { Router } from '@angular/router';

export class MenuRoutes {
  constructor(private router: Router) {}

  goToHome() {
    this.router.navigate(['/']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToProfessionals() {
    this.router.navigate(['/professionals']);
  }

  goToAbout() {
    this.router.navigate(['/about']);
  }
}
