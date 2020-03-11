export const isNumericField = (x: __esri.Field) => x.type === 'integer' || x.type === 'double';

export const isRenter = (x: __esri.Field) => x.name.toLowerCase().indexOf('renter') > -1;

export const isSelected = (target: string) => (x: any) => x.id === target;
