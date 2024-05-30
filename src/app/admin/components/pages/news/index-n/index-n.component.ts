import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faEdit, faHouse, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
import { CategoryService } from 'src/app/services/category.service';
import { DeleteService } from 'src/app/services/delete-service.service';
import { getService } from 'src/app/services/get-service.service';
import { NewsService } from 'src/app/services/news.service';

@Component({
    selector: 'app-index-n',
    templateUrl: './index-n.component.html',
    styleUrls: ['./index-n.component.css']
})
export class IndexNComponent {
    public faHouse = faHouse;
    public faSearch = faSearch;
    public faEdit = faEdit;
    public faTrash = faTrash;

    public dataNews: any = [];
    public content: any;
    public search: any = '';
    public queryName: any = '';
    public queryPage: any = 1;
    public itemsPage: any = 10;
    public p: any = 1;

    public constructor(private newsService: NewsService, private deleteService: DeleteService, private router: Router, private categoryService: CategoryService, private activatedRoute: ActivatedRoute) {
        this.activatedRoute.queryParamMap.subscribe(params => {
            this.queryName = params.get('q');
            this.queryPage = Number(params.get('page'));
            this.p = this.queryPage;
            if (!this.queryName) {
                this.newsService.getAllNews(undefined, (err: boolean, data: any) => {
                    if (!err) {
                        this.dataNews = data;
                    }
                });
            } else {
                this.search = this.queryName;
                this.newsService.getSearchNews(this.queryName, (err: boolean, data: any) => {
                    if (!err) {
                        this.dataNews = data;
                    }
                });
            }
        });
    }

    public showContent(content: any) {
        this.content = content;
    }

    public handleDelete(id: number, index: number) {
        const oldQuery = this.categoryService.getLocalstorageQuery();
        this.deleteService.onDelete(undefined, "", (result: boolean) => {
            if (result) {
                this.newsService.deleteNews(id, (result: boolean) => {
                    if (result) {
                        this.dataNews.splice(index, 1);
                        this.router.navigateByUrl('/admin', { skipLocationChange: true }).then(() => {
                            this.router.navigate(['/admin/news'], { queryParams: oldQuery });
                        });
                    }
                });
            }
        });
    }

    public handleRouteLink() {
        this.router.navigate(['/admin/news'], { queryParams: { page: 1, q: this.search.trim() } });
        this.categoryService.setLocalstorageQuery({ page: 1, q: this.search.trim() });
        // this.router.navigateByUrl('/admin', { skipLocationChange: true }).then(() => {
    }

    public handlePaginate() {
        this.router.navigate(['/admin/news'], { queryParams: { page: this.p }, queryParamsHandling: 'merge' });
        if (this.queryName) this.categoryService.setLocalstorageQuery({ page: this.p, q: this.queryName });
        else this.categoryService.setLocalstorageQuery({ page: this.p });
    }
}
