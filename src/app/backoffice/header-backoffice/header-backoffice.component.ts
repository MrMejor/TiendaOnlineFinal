import { Component } from '@angular/core';
import {NgIf} from '@angular/common';
import {TabNotificationComponent} from '../tabs/tab-notification/tab-notification.component';
import {SidebarStatusService} from '../../services/status/sidebar-status.service';
import {SettingsStatusService} from '../../services/status/settings-status.service';
import { SettingsComponent } from '../tabs/settings/settings.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header-backoffice',
  imports: [
    NgIf,
    TabNotificationComponent,
    SettingsComponent
  ],
  standalone: true,
  templateUrl: './header-backoffice.component.html',
  styleUrl: './header-backoffice.component.scss'
})
export class HeaderBackofficeComponent {

  isActive: boolean = false;

  // Variables de tabs

  isActiveItems: any = {
    isActiveNotification: false,
    isActiveSettings: false,
  }
  user: any = {
    username: '',
    firstName: '',
    lastName: '',
    role: '',
    address: '',
  };
  constructor(
    private sidebarStatusService: SidebarStatusService,
    private settingsStatusService: SettingsStatusService,
    private userService: UserService
  ) {}

  toggleSettings() {
    this.settingsStatusService.toggleSettings();
  }
  // isActiveNotification: boolean = false;

  toggleLogo() {
    this.isActive = !this.isActive;
    this.sidebarStatusService.changeStatus(this.isActive);
  }

  toggleItem(option: string) {
    if (this.isActiveItems[option]) {
      this.isActiveItems[option] = false;
    } else {
      Object.keys(this.isActiveItems).forEach((item) => {
        this.isActiveItems[item] = false;
      });
      this.isActiveItems[option] = true;
  
      // Fetch user info when the profile dropdown is opened
      if (option === 'isActiveProfile') {
        this.fetchUserData();
      }
    }
  }
  // Fetch user data from the backend
  fetchUserData() {
    this.userService.getUserData().subscribe({
      next: (data) => {
        this.user = data; // Store the fetched data
        console.log('User data fetched:', data); // Log the data for debugging
      },
      error: (err) => {
        console.error('Error fetching user data:', err); // Log the error for debugging
      },
    });
  }

}
