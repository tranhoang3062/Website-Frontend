import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { getService } from 'src/app/services/get-service.service';
import { NewsService } from 'src/app/services/news.service';

@Component({
    selector: 'app-detail-news',
    templateUrl: './detail-news.component.html',
    styleUrls: ['./detail-news.component.css']
})
export class DetailNewsComponent {
    public faClock = faClock;

    public paramName: any = '';

    public newsOutstand: any = [];
    public brand: any = {};

    public constructor(private titleService: Title, private getService: getService, private activatedRoute: ActivatedRoute, private newsService: NewsService) {
        this.titleService.setTitle('Tin tức');
        $('html, body').animate({ scrollTop: 0, behavior: 'smooth' }, 0);

        this.activatedRoute.paramMap.subscribe(params => {
            this.paramName = params.get('name');
            this.newsService.getAllNews(undefined, (err: boolean, data: any) => {
                if (!err) {
                    this.newsOutstand = data.slice(0, 4);
                    this.brand = data.find((item: any) => item.slug === this.paramName);
                }
            });
        });
    }
}
