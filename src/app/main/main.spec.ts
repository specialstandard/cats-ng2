/// <reference path="../../../typings/index.d.ts"/>

import 'zone.js/dist/zone';
import 'zone.js/dist/async-test';
import {Component} from '@angular/core';
import {MainComponent} from './main';
import {PetsComponent} from '../pets/pets';
import {FooterComponent} from '../footer/footer';
import {HeaderComponent} from '../header/header';
import {TitleComponent} from '../title/title';
import {inject, async, TestComponentBuilder, ComponentFixture} from '@angular/core/testing';

@Component({
  selector: 'cats-pets',
  template: ''
})
class MockPetsComponent {}
@Component({
  selector: 'cats-footer',
  template: ''
})
class MockFooterComponent {}
@Component({
  selector: 'cats-header',
  template: ''
})
class MockHeaderComponent {}
@Component({
  selector: 'cats-title',
  template: ''
})
class MockTitleComponent {}

describe('main component', () => {
  it('should render the header, title, pets and footer', async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
    tcb
      .overrideDirective(MainComponent, PetsComponent, MockPetsComponent)
      .overrideDirective(MainComponent, FooterComponent, MockFooterComponent)
      .overrideDirective(MainComponent, HeaderComponent, MockHeaderComponent)
      .overrideDirective(MainComponent, TitleComponent, MockTitleComponent)
      .createAsync(MainComponent)
      .then((fixture: ComponentFixture<any>) => {
        fixture.detectChanges();
        const main = fixture.nativeElement;
        expect(main.querySelector('cats-header')).toBeDefined();
        expect(main.querySelector('cats-title')).toBeDefined();
        expect(main.querySelector('cats-pets')).toBeDefined();
        expect(main.querySelector('cats-footer')).toBeDefined();
      });
  })));
});
