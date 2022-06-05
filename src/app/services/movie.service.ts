import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http:HttpClient,
    private router:Router) { }

    getMovieBySearchTerm(query:any) {
      return this.http.get(`https://www.omdbapi.com/?s=${query}&apikey=fd3201a8`);
    }

    getDetailsMovie(query:any) {
      return this.http.get(`https://www.omdbapi.com/?i=${query}&apikey=fd3201a8`);
    }

}
