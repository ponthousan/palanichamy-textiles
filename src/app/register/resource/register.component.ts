import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  showpass = false;
  registerForm: FormGroup;
  emailRegEx = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  password = 'password';
  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmpassword: ['', Validators.required],
      emailid: ['', [Validators.required, Validators.pattern(this.emailRegEx)]],
      phonenumber: ['', Validators.required],
      address1: ['', Validators.required],
      address2: [''],
      city: ['', Validators.required],
      district: ['', Validators.required],
      state: ['', Validators.required]
    }, {
      validator: this.matchValidators('password', 'confirmpassword')
    })
  }

  onRegisterSubmit() {
    console.log(this.registerForm.value)
  }
  showPassword() {
    if(this.password == 'password') {
      this.password = 'text';
      this.showpass = true;
    } else {
      this.password = 'password';
      this.showpass = false;
    }
  }
  matchValidators(password: string, confirmpassword: string) {
    return(formGroup: FormGroup) => {
      const pass = formGroup.controls[password];
      const confirmpass = formGroup.controls[confirmpassword];
      if (
        confirmpass.errors &&
        !confirmpass.errors['confirmValidator']
      ) {
        return;
      }
      if (pass.value != confirmpass.value) {
        confirmpass.setErrors({confirmValidator: true})
      } else {
        confirmpass.setErrors(null)
      }
    }
  }
}
