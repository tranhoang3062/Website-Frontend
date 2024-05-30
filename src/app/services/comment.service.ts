import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';

const url = environment.apiUrl;

@Injectable({
    providedIn: 'root'
})
export class CommentService {
    public user: any = {};
    public dataOrders: any = new BehaviorSubject([]);
    public dataDefault: any = [];
    currentData = this.dataOrders.asObservable();

    constructor(private http: HttpClient) {
    }

    public changeData(data: any) {
        this.dataOrders.next(data);
    }


    getAllComments(query: string = ''): Observable<object> {
        return this.http.get(`${url}/comments` + query);
    }
    commentById(id: number): Observable<object> {
        return this.http.get(`${url}/comments/${id}`);
    }
    commentByUser(user_id: number): Observable<object> {
        return this.http.get(`${url}/comments/user/${user_id}`);
    }
    commentByProduct(product_id: number): Observable<object> {
        return this.http.get(`${url}/comments/product/${product_id}`);
    }
    createComment(data: object): Observable<object> {
        return this.http.post(`${url}/comments`, data);
    }
    editComment(id: number, data: object): Observable<object> {
        return this.http.put(`${url}/comments/${id}`, data);
    }
    deleteComments(id: number): Observable<object> {
        return this.http.delete(`${url}/comments/${id}`);
    }

    getAllComment(query: string = '', callback: Function) {
        this.getAllComments(query).subscribe({
            next: (res: any) => {
                callback(false, res);
            },
            error: (err) => {
                console.log(err)
                callback(true, null);
            }
        });
    }

    getCommentById(id: number, callback: Function) {
        this.commentById(id).subscribe({
            next: (res: any) => {
                callback(false, res);
            },
            error: (err) => {
                console.log(err)
                callback(true, null);
            }
        });
    }

    getCommentByUser(id: number, callback: Function) {
        this.commentByUser(id).subscribe({
            next: (res: any) => {
                callback(false, res);
            },
            error: (err) => {
                console.log(err)
                callback(true, null);
            }
        });
    }

    getCommentByProduct(product_id: number, callback: Function) {
        this.commentByProduct(product_id).subscribe({
            next: (res: any) => {
                callback(false, res);
            },
            error: (err) => {
                console.log(err)
                callback(true, null);
            }
        });
    }

    createComments(newData: any, callback: Function) {
        this.createComment(newData).subscribe({
            next: (res) => {
                callback(true, res);
            },
            error: (err) => {
                console.log(err);
                callback(false, err);
            }
        });
    }


    editComments(id: number, newData: any, callback: Function) {
        this.editComment(id, newData).subscribe({
            next: (res) => {
                callback(true, res);
            },
            error: (err) => {
                console.log(err);
                callback(false, err);
            }
        });
    }

}
