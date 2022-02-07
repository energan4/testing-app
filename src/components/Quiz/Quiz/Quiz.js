/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import type {Node} from 'react';

import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';

import Colors from '../../../utils/Colors';

import JsonQuestions from '../../../data/questions.json';
import ProgressBar from '../ProgressBar/ProgressBar';
import Answers from '../Answers/Answers';
import Title from '../Title/Title';
import Question from '../Question/Question';
import QuestionResult from '../QuestionResult/QuestionResult';
import ScoreBar from '../ScoreBar/ScoreBar';
import QuizResult from '../QuizResult/QuizResult';

const Quiz: () => Node = () => {
  const questions = JsonQuestions;
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(null);
  const [isQuestionResultVisible, setIsQuestionResultVisible] = useState(false);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [isLastQuestion, setIsLastQuestion] = useState(false);
  const [position, setPosition] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(questions[0]);
  const [correctAnswersNumber, setCorrectAnswersNumber] = useState(0);
  const [incorrectAnswersNumber, setIncorrectAnswersNumber] = useState(0);
  const [score, setScore] = useState({
    min: 0,
    current: 0,
    max: 100,
  });

  const calculateScore = () => {
    setScore({
      min: (correctAnswersNumber / questions.length) * 100,
      current: (correctAnswersNumber / position) * 100,
      max:
        ((questions.length - incorrectAnswersNumber) / questions.length) * 100,
    });
  };

  const emitAnswer = answer => {
    setIsQuestionResultVisible(true);
    setIsCorrectAnswer(answer.isCorrect);
    if (answer.isCorrect) {
      setCorrectAnswersNumber(prev => prev + 1);
    } else {
      setIncorrectAnswersNumber(prev => prev + 1);
    }

    const isLastPosition = position === questions.length;
    if (isLastPosition) {
      setIsLastQuestion(true);
    }
  };

  const setNextQuestion = () => {
    const isLastPosition = position === questions.length;
    if (isLastPosition) {
      setIsQuizFinished(true);
    } else {
      setPosition(prev => prev + 1);
      setCurrentQuestion(questions[position]);
    }
    calculateScore();

    setIsQuestionResultVisible(false);
  };

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView
      style={[
        {paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0},
        styles.container,
        backgroundStyle,
      ]}>
      <View style={styles.quizPrimaryContainer}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <ProgressBar position={position} questionsNumber={questions.length} />
        <View style={[styles.quizSecondaryContainer]}>
          <Title
            position={position}
            questionsNumber={questions.length}
            difficulty={currentQuestion.difficulty}
            category={currentQuestion.category}
          />
          <Question question={currentQuestion.question} />
          <Answers
            position={position}
            emitAnswer={emitAnswer}
            correctAnswer={currentQuestion.correct_answer}
            incorrectAnswers={currentQuestion.incorrect_answers}
          />
          {isQuestionResultVisible && (
            <QuestionResult
              isLastQuestion={isLastQuestion}
              isCorrectAnswer={isCorrectAnswer}
              setNextQuestion={setNextQuestion}
            />
          )}
        </View>
        {isQuizFinished && (
          <QuizResult
            finalScore={score.current}
            correctAnswersNumber={correctAnswersNumber}
            questionsNumber={questions.length}
          />
        )}
      </View>
      {!isQuizFinished && <ScoreBar style={{height: 100}} score={score} />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
    justifyContent: 'space-between',
  },
  quizPrimaryContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  quizSecondaryContainer: {
    marginHorizontal: 'auto',
    width: '98%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingTop: 50,
  },
});

export default Quiz;
