import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-user',
  standalone: false,
  templateUrl: './login-user.component.html',
  styleUrl: './login-user.component.css',
})
export class LoginUserComponent {
  userForm!: FormGroup;
  errorMessages: { [key: string]: string } = {};
  isLoading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authLoginService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  onLoginSubmit() {
    if (this.userForm.invalid) {
      return;
    }
    const { email, password } = this.userForm.value;
    this.isLoading = true;
    this.errorMessages = {};

    this.authLoginService.loginUser(email, password).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Erro ao autenticar usuário:', error);
        this.isLoading = false;

        if (!error.message.includes(',')) {
          this.errorMessages['global'] = error.message;
        }

        if (error.message.includes(',')) {
          const errors = error.message.split(',');
          errors.forEach((msg: string) => {
            if (msg.toLowerCase().includes('email')) {
              this.errorMessages['email'] = msg;
            } else if (msg.toLowerCase().includes('senha')) {
              this.errorMessages['password'] = msg;
            }
          });
        }
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
}
