import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { CustomerRoutingModule } from './customer-routing.module';
import { HeaderComponent } from './components/layouts/header/header.component';
import { FooterComponent } from './components/layouts/footer/footer.component';
import { MasterComponent } from './components/layouts/master/master.component';
import { HomeComponent } from './components/pages/home/home.component';
import { PetsComponent } from './components/pages/pets/pets.component';
import { ProductComponent } from './components/pages/product/product.component';
import { BrandComponent } from './components/pages/brand/brand.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { NewspageComponent } from './components/pages/newspage/newspage.component';

import { CarouselModule } from 'ngx-owl-carousel-o';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSliderModule } from 'ngx-slider-v2';
import { DetailPetComponent } from './components/pages/detail-pet/detail-pet.component';
import { DetailProductComponent } from './components/pages/detail-product/detail-product.component';
import { DetailNewsComponent } from './components/pages/detail-news/detail-news.component';
import { CartComponent } from './components/pages/cart/cart.component';
import { CheckoutComponent } from './components/pages/checkout/checkout.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { RegisterComponent } from './components/pages/register/register.component';
import { LoginComponent } from './components/pages/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { NotfoundComponent } from './components/pages/notfound/notfound.component';
import { UserComponent } from './components/pages/user/user.component';
import { SearchComponent } from './components/pages/search/search.component';
import { NgxLoadingModule } from 'ngx-loading';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        MasterComponent,
        HomeComponent,
        PetsComponent,
        ProductComponent,
        BrandComponent,
        ContactComponent,
        NewspageComponent,
        DetailPetComponent,
        DetailProductComponent,
        DetailNewsComponent,
        CartComponent,
        CheckoutComponent,
        RegisterComponent,
        LoginComponent,
        NotfoundComponent,
        UserComponent,
        SearchComponent
    ],
    imports: [
        CommonModule,
        CustomerRoutingModule,
        FontAwesomeModule,
        CarouselModule,
        FormsModule,
        NgxSliderModule,
        NgxPaginationModule,
        HttpClientModule,
        ReactiveFormsModule,
        NgxLoadingModule
    ]
})
export class CustomerModule { }
