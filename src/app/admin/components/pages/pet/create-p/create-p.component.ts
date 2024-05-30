import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { OwlOptions } from 'ngx-owl-carousel-o';
import * as slug from 'slug';
import { CategoryService } from 'src/app/services/category.service';
import { CreateService } from 'src/app/services/create-service.service';
import { getService } from 'src/app/services/get-service.service';
import { PetsService } from 'src/app/services/pets.service';

@Component({
    selector: 'app-create-p',
    templateUrl: './create-p.component.html',
    styleUrls: ['./create-p.component.css']
})
export class CreatePComponent {
    public faHouse = faHouse;

    public dataListpets: any = [];
    public dataPets: any = [];
    public codeError: boolean = false;
    public slugError: boolean = false;
    public checkFile: boolean = true;
    public files: any = [];
    public urlImg: any = [];

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
        "pet_list_id": ["", [Validators.required]],
        "popular": [""]
    });

    public constructor(private fb: FormBuilder, private router: Router, private petService: PetsService, private createService: CreateService, private categoryService: CategoryService) {
        this.petService.getAllListPet(undefined, (err: boolean, data: any) => {
            if (!err) {
                this.dataListpets = data;
                let array = data.map((item: any) => JSON.stringify({
                    id: item.category_id,
                    name: item.nameCategory
                }));
                array = Array.from(new Set(array)).map(((item: any) => JSON.parse(item)));
                const petListElem = document.querySelector('#pet_list_id') as HTMLElement;
                petListElem.innerHTML = this.categoryService.renderOptions2(array, data, "Loại");
            }
        });
        this.petService.getAllPets(undefined, (err: boolean, data: any) => {
            if (!err) {
                this.dataPets = data;
            }
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
        this.urlImg = [];
        if ([...this.files].length == 0) {
            this.checkFile = false;
        } else {
            this.checkFile = true;
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
        if ([...this.files].length == 0) {
            this.checkFile = false;
        } else {
            const newData: any = this.dataForm.value;
            newData.popular = newData.popular ? 1 : 0;
            this.codeError = this.dataPets.find((item: any) => item.code.trim() === newData.code.trim());
            this.slugError = this.dataPets.find((item: any) => item.slug.trim() === newData.slug.trim());
            if (!this.codeError && !this.slugError) {
                const formData = new FormData();
                formData.append("code", newData.code);
                formData.append("name", newData.name);
                formData.append("slug", newData.slug);
                formData.append("description", newData.description);
                formData.append("pet_list_id", newData.pet_list_id);
                formData.append("popular", newData.popular);
                [...this.files].forEach((file) => {
                    formData.append("upload-files", file);
                });
                console.log(formData);
                this.petService.createPet(formData, (result: boolean) => {
                    if (result) {
                        this.router.navigateByUrl('/admin', { skipLocationChange: true }).then(() => {
                            this.router.navigate(['/admin/pet']);
                        });
                    } else { }
                });
            }
        }
    }
}
