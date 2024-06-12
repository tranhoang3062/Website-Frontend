import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/app/environment/environment';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    public error: boolean = false;

    loading: boolean = false;

    public dataForm: any = this.fb.group({
        "email": ["", [Validators.required, Validators.email]],
        "password": ["", [Validators.required, Validators.minLength(6)]]
    });

    public constructor(
        private fb: FormBuilder, 
        private router: Router, 
        private authService: AuthService
    ) {
        if (localStorage.getItem('token_admin')) {
            window.location.href = '/admin';
        }
    }

    get f() {
        return this.dataForm.controls;
    }

    public handleSubmit() {
        const data = this.dataForm.value;
        this.loading = true;
        this.authService.loginUser(data).subscribe({
            next: (res: any) => {
                if (res.data[0].role == 0) {
                    localStorage.setItem('token_admin', res.token.access_token);
                    delete res.data[0]['password'];
                    delete res.data[0]['refresh_token'];
                    localStorage.setItem('auth_adm', JSON.stringify(res.data[0]));
                    setTimeout(() => {
                        window.location.href = '/admin';
                    }, 1000);
                } else this.error = true;
                setTimeout(() => {
                    this.loading = false;
                }, 1000)
            },
            error: (err) => {
                this.error = true;
                this.loading = false;
            }
        });
    }

    loginGoogle(e: any) {

    }
}
