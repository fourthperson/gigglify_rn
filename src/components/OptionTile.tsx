import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {
  blackColor,
  primaryColor,
  regularFont,
  whiteColor,
} from '../config/theme.ts';

function OptionTile(props: {
  isChecked: boolean;
  label: string;
  onChecked: (b: boolean) => void;
}): React.JSX.Element {
  const {isChecked, label, onChecked} = props;
  return (
    <View style={styles.optionContainer}>
      <BouncyCheckbox
        isChecked={isChecked}
        onPress={checked => onChecked(checked)}
        textComponent={<Text style={styles.optionLabel}>{label}</Text>}
        fillColor={primaryColor}
        unFillColor={whiteColor}
        innerIconStyle={styles.innerIconStyle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
});

export default OptionTile;
