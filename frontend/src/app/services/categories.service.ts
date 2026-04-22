import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { API } from './api.config';
import { Category, Paginated } from '../models/models';

@Injectable({ providedIn: 'root' })
export class CategoriesService {
  private http = inject(HttpClient);

  list(): Observable<Paginated<Category>> {
    return this.http.get<Paginated<Category>>(`${API}/categories/`);
  }
}
