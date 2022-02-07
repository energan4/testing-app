import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Text, View} from 'react-native';

export default function Title(props) {
  let difficulty = 0;

  switch (props.difficulty) {
    case 'easy':
      difficulty = 1;
      break;
    case 'medium':
      difficulty = 2;
      break;
    case 'hard':
      difficulty = 3;
      break;
  }

  function getStarsHtml() {
    let starsHtml = [];
    for (let i = 1; i < 3; i++) {
      if (i < difficulty) {
        starsHtml.push(
          <Icon
            key={i.toString()}
            name="star"
            size={14}
            color={Colors.black}
          />,
        );
      } else {
        starsHtml.push(
          <Icon
            key={i.toString()}
            name="star"
            size={14}
            color={Colors.light}
          />,
        );
      }
    }
    return starsHtml;
  }

  return (
    <View style={styles.titleContainer}>
      <Text style={styles.sectionTitle}>
        Question {props.position} out of {props.questionsNumber}
      </Text>
      <Text style={styles.sectionDescription}>
        {decodeURIComponent(props.category)}
      </Text>
      <View style={{display: 'flex', flexDirection: 'row', marginTop: 4}}>
        <Icon name="star" size={14} color={Colors.black} />

        {getStarsHtml()}
        <Icon name="star" size={14} color={Colors.light} />

        <Icon name="star" size={14} color={Colors.light} />
      </View>
    </View>
  );
}

const styles = {
  quizContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  sectionDescription: {
    marginTop: 2,
    fontSize: 18,
    fontWeight: '400',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
};
