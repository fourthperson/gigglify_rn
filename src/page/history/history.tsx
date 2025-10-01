import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import {blackColor, mediumFont} from '../../config/theme.ts';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {useQuery} from '@realm/react';
import {getPrefItem} from '../../prefs/local_pref.ts';
import {keyDateFormat} from '../../config/config.ts';
import {SavedJoke} from '../../types/types.ts';
import {useTranslation} from 'react-i18next';
import {Joke} from '../../types/types.ts';
import HistoryItem from '../../components/HistoryItem.tsx';
import {FlashList} from '@shopify/flash-list';

const HistorySheet = (): React.JSX.Element => {
  const {t} = useTranslation();

  const [jokes, setJokes] = useState<Joke[]>([]);
  const [dateFormat, setDateFormat] = useState('DD MMM YYYY h:mm A');

  const query = useQuery(SavedJoke);

  const loadJokes = useCallback(() => {
    let array: Joke[] = [];
    query.sorted([['time', true]]).map((item: SavedJoke) => {
      array.push({
        time: item.time,
        category: item.category,
        content: item.content,
      });
    });
    setJokes(array);
  }, [query]);

  const getDateFormat = useCallback(async () => {
    let df = await getPrefItem(keyDateFormat);
    df = df === null ? 'DD MMM YYYY h:mm A' : df;
    setDateFormat(df);
  }, []);

  useEffect(() => {
    getDateFormat().then();
  }, [getDateFormat]);

  useEffect(() => {
    loadJokes();
  }, [loadJokes]);

  return (
    <BottomSheetScrollView style={styles.contentContainer}>
      <Text style={styles.titleStyle}>{t('history')}</Text>
      <FlashList
        data={jokes}
        scrollEnabled={false}
        keyExtractor={item => item.time.toString()}
        renderItem={({item}) => <HistoryItem joke={item} format={dateFormat} />}
      />
    </BottomSheetScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingStart: 24,
    paddingEnd: 24,
    paddingBottom: 16,
    paddingTop: 8,
  },
  titleStyle: {
    fontSize: 20,
    fontFamily: mediumFont,
    color: blackColor,
    alignSelf: 'center',
  },
});

export default HistorySheet;
