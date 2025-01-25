import { Component, DestroyRef, inject, signal } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
} from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { InputNumberModule } from 'primeng/inputnumber';
import { ProductsService } from '../../../core/services/products.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-edit-product',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    TextareaModule,
    AutoCompleteModule,
    DropdownModule,
    CheckboxModule,
    InputNumberModule,
    FormsModule
  ],
  templateUrl: './create-edit-product.component.html',
  styleUrl: './create-edit-product.component.scss',
})
export class CreateEditProductComponent {
  isEditMode = signal(false);
  fb = inject(FormBuilder);
  route = inject(ActivatedRoute);
  destroyRef = inject(DestroyRef);
  editId = signal('');
  router = inject(Router);
  value: any;
  productService = inject(ProductsService);
  acceptedEdit = false
  items = [
    'furniture',
    'equipment',
    'stationary',
    'part',
  ];
  value2 = true
  userGroupForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    sku: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', Validators.required],
    cost: [  '',
      [
        Validators.required,
        Validators.pattern(/^[0-9]+(\.[0-9]+)?$/),
      ],],
    profile: this.fb.group({
      type: ['furniture', Validators.required],
      backlog: [2, [Validators.required, Validators.min(2)]],
      avaible: [true, Validators.required],
    }),
  });

  ngOnInit(): void {

    this.listenToQueryParams();
   this.fetcValues()
  }

  fetcValues(): void {
    if(this.isEditMode()&& !this.acceptedEdit){
      this.productService.getProduct(this.editId()).subscribe(res => {
        const { profile, ...formValues } = res; 
        
        this.userGroupForm.patchValue({ ...formValues, ...profile });
        if (profile) {
          this.userGroupForm.get('profile')?.patchValue(profile);
        }
        Object.keys(this.userGroupForm.controls).forEach(key => {
          const control = this.userGroupForm.get(key);
          if (control) {
            control.disable();
          }
        });
      });
    }
  }
  submitForm(): void {
    if (!this.isEditMode()) {
     this.productService.addProduct(this.userGroupForm.value).subscribe(res=>{

      this.router.navigate(['/products-list']);
     })
    }else{
      this.productService.editProduct(this.editId(),this.userGroupForm.value).subscribe(res=> {
        this.router.navigate(['/products-list']);
      })
    }
  }
  listenToQueryParams(): void {
    this.route.paramMap
      .subscribe((params: ParamMap) => {
        if (params.get('id')) {
          this.editId.set(params.get('id') || '')
          this.isEditMode.set(true)
        }
      });
  }

    acceptEdit(): void {
      this.acceptedEdit = true
      Object.keys(this.userGroupForm.controls).forEach(key => {
        const control = this.userGroupForm.get(key);
        if (control) {
          control.enable();
        }
      });
    }
}
