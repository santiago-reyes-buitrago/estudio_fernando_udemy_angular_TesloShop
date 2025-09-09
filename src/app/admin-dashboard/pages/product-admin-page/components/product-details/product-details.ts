import {Component, inject, input, OnInit} from '@angular/core';
import {Carrousel} from '@products/components/carrousel/carrousel';
import {Product} from '@products/interfaces/product-response.interface';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {FormUtils} from '@utils/form-utils';
import {ProductService} from '@products/services/product.service';

@Component({
  selector: 'product-details',
  imports: [
    Carrousel,
    ReactiveFormsModule
  ],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css'
})
export class ProductDetails implements OnInit {
  fb = inject(FormBuilder);
  productService = inject(ProductService);
  product = input.required<Product>()

  productForm = this.fb.group({
    title: ['', Validators.required],
    description: ['',Validators.required],
    slug: ['', [Validators.required,Validators.pattern(FormUtils.slugPattern)]],
    price: ['', [Validators.required,Validators.min(0)]],
    stock: ['', [Validators.required,Validators.min(0)]],
    sizes: [[''],],
    images: [[],],
    tags: ['',],
    gender: ['men',[Validators.required,Validators.pattern(/men|women|kid|unisex]/)]]
  })
  sizes = ['XS','S','M','L','XL','XXL'];

  ngOnInit(): void {
    this.setFormValue(this.product())
  }

  setFormValue(formLike: Partial<Product>){
    // this.productForm.reset(this.product() as any)
    this.productForm.patchValue(formLike as any);
    this.productForm.patchValue({
      tags: formLike.tags?.join(',')
    })
  }

  onSizeClicked(size: string){
    const currentSizes = this.productForm.value.sizes ?? [];
    if (currentSizes.includes(size)){
      currentSizes.splice(currentSizes.indexOf(size), 1);
      this.productForm.patchValue({sizes: currentSizes})
      return;
    }
    currentSizes.push(size);
    this.productForm.patchValue({sizes: currentSizes})
  }

  onSubmit() {
    if (!this.productForm.valid) {
      console.log(this.productForm.value,{isValid: this.productForm.valid})
      this.productForm.markAllAsTouched();
      return;
    }
    const formValue = this.productForm.value;
    const productLike: Partial<Product> = {
      ...(formValue as any),
      tags: formValue.tags?.toLowerCase()
        .split(',').map(tag => tag.trim()) ?? []
    }
    console.log({productLike})
    this.productService.updateProduct(productLike);
  }

  protected readonly FormUtils = FormUtils;
}
