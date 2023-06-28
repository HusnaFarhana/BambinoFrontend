// import { Component,OnInit } from '@angular/core';
// import { AdminService } from 'src/app/shared/services/admin.service';  
// import { Router } from '@angular/router';
// @Component({
//   selector: 'app-kids',
//   templateUrl: './kids.component.html',
//   styleUrls: ['./kids.component.css']
// })
// export class KidsComponent implements OnInit{
//   kids: any[];
//   constructor(public adminService:AdminService,private router:Router){}
//   ngOnInit(): void {
//     this.adminService.getKids().subscribe((response:any) => {
//       this.kids = response.kids     
//     })
//   }

//   babyprofile(id) {
//      this.router.navigate(['/admin/kids/profile',id]);
//   }

// }

import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from 'src/app/shared/services/admin.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-kids',
  templateUrl: './kids.component.html',
  styleUrls: ['./kids.component.css'],
})
export class KidsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'dob', 'gender', 'tutor', 'more'];
  dataSource: MatTableDataSource<any>;
  pageSizeOptions: number[] = [3, 5, 10, 100]; // Customize the page size options according to your needs
  searchValue: string = '';

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(public adminService: AdminService, private router: Router) {}

  ngOnInit(): void {
    this.adminService.getKids().subscribe((response: any) => {
      this.dataSource = new MatTableDataSource(response.kids);
      this.dataSource.paginator = this.paginator;
    });
  }

  babyprofile(id) {
    this.router.navigate(['/admin/kids/profile', id]);
  }
  applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchValue = value.trim().toLowerCase();
    this.dataSource.filter = this.searchValue;
  }
}

