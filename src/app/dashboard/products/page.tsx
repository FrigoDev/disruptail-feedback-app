"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

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
import type { Product } from "@/types/entities";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  const filtered = products.filter((product) => {
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const uniqueCategories = Array.from(new Set(products.map((p) => p.category)));

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Products</h1>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-2">
          <Label htmlFor="search" className="text-sm font-medium text-muted-foreground">
            Search by product name
          </Label>
          <Input
            id="search"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-64"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label className="text-sm font-medium text-muted-foreground">Filter by Category</Label>
          <Select
            defaultValue="all"
            onValueChange={(val) => setSelectedCategory(val === "all" ? null : val)}
          >
            <SelectTrigger className="w-48" aria-label="Category Filter">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {uniqueCategories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((product) => (
          <Card
            key={product.id}
            className="transition-transform duration-200 hover:scale-105 cursor-pointer"
          >
            <Link href={`/dashboard/products/${product.id}`}>
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <Image
                  src={product.image}
                  alt={product.name}
                  className="w-full object-cover rounded"
                  width={250}
                  height={250}
                />
                <p className="text-foreground font-medium">{product.description}</p>
                <p>Category: {product.category}</p>
                <p>Rating: {product.rating.toFixed(1)} ⭐</p>
                <p>{product.feedbackCount} Feedbacks received</p>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
