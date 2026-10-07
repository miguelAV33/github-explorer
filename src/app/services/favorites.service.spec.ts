import { TestBed } from '@angular/core/testing';
import { FavoritesService } from './favorites.service';

const STORAGE_KEY = 'github-explorer:favorites';

describe('FavoritesService', () => {
  beforeEach(() => {
    localStorage.clear();
    TestBed.resetTestingModule();
  });

  it('empieza vacío si no hay nada guardado', () => {
    const service = TestBed.inject(FavoritesService);
    expect(service.list()).toEqual([]);
  });

  it('añade y quita un usuario con toggle, sin distinguir mayúsculas', () => {
    const service = TestBed.inject(FavoritesService);

    service.toggle('Torvalds');
    expect(service.list()).toEqual(['torvalds']);
    expect(service.isFavorite('TORVALDS')).toBeTrue();

    service.toggle('torvalds');
    expect(service.list()).toEqual([]);
    expect(service.isFavorite('torvalds')).toBeFalse();
  });

  it('guarda los favoritos en localStorage', () => {
    const service = TestBed.inject(FavoritesService);
    service.toggle('gaearon');
    service.toggle('sindresorhus');
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')).toEqual(['gaearon', 'sindresorhus']);
  });

  it('recupera los favoritos guardados al arrancar', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(['octocat']));
    const service = TestBed.inject(FavoritesService);
    expect(service.list()).toEqual(['octocat']);
  });

  it('no se rompe si lo guardado no es JSON válido', () => {
    localStorage.setItem(STORAGE_KEY, '{roto');
    const service = TestBed.inject(FavoritesService);
    expect(service.list()).toEqual([]);
  });

  it('sigue funcionando en memoria si localStorage falla (navegación privada)', () => {
    spyOn(Storage.prototype, 'setItem').and.throwError('QuotaExceededError');
    const service = TestBed.inject(FavoritesService);
    expect(() => service.toggle('octocat')).not.toThrow();
    expect(service.list()).toEqual(['octocat']);
  });
});
