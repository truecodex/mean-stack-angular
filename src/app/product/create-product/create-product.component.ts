import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  productForm: FormGroup;
  model: Product;
  title: string;
  productId: number;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.title = "Create Product";
    this.createForm();

    // edit product
    this.productId = +this.route.snapshot.paramMap.get('id');
    if(this.productId) {
      this.getProduct();
    }
  }

  get f() { return this.productForm.controls; }

  goBack() {
    this.router.navigateByUrl('/backend/product');
  }

  createForm() {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      sku: [''],
      price: ['', [Validators.required, Validators.pattern('[0-9.]*')]],
      is_active: [1]
    })
  }

  onSubmit() {
    //this.model = this.productForm.value;
    if (this.productId) {
      this.updateProduct();
    } else {
      this.addProduct();
    }
  }

  addProduct() {
    this.model = this.productForm.value;
    this.productService.addProduct(this.model).subscribe(
      result => {
        console.log(result);
        if ( ! result.error) {
          this.router.navigateByUrl('/backend/product');
        } else {
          alert('Some thingh went wrong!');
        }
      }
    )
  }

  updateProduct() {
    this.model = this.productForm.value;
    this.model.id = this.productId;
    this.productService.updateProduct(this.model).subscribe(
      result => {
        console.log(result);
        if ( ! result.error) {
          this.router.navigateByUrl('/backend/product');
        } else {
          alert('Some thingh went wrong!');
        }
      }
    )
  }

  getProduct() {
    this.productService.getProduct(this.productId).subscribe(
      result => {
        console.log(result);
        this.productForm.patchValue(result.data)
      }
    )
  }

}
