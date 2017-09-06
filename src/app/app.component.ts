import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    public title: string = 'Rogue';
    public activePage: string = 'characterCreation';
    public headerImage: string = '/assets/images/Title.jpg';
}
