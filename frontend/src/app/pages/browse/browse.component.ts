import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SkillsService, SkillQuery } from '../../services/skills.service';
import { CategoriesService } from '../../services/categories.service';
import { Category, Paginated, Skill } from '../../models/models';

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css'],
})
export class BrowseComponent implements OnInit {
  private skillsApi = inject(SkillsService);
  private catsApi = inject(CategoriesService);

  loading = signal(true);
  error = signal<string | null>(null);
  page = signal<Paginated<Skill> | null>(null);
  categories = signal<Category[]>([]);

  q: SkillQuery = {
    search: '',
    kind: '',
    level: '',
    categorySlug: '',
    remoteOnly: false,
    ordering: '-created_at',
    page: 1,
  };

  orderings = [
    { v: '-created_at', label: 'Newest' },
    { v: 'created_at',  label: 'Oldest' },
    { v: 'title',       label: 'Title A→Z' },
    { v: '-title',      label: 'Title Z→A' },
  ];

  ngOnInit(): void {
    this.catsApi.list().subscribe(res => this.categories.set(res.results));
    this.reload();
  }

  reload(): void {
    this.loading.set(true);
    this.error.set(null);
    this.skillsApi.list(this.q).subscribe({
      next:  res => { this.page.set(res); this.loading.set(false); },
      error: err => {
        this.error.set(err.message || 'Failed to load.');
        this.loading.set(false);
      },
    });
  }

  apply(): void {
    this.q.page = 1;
    this.reload();
  }

  reset(): void {
    this.q = {
      search: '', kind: '', level: '', categorySlug: '',
      remoteOnly: false, ordering: '-created_at', page: 1,
    };
    this.reload();
  }

  go(page: number): void {
    this.q.page = page;
    this.reload();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  get totalPages(): number {
    const p = this.page();
    if (!p) { return 1; }
    return Math.max(1, Math.ceil(p.count / 10));
  }

  get pageNumbers(): number[] {
    const total = this.totalPages;
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  initials(u: { first_name: string; last_name: string; username: string }): string {
    const a = (u.first_name || u.username || '?')[0] ?? '';
    const b = (u.last_name || '')[0] ?? '';
    return (a + b).toUpperCase();
  }
}
