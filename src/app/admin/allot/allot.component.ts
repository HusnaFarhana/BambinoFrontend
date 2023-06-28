import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/shared/services/admin.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-allot',
  templateUrl: './allot.component.html',
  styleUrls: ['./allot.component.css']
})
export class AllotComponent implements OnInit{
  staffs: any
  data: {
    babyid: string,
    staffid: string
  }={babyid:'',staffid:''}
  constructor(
    private adminService: AdminService,
    private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.adminService.getStaff().subscribe((response:any) => {
      this.staffs = response.staffs     
      this.data.babyid=this.route.snapshot.params['id'];

    })
  }
  allotkid(staffid) {
    this.data.staffid = staffid
    this.adminService.allotmentor(this.data)

}
}
