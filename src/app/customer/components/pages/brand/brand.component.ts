import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { getService } from 'src/app/services/get/get-service.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent {
  public dataBrands:any = [];

  public constructor(private titleService:Title, private getService:getService) {
    this.titleService.setTitle('Thương hiệu');
    $('html, body').animate({scrollTop:0}, 0);

    this.getService.getAllBrands(undefined, (err:boolean, data:any) => {
      if(!err) {
        this.dataBrands = data;
      }
    })
  }
}
