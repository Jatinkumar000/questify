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
import { Sparkles, Gamepad2, Trophy, BookOpen, Code2 } from 'lucide-react';

// Mock data
const mockPlayer = {
  username: "CodeNinja",
  level: 15,
  currentXP: 4250,
  maxXP: 5000,
  streak: 7,
  totalBadges: 12,
};

const mockQuizzes = [
  { id: '1', title: 'Arrays & Linked Lists', subject: 'dsa' as const, difficulty: 1 as const, status: 'completed' as const, progress: 100, xpReward: 100 },
  { id: '2', title: 'React Fundamentals', subject: 'webdev' as const, difficulty: 2 as const, status: 'available' as const, progress: 60, xpReward: 150 },
  { id: '3', title: 'SQL Joins & Queries', subject: 'database' as const, difficulty: 2 as const, status: 'available' as const, progress: 30, xpReward: 150 },
  { id: '4', title: 'Process Scheduling', subject: 'os' as const, difficulty: 3 as const, status: 'locked' as const, progress: 0, xpReward: 200 },
  { id: '5', title: 'TCP/IP Protocol', subject: 'networks' as const, difficulty: 2 as const, status: 'available' as const, progress: 0, xpReward: 150 },
  { id: '6', title: 'Design Patterns', subject: 'software' as const, difficulty: 3 as const, status: 'locked' as const, progress: 0, xpReward: 250 },
  { id: '7', title: 'Binary Trees', subject: 'dsa' as const, difficulty: 2 as const, status: 'available' as const, progress: 45, xpReward: 150 },
  { id: '8', title: 'REST API Design', subject: 'webdev' as const, difficulty: 2 as const, status: 'available' as const, progress: 20, xpReward: 150 },
  { id: '9', title: 'Normalization', subject: 'database' as const, difficulty: 1 as const, status: 'completed' as const, progress: 100, xpReward: 100 },
];

const mockBadges = [
  { id: '1', name: 'First Compile', description: 'Complete your first quiz', rarity: 'common' as const, icon: '💻', earned: true },
  { id: '2', name: 'Bug Hunter', description: 'Find 10 errors in code challenges', rarity: 'rare' as const, icon: '🐛', earned: true },
  { id: '3', name: 'Algorithm Master', description: 'Master all DSA quizzes', rarity: 'epic' as const, icon: '🧠', earned: false },
  { id: '4', name: 'Full Stack', description: 'Complete Web Dev & Database tracks', rarity: 'epic' as const, icon: '🚀', earned: true },
  { id: '5', name: 'Kernel Hacker', description: 'Master Operating Systems', rarity: 'legendary' as const, icon: '⚡', earned: false },
  { id: '6', name: 'Code Streak', description: 'Maintain a 30-day streak', rarity: 'legendary' as const, icon: '🔥', earned: false },
  { id: '7', name: 'Network Ninja', description: 'Complete all network challenges', rarity: 'rare' as const, icon: '🌐', earned: true },
  { id: '8', name: 'SQL Sage', description: 'Perfect score on database quizzes', rarity: 'rare' as const, icon: '📊', earned: true },
];

const mockLeaderboard = [
  { rank: 1, username: 'ByteMaster', level: 32, xp: 24500 },
  { rank: 2, username: 'AlgoQueen', level: 28, xp: 21200 },
  { rank: 3, username: 'CodeNinja', level: 15, xp: 14250 },
  { rank: 4, username: 'StackOverflow', level: 22, xp: 12100 },
  { rank: 5, username: 'DevOpsGuru', level: 19, xp: 10800 },
];

const mockQuestion = {
  id: 'q1',
  question: 'What is the time complexity of binary search?',
  options: [
    { id: 'a', text: 'O(n)', isCorrect: false },
    { id: 'b', text: 'O(log n)', isCorrect: true },
    { id: 'c', text: 'O(n²)', isCorrect: false },
    { id: 'd', text: 'O(1)', isCorrect: false },
  ],
  xpReward: 50,
};

const subjects = [
  { subject: 'dsa' as const, name: 'DSA', questCount: 12, completedQuests: 5, locked: false },
  { subject: 'webdev' as const, name: 'Web Dev', questCount: 10, completedQuests: 4, locked: false },
  { subject: 'database' as const, name: 'Database', questCount: 8, completedQuests: 3, locked: false },
  { subject: 'os' as const, name: 'Operating Systems', questCount: 10, completedQuests: 1, locked: false },
  { subject: 'networks' as const, name: 'Networks', questCount: 8, completedQuests: 2, locked: false },
  { subject: 'software' as const, name: 'Software Eng', questCount: 6, completedQuests: 0, locked: true },
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
            newLevel={16}
            rewards={['+500 XP', 'Algorithm Badge', 'OS Track Unlocked']}
            onClose={() => setShowLevelUp(false)}
          />
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-40 px-4 md:px-6 py-4 glass-card border-b border-border/50">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 md:gap-3"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-primary via-magenta to-secondary flex items-center justify-center glow-primary">
                <Code2 className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
              </div>
              <h1 className="font-display text-xl md:text-2xl font-bold text-foreground tracking-wider">
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
        <main className="pt-24 px-4 md:px-6 pb-24 md:pb-8">
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
                  {/* Hero Section */}
                  <section className="text-center mb-8 md:mb-12">
                    <motion.h2 
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4"
                    >
                      Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-magenta to-secondary">Quest</span>
                    </motion.h2>
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto"
                    >
                      Master core engineering subjects, complete challenges, and level up your skills.
                    </motion.p>
                  </section>

                  {/* Subject Islands - Hexagonal Grid for 6 items */}
                  <section className="relative min-h-[450px] md:min-h-[500px] flex items-center justify-center">
                    <div className="relative w-full max-w-3xl">
                      {/* Top row - 2 islands */}
                      <div className="flex justify-center gap-8 md:gap-16 mb-4">
                        {subjects.slice(0, 2).map((subject, index) => (
                          <motion.div
                            key={subject.subject}
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.15 }}
                          >
                            <SubjectIsland
                              {...subject}
                              onClick={() => setCurrentView('quiz')}
                            />
                          </motion.div>
                        ))}
                      </div>
                      
                      {/* Middle row - 2 islands */}
                      <div className="flex justify-center gap-20 md:gap-32 mb-4">
                        {subjects.slice(2, 4).map((subject, index) => (
                          <motion.div
                            key={subject.subject}
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: (index + 2) * 0.15 }}
                          >
                            <SubjectIsland
                              {...subject}
                              onClick={() => setCurrentView('quiz')}
                            />
                          </motion.div>
                        ))}
                      </div>
                      
                      {/* Bottom row - 2 islands */}
                      <div className="flex justify-center gap-8 md:gap-16">
                        {subjects.slice(4, 6).map((subject, index) => (
                          <motion.div
                            key={subject.subject}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: (index + 4) * 0.15 }}
                          >
                            <SubjectIsland
                              {...subject}
                              onClick={() => setCurrentView('quiz')}
                            />
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </section>

                  {/* Stats Grid */}
                  <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
                    <div className="lg:col-span-2">
                      <PlayerCard {...mockPlayer} />
                    </div>
                    <StreakTracker
                      currentStreak={7}
                      longestStreak={21}
                      weekActivity={[true, true, true, true, true, true, true]}
                    />
                  </section>

                  {/* Quick Actions */}
                  <section className="flex flex-wrap gap-3 md:gap-4 justify-center">
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
                  className="py-8 md:py-12"
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
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
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
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
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
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground text-center">
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
