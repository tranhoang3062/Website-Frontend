import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import * as $ from 'jquery';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    public token: any = '';

    constructor(private http: HttpClient, private router: Router) { }

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
