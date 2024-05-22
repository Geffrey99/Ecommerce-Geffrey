import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  HeaderComponent } from '../shared/header/header.component';
import { RouterModule } from '@angular/router';
import { ProductComponent } from '../features/product/product.component';
@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [ CommonModule, HeaderComponent, ProductComponent, RouterModule]
})
export class HomeComponent {

}
