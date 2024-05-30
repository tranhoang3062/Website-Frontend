import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';
import Swal from 'sweetalert2';

const url = environment.apiUrl;

@Injectable({
    providedIn: 'root'
})
export class PetsService {

    constructor(
        private http: HttpClient
    ) {

    }

    // loại pet
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

    // list pet từng loại
    allPets(query: string = ''): Observable<object> {
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

    public createPetList(newData: any, callback: Function) {
        this.createPetlists(newData).subscribe({
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

    public createPet(newData: any, callback: Function) {
        this.createPets(newData).subscribe({
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

    // petlist
    getAllListPet(query: string = '', callback: Function) {
        this.getAllPetlists(query).subscribe({
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
        this.getSearchPetlistByName(name).subscribe({
            next: (res: any) => {
                callback(false, res);
            },
            error: (err) => {
                console.log(err)
                callback(true, null);
            }
        });
    }

    editPetlist(id: number, newData: any, callback: Function) {
        this.editPetlists(id, newData).subscribe({
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

    editPet(id: number, newData: any, callback: Function) {
        this.editPets(id, newData).subscribe({
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

    getAllPets(query: string = '', callback: Function) {
        this.allPets(query).subscribe({
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
        this.getSearchPetByName(name).subscribe({
            next: (res: any) => {
                callback(false, res);
            },
            error: (err) => {
                console.log(err)
                callback(true, null);
            }
        });
    }

    deletePetlist(id: number, callback: Function) {
        this.deletePetlists(id).subscribe({
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

    deletePet(id: number, callback: Function) {
        this.deletePets(id).subscribe({
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

}