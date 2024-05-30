import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import { CreateService } from 'src/app/services/create-service.service';
import { getService } from 'src/app/services/get-service.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-create-r',
    templateUrl: './create-r.component.html',
    styleUrls: ['./create-r.component.css']
})
export class CreateRComponent {
    public faHouse = faHouse;

    public emailError: boolean = false;
    public phoneError: boolean = false;
    public passwordComfirmError: boolean = false;
    public file: any;
    public urlImg: any = '';
    public paramType: any = '';

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
    })

    public constructor(
        private fb: FormBuilder,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private authService: AuthService
    ) {
        this.activatedRoute.paramMap.subscribe(params => {
            this.paramType = params.get('type');
        })
    }

    get f() {
        return this.dataForm.controls;
    }

    selectFile(elem: any) {
        this.file = elem.target.files[0];
        if (!this.file) {
            this.urlImg = '';
        }
        const reader = new FileReader();
        reader.readAsDataURL(this.file);
        reader.onload = (e: any) => {
            this.urlImg = e.target.result;
        }
    }

    public handleSubmit() {
        if (this.dataForm.value.passwordComfirm !== this.dataForm.value.password) {
            this.passwordComfirmError = true;
        } else {
            this.passwordComfirmError = false;
            const newData: any = this.dataForm.value;
            this.authService.getAllUser('?email=' + newData.email, (err: boolean, data: any) => {
                if (!err) {
                    if (data[0]) this.emailError = true;
                    else {
                        this.emailError = false;
                        this.authService.getAllUser('?phone=' + newData.phone, (err: boolean, data: any) => {
                            if (!err) {
                                if (data[0]) this.phoneError = true;
                                else {
                                    this.phoneError = false;
                                    const formData = new FormData();
                                    formData.append("fullname", newData.fullname);
                                    formData.append("email", newData.email);
                                    formData.append("phone", newData.phone);
                                    formData.append("password", newData.password);
                                    formData.append("gender", newData.gender);
                                    formData.append("birthday", newData.birthday);
                                    formData.append("address", newData.address);
                                    if (this.paramType === 'qtv') formData.append("role", "0");
                                    if (!this.file) formData.append("thumbnail", "assets/images/avatar-user-default.png");
                                    else formData.append("upload-file", this.file);
                                    this.authService.register(formData, (result: boolean) => {
                                        if (result) {
                                            this.router.navigate(['/admin']);
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
