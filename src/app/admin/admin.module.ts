import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { MasterComponent } from './components/layouts/master/master.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IndexCtComponent } from './components/pages/category/index-ct/index-ct.component';
import { CreateCtComponent } from './components/pages/category/create-ct/create-ct.component';
import { EditCtComponent } from './components/pages/category/edit-ct/edit-ct.component';
import { IndexPComponent } from './components/pages/pet/index-p/index-p.component';
import { CreatePComponent } from './components/pages/pet/create-p/create-p.component';
import { EditPComponent } from './components/pages/pet/edit-p/edit-p.component';
import { IndexBComponent } from './components/pages/brand/index-b/index-b.component';
import { CreateBComponent } from './components/pages/brand/create-b/create-b.component';
import { EditBComponent } from './components/pages/brand/edit-b/edit-b.component';
import { IndexPrComponent } from './components/pages/product/index-pr/index-pr.component';
import { CreatePrComponent } from './components/pages/product/create-pr/create-pr.component';
import { EditPrComponent } from './components/pages/product/edit-pr/edit-pr.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { CKEditorModule } from 'ng2-ckeditor';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { IndexNComponent } from './components/pages/news/index-n/index-n.component';
import { CreateNComponent } from './components/pages/news/create-n/create-n.component';
import { EditNComponent } from './components/pages/news/edit-n/edit-n.component';
import { CreateRComponent } from './components/pages/register/create-r/create-r.component';
import { EditRComponent } from './components/pages/register/edit-r/edit-r.component';
import { LoginComponent } from './components/pages/login/login.component';
import { NotfoundComponent } from './components/pages/notfound/notfound.component';
import { IndexOComponent } from './components/pages/order/index-o/index-o.component';

@NgModule({
    declarations: [
        MasterComponent,
        DashboardComponent,
        IndexCtComponent,
        CreateCtComponent,
        EditCtComponent,
        IndexPComponent,
        CreatePComponent,
        EditPComponent,
        IndexBComponent,
        CreateBComponent,
        EditBComponent,
        IndexPrComponent,
        CreatePrComponent,
        EditPrComponent,
        IndexNComponent,
        CreateNComponent,
        EditNComponent,
        CreateRComponent,
        EditRComponent,
        LoginComponent,
        NotfoundComponent,
        IndexOComponent,
    ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        FontAwesomeModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgxPaginationModule,
        CKEditorModule,
        CarouselModule
    ]
})
export class AdminModule { }
