import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { mediumFont, primaryDarkColor, whiteColor } from '../../config/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { appAxios } from '../../..';

function HomePage() : React.JSX.Element {

    const [isLoading, setIsLoading] = useState(false);
    const [joke, setJoke] = useState({});

    async function loadJoke() {
        setIsLoading(true);
        try {
            const response = await appAxios.get('Any');
            console.log(response);
            if(response.status === 200) {
              if(response.data.error === true) {return;}

              var j = response.data;
              if(j.type !== 'single') {
                j.joke = j.setup + '\n\n' + j.delivery;
              }
              setJoke(j);
            }
        } catch(e) {
            console.error(e);
        }
        setIsLoading(false);
    }

    const tapGesture = Gesture.Tap().onStart(() => {
        console.log('Tapped!');
        loadJoke();
    });

    useEffect(() => {
        loadJoke();
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={primaryDarkColor}/>
            <GestureDetector gesture={tapGesture}>
                <SafeAreaView style={styles.centeredItems}>
                        <View collapsable={false}>
                            <Text style={styles.jokeText}>
                                {
                                    isLoading ? 'Loading...' : joke.joke.toString()
                                }
                            </Text>
                        </View>
                </SafeAreaView>
            </GestureDetector>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
            flex: 1,
            backgroundColor: whiteColor,
        },
    centeredItems: {
        flex: 1,
        justifyContent:'center',
        alignItems: 'center',
        padding: 16,
    },
    jokeText: {
        fontSize: 18,
        fontFamily: mediumFont,
    },
});

export default HomePage;
