import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { faArrowLeftLong, faArrowRightLong, faPlus } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import { CreateService } from 'src/app/services/create-service.service';
import { getService } from 'src/app/services/get-service.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {
    public faArrowRightLong = faArrowRightLong;
    public faArrowLeftLong = faArrowLeftLong;
    public faPlus = faPlus;

    public emailError: boolean = false;
    public phoneError: boolean = false;
    public passwordComfirmError: boolean = false;
    public file: any;
    public urlImg: any = 'assets/images/avatar-user-default.png';
    public showForm: any = [true, false, false];

    public radioInputs: any = [
        { id: 1, name: 'Nam', value: 0, checked: true },
        { id: 2, name: 'Nữ', value: 1, checked: false },
        { id: 2, name: 'Khác', value: 2, checked: false },
    ];

    public dataForm = this.fb.group({
        "fullname": ["", [Validators.required]],
        "email": ["", [Validators.required, Validators.email]],
        "phone": ["", [Validators.required, Validators.pattern('(03|05|07|08|09|01[2|6|8|9])+[0-9]{8}')]],
        "password": ["", [Validators.required, Validators.minLength(6)]],
        "passwordComfirm": ["", [Validators.required, Validators.minLength(6)]],
        "gender": ["0"],
        "birthday": [""],
        "address": [""],
    });

    public constructor(
        private titleService: Title, 
        private fb: FormBuilder, 
        private createService: CreateService, 
        private getService: getService, 
        private router: Router,
        private authService: AuthService
    ) {
        this.titleService.setTitle('Đăng ký');
        $('html, body').animate({ scrollTop: 0 }, 0);
        if (localStorage.getItem('token')) this.router.navigate(['/']);
    }

    get f() {
        return this.dataForm.controls;
    }

    public selectFile(elem: any) {
        this.file = elem.target.files[0];
        if (!this.file) {
            this.urlImg = 'assets/images/avatar-user-default.png';
        }
        const reader = new FileReader();
        reader.readAsDataURL(this.file);
        reader.onload = (e: any) => {
            this.urlImg = e.target.result;
        }
    }

    public handleButton(a: boolean, b: boolean, c: boolean) {
        this.showForm = [a, b, c];
    }

    public handleSubmit() {
        if (this.dataForm.value.passwordComfirm !== this.dataForm.value.password) {
            this.passwordComfirmError = true;
            this.showForm = [true, false, false];
        } else {
            this.passwordComfirmError = false;
            const newData: any = this.dataForm.value;
            this.authService.getAllUser('?email=' + newData.email, (err: boolean, data: any) => {
                if (!err) {
                    if (data[0]) {
                        this.emailError = true;
                        this.showForm = [true, false, false];
                    } else {
                        this.emailError = false;
                        this.authService.getAllUser('?phone=' + newData.phone, (err: boolean, data: any) => {
                            if (!err) {
                                if (data[0]) {
                                    this.phoneError = true;
                                    this.showForm = [true, false, false];
                                } else {
                                    this.phoneError = false;
                                    const formData = new FormData();
                                    formData.append("fullname", newData.fullname);
                                    formData.append("email", newData.email);
                                    formData.append("phone", newData.phone);
                                    formData.append("password", newData.password);
                                    formData.append("gender", newData.gender);
                                    formData.append("birthday", newData.birthday);
                                    formData.append("address", newData.address);
                                    if (!this.file) formData.append("thumbnail", "assets/images/avatar-user-default.png");
                                    else formData.append("upload-file", this.file);
                                    this.authService.register(formData, (result: boolean) => {
                                        if (result) {
                                            this.router.navigate(['/login']);
                                        }
                                    });
                                }
                            }
                        });
                    }
                }
            });
        }
    }

}
