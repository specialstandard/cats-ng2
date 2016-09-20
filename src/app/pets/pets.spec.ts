/// <reference path="../../../typings/index.d.ts"/>

import 'zone.js/dist/zone';
import 'zone.js/dist/async-test';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {Http, BaseRequestOptions, Response, ResponseOptions} from '@angular/http';
import {Component, Input, provide} from '@angular/core';
import {PetsComponent, Pet} from './pets';
import {PetComponent} from './pet';
import {inject, async, TestComponentBuilder, ComponentFixture, addProviders} from '@angular/core/testing';

import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'cats-pet',
  template: ''
})
class MockComponent {
  @Input() public pet: Pet;
}

const petsJson = [  
   {  
      "name":"Bob",
      "gender":"Male",
      "age":23,
      "pets":[  
         {  
            "name":"Garfield",
            "type":"Cat"
         },
         {  
            "name":"Fido",
            "type":"Dog"
         }
      ]
   },
   {  
      "name":"Jennifer",
      "gender":"Female",
      "age":18,
      "pets":[  
         {  
            "name":"Garfield",
            "type":"Cat"
         }
      ]
   },
   {  
      "name":"Steve",
      "gender":"Male",
      "age":45,
      "pets":null
   },
   {  
      "name":"Fred",
      "gender":"Male",
      "age":40,
      "pets":[  
         {  
            "name":"Tom",
            "type":"Cat"
         },
         {  
            "name":"Max",
            "type":"Cat"
         },
         {  
            "name":"Sam",
            "type":"Dog"
         },
         {  
            "name":"Jim",
            "type":"Cat"
         }
      ]
   },
   {  
      "name":"Samantha",
      "gender":"Female",
      "age":40,
      "pets":[  
         {  
            "name":"Tabby",
            "type":"Cat"
         }
      ]
   },
   {  
      "name":"Alice",
      "gender":"Female",
      "age":64,
      "pets":[  
         {  
            "name":"Simba",
            "type":"Cat"
         },
         {  
            "name":"Nemo",
            "type":"Fish"
         }
      ]
   }
];

describe('pets component', () => {
  describe('pets component methods', () => {
    beforeEach(() => {
      addProviders([
        PetsComponent,
        MockBackend,
        BaseRequestOptions,
        provide(Http, {
          useFactory: (backend, defaultOptions) => new Http(backend, defaultOptions),
          deps: [MockBackend, BaseRequestOptions]
        })
      ]);
    });

    it('should get pets', async(inject([MockBackend, PetsComponent], (mockBackend: MockBackend, pets: PetsComponent) => {
      let conn: MockConnection;
      const response = new Response(new ResponseOptions({body: petsJson}));
      mockBackend.connections.subscribe((connection: MockConnection) => {
        conn = connection;
      });
      pets.getPets().subscribe((jsonObject => {
        pets.pets = jsonObject;
      }));
      conn.mockRespond(response);
      expect(pets.pets.length).toBe(3);
      mockBackend.verifyNoPendingRequests();
    })));
  });

  describe('pets component rendering', () => {
    beforeEach(() => {
      PetsComponent.prototype.getPets = function getPets () {
        const response = new Response(new ResponseOptions({body: petsJson}));
        return Observable.of(response).map(response => response.json());
      };
    });

    it('should mock the pets and render 6 elements <pet>', async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
      return tcb
        .overrideDirective(PetsComponent, PetComponent, MockComponent)
        .createAsync(PetsComponent)
        .then((fixture: ComponentFixture<any>) => {
          fixture.detectChanges();
          const pets = fixture.nativeElement;
          expect(pets.querySelectorAll('cats-pet').length).toBe(6);
        });
    })));
  });
});
