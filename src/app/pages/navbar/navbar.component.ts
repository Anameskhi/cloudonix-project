import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MenubarModule, RouterOutlet],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  items: any | undefined;
  constructor(private router: Router) {}

  ngOnInit(): void {
    const isLoggedIn = !!localStorage.getItem('authKey');

    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: ['/'],
      },
    ];

    if (isLoggedIn) {
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
    localStorage.clear();
    this.router.navigate(['/auth']); // Navigate to the auth page
  }
}
