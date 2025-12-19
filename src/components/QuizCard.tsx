import { motion } from 'framer-motion';
import { 
  GitBranch, 
  Globe, 
  Database, 
  Cpu, 
  Network, 
  ClipboardList,
  Lock, 
  Star, 
  CheckCircle2 
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type Subject = 'dsa' | 'webdev' | 'database' | 'os' | 'networks' | 'software';
type QuizStatus = 'locked' | 'available' | 'completed';

interface QuizCardProps {
  title: string;
  subject: Subject;
  difficulty: 1 | 2 | 3;
  status: QuizStatus;
  progress?: number;
  xpReward: number;
  onClick?: () => void;
}

const subjectIcons = {
  dsa: GitBranch,
  webdev: Globe,
  database: Database,
  os: Cpu,
  networks: Network,
  software: ClipboardList,
};

const subjectColors = {
  dsa: 'from-violet-500 to-purple-600',
  webdev: 'from-cyan-400 to-blue-500',
  database: 'from-emerald-400 to-green-500',
  os: 'from-orange-400 to-red-500',
  networks: 'from-pink-400 to-rose-500',
  software: 'from-yellow-400 to-amber-500',
};

export function QuizCard({ title, subject, difficulty, status, progress = 0, xpReward, onClick }: QuizCardProps) {
  const Icon = subjectIcons[subject];
  const isLocked = status === 'locked';
  const isCompleted = status === 'completed';

  return (
    <motion.div
      whileHover={isLocked ? {} : { scale: 1.03, y: -5 }}
      whileTap={isLocked ? {} : { scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400 }}
    >
      <Card 
        variant={isLocked ? "locked" : "quiz"} 
        className="relative overflow-hidden cursor-pointer"
        onClick={isLocked ? undefined : onClick}
      >
        {/* Subject color stripe */}
        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${subjectColors[subject]}`} />
        
        {/* Locked overlay */}
        {isLocked && (
          <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center z-10">
            <Lock className="w-8 h-8 text-muted-foreground" />
          </div>
        )}

        {/* Completed badge */}
        {isCompleted && (
          <div className="absolute top-3 right-3 z-10">
            <CheckCircle2 className="w-6 h-6 text-accent" />
          </div>
        )}

        <CardContent className="p-5">
          <div className="flex items-start gap-4">
            {/* Icon */}
            <div className={`p-3 rounded-xl bg-gradient-to-br ${subjectColors[subject]} shadow-lg`}>
              <Icon className="w-6 h-6 text-foreground" />
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="font-display font-semibold text-foreground truncate">{title}</h4>
              
              {/* Difficulty stars */}
              <div className="flex gap-0.5 mt-1">
                {[1, 2, 3].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= difficulty
                        ? 'text-gold fill-gold'
                        : 'text-muted-foreground/30'
                    }`}
                  />
                ))}
              </div>

              {/* Progress bar */}
              {!isLocked && (
                <div className="mt-3">
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full bg-gradient-to-r ${subjectColors[subject]} rounded-full`}
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    />
                  </div>
                </div>
              )}

              {/* XP Reward */}
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-gold font-display">+{xpReward} XP</span>
                {!isLocked && !isCompleted && (
                  <Button variant="ghost" size="sm" className="text-xs h-7">
                    Start
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
