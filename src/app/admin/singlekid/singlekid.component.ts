import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params,Router } from '@angular/router';
import { AdminService } from 'src/app/shared/services/admin.service';
@Component({
  selector: 'app-singlekid',
  templateUrl: './singlekid.component.html',
  styleUrls: ['./singlekid.component.css'],
})
export class SinglekidComponent implements OnInit {
  id: any
  data: any;
  constructor(
    private route: ActivatedRoute,
    private adminService:AdminService,
    private router:Router
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id=params['id']
      this.loadbaby(this.id)
    })
  }
  loadbaby(id) {
    this.adminService.getBabyProfile(id).subscribe((response:any) => {
      this.data=response.data
      console.log(this.data);
    })
  }
  mealplan(id) {
    console.log(id);
    this.router.navigateByUrl('/mealplan')
    
  }
  allotmentor(id) {
    this.router.navigateByUrl('/allot/'+id )
  }
}
