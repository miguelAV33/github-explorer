import { Component, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { GithubApiService } from '../../services/github-api.service';
import { FavoritesService } from '../../services/favorites.service';
import { GithubUser } from '../../models/github-user.model';
import { GithubRepo } from '../../models/github-repo.model';
import { RepoCardComponent } from '../repo-card/repo-card.component';

type SortMode = 'updated' | 'stars' | 'name';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [RouterLink, RepoCardComponent],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent {
  user = signal<GithubUser | null>(null);
  repos = signal<GithubRepo[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);
  sortMode = signal<SortMode>('updated');
  username = '';

  constructor(
    private route: ActivatedRoute,
    private api: GithubApiService,
    public favorites: FavoritesService
  ) {
    this.route.paramMap.subscribe((params) => {
      const username = params.get('username');
      if (username) {
        this.username = username;
        this.load(username);
      }
    });
  }

  private load(username: string): void {
    this.loading.set(true);
    this.error.set(null);
    this.user.set(null);

    this.api.getUser(username).subscribe({
      next: (user) => {
        this.user.set(user);
        this.loading.set(false);
      },
      error: (err: Error) => {
        this.error.set(err.message);
        this.loading.set(false);
      }
    });

    this.api.getRepos(username).subscribe({
      next: (repos) => this.repos.set(repos),
      error: () => this.repos.set([])
    });
  }

  get sortedRepos(): GithubRepo[] {
    const list = [...this.repos()].filter((r) => !r.fork);
    switch (this.sortMode()) {
      case 'stars':
        return list.sort((a, b) => b.stargazers_count - a.stargazers_count);
      case 'name':
        return list.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return list.sort(
          (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        );
    }
  }

  setSort(mode: SortMode): void {
    this.sortMode.set(mode);
  }

  toggleFavorite(): void {
    this.favorites.toggle(this.username);
  }

  formattedJoinDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long'
    });
  }
}
