import { motion } from 'framer-motion';
import { Calculator, FlaskConical, BookOpen, Languages, Palette } from 'lucide-react';

type Subject = 'math' | 'science' | 'history' | 'language' | 'art';

interface SubjectIslandProps {
  subject: Subject;
  name: string;
  questCount: number;
  completedQuests: number;
  onClick?: () => void;
}

const subjectConfig = {
  math: {
    icon: Calculator,
    gradient: 'from-purple-500 to-violet-600',
    glow: 'shadow-[0_0_40px_hsl(270_80%_60%/0.5)]',
    position: { x: -200, y: -50 },
  },
  science: {
    icon: FlaskConical,
    gradient: 'from-emerald-400 to-teal-500',
    glow: 'shadow-[0_0_40px_hsl(160_100%_50%/0.5)]',
    position: { x: 200, y: -80 },
  },
  history: {
    icon: BookOpen,
    gradient: 'from-amber-400 to-orange-500',
    glow: 'shadow-[0_0_40px_hsl(30_80%_55%/0.5)]',
    position: { x: -150, y: 100 },
  },
  language: {
    icon: Languages,
    gradient: 'from-pink-400 to-rose-500',
    glow: 'shadow-[0_0_40px_hsl(320_100%_60%/0.5)]',
    position: { x: 180, y: 80 },
  },
  art: {
    icon: Palette,
    gradient: 'from-cyan-400 to-blue-500',
    glow: 'shadow-[0_0_40px_hsl(185_80%_50%/0.5)]',
    position: { x: 0, y: 150 },
  },
};

export function SubjectIsland({ subject, name, questCount, completedQuests, onClick }: SubjectIslandProps) {
  const config = subjectConfig[subject];
  const Icon = config.icon;
  const progress = questCount > 0 ? (completedQuests / questCount) * 100 : 0;

  return (
    <motion.div
      className="relative cursor-pointer group"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1, y: -10 }}
      transition={{ type: "spring", stiffness: 300 }}
      onClick={onClick}
    >
      {/* Floating island */}
      <div className={`
        relative w-32 h-32 rounded-full bg-gradient-to-br ${config.gradient}
        ${config.glow} transition-all duration-300
        group-hover:shadow-[0_0_60px_hsl(270_80%_60%/0.7)]
        animate-float
      `}>
        {/* Island surface */}
        <div className="absolute inset-2 rounded-full bg-card/80 backdrop-blur-sm flex flex-col items-center justify-center">
          <Icon className="w-10 h-10 text-foreground mb-1" />
          <span className="font-display text-sm font-bold text-foreground">{name}</span>
        </div>

        {/* Progress ring */}
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle
            cx="64"
            cy="64"
            r="60"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            className="text-muted/30"
          />
          <circle
            cx="64"
            cy="64"
            r="60"
            fill="none"
            stroke="url(#progressGradient)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={`${progress * 3.77} 377`}
            className="transition-all duration-500"
          />
          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(270, 80%, 60%)" />
              <stop offset="100%" stopColor="hsl(185, 80%, 50%)" />
            </linearGradient>
          </defs>
        </svg>

        {/* Quest count badge */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-card border border-border rounded-full text-xs font-display">
          {completedQuests}/{questCount}
        </div>
      </div>

      {/* Floating particles */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-2 h-2 rounded-full bg-gradient-to-r ${config.gradient}`}
          animate={{
            y: [0, -20, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            delay: i * 0.3,
            repeat: Infinity,
          }}
          style={{
            left: `${30 + i * 20}%`,
            top: `${10 + i * 10}%`,
          }}
        />
      ))}
    </motion.div>
  );
}
