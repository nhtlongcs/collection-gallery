"use client";

import { useEffect, useRef, useState } from "react";
import type { Collection } from "@/types/collection";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface CollectionGridProps {
  collection: Collection;
}

export default function CollectionGrid({ collection }: CollectionGridProps) {
  const [visibleItems, setVisibleItems] = useState(8);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && visibleItems < collection?.items.length) {
          // Add more items when the load more sentinel is visible
          setVisibleItems((prev) =>
            Math.min(prev + 8, collection?.items.length)
          );
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [visibleItems, collection?.items.length]);

  if (!collection) {
    return <div className="text-center py-12">No collection selected</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {collection.items.slice(0, visibleItems).map((item, index) => (
        <Card
          key={index}
          className="overflow-hidden transition-all hover:shadow-md"
        >
          <div className="aspect-square relative overflow-hidden">
            <img
              src={
                item.imageUrl ||
                `/placeholder.svg?height=300&width=300&text=${item.title}`
              }
              alt={item.title}
              className="object-cover w-full h-full transition-transform hover:scale-105"
              loading="lazy"
            />
          </div>
          <CardContent className="p-4">
            <h3 className="font-medium truncate">{item.title}</h3>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <p className="text-sm text-muted-foreground line-clamp-2">
              {item.description}
            </p>
          </CardFooter>
        </Card>
      ))}

      {visibleItems < collection.items.length && (
        <div
          ref={loadMoreRef}
          className="col-span-full flex justify-center p-4"
        >
          <div className="animate-pulse flex space-x-2">
            <div className="w-2 h-2 bg-muted rounded-full"></div>
            <div className="w-2 h-2 bg-muted rounded-full"></div>
            <div className="w-2 h-2 bg-muted rounded-full"></div>
          </div>
        </div>
      )}
    </div>
  );
}
