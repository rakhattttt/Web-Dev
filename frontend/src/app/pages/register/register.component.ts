import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <section class="page auth">
      <div class="auth-left">
        <span class="eyebrow">Create an account</span>
        <h1 class="auth-title">
          Start <em>swapping</em>.
        </h1>
        <p class="auth-lede">
          Four fields, one tap. We'll hand you back a JWT pair
          (access + refresh) and the app will carry them on
          every protected request for you — quietly, via the interceptor.
        </p>
      </div>

      <form class="auth-form" (submit)="$event.preventDefault(); submit()">
        <div class="field">
          <label>Username</label>
          <input type="text" name="u" [(ngModel)]="f.username">
        </div>
        <div class="field">
          <label>First name</label>
          <input type="text" name="fn" [(ngModel)]="f.first_name">
        </div>
        <div class="field">
          <label>Last name</label>
          <input type="text" name="ln" [(ngModel)]="f.last_name">
        </div>
        <div class="field">
          <label>Password (min. 6)</label>
          <input type="password" name="p" [(ngModel)]="f.password">
        </div>

        <p class="err" *ngIf="error() as e">⚠ {{ e }}</p>

        <div class="actions">
          <button type="submit" class="btn" [disabled]="loading()">
            {{ loading() ? 'Creating…' : 'Create account' }}
          </button>
          <a routerLink="/login" class="alt">Have an account? Sign in →</a>
        </div>
      </form>
    </section>
  `,
  styleUrls: ['../login/auth.shared.css'],
})
export class RegisterComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  f = {
    username: '',
    first_name: '',
    last_name: '',
    password: '',
  };
  loading = signal(false);
  error = signal<string | null>(null);

  submit() {
    this.loading.set(true);
    this.error.set(null);
    this.auth.register(this.f).subscribe({
      next: () => {

        this.auth.login(this.f.username, this.f.password).subscribe({
          next: () => {
            this.loading.set(false);
            this.router.navigateByUrl('/');
          },
        });
      },
      error: err => {
        this.loading.set(false);
        const data = err.error;
        const msg = typeof data === 'object'
          ? Object.values(data).flat().join(' · ')
          : 'Registration failed.';
        this.error.set(msg);
      },
    });
  }
}
