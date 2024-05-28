import { Component } from '@angular/core';

import { faHouse, faChartColumn, faFileLines, faCalendarCheck, faHandPointDown, faChartLine, faXmark, faPlus, faEye, faEdit, faTrash, faShirt, faArrowRight, faPaw, faNewspaper, faCopyright } from '@fortawesome/free-solid-svg-icons';
import { DeleteService } from 'src/app/services/delete/delete-service.service';
import { getService } from 'src/app/services/get/get-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  public faHouse = faHouse;
  public faHandPointDown = faHandPointDown;
  public faPlus = faPlus;
  public faEye = faEye;
  public faEdit = faEdit;
  public faTrash = faTrash;
  public faArrowRight = faArrowRight;
  public faShirt = faShirt;
  public faPaw = faPaw;
  public faCopyright = faCopyright;
  public faNewspaper = faNewspaper;

  public dataUserAdmin:any = [];
  public dataUserCustomer:any = [];
  public dataCategoryLever3:any = [];
  public totalProduct:number = 0;
  public totalPet:number = 0;
  public totalBrand:number = 0;
  public totalNews:number = 0;
  public dataQuickView:any = {};
  public user:any = false;

  public constructor(private getService:getService, private deleteService:DeleteService) {
    this.getService.getAllProducts(undefined, (err:boolean, data:any) => {
      if(!err) this.totalProduct = data.length;
    });
    this.getService.getAllPets(undefined, (err:boolean, data:any) => {
      if(!err) this.totalPet = data.length;
    });
    this.getService.getAllBrands(undefined, (err:boolean, data:any) => {
      if(!err) this.totalBrand = data.length;
    });
    this.getService.getAllNews(undefined, (err:boolean, data:any) => {
      if(!err) this.totalNews = data.length;
    });
    this.getService.getAllUser(undefined, (err:boolean, data:any) => {
      if(!err) {
        this.dataUserAdmin = data.filter((item:any) => item.role === 0);
        this.dataUserCustomer = data.filter((item:any) => item.role === 1);
      }
    });
    const auth:any = localStorage.getItem('auth');
    this.user = auth ? JSON.parse(auth) : false;
  }

  public handleDelete(id:number, index:number, key:string) {
    this.deleteService.onDelete(undefined, "", (result:boolean) => {
      if(result) {
        if(this.user.id == id) {
          Swal.fire({
            icon: 'warning',
            text: 'Không thể xóa. Bạn đang đăng nhập tài khoản này!',
            timer: 1000,
            showCancelButton: false,
            showConfirmButton: false,
            position: 'center',
            color: 'black',
            customClass: 'swal-class2',
            heightAuto: false,
          });
        } else {
          this.deleteService.deleteUser(id, (result:boolean) => {
            if(result) {
              if(key === 'qtv') this.dataUserAdmin.splice(index, 1);
              if(key === 'kh') this.dataUserCustomer.splice(index, 1);
            }
          });
        }
      }
    });
  }

  public quickView(item:any) {
    this.dataQuickView = item;
  }
}
