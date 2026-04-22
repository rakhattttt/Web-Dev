import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { API } from './api.config';
import { NewSkillPayload, Paginated, Skill } from '../models/models';

export interface SkillQuery {
  search?: string;
  kind?: '' | 'offer' | 'request';
  level?: '' | 'beginner' | 'intermediate' | 'advanced';
  categorySlug?: string;
  remoteOnly?: boolean;
  ordering?: string;
  page?: number;
}

@Injectable({ providedIn: 'root' })
export class SkillsService {
  private http = inject(HttpClient);

  list(q: SkillQuery = {}): Observable<Paginated<Skill>> {
    let params = new HttpParams();
    if (q.search)       { params = params.set('search', q.search); }
    if (q.kind)         { params = params.set('kind', q.kind); }
    if (q.level)        { params = params.set('level', q.level); }
    if (q.categorySlug) { params = params.set('category_slug', q.categorySlug); }
    if (q.remoteOnly)   { params = params.set('is_remote', 'true'); }
    if (q.ordering)     { params = params.set('ordering', q.ordering); }
    if (q.page)         { params = params.set('page', String(q.page)); }

    return this.http.get<Paginated<Skill>>(`${API}/skills/`, { params });
  }

  get(id: number): Observable<Skill> {
    return this.http.get<Skill>(`${API}/skills/${id}/`);
  }

  create(payload: NewSkillPayload): Observable<Skill> {
    return this.http.post<Skill>(`${API}/skills/`, payload);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${API}/skills/${id}/`);
  }
}
