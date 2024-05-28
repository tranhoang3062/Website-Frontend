import { Component } from '@angular/core';
import { faAngleUp, faPaw } from '@fortawesome/free-solid-svg-icons';
import 'src/assets/plugin/Jquery/jquery-3.3.1.slim.min.js';
import 'src/assets/js/jquery.js';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css']
})
export class MasterComponent {
  public faAngleUp = faAngleUp;
  public faPaw = faPaw;
}
