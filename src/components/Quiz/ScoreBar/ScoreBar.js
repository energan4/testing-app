import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Colors from '../../../utils/Colors';

export default function ScoreBar({score}) {
  const minScore = score.min;
  const currentScore = score.current;
  const maxScore = 100 - score.max;

  return (
    <View style={{width: '100%'}}>
      <View
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={{fontSize: 18}}>
          {'Score: ' + Math.round(score.current) + '%'}
        </Text>
        <Text style={{fontSize: 18}}>
          {'Max Score: ' + Math.round(score.max) + '%'}
        </Text>
      </View>
      <View style={{borderWidth: 2, borderColor: 'black'}}>
        <View style={styles.ProgressContainer}>
          <View
            style={[
              styles.ProgressBar,
              {backgroundColor: Colors.darker},
              {width: minScore + '%', position: 'absolute', zIndex: 999},
            ]}
          />
          <View
            style={[
              styles.ProgressBar,
              {backgroundColor: Colors.dark_grey},
              {width: currentScore + '%', position: 'absolute'},
            ]}
          />
          <View
            style={[
              styles.ProgressBar,
              {backgroundColor: Colors.lighter},
              {width: maxScore + '%', position: 'absolute', right: 0},
            ]}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ProgressContainer: {
    height: 20,
    width: '100%',
    backgroundColor: Colors.light_grey,
    position: 'relative',
  },
  ProgressBar: {
    height: 20,
  },
});
