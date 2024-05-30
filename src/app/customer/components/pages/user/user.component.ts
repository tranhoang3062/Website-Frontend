import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { faCalendarMinus, faClock, faUser } from '@fortawesome/free-regular-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import { EditService } from 'src/app/services/edit-service.service';
import { getService } from 'src/app/services/get-service.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent {
    public faPen = faPen;
    public faUser = faUser;
    public faCalendarMinus = faCalendarMinus;
    public faClock = faClock;

    public paramKey: any = '';
    public file: any;
    public urlImg: any = '';
    public user: any = false;
    public listAllOrder: any = [];
    public listOrderStatus1: any = [];
    public listOrderStatus2: any = [];
    public listOrderStatus3: any = [];
    public listOrderStatus5: any = [];

    public radioInputs: any = [
        { id: 1, name: 'Nam', value: 0, checked: false },
        { id: 2, name: 'Nữ', value: 1, checked: false },
        { id: 2, name: 'Khác', value: 2, checked: false },
    ];

    public dataForm = this.fb.group({
        "fullname": ["", [Validators.required]],
        "gender": [""],
        "birthday": [""],
        "address": [""],
    });

    public constructor(
        private titleService: Title, 
        private getService: getService, 
        private fb: FormBuilder, 
        private editService: EditService, 
        private router: Router, 
        private activatedRoute: ActivatedRoute, 
        private productService: ProductService,
        private authService: AuthService,
        private orderService: OrderService
    ) {
        $('html, body').animate({ scrollTop: 0 }, 0);

        const auth: any = localStorage.getItem('auth');
        this.user = auth ? JSON.parse(auth) : false;

        this.activatedRoute.paramMap.subscribe(params => {
            this.paramKey = params.get('key');
            if (this.paramKey === 'account') {
                this.titleService.setTitle('Tài khoản');

                if (this.user) {
                    this.dataForm.controls.fullname.setValue(this.user.fullname);
                    this.dataForm.controls.gender.setValue(this.user.gender + '');
                    this.dataForm.controls.birthday.setValue(this.user.birthday);
                    this.dataForm.controls.address.setValue(this.user.address);
                    this.radioInputs.forEach((item: any) => {
                        if (item.value == this.user.gender) item.checked = true;
                        else item.checked = false;
                    });
                    this.urlImg = this.user.thumbnail;
                }
            } else if (this.paramKey === 'purchase') {
                this.titleService.setTitle('Đơn hàng');

                this.orderService.getOrderByUser(this.user.id, (err: boolean, dataOrder: any) => {
                    if (!err) {
                        this.orderService.getOrderDetailByUser(this.user.id, async (err: boolean, dataOrderDetail: any) => {
                            if (!err) {
                                this.listOrderStatus1 = await dataOrder
                                    .filter((item: any) => item.status == 1)
                                    .map((item: any) => {
                                        const orderDetails: any = dataOrderDetail
                                            .filter((elem: any) => elem.order_id == item.id)
                                            .map((elem: any) => {
                                                elem.resourcesProduct = JSON.parse(elem.resourcesProduct);
                                                elem.choose = elem.choose !== '' && elem.choose ? JSON.parse(elem.choose) : '';
                                                return elem;
                                            });
                                        const total_amount = dataOrderDetail.filter((elem: any) => elem.order_id == item.id).reduce((a: any, b: any) => a + b.total_price, 0);
                                        return { ...item, total_amount, orderDetails };
                                    });
                                this.listOrderStatus2 = await dataOrder
                                    .filter((item: any) => item.status == 2)
                                    .map((item: any) => {
                                        const orderDetails: any = dataOrderDetail
                                            .filter((elem: any) => elem.order_id == item.id)
                                            .map((elem: any) => {
                                                elem.resourcesProduct = JSON.parse(elem.resourcesProduct);
                                                elem.choose = elem.choose !== '' && elem.choose ? JSON.parse(elem.choose) : '';
                                                return elem;
                                            });
                                        const total_amount = dataOrderDetail.filter((elem: any) => elem.order_id == item.id).reduce((a: any, b: any) => a + b.total_price, 0);
                                        return { ...item, total_amount, orderDetails };
                                    });
                                this.listOrderStatus3 = await dataOrder
                                    .filter((item: any) => item.status == 3)
                                    .map((item: any) => {
                                        const orderDetails: any = dataOrderDetail
                                            .filter((elem: any) => elem.order_id == item.id)
                                            .map((elem: any) => {
                                                elem.resourcesProduct = JSON.parse(elem.resourcesProduct);
                                                elem.choose = elem.choose !== '' && elem.choose ? JSON.parse(elem.choose) : '';
                                                return elem;
                                            });
                                        const total_amount = dataOrderDetail.filter((elem: any) => elem.order_id == item.id).reduce((a: any, b: any) => a + b.total_price, 0);
                                        return { ...item, total_amount, orderDetails };
                                    });
                                this.listOrderStatus5 = await dataOrder
                                    .filter((item: any) => item.status == 5)
                                    .map((item: any) => {
                                        const orderDetails: any = dataOrderDetail
                                            .filter((elem: any) => elem.order_id == item.id)
                                            .map((elem: any) => {
                                                elem.resourcesProduct = JSON.parse(elem.resourcesProduct);
                                                elem.choose = elem.choose !== '' && elem.choose ? JSON.parse(elem.choose) : '';
                                                return elem;
                                            });
                                        const total_amount = dataOrderDetail.filter((elem: any) => elem.order_id == item.id).reduce((a: any, b: any) => a + b.total_price, 0);
                                        return { ...item, total_amount, orderDetails };
                                    });
                                this.listAllOrder = await [...this.listOrderStatus1, ...this.listOrderStatus2, ...this.listOrderStatus3, ...this.listOrderStatus5];
                            }
                        });
                    }
                });
            }
        });
    }

    get f() {
        return this.dataForm.controls;
    }

    selectFile(elem: any) {
        this.file = elem.target.files[0];
        if (!this.file) {
            this.urlImg = this.user.thumbnail;
        }
        const reader = new FileReader();
        reader.readAsDataURL(this.file);
        reader.onload = (e: any) => {
            this.urlImg = e.target.result;
        }
    }

    public encodeValue(value: string, position: string, nb: number) {
        if (position === 'top') value.slice(0, nb).split('').forEach((a: string) => { value = value.replace(a, '*') });
        else if (position === 'end') value.slice(-nb,).split('').forEach((a: string) => { value = value.replace(a, '*') });
        return value;
    }

    public handleSubmit() {
        const newData: any = this.dataForm.value;
        const formData = new FormData();
        formData.append('fullname', newData.fullname);
        formData.append('gender', newData.gender);
        formData.append('address', newData.address);
        formData.append('birthday', newData.birthday);
        if (this.file) formData.append('upload-file', this.file);
        this.authService.editUser(this.user.id, formData, (result: boolean, data: any) => {
            if (result) {
                Swal.fire({
                    icon: 'success',
                    text: 'Cập nhật thông tin thành công!',
                    timer: 2000,
                    showCancelButton: false,
                    showConfirmButton: false,
                    position: 'center',
                    color: 'black',
                    customClass: 'swal-class2',
                    heightAuto: false,
                });
                localStorage.setItem('auth', JSON.stringify({ ...this.user, ...newData, thumbnail: this.urlImg }));
                this.router.navigateByUrl('/user', { skipLocationChange: true }).then(() => {
                    this.router.navigate(['/user/account']);
                });
            }
        });
    }

    public handleRoute(key: string) {
        this.router.navigate(['/user/' + key]);
    }

    public handleCancelOrder(item: any, index: number) {
        Swal.fire({
            text: "Xác nhận hủy đơn hàng?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Tiếp tục',
            cancelButtonText: 'Trở lại'
        }).then((result) => {
            if (result.isConfirmed) {
                this.orderService.editOrder(item.id, { status: 5 }, (result: boolean, data: any) => {
                    if (result) {
                        this.listOrderStatus1.splice(index, 1);
                        this.listOrderStatus5.unshift(item);
                        this.listAllOrder.some((elem: any) => {
                            if (elem.id == item.id) elem.status = 5;
                            return elem.id == item.id;
                        });
                    }
                });
            }
        });
    }

    public handleRepurchase(item: any, index: number) {
        this.productService.handleOrder(item.orderDetails.map((a: any) => a.id), { id: item.id }, true);
        this.listOrderStatus5.splice(index, 1);
        this.listAllOrder = [...this.listOrderStatus1, ...this.listOrderStatus2, ...this.listOrderStatus3, ...this.listOrderStatus5];
    }
}
