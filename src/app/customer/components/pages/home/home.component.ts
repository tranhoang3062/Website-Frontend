import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { faEye, faCartArrowDown, faHeart, faArrowRight, faClock, faCheck } from '@fortawesome/free-solid-svg-icons';
import { Title } from '@angular/platform-browser';
// import 'src/assets/plugin/Product-Gallery-Image-Zoom/scripts/main.js';
import { getService } from 'src/app/services/get-service.service';
import { ProductService } from 'src/app/services/product.service';
import { WishlistService } from 'src/app/services/wishlist.service';
import { CategoryService } from 'src/app/services/category.service';
import { BrandService } from 'src/app/services/brand.service';
import { NewsService } from 'src/app/services/news.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {
    customOptions: OwlOptions = {
        loop: false,
        mouseDrag: true,
        touchDrag: false,
        pullDrag: false,
        dots: false,
        navSpeed: 700,
        navText: ['<i class="fa-solid fa-angle-left"></i>', '<i class="fa-solid fa-angle-right"></i>'],
        responsive: {
            320: {
                items: 1,
            },
            425: {
                items: 2,
            },
            768: {
                items: 3,
            },
            1024: {
                items: 4,
            }
        },
        nav: true,
        margin: 10
    }
    customOptions2: OwlOptions = {
        loop: true,
        mouseDrag: true,
        touchDrag: false,
        pullDrag: false,
        dots: false,
        navSpeed: 700,
        navText: ['<i class="fa-solid fa-angle-left"></i>', '<i class="fa-solid fa-angle-right"></i>'],
        responsive: {
            425: {
                items: 1,
            },
            768: {
                items: 2,
            },
            1024: {
                items: 3,
            }
        },
        nav: true,
        margin: 10
    }
    customOptions3: OwlOptions = {
        loop: true,
        autoplay: true,
        autoplaySpeed: 200,
        mouseDrag: true,
        touchDrag: false,
        pullDrag: false,
        dots: false,
        navSpeed: 700,
        navText: ['<i class="fa-solid fa-angle-left"></i>', '<i class="fa-solid fa-angle-right"></i>'],
        responsive: {
            320: {
                items: 2,
            },
            425: {
                items: 3,
            },
            768: {
                items: 4,
            },
            1024: {
                items: 5,
            }
        },
        nav: false,
        margin: 40
    }

    public faEye = faEye;
    public faHeart = faHeart;
    public faCartArrowDown = faCartArrowDown;
    public faArrowRight = faArrowRight;
    public faClock = faClock;
    public faCheck = faCheck;

    public user: any = false;
    public quantityElem = 1;
    public dataQuickview: any = { resources: [] };
    public dataImages = '';

    public dataProducts: any = [];
    public dataBrands: any = [];
    public dataNewspage: any = [];
    public dataProductOutstand: any = [];
    public boxThreeData: any = [];
    public boxThreeDataProduct: any = [];
    public boxFourDataProduct: any = [];
    public itemsPage: any = 8;
    public p: any = 1;
    public chooseObj: any = { select: '', price: '', sale_price: '' };

    public constructor(
        private titleService: Title, 
        public productService: ProductService, 
        private getService: getService, 
        public wishlistService: WishlistService,
        private categoryService: CategoryService,
        private brandService: BrandService,
        private newsService: NewsService
    ) {
        this.titleService.setTitle('Trang chủ');
        this.categoryService.getAllCate(undefined, (err: boolean, data: any) => {
            if (!err) {
                const listPet = data.filter((item: any) => item.parent_id === 0);
                const listCateChild = data.filter((item: any) => {
                    return listPet.some((elem: any) => elem.id === item.parent_id);
                }).sort((a: any, b: any) => a.id - b.id);
                listCateChild.forEach((item: any, index: number) => {
                    if (!this.boxThreeData.some((item1: any) => item1.name === item.name)) {
                        this.boxThreeData.push({ name: item.name, listId: [item.id] });
                    } else {
                        this.boxThreeData.forEach((item1: any) => {
                            if (item1.name === item.name) {
                                item1.listId.push(item.id);
                            }
                        });
                    }
                });
                this.getService.getAllProducts(undefined, (err: boolean, data1: any) => {
                    if (!err) {
                        this.dataProducts = data1.map((item: any) => {
                            item.resources = JSON.parse(item.resources);
                            item.choose = item.choose !== '' ? JSON.parse(item.choose) : '';
                            return item;
                        });
                        this.dataProductOutstand = this.dataProducts.filter((item: any) => item.star === 1);
                        this.boxThreeDataProduct = this.dataProducts.filter((item: any) => this.boxThreeData[0].listId.some((a: any) => a == item.cate1Id));
                        this.boxFourDataProduct = [...this.dataProducts].sort((a: any, b: any) => a.created_at - b.created_at).filter((item: any, index: number) => index < 12);
                    }
                });
            }
        });
        this.newsService.getAllNews(undefined, (err: boolean, data: any) => {
            if (!err) {
                this.dataNewspage = data.map((item: any) => {
                    item.content = item.content.replace(/h1>|h2>|h3>|h4>|h5>|span/g, 'p>');
                    item.content = item.content.replace(/<p/g, '<p class="d-inline"');
                    item.content = item.content.slice(item.content.indexOf('</p>') + 4,);
                    item.content = item.content.slice(item.content.indexOf('</p>') + 4,);
                    // item.content = item.content.replace('<p', '<p class="d-none"');
                    // item.content = item.content.replace('<p', '<p class="d-none"', 10);
                    return item;
                });
            }
        });
        this.brandService.getAllBrands(undefined, (err: boolean, data: any) => {
            if (!err) {
                this.dataBrands = data;
            }
        });
        const auth: any = localStorage.getItem('auth_cli');
        this.user = auth ? JSON.parse(auth) : false;
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

    public handleEventBoxContentThree(data: any) {
        this.boxThreeDataProduct = this.dataProducts.filter((item: any) => data.listId.some((a: any) => a == item.cate1Id));
    }

    public onChoose(index: number) {
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

}

