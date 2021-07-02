import { AuthService } from './../../services/auth/auth.service';
import { Usuario } from './../../models/usuario.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  user: Usuario = new Usuario;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.user = this.auth.userData;
  }

}
