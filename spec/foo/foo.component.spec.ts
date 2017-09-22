// import * as fs from 'fs';
// import * as path from 'path';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { FooComponent } from '../../src/foo/foo.component';
import { setupComponentForTesting } from '../helpers/helpers';

import {
  ComponentFixture,
  TestBed,
  getTestBed,
  ComponentFixtureAutoDetect,
} from '@angular/core/testing';

describe('FooComponent', () => {
  describe('testing the component as pure class', () => {
    let subject: FooComponent;

    beforeEach(() => {
      subject = new FooComponent();
      subject.bar = 15;
    });

    describe('ngOnInit', () => {
      beforeEach(() => {
        subject.ngOnInit();
      });

      it('sets content property', () => {
        expect(subject.content).toBeTruthy();
      });
    });

    describe('sense', () => {
      it('adds 5 to the bar attribute', () => {
        expect(subject.sense).toEqual(20);
      });
    });
  });

  describe('testing the component in angular context', () => {
    let subject: FooComponent;
    let fixture: ComponentFixture<FooComponent>;
    let domElement: HTMLElement;

    beforeEach(() => {
      setupComponentForTesting(FooComponent, ['..', '..', 'src', 'foo', 'foo.component.html']);

      TestBed.configureTestingModule({
        declarations: [FooComponent],
        providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }],
        schemas: [NO_ERRORS_SCHEMA],
      });

      TestBed.compileComponents();

      fixture = TestBed.createComponent(FooComponent);
      subject = fixture.componentInstance;
      domElement = fixture.nativeElement;
    });

    afterEach(() => {
      getTestBed().resetTestingModule();
    });

    it('sets the content property', () => {
      expect(subject.content).toBeTruthy();
    });

    it('renders the template with content', () => {
      expect(domElement.innerHTML).toContain(`<span class="content">${subject.content}</span>`);
    });

    it('renders the template with sense property', () => {
      expect(domElement.innerHTML).toContain(`<span class="sense">${subject.sense}!</span>`);
    });
  });
});
