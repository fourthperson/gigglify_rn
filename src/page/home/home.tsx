import React, {useEffect, useState, useRef, useCallback} from 'react';
import {
  ActivityIndicator,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  blackColor,
  boldFont,
  mediumFont,
  primaryColor,
  whiteColor,
} from '../../config/theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import {appAxios} from '../../..';
import HistorySvg from '../../../assets/images/history.svg';
import SettingsSvg from '../../../assets/images/settings.svg';
import ShareSvg from '../../../assets/images/share.svg';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import SettingsSheet from '../settings/settings.tsx';
import {useRealm} from '@realm/react';
import HistorySheet from '../history/history.tsx';
import {shareText} from '../../util/utils.ts';
import {SavedJoke} from '../../types/types.ts';
import {useTranslation} from 'react-i18next';
import {Joke} from '../../types/types.ts';
import {loadRoute} from '../../prefs/local_pref.ts';

const HomePage = (): React.JSX.Element => {
  const {t} = useTranslation();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [joke, setJoke] = useState<Joke | null>(null);

  const realm = useRealm();

  const settingsModalRef = useRef<BottomSheetModal>(null);
  const historyModalRef = useRef<BottomSheetModal>(null);

  const loadJoke = useCallback(async () => {
    setIsLoading(true);
    try {
      const url: string = await loadRoute();
      const response = await appAxios.get(url);
      if (response.status !== 200 || response.data.error === true) {
        return;
      }

      const j: Joke = {
        time: Date.now().toString(),
        category: response.data.category,
        content:
          response.data.type === 'twopart'
            ? response.data.setup + '\n\n' + response.data.delivery
            : response.data.joke,
      };

      try {
        realm.write(() => {
          try {
            realm.create(SavedJoke.schema.name, {
              time: j.time,
              category: j.category,
              content: j.content,
            });
          } catch (e) {
            console.error(e);
          }
        });
      } catch (e) {
        console.error(e);
      }

      setJoke(j);
    } catch (e) {
      console.error(e);
    }
    setIsLoading(false);
  }, [realm]);

  useEffect(() => {
    loadJoke().then();
  }, [loadJoke]);

  const share = useCallback(() => {
    if (joke === null) {
      return;
    }
    shareText(joke.content);
  }, [joke]);

  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <StatusBar
          backgroundColor={'transparent'}
          barStyle={'dark-content'}
          translucent={true}
        />
        <SafeAreaView style={styles.container}>
          {isLoading ? (
            <View style={styles.centeredItems}>
              <ActivityIndicator
                size={Platform.OS === 'ios' ? 'small' : 'large'}
                color={primaryColor}
              />
            </View>
          ) : (
            <View style={styles.container}>
              <TouchableOpacity style={styles.container} onPress={loadJoke}>
                <View style={styles.centeredItems}>
                  <Text style={styles.categoryText}>
                    {joke === null ? '' : joke.category}
                  </Text>
                  <Text style={styles.jokeText}>
                    {joke === null ? t('usage_description1') : joke.content}
                  </Text>
                </View>
              </TouchableOpacity>
              <View style={styles.actionsContainer}>
                <TouchableOpacity
                  onPress={() => settingsModalRef.current?.present()}>
                  <SettingsSvg height={28} width={28} color={blackColor} />
                </TouchableOpacity>
                <TouchableOpacity onPress={share}>
                  <ShareSvg height={36} width={36} color={primaryColor} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => historyModalRef.current?.present()}>
                  <HistorySvg height={28} width={28} color={blackColor} />
                </TouchableOpacity>
              </View>
              <View style={styles.directionsContainer}>
                <Text style={styles.directionsText}>
                  {t('usage_description')}
                </Text>
              </View>
            </View>
          )}
        </SafeAreaView>
      </View>
      <BottomSheetModal
        ref={settingsModalRef}
        snapPoints={['50%']}
        backdropComponent={props => ModalBackdrop(props)}>
        <SettingsSheet />
      </BottomSheetModal>
      <BottomSheetModal
        ref={historyModalRef}
        snapPoints={['50%']}
        backdropComponent={ModalBackdrop}>
        <HistorySheet />
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

const ModalBackdrop = (props: BottomSheetBackdropProps): React.JSX.Element => {
  return (
    <BottomSheetBackdrop
      style={styles.backdropStyle}
      {...{
        ...props,
        appearsOnIndex: 0,
        disappearsOnIndex: -1,
        opacity: 0.5,
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: whiteColor,
  },
  centeredItems: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  categoryText: {
    fontSize: 18,
    fontFamily: boldFont,
    textAlign: 'center',
    marginBottom: 36,
  },
  jokeText: {
    fontSize: 18,
    fontFamily: mediumFont,
  },
  directionsText: {
    fontFamily: mediumFont,
    fontSize: 12,
  },
  directionsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 4,
  },
  actionsContainer: {
    height: '10%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingStart: 30,
    paddingEnd: 30,
  },
  backdropStyle: {
    backgroundColor: blackColor,
  },
});

export default HomePage;
