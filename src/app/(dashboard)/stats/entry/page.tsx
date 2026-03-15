
"use client"

import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Save, UserPlus, History, ChevronRight } from "lucide-react"
import { toast } from "@/hooks/use-toast"

export default function StatsEntryPage() {
  const [loading, setLoading] = React.useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      toast({
        title: "Stats Saved Successfully",
        description: "The player statistics have been updated across the dashboard.",
      })
    }, 1500)
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight font-headline">Statistical Data Entry</h2>
          <p className="text-muted-foreground">Log performance data for players from today's session.</p>
        </div>
      </div>

      <Card className="shadow-lg border-primary/10">
        <CardHeader className="bg-muted/30">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <CardTitle>Session Details</CardTitle>
              <CardDescription>Select player and session type to begin</CardDescription>
            </div>
            <div className="flex gap-2">
              <Select defaultValue="p1">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Player" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="p1">Chandan</SelectItem>
                  <SelectItem value="p2">Krishan</SelectItem>
                  <SelectItem value="p3">Laxman</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="training">
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="training">Training</SelectItem>
                  <SelectItem value="match">Match</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit}>
            <Tabs defaultValue="batting" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="batting">Batting</TabsTrigger>
                <TabsTrigger value="bowling">Bowling</TabsTrigger>
                <TabsTrigger value="fielding">Fielding</TabsTrigger>
              </TabsList>
              
              <TabsContent value="batting" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="runs">Runs Scored</Label>
                    <Input id="runs" type="number" placeholder="0" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="balls">Balls Faced</Label>
                    <Input id="balls" type="number" placeholder="0" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dismissal">Dismissal Type</Label>
                    <Select>
                      <SelectTrigger id="dismissal">
                        <SelectValue placeholder="How out?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="notout">Not Out</SelectItem>
                        <SelectItem value="caught">Caught</SelectItem>
                        <SelectItem value="bowled">Bowled</SelectItem>
                        <SelectItem value="lbw">LBW</SelectItem>
                        <SelectItem value="runout">Run Out</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fours">Fours</Label>
                    <Input id="fours" type="number" placeholder="0" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sixes">Sixes</Label>
                    <Input id="sixes" type="number" placeholder="0" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dotballs">Dot Ball %</Label>
                    <Input id="dotballs" type="number" placeholder="0" />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="bowling" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="overs">Overs Bowled</Label>
                    <Input id="overs" step="0.1" type="number" placeholder="0.0" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="wickets">Wickets</Label>
                    <Input id="wickets" type="number" placeholder="0" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="conceded">Runs Conceded</Label>
                    <Input id="conceded" type="number" placeholder="0" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maidens">Maiden Overs</Label>
                    <Input id="maidens" type="number" placeholder="0" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dots">Dot Balls</Label>
                    <Input id="dots" type="number" placeholder="0" />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="fielding" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="catches">Catches</Label>
                    <Input id="catches" type="number" placeholder="0" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="runouts">Run Outs</Label>
                    <Input id="runouts" type="number" placeholder="0" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stumpings">Stumpings</Label>
                    <Input id="stumpings" type="number" placeholder="0" />
                  </div>
                </div>
              </TabsContent>

              <div className="flex justify-end gap-3 pt-8 border-t mt-8">
                <Button variant="outline" type="button">Discard Changes</Button>
                <Button className="px-8" disabled={loading}>
                  {loading ? "Saving..." : <><Save className="mr-2 h-4 w-4" /> Save Statistics</>}
                </Button>
              </div>
            </Tabs>
          </form>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <History className="h-4 w-4" /> Recent Entries
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y text-sm">
              <div className="p-3 flex justify-between items-center hover:bg-muted/50 transition-colors">
                <div>
                  <p className="font-medium">Chandan</p>
                  <p className="text-xs text-muted-foreground">82 Runs, Session #23</p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="p-3 flex justify-between items-center hover:bg-muted/50 transition-colors">
                <div>
                  <p className="font-medium">Krishan</p>
                  <p className="text-xs text-muted-foreground">3 Wickets, Session #22</p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-secondary/10 border-secondary/20">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <UserPlus className="h-4 w-4" /> Quick Note
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Always record balls faced for accurate strike rate calculation. For training sessions, use the 'Session #' format in match titles for grouping.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
