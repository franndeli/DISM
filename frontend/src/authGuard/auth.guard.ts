import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
  ): boolean {
    const userRole = localStorage.getItem('rol');
    const requiredRole = route.data['rol'];

    const redirectTo = route.data['redirect'];

    if (userRole === requiredRole) {
      return true;
    } else {
      this.router.navigate([`${redirectTo}/`]);
      return false;
    }
  }
}