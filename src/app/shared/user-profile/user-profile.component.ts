import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import {UseStateService} from '../../services/auth/use-state.service';
import {PopupService} from '../../services/utils/popup.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  user: any = {}; // Object to store user data

  constructor(
    private userService: UserService,
    private router: Router,
    private popupService: PopupService,
    private userStateService: UseStateService
  ) { }

  ngOnInit(): void {
    this.fetchUserData();
  }

  fetchUserData() {
    this.userService.getUserData().subscribe(
      (data) => {
        this.user = data;
        console.log('User data fetched:', data); // Log the data for debugging
      },
      (error) => {
        console.error('Error fetching user data:', error); // Log the error for debugging
      }
    );
  }


  navigateToChangePassword() {
    const userRole = this.userStateService.getRole(); // Get the user's role
  
    if (userRole === 'ADMIN') {
      this.router.navigate(['admin/change-password']); // Navigate to admin profile
    } else if (userRole === 'CLIENT') {
      this.router.navigate(['client/change-password']); // Navigate to client profile
    }  else if (userRole === 'SELLER') {
      this.router.navigate(['seller/change-password']); // Navigate to client profile
    }else {
      console.error('Unknown role:', userRole); // Handle unknown roles
      this.popupService.showMessage('Error', 'Unknown user role', 'error');
    }
  }
}