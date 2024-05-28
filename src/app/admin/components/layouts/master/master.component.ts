import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faBars, faSearch, faHouse, faWindowMaximize, faRightFromBracket, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css']
})
export class MasterComponent {
  public faBars = faBars;
  public faSearch = faSearch;
  public faHouse = faHouse;
  public faWindowMaximize = faWindowMaximize;
  public faRightFromBracket = faRightFromBracket;
  public faAngleDown = faAngleDown;
  public faUser = faUser;

  public user:any = false;
  public navBar = true;

  public constructor (private categoryService:CategoryService, private router:Router) {
    window.addEventListener('resize', (e) => {
      const x = (e.target as any).innerWidth;
      if(x < 992) {
        const menuLeft = document.querySelector('.menu-left') as HTMLElement;
        const boxRight = document.querySelector('.right') as HTMLElement;
        menuLeft.style.transform = 'translateX(-250px)';
        boxRight.style.marginLeft = '0px';
        this.navBar = false;
      } else {
        const menuLeft = document.querySelector('.menu-left') as HTMLElement;
        const boxRight = document.querySelector('.right') as HTMLElement;
        menuLeft.style.transform = 'translateX(0)';
        boxRight.style.marginLeft = '250px';
        this.navBar = true;
      }
    });
    window.addEventListener('load', () => {
      this.categoryService.setLocalstorageQuery({});
    });
    const auth:any = localStorage.getItem('auth');
    this.user = auth ? JSON.parse(auth) : false;
  }

  public handleStyleActive() {
    const listMenuLink = document.querySelectorAll('.list-menu li a') as any;
    listMenuLink.forEach((item:Node) => {
      if(document.location.href.indexOf((item as HTMLLinkElement).href) != -1) (item as HTMLLinkElement).classList.add('active');
      else (item as HTMLLinkElement).classList.remove('active');
    });
    return '';
  }

  public onNavBar () {
    const menuLeft = document.querySelector('.menu-left') as HTMLElement;
    const boxRight = document.querySelector('.right') as HTMLElement;
    if(this.navBar) {
      menuLeft.style.transform = 'translateX(-250px)';
      boxRight.style.marginLeft = '0px';
    } else {
      menuLeft.style.transform = 'translateX(0)';
      boxRight.style.marginLeft = '250px';
    }
    this.navBar = !this.navBar;
  }

  public resetLocalstorageQuery() {
    this.categoryService.setLocalstorageQuery({});
  }

  public logout() {
    localStorage.removeItem('auth');
    localStorage.removeItem('token');
    localStorage.clear();
    window.location.href = '/admin/login';
    // this.router.navigate(['/admin/dang-nhap']);
  }
}
