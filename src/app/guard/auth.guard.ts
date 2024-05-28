import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
    const auth: any = localStorage.getItem('auth');
    const user = auth ? JSON.parse(auth) : undefined;
    // if(window.location.href.indexOf('/admin/dang-nhap') !== -1) return true;
    if (user) {
        if (user.role === 0) {
            return true;
        } else {
            window.location.href = '/admin/login';
            return false;
        }
    } else {
        window.location.href = '/admin/login';
        return false;
    }
};
