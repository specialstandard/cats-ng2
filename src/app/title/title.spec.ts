/// <reference path="../../../typings/index.d.ts"/>

import 'zone.js/dist/zone';
import 'zone.js/dist/async-test';
import {TitleComponent} from './title';
import {inject, async, TestComponentBuilder, ComponentFixture} from '@angular/core/testing';

describe('title component', () => {
  it('should render Cats!', async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
    tcb.createAsync(TitleComponent)
      .then((fixture: ComponentFixture<any>) => {
        fixture.detectChanges();
        const title = fixture.nativeElement;
        expect(title.querySelector('h1').textContent.trim()).toBe('Cats');
      });
  })));
});
