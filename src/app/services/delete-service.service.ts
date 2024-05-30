import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { CommonhttpsService } from './commonhttps.service';

@Injectable({
    providedIn: 'root'
})
export class DeleteService {

    constructor(private https: CommonhttpsService) { }

    onDelete(title: string = "Bạn có chắc chắn muốn xóa không?", text: string, callback: Function) {
        Swal.fire({
            title: title,
            text: text,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Tiếp tục',
            cancelButtonText: 'Hủy'
        }).then((result) => {
            if (result.isConfirmed) {
                callback(true);
            } else {
                callback(false);
            }
        });
    }

    deleteProduct(id: number, callback: Function) {
        this.https.deleteProducts(id).subscribe({
            next: (res) => {
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
                callback(true);
            },
            error: (err) => {
                console.log(err);
                callback(false);
            }
        });
    }

    deleteWishlist(id: number, callback: Function) {
        this.https.deleteWishlists(id).subscribe({
            next: (res) => {
                callback(true);
            },
            error: (err) => {
                console.log(err);
                callback(false);
            }
        });
    }
}
