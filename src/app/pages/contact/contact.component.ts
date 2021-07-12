import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  nomeEmpresa = environment.nomeEmpresa;
  emailEmpresa = environment.emailEmpresa;

  constructor() { }

  ngOnInit(): void {
  }

}
