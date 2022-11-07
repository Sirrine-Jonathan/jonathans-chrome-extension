import { getStyleString } from '../../src/helpers/common';

describe('common helpers tests', () => {
  describe('getStyleString tests', () => {
    it('should return a style string given a config object', () => {
      expect(getStyleString({ color: 'red' })).toBe('color: red');
    });
  });
});
