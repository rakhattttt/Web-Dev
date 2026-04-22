import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  template: `
    <header class="hdr">
      <div class="hdr-inner">
        <a class="brand" routerLink="/">
          <span class="brand-mark">S/S</span>
          <span class="brand-name">SkillSwap</span>
          <span class="brand-tag">est. 2026 · trade what you know</span>
        </a>

        <nav class="nav">
          <a routerLink="/" [routerLinkActiveOptions]="{exact: true}"
             routerLinkActive="active">Browse</a>
          <a *ngIf="auth.isLoggedIn" routerLink="/new-skill"
             routerLinkActive="active">Post a skill</a>
          <a *ngIf="!auth.isLoggedIn" routerLink="/login"
             routerLinkActive="active">Log in</a>
          <a *ngIf="!auth.isLoggedIn" routerLink="/register"
             routerLinkActive="active">Register</a>
          <ng-container *ngIf="auth.isLoggedIn && auth.user() as u">
            <span class="greet">
              <span class="dot" [style.background]="u.avatar_color"></span>
              {{ u.first_name || u.username }}
            </span>
            <button class="linkbtn" (click)="logout()">Sign out</button>
          </ng-container>
        </nav>
      </div>
      <hr class="rule">
    </header>

    <router-outlet></router-outlet>

    <footer class="ftr">
      <hr class="rule">
      <div class="ftr-inner">
        <span>SkillSwap — share what you know, learn what you don't.</span>
      </div>
    </footer>
  `,
  styles: [`
    .hdr { position: relative; z-index: 1; padding-top: 18px; }
    .hdr-inner {
      max-width: 1280px; margin: 0 auto;
      display: flex; align-items: flex-end; justify-content: space-between;
      padding: 0 40px 14px; gap: 24px;
      flex-wrap: wrap;
    }
    .brand {
      display: flex; align-items: baseline; gap: 12px;
      text-decoration: none; color: inherit;
    }
    .brand-mark {
      font-family: var(--ff-display);
      font-weight: 900;
      font-size: 36px;
      letter-spacing: -0.04em;
      line-height: 1;
      background: var(--ink);
      color: var(--paper);
      padding: 4px 10px 6px;
      display: inline-block;
    }
    .brand-name {
      font-family: var(--ff-display);
      font-weight: 400;
      font-size: 30px;
      letter-spacing: -0.02em;
    }
    .brand-tag {
      font-family: var(--ff-italic);
      font-style: italic;
      font-size: 15px;
      color: var(--ink-soft);
    }
    .nav {
      display: flex; align-items: center; gap: 22px;
      font-family: var(--ff-mono);
      font-size: 12px;
      letter-spacing: 0.12em;
      text-transform: uppercase;
    }
    .nav a {
      text-decoration: none;
      color: var(--ink-soft);
      padding-bottom: 2px;
      border-bottom: 1px solid transparent;
      transition: color .15s, border-color .15s;
    }
    .nav a:hover { color: var(--ink); }
    .nav a.active {
      color: var(--accent);
      border-bottom-color: var(--accent);
    }
    .greet {
      display: inline-flex; align-items: center; gap: 8px;
      font-family: var(--ff-italic);
      font-style: italic;
      font-size: 16px;
      text-transform: none;
      letter-spacing: 0;
      color: var(--ink);
    }
    .dot {
      width: 10px; height: 10px; border-radius: 50%;
      border: 1px solid var(--ink);
    }
    .linkbtn {
      background: none; border: 0; cursor: pointer;
      font: inherit; color: var(--ink-soft);
      padding: 0;
      border-bottom: 1px solid var(--rule);
    }
    .linkbtn:hover { color: var(--accent); border-color: var(--accent); }

    .ftr { position: relative; z-index: 1; margin-top: 60px; }
    .ftr-inner {
      max-width: 1280px; margin: 0 auto;
      padding: 20px 40px 40px;
      display: flex; justify-content: space-between; gap: 20px;
      font-family: var(--ff-italic); font-style: italic;
      color: var(--ink-soft); font-size: 14px;
      flex-wrap: wrap;
    }
    .ftr-inner .mono {
      font-family: var(--ff-mono); font-style: normal;
      font-size: 10px; letter-spacing: 0.18em;
      text-transform: uppercase;
    }
  `],
})
export class AppComponent implements OnInit {
  auth = inject(AuthService);

  ngOnInit(): void {
    if (this.auth.isLoggedIn) {
      this.auth.fetchMe().subscribe();
    }
  }

  logout() {
    this.auth.logout();
  }
}
