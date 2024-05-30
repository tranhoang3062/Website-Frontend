import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { faEye, faHeart } from '@fortawesome/free-solid-svg-icons';
import { getService } from 'src/app/services/get-service.service';
import { ProductService } from 'src/app/services/product.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent {
    public faEye = faEye;
    public faHeart = faHeart;

    public dataProducts: any = [];
    public queryQ: any = '';
    public user: any = false;
    public itemsPage: any = 40;
    public p: any = 1;
    public dataQuickview: any = { resources: [] };
    public chooseObj: any = { select: '', price: '', sale_price: '' };
    public quantityElem = 1;

    public constructor(private titleService: Title, private activatedRoute: ActivatedRoute, private getService: getService, public productService: ProductService, public wishlistService: WishlistService, private router: Router) {
        this.titleService.setTitle('Tìm kiếm');
        $('html, body').animate({ scrollTop: 0 }, 0);

        this.activatedRoute.queryParamMap.subscribe(queries => {
            this.queryQ = queries.get('q');
            this.getService.getSearchProduct(this.queryQ, (err: boolean, data: any) => {
                this.dataProducts = data.map((item: any) => {
                    item.resources = JSON.parse(item.resources);
                    item.choose = item.choose !== '' ? JSON.parse(item.choose) : '';
                    return item;
                })
            })
        });
        const auth: any = localStorage.getItem('auth');
        this.user = auth ? JSON.parse(auth) : false;
    }

    onChoose(index: number) {
        this.chooseObj = this.dataQuickview.choose[index];
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

    public quickView(id: number) {
        this.quantityElem = 1;
        this.dataQuickview = this.dataProducts.find((item: any) => item.id === id);
        if (this.dataQuickview.choose !== '') {
            this.chooseObj = this.dataQuickview.choose[0];
        }
        this.productService.onImagesInQuickView(undefined, 'start');
        (document.querySelector('#small-img-roll') as HTMLImageElement).setAttribute('style', 'left: 0;');
    }

    public handlePaginate(page: number) {
        this.router.navigate(['/search'], { queryParams: { page: page }, queryParamsHandling: 'merge' });
    }
}
