import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    constructor() { }

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
