import { Component,OnInit } from '@angular/core';
import { AdminService } from 'src/app/shared/services/admin.service';
@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit{
data:any
  constructor(private adminService: AdminService) { }
  
  ngOnInit(): void {
   
    
    this.adminService.getdash().subscribe((response:any) => {
      
      this.data=response.data
    
  })
}
}
