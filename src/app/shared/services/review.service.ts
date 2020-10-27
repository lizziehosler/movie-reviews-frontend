import { Observable } from 'rxjs';
import { Review } from './../models/review';
import { environment } from './../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private reviewApi: string
  constructor(
    private http: HttpClient
  ) {
    this.reviewApi = `${environment.apiUrl}api/v1/reviews`
  }

  getReviewById(params): Observable<Review> {
    return this.http.get<Review>(`${this.reviewApi}/show?id=${params.id}`)
  }

  getAllReviews() {
    return this.http.get<any>(`${this.reviewApi}/index`)
  }

  createReview(params) {
    return this.http.post<any>(`${this.reviewApi}/create`, params)
  }

  updateReview(params) {
    return this.http.patch<any>(`${this.reviewApi}/update`, params)
  }

  deleteReview(params) {
    return this.http.delete<any>(`${this.reviewApi}/${params.id}`)
  }


}
