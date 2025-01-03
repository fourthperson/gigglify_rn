import React, {
    useEffect,
    useState,
} from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import {
    blackColor,
    mediumFont,
    regularFont,
} from '../../config/theme.ts';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {useQuery} from '@realm/react';
import {shareText} from '../../util/utils.ts';
import dayjs from 'dayjs';
import {getPrefItem} from '../../prefs/local_pref.ts';
import {keyDateFormat} from '../../config/config.ts';
import {SavedJoke} from '../../model/db/schema.ts';
import {useTranslation} from 'react-i18next';

function HistoryShaet(): React.JSX.Element {

    const {t} = useTranslation();

    const [jokes, setJokes] = useState([]);
    const [dateFormat, setDateFormat] = useState('DD MMM YYYY h:mm A');

    const jokesQuery = useQuery(SavedJoke, j => {
        return j.sorted([
            ['time', true],
        ]);
    });

    useEffect(() => {
        async function getDateFormat() {
            const df = await getPrefItem(keyDateFormat);
            if (df !== null) {
                setDateFormat(df);
            }
        }

        getDateFormat().then();
    }, []);

    useEffect(() => {
        loadJokes();
    }, [dateFormat]);

    function loadJokes() {
        let array = [];

        jokesQuery.map((item: SavedJoke) => {
            array.push({
                time: item.time,
                category: item.category,
                content: item.content,
            });
        });

        setJokes(array);
    }

    function historyList(): React.JSX.Element {
        return (
            <>
                {
                    jokes.map((j) => {
                        return ListItem(
                            j.content,
                            j.category,
                            j.time,
                            dateFormat,
                        );
                    })
                }
            </>
        );
    }

    return (
        <BottomSheetScrollView style={styles.contentContainer}>
            <Text style={styles.titleStyle}>{t('history')}</Text>
            {
                historyList()
            }
        </BottomSheetScrollView>
    );
}

function ListItem(joke: string, category: string, date: string, format: string): React.JSX.Element {
    const dayJs = dayjs(parseInt(date, 10));
    return (
        <TouchableOpacity
            key={date}
            onPress={() => {
                shareText(joke);
            }}>
            <View style={styles.jokeContainer}>
                <Text style={styles.jokeText}>{joke}</Text>
                <View style={styles.subRow}>
                    <Text style={styles.subText}>{category}</Text>
                    <Text style={styles.subText}>{dayJs.format(format)}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

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
    jokeContainer: {
        padding: 10,
    },
    subRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    jokeText: {
        fontFamily: mediumFont,
        fontSize: 16,
        color: blackColor,
    },
    subText: {
        fontFamily: regularFont,
        fontSize: 14,
        color: blackColor,
    },
    spacer: {
        height: 10,
    },
});

export default HistoryShaet;
