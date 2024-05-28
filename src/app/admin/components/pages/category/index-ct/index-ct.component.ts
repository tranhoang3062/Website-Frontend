import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faEdit, faHouse, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
import { CategoryService } from 'src/app/services/category/category.service';
import { DeleteService } from 'src/app/services/delete/delete-service.service';
import { getService } from 'src/app/services/get/get-service.service';

@Component({
  selector: 'app-index-ct',
  templateUrl: './index-ct.component.html',
  styleUrls: ['./index-ct.component.css']
})
export class IndexCtComponent {
  public faHouse = faHouse;
  public faSearch = faSearch;
  public faEdit = faEdit;
  public faTrash = faTrash;

  public dataCategoryDMTC:any = [];
  public dataCategoryDMSP:any = [];
  public dataListpet:any = [];
  public queryDm:any = 'dmtc';
  public queryName:any = '';
  public queryPage:any = 1;
  public search:string = '';

  public itemsPageTc:number = 5;
  public pTc:number = 1;
  public itemsPageSp:number = 5;
  public pSp:number = 1;
  public itemsPageGtc:number = 5;
  public pGtc:number = 1;

  public constructor(private getService:getService, private deleteService:DeleteService, private router:Router, private activatedRoute:ActivatedRoute, private categoryService:CategoryService) {
    this.activatedRoute.queryParamMap.subscribe(params => {
      this.queryDm = params.get('dm') ?? 'dmtc';
      this.queryName = params.get('q');
      this.queryPage = Number(params.get('page'));
      this.pTc = this.queryPage;
      this.pSp = this.queryPage;
      this.pGtc = this.queryPage;
      if(!this.queryName) {
        this.getService.getAllCate(undefined, (err:boolean, data:any) => {
          if(!err) {
            this.dataCategoryDMTC = data.filter((item:any) => item.parent_id === 0);
            this.dataCategoryDMSP = data.filter((item:any) => item.parent_id !== 0);
            console.log(this.dataCategoryDMSP);
          }
        });
        this.getService.getAllListPet(undefined, (err:boolean, data:any) => {
          if(!err) {
            this.dataListpet = data;
          }
        });
      } else {
        this.search = this.queryName;
        this.getService.getSearchCate(this.queryName, (err:boolean, data:any) => {
          if(!err) {
            this.dataCategoryDMTC = data.filter((item:any) => item.parent_id == 0);
            this.dataCategoryDMSP = data.filter((item:any) => item.parent_id != 0);
          }
        });
        this.getService.getSearchPetlist(this.queryName, (err:boolean, data:any) => {
          if(!err) {
            this.dataListpet = data;
          }
        });
      }
    });
  }

  public handleDelete(id:number, index:number, key:string) {
    const oldQuery = this.categoryService.getLocalstorageQuery();
    this.deleteService.onDelete(undefined, "Danh mục có thể chứa dữ liệu quan trọng", (result:boolean) => {
      if(result) {
        if(key === 'dmtc' || key === 'dmsp') {
          this.deleteService.deleteCategory(id, (result:boolean) => {
            if(result) {
              this.dataCategoryDMTC.splice(index, 1);
              this.router.navigateByUrl('/admin', { skipLocationChange: true }).then(() => {
                this.router.navigate(['/admin/category'], {queryParams:oldQuery});
              });
            }
          });
        } else {
          this.deleteService.deletePetlist(id, (result:boolean) => {
            if(result) {
              this.dataListpet.splice(index, 1);
              this.router.navigateByUrl('/admin', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/admin/category'], {queryParams:oldQuery});
            });
            }
          });
        }
      }
    });
  }

  public handleRouteLink(key:boolean, value:string) {
    if(key == true) {
      this.router.navigateByUrl('/admin', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/admin/category'], {queryParams: {dm:value}});
      });
      this.categoryService.setLocalstorageQuery({dm:value});
    } else {
      this.router.navigate(['/admin/category'], {queryParams: {page:1, q:value.trim()}, queryParamsHandling: 'merge'});
      this.categoryService.setLocalstorageQuery({dm:this.queryDm, page:1, q:value.trim()});
    }
  }

  public handlePaginate(page:number) {
    this.router.navigate(['/admin/category'], {queryParams: {page: page}, queryParamsHandling: 'merge'});
    if(this.queryName) this.categoryService.setLocalstorageQuery({dm:this.queryDm, page:page, q: this.queryName});
    else this.categoryService.setLocalstorageQuery({dm:this.queryDm, page: page});
  }
}
