"use client";

import { Session } from "next-auth";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Feedback {
  id: string;
  comment: string;
  rating: number;
  updatedAt: string;
  user: { email: string };
}

interface Props {
  feedback: Feedback;
  session: Session | null;
  onDelete: (id: string) => void;
  onEdit: (id: string, comment: string, rating: number) => void;
}

export default function FeedbackItem({ feedback, session, onDelete, onEdit }: Props) {
  const isOwner = session?.user?.email === feedback.user.email;
  const isAdmin = session?.user?.role === "ADMIN";

  const [isEditing, setIsEditing] = useState(false);
  const [comment, setComment] = useState(feedback.comment);
  const [rating, setRating] = useState(feedback.rating);

  const handleSubmit = () => {
    onEdit(feedback.id, comment, rating);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="space-y-2 border border-border rounded-md p-4 mt-6">
        <Input
          value={rating}
          type="number"
          min={0}
          max={5}
          onChange={(e) => setRating(Number(e.target.value))}
        />
        <Textarea value={comment} onChange={(e) => setComment(e.target.value)} rows={3} />
        <div className="flex gap-2 justify-end">
          <Button size="sm" onClick={handleSubmit}>
            Save
          </Button>
          <Button size="sm" variant="ghost" onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2 border border-border rounded-md p-4 mt-6">
      <div className="flex justify-between items-start">
        <div>
          <p className="font-medium text-foreground">{feedback.user.email}</p>
          <p className="text-foreground mt-1">{feedback.comment}</p>
        </div>
        <div className="text-right space-y-1">
          <p className="text-yellow-600">{feedback.rating.toFixed(1)} ⭐</p>
          {(isOwner || isAdmin) && (
            <div className="flex gap-2">
              {isOwner && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-xs text-blue-600 hover:underline"
                >
                  Edit
                </button>
              )}
              <button
                onClick={() => onDelete(feedback.id)}
                className="text-xs text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
      <p className="text-sm text-muted-foreground text-right">
        {new Date(feedback.updatedAt).toLocaleDateString()}
      </p>
    </div>
  );
}
