import React from 'react';
import {Text, View} from 'react-native';

export default function QuizResult(props) {
  const finalScore = props.finalScore;
  const correctAnswersNumber = props.correctAnswersNumber;
  const questionsNumber = props.questionsNumber;

  return (
    <View style={styles.quizResultContainer}>
      <Text style={styles.quizResultText} data-testid="final-score">
        You achieved a score of {Math.round(finalScore)}%
      </Text>
      <Text style={styles.quizResultText} data-testid="final-correct-answers">
        You answered correctly {correctAnswersNumber} questions out of{' '}
        {questionsNumber}
      </Text>
    </View>
  );
}

const styles = {
  quizResultContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    marginTop: 40,
  },
  quizResultText: {
    fontSize: 18,
    textAlign: 'center',
  },
};
