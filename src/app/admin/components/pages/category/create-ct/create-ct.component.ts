import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import * as slug from 'slug';
import { CategoryService } from 'src/app/services/category.service';
import { PetsService } from 'src/app/services/pets.service';

@Component({
    selector: 'app-create-ct',
    templateUrl: './create-ct.component.html',
    styleUrls: ['./create-ct.component.css']
})
export class CreateCtComponent {
    public faHouse = faHouse;

    public dataCategory: any = [];
    public dataCategoryParent: any = [];
    public dataListpets: any = [];
    public nameError: boolean = false;
    public paramsKey: any;
    public header: string = '';
    public listOptions: any;

    public radioInputs: any = [
        { id: 1, name: 'Hiện', value: 0, checked: true },
        { id: 2, name: 'Ẩn', value: 1, checked: false },
    ];
    public dataForm = this.fb.group({
        "name": ["", [Validators.required]],
        "status": ["0", [Validators.required]],
        "parent_id": [""],
        "slug": [""],
        "category_id": [""]
    });

    public constructor(
        private fb: FormBuilder, 
        private router: Router, 
        private petService: PetsService, 
        private activatedRoute: ActivatedRoute, 
        private categoryService: CategoryService
    ) {
        this.activatedRoute.paramMap.subscribe(params => {
            this.paramsKey = params.get('key');
            this.categoryService.getAllCate(undefined, (err: boolean, data: any) => {
                if (!err) {
                    this.dataCategory = data;
                    if (this.paramsKey === "dmtc") {
                        this.header = 'Thêm mới danh mục thú cưng';
                    } else if (this.paramsKey === "dmsp") {
                        this.header = 'Thêm mới danh mục sản phẩm';
                        const parentSelect = document.querySelector('#parent_select') as HTMLElement;
                        parentSelect.innerHTML += this.categoryService.renderOptions([...data], "Danh mục");
                    } else if (this.paramsKey === "gtc") {
                        this.header = 'Thêm mới giống thú cưng';
                        this.dataCategoryParent = data.filter((item: any) => item.parent_id === 0);
                    }
                }
            });
            if (this.paramsKey == "dmsp") this.dataForm.controls['parent_id'].addValidators([Validators.required]);
            if (this.paramsKey == "gtc") {
                this.dataForm.controls['category_id'].addValidators([Validators.required]);
                this.petService.getAllListPet(undefined, (err: boolean, data: any) => {
                    if (!err) {
                        this.dataListpets = data;
                    }
                })
            }
        });
    }

    get f() {
        return this.dataForm.controls;
    }

    public eventInput() {
        this.nameError = false;
    }

    public handleSubmit() {
        this.dataForm.controls.slug.setValue(slug(this.dataForm.controls.name.value as string));
        if (this.paramsKey !== "gtc") {
            const { category_id, ...arr } = this.dataForm.value;
            let newData: any = { ...arr };
            if (this.paramsKey === "dmtc") {
                this.nameError = this.dataCategory.some((item: any) => item.name.trim() === (newData.name as string).trim() && item.parent_id == 0);
                newData = { ...arr, lever: 1 };
            } else {
                this.nameError = this.dataCategory.some((item: any) => item.name.trim() === (newData.name as string).trim() && item.parent_id == newData.parent_id);
                const cateParent = this.dataCategory.filter((item: any) => item.parent_id == 0);
                if (cateParent.some((item: any) => item.id == newData.parent_id)) newData = { ...arr, lever: 2 };
            }
            if (!this.nameError) {
                this.categoryService.createCate(newData, (result: boolean) => {
                    if (result) {
                        if (this.paramsKey === "dmtc") {
                            this.router.navigateByUrl('/admin', { skipLocationChange: true }).then(() => {
                                this.router.navigate(['/admin/category'], { queryParams: { dm: 'dmtc' } });
                            });
                        } else {
                            this.router.navigateByUrl('/admin', { skipLocationChange: true }).then(() => {
                                this.router.navigate(['/admin/category'], { queryParams: { dm: 'dmsp' } });
                            });
                        }
                    } else {
                    }
                });
            }
        } else {
            const { parent_id, ...newData } = this.dataForm.value;
            this.nameError = this.dataListpets.some((item: any) => item.name.trim() === (newData.name as string).trim());
            if (!this.nameError) {
                this.petService.createPetList(newData, (result: boolean) => {
                    if (result) {
                        this.router.navigateByUrl('/admin', { skipLocationChange: true }).then(() => {
                            this.router.navigate(['/admin/category'], { queryParams: { dm: 'gtc' } });
                        });
                    } else {
                    }
                });
            }
        }
    }
}
