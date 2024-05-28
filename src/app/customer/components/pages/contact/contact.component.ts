import { Component } from '@angular/core';
import { faPhone, faLocationDot, faEnvelope, faUser, faComment } from '@fortawesome/free-solid-svg-icons';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  public faPhone = faPhone;
  public faLocationDot = faLocationDot;
  public faEnvelope = faEnvelope;
  public faUser = faUser;
  public faComment = faComment;

  public constructor(private titleService:Title) {
    this.titleService.setTitle('Liên hệ');
    $('html, body').animate({scrollTop:0}, 0);
  }
}
