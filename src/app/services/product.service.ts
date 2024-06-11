import { Injectable } from '@angular/core';
import * as $ from 'jquery';
import { getService } from './get-service.service';
import { CreateService } from './create-service.service';
import { Router } from '@angular/router';
import { DeleteService } from './delete-service.service';
import Swal from 'sweetalert2';
import { BehaviorSubject } from 'rxjs';
import { EditService } from './edit-service.service';
import { OrderService } from './order.service';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    public user: any = {};
    public dataOrders: any = new BehaviorSubject([]);
    public listChooseOrder: any = new BehaviorSubject([]);
    public dataDefault: any = [];
    public listChooseOrderDefault: any = [];
    currentData = this.dataOrders.asObservable();
    currentChooseOrder = this.listChooseOrder.asObservable();
    public orderStatus0: any = {};

    constructor(
        private router: Router, 
        private orderService: OrderService
    ) {
        const auth: any = localStorage.getItem('auth_cli');
        this.user = auth ? JSON.parse(auth) : {};
        if (this.user.id) {
            this.orderService.getOrderByUser(this.user.id, (err: boolean, data: any) => {
                if (!err) {
                    if (data.length > 0) {
                        this.orderStatus0 = data.find((item: any) => item.status == 0);
                        console.log(this.orderStatus0)
                        this.orderService.getOrderDetailByOrder(this.orderStatus0.id, (err: boolean, dataOrderDetail: any) => {
                            if (!err) {
                                this.changeData(dataOrderDetail);
                                this.dataDefault = dataOrderDetail;
                            }
                        });
                    } else {
                        this.orderService.createOrder({ user_id: this.user.id, status: 0 }, (result: boolean, data: any) => {
                            if (result) {
                                this.orderStatus0 = { id: data.insertId, status: 0 };
                            }
                        });
                    }
                }
            });
        }
    }

    public setDefaultOrder() {
        this.orderService.getOrderDetailByOrder(this.orderStatus0.id, (err: boolean, dataOrderDetail: any) => {
            if (!err) {
                this.changeData(dataOrderDetail);
                this.dataDefault = dataOrderDetail;
            }
        });
    }

    public checkOrder(product: any, obj?: any) {
        const result = this.dataDefault.some((item: any) => Number(item.product_id) === Number(product.id));
        if (obj && product.choose !== '' && product.choose) {
            const result = this.dataDefault.some((item: any) => Number(item.product_id) === Number(product.id) && obj.choose === item.choose);
            return result;
        } else return result;
    }

    public checkOrderChoose(product: any) {
        const result = this.dataDefault.some((item: any) => Number(item.product_id) === Number(product.id));
        if (product.choose !== '' && product.choose) {
            const result = product.choose.every((item: any) => {
                return this.dataDefault.some((elem: any) => Number(elem.product_id) === Number(product.id) && JSON.stringify(item) === elem.choose);
            });
            return result;
        } else return result;
    }

    public onOrder(product: any, obj?: any, check: boolean = false) {
        const svgElem = document.querySelector(`#btnorder${product.id} svg`) as HTMLElement;
        if (this.user.id) {
            if (this.checkOrder(product, obj)) {
                Swal.fire({
                    icon: 'success',
                    text: 'Sản phẩm đã được thêm vào giỏ hàng!',
                    timer: 2000,
                    showCancelButton: false,
                    showConfirmButton: false,
                    position: 'center',
                    color: 'black',
                    customClass: 'swal-class2',
                    heightAuto: false,
                });
            } else {
                let newData = {
                    order_id: this.orderStatus0.id,
                    product_id: product.id,
                    quantity: 1,
                    total_price: product.sale_price == 0 ? product.price : product.sale_price,
                    choose: product.choose !== '' ? JSON.stringify(product.choose[0]) : ''
                }
                if (obj) newData = { ...newData, ...obj };
                this.orderService.createOrderDetail(newData, (result: boolean, data: any) => {
                    if (result) {
                        const newObj = {
                            id: data.insertId,
                            nameProduct: product.name,
                            resourcesProduct: JSON.stringify(product.resources),
                            slugProduct: product.slug,
                            category_id: product.category_id,
                            cate2Slug: product.cate2Slug,
                            cate1Slug: product.cate1Slug,
                            cateSlug: product.cateSlug,
                            brandName: product.brandName,
                            ...newData
                        };
                        this.dataDefault.unshift(newObj);
                        this.changeData(this.dataDefault);
                        Swal.fire({
                            icon: 'success',
                            text: 'Sản phẩm đã được thêm vào giỏ hàng!',
                            timer: 2000,
                            showCancelButton: false,
                            showConfirmButton: false,
                            position: 'center',
                            color: 'black',
                            customClass: 'swal-class2',
                            heightAuto: false,
                        });
                        if (svgElem) {
                            svgElem.classList.remove('fa-cart-arrow-down');
                            svgElem.classList.add('fa-check', 'text-success');
                        }
                    } else {
                        if (data.status === 402) {
                            Swal.fire({
                                icon: "error",
                                title: "Lỗi tài khoản!",
                                text: "Vui lòng đăng nhập lại để tiếp tục thực hiện yêu cầu này!",
                                confirmButtonText: "Đăng nhập"
                            }).then((result) => {
                                if (result.isConfirmed) this.router.navigate(['/login']);
                            });
                        }
                    }
                });
            }
        } else {
            Swal.fire({
                icon: "error",
                title: "Bạn phải đăng nhập để thực hiện yêu cầu này!",
                confirmButtonText: "Đăng nhập"
            }).then((result) => {
                if (result.isConfirmed) this.router.navigate(['/login']);
            });
        }
    }

    public deleteOrder(orderDetail: any) {
        const svgElem = document.querySelector(`#btnorder${orderDetail.product_id} svg`) as HTMLElement;
        this.orderService.deleteOrderDetail(orderDetail.id, (result: boolean) => {
            if (result) {
                this.dataDefault = this.dataDefault.filter((item: any) => item.id !== orderDetail.id);
                this.changeData(this.dataDefault);
                if (this.dataDefault.every((item: any) => item.product_id !== orderDetail.product_id)) {
                    if (svgElem) {
                        svgElem.classList.add('fa-cart-arrow-down');
                        svgElem.classList.remove('fa-check', 'text-success');
                    }
                }
            }
        });
    }

    public updateOrderDetail(newData: any, index: number) {
        this.orderService.editOrderDetail(newData.id, { quantity: newData.quantity, total_price: newData.total_price }, (result: boolean, data: any) => {
            if (result) {
                this.dataDefault[index] = { ...this.dataDefault[index], quantity: newData.quantity, total_price: newData.total_price };
                this.changeData(this.dataDefault);
            }
        });
    }

    public checkInChoose(id: any, check: boolean = false) {
        const result = this.listChooseOrderDefault.some((item: any) => item.id == id);
        if (check) {
            const result = this.dataDefault.every((item: any) => this.listChooseOrderDefault.some((item1: any) => item.id === item1.id));
            return result;
        }
        return result;
    }

    public onChoose(data: any, check: boolean, prd: any) {
        if (check) {
            this.listChooseOrderDefault = data;
            this.changeListChoose(data);
        } else {
            if (this.checkInChoose(data)) {
                this.listChooseOrderDefault = this.listChooseOrderDefault.filter((item: any) => item.id !== data);
                this.changeListChoose(this.listChooseOrderDefault);
            } else {
                this.listChooseOrderDefault.push(prd);
                this.changeListChoose(this.listChooseOrderDefault);
            }
        }
    }

    public async handleOrder(listIdOrderDetail: any, data: any, check: boolean = false) {
        if (check) {
            await listIdOrderDetail.forEach((id: any) => {
                this.orderService.editOrderDetail(id, { order_id: this.orderStatus0.id }, (result: boolean, data: any) => { });
            });
            this.orderService.deleteOrders(data.id, (result: boolean, data: any) => {
                if (result) {
                    this.setDefaultOrder();
                }
            });
        } else {
            this.orderService.createOrder(data, async (result: boolean, dataOrder: any) => {
                if (result) {
                    await listIdOrderDetail.forEach(async (id: any) => {
                        await this.orderService.editOrderDetail(id, { order_id: dataOrder.insertId }, (result: boolean, data: any) => { });
                    });
                    this.setDefaultOrder();
                    this.changeListChoose([]);
                    this.listChooseOrderDefault = [];
                    this.router.navigate(['/user/purchase']);
                }
            });
        }
    }

    public changeData(data: any) {
        this.dataOrders.next(data);
    }

    public changeListChoose(data: any) {
        this.listChooseOrder.next(data);
    }

    public onImagesInQuickView(elem: any, position: string) {
        if (position == 'start') {
            $('.show-small-img:first-of-type').css({ 'border': 'solid 1px #951b25', 'padding': '2px' });
            $('.show-small-img:first-of-type').attr('alt', 'now').siblings().removeAttr('alt');
        }
        if (position == 'center') {
            console.log("aaaa")
            $('#show-img').attr('src', $(elem.target).attr('src') as string)
            $('#big-img').attr('src', $(elem.target).attr('src') as string)
            $(elem.target).attr('alt', 'now').siblings().removeAttr('alt')
            $(elem.target).css({ 'border': 'solid 1px #951b25', 'padding': '2px' }).siblings().css({ 'border': 'none', 'padding': '0' })
            if ($('#small-img-roll').children().length > 4) {
                if ($(elem.target).index() >= 3 && $(elem.target).index() < $('#small-img-roll').children().length - 1) {
                    $('#small-img-roll').css('left', -($(elem.target).index() - 2) * 76 + 'px')
                } else if ($(elem.target).index() == $('#small-img-roll').children().length - 1) {
                    $('#small-img-roll').css('left', -($('#small-img-roll').children().length - 4) * 76 + 'px')
                } else {
                    $('#small-img-roll').css('left', '0')
                }
            }
        }
        // $('.show-small-img').click(function () {
        // })
        // 点击 '>' 下一张
        if (position == 'right') {
            $('#show-img').attr('src', $(".show-small-img[alt='now']").next().attr('src') as string)
            $('#big-img').attr('src', $(".show-small-img[alt='now']").next().attr('src') as string)
            $(".show-small-img[alt='now']").next().css({ 'border': 'solid 1px #951b25', 'padding': '2px' }).siblings().css({ 'border': 'none', 'padding': '0' })
            $(".show-small-img[alt='now']").next().attr('alt', 'now').siblings().removeAttr('alt')
            if ($('#small-img-roll').children().length > 4) {
                if ($(".show-small-img[alt='now']").index() >= 3 && $(".show-small-img[alt='now']").index() < $('#small-img-roll').children().length - 1) {
                    $('#small-img-roll').css('left', -($(".show-small-img[alt='now']").index() - 2) * 76 + 'px')
                } else if ($(".show-small-img[alt='now']").index() == $('#small-img-roll').children().length - 1) {
                    $('#small-img-roll').css('left', -($('#small-img-roll').children().length - 4) * 76 + 'px')
                } else {
                    $('#small-img-roll').css('left', '0')
                }
            }
        }
        // $('#next-img').click(function (){
        // })
        // 点击 '<' 上一张
        if (position == 'left') {
            $('#show-img').attr('src', $(".show-small-img[alt='now']").prev().attr('src') as string);
            $('#big-img').attr('src', $(".show-small-img[alt='now']").prev().attr('src') as string);
            $(".show-small-img[alt='now']").prev().css({ 'border': 'solid 1px #951b25', 'padding': '2px' }).siblings().css({ 'border': 'none', 'padding': '0' })
            $(".show-small-img[alt='now']").prev().attr('alt', 'now').siblings().removeAttr('alt')
            if ($('#small-img-roll').children().length > 4) {
                if ($(".show-small-img[alt='now']").index() >= 3 && $(".show-small-img[alt='now']").index() < $('#small-img-roll').children().length - 1) {
                    $('#small-img-roll').css('left', -($(".show-small-img[alt='now']").index() - 2) * 76 + 'px')
                } else if ($(".show-small-img[alt='now']").index() == $('#small-img-roll').children().length - 1) {
                    $('#small-img-roll').css('left', -($('#small-img-roll').children().length - 4) * 76 + 'px')
                } else {
                    $('#small-img-roll').css('left', '0')
                }
            }
        }
        // $('#prev-img').click(function (){
        // })
    }

}
