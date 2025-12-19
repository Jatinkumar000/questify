import { motion } from 'framer-motion';
import { Trophy, Medal, Award } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface LeaderboardEntry {
  rank: number;
  username: string;
  level: number;
  xp: number;
  avatar?: string;
}

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  currentUserId?: string;
}

const rankIcons = {
  1: <Trophy className="w-5 h-5 text-gold" />,
  2: <Medal className="w-5 h-5 text-gray-400" />,
  3: <Award className="w-5 h-5 text-amber-600" />,
};

export function Leaderboard({ entries }: LeaderboardProps) {
  return (
    <Card variant="default" className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <Trophy className="w-5 h-5 text-gold" />
        <h3 className="font-display text-lg font-semibold text-foreground">Leaderboard</h3>
      </div>

      <div className="space-y-2">
        {entries.map((entry, index) => (
          <motion.div
            key={entry.username}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`
              flex items-center gap-3 p-3 rounded-xl transition-all
              ${entry.rank <= 3 ? 'bg-gradient-to-r from-card to-card-glow border border-border' : 'hover:bg-muted/50'}
            `}
          >
            {/* Rank */}
            <div className="w-8 flex justify-center">
              {entry.rank <= 3 ? (
                rankIcons[entry.rank as 1 | 2 | 3]
              ) : (
                <span className="font-display text-muted-foreground">{entry.rank}</span>
              )}
            </div>

            {/* Avatar */}
            <div className={`
              w-10 h-10 rounded-xl flex items-center justify-center text-lg
              ${entry.rank === 1 ? 'bg-gradient-to-br from-gold to-amber-600' : 
                entry.rank === 2 ? 'bg-gradient-to-br from-gray-300 to-gray-500' :
                entry.rank === 3 ? 'bg-gradient-to-br from-amber-500 to-amber-700' :
                'bg-muted'}
            `}>
              {entry.avatar || entry.username.charAt(0).toUpperCase()}
            </div>

            {/* User info */}
            <div className="flex-1 min-w-0">
              <p className="font-display font-semibold text-foreground truncate">{entry.username}</p>
              <p className="text-xs text-muted-foreground">Level {entry.level}</p>
            </div>

            {/* XP */}
            <div className="text-right">
              <p className="font-display text-sm font-bold text-gold">{entry.xp.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">XP</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  );
}
