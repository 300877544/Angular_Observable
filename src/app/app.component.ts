import { Component } from '@angular/core';
import { map, switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MovieService } from './services/movie.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular_movies';
  searchControl: FormControl = new FormControl();
  searchControl1: FormControl = new FormControl();
  movies$: Observable<any[]> = new Observable;
  moviesDetails$: Observable<any[]> = new Observable;
  result:any;
  mapAccumulator1:any;
  constructor(private movieService: MovieService) {}
  ngOnInit() {
    
    this.searchControl = new FormControl();
    this.searchControl1 = new FormControl();
    this.movies$ = this.searchControl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(
          searchString => this.movieService.getMovieBySearchTerm(searchString)
        ),
        map(function(res:any) {
          console.log(res);
        return res.Search
      }
      )
      );

      this.moviesDetails$ = this.searchControl1.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(
          searchString1 => this.movieService.getDetailsMovie(searchString1)
        ),
        map( (res:any) =>{
          this.result = []
         for(const key in res) {
          this.result.push({key, value: res[key]});
       }
       return this.result;
      })
    
      );
      
      this.moviesDetails$.subscribe(mesg => 
        console.log(mesg));

  }
}
