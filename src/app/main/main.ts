import {Component} from '@angular/core';
import {HeaderComponent} from '../header/header';
import {TitleComponent} from '../title/title';
import {PetsComponent} from '../pets/pets';
import {FooterComponent} from '../footer/footer';

@Component({
  selector: 'cats-app',
  template: require('./main.html'),
  directives: [HeaderComponent, TitleComponent, PetsComponent, FooterComponent]
})
export class MainComponent {}
