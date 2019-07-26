import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import {
  catchError,
  debounceTime,
  filter,
  map,
  switchMap,
  tap
} from 'rxjs/operators';

@Component({
  selector: 'element-github-repos',
  templateUrl: './github-repos.component.html',
  styleUrls: ['./github-repos.component.css']
})
export class GithubReposComponent implements OnInit, OnChanges {
  @Input() username: string;

  trigger$: BehaviorSubject<string> = new BehaviorSubject(undefined);
  repos$: Observable<string[]>;

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    console.log('[ELEMENT] ngOnInit');

    this.repos$ = this.trigger$.asObservable().pipe(
      filter(Boolean),
      debounceTime(500),
      tap(username => console.log('[ELEMENT] debug username:', username)),
      switchMap(username =>
        this.httpClient
          .get(`https://api.github.com/users/${username}/repos`)
          .pipe(catchError(() => of([])))
      ),
      map((res: any[]) => res.map(r => r.name)),
      tap(repos => console.log('[ELEMENT] debug response repos:', repos))
    );
  }

  ngOnChanges() {
    console.log('[ELEMENT] ngOnChanges');
    this.trigger$.next(this.username);
  }
}
