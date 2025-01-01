import {Share} from 'react-native';
import {
    getLocales,
    uses24HourClock,
} from 'react-native-localize';
import {getPrefItem, setPrefItem} from '../prefs/local_pref.ts';
import {categories, keyDateFormat} from '../config/config.ts';

export function shareText(text: string) {
    try {
        Share.share({
            message: text,
        }).then();
    } catch (e) {
        console.error(e);
    }
}

export const getDateFormatPattern = (locale: string) => {
    const getPatternForPart = (part: Intl.DateTimeFormatPart) => {
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
    };

    return new Intl.DateTimeFormat(locale).formatToParts(new Date('2021-01-01'))
        .map(getPatternForPart)
        .join('');
};

export async function readDateFormat() {
    try {
        const timeFormat = uses24HourClock() ? 'HH:mm' : 'h:mm A';

        const locales = getLocales();
        let locale = '';
        if (Array.isArray(locales) && locales.length > 0) {
            locale = locales[0].languageTag.toString();
        } else {
            return;
        }

        const dtFm = getDateFormatPattern(locale).toUpperCase();

        await setPrefItem(keyDateFormat, `${dtFm} ${timeFormat}`);
    } catch (e) {
        console.error(e);
    }
}

export async function loadRoute(): Promise<string | null> {
    try {
        let route = '';
        for (let i = 0; i < categories.length; i++) {
            const val = await getPrefItem(categories[i]);
            const selected = val !== null && val === '1';
            if (selected) {
                if (i === 0) {
                    return categories[0];
                } else {
                    route += categories[i] + ',';
                }
            }
        }
        if (route !== categories[0]) {
            route = route.substring(0, route.length - 1);
        }
        return route === '' ? null : route;
    } catch (e) {
        console.error(e);
    }
    return null;
}
