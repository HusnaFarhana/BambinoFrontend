import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
import jwt_decode from 'jwt-decode';
import Swal from 'sweetalert2';
import { Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {
  isLoading = false;
  form: FormGroup;
  profile: any = {};
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {}
  userid: String = '';
  data: any = {};
  decoded: any;
  token: any;

  ngOnInit(): void {
    this.token = localStorage.getItem('id_token');
    this.decoded = jwt_decode(this.token);
    this.userid = this.decoded.userid;

    this.userService.getUser(this.userid).subscribe((response) => {
      this.isLoading = false;
      this.data = response.user[0];
      this.initializeForm();
    });
  }

  initializeForm(): void {
    this.form = this.formBuilder.group({
      name: [this.data.name, Validators.required],
      dob: [this.data.dob, [Validators.required, this.dateOfBirthValidator]],
      contact: [this.data.contact, Validators.required],
      adhar: [this.data.adhar, Validators.required],
    });
  }

  submit() {
    if (this.form.invalid) {
      Swal.fire('Error', 'Please enter all the fields correctly', 'error');
      return;
    }
    this.isLoading = true;
    let user = this.form.getRawValue();
    user.id = this.userid;

    if (
      user.name == '' ||
      user.dob == '' ||
      user.contact == '' ||
      user.adhar == ''
    ) {
      Swal.fire('Error', 'Please enter all the fields', 'error');
    } else {
      this.userService.updateUser(user);
    }
  }
  dateOfBirthValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const selectedDate = new Date(control.value);
    const today = new Date();

    if (selectedDate >= today) {
      return { futureDate: true };
    }

    return null;
  }
}
