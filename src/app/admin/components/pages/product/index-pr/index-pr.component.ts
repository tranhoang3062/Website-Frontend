import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faEdit, faHouse, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
import { CategoryService } from 'src/app/services/category.service';
import { DeleteService } from 'src/app/services/delete-service.service';
import { getService } from 'src/app/services/get-service.service';

@Component({
  selector: 'app-index-pr',
  templateUrl: './index-pr.component.html',
  styleUrls: ['./index-pr.component.css']
})
export class IndexPrComponent {
  public faHouse = faHouse;
  public faSearch = faSearch;
  public faEdit = faEdit;
  public faTrash = faTrash;

  public dataProducts:any = [];
  public search:any = '';
  public queryName:any = '';
  public queryPage:any = 1;
  public itemsPage:any = 10;
  public p:any = 1;

  public constructor(private getService:getService, private deleteService:DeleteService, private router:Router, private categoryService:CategoryService, private activatedRoute:ActivatedRoute) {
    this.activatedRoute.queryParamMap.subscribe(params => {
      this.queryName = params.get('q');
      this.queryPage = Number(params.get('page'));
      this.p = this.queryPage;
      if(!this.queryName) {
        this.getService.getAllProducts(undefined, (err:boolean, data:any) => {
          if(!err) {
            this.dataProducts = data.map((item:any) => {
              item.resources = JSON.parse(item.resources);
              return item;
            });
          }
        });
      } else {
        this.search = this.queryName;
        this.getService.getSearchProduct(this.queryName, (err:boolean, data:any) => {
          if(!err) {
            this.dataProducts = data.map((item:any) => {
              item.resources = JSON.parse(item.resources);
              return item;
            });
          }
        });
      }
    });
  }

  public handleDelete(id:number, index:number) {
    const oldQuery = this.categoryService.getLocalstorageQuery();
    this.deleteService.onDelete(undefined, "", (result:boolean) => {
      if(result) {
        this.deleteService.deleteProduct(id, (result:boolean) => {
          if(result) {
            this.dataProducts.splice(index, 1);
            this.router.navigateByUrl('/admin', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/admin/product'], {queryParams:oldQuery});
            });
          }
        });
      }
    });
  }

  public handleRouteLink() {
    this.router.navigate(['/admin/product'], {queryParams: {page:1, q: this.search.trim()}});
    this.categoryService.setLocalstorageQuery({page:1, q: this.search.trim()});
    // this.router.navigateByUrl('/admin', { skipLocationChange: true }).then(() => {
  }

  public handlePaginate() {
    this.router.navigate(['/admin/product'], {queryParams: {page: this.p}, queryParamsHandling: 'merge'});
    if(this.queryName) this.categoryService.setLocalstorageQuery({page:this.p, q: this.queryName});
    else this.categoryService.setLocalstorageQuery({page: this.p});
  }
}
