import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  navButtonState: boolean = true

  constructor() { }

  ngOnInit(): void {
  }

  smallNavToggle() {
    this.navButtonState = !this.navButtonState
  }

}
