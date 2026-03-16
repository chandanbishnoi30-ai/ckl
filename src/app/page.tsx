
import Link from "next/link"
import Image from "next/image"
import { Trophy, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PlaceHolderImages } from "@/lib/placeholder-images"

export default function LandingPage() {
  const cricketGroundImg = PlaceHolderImages.find(img => img.id === 'cricket-ground');

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white/50 backdrop-blur-md sticky top-0 z-50">
        <Link className="flex items-center justify-center gap-2" href="/">
          <Trophy className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl font-headline tracking-tighter">CKL Official</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/dashboard">
            Dashboard
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48 overflow-hidden">
          {/* Wallpaper / Background Image */}
          <div className="absolute inset-0 z-0">
            {cricketGroundImg && (
              <Image
                src={cricketGroundImg.imageUrl}
                alt={cricketGroundImg.description}
                fill
                className="object-cover opacity-20"
                priority
                data-ai-hint={cricketGroundImg.imageHint}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background" />
          </div>

          <div className="container relative z-10 px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2 max-w-3xl">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline">
                  set Bright Future with <span className="text-primary">CKL Official</span>
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  The ultimate management platform for cricket academies. Track player performance and unlock AI-powered performance insights.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="h-12 px-8 rounded-full shadow-lg hover:shadow-primary/25 transition-all" asChild>
                  <Link href="/dashboard">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-12 px-4 md:px-6">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            <span className="font-bold">CKL Official</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2024 CKL Official Academy Systems. All rights reserved.</p>
          <div className="flex gap-4">
            <Link className="text-sm text-muted-foreground hover:underline underline-offset-4" href="#">
              Privacy Policy
            </Link>
            <Link className="text-sm text-muted-foreground hover:underline underline-offset-4" href="#">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
