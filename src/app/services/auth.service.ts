import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as auth0 from 'auth0-js';

(window as any).global = window;


@Injectable()
export class AuthService {

  auth0 = new auth0.WebAuth({
    clientID: '9i14CMnYORR1lodsOCZFKDJyde76W6ZW',
    domain: 'sprintapp.auth0.com',
    responseType: 'token id_token',
    audience: 'https://sprintapp.auth0.com/userinfo',
    redirectUri: 'http://localhost:4200/sprint',
    scope: 'openid email profile'
  });

  /**
   * store user information
   */
  private profile;

  constructor(public router: Router) {
  }
  /**
   * func called when user clicked on login
   */
  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        //this.setSession(authResult);
        this.getUserInfo(authResult)
        this.router.navigate(['/sprint']);
      } else if (err) {
        this.router.navigate(['/']);
        console.log(err);
      }
    });
  }

  handleLoginCallback() {
    // When Auth0 hash parsed, get profile
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken) {
        window.location.hash = '';
        this.getUserInfo(authResult);
      } else if (err) {
        console.error(`Error: ${err.error}`);
      }
    });
  }
  getAccessToken() {
    this.auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken) {
        this.getUserInfo(authResult);
      }
    });
  }

  private getUserInfo(authResult) {
    this.auth0.client.userInfo(authResult.accessToken, (err, profile) => {
      if (profile) {
        this.setSession(authResult, profile);
        this.router.navigate(['sprint']);
      }
    });
  }
  private setSession(authResult, profile) {
    this.profile = profile;
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    localStorage.setItem('userName', this.profile.name);
    localStorage.setItem('id', this.profile.sub);
  }

  /**
   * func when user clicked to logout
   */
  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('userName');
    // Go back to the home route
    this.router.navigate(['/']);
  }

  /**
   * func to know if user is authenticated.
   */
  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // Access Token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');
    return new Date().getTime() < expiresAt;
  }

  /**
   * get user Name.
   */
  public getName(): string{
    return  localStorage.getItem('userName');
  }

  /**
   * get user ID.
   */
  public getID(): string{
    return  localStorage.getItem('id');
  }
}

