import React from 'react';
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

    function categoriesList() {
        return (
            <>
                {
                    categories.map(async (cat) => {
                        // load checked status from preferences
                        const ischecked = await getPrefItem(cat) === valEnabled;

                        return OptionTile(
                            ischecked,
                            cat,
                            async (checked) => {
                                // update storage using cat
                                await setPrefItem(cat, checked ? valEnabled : valDisabled);
                                if (cat === categories[0] && checked) {
                                    for (let i = 1; i <= categories.length; i++) {
                                        const c: string = categories[i];
                                        await setPrefItem(c, '0');
                                    }
                                }
                            }
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
                <Text style={styles.buttonLabel}>{t('save')}</Text>
            </TouchableOpacity>
            <View style={styles.spacer}/>
        </BottomSheetView>
    );
}

function OptionTile(isChecked: boolean, label: string, onChecked: (b: boolean) => void): React.JSX.Element {
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
