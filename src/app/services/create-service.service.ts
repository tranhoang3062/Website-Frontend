import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { CommonhttpsService } from './commonhttps.service';

@Injectable({
    providedIn: 'root'
})
export class CreateService {

    constructor(private http: CommonhttpsService) { }

    public createProduct(newData: any, callback: Function) {
        this.http.createProducts(newData).subscribe({
            next: (res) => {
                Swal.fire({
                    icon: 'success',
                    text: 'Thêm dữ liệu thành công!',
                    timer: 1000,
                    showCancelButton: false,
                    showConfirmButton: false,
                    position: 'center',
                    color: 'black',
                    customClass: 'swal-class2',
                    heightAuto: false,
                });
                callback(true, res);
            },
            error: (err) => {
                console.log(err);
                callback(false, err);
            }
        });
    }


    public createWishlist(newData: any, callback: Function) {
        this.http.createWishlists(newData).subscribe({
            next: (res) => {
                callback(true, res);
            },
            error: (err) => {
                console.log(err);
                callback(false, err);
            }
        });
    }


}
