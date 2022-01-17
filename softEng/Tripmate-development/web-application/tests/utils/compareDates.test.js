import compareDates from '../../src/utils/compareDates';

describe('compare dates util function', () => {
  it('should return 0 if the dates are equal', () => {
    const date1 = '01-01-2020';
    const date2 = '01-01-2020';

    const result = compareDates(date1, date2);
    expect(result).toEqual(0);
  });
  it('should return -1 date1 occurs before date2', () => {
    const date1 = '01-01-2019';
    const date2 = '01-01-2020';

    const result = compareDates(date1, date2);
    expect(result).toEqual(-1);
  });
  it('should return -1 date1 occurs after date2', () => {
    const date1 = '01-01-2021';
    const date2 = '01-01-2020';

    const result = compareDates(date1, date2);
    expect(result).toEqual(1);
  });
});
