
import { Component, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from '../header/header.component';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { RouterModule, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, HeaderComponent , CommonModule,
    RouterModule ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  user$!: Observable<User>;
  @ViewChild(RouterOutlet) outlet!: RouterOutlet;
  isEmpty = true;
constructor(private userService: UserService) {
    this.user$ = this.userService.user;
  }
  ngAfterViewInit() {
    // מאזין לשינויים בנתיב כדי לבדוק אם יש רכיב נטען
    setTimeout(() => {
      this.isEmpty = !this.outlet.isActivated;
    }, 0);
  }
  
}
