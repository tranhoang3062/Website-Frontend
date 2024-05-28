import { Injectable } from '@angular/core';
import { CommonhttpsService } from '../https/commonhttps.service';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class CreateService {

    constructor(private http: CommonhttpsService) { }

    public register(newData: any, callback: Function) {
        this.http.createUser(newData).subscribe({
            next: (res) => {
                Swal.fire({
                    icon: 'success',
                    text: 'Đăng ký thành công!',
                    timer: 2000,
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

    public login(newData: any, callback: Function) {
        this.http.createUser(newData).subscribe({
            next: (res) => {
                callback(true, res);
            },
            error: (err) => {
                console.log(err);
                callback(false, err);
            }
        });
    }

    public createCate(newData: any, callback: Function) {
        this.http.createCategories(newData).subscribe({
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

    public createPetList(newData: any, callback: Function) {
        this.http.createPetlists(newData).subscribe({
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

    public createPet(newData: any, callback: Function) {
        this.http.createPets(newData).subscribe({
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

    public createBrand(newData: any, callback: Function) {
        this.http.createBrands(newData).subscribe({
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

    public createNews(newData: any, callback: Function) {
        this.http.createNewspages(newData).subscribe({
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

    public createOrder(newData: any, callback: Function) {
        this.http.createOrders(newData).subscribe({
            next: (res) => {
                callback(true, res);
            },
            error: (err) => {
                console.log(err);
                callback(false, err);
            }
        });
    }

    public createOrderDetail(newData: any, callback: Function) {
        this.http.createOrderDetail(newData).subscribe({
            next: (res) => {
                callback(true, res);
            },
            error: (err) => {
                console.log(err);
                callback(false, err);
            }
        });
    }

    public createComments(newData: any, callback: Function) {
        this.http.createComments(newData).subscribe({
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
