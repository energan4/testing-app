/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import type {Node} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import ProgressBar from '../ProgressBar/ProgressBar';
import JsonQuestions from '../../../data/questions.json';
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

  useEffect(() => {
    const calculateScore = () => {
      setScore({
        min: (correctAnswersNumber / questions.length) * 100,
        current: (correctAnswersNumber / position) * 100,
        max:
          ((questions.length - incorrectAnswersNumber) / questions.length) *
          100,
      });
    };
    calculateScore();
  }, [incorrectAnswersNumber, correctAnswersNumber]);

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
    setIsQuestionResultVisible(false);
  };

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
    alignItems: 'center',
    position: 'relative',
    justifyContent: 'space-between',
  };

  return (
    <View style={backgroundStyle}>
      <View
        style={{alignItems: 'center', justifyContent: 'center', width: '100%'}}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <ProgressBar position={position} questionsNumber={questions.length} />
        <View style={[styles.quizContainer]}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  quizContainer: {
    marginHorizontal: 'auto',
    width: '90%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingTop: 50,
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 2,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  progressBar: {
    height: 20,
    width: '100%',
    backgroundColor: Colors.primary,
  },
});

export default Quiz;
