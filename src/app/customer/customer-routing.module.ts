import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterComponent } from './components/layouts/master/master.component';
import { HomeComponent } from './components/pages/home/home.component';
import { PetsComponent } from './components/pages/pets/pets.component';
import { ProductComponent } from './components/pages/product/product.component';
import { BrandComponent } from './components/pages/brand/brand.component';
import { NewspageComponent } from './components/pages/newspage/newspage.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { DetailPetComponent } from './components/pages/detail-pet/detail-pet.component';
import { DetailProductComponent } from './components/pages/detail-product/detail-product.component';
import { DetailNewsComponent } from './components/pages/detail-news/detail-news.component';
import { CartComponent } from './components/pages/cart/cart.component';
import { CheckoutComponent } from './components/pages/checkout/checkout.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { NotfoundComponent } from './components/pages/notfound/notfound.component';
import { UserComponent } from './components/pages/user/user.component';
import { SearchComponent } from './components/pages/search/search.component';

const routes: Routes = [
    {
        path: '', component: MasterComponent, children: [
            { path: '', component: HomeComponent },

            { path: 'thu-cung/:type/:species', component: PetsComponent },
            { path: 'thu-cung/:type/:species/:name', component: DetailPetComponent },

            { path: 'san-pham', component: ProductComponent },
            { path: 'san-pham/:type', component: ProductComponent },
            { path: 'san-pham/:type/:cate', component: ProductComponent },
            { path: 'san-pham/:type/:cate/:child', component: ProductComponent },
            { path: 'san-pham/:type/:cate/:child/:name', component: DetailProductComponent },

            { path: 'tin-tuc', component: NewspageComponent },
            { path: 'tin-tuc/:name', component: DetailNewsComponent },

            { path: 'thuong-hieu', component: BrandComponent },
            { path: 'lien-he', component: ContactComponent },

            { path: 'gio-hang', component: CartComponent },

            { path: 'search', component: SearchComponent },

            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent },

            { path: 'user/:key', component: UserComponent },
        ]
    },
    { path: 'thanh-toan', component: CheckoutComponent },
    { path: '**', component: NotfoundComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CustomerRoutingModule { }
