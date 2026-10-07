import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  searchForm;

  readonly examples = ['torvalds', 'miguelAV33', 'gaearon', 'sindresorhus'];
  submitted = signal(false);

  constructor(private fb: FormBuilder, private router: Router) {
    this.searchForm = this.fb.group({
      username: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z0-9-]{1,39}$/)]
      ]
    });
  }

  get username() {
    return this.searchForm.controls.username;
  }

  onSubmit(): void {
    this.submitted.set(true);
    if (this.searchForm.invalid) return;

    const value = this.username.value?.trim();
    if (value) {
      this.router.navigate(['/usuario', value]);
    }
  }

  searchExample(name: string): void {
    this.searchForm.patchValue({ username: name });
    this.router.navigate(['/usuario', name]);
  }
}
