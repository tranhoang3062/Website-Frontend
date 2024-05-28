import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faEdit, faHouse, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
import { CategoryService } from 'src/app/services/category/category.service';
import { DeleteService } from 'src/app/services/delete/delete-service.service';
import { getService } from 'src/app/services/get/get-service.service';

@Component({
  selector: 'app-index-b',
  templateUrl: './index-b.component.html',
  styleUrls: ['./index-b.component.css']
})
export class IndexBComponent {
  public faHouse = faHouse;
  public faSearch = faSearch;
  public faEdit = faEdit;
  public faTrash = faTrash;

  public dataBrands:any = [];
  public search:any = '';
  public queryName:any = '';
  public queryPage:any = 1;
  public itemsPage:any = 10;
  public p:any = 1;

  public constructor(private getService:getService, private deleteService:DeleteService, private router:Router, private categoryService:CategoryService, private activatedRoute:ActivatedRoute) {
    this.activatedRoute.queryParamMap.subscribe(params => {
      this.queryName = params.get('q');
      this.queryPage = params.get('page');
      this.p = this.queryPage;
      if(!this.queryName) {
        this.getService.getAllBrands(undefined, (err:boolean, data:any) => {
          if(!err) {
            this.dataBrands = data;
          }
        });
      } else {
        this.search = this.queryName;
        this.getService.getSearchBrand(this.queryName, (err:boolean, data:any) => {
          if(!err) {
            this.dataBrands = data;
          }
        });
      }
    });
  }

  public handleDelete(id:number, index:number) {
    const oldQuery = this.categoryService.getLocalstorageQuery();
    this.deleteService.onDelete(undefined, "", (result:boolean) => {
      if(result) {
        this.deleteService.deleteBrand(id, (result:boolean) => {
          if(result) {
            this.dataBrands.splice(index, 1);
            this.router.navigateByUrl('/admin', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/admin/brand'], {queryParams: oldQuery});
            });
          }
        });
      }
    });
  }

  public handleRouteLink() {
    this.router.navigate(['/admin/brand'], {queryParams: {page:1, q: this.search.trim()}});
    this.categoryService.setLocalstorageQuery({page:1, q: this.search.trim()});
    // this.router.navigateByUrl('/admin', { skipLocationChange: true }).then(() => {
    // });
  }

  public handlePaginate() {
    this.router.navigate(['/admin/brand'], {queryParams: {page: this.p}, queryParamsHandling: 'merge'});
    if(this.queryName) this.categoryService.setLocalstorageQuery({page:this.p, q: this.queryName});
    else this.categoryService.setLocalstorageQuery({page: this.p});
  }

}
