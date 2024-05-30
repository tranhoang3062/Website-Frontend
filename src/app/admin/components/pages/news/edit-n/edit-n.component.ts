import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import * as slug from 'slug';
import { CategoryService } from 'src/app/services/category.service';
import { EditService } from 'src/app/services/edit-service.service';
import { getService } from 'src/app/services/get-service.service';
import { NewsService } from 'src/app/services/news.service';

@Component({
    selector: 'app-edit-n',
    templateUrl: './edit-n.component.html',
    styleUrls: ['./edit-n.component.css']
})
export class EditNComponent {
    public faHouse = faHouse;

    public dataNews: any = [];
    public newspage: any = {};
    public titleError: boolean = false;
    public slugError: boolean = false;
    public checkFile: boolean = true;
    public file: any;
    public urlImg: any = '';
    public paramId: any;

    public dataForm = this.fb.group({
        "title": ["", [Validators.required]],
        "slug": ["", [Validators.required]],
        "content": ["", [Validators.required]]
    });

    public constructor(private fb: FormBuilder, private router: Router, private newsService: NewsService, private editService: EditService, private activatedRoute: ActivatedRoute, private categoryService: CategoryService) {
        this.activatedRoute.paramMap.subscribe(params => {
            this.paramId = params.get('id');
            this.newsService.getAllNews(undefined, (err: boolean, data: any) => {
                if (!err) {
                    this.dataNews = data;
                    this.newspage = data.find((item: any) => item.id == this.paramId);
                    this.dataForm.controls.title.setValue(this.newspage.title);
                    this.dataForm.controls.slug.setValue(this.newspage.slug);
                    this.dataForm.controls.content.setValue(this.newspage.content);
                    this.urlImg = this.newspage.thumbnail;
                }
            });
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
            this.urlImg = this.newspage.thumbnail;
        } else {
            const reader = new FileReader();
            reader.readAsDataURL(this.file);
            reader.onload = (e: any) => {
                this.urlImg = e.target.result;
            }
        }
    }

    public eventInput() {
        this.slugError = false;
    }

    public handleSubmit() {
        const newData: any = this.dataForm.value;
        this.titleError = this.dataNews.some((item: any) => item.title.trim() === newData.title.trim() && Number(item.id) !== Number(this.paramId));
        this.slugError = this.dataNews.some((item: any) => item.slug.trim() === newData.slug.trim() && Number(item.id) !== Number(this.paramId));
        if (!this.titleError && !this.slugError) {
            const formData = new FormData();
            formData.append("title", newData.title);
            formData.append("slug", newData.slug);
            formData.append("content", newData.content);
            if (this.file) {
                formData.append("upload-file", this.file);
            }
            this.newsService.editNews(this.paramId, formData, (result: boolean) => {
                if (result) {
                    const oldQuery = this.categoryService.getLocalstorageQuery();
                    this.router.navigateByUrl('/admin', { skipLocationChange: true }).then(() => {
                        this.router.navigate(['/admin/brand'], { queryParams: oldQuery });
                    });
                } else { }
            });
        }
    }
}
