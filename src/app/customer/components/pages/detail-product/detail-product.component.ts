import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
// import 'src/assets/plugin/Product-Gallery-Image-Zoom/scripts/main.js';
import { faBagShopping, faEye, faCartArrowDown, faHeart, faStar, faPhotoVideo, faChevronLeft, faChevronRight, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRe, faStar as faStarRe } from '@fortawesome/free-regular-svg-icons';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { getService } from 'src/app/services/get-service.service';
import { ProductService } from 'src/app/services/product.service';
import { WishlistService } from 'src/app/services/wishlist.service';
import { FormBuilder, Validators } from '@angular/forms';
import { CreateService } from 'src/app/services/create-service.service';
import Swal from 'sweetalert2';
import { EditService } from 'src/app/services/edit-service.service';
import { CategoryService } from 'src/app/services/category.service';
import { CommentService } from 'src/app/services/comment.service';

@Component({
    selector: 'app-detail-product',
    templateUrl: './detail-product.component.html',
    styleUrls: ['./detail-product.component.css']
})

export class DetailProductComponent {
    customOptions: OwlOptions = {
        loop: false,
        mouseDrag: true,
        touchDrag: false,
        pullDrag: false,
        dots: false,
        navSpeed: 700,
        items: 1,
        navText: ['<i class="fa-solid fa-angle-left"></i>', '<i class="fa-solid fa-angle-right"></i>'],
        nav: true,
        margin: 10
    }

    public faBagShopping = faBagShopping;
    public faCartShopping = faCartShopping;
    public faEye = faEye;
    public faCartArrowDown = faCartArrowDown;
    public faHeart = faHeart;
    public faHeartRe = faHeartRe;
    public faStar = faStar;
    public faStarRe = faStarRe;
    public faPhotoVideo = faPhotoVideo;
    public faChevronLeft = faChevronLeft;
    public faChevronRight = faChevronRight;

    public paramType: any = '';
    public paramCate: any = '';
    public paramChild: any = '';
    public paramName: any = '';
    public cateChild: any = {};

    public product: any = {};
    public relatedProducts: any = [];
    public commentProducts: any = [];
    public countWishlist: any = [];
    public quantityElem: any = 1;
    public quantityQvElem: any = 1;
    public chooseObj: any = { select: '', price: '', sale_price: '' };
    public chooseObjQv: any = { select: '', price: '', sale_price: '' };
    public dataQuickview: any = { resources: [] };
    public itemsPage: any = 8;
    public p: any = 1;
    public user: any = false;
    public files: any = [];
    public urlImg: any = [];
    public yourComment: any = false;
    public valueEvaluate: number = 0;
    public totalCmt: number = 0;

    public dataForm = this.fb.group({
        "content": ["", [Validators.required]],
        "evaluate": ["", [Validators.required]],
    })

    public constructor(
        private titleService: Title,
        private getService: getService,
        private activatedRoute: ActivatedRoute,
        public productService: ProductService,
        public wishlistService: WishlistService,
        private fb: FormBuilder,
        private router: Router,
        private categoryService: CategoryService,
        private commentService: CommentService
    ) {
        this.titleService.setTitle('Sản phẩm');
        const auth: any = localStorage.getItem('auth');
        this.user = auth ? JSON.parse(auth) : false;

        this.activatedRoute.paramMap.subscribe(params => {
            $('html, body').animate({ scrollTop: 0 }, 0);
            this.paramType = params.get('type') || '';
            this.paramCate = params.get('cate') || '';
            this.paramChild = params.get('child') || '';
            this.paramName = params.get('name') || '';

            this.categoryService.getAllCate(undefined, (err: boolean, data: any) => {
                if (!err) {
                    this.cateChild = data.find((item: any) => item.slug === this.paramChild);
                    this.getService.getProductRelated(this.paramChild, (err: boolean, data1: any) => {
                        if (!err) {
                            this.relatedProducts = data1.map((item: any) => {
                                const cateChild = data.find((a: any) => a.id == item.category_id);
                                const cateParent = data.find((a: any) => a.id == cateChild.parent_id);
                                const pet = data.find((a: any) => a.id == cateParent.parent_id);
                                item.resources = JSON.parse(item.resources);
                                item.choose = item.choose !== '' ? JSON.parse(item.choose) : '';
                                return { ...item, pet, cateParent, cateChild };
                            });
                        }
                    });
                }
            });
            this.getService.getAllProducts('?slug=' + this.paramName, (err: boolean, data: any) => {
                if (!err) {
                    if (data[0]) {
                        this.product = { ...data[0], resources: JSON.parse(data[0].resources) };
                        this.product.choose = this.product.choose !== '' ? JSON.parse(this.product.choose) : '';
                        this.chooseObj = this.product.choose !== '' ? this.product.choose[0] : { select: '', price: '', sale_price: '' };
                        this.getService.getWishlistByProduct(this.product.id, (err: boolean, data: any) => {
                            if (!err) {
                                this.countWishlist = data.length;
                            }
                        });
                        this.valueEvaluate = Math.ceil(this.product.totalEvaluate / this.product.totalCmt);
                        this.totalCmt = this.product.totalCmt
                        this.commentService.getCommentByProduct(this.product.id, (err: boolean, data: any) => {
                            if (!err) {
                                this.commentProducts = data.map((item: any) => {
                                    const resources = item.resources !== '' && item.resources ? JSON.parse(item.resources) : '';
                                    return { ...item, resources: resources };
                                });
                                this.yourComment = this.commentProducts.find((item: any) => item.user_id == this.user.id && item.product_id == this.product.id) || false;
                                this.dataForm.controls.content.setValue(this.yourComment.content);
                                this.dataForm.controls.evaluate.setValue(this.yourComment.evaluate + '');
                                this.urlImg = this.yourComment.resources;
                            }
                        });
                    }
                }
            });
        });
    }

    get f() {
        return this.dataForm.controls;
    }

    public onChoose(index: any, key: boolean) {
        if (key) this.chooseObj = this.product.choose[index];
        else this.chooseObjQv = this.dataQuickview.choose[index];
    }

    public quickView(id: number) {
        this.quantityQvElem = 1;
        this.dataQuickview = this.relatedProducts.find((item: any) => item.id === id);
        if (this.dataQuickview.choose !== '') {
            this.chooseObjQv = this.dataQuickview.choose[0];
        }
        this.productService.onImagesInQuickView(undefined, 'start');
        (document.querySelector('#small-img-roll') as HTMLImageElement).setAttribute('style', 'left: 0;');
    }

    public handleQuantityPrice(event: string, key: boolean) {
        if (key) {
            if (event == 'plus') this.quantityElem += 1;
            else if (this.quantityElem > 1) this.quantityElem -= 1;
        } else {
            if (event == 'plus') this.quantityQvElem += 1;
            else if (this.quantityQvElem > 1) this.quantityQvElem -= 1;
        }
    }

    public handleOnCart(check: boolean, check2: boolean = false) {
        const chooseObj: any = check ? this.chooseObj : this.chooseObjQv;
        const quantity: number = check ? this.quantityElem : this.quantityQvElem;
        const product: any = check ? this.product : this.dataQuickview;

        const choose = chooseObj.select !== '' ? JSON.stringify(chooseObj) : false;
        const total_price: number = choose
            ? (
                chooseObj.sale_price > 0
                    ? quantity * Number(chooseObj.sale_price)
                    : quantity * Number(chooseObj.price)
            )
            : (
                product.sale_price > 0
                    ? quantity * Number(product.sale_price)
                    : quantity * Number(product.price)
            );
        let obj: any = {
            quantity: quantity,
            total_price: total_price,
            choose: product.choose !== '' ? JSON.stringify(product.choose[0]) : ''
        }
        if (choose) obj = { ...obj, choose: choose };
        // this.productService.onOrder(product, obj);
        if (check && check2) {
            this.productService.onOrder(product, obj, true);
        } else {
            this.productService.onOrder(product, obj);
        }
    }

    public handleTym() {
        if (this.wishlistService.isWishlist(this.product.id)) {
            this.countWishlist -= 1;
        } else {
            this.countWishlist += 1;
        }
        this.wishlistService.onWishlist(this.product.id);
    }

    public selectFile(elem: any) {
        this.files = elem.target.files;
        this.urlImg = [];
        [...this.files].forEach((file: any) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e: any) => {
                this.urlImg.push(e.target.result);
            }
        });
    }

    public renderArr(nb: number) {
        let arr: any = [];
        for (let i = 0; i < nb; i++) {
            arr.push(i);
        }
        return arr;
    }

    public handleSubmit() {
        if (this.user) {
            const newData: any = this.dataForm.value;
            const formData = new FormData();
            formData.append("content", newData.content);
            formData.append("evaluate", newData.evaluate);
            if ([...this.files].length !== 0) {
                [...this.files].forEach((file) => {
                    formData.append("upload-files", file);
                });
            }
            if (!this.yourComment) {
                formData.append("user_id", this.user.id);
                formData.append("product_id", this.product.id);
                this.commentService.createComments(formData, (result: boolean, res: any) => {
                    if (result) {
                        this.totalCmt += 1;
                        const cmt = { ...newData, user_id: this.user.id, product_id: this.product.id, nameUser: this.user.fullname, thumbnail: this.user.thumbnail, resources: this.urlImg, id: res.insertId }
                        this.commentProducts.push(cmt);
                        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                            this.router.navigate(['/san-pham/' + this.paramType + '/' + this.paramCate + '/' + this.paramChild + '/' + this.paramName]);
                        });
                        this.valueEvaluate = Math.ceil(this.commentProducts.reduce((a: number, b: any) => Number(a + Number(b.evaluate)), 0) / this.totalCmt);
                        Swal.fire({
                            icon: 'success',
                            text: 'Đã thêm đánh giá!',
                            timer: 2000,
                            showCancelButton: false,
                            showConfirmButton: false,
                            position: 'center',
                            color: 'black',
                            customClass: 'swal-class2',
                            heightAuto: false,
                        });
                    } else {
                        if (res.status === 402) {
                            Swal.fire({
                                icon: "error",
                                title: "Lỗi tài khoản!",
                                text: "Vui lòng đăng nhập lại để tiếp tục thực hiện yêu cầu này!",
                                confirmButtonText: "Đăng nhập"
                            }).then((result) => {
                                if (result.isConfirmed) this.router.navigate(['/dang-nhap']);
                            });
                        }
                    }
                });
            } else {
                this.commentService.editComments(this.yourComment.id, formData, (result: boolean, res: any) => {
                    if (result) {
                        const cmt = { ...this.yourComment, ...newData, resources: this.urlImg };
                        this.yourComment = cmt;
                        this.commentProducts = this.commentProducts.map((item: any) => {
                            if (item.id == this.yourComment.id) item = cmt;
                            return item;
                        });
                        this.valueEvaluate = Math.ceil(this.commentProducts.reduce((a: number, b: any) => Number(a + Number(b.evaluate)), 0) / this.totalCmt);
                        Swal.fire({
                            icon: 'success',
                            text: 'Đã lưu thay đổi!',
                            timer: 2000,
                            showCancelButton: false,
                            showConfirmButton: false,
                            position: 'center',
                            color: 'black',
                            customClass: 'swal-class2',
                            heightAuto: false,
                        });
                        // this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                        //   this.router.navigate(['/san-pham/'+this.paramType+'/'+this.paramCate+'/'+this.paramChild+'/'+this.paramName]);
                        // });
                    } else {
                        if (res.status === 402) {
                            Swal.fire({
                                icon: "error",
                                title: "Lỗi tài khoản!",
                                text: "Vui lòng đăng nhập lại để tiếp tục thực hiện yêu cầu này!",
                                confirmButtonText: "Đăng nhập"
                            }).then((result) => {
                                if (result.isConfirmed) this.router.navigate(['/dang-nhap']);
                            });
                        }
                    }
                });
            }
        } else {
            Swal.fire({
                icon: "error",
                title: "Bạn phải đăng nhập để thực hiện yêu cầu này!",
                confirmButtonText: "Đăng nhập"
            }).then((result) => {
                if (result.isConfirmed) this.router.navigate(['/dang-nhap']);
            });
        }
    }
}
