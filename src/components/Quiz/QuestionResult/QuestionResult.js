import React from 'react';
import {Button, Text, TouchableOpacity, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export default function QuestionResult(props) {
  const isCorrectAnswer = props.isCorrectAnswer;
  const isLastQuestion = props.isLastQuestion;

  const handleClick = () => {
    props.setNextQuestion();
  };

  return (
    <View
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        marginTop: 40,
      }}>
      <Text style={styles.resultText}>
        {isCorrectAnswer ? 'Correct!' : 'Sorry!'}
      </Text>
      <TouchableOpacity style={styles.nextButton} onPress={handleClick}>
        <Text style={styles.nextButtonText}>
          {!isLastQuestion ? 'Next Question' : 'Finish'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = {
  resultText: {
    fontSize: 30,
  },
  nextButton: {
    marginTop: 15,
    backgroundColor: Colors.light,
  },
  nextButtonText: {
    fontSize: 18,
    padding: 10,
  },
};
