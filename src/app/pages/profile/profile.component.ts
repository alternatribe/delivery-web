import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  currentUser: any;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.currentUser = this.authService.getUser();
  }
}

