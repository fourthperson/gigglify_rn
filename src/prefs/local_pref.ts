import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  keyDateFormat,
  routes,
  valDisabled,
  valEnabled,
} from '../config/config.ts';
import {getDateFormatPattern, toggleArray} from '../util/utils.ts';
import {getLocales, uses24HourClock} from 'react-native-localize';

export async function setPrefItem(key: string, value: string) {
  await AsyncStorage.setItem(key, value);
}

export async function getPrefItem(key: string): Promise<string | null> {
  return await AsyncStorage.getItem(key);
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

export async function loadCheckedCategories(): Promise<boolean[]> {
  let array: boolean[] = [];
  for (let i = 0; i < routes.length; i++) {
    array[i] = (await getPrefItem(routes[i])) === valEnabled;
  }
  array = toggleArray(array);
  return array;
}

export async function saveCheckedCategories(array: boolean[]): Promise<void> {
  for (let i = 0; i < routes.length; i++) {
    const value = array[i] ? valEnabled : valDisabled;
    await setPrefItem(routes[i], value);
  }
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
