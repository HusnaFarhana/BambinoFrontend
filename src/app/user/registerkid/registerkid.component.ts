import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators,AbstractControl,} from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/shared/services/user.service';
import jwt_decode from 'jwt-decode';


@Component({
  selector: 'app-registerkid',
  templateUrl: './registerkid.component.html',
  styleUrls: ['./registerkid.component.css'],
})
export class RegisterkidComponent implements OnInit {
  form: FormGroup;
  file: File | null;
  userid: any;
  decoded: any;
  token: any;
  plans: any;
  razorpayOptions: any;
  error: boolean = false;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      dob: ['', [Validators.required, this.dateOfBirthValidator]],
      gender: ['', Validators.required],
      relation: ['', Validators.required],
      medical: ['', Validators.required],
      plan: ['', Validators.required],
      image: ['', Validators.required],
    });

    this.userService.getHome().subscribe((response) => {
      this.plans = response.plans;
    });
  }
  url = '';
  submit() {
    this.token = localStorage.getItem('id_token');
    this.decoded = jwt_decode(this.token);
    this.userid = this.decoded.userid;
    if (this.form.invalid) {
   this.error = true;
   return;
}
    if (this.form.valid) {
      const formData = {
        name: this.form.value.name,
        dob: this.form.value.dob,
        gender: this.form.value.gender,
        relation: this.form.value.relation,
        medical: this.form.value.medical,
        plan: this.form.value.plan,
        user: this.userid,
        image: this.url,
      };

      // formData.user = this.userid;
      console.log(formData, 'in ts');

      this.userService.registerKid(formData);
    }
  }

  onselectFile(e) {
    if (e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
      };
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
