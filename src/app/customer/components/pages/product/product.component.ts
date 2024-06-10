import { Component } from '@angular/core';
import { faAngleDown, faSearch, faXmark, faEye, faCartArrowDown, faHeart, faStar as faStarSolid, faFilter } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { Title } from '@angular/platform-browser';
import { LabelType, Options } from '@angular-slider/ngx-slider';
import { getService } from 'src/app/services/get-service.service';
import { ActivatedRoute, Router } from '@angular/router';

import "jqueryui";
import { ProductService } from 'src/app/services/product.service';
import { CategoryService } from 'src/app/services/category.service';
import { WishlistService } from 'src/app/services/wishlist.service';
import { BrandService } from 'src/app/services/brand.service';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.css']
})
export class ProductComponent {
    public faAngleDown = faAngleDown;
    public faSearch = faSearch;
    public faXmark = faXmark;
    public faEye = faEye;
    public faCartArrowDown = faCartArrowDown;
    public faHeart = faHeart;
    public faStarSolid = faStarSolid;
    public faStarRegular = faStarRegular;
    public faFilter = faFilter;

    public paramType: any = '';
    public cateType: any = [];
    public paramCate: any = '';
    public cateCate: any = [];
    public paramChild: any = '';
    public cateChild: any = [];
    public queryBrand: any = '';
    public queryPrice: any = '';

    public dataQuickview: any = { resources: [] };
    public chooseObj: any = { select: '', price: '', sale_price: '' };

    public quantityElem: number = 1;
    public dataCategories: any = [];
    public dataBrands: any = [];
    public listBrands: any = [];
    public dataProducts: any = [];
    public listProduct: any = [];
    public itemsPage: number = 12;
    public p: number = 1;

    public filterBrands: any[] = [];
    public valueSearch: string = '';
    public valueSelectSort: string = '';

    public user: any = false;
    public checkFilter = false;

    public handleEventFilter() {
        const boxFilter = document.querySelector('.box-left') as HTMLElement;
        const screenBlack = document.querySelector('.screen-black') as HTMLElement;
        if (!this.checkFilter) {
            boxFilter.classList.remove('off-filter');
            boxFilter.classList.add('on-filter');
            screenBlack.setAttribute('style', 'display: block !important');
        } else {
            boxFilter.classList.remove('on-filter');
            boxFilter.classList.add('off-filter');
            setTimeout(() => {
                screenBlack.setAttribute('style', '');
            }, 300);
        }
        this.checkFilter = !this.checkFilter;
    }

    public constructor(
        private titleService: Title,
        private getService: getService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        public productService: ProductService,
        private categoryService: CategoryService,
        public wishlistService: WishlistService,
        private brandService: BrandService
    ) {
        this.titleService.setTitle('Sản phẩm');
        const auth: any = localStorage.getItem('auth_cli');
        this.user = auth ? JSON.parse(auth) : false;
        // js
        $('html, body').animate({ scrollTop: 0 }, 0);
        $(document).ready(() => {
            $("#price-slider").slider({
                range: true,
                min: 1000,
                max: 10000000,
                step: 1,
                values: [1000, 10000000],
                slide: function (event, ui: any) {
                    $("#min-price").val(ui.values[0]);
                    $("#max-price").val(ui.values[1]);
                    $("#min-price-show").val(ui.values[0].toLocaleString('it-IT', { style: 'currency', currency: 'vnd' }));
                    $("#max-price-show").val(ui.values[1].toLocaleString('it-IT', { style: 'currency', currency: 'vnd' }));
                }
            });
            $("#min-price").val($("#price-slider").slider("values", 0));
            $("#max-price").val($("#price-slider").slider("values", 1));
            $("#min-price-show").val($("#price-slider").slider("values", 0).toLocaleString('it-IT', { style: 'currency', currency: 'vnd' }));
            $("#max-price-show").val($("#price-slider").slider("values", 1).toLocaleString('it-IT', { style: 'currency', currency: 'vnd' }));
        });

        this.activatedRoute.paramMap.subscribe(params => {
            this.paramType = params.get('type') || '';
            this.paramCate = params.get('cate') || '';
            this.paramChild = params.get('child') || '';
            this.activatedRoute.queryParamMap.subscribe(queries => {
                this.p = queries.get('page') ? Number(queries.get('page')) : 1;
                this.queryBrand = queries.get('brand') ? (queries.get('brand') as string).split('&') : '';
                if (queries.get('from') && queries.get('to')) {
                    this.queryPrice = { price: { from: queries.get('from'), to: queries.get('to') } };
                    this.handlePriceSlider(queries.get('from'), queries.get('to'));
                }

                this.categoryService.getAllCate(undefined, (err: boolean, data: any) => {
                    if (!err) {
                        const a = data.filter((item: any) => item.parent_id === 0).sort((a: any, b: any) => a.id - b.id);
                        this.dataCategories = a.map((item: any, index: number) => {
                            let array = data.filter((a: any) => a.parent_id === item.id).sort((a: any, b: any) => a.id - b.id);
                            array = array.map((item1: any) => {
                                const child = data.filter((a: any) => a.parent_id === item1.id).sort((a: any, b: any) => a.id - b.id);
                                return { ...item1, child };
                            })
                            return { ...item, array }
                        });
                        this.cateType = this.paramType !== '' && this.dataCategories.find((item: any) => item.slug === this.paramType);
                        this.cateCate = this.paramCate !== '' && this.cateType.array.find((item: any) => item.slug === this.paramCate);
                        this.cateChild = this.paramChild !== '' && this.cateCate.child.find((item: any) => item.slug === this.paramChild);

                        let query = '';
                        query += `?category=${this.paramType !== '' ? `{"slug":"${this.paramType}"}` : ''}`;
                        query += `&category1=${this.paramCate !== '' ? `{"slug":"${this.paramCate}"}` : ''}`;
                        query += `&category2=${this.paramChild !== '' ? `{"slug":"${this.paramChild}"}` : ''}`;
                        query += `&brand=${JSON.stringify(this.queryBrand)}`;
                        query += `&product=${JSON.stringify(this.queryPrice)}`;
                        this.getService.getProductFilter(query, (err: boolean, dataPr: any) => {
                            if (!err) {
                                this.listProduct = dataPr.map((item: any) => {
                                    const evaluate: number = Math.ceil(item.totalEvaluate / item.totalCmt);
                                    item.resources = JSON.parse(item.resources);
                                    item.choose = item.choose !== '' ? JSON.parse(item.choose) : '';
                                    return { ...item, evaluate: isNaN(evaluate) ? 0 : evaluate };
                                });
                            }
                        });
                        this.brandService.getAllBrands(undefined, (err: boolean, data: any) => {
                            if (!err) {
                                this.dataBrands = data;
                                this.listBrands = data;
                                this.filterBrands = [];
                                if (this.queryBrand !== '') {
                                    this.queryBrand.forEach((item: any) => {
                                        const a = this.dataBrands.find((elem: any) => elem.id == item);
                                        this.filterBrands.push({ id: a.id, name: a.name });
                                    });
                                }
                            }
                        });
                    }
                });
            });
        });
    }

    public handlePaginate(page: number) {
        this.router.navigate(['/san-pham/' + this.paramType + '/' + this.paramCate + '/' + this.paramChild], { queryParams: { page: page }, queryParamsHandling: 'merge' });
        this.categoryService.setLocalstorageQuery({ page: page }, 'queryCustomer');
    }

    public isChecked(id: number) {
        return this.filterBrands.some((item: any) => item.id === id);
    }

    public handleQueryBrand() {
        const arr = this.filterBrands.map((item: any) => item.id).join('&');
        this.router.navigate(['/san-pham/' + this.paramType + '/' + this.paramCate + '/' + this.paramChild], { queryParams: { brand: arr }, queryParamsHandling: 'merge' });
        // this.categoryService.setLocalstorageQuery({page: this.p}, 'queryCustomer');
    }

    public handleBrand(elem: any, event: any) {
        if (event === 'reset') {
            this.filterBrands = [];
        } else if (event === 'add') {
            const check = this.filterBrands.some((item: any) => item.id === elem.id);
            if (check) this.filterBrands = this.filterBrands.filter((item: any) => item.id !== elem.id);
            else this.filterBrands.push({ id: elem.id, name: elem.name });
        } else if (event === 'remove') {
            this.filterBrands.splice(elem, 1);
        }
        if (event === 'search') {
            if (elem.target.value.trim() === '') this.listBrands = this.dataBrands;
            else this.listBrands = this.dataBrands.filter((item: any) => (item.name as string).toLocaleLowerCase().indexOf((elem.target.value as string).toLocaleLowerCase().trim()) !== -1);
        } else this.handleQueryBrand();
    }

    public handlePriceSlider(min: any, max: any) {
        $(document).ready(() => {
            $("#price-slider").slider('values', [min, max]);
        });
    }

    public quickView(id: number) {
        this.quantityElem = 1;
        this.dataQuickview = this.listProduct.find((item: any) => item.id === id);
        if (this.dataQuickview.choose !== '') {
            this.chooseObj = this.dataQuickview.choose[0];
        }
        this.productService.onImagesInQuickView(undefined, 'start');
        (document.querySelector('#small-img-roll') as HTMLImageElement).setAttribute('style', 'left: 0;');
    }

    public onChoose(index: number) {
        this.chooseObj = this.dataQuickview.choose[index];
    }

    public handleRouteLink() {
        this.p = 1;
        this.categoryService.setLocalstorageQuery({}, 'queryCustomer');
    }

    public onFilterPrice() {
        const minPriceElem = document.querySelector('#min-price') as HTMLInputElement;
        const maxPriceElem = document.querySelector('#max-price') as HTMLInputElement;
        this.router.navigate(['/san-pham/' + this.paramType + '/' + this.paramCate + '/' + this.paramChild], { queryParams: { from: Number(minPriceElem.value), to: Number(maxPriceElem.value) }, queryParamsHandling: 'merge' });
    }

    public handleSort() {
        switch (this.valueSelectSort) {
            case '0':
                this.listProduct = this.listProduct.sort((a: any, b: any) => a.name === b.name ? 0 : a.name > b.name ? 1 : -1);
                break;
            case '1':
                this.listProduct = this.listProduct.sort((a: any, b: any) => a.name === b.name ? 0 : b.name > a.name ? 1 : -1);
                break;
            case '2':
                this.listProduct = this.listProduct.sort((a: any, b: any) => a.price - b.price || a.sale_price - b.sale_price);
                break;
            case '3':
                this.listProduct = this.listProduct.sort((a: any, b: any) => b.price - a.price || b.sale_price - a.sale_price);
                break;
            case '4':
                this.listProduct = this.listProduct.sort((a: any, b: any) => a.id - b.id);
                break;
            case '5':
                this.listProduct = this.listProduct.sort((a: any, b: any) => b.id - a.id);
                break;
            default:
                break;
        }
    }

    public hanldeQuantityPrice(key: boolean) {
        if (!key && this.quantityElem > 1) this.quantityElem -= 1;
        else if (key) this.quantityElem += 1;
    }

    public handleOnCart() {
        const choose = this.chooseObj.select !== '' ? JSON.stringify(this.chooseObj) : false;
        const total_price: number = choose
            ? (
                this.chooseObj.sale_price > 0
                    ? this.quantityElem * Number(this.chooseObj.sale_price)
                    : this.quantityElem * Number(this.chooseObj.price)
            )
            : (
                this.dataQuickview.sale_price > 0
                    ? this.quantityElem * Number(this.dataQuickview.sale_price)
                    : this.quantityElem * Number(this.dataQuickview.price)
            );
        let obj: any = {
            quantity: this.quantityElem,
            total_price: total_price,
            choose: this.dataQuickview.choose !== '' ? JSON.stringify(this.dataQuickview.choose[0]) : ''
        }
        if (choose) obj = { ...obj, choose: choose };
        this.productService.onOrder(this.dataQuickview, obj);
    }

    public renderArr(nb: number) {
        let arr: any = [];
        for (let i = 0; i < nb; i++) {
            arr.push(i);
        }
        return arr;
    }

}
