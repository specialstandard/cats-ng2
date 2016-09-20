import {Component} from '@angular/core';
import {Http, HTTP_PROVIDERS} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {PetComponent} from './pet';

export class Pet {
  constructor(
    public name: string,
    public gender: string,
    public age: number,
    public pets: any[]
  ) {}
}

@Component({
  selector: 'cats-pets',
  template: require('./pets.html'),
  directives: [PetComponent],
  providers: [HTTP_PROVIDERS]
})
export class PetsComponent {
  public pets: Pet[];
  public pet: Pet;
  public cats = {
      female: [],
      male: []
    }

  constructor(public http: Http) {
    this.sortCats()
  }

  getPets(): Observable<Pet[]> {
    return this.http
      .get('app/model/pets.json')
      .map(response => response.json());
  }

  sortCats(){

    this.getPets().subscribe(result => {
      
      let petsArray = result

      let owner;
      let pet;

      // Push them into male and female arrays, respectively

      for(var i = 0; i< petsArray.length; i++){
        owner = petsArray[i];
        if( owner.gender === 'Male' ){
          if(owner.pets){  
            for(var j = 0; j< owner.pets.length; j++){
              pet = owner.pets[j];
              if( pet.type === 'Cat' ){
                this.cats.male.push( pet );
              }
            }
          }
        } else if( owner.gender === 'Female' ){
            if( owner.pets){
              for(var j = 0; j< owner.pets.length; j++){
                pet = owner.pets[j];
                if( pet.type === 'Cat' ){
                  this.cats.female.push( pet );
                }
              }
            }
        } 
      }

      // Sort them by name alphabetically

      this.cats.female.sort( function(a,b){
        return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)
      });
      this.cats.male.sort(function(a,b){
        return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)
      });
      console.log('female: ', this.cats.female)
      console.log('male: ', this.cats.male)

    })
  }
}
