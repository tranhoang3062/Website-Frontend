import { Component } from '@angular/core';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { Title } from '@angular/platform-browser';
import { getService } from 'src/app/services/get-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsService } from 'src/app/services/news.service';

@Component({
    selector: 'app-newspage',
    templateUrl: './newspage.component.html',
    styleUrls: ['./newspage.component.css']
})
export class NewspageComponent {
    public faClock = faClock;

    public dataNewspage: any = [];
    public newsOutstand: any = [];
    public itemsPage: any = 8;
    public p: any = 1;

    public constructor(
        private titleService: Title, 
        private getService: getService, 
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private newsService: NewsService
    ) {
        this.titleService.setTitle('Tin tức');
        $('html, body').animate({ scrollTop: 0 }, 0);

        this.activatedRoute.queryParamMap.subscribe(queries => {
            this.p = queries.get('page') ? Number(queries.get('page')) : 1;
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
                    }).sort((a: any, b: any) => a.id - b.id);
                    this.newsOutstand = this.dataNewspage.slice(-4,);
                }
            });
        });
    }

    public handlePaginate(page: number) {
        this.router.navigate(['tin-tuc'], { queryParams: { page: page }, queryParamsHandling: 'merge' });
    }
}
