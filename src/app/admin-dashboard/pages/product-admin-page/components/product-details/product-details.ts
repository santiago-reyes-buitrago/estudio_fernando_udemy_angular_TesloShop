import {Component, computed, effect, inject, input, OnInit, signal} from '@angular/core';
import {Carrousel} from '@products/components/carrousel/carrousel';
import {Product} from '@products/interfaces/product-response.interface';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {FormUtils} from '@utils/form-utils';
import {ProductService} from '@products/services/product.service';
import {Router} from '@angular/router';

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
  router = inject(Router);
  fb = inject(FormBuilder);
  productService = inject(ProductService);
  product = input.required<Product>();
  imageFileList: FileList|null = null;
  imagesArray = computed(()=> {
    return [...this.product().imagesURL ?? [],...this.tempImages() ?? []]
  })
  wasSaved = signal<boolean>(false);
  tempImages = signal<string[]>([])
  msg = signal<string>('');
  productForm = this.fb.group({
    title: ['', Validators.required],
    description: ['',Validators.required],
    slug: ['', [Validators.required,Validators.pattern(FormUtils.slugPattern)]],
    price: ['', [Validators.required,Validators.min(0)]],
    stock: ['', [Validators.required,Validators.min(0)]],
    sizes: [[''],],
    images: [[''],],
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
    const validIdCreate = ['new'];
    if (!this.productForm.valid) {
      this.productForm.markAllAsTouched();
      return;
    }
    const formValue = this.productForm.value;
    const productLike: Partial<Product> = {
      ...(formValue as any),
      tags: formValue.tags?.toLowerCase()
        .split(',').map(tag => tag.trim()) ?? []

    }
    if (validIdCreate.includes(this.product().id)){
      this.productService.createProduct(productLike).subscribe((product) => {
        console.log(`Producto creado `,product)
        this.wasSaved.set(true)
        this.msg.set(`Producto creado `)
        this.router.navigate(['/admin/products',product.id]);
      })
      return;
    }

    this.productService.updateProduct(this.product().id,productLike).subscribe((product) => {
      console.log(`Producto actualizado `,product)
      this.wasSaved.set(true)
      this.msg.set(`Producto actualizado`)
    })
  }


  closeModal = effect((onCleanup) => {
    if (this.wasSaved()){
      const show = setTimeout(() => {
        this.wasSaved.set(false);
      },3000)

      onCleanup(() => clearTimeout(show))
    }


  })

  protected readonly FormUtils = FormUtils;

  onFileChange($event: Event) {
    const files = ($event.target as HTMLInputElement).files;
    this.imageFileList = files ?? null;
    const imageUrl = Array.from(files ?? []).map((item) => URL.createObjectURL(item));
    this.tempImages.set(imageUrl);
    console.log(this.imagesArray());
  }
}
