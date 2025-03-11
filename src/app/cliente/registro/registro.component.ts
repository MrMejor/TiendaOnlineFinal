import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CredentialsService} from '../../services/auth/credentials.service';
import {UserInterface} from '../../services/interfaces/auth';

@Component({
  selector: 'app-registro',
    imports: [
        ReactiveFormsModule
    ],
  standalone: true,
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})
export class RegistroComponent {

  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private credentialsService: CredentialsService
  ) {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      roleName: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      address: ['', [Validators.required]],
    })
  }


  submit() {
    if (this.registerForm.invalid) {
      return;
    }

    this.credentialsService.register(this.registerForm.value as UserInterface).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: err => {
        console.log(err)
      }
    })
  }

}
