import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home',
  template: ''
})
export class HomeComponent implements OnInit {
  private startPage: string = environment.startPage;

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (this.startPage === "") {
      this.router.navigateByUrl("about");
    } else {
      this.router.navigateByUrl(this.startPage);
    }
  }

}
