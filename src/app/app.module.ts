import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AuthInterceptor } from './auth.interceptor';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FontAwesomeModule,
        CarouselModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FormsModule,
        NgxLoadingModule.forRoot({
            animationType: ngxLoadingAnimationTypes.circleSwish,
            backdropBackgroundColour: 'rgba(255,255,255,0.5)',
            backdropBorderRadius: '4px',
            primaryColour: '#ccc',
            secondaryColour: '#dd0031',
            tertiaryColour: '#1976d2',
            fullScreenBackdrop: true,
        }),
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
