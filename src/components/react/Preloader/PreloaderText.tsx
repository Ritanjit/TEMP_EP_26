import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TextGenerateEffect } from '../../ui/text-generate-effect';

/**
 * PreloaderText.tsx
 * 
 * Handles the 4 text sequences that fade in/out based on loading progress.
 * Uses TextGenerateEffect for a cool sentence-by-sentence fade-in animation.
 */

interface PreloaderTextProps {
  progress: number;
  onComplete?: () => void;
}

interface TextSequence {
  id: number;
  lines: string[]; // Array of sentences for sentence-by-sentence animation
  focus: string;
}

const sequences: TextSequence[] = [
{
    id: 1,
    lines: [
      '...deep within the soil of the Eight Lands,',
      'our ancient roots intertwine.'
    ],
    focus: 'Unity and Roots'
  },
  {
    id: 2,
    lines: [
      'with the rhino’s armor and bamboo’s resilience,',
      'we conquer the rivers and silent mountains...'
    ],
    focus: 'Resilience and Nature'
  },
];

// ============================================
// TIMING CONFIGURATION - Modify these values
// ============================================

// Time gap between TextSequences (in percentage of progress)
// Lower = faster transitions, Higher = longer display time
// Currently: each sequence shows for ~25% of the progress (100/4 sequences)
const SEQUENCE_THRESHOLDS = {
  sequence1End: 70,   // Sequence 1 shows from 0% to 50%
  sequence2End: 100,   // Sequence 2 shows from 50% to 100%
};

// Delay between each sentences within a sequence (in seconds)
const SENTENCE_STAGGER_DELAY = 1.5; 

// Duration of each sentence's fade-in animation (in seconds)
const SENTENCE_FADE_DURATION = 1;

// ============================================

const getSequenceIndex = (progress: number): number => {
  if (progress < SEQUENCE_THRESHOLDS.sequence1End) return 0;
  return 1;
};

export const PreloaderText: React.FC<PreloaderTextProps> = ({ progress }) => {
  const currentIndex = getSequenceIndex(progress);
  const currentSequence = sequences[currentIndex];

  return (
    <div 
      className="relative z-10 flex flex-col items-center justify-center h-screen min-h-screen px-4 sm:px-8 pb-16 sm:pb-0"
      style={{ fontFamily: 'var(--font-body)' }}
    >

      <AnimatePresence mode="wait">
        <motion.div
          key={currentSequence.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1]
          }}
          className="text-center max-w-xs sm:max-w-2xl md:max-w-4xl mx-auto"
        >
          {/* TextGenerateEffect for sentence-by-sentence animation */}
          <TextGenerateEffect 
            sentences={currentSequence.lines}
            className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl"
            duration={SENTENCE_FADE_DURATION}
            staggerDelay={SENTENCE_STAGGER_DELAY}
            filter={true}
          />
        </motion.div>
      </AnimatePresence>

      {/* Progress indicator - subtle */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1 }}
      >
        <div
          className="w-32 sm:w-48 h-0.5 rounded-full overflow-hidden"
          style={{ backgroundColor: 'rgba(239, 230, 193, 0.2)' }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: 'var(--euphuism-beige)' }}
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default PreloaderText;
