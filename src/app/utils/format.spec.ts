import { formatCount } from './format';

describe('formatCount', () => {
  it('usa el punto como separador de miles', () => {
    expect(formatCount(251303)).toBe('251.303');
    expect(formatCount(1234567)).toBe('1.234.567');
  });

  it('deja tal cual los números pequeños', () => {
    expect(formatCount(0)).toBe('0');
    expect(formatCount(42)).toBe('42');
  });
});
