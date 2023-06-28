import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { AdminService } from 'src/app/shared/services/admin.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-edittutor',
  templateUrl: './edittutor.component.html',
  styleUrls: ['./edittutor.component.css'],
})
export class EdittutorComponent implements OnInit {
  id: any;
  staff: any;
  form: FormGroup;
  error: boolean = false;

  constructor(
    private route: ActivatedRoute,
    // private router: Router,
    private adminService: AdminService,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.loadStaff(this.id);
  }

  loadStaff(id) {
    this.adminService.getStaffProfile(id).subscribe((response: any) => {
      this.staff = response.tutor;
      console.log(this.staff);
      this.initializeForm();
    });
  }
  initializeForm(): void {
    this.form = this.formBuilder.group({
      name: [this.staff.name, Validators.required],
      dob: [this.staff.dob, [Validators.required, this.dateOfBirthValidator]],
      email: [this.staff.email, Validators.required],
      password: [this.staff.password, Validators.required],
      contact: [this.staff.contact, Validators.required],
      address: [this.staff.address, Validators.required],
      adharNo: [this.staff.adharNo, Validators.required],
      _id: [this.staff._id],
    });
  }
  submit() {
    if (this.form.invalid) {
        this.error = true;
      return;
    }
    let staff = this.form.getRawValue();


    this.adminService.editStaff(staff);
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
