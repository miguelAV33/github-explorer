import { Injectable, signal } from '@angular/core';

const STORAGE_KEY = 'github-explorer:favorites';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  // Singleton service holding shared state across components — the
  // same pattern used to avoid ephemeral component state resetting
  // on navigation.
  private readonly favorites = signal<string[]>(this.loadFromStorage());

  readonly list = this.favorites.asReadonly();

  isFavorite(username: string): boolean {
    return this.favorites().includes(username.toLowerCase());
  }

  toggle(username: string): void {
    const key = username.toLowerCase();
    const current = this.favorites();
    const next = current.includes(key)
      ? current.filter((u) => u !== key)
      : [...current, key];

    this.favorites.set(next);
    this.saveToStorage(next);
  }

  private loadFromStorage(): string[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  private saveToStorage(list: string[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch {
      // localStorage unavailable (private browsing, quota, etc.) — fail silently
    }
  }
}
