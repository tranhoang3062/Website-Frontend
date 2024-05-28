import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const url = 'http://localhost:8000/api';

@Injectable({
    providedIn: 'root'
})
export class CommonhttpsService {

    constructor(private http: HttpClient) { }

    // users
    getAllUser(query: string = ''): Observable<object> {
        return this.http.get(`${url}/user` + query);
    }
    getUserById(id: number): Observable<object> {
        return this.http.get(`${url}/user/${id}`);
    }
    createUser(data: object): Observable<object> {
        return this.http.post(`${url}/user/register`, data);
    }
    loginUser(data: object): Observable<object> {
        return this.http.post(`${url}/user/login`, data);
    }
    editUser(id: number, data: object): Observable<object> {
        return this.http.put(`${url}/user/${id}`, data);
    }
    deleteUser(id: number): Observable<object> {
        return this.http.delete(`${url}/user/${id}`);
    }

    // categories
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

    // petlist
    getAllPetlists(query: string = ''): Observable<object> {
        return this.http.get(`${url}/petlists` + query);
    }
    getPetlistById(id: number): Observable<object> {
        return this.http.get(`${url}/petlists/${id}`);
    }
    getSearchPetlistByName(name: string): Observable<object> {
        return this.http.get(`${url}/petlists/search/${name}`);
    }
    createPetlists(data: object): Observable<object> {
        return this.http.post(`${url}/petlists`, data);
    }
    editPetlists(id: number, data: object): Observable<object> {
        return this.http.put(`${url}/petlists/${id}`, data);
    }
    deletePetlists(id: number): Observable<object> {
        return this.http.delete(`${url}/petlists/${id}`);
    }

    // pets
    getAllPets(query: string = ''): Observable<object> {
        return this.http.get(`${url}/pets` + query);
    }
    getPetById(id: number): Observable<object> {
        return this.http.get(`${url}/pets/${id}`);
    }
    getSearchPetByName(name: string): Observable<object> {
        return this.http.get(`${url}/pets/search/${name}`);
    }
    getPetByPetList(pet_list_id: number): Observable<object> {
        return this.http.get(`${url}/pets/petlist/${pet_list_id}`);
    }
    createPets(data: object): Observable<object> {
        return this.http.post(`${url}/pets`, data);
    }
    editPets(id: number, data: object): Observable<object> {
        return this.http.put(`${url}/pets/${id}`, data);
    }
    deletePets(id: number): Observable<object> {
        return this.http.delete(`${url}/pets/${id}`);
    }

    // brands
    getAllBrands(query: string = ''): Observable<object> {
        return this.http.get(`${url}/brands` + query);
    }
    getBrandById(id: number): Observable<object> {
        return this.http.get(`${url}/brands/${id}`);
    }
    getSearchBrandByName(name: string): Observable<object> {
        return this.http.get(`${url}/brands/search/${name}`);
    }
    createBrands(data: object): Observable<object> {
        return this.http.post(`${url}/brands`, data);
    }
    editBrands(id: number, data: object): Observable<object> {
        return this.http.put(`${url}/brands/${id}`, data);
    }
    deleteBrands(id: number): Observable<object> {
        return this.http.delete(`${url}/brands/${id}`);
    }

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

    // Orders
    getAllOrders(query: string = ''): Observable<object> {
        return this.http.get(`${url}/orders` + query);
    }
    getOrderById(id: number): Observable<object> {
        return this.http.get(`${url}/orders/${id}`);
    }
    getOrderByUser(user_id: number): Observable<object> {
        return this.http.get(`${url}/orders/user/${user_id}`);
    }
    createOrders(data: object): Observable<object> {
        return this.http.post(`${url}/orders`, data);
    }
    editOrders(id: number, data: object): Observable<object> {
        return this.http.put(`${url}/orders/${id}`, data);
    }
    deleteOrders(id: number): Observable<object> {
        return this.http.delete(`${url}/orders/${id}`);
    }

    // Order detail
    getAllOrderDetail(query: string = ''): Observable<object> {
        return this.http.get(`${url}/order-detail` + query);
    }
    getOrderDetailByOrder(order_id: number): Observable<object> {
        return this.http.get(`${url}/order-detail/order/${order_id}`);
    }
    getOrderDetailByUser(user_id: number): Observable<object> {
        return this.http.get(`${url}/order-detail/user/${user_id}`);
    }
    createOrderDetail(data: object): Observable<object> {
        return this.http.post(`${url}/order-detail`, data);
    }
    editOrderDetail(id: number, data: object): Observable<object> {
        return this.http.put(`${url}/order-detail/${id}`, data);
    }
    deleteOrderDetail(id: number): Observable<object> {
        return this.http.delete(`${url}/order-detail/${id}`);
    }
    deleteOrderDetailByOrderId(order_id: number): Observable<object> {
        return this.http.delete(`${url}/order-detail/order/${order_id}`);
    }

    // comment
    getAllComments(query: string = ''): Observable<object> {
        return this.http.get(`${url}/comments` + query);
    }
    getCommentById(id: number): Observable<object> {
        return this.http.get(`${url}/comments/${id}`);
    }
    getCommentByUser(user_id: number): Observable<object> {
        return this.http.get(`${url}/comments/user/${user_id}`);
    }
    getCommentByProduct(product_id: number): Observable<object> {
        return this.http.get(`${url}/comments/product/${product_id}`);
    }
    createComments(data: object): Observable<object> {
        return this.http.post(`${url}/comments`, data);
    }
    editComments(id: number, data: object): Observable<object> {
        return this.http.put(`${url}/comments/${id}`, data);
    }
    deleteComments(id: number): Observable<object> {
        return this.http.delete(`${url}/comments/${id}`);
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

    // Newspage
    getAllNewspages(query: string = ''): Observable<object> {
        return this.http.get(`${url}/newspages` + query);
    }
    getNewspageById(id: number): Observable<object> {
        return this.http.get(`${url}/newspages/${id}`);
    }
    getSearchNewsByTitle(title: string): Observable<object> {
        return this.http.get(`${url}/newspages/search/${title}`);
    }
    createNewspages(data: object): Observable<object> {
        return this.http.post(`${url}/newspages`, data);
    }
    editNewspages(id: number, data: object): Observable<object> {
        return this.http.put(`${url}/newspages/${id}`, data);
    }
    deleteNewspages(id: number): Observable<object> {
        return this.http.delete(`${url}/newspages/${id}`);
    }
}
