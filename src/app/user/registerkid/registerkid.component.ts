import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
import jwt_decode from 'jwt-decode';
import { UserPayload, planModel } from 'src/app/shared/interfaces';
import { dateOfBirthValidator } from '../../shared/date-validator';
declare const Razorpay: any;

@Component({
  selector: 'app-registerkid',
  templateUrl: './registerkid.component.html',
  styleUrls: ['./registerkid.component.css'],
})
export class RegisterkidComponent implements OnInit {
  form: FormGroup;
  file: File | null;
  userid: string;
  decoded: UserPayload;
  token: any;
  plans: planModel[];
  error: boolean = false;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      dob: ['', [Validators.required, dateOfBirthValidator]],
      gender: ['', Validators.required],
      relation: ['', Validators.required],
      medical: ['', Validators.required],
      plan: ['', Validators.required],
      image: ['', Validators.required],
      paymentid: [''],
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
        paymentid:''
      };
      console.log(formData,'forrrm');
      
      const options = {
        key: 'rzp_test_JDlClODKCsuMM1',
        amount: formData.plan.price * 100,
        currency: 'INR',
        name: 'Bambino Daycare',
        description: 'Registration Fee',
        image:
          'https://res.cloudinary.com/doao8efwv/image/upload/v1688191024/Logo_hd10no.png', // URL of your logo image
        handler: (response: any) => {
        
          console.log(response, 'reesponse');
          if (response.razorpay_payment_id) {
             formData.paymentid = response.razorpay_payment_id;
            this.userService.registerKid(formData);
          } else {
            // Payment failed
            console.log('Payment failed');
          }
        },
        prefill: {
          name: '', // Prefill customer name
          email: '', // Prefill customer email
          contact: '', // Prefill customer contact number
        },
      };

      const razorpayInstance = new Razorpay(options);
      razorpayInstance.open();
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
}
