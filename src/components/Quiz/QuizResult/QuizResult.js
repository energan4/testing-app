import React from 'react';
import {Text, View} from 'react-native';

export default function QuizResult(props) {
  const finalScore = props.finalScore;
  const correctAnswersNumber = props.correctAnswersNumber;
  const questionsNumber = props.questionsNumber;

  return (
    <View
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        marginTop: 40,
      }}>
      <Text style={{fontSize: 18}} data-testid="final-score">
        You achieved a score of {Math.round(finalScore)}%
      </Text>
      <Text style={{fontSize: 18}} data-testid="final-correct-answers">
        You answered correctly {correctAnswersNumber} questions out of{' '}
        {questionsNumber}
      </Text>
    </View>
  );
}
