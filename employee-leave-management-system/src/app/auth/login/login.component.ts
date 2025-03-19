import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { ToastrService } from 'src/app/shared/toastr.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService,private location:Location) { }

  ngOnInit(): void {
    this.authService.logout();
  }

  onLogin() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        if (response.token) {
          const decodedToken: any = jwtDecode(response.token);
          // Store token and user ID using AuthService
          this.authService.saveAuthData(response.token, decodedToken.sub);
          this.toastr.showSuccess('Login successful!');

          if (decodedToken.role === 'Admin') {
            this.router.navigate(['/admin'], { replaceUrl: true });
          }
          else if (decodedToken.role === 'User') {
            this.router.navigate(['/user'], { replaceUrl: true });
          }
        }
        else {
          this.toastr.showError('Something went wrong')
        }
      },
      error: () => this.toastr.showError('Invalid credentials')
    });
  }
}