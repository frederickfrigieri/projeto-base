import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-autenticado',
  templateUrl: './autenticado.component.html',
  styleUrls: ['./autenticado.component.scss']
})
export class AutenticadoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onActivate(): void {
    window.scroll(0, 0);
  }

}
