import { Movie } from './../../shared/models/movie';
import { Router } from '@angular/router';
import { UserService } from './../../shared/services/user.service';
import { User } from './../../shared/models/user';
import { Review } from './../../shared/models/review';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-single-review-card',
  templateUrl: './single-review-card.component.html',
  styleUrls: ['./single-review-card.component.scss']
})
export class SingleReviewCardComponent implements OnInit {
  currentUser: User
  movie: Movie
  @Input() review: Review
  constructor(
    private userService: UserService,
    private router: Router
  ) {
    this.currentUser = this.userService.currentUserValue
  }

  ngOnInit(): void {

  }

  routeToEditReview(id: number) {
    this.router.navigate([`reviews/${this.review.id}/edit`])
  }

}
