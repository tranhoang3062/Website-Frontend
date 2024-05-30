import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';
import { Observable } from 'rxjs';

const url = environment.apiUrl;

@Injectable({
    providedIn: 'root'
})
export class BrandService {

    constructor(private http: HttpClient) { }
    
    allBrands(query: string = ''): Observable<object> {
        return this.http.get(`${url}/brands` + query);
    }

    getBrandById(id: number): Observable<object> {
        return this.http.get(`${url}/brands/${id}`);
    }

    getSearchBrandByName(name: string): Observable<object> {
        return this.http.get(`${url}/brands/search/${name}`);
    }

    createBrands(data: object): Observable<object> {
        return this.http.post(`${url}/brands`, data);
    }

    editBrands(id: number, data: object): Observable<object> {
        return this.http.put(`${url}/brands/${id}`, data);
    }

    deleteBrands(id: number): Observable<object> {
        return this.http.delete(`${url}/brands/${id}`);
    }

    getAllBrands(query: string = '', callback: Function) {
        this.allBrands(query).subscribe({
            next: (res: any) => {
                callback(false, res);
            },
            error: (err) => {
                console.log(err);
                callback(true, null);
            }
        });
    }

    getSearchBrand(name: string, callback: Function) {
        this.getSearchBrandByName(name).subscribe({
            next: (res: any) => {
                callback(false, res);
            },
            error: (err) => {
                console.log(err)
                callback(true, null);
            }
        });
    }

    public createBrand(newData: any, callback: Function) {
        this.createBrands(newData).subscribe({
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
    
    editBrand(id: number, newData: any, callback: Function) {
        this.editBrands(id, newData).subscribe({
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

    deleteBrand(id: number, callback: Function) {
        this.deleteBrands(id).subscribe({
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

}