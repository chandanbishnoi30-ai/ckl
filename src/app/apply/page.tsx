
"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { Trophy, ArrowLeft, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import { PlaceHolderImages } from "@/lib/placeholder-images"

export default function ApplyPage() {
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const cricketGroundImg = PlaceHolderImages.find(img => img.id === 'cricket-ground');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Application Received!",
        description: "The CKL Official coaching team will review your profile and contact you soon.",
      })
      // Reset form or redirect would happen here
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white/50 backdrop-blur-md sticky top-0 z-50">
        <Link className="flex items-center justify-center gap-2" href="/">
          <Trophy className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl font-headline tracking-tighter">CKL Official</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Button variant="ghost" asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        </nav>
      </header>

      <main className="flex-1 relative py-12 px-4 md:px-6">
        {/* Background Wallpaper */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {cricketGroundImg && (
            <Image
              src={cricketGroundImg.imageUrl}
              alt={cricketGroundImg.description}
              fill
              className="object-cover opacity-10"
              priority
              data-ai-hint={cricketGroundImg.imageHint}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/50 to-background" />
        </div>

        <div className="container relative z-10 mx-auto max-w-2xl">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold tracking-tighter font-headline mb-2">Join Our Academy</h1>
            <p className="text-muted-foreground">Start your journey to become a professional cricketer with world-class coaching.</p>
          </div>

          <Card className="shadow-xl border-primary/10">
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Player Registration</CardTitle>
                <CardDescription>Please provide accurate details for our scouts to review.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="Enter first name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Enter last name" required />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input id="age" type="number" placeholder="Years" min="5" max="40" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Primary Playing Role</Label>
                    <Select required>
                      <SelectTrigger id="role">
                        <SelectValue placeholder="Select Role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="batsman">Batsman</SelectItem>
                        <SelectItem value="bowler">Bowler</SelectItem>
                        <SelectItem value="allrounder">All-rounder</SelectItem>
                        <SelectItem value="wicketkeeper">Wicketkeeper</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="hand">Batting Hand</Label>
                    <Select required>
                      <SelectTrigger id="hand">
                        <SelectValue placeholder="Right/Left Hand" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="right">Right Hand</SelectItem>
                        <SelectItem value="left">Left Hand</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Contact Email</Label>
                    <Input id="email" type="email" placeholder="example@mail.com" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Previous Cricket Experience</Label>
                  <Textarea 
                    id="experience" 
                    placeholder="Tell us about the teams you've played for, your best performance, etc." 
                    className="min-h-[120px]"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <Button className="w-full h-12 text-lg" disabled={isSubmitting}>
                  {isSubmitting ? "Processing..." : (
                    <>
                      Submit Application <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  By submitting, you agree to our terms of service and acknowledge that we will process your personal data in accordance with our privacy policy.
                </p>
              </CardFooter>
            </form>
          </Card>
        </div>
      </main>

      <footer className="border-t py-12 px-4 md:px-6">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            <span className="font-bold">CKL Official</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2024 CKL Official Academy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
