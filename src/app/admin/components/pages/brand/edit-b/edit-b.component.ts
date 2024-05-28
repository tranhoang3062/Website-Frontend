import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { CategoryService } from 'src/app/services/category/category.service';
import { EditService } from 'src/app/services/edit/edit-service.service';
import { getService } from 'src/app/services/get/get-service.service';

@Component({
  selector: 'app-edit-b',
  templateUrl: './edit-b.component.html',
  styleUrls: ['./edit-b.component.css']
})
export class EditBComponent {
  public faHouse = faHouse;

  public dataBrands:any = [];
  public brand:any = {};
  public nameError:boolean = false;
  public checkFile:boolean = true;
  public file:any;
  public urlImg:any = '';
  public paramId:any;

  public radioInputs:any = [
    {id:1, name: 'Hiện', value:0, checked: true},
    {id:2, name: 'Ẩn', value:1, checked: false},
  ];
  public dataForm = this.fb.group({
    "name": ["", [Validators.required]],
    "status": ["0", [Validators.required]]
  });

  public constructor(private fb:FormBuilder, private router:Router, private getService:getService, private editBrand:EditService, private activatedRoute:ActivatedRoute, private categoryService:CategoryService) {
    this.activatedRoute.paramMap.subscribe(params => {
      this.paramId = params.get('id');
      this.getService.getAllBrands(undefined, (err:boolean, data:any) => {
        if(!err) {
          this.dataBrands = data;
          this.brand = data.find((item:any) => item.id == this.paramId);
          this.dataForm.controls.name.setValue(this.brand.name);
          this.urlImg = this.brand.thumbnail;
          this.radioInputs.forEach((item:any) => {
            if(item.value === this.brand.status) item.checked = true;
            else item.checked = false;
          });
        }
      });
    });
  }

  get f() {
    return this.dataForm.controls;
  }

  selectFile(elem:any) {
    this.file = elem.target.files[0];
    if(!this.file) this.urlImg = this.brand.thumbnail;
    const reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload = (e:any) => {
      this.urlImg = e.target.result;
    }
  }

  public handleStatus(value:string) {
    this.radioInputs.forEach((item:any) => {
      if(item.value == value) item.checked = true;
      else item.checked = false;
    });
  }

  public eventInput() {
    this.nameError = false;
  }

  public handleSubmit() {
    const oldQuery = this.categoryService.getLocalstorageQuery();
    const newData:any = this.dataForm.value;
    const formData = new FormData();
    this.nameError = this.dataBrands.some((item:any) => item.name.trim() === newData.name.trim() && Number(item.id) !== Number(this.paramId));
    if(!this.nameError) {
      newData.status = this.radioInputs.find((item:any) => item.checked).value;
      if(this.file) {
        formData.append("upload-file", this.file);
      }
      formData.append("name", newData.name);
      formData.append("status", newData.status);
      this.editBrand.editBrand(this.paramId, formData, (result:boolean) => {
        if(result) {
          this.router.navigateByUrl('/admin', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/admin/brand'], {queryParams:oldQuery});
          });
        } else {}
      });
    }
  }
}
