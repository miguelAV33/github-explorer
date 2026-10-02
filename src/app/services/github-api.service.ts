import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { GithubUser } from '../models/github-user.model';
import { GithubRepo } from '../models/github-repo.model';

@Injectable({
  providedIn: 'root'
})
export class GithubApiService {
  private readonly baseUrl = 'https://api.github.com';

  constructor(private http: HttpClient) {}

  getUser(username: string): Observable<GithubUser> {
    return this.http
      .get<GithubUser>(`${this.baseUrl}/users/${username}`)
      .pipe(catchError(this.handleError));
  }

  getRepos(username: string): Observable<GithubRepo[]> {
    return this.http
      .get<GithubRepo[]>(
        `${this.baseUrl}/users/${username}/repos?per_page=100&sort=updated`
      )
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 404) {
      return throwError(() => new Error('No hemos encontrado ese usuario en GitHub.'));
    }
    if (error.status === 403) {
      return throwError(
        () => new Error('Límite de peticiones a la API de GitHub alcanzado. Prueba en unos minutos.')
      );
    }
    return throwError(() => new Error('Algo ha fallado al consultar la API de GitHub.'));
  }
}
