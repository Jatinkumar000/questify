import { motion } from 'framer-motion';
import { Award, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';

type Rarity = 'common' | 'rare' | 'epic' | 'legendary';

interface Badge {
  id: string;
  name: string;
  description: string;
  rarity: Rarity;
  icon: string;
  earned: boolean;
  earnedDate?: string;
}

interface BadgeGalleryProps {
  badges: Badge[];
}

const rarityStyles = {
  common: {
    bg: 'badge-common',
    border: 'border-rarity-common/50',
    glow: '',
    label: 'Common',
  },
  rare: {
    bg: 'badge-rare',
    border: 'border-rarity-rare/50',
    glow: 'shadow-[0_0_20px_hsl(210_100%_60%/0.4)]',
    label: 'Rare',
  },
  epic: {
    bg: 'badge-epic',
    border: 'border-rarity-epic/50',
    glow: 'shadow-[0_0_25px_hsl(270_100%_65%/0.5)]',
    label: 'Epic',
  },
  legendary: {
    bg: 'badge-legendary',
    border: 'border-rarity-legendary/50',
    glow: 'shadow-[0_0_30px_hsl(45_100%_55%/0.6)]',
    label: 'Legendary',
  },
};

function BadgeItem({ badge }: { badge: Badge }) {
  const style = rarityStyles[badge.rarity];

  return (
    <motion.div
      whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
      transition={{ type: "spring", stiffness: 300 }}
      className="relative group"
    >
      <div
        className={`
          w-20 h-20 rounded-2xl ${style.bg} ${style.glow}
          flex items-center justify-center text-3xl
          border-2 ${style.border}
          ${!badge.earned ? 'opacity-30 grayscale' : ''}
          transition-all duration-300
        `}
      >
        {badge.icon}
        {badge.rarity === 'legendary' && badge.earned && (
          <Sparkles className="absolute -top-1 -right-1 w-5 h-5 text-gold animate-pulse" />
        )}
      </div>
      
      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-popover border border-border rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 w-40 text-center">
        <p className="font-display text-sm font-semibold text-foreground">{badge.name}</p>
        <p className="text-xs text-muted-foreground mt-1">{badge.description}</p>
        <span className={`text-xs font-display mt-1 block ${
          badge.rarity === 'legendary' ? 'text-gold' :
          badge.rarity === 'epic' ? 'text-rarity-epic' :
          badge.rarity === 'rare' ? 'text-rarity-rare' :
          'text-muted-foreground'
        }`}>
          {style.label}
        </span>
      </div>
    </motion.div>
  );
}

export function BadgeGallery({ badges }: BadgeGalleryProps) {
  const earnedBadges = badges.filter(b => b.earned);
  
  return (
    <Card variant="default" className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <Award className="w-5 h-5 text-gold" />
        <h3 className="font-display text-lg font-semibold text-foreground">Badge Collection</h3>
        <span className="text-sm text-muted-foreground ml-auto">
          {earnedBadges.length}/{badges.length}
        </span>
      </div>
      
      <div className="flex flex-wrap gap-4 justify-center">
        {badges.map((badge, index) => (
          <motion.div
            key={badge.id}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <BadgeItem badge={badge} />
          </motion.div>
        ))}
      </div>
    </Card>
  );
}
