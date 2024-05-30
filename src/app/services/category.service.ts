import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

const url = environment.apiUrl;

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    constructor(private http: HttpClient) { }

    getAllCategories(query: string = ''): Observable<object> {
        return this.http.get(`${url}/categories` + query);
    }

    getCategoryById(id: number): Observable<object> {
        return this.http.get(`${url}/categories/${id}`);
    }

    getSearchCategoryByName(name: string): Observable<object> {
        return this.http.get(`${url}/categories/search/${name}`);
    }

    getCategoryParent(): Observable<object> {
        return this.http.get(`${url}/categories/parent`);
    }

    createCategories(data: object): Observable<object> {
        return this.http.post(`${url}/categories`, data);
    }

    editCategories(id: number, data: object): Observable<object> {
        return this.http.put(`${url}/categories/${id}`, data);
    }

    deleteCategories(id: number): Observable<object> {
        return this.http.delete(`${url}/categories/${id}`);
    }

    getAllCate(query: string = '', callback: Function) {
        this.getAllCategories(query).subscribe({
            next: (res: any) => {
                callback(false, res);
            },
            error: (err) => {
                console.log(err)
                callback(true, null);
            }
        });
    }

    getCateById(id: number, callback: Function) {
        this.getCategoryById(id).subscribe({
            next: (res: any) => {
                callback(false, res);
            },
            error: (err) => {
                console.log(err)
                callback(true, null);
            }
        });
    }

    getCateParent(callback: Function) {
        this.getCategoryParent().subscribe({
            next: (res: any) => {
                callback(false, res);
            },
            error: (err) => {
                console.log(err)
                callback(true, null);
            }
        });
    }

    getSearchCate(name: string, callback: Function) {
        this.getSearchCategoryByName(name).subscribe({
            next: (res: any) => {
                callback(false, res);
            },
            error: (err) => {
                console.log(err)
                callback(true, null);
            }
        });
    }

    public createCate(newData: any, callback: Function) {
        this.createCategories(newData).subscribe({
            next: (res) => {
                Swal.fire({
                    icon: 'success',
                    text: 'Thêm dữ liệu thành công!',
                    timer: 1000,
                    showCancelButton: false,
                    showConfirmButton: false,
                    position: 'center',
                    color: 'black',
                    customClass: 'swal-class2',
                    heightAuto: false,
                });
                callback(true, res);
            },
            error: (err) => {
                console.log(err);
                callback(false, err);
            }
        });
    }

    
    editCategory(id: number, newData: any, callback: Function) {
        this.editCategories(id, newData).subscribe({
            next: (res) => {
                Swal.fire({
                    icon: 'success',
                    text: 'Lưu thay đổi thành công!',
                    timer: 1000,
                    showCancelButton: false,
                    showConfirmButton: false,
                    position: 'center',
                    color: 'black',
                    customClass: 'swal-class2',
                    heightAuto: false,
                });
                callback(true, res);
            },
            error: (err) => {
                console.log(err);
                callback(false, err);
            }
        });
    }

    deleteCategory(id: number, callback: Function) {
        this.deleteCategories(id).subscribe({
            next: (res) => {
                Swal.fire({
                    icon: 'success',
                    text: 'Xóa thành công!',
                    timer: 1000,
                    showCancelButton: false,
                    showConfirmButton: false,
                    position: 'center',
                    color: 'black',
                    customClass: 'swal-class2',
                    heightAuto: false,
                });
                callback(true);
            },
            error: (err) => {
                console.log(err);
                callback(false);
            }
        });
    }

    public setLocalstorageQuery(obj: any, name: string = 'query') {
        localStorage.setItem(name, JSON.stringify(obj));
    }

    public getLocalstorageQuery(name: string = 'query') {
        return JSON.parse(localStorage.getItem(name) as string);
    }

    public renderOptions(categories: object[], text: string, id: number = -1, parent_id: number = -1): any {
        let result = `<option disabled selected >${text}</option>`;
        let array: any = [];
        categories.forEach((item1: any, index1: number) => {
            if (item1.parent_id === 0 && !array.some((item: any) => item === index1)) {
                result += `<option value="${item1.id}" class="${id === item1.id ? "d-none" : ""}" ${parent_id === item1.id ? "selected" : ""}>${item1.name}</option>`;
                array.push(index1);
                categories.forEach((item2: any, index2: number) => {
                    if (item2.parent_id === item1.id && !array.some((item: any) => item === index2)) {
                        result += `<option value="${item2.id}" class="${id === item2.id ? "d-none" : ""}" ${parent_id === item2.id ? "selected" : ""}>--${item2.name}</option>`;
                        array.push(index2);
                    }
                });
            }
        });
        return result;
    }

    public renderOptions2(array1: object[], array2: object[], text: string): any {
        let result = `<option disabled selected >${text}</option>`;
        const arr: any = [];
        array1.forEach((item1: any, index1: number) => {
            result += `<option disabled>${item1.name}</option>`;
            array2.forEach((item2: any, index2: number) => {
                if (Number(item2.category_id) == Number(item1.id) && !arr.some((item: any) => item === index2)) {
                    arr.push(index2);
                    result += `<option value="${item2.id}">- ${item2.name}</option>`;
                }
            });
        });
        return result;
    }

    public renderOptions3(categories: object[], text: string, id: number = -1, parent_id: number = -1): any {
        let result = `<option disabled selected>${text}</option>`;
        let array: any = [];
        categories.forEach((item1: any, index1: number) => {
            if (item1.parent_id === 0 && !array.some((item: any) => item === index1)) {
                result += `<option class="text-center text-dark" disabled >---------------${item1.name}---------------</option>`;
                array.push(index1);
                categories.forEach((item2: any, index2: number) => {
                    if (item2.parent_id === item1.id && !array.some((item: any) => item === index2)) {
                        result += `<option disabled>-&nbsp;${item2.name}</option>`;
                        array.push(index2);
                        categories.forEach((item3: any, index3: number) => {
                            if (item3.parent_id === item2.id && !array.some((item: any) => item === index3)) {
                                result += `<option value="${item3.id}" ${parent_id === item3.id ? "selected" : ""}>&nbsp;&nbsp;+&nbsp;${item3.name}</option>`;
                                array.push(index3);
                            }
                        });
                    }
                });
            }
        });
        return result;
    }
}
