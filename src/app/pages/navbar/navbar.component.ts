import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { AuthService } from '../../core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MenubarModule, RouterOutlet],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  items: any | undefined;
  
  loggedIn = signal(false);
  constructor(private router: Router, private authService: AuthService) {
  }

  ngOnInit(): void {
     this.loggedIn.set(!!this.authService.key); // Check if the user is logged in

     this.updateMenuItems()
  }
  updateMenuItems(): void {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: ['/'],
      },
    ];

    if (this.loggedIn()) {
      this.items.push(
        {
          label: 'Add Product',
          icon: 'pi pi-plus',
          routerLink: ['/add-product'],
        },
        {
          label: 'Logout',
          icon: 'pi pi-sign-out',
          command: () => this.logOut(),
        }
      );
    }
  }

  logOut() {
    this.authService.key = null; // Clear the key in the service
    this.loggedIn.set(false); // Update the signal to false
    this.router.navigate(['/auth']); // Navigate to the login page
    this.updateMenuItems(); // Rebuild the menu items
  }
}
