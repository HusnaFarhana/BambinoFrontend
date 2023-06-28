import { Component,OnInit } from '@angular/core';
import { AdminService } from 'src/app/shared/services/admin.service';  

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: any;
constructor(public adminService:AdminService){}
  ngOnInit(): void {
    this.adminService.getUsers().subscribe((response:any) => {
      this.users=response.users      
  })
}
}
