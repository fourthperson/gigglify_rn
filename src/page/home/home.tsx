import React, {useEffect, useState, useRef} from 'react';
import {
    ActivityIndicator,
    Share,
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
import SettingsPage from '../settings/settings.tsx';
import {useRealm} from '@realm/react';
import {SavedJoke} from '../../model/db/schema.ts';

function HomePage(): React.JSX.Element {

    const [isLoading, setIsLoading] = useState(false);
    const [joke, setJoke] = useState({});

    const realm = useRealm();

    const settingsSheetModalRef = useRef<BottomSheetModal>(null);

    async function loadRoute() {
        try {
        } catch (e) {
        }
        return null;
    }

    async function loadJoke() {
        setIsLoading(true);
        try {
            const route = await loadRoute();
            const response = await appAxios.get(route ?? 'Any');
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
        realm.write(() => {
            realm.create('joke', {
                time: Date.now().toString(),
                category: joke.category,
                content: joke.joke,
            });
        });
        const jokes = realm.objects('joke');
        console.log(`${jokes.length} jokes saved`);
    }

    function jokeEmpty(): Boolean {
        // @ts-ignore
        return joke === {};
    }

    function settings() {
        settingsSheetModalRef.current?.present();
    }

    function share() {
        try {
            if (jokeEmpty()) {
                return;
            }
            Share.share({
                // @ts-ignore
                message: joke.joke,
            }).then();
        } catch (e) {
            console.error(e);
        }
    }

    function history() {
    }

//    useEffect(() => {
//        async function work() {
//            const all = await getJokes();
//            if (Array.isArray(all)) {
//                console.log('Has: ' + all.length + ' jokes saved');
//            }
//        }
//
//        work().then();
//    }, []);

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
            <BottomSheetModal ref={settingsSheetModalRef}>
                <SettingsPage/>
            </BottomSheetModal>
        </BottomSheetModalProvider>
    );
}

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
});

export default HomePage;
