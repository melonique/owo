import { getRange } from './ListingClient';

it('should return [0, 11] if page is negative', () => {
    expect(getRange(-1)).toEqual([0, 11]);
});

it('should return [0, 11] when first page asked', () => {
    expect(getRange(1)).toEqual([0, 11]);
});

it('should return [36, 47] when fourth page asked', () => {
    expect(getRange(4)).toEqual([36, 47]);
})
