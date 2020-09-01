
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  title: string;
  rows: Product[] = [];

  p: number = 1;
  limit: number = 3;
  total: number;

  constructor(
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit() {
    this.title = 'Products';
    this.getProducts(this.p);
  }

  getProducts(p: number) {
    let offset = (p - 1) * this.limit;
    this.productService.getProducts(offset, this.limit).subscribe(
      result => {
        this.rows = result.data;
        this.total = result.total;
      }
    )
  }

  getPage(pageNo: number) {
    this.p = pageNo;
    this.getProducts(this.p);
  }

  deleteProduct(id: number) {
    if(confirm('Are you sure want to delete?')) {
      this.productService.deleteProduct(id).subscribe(
        result => {
          console.log(result);
          if ( ! result.error) {
            this.rows = this.rows.filter(item => item.id != id)
          } else {
            alert('Some thingh went wrong!');
          }
        }
      )
    }
  }

}

