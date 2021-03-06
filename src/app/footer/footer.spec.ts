/// <reference path="../../../typings/index.d.ts"/>

import 'reflect-metadata';
import 'zone.js/dist/zone';
import 'zone.js/dist/async-test';
import {FooterComponent} from './footer';
import {inject, async, TestComponentBuilder, ComponentFixture} from '@angular/core/testing';

describe('footer component', () => {
  it('should render Brian Ardito', async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
    tcb.createAsync(FooterComponent)
      .then((fixture: ComponentFixture<any>) => {
        fixture.detectChanges();
        const footer = fixture.nativeElement;
        expect(footer.querySelector('span').textContent.trim()).toBe('Brian Ardito');
      });
  })));
});
