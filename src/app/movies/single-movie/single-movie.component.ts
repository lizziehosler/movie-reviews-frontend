import { UserService } from './../../shared/services/user.service';
import { User } from './../../shared/models/user';
import { map, timestamp } from 'rxjs/operators';
import { Review } from './../../shared/models/review';
import { Movie } from './../../shared/models/movie';
import { MovieService } from './../../shared/services/movie.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-single-movie',
  templateUrl: './single-movie.component.html',
  styleUrls: ['./single-movie.component.scss']
})
export class SingleMovieComponent implements OnInit, OnDestroy {
  movie: Movie
  movieImg: string
  reviews: Review[]
  avgMovieRating = 5.0
  currentUser: User
  private subs = new Subscription()
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private movieService: MovieService,
    private userService: UserService
  ) {
    this.currentUser = this.userService.currentUserValue
  }

  ngOnInit(): void {
    this.route.params.subscribe(movie => {
      if (movie && movie.id) {
        this.retrieveMovieById(movie.id)
      }

    })
  }

  retrieveMovieById(id: number) {
    const params = { id: id }
    this.subs.add(
      this.movieService.getMovieById(params).subscribe(data => {
        if (data && data.movie && data.reviews) {
          this.movie = new Movie(data.movie)
          this.movieImg = this.movie.image
          this.reviews = data.reviews.map(x => new Review(x))
          if (this.reviews.length) {
            this.computeTheAverageReviewRating(this.reviews)
          }
        }
      }, error => {
        if (error) {
          console.log(error)
        }
      })
    )
  }

  computeTheAverageReviewRating(reviews: Review[]) {
    const totalReviews = reviews.length || 0
    let totalRating = 0
    reviews.forEach(x => {
      totalRating += x.rating
    })
    this.avgMovieRating = ( totalRating / totalReviews)

  }

  setDefaultPic() {
    this.movieImg = 'assets/images/placeholder.png'

  }

  routeToWriteReview() {
    this.router.navigate([`reviews/${this.movie.id}/new`])

  }

  editMovie() {

  }

  deleteMovie() {

  }

  ngOnDestroy() {
    this.subs.unsubscribe()
  }

}
