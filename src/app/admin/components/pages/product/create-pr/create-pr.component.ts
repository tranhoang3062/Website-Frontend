import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faHouse, faPlus } from '@fortawesome/free-solid-svg-icons';
import { OwlOptions } from 'ngx-owl-carousel-o';
import * as slug from 'slug';
import { CategoryService } from 'src/app/services/category/category.service';
import { CreateService } from 'src/app/services/create/create-service.service';
import { getService } from 'src/app/services/get/get-service.service';

@Component({
  selector: 'app-create-pr',
  templateUrl: './create-pr.component.html',
  styleUrls: ['./create-pr.component.css']
})
export class CreatePrComponent {
  public faHouse = faHouse;
  public faPlus = faPlus;

  public dataCategory:any = [];
  public dataBrands:any = [];
  public dataproducts:any = [];
  public nameError:boolean = false;
  public slugError:boolean = false;
  public checkFile:boolean = true;
  public onChoose:boolean = false;
  public numberError:boolean = false;
  public files:any = [];
  public urlImg:any = [];
  public choose:any = [
    {select: '1', price: 0, sale_price: 0},
    {select: '', price: 0, sale_price: 0}
  ];

  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="fa-solid fa-angle-left"></i>','<i class="fa-solid fa-angle-right"></i>'],
    responsive: {
      320:{
        items: 2,
      },
      425:{
        items: 3,
      },
      768:{
        items:4,
      },
      1024:{
        items:5,
      }
    },
    nav: false,
    margin: 40
  }
  public dataForm = this.fb.group({
    "name": ["", [Validators.required]],
    "slug": ["", [Validators.required]],
    "description": [""],
    "price": ["", [Validators.required, Validators.min(0)]],
    "sale_price": ["0", [Validators.required, Validators.min(0)]],
    "unit": ["", [Validators.required]],
    "choose": [""],
    "star": [""],
    "category_id": ["", [Validators.required]],
    "brand_id": ["", [Validators.required]],
  });

  public constructor(private fb:FormBuilder, private router:Router, private getService:getService, private createService:CreateService, private categoryService:CategoryService) {
    this.getService.getAllCate(undefined, (err:boolean, data:any) => {
      if(!err) {
        this.dataCategory = data;
        const categoryIdElem = document.querySelector("#category_id") as HTMLElement;
        categoryIdElem.innerHTML = this.categoryService.renderOptions3(data, "Danh mục");
      }
    });
    this.getService.getAllBrands(undefined, (err:boolean, data:any) => {
      if(!err) {
        this.dataBrands = data;
      }
    });
    this.getService.getAllProducts(undefined, (err:boolean, data:any) => {
      if(!err) {
        this.dataproducts = data;
      }
    });
  }

  get f() {
    return this.dataForm.controls;
  }

  handleBoxChoose(check:boolean, index?:any) {
    if(index === undefined) {
      if(this.onChoose && check) {
        this.choose.push({select: '', price: 0, sale_price: 0});
      } else {
        this.onChoose = check;
      }
    } else {
      this.choose.splice(index, 1);
    }
  }

  onInputName(elem:any) {
    this.dataForm.controls.slug.setValue(slug(elem.target.value));
  }

  selectFile(elem:any) {
    this.files = elem.target.files;
    this.urlImg = [];
    if([...this.files].length == 0) {
      this.checkFile = false;
    } else {
      this.checkFile = true;
      [...this.files].forEach((file:any) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e:any) => {
          this.urlImg.push(e.target.result);
        }
      });
    }
  }

  checkInputNumber(elem:any) {
    if(Number(elem.target.value) < 0 || isNaN(Number(elem.target.value))) {
      this.numberError = true;
      elem.target.style.borderColor = 'red !important';
    } else {
      this.numberError = false;
      elem.target.style.borderColor = 'auto';
    }
  }

  public handleSubmit() {
    if([...this.files].length == 0) {
      this.checkFile = false;
    } else {
      const newData:any = this.dataForm.value;
      newData.star = newData.star ? 1 : 0;
      this.nameError = this.dataproducts.some((item:any) => item.name.trim() === newData.name.trim() && Number(item.id));
      this.slugError = this.dataproducts.some((item:any) => item.slug.trim() === newData.slug.trim() && Number(item.id));
      if(!this.nameError && !this.slugError) {
        this.choose[0].select += ' ' + newData.unit;
        this.choose[0].price = newData.price;
        this.choose[0].sale_price = newData.sale_price;
        if(this.onChoose) newData.choose = JSON.stringify(this.choose);
        const formData = new FormData();
        formData.append("name", newData.name);
        formData.append("slug", newData.slug);
        formData.append("description", newData.description);
        formData.append("price", newData.price);
        formData.append("sale_price", newData.sale_price);
        formData.append("unit", newData.unit);
        formData.append("choose", newData.choose);
        formData.append("star", newData.star);
        formData.append("category_id", newData.category_id);
        formData.append("brand_id", newData.brand_id);
        [...this.files].forEach((file) => {
          formData.append("upload-files", file);
        });
        this.createService.createProduct(formData, (result:boolean) => {
          if(result) {
            this.router.navigateByUrl('/admin', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/admin/product']);
            });
          } else {}
        });
      }
    }
  }
}
