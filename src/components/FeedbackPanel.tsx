import { Star } from 'lucide-react';
import { useState } from 'react';
import { FEEDBACK_AREAS } from '../data/menu';
import { writeStorage, readStorage } from '../lib/storage';
import type { BranchId } from '../types/menu';
import { ModalShell } from './ModalShell';

interface FeedbackPanelProps {
  open: boolean;
  onClose: () => void;
  branchId: BranchId;
  onSaved: () => void;
}

interface SavedFeedback {
  branch: BranchId;
  createdAt: string;
  ratings: Record<string, number>;
  guestName: string;
  waiterName: string;
  comment: string;
}

export function FeedbackPanel({ open, onClose, branchId, onSaved }: FeedbackPanelProps) {
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [guestName, setGuestName] = useState('');
  const [waiterName, setWaiterName] = useState('');
  const [comment, setComment] = useState('');

  const save = () => {
    const previous = readStorage<SavedFeedback[]>('enjoy.feedback', []);
    const next: SavedFeedback = {
      branch: branchId,
      createdAt: new Date().toISOString(),
      ratings,
      guestName: guestName.trim(),
      waiterName: waiterName.trim(),
      comment: comment.trim()
    };
    writeStorage('enjoy.feedback', [...previous.slice(-49), next]);
    setRatings({});
    setGuestName('');
    setWaiterName('');
    setComment('');
    onClose();
    onSaved();
  };

  return (
    <ModalShell open={open} onClose={onClose} title="Rate Your Experience">
      <div className="space-y-5">
        {FEEDBACK_AREAS.map((area) => (
          <div key={area} className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.035] p-4">
            <strong className="text-sm text-white">{area}</strong>
            <div className="flex gap-1" aria-label={`Rate ${area}`}>
              {[1, 2, 3, 4, 5].map((score) => {
                const active = score <= (ratings[area] ?? 0);
                return (
                  <button
                    key={score}
                    type="button"
                    className="p-1"
                    onClick={() => setRatings((current) => ({ ...current, [area]: score }))}
                    aria-label={`${score} star${score === 1 ? '' : 's'}`}
                  >
                    <Star size={20} fill={active ? 'currentColor' : 'none'} className={active ? 'text-[#ff4058]' : 'text-white/25'} />
                  </button>
                );
              })}
            </div>
          </div>
        ))}
        <div className="grid gap-3 sm:grid-cols-2">
          <input className="field" placeholder="Your name (optional)" value={guestName} onChange={(event) => setGuestName(event.target.value)} />
          <input className="field" placeholder="Waiter name (optional)" value={waiterName} onChange={(event) => setWaiterName(event.target.value)} />
        </div>
        <textarea className="field min-h-28 resize-y" placeholder="Tell us about your experience (optional)" value={comment} onChange={(event) => setComment(event.target.value)} />
        <button type="button" className="primary-button w-full justify-center py-4" onClick={save}>Submit feedback</button>
      </div>
    </ModalShell>
  );
}
