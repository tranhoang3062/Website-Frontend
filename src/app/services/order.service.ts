import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { environment } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const url = environment.apiUrl;

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    constructor(
        private http: HttpClient
    ) {

    }

    // Orders
    getAllOrders(query: string = ''): Observable<object> {
        return this.http.get(`${url}/orders` + query);
    }
    orderById(id: number): Observable<object> {
        return this.http.get(`${url}/orders/${id}`);
    }
    orderByUser(user_id: number): Observable<object> {
        return this.http.get(`${url}/orders/user/${user_id}`);
    }
    createOrders(data: object): Observable<object> {
        return this.http.post(`${url}/orders`, data);
    }
    editOrders(id: number, data: object): Observable<object> {
        return this.http.put(`${url}/orders/${id}`, data);
    }
    removeOrders(id: number): Observable<object> {
        return this.http.delete(`${url}/orders/${id}`);
    }

    // Order detail
    allOrderDetail(query: string = ''): Observable<object> {
        return this.http.get(`${url}/order-detail` + query);
    }
    orderDetailByOrder(order_id: number): Observable<object> {
        return this.http.get(`${url}/order-detail/order/${order_id}`);
    }
    orderDetailByUser(user_id: number): Observable<object> {
        return this.http.get(`${url}/order-detail/user/${user_id}`);
    }
    newOrderDetail(data: object): Observable<object> {
        return this.http.post(`${url}/order-detail`, data);
    }
    updateOrderDetail(id: number, data: object): Observable<object> {
        return this.http.put(`${url}/order-detail/${id}`, data);
    }
    removeOrderDetail(id: number): Observable<object> {
        return this.http.delete(`${url}/order-detail/${id}`);
    }
    removeOrderDetailByOrderId(order_id: number): Observable<object> {
        return this.http.delete(`${url}/order-detail/order/${order_id}`);
    }

    
    // order
    getAllOrder(query: string = '', callback: Function) {
        this.getAllOrders(query).subscribe({
            next: (res: any) => {
                callback(false, res);
            },
            error: (err) => {
                console.log(err)
                callback(true, null);
            }
        });
    }

    getOrderById(id: number, callback: Function) {
        this.orderById(id).subscribe({
            next: (res: any) => {
                callback(false, res);
            },
            error: (err) => {
                console.log(err)
                callback(true, null);
            }
        });
    }

    getOrderByUser(id: number, callback: Function) {
        this.orderByUser(id).subscribe({
            next: (res: any) => {
                callback(false, res);
            },
            error: (err) => {
                console.log(err)
                callback(true, null);
            }
        });
    }

    // order_detail
    getAllOrderDetail(query: string = '', callback: Function) {
        this.allOrderDetail(query).subscribe({
            next: (res: any) => {
                callback(false, res);
            },
            error: (err) => {
                console.log(err)
                callback(true, null);
            }
        });
    }

    getOrderDetailByOrder(order_id: number, callback: Function) {
        this.orderDetailByOrder(order_id).subscribe({
            next: (res: any) => {
                callback(false, res);
            },
            error: (err) => {
                console.log(err)
                callback(true, null);
            }
        });
    }

    getOrderDetailByUser(user_id: number, callback: Function) {
        this.orderDetailByUser(user_id).subscribe({
            next: (res: any) => {
                callback(false, res);
            },
            error: (err) => {
                console.log(err)
                callback(true, null);
            }
        });
    }

    createOrder(newData: any, callback: Function) {
        this.createOrders(newData).subscribe({
            next: (res) => {
                callback(true, res);
            },
            error: (err) => {
                console.log(err);
                callback(false, err);
            }
        });
    }

    createOrderDetail(newData: any, callback: Function) {
        this.newOrderDetail(newData).subscribe({
            next: (res) => {
                callback(true, res);
            },
            error: (err) => {
                console.log(err);
                callback(false, err);
            }
        });
    }

    
    editOrder(id: number, newData: any, callback: Function) {
        this.editOrders(id, newData).subscribe({
            next: (res) => {
                callback(true, res);
            },
            error: (err) => {
                console.log(err);
                callback(false, err);
            }
        });
    }

    editOrderDetail(id: number, newData: any, callback: Function) {
        this.updateOrderDetail(id, newData).subscribe({
            next: (res) => {
                callback(true, res);
            },
            error: (err) => {
                console.log(err);
                callback(false, err);
            }
        });
    }

    
    deleteOrders(id: number, callback: Function) {
        this.removeOrders(id).subscribe({
            next: (res) => {
                callback(true);
            },
            error: (err) => {
                console.log(err);
                callback(false);
            }
        });
    }

    deleteOrderDetail(id: number, callback: Function) {
        this.removeOrderDetail(id).subscribe({
            next: (res) => {
                callback(true);
            },
            error: (err) => {
                console.log(err);
                callback(false);
            }
        });
    }

    deleteOrderDetailByOrderId(order_id: number, callback: Function) {
        this.removeOrderDetailByOrderId(order_id).subscribe({
            next: (res) => {
                callback(true);
            },
            error: (err) => {
                console.log(err);
                callback(false);
            }
        });
    }

}