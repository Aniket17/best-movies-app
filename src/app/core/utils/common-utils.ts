import { NameIdModel } from '../_models/base.model';

export function firstLetterCaps(str: string) {
  str = str.toLowerCase();
  let capStr = str
    .split(' ')
    .map((s) => {
      return s.charAt(0).toUpperCase() + s.slice(1);
    })
    .join(' ');
  return capStr;
}

export function fromCamelCaseToWords(key: string) {
  return key
    .replace(/[\w]([A-Z])/g, function (m) {
      return firstLetterCaps(m[0]) + ' ' + firstLetterCaps(m[1]);
    })
    .toLowerCase();
}

export function enumToNameId(en): NameIdModel[] {
  return Object.keys(en)
    .filter((x) => Number.isNaN(parseInt(x)))
    .map((key) => {
      return {
        id: en[key],
        name: firstLetterCaps(key.replace(/_/g, ' ')),
      };
    });
}
