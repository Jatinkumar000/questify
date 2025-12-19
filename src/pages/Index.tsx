import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scene3D } from '@/components/Scene3D';
import { PlayerCard } from '@/components/PlayerCard';
import { QuizCard } from '@/components/QuizCard';
import { BadgeGallery } from '@/components/BadgeGallery';
import { QuizView } from '@/components/QuizView';
import { Leaderboard } from '@/components/Leaderboard';
import { StreakTracker } from '@/components/StreakTracker';
import { LevelUpAnimation } from '@/components/LevelUpAnimation';
import { SubjectIsland } from '@/components/SubjectIsland';
import { Button } from '@/components/ui/button';
import { Sparkles, Gamepad2, Trophy, BookOpen } from 'lucide-react';

// Mock data
const mockPlayer = {
  username: "StarLearner",
  level: 12,
  currentXP: 2450,
  maxXP: 3000,
  streak: 5,
  totalBadges: 8,
};

const mockQuizzes = [
  { id: '1', title: 'Algebra Basics', subject: 'math' as const, difficulty: 1 as const, status: 'completed' as const, progress: 100, xpReward: 100 },
  { id: '2', title: 'Chemistry 101', subject: 'science' as const, difficulty: 2 as const, status: 'available' as const, progress: 60, xpReward: 150 },
  { id: '3', title: 'World War II', subject: 'history' as const, difficulty: 2 as const, status: 'available' as const, progress: 30, xpReward: 150 },
  { id: '4', title: 'Spanish Verbs', subject: 'language' as const, difficulty: 3 as const, status: 'locked' as const, progress: 0, xpReward: 200 },
  { id: '5', title: 'Color Theory', subject: 'art' as const, difficulty: 1 as const, status: 'available' as const, progress: 0, xpReward: 100 },
  { id: '6', title: 'Geometry Pro', subject: 'math' as const, difficulty: 3 as const, status: 'locked' as const, progress: 0, xpReward: 250 },
];

const mockBadges = [
  { id: '1', name: 'First Steps', description: 'Complete your first quiz', rarity: 'common' as const, icon: '🎯', earned: true },
  { id: '2', name: 'Quick Thinker', description: 'Answer 10 questions in under 30 seconds', rarity: 'rare' as const, icon: '⚡', earned: true },
  { id: '3', name: 'Math Wizard', description: 'Master all math quizzes', rarity: 'epic' as const, icon: '🧙', earned: false },
  { id: '4', name: 'Perfect Score', description: 'Get 100% on any quiz', rarity: 'rare' as const, icon: '💯', earned: true },
  { id: '5', name: 'Streak Master', description: 'Maintain a 30-day streak', rarity: 'legendary' as const, icon: '🔥', earned: false },
  { id: '6', name: 'Scholar', description: 'Complete 50 quizzes', rarity: 'epic' as const, icon: '📚', earned: true },
];

const mockLeaderboard = [
  { rank: 1, username: 'ProGamer99', level: 25, xp: 12500 },
  { rank: 2, username: 'StarLearner', level: 12, xp: 8450 },
  { rank: 3, username: 'QuizMaster', level: 18, xp: 7200 },
  { rank: 4, username: 'BrainStorm', level: 15, xp: 6100 },
  { rank: 5, username: 'LearningPro', level: 14, xp: 5800 },
];

const mockQuestion = {
  id: 'q1',
  question: 'What is the derivative of x²?',
  options: [
    { id: 'a', text: 'x', isCorrect: false },
    { id: 'b', text: '2x', isCorrect: true },
    { id: 'c', text: 'x²', isCorrect: false },
    { id: 'd', text: '2', isCorrect: false },
  ],
  xpReward: 50,
};

const subjects = [
  { subject: 'math' as const, name: 'Math', questCount: 10, completedQuests: 4 },
  { subject: 'science' as const, name: 'Science', questCount: 8, completedQuests: 3 },
  { subject: 'history' as const, name: 'History', questCount: 6, completedQuests: 2 },
  { subject: 'language' as const, name: 'Language', questCount: 12, completedQuests: 5 },
  { subject: 'art' as const, name: 'Art', questCount: 5, completedQuests: 1 },
];

type View = 'home' | 'quiz' | 'badges' | 'leaderboard';

const Index = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [showQuizView, setShowQuizView] = useState(false);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* 3D Background */}
      <Scene3D />
      
      {/* Level Up Animation */}
      <AnimatePresence>
        {showLevelUp && (
          <LevelUpAnimation
            newLevel={13}
            rewards={['+500 XP', 'New Badge', 'Quiz Unlock']}
            onClose={() => setShowLevelUp(false)}
          />
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-40 px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary via-magenta to-secondary flex items-center justify-center glow-primary">
                <Sparkles className="w-6 h-6 text-foreground" />
              </div>
              <h1 className="font-display text-2xl font-bold text-foreground tracking-wider">
                QUESTIFY
              </h1>
            </motion.div>

            <nav className="hidden md:flex items-center gap-2">
              {[
                { view: 'home' as const, icon: Gamepad2, label: 'Home' },
                { view: 'quiz' as const, icon: BookOpen, label: 'Quests' },
                { view: 'badges' as const, icon: Sparkles, label: 'Badges' },
                { view: 'leaderboard' as const, icon: Trophy, label: 'Ranks' },
              ].map((item) => (
                <Button
                  key={item.view}
                  variant={currentView === item.view ? 'default' : 'glass'}
                  size="sm"
                  onClick={() => setCurrentView(item.view)}
                  className="gap-2"
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Button>
              ))}
            </nav>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="pt-24 px-6 pb-8">
          <div className="max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              {currentView === 'home' && !showQuizView && (
                <motion.div
                  key="home"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  {/* Hero Section with Subject Islands */}
                  <section className="text-center mb-12">
                    <motion.h2 
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4"
                    >
                      Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-magenta to-secondary">Quest</span>
                    </motion.h2>
                    <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                      Explore subject islands, complete quizzes, and level up your knowledge
                    </p>
                  </section>

                  {/* Subject Islands */}
                  <section className="relative h-[400px] flex items-center justify-center">
                    <div className="relative w-full max-w-2xl h-full">
                      {subjects.map((subject, index) => {
                        const positions = [
                          { x: 0, y: -120 },
                          { x: 180, y: -40 },
                          { x: 120, y: 100 },
                          { x: -120, y: 100 },
                          { x: -180, y: -40 },
                        ];
                        const pos = positions[index];
                        return (
                          <motion.div
                            key={subject.subject}
                            className="absolute left-1/2 top-1/2"
                            style={{ 
                              x: pos.x - 64,
                              y: pos.y - 64,
                            }}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <SubjectIsland
                              {...subject}
                              onClick={() => setCurrentView('quiz')}
                            />
                          </motion.div>
                        );
                      })}
                    </div>
                  </section>

                  {/* Stats Grid */}
                  <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <PlayerCard {...mockPlayer} />
                    </div>
                    <StreakTracker
                      currentStreak={5}
                      longestStreak={14}
                      weekActivity={[true, true, true, true, true, false, false]}
                    />
                  </section>

                  {/* Quick Actions */}
                  <section className="flex flex-wrap gap-4 justify-center">
                    <Button 
                      variant="neon" 
                      size="lg"
                      onClick={() => setShowQuizView(true)}
                    >
                      <Gamepad2 className="w-5 h-5" />
                      Start Daily Quest
                    </Button>
                    <Button 
                      variant="gold" 
                      size="lg"
                      onClick={() => setShowLevelUp(true)}
                    >
                      <Trophy className="w-5 h-5" />
                      Demo Level Up
                    </Button>
                  </section>
                </motion.div>
              )}

              {currentView === 'home' && showQuizView && (
                <motion.div
                  key="quiz-view"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="py-12"
                >
                  <Button 
                    variant="ghost" 
                    className="mb-6"
                    onClick={() => setShowQuizView(false)}
                  >
                    ← Back to Home
                  </Button>
                  <QuizView
                    question={mockQuestion}
                    questionNumber={1}
                    totalQuestions={5}
                    onAnswer={(correct) => console.log('Answer:', correct)}
                    onNext={() => setShowQuizView(false)}
                  />
                </motion.div>
              )}

              {currentView === 'quiz' && (
                <motion.div
                  key="quests"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <h2 className="font-display text-3xl font-bold text-foreground">
                    Available Quests
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {mockQuizzes.map((quiz, index) => (
                      <motion.div
                        key={quiz.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <QuizCard {...quiz} onClick={() => setShowQuizView(true)} />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {currentView === 'badges' && (
                <motion.div
                  key="badges"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <h2 className="font-display text-3xl font-bold text-foreground">
                    Badge Collection
                  </h2>
                  <BadgeGallery badges={mockBadges} />
                </motion.div>
              )}

              {currentView === 'leaderboard' && (
                <motion.div
                  key="leaderboard"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6 max-w-2xl mx-auto"
                >
                  <h2 className="font-display text-3xl font-bold text-foreground text-center">
                    Global Rankings
                  </h2>
                  <Leaderboard entries={mockLeaderboard} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>

        {/* Mobile Navigation */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 glass-card border-t border-border p-2">
          <div className="flex justify-around">
            {[
              { view: 'home' as const, icon: Gamepad2 },
              { view: 'quiz' as const, icon: BookOpen },
              { view: 'badges' as const, icon: Sparkles },
              { view: 'leaderboard' as const, icon: Trophy },
            ].map((item) => (
              <button
                key={item.view}
                onClick={() => setCurrentView(item.view)}
                className={`p-3 rounded-xl transition-all ${
                  currentView === item.view 
                    ? 'bg-primary text-primary-foreground glow-primary' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <item.icon className="w-6 h-6" />
              </button>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Index;
