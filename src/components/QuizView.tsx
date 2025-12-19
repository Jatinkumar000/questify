import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Zap, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
  xpReward: number;
}

interface QuizViewProps {
  question: QuizQuestion;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (isCorrect: boolean) => void;
  onNext: () => void;
}

export function QuizView({ question, questionNumber, totalQuestions, onAnswer, onNext }: QuizViewProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (optionId: string) => {
    if (showResult) return;
    
    setSelectedOption(optionId);
    setShowResult(true);
    
    const selected = question.options.find(o => o.id === optionId);
    onAnswer(selected?.isCorrect ?? false);
  };

  const handleNext = () => {
    setSelectedOption(null);
    setShowResult(false);
    onNext();
  };

  const isCorrect = question.options.find(o => o.id === selectedOption)?.isCorrect;

  return (
    <Card variant="glow" className="max-w-2xl mx-auto overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/20 to-secondary/20 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Question</span>
          <span className="font-display font-bold text-foreground">{questionNumber}/{totalQuestions}</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-gold">
            <Zap className="w-4 h-4" />
            <span className="font-display text-sm">+{question.xpReward} XP</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span className="text-sm">30s</span>
          </div>
        </div>
      </div>

      <CardContent className="p-6">
        {/* Question */}
        <h2 className="text-xl font-display font-semibold text-foreground mb-6 text-center">
          {question.question}
        </h2>

        {/* Options */}
        <div className="grid grid-cols-1 gap-3">
          {question.options.map((option, index) => {
            const isSelected = selectedOption === option.id;
            const showCorrect = showResult && option.isCorrect;
            const showIncorrect = showResult && isSelected && !option.isCorrect;

            return (
              <motion.button
                key={option.id}
                onClick={() => handleSelect(option.id)}
                disabled={showResult}
                whileHover={!showResult ? { scale: 1.02 } : {}}
                whileTap={!showResult ? { scale: 0.98 } : {}}
                className={`
                  relative p-4 rounded-xl text-left transition-all duration-300
                  border-2 
                  ${showCorrect ? 'bg-accent/20 border-accent glow-accent' : ''}
                  ${showIncorrect ? 'bg-destructive/20 border-destructive' : ''}
                  ${!showResult && !isSelected ? 'bg-card border-border hover:border-primary/50 hover:glow-primary' : ''}
                  ${!showResult && isSelected ? 'bg-primary/20 border-primary' : ''}
                  disabled:cursor-default
                `}
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center font-display font-bold text-sm text-muted-foreground">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="flex-1 text-foreground">{option.text}</span>
                  
                  <AnimatePresence>
                    {showCorrect && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-accent"
                      >
                        <CheckCircle2 className="w-6 h-6" />
                      </motion.div>
                    )}
                    {showIncorrect && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-destructive"
                      >
                        <XCircle className="w-6 h-6" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Result feedback */}
        <AnimatePresence>
          {showResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 text-center"
            >
              {isCorrect ? (
                <div className="text-accent font-display text-lg">
                  🎉 Correct! +{question.xpReward} XP
                </div>
              ) : (
                <div className="text-destructive font-display text-lg">
                  Not quite! Try again next time.
                </div>
              )}
              
              <Button 
                variant="neon" 
                size="lg" 
                className="mt-4"
                onClick={handleNext}
              >
                {questionNumber < totalQuestions ? 'Next Question' : 'See Results'}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
