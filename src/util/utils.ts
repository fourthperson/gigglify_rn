import {Share} from 'react-native';

export function shareText(text: string) {
  try {
    Share.share({
      message: text,
    }).then();
  } catch (e) {
    console.error(e);
  }
}

export function getDateFormatPattern(locale: string): string {
  function getPatternForPart(part: Intl.DateTimeFormatPart): string {
    switch (part.type) {
      case 'day':
        return 'd'.repeat(part.value.length);
      case 'month':
        return 'm'.repeat(part.value.length);
      case 'year':
        return 'y'.repeat(part.value.length);
      case 'literal':
        return part.value;
      default:
        console.log('Unsupported date part', part);
        return '';
    }
  }

  return new Intl.DateTimeFormat(locale)
    .formatToParts(new Date('2021-01-01'))
    .map(getPatternForPart)
    .join('');
}

export function toggleArray(array: boolean[]): boolean[] {
  const a = [...array];

  if (a[0]) {
    for (let i = 0; i < a.length; i++) {
      a[i] = false;
    }
  } else {
    let count = 0;
    for (let j = 1; j < a.length; j++) {
      if (a[j]) {
        count++;
      }
    }

    if (count === 0) {
      a[0] = true;
    }
  }

  return [...a];
}
