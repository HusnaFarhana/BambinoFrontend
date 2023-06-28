import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AdminService } from 'src/app/shared/services/admin.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-edit-plan',
  templateUrl: './edit-plan.component.html',
  styleUrls: ['./edit-plan.component.css'],
})
export class EditPlanComponent implements OnInit {
  subscription: Subscription;
  form: FormGroup;
  planid: any;
  data: any;
  constructor(
    private adminService: AdminService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.planid = params['id'];
      console.log(this.planid);
      this.getplan(this.planid);
    });
  }
  getplan(id) {
    this.adminService.getAPlan(id).subscribe((response: any) => {
      this.data = response.data;
      this.initializeForm();
    });
  }

  initializeForm(): void {
    this.form = this.formBuilder.group({
      name: [this.data.name],
      agegroup: [this.data.ageGroup],
      description: [this.data.description],
      price: [this.data.price],
      athome: [this.data.athome],
      id: [this.data._id],
    });
  }
  submit() {
    let upd = this.form.getRawValue();
    // this.subscription =
      this.adminService
      .editPlan(upd)
      // .subscribe((response) => {
      //   this.adminService.emitEditPlan(upd)
      // })
   
  }
}
