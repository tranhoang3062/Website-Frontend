import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { CommonhttpsService } from './commonhttps.service';

@Injectable({
    providedIn: 'root'
})
export class EditService {

    constructor(private https: CommonhttpsService) { }

    editProduct(id: number, newData: any, callback: Function) {
        this.https.editProducts(id, newData).subscribe({
            next: (res) => {
                Swal.fire({
                    icon: 'success',
                    text: 'Lưu thay đổi thành công!',
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



}
