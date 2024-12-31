import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {BottomSheetView} from '@gorhom/bottom-sheet';
import {blackColor, mediumFont, primaryColor, regularFont, whiteColor} from '../../config/theme.ts';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {categories} from '../../config/config.ts';

function SettingsPage(): React.JSX.Element {
    function renderList() {
        return (
            <>
                {
                    categories.map(async (cat) => {
                        // load checked status from storage
                        let ischecked = false;

                        return OptionTile(
                            ischecked,
                            cat,
                            (checked) => {
                                console.log(checked);
                                // update storage using cat

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
            <Text style={styles.titleStyle}>Preferences</Text>
            {
                renderList()
            }
        </BottomSheetView>
    );
}

function OptionTile(isChecked: boolean, label: string, onChecked: (b: boolean) => void): React.JSX.Element {
    return (
        <View style={styles.optionContainer}>
            <BouncyCheckbox
                isChecked={isChecked}
                text={label}
                onPress={(checked) => {
                    onChecked(checked);
                }}
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
        color: primaryColor,
    },
    innerIconStyle: {
        borderWidth: 2,
    },
});

export default SettingsPage;
