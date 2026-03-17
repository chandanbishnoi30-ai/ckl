
"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AIInsightsPanel } from "@/components/dashboard/ai-insights-panel"
import { 
  CartesianGrid, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts"
import { 
  Calendar, 
  ShieldCheck, 
  Award, 
  History, 
  Trophy, 
  TrendingUp,
  User
} from "lucide-react"

const playerData = {
  name: "Laxman",
  role: "Spinner All-rounder",
  age: 14,
  hand: "Right-hand",
  status: "Active",
  stats: {
    batting: {
      matches: 18,
      runs: 447,
      strikeRate: 112.4,
      fours: 44,
      sixes: 10,
      fifties: 2,
    },
    bowling: {
      matches: 18,
      wickets: 51,
      economy: 4.8,
      average: 12.5,
      strikeRate: 15.2,
    },
    fielding: {
      catches: 6,
      runOuts: 2
    },
    recentMatches: [
      { date: "2024-03-12", opponent: "Eagles CC", runsScored: 42, wicketsTaken: 3, runsConceded: 24, dismissalType: "Caught" },
      { date: "2024-03-05", opponent: "Warriors", runsScored: 15, wicketsTaken: 2, runsConceded: 18, dismissalType: "Not Out" },
    ]
  },
  historyData: [
    { month: "Jan", runs: 65, wickets: 8 },
    { month: "Feb", runs: 210, wickets: 25 },
    { month: "Mar", runs: 447, wickets: 51 },
  ]
}

export default function LaxmanProfilePage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <Avatar className="h-24 w-24 border-4 border-primary/10">
            <AvatarImage src="https://picsum.photos/seed/laxman/200/200" />
            <AvatarFallback>LX</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h1 className="text-3xl font-bold font-headline">{playerData.name}</h1>
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                {playerData.role}
              </Badge>
              <span className="text-muted-foreground text-sm flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" /> {playerData.age} Years
              </span>
              <span className="text-muted-foreground text-sm flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5" /> {playerData.hand}
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Badge variant="secondary" className="px-3 py-1">Overall Rank: #3</Badge>
          <Badge className="px-3 py-1 bg-emerald-500 hover:bg-emerald-600">Available</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Tabs defaultValue="stats" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="stats" className="gap-2"><TrendingUp className="h-4 w-4" /> Performance</TabsTrigger>
              <TabsTrigger value="history" className="gap-2"><History className="h-4 w-4" /> History</TabsTrigger>
              <TabsTrigger value="details" className="gap-2"><User className="h-4 w-4" /> Bio</TabsTrigger>
            </TabsList>

            <TabsContent value="stats" className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <Card className="bg-card/50 border-primary/10">
                  <CardContent className="pt-6 text-center px-2">
                    <div className="text-2xl font-bold">{playerData.stats.batting.runs}</div>
                    <div className="text-[10px] uppercase text-muted-foreground font-semibold">Runs</div>
                  </CardContent>
                </Card>
                <Card className="bg-card/50 border-primary/10">
                  <CardContent className="pt-6 text-center px-2">
                    <div className="text-2xl font-bold text-primary">{playerData.stats.bowling.wickets}</div>
                    <div className="text-[10px] uppercase text-muted-foreground font-semibold">Wickets</div>
                  </CardContent>
                </Card>
                <Card className="bg-card/50 border-primary/10">
                  <CardContent className="pt-6 text-center px-2">
                    <div className="text-2xl font-bold">{playerData.stats.batting.fours}</div>
                    <div className="text-[10px] uppercase text-muted-foreground font-semibold">Fours</div>
                  </CardContent>
                </Card>
                <Card className="bg-card/50 border-primary/10">
                  <CardContent className="pt-6 text-center px-2">
                    <div className="text-2xl font-bold">{playerData.stats.batting.sixes}</div>
                    <div className="text-[10px] uppercase text-muted-foreground font-semibold">Sixes</div>
                  </CardContent>
                </Card>
                <Card className="bg-card/50 border-primary/10">
                  <CardContent className="pt-6 text-center px-2">
                    <div className="text-2xl font-bold text-secondary">{playerData.stats.batting.fifties}</div>
                    <div className="text-[10px] uppercase text-muted-foreground font-semibold">50's</div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Career Progress Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={playerData.historyData}>
                        <defs>
                          <linearGradient id="colorRunsL" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorWicketsL" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--secondary))" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="hsl(var(--secondary))" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                        <XAxis dataKey="month" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip />
                        <Area type="monotone" dataKey="runs" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorRunsL)" strokeWidth={3} name="Runs" />
                        <Area type="monotone" dataKey="wickets" stroke="hsl(var(--secondary))" fillOpacity={1} fill="url(#colorWicketsL)" strokeWidth={3} name="Wickets" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history">
              <Card>
                <CardContent className="p-0">
                  <div className="divide-y text-sm">
                    {playerData.stats.recentMatches.map((match, i) => (
                      <div key={i} className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors">
                        <div>
                          <p className="font-semibold">{match.opponent}</p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                             <Calendar className="h-3 w-3" /> {match.date}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-primary">{match.wicketsTaken} Wkts / {match.runsScored} Runs</p>
                          <Badge variant="outline" className="text-[10px]">{match.dismissalType || "N/A"}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="details">
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-muted-foreground uppercase font-semibold">Batting Style</label>
                      <p className="font-medium">{playerData.hand} Bat</p>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground uppercase font-semibold">Bowling Style</label>
                      <p className="font-medium">Right-arm Off-spin</p>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground uppercase font-semibold">Role</label>
                      <p className="font-medium">{playerData.role}</p>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground uppercase font-semibold">Experience</label>
                      <p className="font-medium">Academy Elite Squad</p>
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    <p className="text-sm text-muted-foreground italic">
                      Laxman is a promising young talent specializing in off-spin bowling and providing crucial runs in the lower-middle order.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <AIInsightsPanel player={{ name: playerData.name, role: playerData.role, stats: playerData.stats }} />
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Trophy className="h-4 w-4 text-amber-500" />
                Awards
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3 items-center">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                   <Award className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium">Golden Ball - Junior Circuit</p>
                  <p className="text-xs text-muted-foreground">Most wickets in Season 2023</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
