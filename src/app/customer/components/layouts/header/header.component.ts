import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faSearch, faUser, faBagShopping, faPaw, faSortDown, faAngleDown, faCaretRight, faTrash, faXmark, faBars, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { CategoryService } from 'src/app/services/category.service';
import { getService } from 'src/app/services/get-service.service';
import { PetsService } from 'src/app/services/pets.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    public faSearch = faSearch;
    public faUser = faUser;
    public faBagShopping = faBagShopping;
    public faCartShopping = faCartShopping;
    public faPaw = faPaw;
    public faSortDown = faSortDown;
    public faAngleDown = faAngleDown;
    public faCaretRight = faCaretRight;
    public faTrash = faTrash;
    public faXmark = faXmark;
    public faBars = faBars;

    public onSearch = false;
    public valueSearch = '';
    public dataPets: any = [];
    public dataProducts: any = [];
    public dataCarts: any = [];
    public user: any = false;
    public href: any = window.location.pathname;

    public constructor(
        private getService: getService,
        private router: Router,
        public productService: ProductService,
        private categoryService: CategoryService,
        private petService: PetsService
    ) {
        if (localStorage.getItem('auth') && localStorage.getItem('token')) {
            const auth: any = localStorage.getItem('auth');
            this.user = JSON.parse(auth);
        } else this.user = false;
        

        this.categoryService.getAllCate(undefined, (err: boolean, data: any) => {
            if (!err) {
                const a = data.filter((item: any) => item.parent_id === 0).sort((a: any, b: any) => a.id - b.id);
                this.petService.getAllListPet(undefined, (err: boolean, data: any) => {
                    if (!err) {
                        this.dataPets = a.map((item: any, index: number) => {
                            const array = data.filter((a: any) => a.category_id === item.id);
                            return { ...item, array }
                        }).sort((a: any, b: any) => a.id - b.id);
                    }
                });
                this.dataProducts = a.map((item: any, index: number) => {
                    let array = data.filter((a: any) => a.parent_id === item.id).sort((a: any, b: any) => a.id - b.id);
                    array = array.map((item1: any) => {
                        const child = data.filter((a: any) => a.parent_id === item1.id).sort((a: any, b: any) => a.id - b.id);
                        return { ...item1, child };
                    })
                    return { ...item, array }
                });
                this.productService.currentData.subscribe((dataOrderDetail: any) => {
                    this.dataCarts = dataOrderDetail.map((item: any) => {
                        const resources = JSON.parse(item.resourcesProduct)
                        const choose = item.choose !== '' && item.choose ? JSON.parse(item.choose) : '';
                        return { ...item, choose: choose, resourcesProduct: resources };
                    });
                });
            }
        });
    }

    public restartHref(value: any) {
        this.href = value;
    }

    public handleEventClickSearch() {
        this.valueSearch = '';
        this.onSearch = !this.onSearch;
    }

    public handleEventMenuResponsive(check: boolean) {
        this.valueSearch = '';
        const btnBars = document.querySelector('.menu-responsive>div') as HTMLElement;
        const boxMenu = document.querySelector('.menu-responsive') as HTMLElement;
        const menuElem = document.querySelector('.menu-responsive>div:first-child') as HTMLElement;
        if (check) {
            boxMenu.style.display = 'block';
            menuElem.classList.remove('offMenu');
            menuElem.classList.add('onMenu');
        } else {
            menuElem.classList.remove('onMenu');
            menuElem.classList.add('offMenu');
            setTimeout(() => {
                boxMenu.style.display = 'none';
            }, 300);
        }
    }

    public generateArray(array: [], nb: number) {
        const len = Math.ceil(array.length / nb);
        const result = [];
        for (let i = 0; i < len; i++) {
            result.push(i);
        }
        return result;
    }

    public handleSearch(check: boolean) {
        this.router.navigate(['/search'], { queryParams: { q: this.valueSearch } });
        if (check) this.onSearch = !this.onSearch;
        else {
            const boxMenu = document.querySelector('.menu-responsive') as HTMLElement;
            const menuElem = document.querySelector('.menu-responsive>div:first-child') as HTMLElement;
            menuElem.classList.remove('onMenu');
            menuElem.classList.add('offMenu');
            setTimeout(() => {
                boxMenu.style.display = 'none';
            }, 300);
        }
    }

    public logout() {
        localStorage.removeItem('auth');
        localStorage.removeItem('token');
        localStorage.clear();
        this.user = false;
        window.location.href = '/login';
    }
}
