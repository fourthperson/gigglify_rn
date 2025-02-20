import {Joke} from '../types/types.ts';
import React from 'react';
import dayjs from 'dayjs';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {shareText} from '../util/utils.ts';
import {blackColor, mediumFont, regularFont} from '../config/theme.ts';

const HistoryItem = (props: {
  joke: Joke;
  format: string;
}): React.JSX.Element => {
  const {joke, format} = props;
  const dayJs = dayjs(parseInt(joke.time, 10));

  return (
    <TouchableOpacity key={joke.time} onPress={() => shareText(joke.content)}>
      <View style={styles.jokeContainer}>
        <Text style={styles.jokeText}>{joke.content}</Text>
        <View style={styles.subRow}>
          <Text style={styles.subText}>{joke.category}</Text>
          <Text style={styles.subText}>{dayJs.format(format)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
});

export default HistoryItem;
