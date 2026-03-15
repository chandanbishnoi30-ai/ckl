
import Link from "next/link"
import { Trophy, ArrowRight, ShieldCheck, BarChart3, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white/50 backdrop-blur-md sticky top-0 z-50">
        <Link className="flex items-center justify-center gap-2" href="/">
          <Trophy className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl font-headline tracking-tighter">CricketTrack</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#features">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/login">
            Login
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2 max-w-3xl">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline">
                  Elevate Your Academy with <span className="text-primary">Precision Tracking</span>
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  The ultimate management platform for cricket academies. Track player stats, schedule sessions, and unlock AI-powered performance insights.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="h-12 px-8 rounded-full shadow-lg hover:shadow-primary/25 transition-all" asChild>
                  <Link href="/dashboard">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="h-12 px-8 rounded-full" asChild>
                  <Link href="#demo">View Demo</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-24 bg-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-12 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="p-4 bg-primary/10 rounded-2xl">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold font-headline">Roster Management</h3>
                <p className="text-muted-foreground">Easily organize players by age group, role, and skill level. Manage profiles and history in one place.</p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="p-4 bg-blue-100 rounded-2xl">
                  <BarChart3 className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold font-headline">Stats Deep Dive</h3>
                <p className="text-muted-foreground">Detailed batting, bowling, and fielding metrics for every session. Visualize progress with interactive charts.</p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="p-4 bg-indigo-100 rounded-2xl">
                  <ShieldCheck className="h-8 w-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold font-headline">AI Performance Insights</h3>
                <p className="text-muted-foreground">Generative AI analysis provides personalized drills and highlights areas for technical improvement.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-12 px-4 md:px-6">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            <span className="font-bold">CricketTrack</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2024 CricketTrack Academy Systems. All rights reserved.</p>
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
