import { Component ,OnInit} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/shared/services/user.service';
import { Router, NavigationExtras } from '@angular/router';
import { Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  form: FormGroup;
  error: boolean = false;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      dob: ['', Validators.required, this.dateOfBirthValidator],
      email: ['', Validators.required],
      password: ['', Validators.required],
      contactnum: ['', Validators.required],
      adhar: ['', Validators.required],
    });
  }
  submit(): void {
    let user = this.form.getRawValue();

    // if (
    //   user.name == '' ||
    //   user.email == '' ||
    //   user.password == '' ||
    //   user.dob == '' ||
    //   user.contactnum == '' ||
    //   user.adhar == ''
    // ) {
    //   Swal.fire('Error', 'Please enter all the fields', 'error');
    // } else {
    //   this.userService.registerUser(user);

    // }
     if (this.form.invalid) {
       this.error = true;
       return;
     } else {
       this.userService.registerUser(user);
     }
  }
  dateOfBirthValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const selectedDate = new Date(control.value);
    const today = new Date();

    if (selectedDate >= today) {
      return { futureDate: true };
    }

    return null;
  }
}
