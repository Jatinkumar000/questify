import { motion } from 'framer-motion';
import { User, Zap, Trophy, Flame } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface PlayerCardProps {
  username: string;
  level: number;
  currentXP: number;
  maxXP: number;
  streak: number;
  totalBadges: number;
}

export function PlayerCard({ username, level, currentXP, maxXP, streak, totalBadges }: PlayerCardProps) {
  const xpPercentage = (currentXP / maxXP) * 100;

  return (
    <Card variant="glow" className="p-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/20 to-transparent rounded-bl-full" />
      
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <motion.div 
          className="relative"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary via-magenta to-secondary p-1">
            <div className="w-full h-full rounded-xl bg-card flex items-center justify-center">
              <User className="w-10 h-10 text-primary" />
            </div>
          </div>
          {/* Level badge */}
          <div className="absolute -bottom-2 -right-2 bg-gold text-background text-xs font-display font-bold px-2 py-1 rounded-lg glow-gold">
            LVL {level}
          </div>
        </motion.div>

        {/* Player Info */}
        <div className="flex-1">
          <h3 className="font-display text-xl font-bold text-foreground">{username}</h3>
          
          {/* XP Bar */}
          <div className="mt-2">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-muted-foreground flex items-center gap-1">
                <Zap className="w-3 h-3 text-gold" />
                {currentXP.toLocaleString()} XP
              </span>
              <span className="text-muted-foreground">{maxXP.toLocaleString()} XP</span>
            </div>
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <motion.div 
                className="h-full xp-gradient rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${xpPercentage}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-4 mt-3">
            <div className="flex items-center gap-1 text-sm">
              <Flame className="w-4 h-4 text-orange-500" />
              <span className="font-medium text-foreground">{streak}</span>
              <span className="text-muted-foreground">day streak</span>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <Trophy className="w-4 h-4 text-gold" />
              <span className="font-medium text-foreground">{totalBadges}</span>
              <span className="text-muted-foreground">badges</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
