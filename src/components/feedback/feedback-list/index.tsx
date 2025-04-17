"use client";

import { Session } from "next-auth";

import FeedbackItem from "@/components/feedback/feedback-item";

interface Feedback {
  id: string;
  comment: string;
  rating: number;
  updatedAt: string;
  user: { email: string };
}

interface Props {
  feedbacks: Feedback[];
  session: Session | null;
  onEdit: (id: string, comment: string, rating: number) => void;
  onDelete: (id: string) => void;
}

export default function FeedbackList({ feedbacks, session, onEdit, onDelete }: Props) {
  if (feedbacks.length === 0) {
    return (
      <p className="text-muted-foreground mt-4">No feedbacks yet. Be the first to leave one!</p>
    );
  }

  return (
    <div className="space-y-4">
      {feedbacks.map((fb) => (
        <FeedbackItem
          key={fb.id}
          feedback={fb}
          session={session}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
