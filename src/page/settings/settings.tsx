import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {BottomSheetFlatList, BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {
  blackColor,
  mediumFont,
  primaryColor,
  regularFont,
  whiteColor,
} from '../../config/theme.ts';
import {useTranslation} from 'react-i18next';
import {toggleArray} from '../../util/utils.ts';
import OptionTile from '../../components/OptionTile.tsx';
import {
  loadCheckedCategories,
  saveCheckedCategories,
} from '../../prefs/local_pref.ts';

const SettingsSheet = (): React.JSX.Element => {
  const {t} = useTranslation();

  const categories = [
    t('category_any'),
    t('category_dark'),
    t('category_pun'),
    t('category_spooky'),
    t('category_christmas'),
    t('category_programming'),
    t('category_misc'),
  ];

  const [loading, setLoading] = useState(true);
  const [checked, setChecked] = useState<boolean[] | null>(null);

  console.log(checked);

  useEffect(() => {
    async function load() {
      const checkedArray = await loadCheckedCategories();
      setChecked(checkedArray);
      setLoading(false);
    }

    load().then();
  }, []);

  return (
    <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
      <Text style={styles.titleStyle}>{t('preferences')}</Text>
      <Text style={styles.optionLabel}>{t('allowed_categories')}</Text>
      <View style={styles.spacer} />
      {loading && (
        <ActivityIndicator
          style={styles.loadingIndicator}
          size={Platform.OS === 'ios' ? 'small' : 'large'}
          color={primaryColor}
        />
      )}
      {checked !== null && (
        <BottomSheetFlatList
          data={checked}
          scrollEnabled={false}
          // keyExtractor={item => categories.indexOf(item).toString()}
          renderItem={({item, index}) => (
            <OptionTile
              isChecked={item}
              label={categories[index]}
              onChecked={async (c: boolean) => {
                console.log(categories[index] + ' checked: ' + c);
                let a = [...checked];
                a[index] = c;
                a = toggleArray(a);
                await saveCheckedCategories(a);
                setChecked(a);
              }}
            />
          )}
        />
      )}
    </BottomSheetScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'flex-start',
    paddingStart: 24,
    paddingEnd: 24,
    paddingBottom: 16,
    paddingTop: 8,
  },
  background: {
    color: blackColor,
  },
  titleStyle: {
    fontSize: 20,
    fontFamily: mediumFont,
    color: blackColor,
    alignSelf: 'center',
  },
  optionLabel: {
    fontFamily: regularFont,
    fontSize: 16,
    color: blackColor,
    marginStart: 10,
  },
  spacer: {
    height: 10,
  },
  button: {
    alignSelf: 'center',
    backgroundColor: primaryColor,
    borderRadius: 8,
    paddingTop: 10,
    paddingBottom: 10,
    paddingStart: 32,
    paddingEnd: 32,
  },
  buttonLabel: {
    color: whiteColor,
    fontFamily: mediumFont,
    fontSize: 16,
  },
  loadingIndicator: {
    paddingTop: 50,
    paddingBottom: 50,
    alignSelf: 'center',
  },
});

export default SettingsSheet;
