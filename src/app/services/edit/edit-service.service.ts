import { Injectable } from '@angular/core';
import { CommonhttpsService } from '../https/commonhttps.service';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class EditService {

    constructor(private https: CommonhttpsService) { }

    editUser(id: number, newData: any, callback: Function) {
        this.https.editUser(id, newData).subscribe({
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

    editCategory(id: number, newData: any, callback: Function) {
        this.https.editCategories(id, newData).subscribe({
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

    editPetlist(id: number, newData: any, callback: Function) {
        this.https.editPetlists(id, newData).subscribe({
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

    editPet(id: number, newData: any, callback: Function) {
        this.https.editPets(id, newData).subscribe({
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

    editBrand(id: number, newData: any, callback: Function) {
        this.https.editBrands(id, newData).subscribe({
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

    editNews(id: number, newData: any, callback: Function) {
        this.https.editNewspages(id, newData).subscribe({
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

    editOrder(id: number, newData: any, callback: Function) {
        this.https.editOrders(id, newData).subscribe({
            next: (res) => {
                callback(true, res);
            },
            error: (err) => {
                console.log(err);
                callback(false, err);
            }
        });
    }

    editOrderDetail(id: number, newData: any, callback: Function) {
        this.https.editOrderDetail(id, newData).subscribe({
            next: (res) => {
                callback(true, res);
            },
            error: (err) => {
                console.log(err);
                callback(false, err);
            }
        });
    }

    editComments(id: number, newData: any, callback: Function) {
        this.https.editComments(id, newData).subscribe({
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
