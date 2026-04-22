import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <section class="page auth">
      <div class="auth-left">
        <span class="eyebrow">Sign in</span>
        <h1 class="auth-title">
          Welcome <em>back</em>.
        </h1>
        <p class="auth-lede">
          Sign in with your credentials. We'll use your access token —
          stamped by the Django backend, delivered on every request —
          to unlock the parts of SkillSwap reserved for members.
        </p>
        <p class="hint">
          <strong>Demo accounts:</strong>
          <code>rakhat</code>, <code>nurgisa</code>, <code>erkebulan</code>,
          <code>madiyar</code>, <code>aiym</code> —
          password <code>password123</code>.
        </p>
      </div>

      <form class="auth-form" (submit)="$event.preventDefault(); submit()">
        <div class="field">
          <label>Username</label>
          <input type="text" name="u" [(ngModel)]="username" autofocus>
        </div>
        <div class="field">
          <label>Password</label>
          <input type="password" name="p" [(ngModel)]="password">
        </div>

        <p class="err" *ngIf="error() as e">⚠ {{ e }}</p>

        <div class="actions">
          <button type="submit" class="btn" [disabled]="loading()">
            {{ loading() ? 'Signing in…' : 'Sign in' }}
          </button>
          <a routerLink="/register" class="alt">No account? Register →</a>
        </div>
      </form>
    </section>
  `,
  styleUrls: ['./auth.shared.css'],
})
export class LoginComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  username = '';
  password = '';
  loading = signal(false);
  error = signal<string | null>(null);

  submit() {
    this.loading.set(true);
    this.error.set(null);
    this.auth.login(this.username, this.password).subscribe({
      next: () => { this.loading.set(false); this.router.navigateByUrl('/'); },
      error: err => {
        this.loading.set(false);
        this.error.set(err.error?.detail || 'Login failed. Check credentials.');
      },
    });
  }
}
