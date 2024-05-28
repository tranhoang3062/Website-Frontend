import { Injectable } from '@angular/core';
import { CommonhttpsService } from '../https/commonhttps.service';
import Swal from 'sweetalert2';

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

    deleteUser(id: number, callback: Function) {
        this.https.deleteUser(id).subscribe({
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

    deleteCategory(id: number, callback: Function) {
        this.https.deleteCategories(id).subscribe({
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

    deletePetlist(id: number, callback: Function) {
        this.https.deletePetlists(id).subscribe({
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

    deletePet(id: number, callback: Function) {
        this.https.deletePets(id).subscribe({
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

    deleteBrand(id: number, callback: Function) {
        this.https.deleteBrands(id).subscribe({
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

    deleteNews(id: number, callback: Function) {
        this.https.deleteNewspages(id).subscribe({
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

    deleteOrders(id: number, callback: Function) {
        this.https.deleteOrders(id).subscribe({
            next: (res) => {
                callback(true);
            },
            error: (err) => {
                console.log(err);
                callback(false);
            }
        });
    }

    deleteOrderDetail(id: number, callback: Function) {
        this.https.deleteOrderDetail(id).subscribe({
            next: (res) => {
                callback(true);
            },
            error: (err) => {
                console.log(err);
                callback(false);
            }
        });
    }

    deleteOrderDetailByOrderId(order_id: number, callback: Function) {
        this.https.deleteOrderDetailByOrderId(order_id).subscribe({
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
