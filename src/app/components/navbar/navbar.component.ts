import { User } from './../../shared/models/user';
import { UserService } from './../../shared/services/user.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  currentUser: User
  private subs = new Subscription()

  constructor(
    private userService: UserService
  ) {
    this.currentUser = this.userService.currentUserValue
  }

  ngOnInit(): void {
    this.subscribeToCurrentUser()
  }

  subscribeToCurrentUser() {
    this.subs.add( // creates a new subscription
      this.userService.currentUser.subscribe(user => { // creates the subscription to our currentUser
        if (user) { // checks to see if the logged in user exists
          this.currentUser = user // sets our currentUser value in our component
        } else { // if the current user doesn't exist
          this.currentUser = null // we set the current user as null
        }
      })
    )
  }

  logoutUser() {
    this.userService.logoutUser()
  }

  ngOnDestroy() {
    this.subs.unsubscribe()
  }

}
