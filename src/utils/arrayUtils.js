export const combineShuffledAnswers = (incorrectAnswers, correctAnswers) => {
    const answers = [...incorrectAnswers, correctAnswers]
    const combineShuffledAnswers = []

    answers.forEach((answer) => {
        combineShuffledAnswers.push({
            text: answer,
            isCorrect: correctAnswers === answer
        })
    })

    return combineShuffledAnswers.sort(() => Math.random() - 0.5)
}