import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    public error: boolean = false;

    public dataForm: any = this.fb.group({
        "email": ["", [Validators.required, Validators.email]],
        "password": ["", [Validators.required, Validators.minLength(6)]]
    });

    public constructor(
        private fb: FormBuilder, 
        private router: Router, 
        private authService: AuthService
    ) { }

    get f() {
        return this.dataForm.controls;
    }

    public handleSubmit() {
        const data = this.dataForm.value;
        this.authService.loginUser(data).subscribe({
            next: (res: any) => {
                localStorage.setItem('token', res.token.access_token);
                delete res.data[0]['password'];
                delete res.data[0]['refresh_token'];
                localStorage.setItem('auth', JSON.stringify(res.data[0]));
                window.location.href = '/admin';
                // this.router.navigate(['/admin']);
            },
            error: (err) => {
                this.error = true;
            }
        });
    }
}