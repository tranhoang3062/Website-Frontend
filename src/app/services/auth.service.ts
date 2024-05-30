import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import * as $ from 'jquery';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { environment } from '../environment/environment';
import { Observable } from 'rxjs';

const url = environment.apiUrl;

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    public token: any = '';

    constructor(private http: HttpClient, private router: Router) { }

    allUser(query: string = ''): Observable<object> {
        return this.http.get(`${url}/user` + query);
    }

    userById(id: number): Observable<object> {
        return this.http.get(`${url}/user/${id}`);
    }

    createUser(data: object): Observable<object> {
        return this.http.post(`${url}/user/register`, data);
    }

    loginUser(data: object): Observable<object> {
        return this.http.post(`${url}/user/login`, data);
    }

    updateUser(id: number, data: object): Observable<object> {
        return this.http.put(`${url}/user/${id}`, data);
    }

    removeUser(id: number): Observable<object> {
        return this.http.delete(`${url}/user/${id}`);
    }

    getAllUser(query: string = '', callback: Function) {
        this.allUser(query).subscribe({
            next: (res: any) => {
                callback(false, res);
            },
            error: (err) => {
                console.log(err)
                callback(true, null);
            }
        });
    }

    getUserById(id: number, callback: Function) {
        this.userById(id).subscribe({
            next: (res: any) => {
                callback(false, res);
            },
            error: (err) => {
                console.log(err)
                callback(true, null);
            }
        });
    }

    editUser(id: number, newData: any, callback: Function) {
        this.updateUser(id, newData).subscribe({
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

    deleteUser(id: number, callback: Function) {
        this.removeUser(id).subscribe({
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

    public register(newData: any, callback: Function) {
        this.createUser(newData).subscribe({
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
        this.createUser(newData).subscribe({
            next: (res) => {
                callback(true, res);
            },
            error: (err) => {
                console.log(err);
                callback(false, err);
            }
        });
    }

    public isAuthenticated(): any {
        this.token = localStorage.getItem('token') || '';
        if (this.token || this.token !== '') {
            const decodedToken: any = jwtDecode(this.token);
            var current_time = new Date().getTime() / 1000;
            const result = current_time > decodedToken.exp;
            return result;
        }
        return false;
    }

    public async refreshtoken(token: string) {
        try {
            const res = await axios.get("http://localhost:8000/api/refresh-token", { headers: { 'authorization': JSON.stringify({ access_token: token }) } });
            localStorage.setItem('token', res.data.access_token);
            this.token = await res.data.access_token;
        } catch (err: any) {
            localStorage.clear();
            localStorage.setItem('errToken', err.response.data.message);
            const checkHref = window.location.href.indexOf('/admin');
            Swal.fire({
                icon: "error",
                title: "Quá thời gian truy cập!",
                text: "Đã hết thời gian truy cập trang web. Vì lý do bảo mật quý khách vui lòng thực hiện đăng nhập lại.",
                confirmButtonText: "Đăng nhập",
                allowOutsideClick: false
            }).then((result) => {
                if (result.isConfirmed) window.location.href = checkHref !== -1 ? '/admin/login' : '/login';
            });
        }
    }

}
