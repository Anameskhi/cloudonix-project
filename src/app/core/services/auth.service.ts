import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, OnInit, PLATFORM_ID, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit{
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  private _key: string | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this._key = localStorage.getItem('authKey');
    }
  }

  get key(): string | null {
    return this._key;
  }

  set key(value: string | null) {
    this._key = value;
    if (isPlatformBrowser(this.platformId)) {
      if (value) {
        localStorage.setItem('authKey', value);
      } else {
        localStorage.removeItem('authKey');
      }
    }
  }

}
