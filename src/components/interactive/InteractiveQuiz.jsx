import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';

const InteractiveQuiz = ({ questions, onComplete, title, description }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setShowResults(true);
      if (onComplete) {
        onComplete(answers);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const isCurrentQuestionAnswered = answers[questions[currentQuestion]?.id] !== undefined;
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showResults) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-gator-green-light to-white p-8 rounded-lg shadow-xl text-center"
      >
        <CheckCircle size={64} className="text-gator-green-dark mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-navy mb-4">Quiz Complete!</h3>
        <p className="text-gray-700 mb-6">
          Thanks for completing the quiz. We'll use your answers to provide personalized recommendations.
        </p>
        <button
          onClick={() => {
            setCurrentQuestion(0);
            setAnswers({});
            setShowResults(false);
          }}
          className="btn-secondary"
        >
          Take Again
        </button>
      </motion.div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="bg-white p-8 rounded-lg shadow-xl">
      {/* Header */}
      {title && (
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-navy mb-2">{title}</h3>
          {description && <p className="text-gray-600">{description}</p>}
        </div>
      )}

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">Question {currentQuestion + 1} of {questions.length}</span>
          <span className="text-sm font-semibold text-gator-green-dark">{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
            className="bg-gator-green-dark h-2 rounded-full"
          />
        </div>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <h4 className="text-xl font-semibold text-navy mb-6">{question.question}</h4>

          {/* Options */}
          <div className="space-y-3 mb-8">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(question.id, option.value)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  answers[question.id] === option.value
                    ? 'border-gator-green-dark bg-gator-green-light'
                    : 'border-gray-200 hover:border-gator-green bg-white hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{option.label}</span>
                  {answers[question.id] === option.value && (
                    <CheckCircle size={20} className="text-gator-green-dark" />
                  )}
                </div>
                {option.description && (
                  <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                )}
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className="btn-secondary flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ArrowLeft size={18} className="mr-2" />
          Previous
        </button>

        <button
          onClick={handleNext}
          disabled={!isCurrentQuestionAnswered}
          className="btn-primary flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {currentQuestion === questions.length - 1 ? 'Complete' : 'Next'}
          <ArrowRight size={18} className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default InteractiveQuiz;
