"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Collection } from "@/types/collection";
import CollectionGrid from "./collection-grid";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CollectionViewerProps {
  collections: Collection[];
}

export default function CollectionViewer({
  collections,
}: CollectionViewerProps) {
  const [activeCollection, setActiveCollection] = useState(0);

  const handlePrevious = () => {
    setActiveCollection((prev) =>
      prev > 0 ? prev - 1 : collections.length - 1
    );
  };

  const handleNext = () => {
    setActiveCollection((prev) =>
      prev < collections.length - 1 ? prev + 1 : 0
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold tracking-tight">
          {collections[activeCollection]?.name || "Collection"}
        </h2>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrevious}
            aria-label="Previous collection"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleNext}
            aria-label="Next collection"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="grid" className="w-full">
        <div className="flex items-center justify-between mb-4">
          <p className="text-muted-foreground">
            {collections[activeCollection]?.description || ""}
          </p>
          <TabsList>
            <TabsTrigger value="grid">Grid</TabsTrigger>
            <TabsTrigger value="slider">Slider</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="grid" className="mt-0">
          <CollectionGrid collection={collections[activeCollection]} />
        </TabsContent>

        <TabsContent value="slider" className="mt-0">
          <div className="relative overflow-hidden rounded-lg border">
            <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4">
              {collections[activeCollection]?.items.map((item, index) => (
                <div
                  key={index}
                  className="min-w-[280px] md:min-w-[320px] snap-start p-4 shrink-0 first:pl-4 last:pr-4 md:basis-1/2 lg:basis-1/3"
                >
                  <div className="overflow-hidden rounded-lg border bg-background">
                    <div className="aspect-square relative">
                      <img
                        src={
                          item.imageUrl ||
                          `/placeholder.svg?height=400&width=400&text=${item.title}`
                        }
                        alt={item.title}
                        className="object-cover w-full h-full"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute left-0 top-1/2 -translate-y-1/2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
                onClick={handlePrevious}
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous</span>
              </Button>
            </div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
                onClick={handleNext}
              >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next</span>
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-center gap-1 mt-4">
        {collections.map((_, index) => (
          <Button
            key={index}
            variant="ghost"
            size="icon"
            className={`w-2 h-2 rounded-full p-0 ${
              index === activeCollection ? "bg-primary" : "bg-muted"
            }`}
            onClick={() => setActiveCollection(index)}
            aria-label={`Go to collection ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
