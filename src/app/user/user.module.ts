import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './profile/profile.component';
import { MykidsComponent } from './mykids/mykids.component';
import { RegisterkidComponent } from './registerkid/registerkid.component';
import { UserNavComponent } from './user-nav/user-nav.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { BabyProfileComponent } from './baby-profile/baby-profile.component';
import { VerifyOTPComponent } from './verify-otp/verify-otp.component';
import { EditbabyComponent } from './editbaby/editbaby.component';
import { SpinnerComponent } from '../shared/spinner/spinner.component';


@NgModule({
  declarations: [
    HomePageComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    MykidsComponent,
    RegisterkidComponent,
    UserNavComponent,
    EditProfileComponent,
    BabyProfileComponent,
    VerifyOTPComponent,
    EditbabyComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    CommonModule,
    UserRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    
  
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [UserNavComponent, CommonModule, RouterModule],
})
export class UserModule {}
