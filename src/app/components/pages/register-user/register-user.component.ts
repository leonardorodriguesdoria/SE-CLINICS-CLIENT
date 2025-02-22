import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register-user',
  standalone: false,
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.css',
})
export class RegisterUserComponent {
  userForm: FormGroup;
  clinics = [
    { id: 1, name: 'Clínica A' },
    { id: 2, name: 'Clínica B' },
    { id: 3, name: 'Clínica C' },
  ];

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: [null],
      email: [null],
      password: [null],
      userType: [null],
      birthDate: [null],
      healthPlan: [null],
      specialization: [null],
      clinics: [[]],
    });
  }

  submitForm() {
    console.log(this.userForm.value);
  }
}
