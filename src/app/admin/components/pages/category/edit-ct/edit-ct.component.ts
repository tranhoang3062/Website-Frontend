import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import * as slug from 'slug';
import { CategoryService } from 'src/app/services/category.service';
import { PetsService } from 'src/app/services/pets.service';

@Component({
    selector: 'app-edit-ct',
    templateUrl: './edit-ct.component.html',
    styleUrls: ['./edit-ct.component.css']
})
export class EditCtComponent {
    public faHouse = faHouse;

    public dataCategory: any = [];
    public dataCategoryParent: any = [];
    public dataListpets: any = [];
    public nameError: boolean = false;
    public paramsKey: any;
    public paramsId: any;
    public header: string = '';

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
            this.paramsId = params.get('id');
            this.categoryService.getAllCate(undefined, (err: boolean, data: any) => {
                if (!err) {
                    this.dataCategory = data;
                    if (this.paramsKey === "dmtc" || this.paramsKey === "dmsp") {
                        const category = data.find((item: any) => item.id == this.paramsId);
                        this.dataForm.controls.name.setValue(category.name);
                        // this.dataForm.controls.status.setValue(category.status);
                        this.dataForm.controls.parent_id.setValue(category.parent_id);
                        this.radioInputs.forEach((item: any) => {
                            if (item.value === category.status) item.checked = true;
                            else item.checked = false;
                        });
                        console.log(this.radioInputs)
                        const parentSelect = document.querySelector('#parent_select') as HTMLElement;
                        parentSelect.innerHTML += this.categoryService.renderOptions([...data], "Danh mục", category.id, category.parent_id);
                    } else if (this.paramsKey === "gtc") {
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
                        const petlist = data.find((item: any) => item.id == this.paramsId);
                        this.dataForm.controls.name.setValue(petlist.name);
                        // this.dataForm.controls.status.setValue(petlist.status);
                        this.dataForm.controls.category_id.setValue(petlist.category_id);
                        this.radioInputs.forEach((item: any) => {
                            if (item.value == petlist.status) item.checked = true;
                            else item.checked = false;
                        });
                    }
                });
            }
        });
    }

    get f() {
        return this.dataForm.controls;
    }

    public handleStatus(value: string) {
        this.radioInputs.forEach((item: any) => {
            if (item.value == value) item.checked = true;
            else item.checked = false;
        });
    }

    public eventInput() {
        this.nameError = false;
    }

    public handleSubmit() {
        const oldQuery = this.categoryService.getLocalstorageQuery();
        this.dataForm.controls.slug.setValue(slug(this.dataForm.controls.name.value as string));
        if (this.paramsKey !== "gtc") {
            const { category_id, ...newData } = this.dataForm.value;
            if (this.paramsKey === "dmtc") {
                this.nameError = this.dataCategory.some((item: any) => item.name.trim() === (newData.name as string).trim() && item.parent_id == 0 && Number(item.id) !== Number(this.paramsId));
            } else {
                this.nameError = this.dataCategory.some((item: any) => item.name.trim() === (newData.name as string).trim() && item.parent_id == newData.parent_id && Number(item.id) !== Number(this.paramsId));
            }
            if (!this.nameError) {
                newData.status = this.radioInputs.find((item: any) => item.checked).value;
                this.categoryService.editCategory(this.paramsId, newData, (result: boolean) => {
                    if (result) {
                        this.router.navigateByUrl('/admin', { skipLocationChange: true }).then(() => {
                            this.router.navigate(['/admin/category'], { queryParams: oldQuery });
                        });
                    } else {
                    }
                });
            }
        } else {
            const { parent_id, ...newData } = this.dataForm.value;
            this.nameError = this.dataListpets.some((item: any) => item.name.trim() === (newData.name as string).trim() && Number(item.id) !== Number(this.paramsId));
            if (!this.nameError) {
                newData.status = this.radioInputs.find((item: any) => item.checked).value;
                this.petService.editPetlist(this.paramsId, newData, (result: boolean) => {
                    if (result) {
                        this.router.navigateByUrl('/admin', { skipLocationChange: true }).then(() => {
                            this.router.navigate(['/admin/category'], { queryParams: oldQuery });
                        });
                    } else {
                    }
                });
            }
        }
    }
}
