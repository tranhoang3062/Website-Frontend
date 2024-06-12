import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-edit-r',
    templateUrl: './edit-r.component.html',
    styleUrls: ['./edit-r.component.css']
})
export class EditRComponent {
    public faHouse = faHouse;

    public emailError: boolean = false;
    public phoneError: boolean = false;
    public passwordComfirmError: boolean = false;
    public file: any;
    public urlImg: any = '';
    public paramType: any = '';
    public paramId: any = '';
    public account: any = {};

    public radioInputs: any = [
        { id: 1, name: 'Nam', value: 0, checked: false },
        { id: 2, name: 'Nữ', value: 1, checked: false },
        { id: 2, name: 'Khác', value: 2, checked: false },
    ];

    public dataForm = this.fb.group({
        "fullname": ["", [Validators.required]],
        "email": ["", [Validators.required, Validators.email]],
        "phone": ["", [Validators.required, Validators.pattern('(03|05|07|08|09|01[2|6|8|9])+[0-9]{8}')]],
        "gender": [""],
        "birthday": [""],
        "address": [""],
        "password": [""],
        "confirm_pw": [""]
    })

    public constructor(
        private fb: FormBuilder,
        private router: Router, 
        private activatedRoute: ActivatedRoute,
        private authService: AuthService
    ) {
        this.activatedRoute.paramMap.subscribe(params => {
            this.paramType = params.get('type');
            this.paramId = params.get('id');
            this.authService.getUserById(this.paramId, (err: boolean, data: any) => {
                if (!err) {
                    this.account = data[0];
                    this.dataForm.controls.fullname.setValue(this.account.fullname);
                    this.dataForm.controls.email.setValue(this.account.email);
                    this.dataForm.controls.phone.setValue(this.account.phone);
                    this.dataForm.controls.birthday.setValue(this.formatDate(this.account.birthday));
                    this.dataForm.controls.address.setValue(this.account.address);
                    this.dataForm.controls.gender.setValue(this.account.gender);
                    this.radioInputs.forEach((item: any) => {
                        if (item.value === this.account.gender) item.checked = true;
                        else item.checked = false;
                    });
                    this.urlImg = this.account.thumbnail;
                }
            });
        });
    }

    get f() {
        return this.dataForm.controls;
    }

    selectFile(elem: any) {
        this.file = elem.target.files[0];
        if (!this.file) {
            this.urlImg = this.account.thumbnail;
        } else {
            const reader = new FileReader();
            reader.readAsDataURL(this.file);
            reader.onload = (e: any) => {
                this.urlImg = e.target.result;
            }
        }
    }

    public handleSubmit() {
        const newData: any = this.dataForm.value;
        this.authService.getAllUser('?email=' + newData.email, (err: boolean, data: any) => {
            if (!err) {
                if (data[0] && data[0].email !== newData.email) this.emailError = true;
                else {
                    this.emailError = false;
                    this.authService.getAllUser('?phone=' + newData.phone, (err: boolean, data: any) => {
                        if (!err) {
                            if (data[0] && data[0].phone !== newData.phone) this.phoneError = true;
                            else {
                                this.phoneError = false;
                                const formData = new FormData();
                                formData.append("fullname", newData.fullname);
                                formData.append("email", newData.email);
                                formData.append("phone", newData.phone);
                                formData.append("gender", newData.gender);
                                formData.append("birthday", newData.birthday);
                                formData.append("address", newData.address);
                                formData.append("password", newData.password);
                                if (this.file) formData.append("upload-file", this.file);
                                this.authService.editUser(this.paramId, formData, (result: boolean) => {
                                    if (result) {
                                        Swal.fire({
                                            title: 'Lưu thông tin thành công!',
                                            timer: 1000,
                                            showCancelButton: false,
                                            showConfirmButton: false,
                                            position: 'top-right',
                                            color: 'green',
                                            customClass: 'swal-height',
                                            heightAuto: false,
                                        });
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

    formatDate(date: any) {
        const d = new Date(date);
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        const year = d.getFullYear();
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        return [year, month, day].join('-');
    }

    disabledBtn() {
        let data = this.dataForm.value;
        if (data.password || data.confirm_pw) {
            if (!data.password || !data.confirm_pw) return true;
            else if (data.password && data.password.length < 6 || data.confirm_pw && data.confirm_pw.length < 6) return true;
        }
    }

    isErrorPw: boolean = false;
    checkPassword() {
        if (this.dataForm.value.password && this.dataForm.value.password.length >= 6 && this.dataForm.value.confirm_pw && this.dataForm.value.confirm_pw.length >= 6) {
            if (this.dataForm.value.password != this.dataForm.value.confirm_pw) this.isErrorPw = true;
            else this.isErrorPw = false;
        } else this.isErrorPw = false;
    }
}
