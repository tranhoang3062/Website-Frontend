import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faEdit, faHouse, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
import { DeleteService } from 'src/app/services/delete/delete-service.service';
import { EditService } from 'src/app/services/edit/edit-service.service';
import { getService } from 'src/app/services/get/get-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-index-o',
  templateUrl: './index-o.component.html',
  styleUrls: ['./index-o.component.css']
})
export class IndexOComponent {
  public faHouse = faHouse;
  public faSearch = faSearch;
  public faEdit = faEdit;
  public faTrash = faTrash;

  public dataDefault:any = [];
  public dataOrder:any = [];
  public orderDetail:any = {};
  public itemsPage:any = 10;
  public p:any = 1;
  public valueKey:any = '';
  public valueSearch:any = '';

  public constructor(private getService:getService, private editService:EditService, private deleteService:DeleteService, private router:Router) {
    this.getService.getAllOrder(undefined, (err:boolean, dataOrder:any ) => {
      this.getService.getAllOrderDetail(undefined,(err:boolean, dataOrderDetail:any) => {
        if(!err) {
          this.dataDefault = dataOrder.map((item:any) => {
            const orderDetails:any = dataOrderDetail
            .filter((elem:any) => elem.order_id == item.id)
            .map((elem:any) => {
              elem.resourcesProduct = JSON.parse(elem.resourcesProduct);
              elem.choose = elem.choose !== '' && elem.choose ? JSON.parse(elem.choose) : '';
              return elem;
            });
            const total_amount = dataOrderDetail.filter((elem:any) => elem.order_id == item.id).reduce((a:any, b:any) => a+b.total_price, 0);
            return {...item, total_amount, orderDetails};
          }).filter((item:any) => item.status!==0);
          this.dataOrder = this.dataDefault;
        }
      });
    })
  }

  public viewOrderDetail(item:any, index:number) {
    this.orderDetail = item;
  }

  public handlePaginate() {
    this.router.navigate(['/admin/orders'], {queryParams: {page: this.p}, queryParamsHandling: 'merge'});
  }

  public handleSearch() {
    this.dataOrder = this.dataDefault.filter((item:any) => {
      if(this.valueKey == '1' || this.valueKey == '') return item.id == this.valueSearch;
      else if(this.valueKey == '2') return item.name.indexOf(this.valueSearch) !== -1;
      else return item.status == this.valueSearch;
    });
  }

  public onUpdateStatus(item:any, index:number) {
    Swal.fire({
      title: "Trạng thái",
      text: '',
      html: `<div class="d-flex flex-column px-3 align-items-start">
      <div><input type="radio" name="status" value="1" id="status-1" ${item.status == 1 ? "checked" : ""}><label class="ml-3" for="status-1">Đang chuẩn bị hàng</label></div>
      <div><input type="radio" name="status" value="2" id="status-2" ${item.status == 2 ? "checked" : ""}><label class="ml-3" for="status-2">Vận chuyển</label></div>
      <div><input type="radio" name="status" value="3" id="status-3" ${item.status == 3 ? "checked" : ""}><label class="ml-3" for="status-3">Chờ giao hàng</label></div>
      <div><input type="radio" name="status" value="4" id="status-4" ${item.status == 4 ? "checked" : ""}><label class="ml-3" for="status-4">Hoàn thành</label></div>
      <div><input type="radio" name="status" value="5" id="status-5" ${item.status == 5 ? "checked" : ""}><label class="ml-3" for="status-5">Đã hủy</label></div>
      <div><input type="radio" name="status" value="6" id="status-6" ${item.status == 6 ? "checked" : ""}><label class="ml-3" for="status-6">Trả hàng</label></div>
      </div>`,
      showCancelButton: true,
      cancelButtonText: "Hủy",
      confirmButtonText: "Cập nhật",
    }).then((result) => {
      if(result.isConfirmed) {
        const radioElem = document.querySelector('input[name="status"]:checked') as HTMLInputElement;
        if(radioElem.value !== item.status) {
          this.editService.editOrder(item.id, {status: radioElem.value}, (result:boolean, data:any) => {
            if(result) {
              this.dataDefault[index].status = radioElem.value;
              this.dataOrder = this.dataDefault;
              Swal.fire({
                icon: 'success',
                text: 'Cập nhật trạng thái thành công!',
                timer: 1000,
                showCancelButton: false,
                showConfirmButton: false,
                position: 'center',
                color: 'black',
                customClass: 'swal-class2',
                heightAuto: false,
              });
            }
          });
        } else {
          Swal.fire({
            icon: 'success',
            text: 'Cập nhật trạng thái thành công!',
            timer: 1000,
            showCancelButton: false,
            showConfirmButton: false,
            position: 'center',
            color: 'black',
            customClass: 'swal-class2',
            heightAuto: false,
          });
        }
      }
    });
  }

  public handleDelete(item:any, index:number) {
    this.deleteService.onDelete(undefined, '', (result:boolean) => {
      if(result) {
        this.deleteService.deleteOrderDetailByOrderId(item.id, (result:boolean, data:any) => {
          if(result) {
            this.deleteService.deleteOrders(item.id, (result:boolean, data:any) => {
              if(result) {
                this.dataDefault = this.dataDefault.splice(index, 1);
                this.dataOrder = this.dataDefault;
                Swal.fire({
                  icon: 'success',
                  text: 'Xóa thành công!',
                  timer: 1000,
                  showCancelButton: false,
                  showConfirmButton: false,
                  position: 'center',
                  color: 'black',
                  customClass: 'swal-class2',
                  heightAuto: false,
                });
              }
            })
          }
        })
      }
    })
  }
}
