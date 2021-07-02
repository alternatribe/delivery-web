import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  template: ''
})
export class HomeComponent implements OnInit {
  private startPage: string = "";

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (this.startPage === "") {
      this.router.navigateByUrl("about");
    } else {
      this.router.navigateByUrl(this.startPage);
    }
  }

}
