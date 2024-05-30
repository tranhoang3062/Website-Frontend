import { Injectable } from '@angular/core';
import { CommonhttpsService } from './commonhttps.service';

@Injectable({
    providedIn: 'root'
})
export class getService {

    constructor(private http: CommonhttpsService) { }



    // brands


    // products
    getAllProducts(query: string = '', callback: Function) {
        this.http.getAllProducts(query).subscribe({
            next: (res: any) => {
                callback(false, res);
            },
            error: (err) => {
                console.log(err)
                callback(true, null);
            }
        });
    }

    getProductById(id: number, callback: Function) {
        this.http.getProductById(id).subscribe({
            next: (res: any) => {
                callback(false, res);
            },
            error: (err) => {
                console.log(err)
                callback(true, null);
            }
        });
    }

    getSearchProduct(name: string, callback: Function) {
        this.http.getSearchProductByName(name).subscribe({
            next: (res: any) => {
                callback(false, res);
            },
            error: (err) => {
                console.log(err)
                callback(true, null);
            }
        });
    }

    getProductFilter(query: string, callback: Function) {
        this.http.getProductFilter(query).subscribe({
            next: (res: any) => {
                callback(false, res);
            },
            error: (err) => {
                console.log(err)
                callback(true, null);
            }
        });
    }

    getProductRelated(slug: string, callback: Function) {
        this.http.getProductBySlugCategory(slug).subscribe({
            next: (res: any) => {
                callback(false, res);
            },
            error: (err) => {
                console.log(err)
                callback(true, null);
            }
        });
    }

    // news


    // wishlist
    getAllWishlist(query: string = '', callback: Function) {
        this.http.getAllWishlists(query).subscribe({
            next: (res: any) => {
                callback(false, res);
            },
            error: (err) => {
                console.log(err)
                callback(true, null);
            }
        });
    }

    getWishlistById(id: number, callback: Function) {
        this.http.getWishlistById(id).subscribe({
            next: (res: any) => {
                callback(false, res);
            },
            error: (err) => {
                console.log(err)
                callback(true, null);
            }
        });
    }

    getWishlistByUser(id: number, callback: Function) {
        this.http.getWishlistByUser(id).subscribe({
            next: (res: any) => {
                callback(false, res);
            },
            error: (err) => {
                console.log(err)
                callback(true, null);
            }
        });
    }

    getWishlistByProduct(product_id: number, callback: Function) {
        this.http.getWishlistByProduct(product_id).subscribe({
            next: (res: any) => {
                callback(false, res);
            },
            error: (err) => {
                console.log(err)
                callback(true, null);
            }
        });
    }


    // comments


}
