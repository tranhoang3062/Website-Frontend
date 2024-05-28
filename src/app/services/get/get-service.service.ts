import { Injectable } from '@angular/core';
import { CommonhttpsService } from '../https/commonhttps.service';

@Injectable({
    providedIn: 'root'
})
export class getService {

    constructor(private http: CommonhttpsService) { }
    // user
    getAllUser(query: string = '', callback: Function) {
        this.http.getAllUser(query).subscribe({
            next: (res: any) => {
                callback(false, res);
            },
            error: (err) => {
                console.log(err)
                callback(true, null);
            }
        });
    }

    getUserById(id: number, callback: Function) {
        this.http.getUserById(id).subscribe({
            next: (res: any) => {
                callback(false, res);
            },
            error: (err) => {
                console.log(err)
                callback(true, null);
            }
        });
    }

    // category
    getAllCate(query: string = '', callback: Function) {
        this.http.getAllCategories(query).subscribe({
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
        this.http.getCategoryById(id).subscribe({
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
        this.http.getCategoryParent().subscribe({
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
        this.http.getSearchCategoryByName(name).subscribe({
            next: (res: any) => {
                callback(false, res);
            },
            error: (err) => {
                console.log(err)
                callback(true, null);
            }
        });
    }

    // petlist
    getAllListPet(query: string = '', callback: Function) {
        this.http.getAllPetlists(query).subscribe({
            next: (res: any) => {
                callback(false, res);
            },
            error: (err) => {
                console.log(err)
                callback(true, null);
            }
        });
    }

    getSearchPetlist(name: string, callback: Function) {
        this.http.getSearchPetlistByName(name).subscribe({
            next: (res: any) => {
                callback(false, res);
            },
            error: (err) => {
                console.log(err)
                callback(true, null);
            }
        });
    }

    // pets
    getAllPets(query: string = '', callback: Function) {
        this.http.getAllPets(query).subscribe({
            next: (res: any) => {
                callback(false, res);
            },
            error: (err) => {
                console.log(err)
                callback(true, null);
            }
        });
    }

    getSearchPet(name: string, callback: Function) {
        this.http.getSearchPetByName(name).subscribe({
            next: (res: any) => {
                callback(false, res);
            },
            error: (err) => {
                console.log(err)
                callback(true, null);
            }
        });
    }

    // brands
    getAllBrands(query: string = '', callback: Function) {
        this.http.getAllBrands(query).subscribe({
            next: (res: any) => {
                callback(false, res);
            },
            error: (err) => {
                console.log(err);
                callback(true, null);
            }
        });
    }

    getSearchBrand(name: string, callback: Function) {
        this.http.getSearchBrandByName(name).subscribe({
            next: (res: any) => {
                callback(false, res);
            },
            error: (err) => {
                console.log(err)
                callback(true, null);
            }
        });
    }

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
    getAllNews(query: string = '', callback: Function) {
        this.http.getAllNewspages(query).subscribe({
            next: (res: any) => {
                callback(false, res);
            },
            error: (err) => {
                console.log(err)
                callback(true, null);
            }
        });
    }

    getSearchNews(title: string, callback: Function) {
        this.http.getSearchNewsByTitle(title).subscribe({
            next: (res: any) => {
                callback(false, res);
            },
            error: (err) => {
                console.log(err)
                callback(true, null);
            }
        });
    }

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

    // order
    getAllOrder(query: string = '', callback: Function) {
        this.http.getAllOrders(query).subscribe({
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
        this.http.getOrderById(id).subscribe({
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
        this.http.getOrderByUser(id).subscribe({
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
        this.http.getAllOrderDetail(query).subscribe({
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
        this.http.getOrderDetailByOrder(order_id).subscribe({
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
        this.http.getOrderDetailByUser(user_id).subscribe({
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
    getAllComment(query: string = '', callback: Function) {
        this.http.getAllComments(query).subscribe({
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
        this.http.getCommentById(id).subscribe({
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
        this.http.getCommentByUser(id).subscribe({
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
        this.http.getCommentByProduct(product_id).subscribe({
            next: (res: any) => {
                callback(false, res);
            },
            error: (err) => {
                console.log(err)
                callback(true, null);
            }
        });
    }

}
