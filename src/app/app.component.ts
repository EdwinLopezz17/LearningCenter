import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'LEARNING-CENTER-SV52';
  options = [
    {path: '/home', title: 'Home'},
    {path: '/learning/students', title: 'Students'},
    {path: '/about', title: 'About'},
  ]


}
