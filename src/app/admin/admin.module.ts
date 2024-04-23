import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { UsersComponent } from 'app/admin/module/users/users.component';
import { CategoriesComponent } from 'app/admin/module/categories/categories.component';
import { ProductsComponent } from 'app/admin/module/products/products.component';
import { AdminRoutes } from './admin.routing';
import { DashboardComponent } from './module/dashboard/dashboard.component';
import { UserProfileComponent } from './module/user-profile/user-profile.component';
import { TableListComponent } from './module/table-list/table-list.component';
import { TypographyComponent } from './module/typography/typography.component';
import { IconsComponent } from './module/icons/icons.component';
import { MapsComponent } from './module/maps/maps.component';
import { NotificationsComponent } from './module/notifications/notifications.component';
import { UpgradeComponent } from './module/upgrade/upgrade.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AdminRoutes),
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatRippleModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatTooltipModule,
    ],
    declarations: [
        DashboardComponent,
        UserProfileComponent,
        TableListComponent,
        TypographyComponent,
        IconsComponent,
        MapsComponent,
        NotificationsComponent,
        UpgradeComponent,
        UsersComponent,
        CategoriesComponent,
        ProductsComponent
    ]
})

export class AdminModule { }
