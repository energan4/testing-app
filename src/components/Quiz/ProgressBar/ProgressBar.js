import React from 'react';

import {StyleSheet, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export default function ProgressBar(props) {
  const position = props.position;
  const questionsNumber = props.questionsNumber;
  const width = (position / questionsNumber) * 100;

  return (
    <View style={styles.ProgressContainer}>
      <View style={[styles.ProgressBar, {width: width + '%'}]} />
    </View>
  );
}

const styles = StyleSheet.create({
  ProgressContainer: {
    height: 20,
    width: '100%',
    backgroundColor: Colors.light,
  },
  ProgressBar: {
    height: 20,
    width: '100%',
    backgroundColor: Colors.dark,
  },
});
