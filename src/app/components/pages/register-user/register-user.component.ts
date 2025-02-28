import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/auth.service';
import { Router } from '@angular/router';
import { IRegisterUser } from '../../../shared/interfaces/register-user.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IClinicsList } from '../../../shared/interfaces/clinics.interface';

@Component({
  selector: 'app-register-user',
  standalone: false,
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.css',
})
export class RegisterUserComponent {
  userForm!: FormGroup;
  errorMessages: { [key: string]: string } = {};
  isLoading: boolean = false;
  clinics: IClinicsList[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private authRegistService: AuthService,
    private router: Router,
    private showMessage: MatSnackBar
  ) {}

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.maxLength(100)]],
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      role: [null, Validators.required],
      birthDate: [null],
      healthPlan: [null, Validators.maxLength(30)],
      specialization: [null, Validators.maxLength(100)],
      clinicsId: [null],
    });
    this.userForm.get('role')?.valueChanges.subscribe((role) => {
      this.updateFormValidator(role);
    });
    this.authRegistService.getAllClinics().subscribe({
      next: (clinics) => {
        this.clinics = clinics;
      },
      error: (error) => {
        console.error('Erro ao buscar as clínicas', error);
      },
    });
  }

  private updateFormValidator(role: string) {
    const specializationControl = this.userForm.get('specialization');
    const clinicsIdControl = this.userForm.get('clinicsId');
    const birthDateControl = this.userForm.get('birthDate');
    const healthPlanControl = this.userForm.get('healthPlan');

    if (role === 'profissional') {
      specializationControl?.setValidators([
        Validators.required,
        Validators.maxLength(100),
      ]);
      clinicsIdControl?.setValidators([Validators.required]);
      birthDateControl?.clearValidators();
      healthPlanControl?.clearValidators();
    } else if (role === 'paciente') {
      birthDateControl?.setValidators(Validators.required);
      healthPlanControl?.setValidators([
        Validators.required,
        Validators.maxLength(100),
      ]);
      specializationControl?.clearValidators();
      clinicsIdControl?.clearValidators();
    }

    specializationControl?.updateValueAndValidity();
    clinicsIdControl?.updateValueAndValidity();
    birthDateControl?.updateValueAndValidity();
    healthPlanControl?.updateValueAndValidity();
  }

  private createRequestBody(role: string): IRegisterUser {
    const baseBody = {
      name: this.userForm.value.name,
      email: this.userForm.value.email,
      password: this.userForm.value.password,
      role: this.userForm.value.role,
    };

    if (role === 'paciente') {
      return {
        ...baseBody,
        birthDate: this.userForm.value.birthDate,
        healthPlan: this.userForm.value.healthPlan,
      };
    } else if (role === 'profissional') {
      return {
        ...baseBody,
        specialization: this.userForm.value.specialization,
        clinicsId: this.userForm.value.clinicsId,
      };
    }

    return baseBody;
  }

  onRegisterUserSubmit() {
    if (this.userForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessages = {};

    const role = this.userForm.value.role;
    const requestBody = this.createRequestBody(role);

    this.authRegistService.registerUser(requestBody).subscribe({
      next: () => {
        this.authRegistService.showMessage('Usuário cadastrado com sucesso!!!');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.log('Erro ao autenticar usuário:', error);
        this.isLoading = false;

        if (error.error && error.error.message) {
          this.errorMessages['global'] = error.error.message;
        } else {
          this.errorMessages['global'] =
            'Erro ao realizar o cadastro. Tente mais tarde';
        }
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
}
