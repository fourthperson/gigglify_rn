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
    BottomSheetView,
    useBottomSheetModal,
} from '@gorhom/bottom-sheet';
import {
    blackColor,
    mediumFont,
    primaryColor,
    regularFont,
    whiteColor,
} from '../../config/theme.ts';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {
    routes,
    valDisabled,
    valEnabled,
} from '../../config/config.ts';
import {
    getPrefItem,
    setPrefItem,
} from '../../prefs/local_pref.ts';
import {useTranslation} from 'react-i18next';

function SettingsSheet(): React.JSX.Element {

    const {t} = useTranslation();

    const {dismiss} = useBottomSheetModal();

    const categories = [
        t('category_any'),
        t('category_dark'),
        t('category_pun'),
        t('category_spooky'),
        t('category_christmas'),
        t('category_programming'),
        t('category_misc'),
    ];

    const [checked, setChecked] = useState([true, false, false, false, false, false, false]);

    useEffect(() => {
        loadCheckedState().then();
    }, []);

    async function loadCheckedState() {
        let checkedArray: Array<boolean> = [];

        for (let i = 0; i < routes.length; i++) {
            checkedArray[i] = await getPrefItem(routes[i]) === valEnabled;
        }

        setChecked(checkedArray);
    }

    async function saveChanges() {
        let checkedArray: Array<boolean> = [];
        if (checked[0]) {
            // any selected, deselect all others
            checkedArray = checked;
            for (let i = 1; i < routes.length; i++) {
                checkedArray[i] = false;
            }
        } else {
            // others selected, deselect any
            checkedArray = checked;
            checkedArray[0] = false;
        }
        setChecked(checkedArray);
        for (let i = 0; i < routes.length; i++) {
            await setPrefItem(routes[i], checked[i] ? valEnabled : valDisabled);
        }
    }

    function categoriesList(): React.JSX.Element {
        return (
            <>
                {
                    routes.map(async (_, index) => {
                        return (
                            <OptionTile
                                isChecked={checked[index]}
                                label={categories[index]}
                                onChecked={async (c: boolean) => {
                                    let a = checked;
                                    a[index] = c;
                                    setChecked(a);
                                    await saveChanges();
                                }}
                            />
                        );
                    })
                }
            </>
        );
    }

    return (
        <BottomSheetView
            style={styles.contentContainer}>
            <Text style={styles.titleStyle}>{t('preferences')}</Text>
            <Text style={styles.optionLabel}>{t('allowed_categories')}</Text>
            <View style={styles.spacer}/>
            {
                categoriesList()
            }
            <View style={styles.spacer}/>
            <TouchableOpacity style={styles.button} onPress={(_) => dismiss()}>
                <Text style={styles.buttonLabel}>{t('done')}</Text>
            </TouchableOpacity>
            <View style={styles.spacer}/>
        </BottomSheetView>
    );
}

interface OptionTileProps {
    isChecked: boolean;
    label: string;
    onChecked: (b: boolean) => void
}

function OptionTile({isChecked, label, onChecked}: OptionTileProps): React.JSX.Element {
    return (
        <View style={styles.optionContainer}>
            <BouncyCheckbox
                isChecked={isChecked}
                onPress={(checked) => onChecked(checked)}
                textComponent={
                    <Text style={styles.optionLabel}>{label}</Text>
                }
                fillColor={primaryColor}
                unFillColor={whiteColor}
                innerIconStyle={styles.innerIconStyle}
            />
        </View>
    );
}

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
    optionContainer: {
        paddingTop: 10,
        paddingBottom: 10,
    },
    optionLabel: {
        fontFamily: regularFont,
        fontSize: 16,
        color: blackColor,
        marginStart: 10,
    },
    innerIconStyle: {
        borderWidth: 2,
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
});

export default SettingsSheet;
