import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/shared/services/admin.service';  
import { Router } from '@angular/router';

@Component({
  selector: 'app-tutors',
  templateUrl: './tutors.component.html',
  styleUrls: ['./tutors.component.css'],
})
export class TutorsComponent implements OnInit {
  staffs: any[];

  constructor(
    public adminService: AdminService,
    private router: Router
  ) { }
 
  ngOnInit(): void {
    this.adminService.getStaff().subscribe((response: any) => {
      this.staffs = response.staffs;
      console.log(this.staffs);
    });
  }

  tutorprofile(id) {
    this.router.navigate(['tutors', 'tutorprofile', id]);
    
  }
}
