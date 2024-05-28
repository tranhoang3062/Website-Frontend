import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterComponent } from './components/layouts/master/master.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
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
import { IndexNComponent } from './components/pages/news/index-n/index-n.component';
import { CreateNComponent } from './components/pages/news/create-n/create-n.component';
import { EditNComponent } from './components/pages/news/edit-n/edit-n.component';
import { CreateRComponent } from './components/pages/register/create-r/create-r.component';
import { EditRComponent } from './components/pages/register/edit-r/edit-r.component';
import { LoginComponent } from './components/pages/login/login.component';
import { authGuard } from '../guard/auth.guard';
import { NotfoundComponent } from './components/pages/notfound/notfound.component';
import { IndexOComponent } from './components/pages/order/index-o/index-o.component';

const routes: Routes = [
    {
        path: '', component: MasterComponent, canActivate: [authGuard], children: [
            { path: '', component: DashboardComponent },

            { path: 'category', component: IndexCtComponent },
            { path: 'category/add/:key', component: CreateCtComponent },
            { path: 'category/edit/:key/:id', component: EditCtComponent },

            { path: 'pet', component: IndexPComponent },
            { path: 'pet/add', component: CreatePComponent },
            { path: 'pet/edit/:id', component: EditPComponent },

            { path: 'brand', component: IndexBComponent },
            { path: 'brand/add', component: CreateBComponent },
            { path: 'brand/edit/:id', component: EditBComponent },

            { path: 'product', component: IndexPrComponent },
            { path: 'product/add', component: CreatePrComponent },
            { path: 'product/edit/:id', component: EditPrComponent },

            { path: 'news', component: IndexNComponent },
            { path: 'news/add', component: CreateNComponent },
            { path: 'news/edit/:id', component: EditNComponent },

            { path: 'orders', component: IndexOComponent },

            { path: 'register/:type', component: CreateRComponent },
            { path: 'account/:type/:id', component: EditRComponent },
        ]
    },
    { path: 'login', component: LoginComponent },
    { path: '**', component: NotfoundComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
