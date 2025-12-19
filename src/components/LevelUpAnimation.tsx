import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Trophy, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LevelUpAnimationProps {
  newLevel: number;
  rewards?: string[];
  onClose: () => void;
}

export function LevelUpAnimation({ newLevel, rewards = [], onClose }: LevelUpAnimationProps) {
  const [showRewards, setShowRewards] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-md"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
        className="text-center"
      >
        {/* Sparkles background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                opacity: 0, 
                scale: 0,
                x: Math.random() * 400 - 200,
                y: Math.random() * 400 - 200
              }}
              animate={{ 
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                x: Math.random() * 600 - 300,
                y: Math.random() * 600 - 300
              }}
              transition={{ 
                duration: 2,
                delay: i * 0.1,
                repeat: Infinity,
                repeatDelay: 1
              }}
              className="absolute left-1/2 top-1/2"
            >
              <Sparkles className="w-6 h-6 text-gold" />
            </motion.div>
          ))}
        </div>

        {/* Level up text */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="font-display text-2xl text-gold uppercase tracking-widest mb-2">
            Level Up!
          </h1>
        </motion.div>

        {/* Level number */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="relative mb-6"
        >
          <div className="w-40 h-40 mx-auto rounded-full bg-gradient-to-br from-gold via-amber-500 to-orange-600 flex items-center justify-center glow-gold">
            <div className="w-36 h-36 rounded-full bg-background flex items-center justify-center">
              <span className="text-6xl font-display font-bold text-gold">{newLevel}</span>
            </div>
          </div>
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {[...Array(6)].map((_, i) => (
              <Star
                key={i}
                className="absolute w-6 h-6 text-gold fill-gold"
                style={{
                  transform: `rotate(${i * 60}deg) translateY(-80px)`
                }}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* Rewards section */}
        <AnimatePresence>
          {!showRewards ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Button 
                variant="gold" 
                size="lg" 
                onClick={() => setShowRewards(true)}
                className="gap-2"
              >
                Claim Rewards <ArrowRight className="w-4 h-4" />
              </Button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-center gap-2 text-gold">
                <Trophy className="w-5 h-5" />
                <span className="font-display">Rewards Unlocked</span>
              </div>
              
              <div className="flex gap-3 justify-center flex-wrap">
                {rewards.map((reward, index) => (
                  <motion.div
                    key={reward}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="px-4 py-2 glass-card rounded-xl text-foreground font-medium"
                  >
                    {reward}
                  </motion.div>
                ))}
              </div>

              <Button 
                variant="outline" 
                size="lg" 
                onClick={onClose}
                className="mt-4"
              >
                Continue Adventure
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
