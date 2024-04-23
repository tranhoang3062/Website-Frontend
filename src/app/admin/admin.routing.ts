import { Routes } from '@angular/router';

import { DashboardComponent } from './module/dashboard/dashboard.component';
import { UserProfileComponent } from './module/user-profile/user-profile.component';
import { TableListComponent } from './module/table-list/table-list.component';
import { TypographyComponent } from './module/typography/typography.component';
import { IconsComponent } from './module/icons/icons.component';
import { MapsComponent } from './module/maps/maps.component';
import { NotificationsComponent } from './module/notifications/notifications.component';
import { UpgradeComponent } from './module/upgrade/upgrade.component';
import { UsersComponent } from 'app/admin/module/users/users.component';
import { CategoriesComponent } from 'app/admin/module/categories/categories.component';
import { ProductsComponent } from 'app/admin/module/products/products.component';

export const AdminRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'user-profile', component: UserProfileComponent },
    { path: 'users', component: UsersComponent },
    { path: 'categories', component: CategoriesComponent },
    { path: 'products', component: ProductsComponent },
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    // { path: 'table-list',     component: TableListComponent },
    // { path: 'typography',     component: TypographyComponent },
    // { path: 'icons',          component: IconsComponent },
    // { path: 'maps',           component: MapsComponent },
    // { path: 'notifications',  component: NotificationsComponent },
    // { path: 'upgrade',        component: UpgradeComponent },
];
