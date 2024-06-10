import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { faCircleUser, faMoneyBill1 } from '@fortawesome/free-regular-svg-icons';
import { faAngleLeft, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { EditService } from 'src/app/services/edit-service.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  public faCircleUser = faCircleUser;
  public faMoneyBill1 = faMoneyBill1;
  public faAngleLeft = faAngleLeft;
  public faAngleDown = faAngleDown;

  public listOrder:any = [];
  public fullProvinceVN:any = [];
  public listIndex:any = {a:false, b:false, c:false};
  public total_price:number = 0;
  public user:any = false;

  public dataForm = this.fb.group({
    "fullname": ["", [Validators.required]],
    "email": ["", [Validators.required, Validators.email]],
    "phone": ["", [Validators.required, Validators.pattern('(03|05|07|08|09|01[2|6|8|9])+[0-9]{8}')]],
    "description": [""],
    "address": ["", [Validators.required]],
    "province": ["", [Validators.required]],
    "district": ["", [Validators.required]],
    "ward": ["", [Validators.required]],
  });

  public constructor(private titleService:Title, public productService:ProductService, public fb:FormBuilder, private editService:EditService, private router:Router) {
    this.titleService.setTitle('Thanh toán');
    $('html, body').animate({scrollTop:0}, 0);

    axios({
      url: 'assets/json/data_diagioihanhchinhVN.json',
      method: 'get',
      responseType: 'json'
    }).then((res) => {
      this.fullProvinceVN = res.data;
    });

    this.listOrder = JSON.parse(localStorage.getItem('selectedProduct') || '[]');
    this.total_price = this.listOrder.reduce((a:number,b:any) => a + b.total_price, 0);

    const auth:any = localStorage.getItem('auth_cli');
    this.user = auth ? JSON.parse(auth) : false;
    if(this.user) {
      this.dataForm.controls.email.setValue(this.user.email);
      this.dataForm.controls.fullname.setValue(this.user.fullname);
      this.dataForm.controls.phone.setValue(this.user.phone);
      this.dataForm.controls.address.setValue(this.user.address);
    }
  }

  get f() {
    return this.dataForm.controls;
  }

  public handleChangeSelect() {
    this.fullProvinceVN.some((item:any, index:number) => {
      if(item.Name === this.f.province.value) {
        this.listIndex.a = index;
        if(this.f.district.value !== '')
        item.Districts.some((item1:any, index1:number) => {
          if(item1.Name === this.f.district.value) this.listIndex.b = index1;
          return item1.Name === this.f.district.value;
        });
      }
      return item.Name === this.f.province.value;
    });
  }

  public onSubmit() {
    const data = this.dataForm.value;
    data.address = data.address + '-' + data.ward + '-' + data.district + '-' + data.province;
    const newData:any = {
      user_id: this.user.id,
      name: data.fullname,
      phone: data.phone,
      address: data.address,
      description: data.description,
      status: 1
    }
    this.productService.handleOrder(this.listOrder.map((item:any) => item.id), newData);
  }
}
