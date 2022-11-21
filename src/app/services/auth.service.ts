import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedInGuard: boolean =  false;

  constructor(private aAuth: AngularFireAuth,
              private router: Router) { }

  login(email: string, password: string) {
    this.aAuth.signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('Login Success')
        this.loadUser()
        this.loggedIn.next(true)
        this.isLoggedInGuard = true
        this.router.navigate(['/'])
      })
      .catch(e => {
        console.log('Something went wrong')
      })
  }

  loadUser() {
    this.aAuth.authState.subscribe(user => {
      localStorage.setItem('user', JSON.stringify(user))
    })
  }

  logoutUser() {
    this.aAuth.signOut()
      .then(() => {
        console.log('Logout Success')
        localStorage.removeItem('user')
        this.loggedIn.next(false)
        this.isLoggedInGuard = false
        this.router.navigate(['/login'])
      })
  }

  isLoggedIn() {
    return this.loggedIn.asObservable();
  }
}
