import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faEdit, faHouse, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
import { CategoryService } from 'src/app/services/category.service';
import { DeleteService } from 'src/app/services/delete-service.service';
import { getService } from 'src/app/services/get-service.service';
import { PetsService } from 'src/app/services/pets.service';

@Component({
    selector: 'app-index-p',
    templateUrl: './index-p.component.html',
    styleUrls: ['./index-p.component.css']
})
export class IndexPComponent {
    public faHouse = faHouse;
    public faSearch = faSearch;
    public faEdit = faEdit;
    public faTrash = faTrash;

    public dataPets: any = [];
    public content: any;
    public search: any = '';
    public queryName: any = '';
    public queryPage: any = 1;
    public itemsPage: any = 10;
    public p: any = 1;

    public constructor(private getService: getService, private deleteService: DeleteService, private router: Router, private activatedRoute: ActivatedRoute, private categoryService: CategoryService, private petService: PetsService) {
        this.activatedRoute.queryParamMap.subscribe(params => {
            this.queryName = params.get('q');
            this.queryPage = Number(params.get('page'));
            this.p = this.queryPage;
            if (!this.queryName) {
                this.petService.getAllPets(undefined, (err: boolean, data: any) => {
                    if (!err) {
                        this.dataPets = data.map((item: any) => {
                            item.resources = JSON.parse(item.resources);
                            return item;
                        });
                    }
                });
            } else {
                this.search = this.queryName;
                this.petService.getSearchPet(this.queryName, (err: boolean, data: any) => {
                    if (!err) {
                        this.dataPets = data.map((item: any) => {
                            item.resources = JSON.parse(item.resources);
                            return item;
                        });
                    }
                });
            }
        });
    }

    public handleDelete(id: number, index: number) {
        this.deleteService.onDelete(undefined, "", (result: boolean) => {
            if (result) {
                this.petService.deletePet(id, (result: boolean) => {
                    if (result) {
                        this.dataPets.splice(index, 1);
                        const oldQuery = this.categoryService.getLocalstorageQuery();
                        this.router.navigateByUrl('/admin', { skipLocationChange: true }).then(() => {
                            this.router.navigate(['/admin/pet'], { queryParams: oldQuery });
                        });
                    }
                });
            }
        });
    }

    public handleRouteLink() {
        this.router.navigate(['/admin/pet'], { queryParams: { page: 1, q: this.search.trim() } });
        this.categoryService.setLocalstorageQuery({ page: 1, q: this.search.trim() });
        // this.router.navigateByUrl('/admin', { skipLocationChange: true }).then(() => {
        // });
    }

    public showContent(content: any) {
        this.content = content;
    }

    public handlePaginate() {
        this.router.navigate(['/admin/pet'], { queryParams: { page: this.p }, queryParamsHandling: 'merge' });
        if (this.queryName) this.categoryService.setLocalstorageQuery({ page: this.p, q: this.queryName });
        else this.categoryService.setLocalstorageQuery({ page: this.p });
    }
}
