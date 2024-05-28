import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { CreateService } from 'src/app/services/create/create-service.service';
import { getService } from 'src/app/services/get/get-service.service';

@Component({
  selector: 'app-create-b',
  templateUrl: './create-b.component.html',
  styleUrls: ['./create-b.component.css']
})
export class CreateBComponent {
  public faHouse = faHouse;

  public dataBrands:any = [];
  public nameError:boolean = false;
  public checkFile:boolean = true;
  public file:any;
  public urlImg:any = '';

  public radioInputs:any = [
    {id:1, name: 'Hiện', value:0, checked: true},
    {id:2, name: 'Ẩn', value:1, checked: false},
  ];
  public dataForm = this.fb.group({
    "name": ["", [Validators.required]],
    "status": ["0", [Validators.required]]
  });

  public constructor(private fb:FormBuilder, private router:Router, private getService:getService, private createService:CreateService) {
    this.getService.getAllBrands(undefined, (err:boolean, data:any) => {
      if(!err) {
        this.dataBrands = data;
      }
    });
  }

  get f() {
    return this.dataForm.controls;
  }

  selectFile(elem:any) {
    this.file = elem.target.files[0];
    if(!this.file) {
      this.checkFile = false;
      this.urlImg = '';
    } else this.checkFile = true;
    const reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload = (e:any) => {
      this.urlImg = e.target.result;
    }
  }

  public eventInput() {
    this.nameError = false;
  }

  public handleSubmit() {
    const newData:any = this.dataForm.value;
    this.nameError = this.dataBrands.some((item:any) => item.name.trim() === newData.name.trim());
    if(!this.file) {
      this.checkFile = false;
    } else {
      if(!this.nameError) {
        const formData = new FormData();
        formData.append("name", newData.name);
        formData.append("status", newData.status);
        formData.append("upload-file", this.file);
        this.createService.createBrand(formData, (result:boolean) => {
          if(result) {
            this.router.navigateByUrl('/admin', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/admin/thuong-hieu']);
            });
          } else {}
        });
      }
    }
  }
}
