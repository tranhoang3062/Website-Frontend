import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import * as slug from 'slug';
import { CreateService } from 'src/app/services/create-service.service';
import { getService } from 'src/app/services/get-service.service';
import { NewsService } from 'src/app/services/news.service';

@Component({
    selector: 'app-create-n',
    templateUrl: './create-n.component.html',
    styleUrls: ['./create-n.component.css']
})
export class CreateNComponent {
    public faHouse = faHouse;

    public dataNews: any = [];
    public titleError: boolean = false;
    public slugError: boolean = false;
    public checkFile: boolean = true;
    public file: any;
    public urlImg: any = '';

    public dataForm = this.fb.group({
        "title": ["", [Validators.required]],
        "slug": ["", [Validators.required]],
        "content": ["", [Validators.required]]
    });

    public constructor(private fb: FormBuilder, private router: Router, private newsService: NewsService, private createService: CreateService) {
        this.newsService.getAllNews(undefined, (err: boolean, data: any) => {
            if (!err) {
                this.dataNews = data;
            }
        });
    }

    get f() {
        return this.dataForm.controls;
    }

    onInputTitle(elem: any) {
        this.titleError = false;
        this.dataForm.controls.slug.setValue(slug(elem.target.value));
    }

    selectFile(elem: any) {
        this.file = elem.target.files[0];
        if (!this.file) {
            this.checkFile = false;
            this.urlImg = '';
        } else this.checkFile = true;
        const reader = new FileReader();
        reader.readAsDataURL(this.file);
        reader.onload = (e: any) => {
            this.urlImg = e.target.result;
        }
    }

    public eventInput() {
        this.slugError = false;
    }

    public handleSubmit() {
        const newData: any = this.dataForm.value;
        this.titleError = this.dataNews.some((item: any) => item.title.trim() === newData.title.trim());
        this.slugError = this.dataNews.some((item: any) => item.slug.trim() === newData.slug.trim());
        if (!this.file) {
            this.checkFile = false;
        } else {
            if (!this.titleError && !this.slugError) {
                const formData = new FormData();
                formData.append("title", newData.title);
                formData.append("slug", newData.slug);
                formData.append("content", newData.content);
                formData.append("upload-file", this.file);
                this.newsService.createNews(formData, (result: boolean) => {
                    if (result) {
                        this.router.navigateByUrl('/admin', { skipLocationChange: true }).then(() => {
                            this.router.navigate(['/admin/brand']);
                        });
                    } else { }
                });
            }
        }
    }
}
