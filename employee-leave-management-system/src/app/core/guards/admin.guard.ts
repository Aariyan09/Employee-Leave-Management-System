import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { debug } from 'console';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
 
  constructor(private router:Router,private authService:AuthService){}

  canActivate(): boolean {
    const token = this.authService.getToken();;

    if (token) {
      const decodedToken: any = jwtDecode(token);
      if (decodedToken.role === 'Admin') {
        return true;
      }
    }

    this.router.navigate(['/auth/login']);
    return false;
  }
  
}
