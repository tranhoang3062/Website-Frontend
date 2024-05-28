import { Component } from '@angular/core';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.css']
})
export class NotfoundComponent {
  constructor() {
    $(document).ready(() => {
      function randomNum() {
        "use strict";
        return Math.floor(Math.random() * 9) + 1;
      }
      var loop1:any, loop2:any, loop3:any, time = 30, i = 0, number, selector3 = document.querySelector('.thirdDigit') as HTMLElement, selector2 = document.querySelector('.secondDigit') as HTMLElement,
        selector1 = document.querySelector('.firstDigit') as HTMLElement;
      loop3 = setInterval(function () {
        "use strict";
        if (i > 40) {
          clearInterval(loop3);
          selector3.textContent = '4';
        } else {
          selector3.textContent = randomNum() + '';
          i++;
        }
      }, time);
      loop2 = setInterval(function () {
        "use strict";
        if (i > 80) {
          clearInterval(loop2);
          selector2.textContent = '0';
        } else {
          selector2.textContent = randomNum() + '';
          i++;
        }
      }, time);
      loop1 = setInterval(function () {
        "use strict";
        if (i > 100) {
          clearInterval(loop1);
          selector1.textContent = '4';
        } else {
          selector1.textContent = randomNum() + '';
          i++;
        }
      }, time);
    })
  }
}
