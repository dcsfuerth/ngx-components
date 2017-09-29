import * as numeral from 'numeral';
import 'numeral/locales/de';
const now = require('performance-now');

import { NumeralPipe } from '../../src/pipes/numeral.pipe';

describe('NumeralPipe', () => {
  let subject: NumeralPipe;
  let originalFunction: any;

  beforeAll(() => {
    originalFunction = NumeralPipe.prototype.doTransform;
    spyOn(NumeralPipe.prototype, 'doTransform').and.callThrough();
  });

  afterAll(() => {
    NumeralPipe.prototype.doTransform = originalFunction;
  });

  beforeEach(() => {
    numeral.locale('en');
    (NumeralPipe.prototype.doTransform as any).calls.reset();
    subject = new NumeralPipe();
  });

  describe('formatting', () => {
    it('uses numeral.js formatting rules', () => {
      expect(subject.transform(42)).toEqual('42');
      expect(subject.transform(42, '')).toEqual('42');

      expect(subject.transform(42, '00:00:00')).toEqual('0:00:42');
      expect(subject.transform(42, '$0,0.00')).toEqual('$42.00');
      expect(subject.transform(42546, '0,0.0000')).toEqual('42,546.0000');
    });

    it('also evaluates the locale', () => {
      numeral.locale('de');
      expect(subject.transform(42546, '0,0.0000')).toEqual('42 546,0000');
    });
  });

  describe('caching', () => {
    it('hits the real function only once', () => {
      subject.transform(42);
      subject.transform(43);
      subject.transform(42);
      subject.transform(42);
      subject.transform(43);
      subject.transform(43);
      expect(subject.doTransform).toHaveBeenCalledTimes(2);
    });

    it('is at least 5 times faster than the original function call', () => {
      const beforeCached = now();
      for (let i = 0; i < 5000; i++) {
        subject.transform(43);
      }
      const afterCached = now();
      const timeCached = afterCached - beforeCached;

      const beforeUncached = now();
      for (let i = 0; i < 5000; i++) {
        subject.doTransform(43, null, 'en');
      }
      const afterUncached = now();
      const timeUncached = afterUncached - beforeUncached;

      expect(timeCached * 5).toBeLessThan(timeUncached);
    });
  });
});
