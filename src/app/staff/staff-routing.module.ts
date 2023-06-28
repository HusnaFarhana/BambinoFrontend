import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaffLoginComponent } from './staff-login/staff-login.component';
import { ProfileComponent } from './profile/profile.component';
import { SinglekidComponent } from './singlekid/singlekid.component';
import { MykidsComponent } from './mykids/mykids.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: StaffLoginComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'singlekid',
        component: SinglekidComponent,
      },
      {
        path: 'mykids',
        component: MykidsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StaffRoutingModule {}
