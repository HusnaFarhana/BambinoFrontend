import { Component ,OnInit} from '@angular/core';
import { StaffService } from 'src/app/shared/services/staff.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-mykids',
  templateUrl: './mykids.component.html',
  styleUrls: ['./mykids.component.css'],
})
export class MykidsComponent implements OnInit {
  staffid: string = '';
  token: any;
  decoded: any;
  data: any;
  error = null;
  empty: boolean = false;

  constructor(private staffService: StaffService) {}

  ngOnInit(): void {
    this.token = localStorage.getItem('staff_token');
    this.decoded = jwt_decode(this.token);
    this.staffid = this.decoded.staffid;
    this.staffService.getKids(this.staffid).subscribe(
      (response) => {  
        this.data = response.data;
        console.log(this.data,'hereee');
        if (this.data.length === 0) {
          this.empty = true;
        }
      },
      (error) => {
        this.error = error.message;
      }
    );
  }




}
