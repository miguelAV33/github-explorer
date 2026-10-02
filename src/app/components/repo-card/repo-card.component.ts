import { Component, Input } from '@angular/core';
import { GithubRepo } from '../../models/github-repo.model';

const LANGUAGE_COLORS: Record<string, string> = {
  JavaScript: '#e3c878',
  TypeScript: '#6f9bc9',
  Python: '#8fb08f',
  PHP: '#8f9fc9',
  HTML: '#c98f8f',
  CSS: '#a68fc9',
  Java: '#c9a468',
  'C#': '#8fc9a9',
  Shell: '#b0b0b0'
};

@Component({
  selector: 'app-repo-card',
  standalone: true,
  imports: [],
  templateUrl: './repo-card.component.html',
  styleUrl: './repo-card.component.scss'
})
export class RepoCardComponent {
  @Input({ required: true }) repo!: GithubRepo;

  get languageColor(): string {
    if (!this.repo.language) return '#5c6577';
    return LANGUAGE_COLORS[this.repo.language] ?? '#5c6577';
  }
}
