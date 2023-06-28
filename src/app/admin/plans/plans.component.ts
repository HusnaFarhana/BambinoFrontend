import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdminService } from 'src/app/shared/services/admin.service';
import { Subscription } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css'],
})
export class PlansComponent implements OnInit, OnDestroy {
  showDeleteConfirmationModal: boolean = false;
  plans: any[] = [];
  private planAddedSubscription: Subscription;
  private editPlanSubscription: Subscription;

  constructor(
    public adminService: AdminService,
    private changeDetectionRef: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.planAddedSubscription = this.adminService.planAdded$.subscribe(
      (plan) => {
        this.plans.push(plan);
      }
    );
    //  this.editPlanSubscription = this.adminService.editPlan$.subscribe(
    //    (plan) => {
    //      const index = this.plans.findIndex((p) => p._id === plan._id);
    //      if (index !== -1) {
    //        const updatedPlans = [...this.plans];
    //        updatedPlans[index] = plan;

    //        setTimeout(() => {
    //          this.plans = updatedPlans;
    //          this.changeDetectionRef.detectChanges();
    //        }, 0);
    //      }
    //    }
    //  );
    this.adminService.getPlans().subscribe((response: any) => {
      this.plans = response.plans;
      console.log(this.plans);
    });
  }
  showConfirmationModal() {
    console.log('clickedd');

    this.showDeleteConfirmationModal = true;
  }
  cancelDelete() {
    this.showDeleteConfirmationModal = false;
    console.log('cancelled');
  }
  confirmDelete() {
    this.showDeleteConfirmationModal = false;
    console.log('deleted');
  }

  ngOnDestroy(): void {
    this.planAddedSubscription.unsubscribe();
  }
}
