import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { AuthService } from '../../core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MenubarModule, RouterOutlet],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  items: any | undefined;
  private loggedInSubscription: Subscription | undefined;

  loggedIn = signal(false);
  constructor(private router: Router, private authService: AuthService) {
  }

  ngOnInit(): void {
     this.loggedIn.set(!!this.authService.key); // Check if the user is logged in
     this.loggedInSubscription = this.authService.loggedIn$.subscribe(loggedIn => {
      this.updateMenuItems(loggedIn);
    });
  }
 
  updateMenuItems(loggedIn: boolean): void {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: ['/'],
      },
    ];

    if (loggedIn) {
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
    this.authService.key = null; 
    this.router.navigate(['/auth']); 
  }

  ngOnDestroy(): void {
    if (this.loggedInSubscription) {
      this.loggedInSubscription.unsubscribe();
    }
  }
}
