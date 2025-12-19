import { motion } from 'framer-motion';
import { 
  GitBranch, 
  Globe, 
  Database, 
  Cpu, 
  Network, 
  ClipboardList 
} from 'lucide-react';

type Subject = 'dsa' | 'webdev' | 'database' | 'os' | 'networks' | 'software';

interface SubjectIslandProps {
  subject: Subject;
  name: string;
  questCount: number;
  completedQuests: number;
  locked?: boolean;
  onClick?: () => void;
}

const subjectConfig = {
  dsa: {
    icon: GitBranch,
    gradient: 'from-violet-500 to-purple-600',
    glow: 'shadow-[0_0_40px_hsl(270_80%_60%/0.5)]',
    ringColor: '#a855f7',
  },
  webdev: {
    icon: Globe,
    gradient: 'from-cyan-400 to-blue-500',
    glow: 'shadow-[0_0_40px_hsl(190_100%_50%/0.5)]',
    ringColor: '#22d3ee',
  },
  database: {
    icon: Database,
    gradient: 'from-emerald-400 to-green-500',
    glow: 'shadow-[0_0_40px_hsl(160_100%_45%/0.5)]',
    ringColor: '#34d399',
  },
  os: {
    icon: Cpu,
    gradient: 'from-orange-400 to-red-500',
    glow: 'shadow-[0_0_40px_hsl(25_100%_55%/0.5)]',
    ringColor: '#fb923c',
  },
  networks: {
    icon: Network,
    gradient: 'from-pink-400 to-rose-500',
    glow: 'shadow-[0_0_40px_hsl(340_100%_60%/0.5)]',
    ringColor: '#f472b6',
  },
  software: {
    icon: ClipboardList,
    gradient: 'from-yellow-400 to-amber-500',
    glow: 'shadow-[0_0_40px_hsl(45_100%_55%/0.5)]',
    ringColor: '#fbbf24',
  },
};

export function SubjectIsland({ subject, name, questCount, completedQuests, locked = false, onClick }: SubjectIslandProps) {
  const config = subjectConfig[subject];
  const Icon = config.icon;
  const progress = questCount > 0 ? (completedQuests / questCount) * 100 : 0;
  const circumference = 2 * Math.PI * 60;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <motion.div
      className={`relative cursor-pointer group ${locked ? 'opacity-50 grayscale' : ''}`}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={locked ? {} : { scale: 1.15, y: -15 }}
      transition={{ type: "spring", stiffness: 300 }}
      onClick={locked ? undefined : onClick}
    >
      {/* Floating island */}
      <div className={`
        relative w-28 h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-br ${config.gradient}
        ${config.glow} transition-all duration-300
        ${!locked ? 'group-hover:shadow-[0_0_60px_hsl(270_80%_60%/0.7)]' : ''}
        animate-float
      `}>
        {/* Island surface */}
        <div className="absolute inset-2 rounded-full bg-card/90 backdrop-blur-sm flex flex-col items-center justify-center">
          <Icon className="w-8 h-8 md:w-10 md:h-10 text-foreground mb-1" />
          <span className="font-display text-[10px] md:text-xs font-bold text-foreground text-center px-2 leading-tight">{name}</span>
        </div>

        {/* Progress ring */}
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 128 128">
          <circle
            cx="64"
            cy="64"
            r="60"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            className="text-muted/30"
          />
          <motion.circle
            cx="64"
            cy="64"
            r="60"
            fill="none"
            stroke={config.ringColor}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: strokeDashoffset }}
            transition={{ duration: 1, delay: 0.3 }}
          />
        </svg>

        {/* Quest count badge */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-card border border-border rounded-full text-xs font-display whitespace-nowrap">
          {completedQuests}/{questCount}
        </div>

        {/* Lock overlay */}
        {locked && (
          <div className="absolute inset-0 rounded-full bg-background/60 flex items-center justify-center">
            <div className="text-2xl">🔒</div>
          </div>
        )}
      </div>

      {/* Floating particles */}
      {!locked && [...Array(3)].map((_, i) => (
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
