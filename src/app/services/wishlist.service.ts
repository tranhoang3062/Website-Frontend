import { Injectable } from '@angular/core';
import { getService } from './get-service.service';
import { CreateService } from './create-service.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { DeleteService } from './delete-service.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class WishlistService {
    public user: any = {};
    public dataWishlistByUser: any = new BehaviorSubject([]);
    public dataWishlistByProduct: any = [];
    public dataDefault: any = [];
    currentDataWishlistByUser = this.dataWishlistByUser.asObservable();

    constructor(private getService: getService, private createService: CreateService, private router: Router, private deleteService: DeleteService) {
        const auth: any = localStorage.getItem('auth_cli');
        this.user = auth ? JSON.parse(auth) : {};
        this.getService.getWishlistByUser(this.user.id, (err: boolean, data: any) => {
            if (!err) {
                this.changeData(data);
                this.dataDefault = data;
            }
        });
    }

    public isWishlist(product_id: number) {
        const result = this.dataDefault.some((item: any) => item.product_id === product_id);
        return result;
    }

    public onWishlist(product_id: number) {
        const btnElem = document.getElementById('btnwishlist' + product_id) as HTMLElement;
        if (this.user.id) {
            if (this.isWishlist(product_id)) {
                const elem = this.dataDefault.find((item: any) => item.product_id == product_id);
                this.deleteService.deleteWishlist(elem.id, (result: boolean) => {
                    if (result) {
                        // btnElem.classList.remove('text-danger');
                        this.dataDefault = this.dataDefault.filter((item: any) => item.product_id !== product_id);
                        this.changeData(this.dataDefault);
                    }
                });
            } else {
                const newData = {
                    product_id: product_id, user_id: this.user.id
                }
                this.createService.createWishlist(newData, (result: boolean, data: any) => {
                    if (result) {
                        // btnElem.classList.add('text-danger');
                        this.dataDefault.push({
                            ...newData,
                            id: data.insertId,
                            status: 0
                        });
                        this.changeData(this.dataDefault);
                    } else {
                        if (data.status === 402) {
                            Swal.fire({
                                icon: "error",
                                title: "Lỗi tài khoản!",
                                text: "Vui lòng đăng nhập lại để tiếp tục thực hiện yêu cầu này!",
                                confirmButtonText: "Đăng nhập"
                            }).then((result) => {
                                if (result.isConfirmed) this.router.navigate(['/login']);
                            });
                        }
                    }
                });
            }
        } else {
            Swal.fire({
                icon: "error",
                title: "Bạn phải đăng nhập để thực hiện yêu cầu này!",
                confirmButtonText: "Đăng nhập"
            }).then((result) => {
                if (result.isConfirmed) this.router.navigate(['/login']);
            });
        }
    }

    public getWishlistByProduct(product_id: number) {
        this.getService.getWishlistByProduct(product_id, (err: boolean, data: any) => {
            if (!err) this.dataWishlistByProduct = data;
        });
    }

    public changeData(data: any) {
        this.dataWishlistByUser.next(data);
    }
}
