import { Component } from '@angular/core';
import { faMaskFace } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  public faFaceAngry = faMaskFace;
}
