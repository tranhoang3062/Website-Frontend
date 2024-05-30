import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { OwlOptions } from 'ngx-owl-carousel-o';
import * as slug from 'slug';
import { CategoryService } from 'src/app/services/category.service';
import { CreateService } from 'src/app/services/create-service.service';
import { EditService } from 'src/app/services/edit-service.service';
import { getService } from 'src/app/services/get-service.service';
import { PetsService } from 'src/app/services/pets.service';

@Component({
    selector: 'app-edit-p',
    templateUrl: './edit-p.component.html',
    styleUrls: ['./edit-p.component.css']
})
export class EditPComponent {
    public faHouse = faHouse;

    public dataListpets: any = [];
    public dataPets: any = [];
    public codeError: boolean = false;
    public slugError: boolean = false;
    public checkFile: boolean = true;
    public files: any = [];
    public urlImg: any = [];
    public petlist: any = {};
    public paramsId: any;

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
    public radioInputs: any = [
        { id: 1, name: 'Hiện', value: 0, checked: true },
        { id: 2, name: 'Ẩn', value: 1, checked: false },
    ];
    public dataForm = this.fb.group({
        "code": ["", [Validators.required]],
        "name": ["", [Validators.required]],
        "description": [""],
        "slug": ["", [Validators.required]],
        "pet_list_id": [""],
        "popular": [""]
    });

    public constructor(private fb: FormBuilder, private router: Router, private petService: PetsService, private editService: EditService, private activatedRoute: ActivatedRoute, private categoryService: CategoryService) {
        this.activatedRoute.paramMap.subscribe(params => {
            this.paramsId = params.get('id');
            this.petService.getAllListPet(undefined, (err: boolean, data: any) => {
                if (!err) {
                    this.dataListpets = data;
                }
            });
            this.petService.getAllPets(undefined, (err: boolean, data: any) => {
                if (!err) {
                    this.dataPets = data;
                    this.petlist = data.find((item: any) => item.id == this.paramsId);
                    this.petlist.resources = JSON.parse(this.petlist.resources);
                    this.dataForm.controls.code.setValue(this.petlist.code);
                    this.dataForm.controls.name.setValue(this.petlist.name);
                    this.dataForm.controls.description.setValue(this.petlist.description);
                    this.dataForm.controls.slug.setValue(this.petlist.slug);
                    this.dataForm.controls.pet_list_id.setValue(this.petlist.pet_list_id);
                    this.dataForm.controls.popular.setValue(this.petlist.popular);
                }
            });
        });
    }

    get f() {
        return this.dataForm.controls;
    }

    onInputName(elem: any) {
        this.dataForm.controls.slug.setValue(slug(this.dataForm.controls.name.value as string) + '-' + (this.dataForm.controls.code.value as string).toLowerCase());
    }

    selectFile(elem: any) {
        this.files = elem.target.files;
        if ([...this.files].length == 0) {
            this.checkFile = false;
            this.urlImg = this.petlist.resources;
        } else {
            this.urlImg = [];
            [...this.files].forEach((file: any) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = (e: any) => {
                    this.urlImg.push(e.target.result);
                }
            });
        }
    }

    public handleSubmit() {
        const newData: any = this.dataForm.value;
        newData.popular = newData.popular ? 1 : 0;
        this.codeError = this.dataPets.find((item: any) => item.code.trim() === newData.code.trim() && Number(item.id) !== Number(this.paramsId));
        this.slugError = this.dataPets.find((item: any) => item.slug.trim() === newData.slug.trim() && Number(item.id) !== Number(this.paramsId));
        if (!this.codeError && !this.slugError) {
            const formData = new FormData();
            formData.append("code", newData.code);
            formData.append("name", newData.name);
            formData.append("slug", newData.slug);
            formData.append("description", newData.description);
            formData.append("pet_list_id", newData.pet_list_id);
            formData.append("popular", newData.popular);
            if ([...this.files].length !== 0) {
                [...this.files].forEach((file) => {
                    formData.append("upload-files", file);
                });
            }
            this.petService.editPet(this.paramsId, formData, (result: boolean) => {
                if (result) {
                    const oldQuery = this.categoryService.getLocalstorageQuery();
                    this.router.navigateByUrl('/admin', { skipLocationChange: true }).then(() => {
                        this.router.navigate(['/admin/pet'], { queryParams: oldQuery });
                    });
                } else { }
            });
        }
    }
}
