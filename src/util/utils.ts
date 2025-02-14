import {Share} from 'react-native';
import {
    getLocales,
    uses24HourClock,
} from 'react-native-localize';
import {
    getPrefItem,
    setPrefItem,
} from '../prefs/local_pref.ts';
import {
    routes,
    keyDateFormat,
} from '../config/config.ts';

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

    return new Intl.DateTimeFormat(locale).formatToParts(new Date('2021-01-01'))
        .map(getPatternForPart)
        .join('');
}


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

        const dateFormat = getDateFormatPattern(locale).toUpperCase();

        await setPrefItem(keyDateFormat, `${dateFormat} ${timeFormat}`);
    } catch (e) {
        console.error(e);
    }
}

export async function loadRoute(): Promise<string> {
    try {
        let route = '';
        for (let i = 0; i < routes.length; i++) {
            const val = await getPrefItem(routes[i]);
            const selected = val !== null && val === '1';
            if (selected) {
                if (i === 0) {
                    return routes[0];
                } else {
                    route += routes[i] + ',';
                }
            }
        }
        if (route !== routes[0]) {
            route = route.substring(0, route.length - 1);
        }
        return route === '' ? routes[0] : route;
    } catch (e) {
        console.error(e);
    }
    return routes[0];
}
