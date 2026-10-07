import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { GithubApiService } from './github-api.service';

describe('GithubApiService', () => {
  let service: GithubApiService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(GithubApiService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('pide el perfil a /users/:usuario', () => {
    service.getUser('octocat').subscribe((user) => expect(user.login).toBe('octocat'));
    const req = http.expectOne('https://api.github.com/users/octocat');
    expect(req.request.method).toBe('GET');
    req.flush({ login: 'octocat' });
  });

  it('pide hasta 100 repositorios ordenados por actualización', () => {
    service.getRepos('octocat').subscribe();
    http.expectOne('https://api.github.com/users/octocat/repos?per_page=100&sort=updated').flush([]);
  });

  const casos: Array<[number, string]> = [
    [404, 'No hemos encontrado ese usuario en GitHub.'],
    [403, 'Límite de peticiones a la API de GitHub alcanzado. Prueba en unos minutos.'],
    [500, 'Algo ha fallado al consultar la API de GitHub.']
  ];

  casos.forEach(([status, mensaje]) => {
    it(`traduce un error ${status} a un mensaje en español`, (done) => {
      service.getUser('alguien').subscribe({
        next: () => fail('no debería emitir un usuario'),
        error: (err: Error) => {
          expect(err.message).toBe(mensaje);
          done();
        }
      });
      http.expectOne('https://api.github.com/users/alguien').flush('error', { status, statusText: 'Error' });
    });
  });
});
