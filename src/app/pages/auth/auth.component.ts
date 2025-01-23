import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [ButtonModule,InputTextModule,ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  keyControl = new FormControl('',Validators.required);
  constructor( private authService: AuthService, private router: Router){}
  login(): void {
    if(this.keyControl.invalid) {
      return
    }
    this.authService.key = this.keyControl.value;
    this.router.navigate(['/products-list']);
  }
}