import {Component, Input} from '@angular/core';
import {Pet} from './pets';

@Component({
  selector: 'cats-pet',
  template: require('./pet.html')
})
export class PetComponent {
  @Input() public pet: any;
}
