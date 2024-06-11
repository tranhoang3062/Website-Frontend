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
    public error: any = false;

    public dataForm: any = this.fb.group({
        "email": ["", [Validators.required, Validators.email]],
        "password": ["", [Validators.required, Validators.minLength(6)]]
    });

    public constructor(
        private titleService: Title,
        private fb: FormBuilder,
        private router: Router,
        private authService: AuthService
    ) {
        this.titleService.setTitle('Đăng nhập');
        $('html, body').animate({ scrollTop: 0 }, 0);
        if (localStorage.getItem('token')) this.router.navigate(['/']);
    }

    get f() {
        return this.dataForm.controls;
    }

    public handleSubmit() {
        const data = this.dataForm.value;
        this.authService.loginUser(data).subscribe({
            next: (res: any) => {
                if (res.data[0].role == 1) {
                    localStorage.setItem('token', res.token.access_token);
                    delete res.data[0]['password'];
                    delete res.data[0]['refresh_token'];
                    localStorage.setItem('auth_cli', JSON.stringify(res.data[0]));
                    window.location.href = '/';
                } else this.error = true;
            },
            error: (err) => {
                console.log(err);
                this.error = true;
            }
        });
    }

    loginGoogle(e: any) {
        console.log(e)
    }
}
