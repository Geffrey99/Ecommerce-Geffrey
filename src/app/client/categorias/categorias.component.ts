import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/features/category.service';
import { Category } from '../../interface/Category';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.css',
})
export class CategoriasComponent implements OnInit {
  category: Category | undefined;
  private imageBaseUrl = 'http://localhost:8081/api/product-images/';
  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const categoryName = params['name'];
      this.categoryService.getCategories().subscribe(categories => {
        this.category = categories.find(c => c.name === categoryName);
      });
    });
  }

  getFullImageUrl(photoUrl: string): string {
    return photoUrl ? `${this.imageBaseUrl}${photoUrl}` : 'assets/okOk.svg';
  }

}
