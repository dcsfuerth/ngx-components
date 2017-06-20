import { expect } from 'chai';

import { FooComponent } from './foo.component';

describe('FooComponent', () => {
  let subject: FooComponent;

  beforeEach(() => {
    subject = new FooComponent();
  });

  describe('ngOnInit', () => {
    beforeEach(() => {
      subject.ngOnInit();
    });

    it('sets an uuid', () => {
      console.log(subject.uuid);
      expect(subject.uuid).to.be.not.empty;
    });
  });
});
