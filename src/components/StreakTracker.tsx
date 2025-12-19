import { motion } from 'framer-motion';
import { Flame, Calendar } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface StreakTrackerProps {
  currentStreak: number;
  longestStreak: number;
  weekActivity: boolean[]; // 7 days, starting from Monday
}

const dayLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

export function StreakTracker({ currentStreak, longestStreak, weekActivity }: StreakTrackerProps) {
  return (
    <Card variant="default" className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Flame className="w-5 h-5 text-orange-500" />
          <h3 className="font-display text-lg font-semibold text-foreground">Daily Streak</h3>
        </div>
        <div className="flex items-center gap-1 text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span className="text-xs">Best: {longestStreak} days</span>
        </div>
      </div>

      {/* Current streak display */}
      <div className="text-center mb-6">
        <motion.div
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          className="inline-flex items-center gap-2"
        >
          <span className="text-5xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-pink-500">
            {currentStreak}
          </span>
          <div className="text-left">
            <p className="text-sm text-foreground font-medium">day</p>
            <p className="text-sm text-foreground font-medium">streak</p>
          </div>
        </motion.div>
      </div>

      {/* Week activity */}
      <div className="flex justify-between gap-2">
        {weekActivity.map((active, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex flex-col items-center gap-1"
          >
            <span className="text-xs text-muted-foreground font-medium">{dayLabels[index]}</span>
            <div
              className={`
                w-8 h-8 rounded-lg flex items-center justify-center transition-all
                ${active 
                  ? 'bg-gradient-to-br from-orange-400 to-red-500 shadow-[0_0_15px_hsl(25_100%_50%/0.5)]' 
                  : 'bg-muted border border-border'}
              `}
            >
              {active && <Flame className="w-4 h-4 text-foreground" />}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Motivation text */}
      <p className="text-center text-sm text-muted-foreground mt-4">
        {currentStreak === 0 
          ? "Start your streak today!" 
          : currentStreak >= 7 
            ? "🔥 You're on fire! Keep it going!" 
            : `${7 - (currentStreak % 7)} more days to complete the week!`}
      </p>
    </Card>
  );
}
