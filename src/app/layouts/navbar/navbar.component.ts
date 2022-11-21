import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  navButtonState: boolean = true

  userEmail: string = ''

  isLoggedIn$: Observable<boolean> | undefined

  constructor(private authService: AuthService) {}

  ngOnInit(): void {

    this.isLoggedIn$ = this.authService.isLoggedIn()

    if (this.isLoggedIn$) {

      // @ts-ignore
      if(JSON.parse(localStorage.getItem('user'))){
        // @ts-ignore
        this.userEmail = JSON.parse(localStorage.getItem('user')).email
      }
    }
  }

  smallNavToggle() {
    this.navButtonState = !this.navButtonState
  }

  onLogout() {
    this.authService.logoutUser()
  }

}
