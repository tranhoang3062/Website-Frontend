import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
    let auth: any;
    if (window.location.pathname.includes('admin')) auth = localStorage.getItem('auth_adm');
    else auth = localStorage.getItem('auth_cli');

    const user = auth ? JSON.parse(auth) : null;
    if (user) return true;
    else {
        if (window.location.pathname.includes('admin')) {
            window.location.href = '/admin/login';
            return false;
        } else {
            return false;
        }
    }
};
