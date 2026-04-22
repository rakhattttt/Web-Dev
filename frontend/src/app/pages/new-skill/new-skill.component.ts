import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { CategoriesService } from '../../services/categories.service';
import { SkillsService } from '../../services/skills.service';
import { AuthService } from '../../services/auth.service';
import { Category, NewSkillPayload } from '../../models/models';

@Component({
  selector: 'app-new-skill',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="page auth">
      <div class="auth-left">
        <span class="eyebrow">New listing</span>
        <h1 class="auth-title">
          Post a&nbsp;<em>skill</em>.
        </h1>
        <p class="auth-lede">
          Offer what you can teach, or ask for what you'd like to learn.
          The interceptor attaches your access token silently —
          you'll never have to think about headers.
        </p>
      </div>

      <form class="auth-form" *ngIf="auth.isLoggedIn; else notLogged"
            (submit)="$event.preventDefault(); submit()">
        <div class="field">
          <label>Title</label>
          <input type="text" name="t" [(ngModel)]="f.title">
        </div>
        <div class="field">
          <label>Description</label>
          <textarea name="d" rows="3" [(ngModel)]="f.description"></textarea>
        </div>
        <div class="field-row">
          <div class="field">
            <label>Kind</label>
            <select name="k" [(ngModel)]="f.kind">
              <option value="offer">Teach (offer)</option>
              <option value="request">Learn (request)</option>
            </select>
          </div>
          <div class="field">
            <label>Level</label>
            <select name="l" [(ngModel)]="f.level">
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>
        <div class="field">
          <label>Category</label>
          <select name="c" [(ngModel)]="f.category_id">
            <option [ngValue]="0" disabled>Choose a category…</option>
            <option *ngFor="let c of categories()" [ngValue]="c.id">
              {{ c.name }}
            </option>
          </select>
        </div>
        <label class="f-check">
          <input type="checkbox" name="r" [(ngModel)]="f.is_remote">
          <span>Available remotely</span>
        </label>

        <p class="err" *ngIf="error() as e">⚠ {{ e }}</p>

        <div class="actions">
          <button type="submit" class="btn" [disabled]="loading()">
            {{ loading() ? 'Posting…' : 'Publish' }}
          </button>
        </div>
      </form>

      <ng-template #notLogged>
        <div class="auth-form">
          <p style="margin:0 0 14px">You need to sign in first.</p>
          <a href="/login" class="btn">Go to sign in</a>
        </div>
      </ng-template>
    </section>
  `,
  styleUrls: ['../login/auth.shared.css'],
  styles: [`
    textarea { border: 1px solid var(--rule-strong); padding: 10px; resize: vertical; }
    .field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
    .f-check {
      display: flex; align-items: center; gap: 10px;
      font-family: var(--ff-italic); font-style: italic;
      text-transform: none; letter-spacing: 0; color: var(--ink-soft);
      margin: 12px 0 0; font-size: 16px;
    }
    .f-check input { width: auto; accent-color: var(--accent); }
  `],
})
export class NewSkillComponent implements OnInit {
  auth = inject(AuthService);
  private skills = inject(SkillsService);
  private cats = inject(CategoriesService);
  private router = inject(Router);

  categories = signal<Category[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  f: NewSkillPayload = {
    title: '',
    description: '',
    kind: 'offer',
    level: 'beginner',
    is_remote: true,
    category_id: 0,
  };

  ngOnInit(): void {
    this.cats.list().subscribe(res => {
      this.categories.set(res.results);
      if (res.results.length && !this.f.category_id) {
        this.f.category_id = res.results[0].id;
      }
    });
  }

  submit() {
    if (!this.f.title.trim() || !this.f.category_id) {
      this.error.set('Title and category are required.');
      return;
    }
    this.loading.set(true);
    this.error.set(null);
    this.skills.create(this.f).subscribe({
      next: () => { this.loading.set(false); this.router.navigateByUrl('/'); },
      error: err => {
        this.loading.set(false);
        const data = err.error;
        const msg = typeof data === 'object' && data
          ? Object.values(data).flat().join(' · ')
          : 'Failed to create listing.';
        this.error.set(msg);
      },
    });
  }
}
