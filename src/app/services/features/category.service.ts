import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Category } from '../../interface/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl = 'http://localhost:8081/api/categories'; 
  private selectedCategorySource = new BehaviorSubject<Category | undefined>(undefined);
  selectedCategory$ = this.selectedCategorySource.asObservable();

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl);
  }

  selectCategory(category: Category): void {
    this.selectedCategorySource.next(category);
  }
}
