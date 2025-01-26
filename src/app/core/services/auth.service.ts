import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _key: string | null = null;
  private _loggedInSubject = new BehaviorSubject<boolean>(false);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this._key = localStorage.getItem('authKey');
      this._loggedInSubject.next(!!this._key); 
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
    this._loggedInSubject.next(!!this._key); 
  }

  get loggedIn$() {
    return this._loggedInSubject.asObservable();
  }
}
