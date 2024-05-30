import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';

const url = environment.apiUrl;

@Injectable({
    providedIn: 'root'
})
export class CommonhttpsService {

    constructor(private http: HttpClient) { }

    // products
    getAllProducts(query: string = ''): Observable<object> {
        return this.http.get(`${url}/products` + query);
    }
    getProductById(id: number): Observable<object> {
        return this.http.get(`${url}/products/${id}`);
    }
    getSearchProductByName(name: string): Observable<object> {
        return this.http.get(`${url}/products/search/${name}`);
    }
    getProductFilter(query: string): Observable<object> {
        return this.http.get(`${url}/products/filter/query` + query);
    }
    getProductBySlugCategory(slug: string): Observable<object> {
        return this.http.get(`${url}/products/slug_category/` + slug);
    }
    getProductByCategory(category_id: number): Observable<object> {
        return this.http.get(`${url}/products/category/${category_id}`);
    }
    createProducts(data: object): Observable<object> {
        return this.http.post(`${url}/products`, data);
    }
    editProducts(id: number, data: object): Observable<object> {
        return this.http.put(`${url}/products/${id}`, data);
    }
    deleteProducts(id: number): Observable<object> {
        return this.http.delete(`${url}/products/${id}`);
    }

    // Wishlist
    getAllWishlists(query: string = ''): Observable<object> {
        return this.http.get(`${url}/wishlist` + query);
    }
    getWishlistById(id: number): Observable<object> {
        return this.http.get(`${url}/wishlist/${id}`);
    }
    getWishlistByUser(user_id: number): Observable<object> {
        return this.http.get(`${url}/wishlist/user/${user_id}`);
    }
    getWishlistByProduct(product_id: number): Observable<object> {
        return this.http.get(`${url}/wishlist/product/${product_id}`);
    }
    createWishlists(data: object): Observable<object> {
        return this.http.post(`${url}/wishlist`, data);
    }
    editWishlists(id: number, data: object): Observable<object> {
        return this.http.put(`${url}/wishlist/${id}`, data);
    }
    deleteWishlists(id: number): Observable<object> {
        return this.http.delete(`${url}/wishlist/${id}`);
    }

}
