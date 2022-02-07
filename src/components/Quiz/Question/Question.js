import React from 'react';
import {Text, View} from 'react-native';

export default function Question(props) {
  return (
    <View>
      <Text style={styles.sectionTitle}>
        {decodeURIComponent(props.question)}
      </Text>
    </View>
  );
}

const styles = {
  sectionTitle: {
    marginTop: 40,
    fontSize: 24,
    fontWeight: '600',
  },
};
