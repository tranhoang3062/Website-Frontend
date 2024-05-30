import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';
import { Observable } from 'rxjs';

const url = environment.apiUrl;

@Injectable({
    providedIn: 'root'
})
export class NewsService {

    constructor(
        private http: HttpClient
    ) {

    }

    getAllNewspages(query: string = ''): Observable<object> {
        return this.http.get(`${url}/newspages` + query);
    }

    getNewspageById(id: number): Observable<object> {
        return this.http.get(`${url}/newspages/${id}`);
    }

    getSearchNewsByTitle(title: string): Observable<object> {
        return this.http.get(`${url}/newspages/search/${title}`);
    }

    createNewspages(data: object): Observable<object> {
        return this.http.post(`${url}/newspages`, data);
    }

    editNewspages(id: number, data: object): Observable<object> {
        return this.http.put(`${url}/newspages/${id}`, data);
    }
    
    deleteNewspages(id: number): Observable<object> {
        return this.http.delete(`${url}/newspages/${id}`);
    }

    getAllNews(query: string = '', callback: Function) {
        this.getAllNewspages(query).subscribe({
            next: (res: any) => {
                callback(false, res);
            },
            error: (err) => {
                console.log(err)
                callback(true, null);
            }
        });
    }

    getSearchNews(title: string, callback: Function) {
        this.getSearchNewsByTitle(title).subscribe({
            next: (res: any) => {
                callback(false, res);
            },
            error: (err) => {
                console.log(err)
                callback(true, null);
            }
        });
    }

    
    createNews(newData: any, callback: Function) {
        this.createNewspages(newData).subscribe({
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

    editNews(id: number, newData: any, callback: Function) {
        this.editNewspages(id, newData).subscribe({
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

    deleteNews(id: number, callback: Function) {
        this.deleteNewspages(id).subscribe({
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