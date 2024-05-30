import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  public faTrash = faTrash;

  public dataCarts:any = [];
  public listChoose:any = [];
  public defaultData:any = [];
  public total_price:number = 0;
  public checkUpdate:boolean = true;

  public constructor(private titleService:Title, public productService:ProductService, private router:Router) {
    this.titleService.setTitle('Giỏ hàng');
    $('html, body').animate({scrollTop:0}, 0);

    this.productService.currentData.subscribe((dataOrders:any) => {
      this.dataCarts = dataOrders.map((item:any) => {
        const resources = JSON.parse(item.resourcesProduct)
        const choose = item.choose !== '' && item.choose ? JSON.parse(item.choose) : '';
        return {...item, choose: choose, resourcesProduct: resources};
      });
      this.defaultData = dataOrders;
    });
    this.productService.currentChooseOrder.subscribe((dataChoose:any) => {
      this.listChoose = dataChoose.map((item:any) => item.id);
      this.total_price = this.defaultData.filter((item:any) => this.listChoose.some((elem:any) => elem == item.id)).reduce((a:number, b:any) => a+b.total_price, 0);
    });
  }

  public onChoose(elem:any, check:boolean) {
    if(check) {
      if((elem.target as HTMLInputElement).checked) this.productService.onChoose(this.dataCarts, check, {});
      else this.productService.onChoose([], check, {});
    } else {
      const prd = this.dataCarts.find((item:any) => item.id == elem);
      this.productService.onChoose(elem, check, prd);
    }
  }

  public handleChangeOrder(index:number, key:boolean) {
    this.checkUpdate = false;
    if(key) {
      this.defaultData[index].total_price = this.defaultData[index].total_price + this.defaultData[index].total_price/this.defaultData[index].quantity;
      this.defaultData[index].quantity += 1;
    } else if(this.defaultData[index].quantity > 1) {
      this.defaultData[index].total_price = this.defaultData[index].total_price - this.defaultData[index].total_price/this.defaultData[index].quantity;
      this.defaultData[index].quantity -= 1;
    }
    this.total_price = this.defaultData.filter((item:any) => this.listChoose.some((elem:any) => elem == item.id)).reduce((a:number, b:any) => a+b.total_price, 0);
  }

  public async onUpdateCart() {
    await this.defaultData.forEach(async (item:any, index:number) => {
      if(await item.quantity !== this.dataCarts[index].quantity) {
        await this.productService.updateOrderDetail(item, index);
      }
    });
    this.productService.onChoose(this.dataCarts.filter((item:any) => this.listChoose.some((elem:any) => elem === item.id)), true, {});
    Swal.fire({
      icon: 'success',
      text: 'Cập nhật giỏ hàng thành công!',
      timer: 2000,
      showCancelButton: false,
      showConfirmButton: false,
      position: 'center',
      color: 'black',
      customClass: 'swal-class2',
      heightAuto: false,
    });
    this.checkUpdate = true;
  }

  public onPay() {
    if(this.listChoose.length == 0) {
      Swal.fire({
        icon: 'warning',
        text: 'Bạn chưa chọn sản phẩm nào!',
        timer: 3000,
        showCancelButton: false,
        showConfirmButton: false,
        position: 'center',
        color: 'black',
        customClass: 'swal-class2',
        heightAuto: false,
      });
    } else if(!this.checkUpdate) {
      Swal.fire({
        icon: 'warning',
        text: 'Bạn phải cập nhật giỏ hàng để lưu thay đổi trước khi tiến hành thanh toán!',
        timer: 3000,
        showCancelButton: false,
        showConfirmButton: false,
        position: 'center',
        color: 'black',
        customClass: 'swal-class2',
        heightAuto: false,
      });
    } else {
      localStorage.setItem('selectedProduct', JSON.stringify(this.dataCarts.filter((item:any) => this.listChoose.some((elem:any) => elem === item.id))));
      this.router.navigate(['/thanh-toan']);
    }
  }

  public deleteOrder(item:any) {
    this.listChoose = this.listChoose.filter((elem:any) => elem !== item.id);
    this.productService.deleteOrder(item);
    this.productService.onChoose(this.dataCarts.filter((item:any) => this.listChoose.some((elem:any) => elem === item.id)), true, {});
  }
}
