import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    error: any = false;

    dataForm: any = this.fb.group({
        "email": ["", [Validators.required, Validators.email]],
        "password": ["", [Validators.required, Validators.minLength(6)]]
    });

    loading: boolean = false;

    constructor(
        private titleService: Title,
        private fb: FormBuilder,
        private router: Router,
        private authService: AuthService
    ) {
        this.titleService.setTitle('Đăng nhập');
        $('html, body').animate({ scrollTop: 0, behavior: 'smooth' }, 0);
        if (localStorage.getItem('token')) this.router.navigate(['/']);
    }

    get f() {
        return this.dataForm.controls;
    }

    handleSubmit() {
        const data = this.dataForm.value;

        this.loading = true;
        this.authService.loginUser(data).subscribe({
            next: (res: any) => {
                if (res.data[0].role == 1) {
                    localStorage.setItem('token', res.token.access_token);
                    delete res.data[0]['password'];
                    delete res.data[0]['refresh_token'];
                    localStorage.setItem('auth_cli', JSON.stringify(res.data[0]));
                    setTimeout(() => {
                        window.location.href = '/';
                    }, 1000);
                } else this.error = true;
                setTimeout(() => {
                    this.loading = false;                
                }, 1000);
            },
            error: (err) => {
                console.log(err);
                this.error = true;
                this.loading = false;
            }
        });
    }

    loginGoogle(e: any) {
        console.log(e)
    }
}
