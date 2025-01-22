import { Injectable, OnInit, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit{
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
   _key =  signal<string | null>('')

  get key(): string | null {
    return this._key();
  }

  set key(value: string | null) {
    this._key.set(value);
    if (value) {
      localStorage.setItem('authKey', value);
    } else {
      localStorage.removeItem('authKey');
    }
  }
}
