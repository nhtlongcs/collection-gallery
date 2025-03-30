import CollectionViewer from "@/components/collection-viewer";
import { collections } from "@/data/collections";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/50 flex flex-col">
      <header className="container py-6 md:py-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          Collection Visualizer
        </h1>
        <p className="text-muted-foreground mt-2">
          Explore beautiful collections with smooth navigation
        </p>
      </header>

      <div className="flex-1 container py-6">
        <CollectionViewer collections={collections} />
      </div>

      <footer className="border-t py-6">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Collection Visualizer
          </p>
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
