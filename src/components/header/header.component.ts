
import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';
import { User } from '../../models/user';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { DirectiveDirective } from '../../directives/directive.directive';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    RouterModule,
    CommonModule,
    DirectiveDirective
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  
    constructor(private dialog: MatDialog,private authService:AuthService) {
    }
  isLogded(){
    return this.authService.isLoggedIn();
  }
  logout(){
    this.authService.logout();
  }
  isAdmin(){
    return this.authService.isAdmin();
  }
  openLoginDialog() {
    this.dialog.open(LoginComponent);
  }

  openSignupDialog() {
    this.dialog.open(SignupComponent);
  }
}
