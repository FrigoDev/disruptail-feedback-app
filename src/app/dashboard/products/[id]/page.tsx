"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";

import FeedbackForm from "@/components/feedback/feedback-form";
import FeedbackList from "@/components/feedback/feedback-list";
import { Skeleton } from "@/components/ui/skeleton";

interface Feedback {
  id: string;
  comment: string;
  rating: number;
  updatedAt: string;
  user: {
    email: string;
  };
}

interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  image: string;
  rating: number;
  feedbackCount: number;
  feedbacks: Feedback[];
}

export default function ProductDetailPage() {
  const { data: session } = useSession();
  const params = useParams();
  const id =
    typeof params.id === "string" ? params.id : Array.isArray(params.id) ? params.id[0] : null;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProduct = useCallback(async () => {
    if (!id) return;

    try {
      const res = await fetch(`/api/products/${id}`);
      const data = await res.json();
      setProduct(data);
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const handleDelete = async (feedbackId: string) => {
    try {
      await fetch(`/api/feedbacks/${feedbackId}`, {
        method: "DELETE",
      });
      fetchProduct();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleEdit = async (feedbackId: string, comment: string, rating: number) => {
    try {
      await fetch(`/api/feedbacks/${feedbackId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comment, rating }),
      });
      fetchProduct();
    } catch (err) {
      console.error("Edit error:", err);
    }
  };

  if (!id) return <p className="text-destructive">Invalid product ID</p>;
  if (loading) return <Skeleton className="h-96 w-full rounded" />;
  if (!product) return <p className="text-muted-foreground">Product not found.</p>;

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <Image
            src={product.image}
            alt={product.name}
            width={600}
            height={600}
            className="rounded-lg w-full object-cover"
          />
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-foreground">{product.name}</h1>
          <p className="text-muted-foreground">Category: {product.category}</p>
          <p className="text-foreground text-lg">{product.description}</p>
          <div className="text-yellow-600 font-medium">
            Rating: {product.rating.toFixed(1)} ⭐ ({product.feedbackCount} feedbacks)
          </div>
        </div>
      </div>

      <div className="pt-10 border-t">
        <h2 className="text-2xl font-semibold mb-4">Customer Feedback</h2>

        <FeedbackForm productId={product.id} onFeedbackSubmitted={fetchProduct} />

        <FeedbackList
          feedbacks={product.feedbacks}
          session={session}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </div>
    </div>
  );
}
