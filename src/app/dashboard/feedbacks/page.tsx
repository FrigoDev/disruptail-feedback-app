"use client";

import { Paperclip } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import type { Feedback } from "@/types/entities";

export default function FeedbackListPage() {
  const { data: session } = useSession();
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const isAdmin = session?.user?.role === "ADMIN";
  const userEmail = session?.user?.email;

  const fetchFeedbacks = async () => {
    try {
      const res = await fetch("/api/feedbacks");
      const data = await res.json();
      setFeedbacks(data);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this feedback?")) return;
    try {
      const res = await fetch(`/api/feedbacks/${id}`, { method: "DELETE" });
      if (res.ok) fetchFeedbacks();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const filtered = feedbacks.filter((fb) => {
    const nameMatch = fb.product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const ratingMatch = selectedRating !== null ? fb.rating === selectedRating : true;
    return nameMatch && ratingMatch;
  });

  if (loading) return <Skeleton className="h-96 w-full rounded" />;

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">{isAdmin ? "Feedback Manager" : "Your Feedback"}</h1>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-2">
          <Label htmlFor="search" className="text-sm font-medium text-muted-foreground">
            Search by product name
          </Label>
          <Input
            id="search"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="rating" className="text-sm font-medium text-muted-foreground">
            Filter by rating
          </Label>
          <Select
            defaultValue="all"
            onValueChange={(val) => setSelectedRating(val === "all" ? null : Number(val))}
          >
            <SelectTrigger className="w-48">
              <SelectValue placeholder="All Ratings" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {[5, 4, 3, 2, 1].map((r) => (
                <SelectItem key={r} value={r.toString()}>
                  {r} ⭐
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-muted-foreground">No feedbacks found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((fb) => {
            const canDelete = isAdmin || fb.user.email === userEmail;

            return (
              <Card
                key={fb.id}
                className="transition-transform duration-200 hover:scale-105 border border-border rounded-md shadow-sm"
              >
                <CardHeader>
                  <CardTitle>
                    <Link
                      href={`/dashboard/products/${fb.product.id}`}
                      className="hover:underline flex items-center gap-2 text-foreground"
                    >
                      {fb.product.name}
                      <Paperclip className="w-4 h-4 text-muted-foreground" />
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  <p className="text-foreground font-medium">{fb.comment}</p>
                  <p>Rating: {fb.rating} ⭐</p>
                  <div className="flex justify-between items-center pt-4 text-xs text-muted-foreground">
                    {canDelete ? (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(fb.id)}
                        className="text-xs"
                      >
                        Delete
                      </Button>
                    ) : (
                      <span />
                    )}
                    <span>{new Date(fb.updatedAt).toLocaleDateString()}</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
