import React, {
    useEffect,
    useState,
    useRef,
} from 'react';
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
    primaryDarkColor,
} from '../../config/theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import {appAxios} from '../../..';
import Icon from 'react-native-vector-icons/Ionicons';
import {
    BottomSheetBackdrop,
    BottomSheetBackdropProps,
    BottomSheetModal,
    BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import SettingsSheet from '../settings/settings.tsx';
import {useRealm} from '@realm/react';
import HistoryShaet from '../history/history.tsx';
import {
    loadRoute,
    shareText,
} from '../../util/utils.ts';
import {SavedJoke} from '../../model/db/schema.ts';
import {useTranslation} from 'react-i18next';

function HomePage(): React.JSX.Element {

    const {t} = useTranslation();

    const [isLoading, setIsLoading] = useState(false);
    const [joke, setJoke] = useState({});

    const realm = useRealm();

    const settingsSheetModalRef = useRef<BottomSheetModal>(null);
    const historySheetModalRef = useRef<BottomSheetModal>(null);

    async function loadJoke(): Promise<void> {
        settingsSheetModalRef.current?.close();
        historySheetModalRef.current?.close();

        setIsLoading(true);
        try {
            const response = await appAxios.get(await loadRoute());
            if (response.status === 200) {
                if (response.data.error === true) {
                    return;
                }

                let j = response.data;
                if (j.type !== 'single') {
                    j.joke = j.setup + '\n\n' + j.delivery;
                }

                setJoke(j);
                saveJoke();
            }
        } catch (e) {
            console.error(e);
        }
        setIsLoading(false);
    }

    function saveJoke() {
        try {
            // @ts-ignore
            if (!joke.category || !joke.joke) {
                return;
            }
            realm.write(() => {
                try {
                    realm.create(SavedJoke.schema.name, {
                        time: Date.now().toString(),
                        // @ts-ignore
                        category: joke.category,
                        // @ts-ignore
                        content: joke.joke,
                    });
                } catch (e) {
                    console.error(e);
                }
            });
        } catch (e) {
            console.error(e);
        }
    }

    function jokeEmpty(): Boolean {
        // @ts-ignore
        return joke === {};
    }

    function share() {
        if (jokeEmpty()) {
            return;
        }
        // @ts-ignore
        shareText(joke.joke);
    }

    function settings() {
        settingsSheetModalRef.current?.present();
    }

    function history() {
        historySheetModalRef.current?.present();
    }

    useEffect(() => {
        loadJoke().then();
    }, []);

    return (
        <BottomSheetModalProvider>
            <View style={styles.container}>
                <StatusBar backgroundColor={primaryDarkColor}/>
                <SafeAreaView style={styles.container}>
                    {
                        isLoading ?
                            <View style={styles.centeredItems}>
                                <ActivityIndicator
                                    size={Platform.OS === 'ios' ? 'small' : 'large'}
                                    color={primaryColor}/>
                            </View>
                            :
                            <View style={styles.container}>
                                <TouchableOpacity
                                    style={styles.container}
                                    onPress={loadJoke}>
                                    <View style={styles.centeredItems}>
                                        <Text style={styles.categoryText}>
                                            {
                                                // @ts-ignore
                                                jokeEmpty() ? '' : joke.category
                                            }
                                        </Text>
                                        <Text style={styles.jokeText}>
                                            {
                                                // @ts-ignore
                                                jokeEmpty() ? t('usage_description1') : joke.joke
                                            }
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                                <View style={styles.actionsContainer}>
                                    <TouchableOpacity onPress={settings}>
                                        <Icon name="settings-outline" size={28} color={blackColor}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={share}>
                                        <Icon name="share-social-outline" size={36} color={primaryColor}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={history}>
                                        <Icon name="time-outline" size={28} color={blackColor}/>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.directionsContainer}>
                                    <Text style={styles.directionsText}>
                                        {
                                            t('usage_description')
                                        }
                                    </Text>
                                </View>
                            </View>
                    }
                </SafeAreaView>
            </View>
            <BottomSheetModal
                ref={settingsSheetModalRef}
                backdropComponent={(props) => ModalBackdrop(props)}>
                <SettingsSheet/>
            </BottomSheetModal>
            <BottomSheetModal
                ref={historySheetModalRef}
                snapPoints={['50%']}
                backdropComponent={ModalBackdrop}>
                <HistoryShaet/>
            </BottomSheetModal>
        </BottomSheetModalProvider>
    );
}

function ModalBackdrop(props: BottomSheetBackdropProps): React.JSX.Element {
    return <BottomSheetBackdrop
        style={styles.backdropStyle}
        {...{
            ...props,
            appearsOnIndex: 0,
            disappearsOnIndex: -1,
            opacity: 0.5,
        }}
    />;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee4fb',
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
