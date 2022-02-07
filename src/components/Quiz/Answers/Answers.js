import React, {useEffect, useState} from 'react';
import {combineShuffledAnswers} from '../../../utils/arrayUtils';
import {Button, Text, TouchableOpacity, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export default function Answers(props) {
  const [isDisabled, setIsDisabled] = useState(false);
  const [position, setPosition] = useState(1);
  const [answers, setAnswers] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const isNotSamePosition = position !== props.position;

  if (isNotSamePosition) {
    setPosition(props.position);
  }

  useEffect(() => {
    setAnswers(
      combineShuffledAnswers(props.incorrectAnswers, props.correctAnswer),
    );
    setIsDisabled(false);
  }, [position]);

  const emitAnswer = answer => {
    setIsDisabled(true);
    setSelectedAnswer(answer.text);
    setCorrectAnswer(props.correctAnswer);
    props.emitAnswer(answer);
  };

  const correctAnswerButtonBg = answer => {
    return correctAnswer === answer
      ? {backgroundColor: Colors.dark}
      : selectedAnswer === answer
      ? {borderWidth: 1, borderColor: Colors.dark}
      : {};
  };

  const correctAnswerButtonTextColor = answer => {
    return correctAnswer === answer ? {color: Colors.white} : {};
  };

  return (
    <View style={styles.container}>
      {answers.map((answer, i) => (
        /*    <Button
                title="hello"
                disabled={isDisabled}
                style={{width: '90%', color: Colors.dark}}
                onClick={() => emitAnswer(answer)}
                data-testid="btn-answer"
              />*/
        <View key={i.toString()} style={styles.item}>
          <TouchableOpacity
            style={[styles.answerButton, correctAnswerButtonBg(answer.text)]}
            disabled={isDisabled}
            onPress={() => emitAnswer(answer)}>
            <Text
              style={[
                {fontSize: 13},
                correctAnswerButtonTextColor(answer.text),
              ]}>
              {decodeURIComponent(answer.text)}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}

const styles = {
  button: {
    color: Colors.dark,
    backgroundColor: Colors.light,
    height: 40,
    width: '50%',
    borderWidth: 1,
    borderColor: Colors.dark,
  },
  container: {
    marginTop: 40,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  hello: {
    flex: 1,
    backgroundColor: Colors.dark,
  },
  item: {
    width: '50%',
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyItems: 'center',
    marginVertical: 10,
  },
  answerButton: {
    width: '95%',
    alignItems: 'center',
    backgroundColor: Colors.light,
    paddingVertical: 5,
  },
};
