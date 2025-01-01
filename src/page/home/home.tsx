import React, {
    useEffect,
    useState,
    useRef,
} from 'react';
import {
    ActivityIndicator,
    StatusBar,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import {
    blackColor,
    boldFont,
    mediumFont,
    primaryColor,
    primaryDarkColor,
    whiteColor,
} from '../../config/theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import {appAxios} from '../../..';
import Icon from 'react-native-vector-icons/Ionicons';
import {
    BottomSheetModal,
    BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import SettingsSheet from '../settings/settings.tsx';
import {useRealm} from '@realm/react';
import {categories} from '../../config/config.ts';
import HistoryShaet from '../history/history.tsx';
import {loadRoute, shareText} from '../../util/utils.ts';

function HomePage(): React.JSX.Element {

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
            const route = await loadRoute();
            const response = await appAxios.get(route ?? categories[0]);
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
            realm.write(() => {
                try {
                    realm.create('joke', {
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
                                    size="large"
                                    color={primaryColor}/>
                            </View>
                            :
                            <View style={styles.container}>
                                <TouchableWithoutFeedback
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
                                                jokeEmpty() ? 'Tap the screen to load a joke' : joke.joke
                                            }
                                        </Text>
                                    </View>
                                </TouchableWithoutFeedback>
                                <View style={styles.actionsContainer}>
                                    <TouchableWithoutFeedback onPress={settings}>
                                        <Icon name="settings-outline" size={28} color={blackColor}/>
                                    </TouchableWithoutFeedback>
                                    <TouchableWithoutFeedback onPress={share}>
                                        <Icon name="share-social-outline" size={36} color={primaryColor}/>
                                    </TouchableWithoutFeedback>
                                    <TouchableWithoutFeedback onPress={history}>
                                        <Icon name="time-outline" size={28} color={blackColor}/>
                                    </TouchableWithoutFeedback>
                                </View>
                                <View style={styles.directionsContainer}>
                                    <Text style={styles.directionsText}>
                                        Press anywhere on the screen for another joke
                                    </Text>
                                </View>
                            </View>
                    }
                </SafeAreaView>
            </View>
            <BottomSheetModal
                ref={settingsSheetModalRef}>
                <SettingsSheet/>
            </BottomSheetModal>
            <BottomSheetModal
                ref={historySheetModalRef}
                snapPoints={['50%']}>
                <HistoryShaet/>
            </BottomSheetModal>
        </BottomSheetModalProvider>
    );
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
});

export default HomePage;
