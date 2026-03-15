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
  name: "Chandan",
  role: "Batsman",
  age: 17,
  hand: "Right-hand",
  status: "Active",
  stats: {
    batting: {
      matches: 12,
      innings: 12,
      runs: 240,
      average: 24.0,
      strikeRate: 135.2,
      fours: 14,
      sixes: 22,
      fifties: 1,
      hundreds: 0,
    },
    bowling: {
      matches: 12,
      wickets: 21,
      economy: 5.4,
    },
    fielding: {
      catches: 5,
      runOuts: 1
    },
    recentMatches: [
      { date: "2024-03-15", opponent: "Eagles CC", runsScored: 52, ballsFaced: 38, dismissalType: "Caught" },
      { date: "2024-03-08", opponent: "Warriors", runsScored: 28, ballsFaced: 15, dismissalType: "Not Out" },
      { date: "2024-03-01", opponent: "Tigers CC", runsScored: 45, ballsFaced: 30, dismissalType: "Bowled" },
    ]
  },
  historyData: [
    { month: "Jan", runs: 40, wickets: 4 },
    { month: "Feb", runs: 65, wickets: 8 },
    { month: "Mar", runs: 135, wickets: 9 },
  ]
}

export default function ChandanProfilePage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <Avatar className="h-24 w-24 border-4 border-primary/10">
            <AvatarImage src="https://picsum.photos/seed/chandan/200/200" />
            <AvatarFallback>CH</AvatarFallback>
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
          <Badge variant="secondary" className="px-3 py-1">MVP Rank: #1</Badge>
          <Badge className="px-3 py-1 bg-emerald-500 hover:bg-emerald-600">Available</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Tabs defaultValue="stats" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="stats" className="gap-2"><TrendingUp className="h-4 w-4" /> Performance</TabsTrigger>
              <TabsTrigger value="history" className="gap-2"><History className="h-4 w-4" /> Match History</TabsTrigger>
              <TabsTrigger value="details" className="gap-2"><User className="h-4 w-4" /> Personal</TabsTrigger>
            </TabsList>

            <TabsContent value="stats" className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <Card className="bg-card/50">
                  <CardContent className="pt-6 text-center px-2">
                    <div className="text-2xl font-bold">{playerData.stats.batting.runs}</div>
                    <div className="text-[10px] uppercase text-muted-foreground font-semibold">Runs</div>
                  </CardContent>
                </Card>
                <Card className="bg-card/50">
                  <CardContent className="pt-6 text-center px-2">
                    <div className="text-2xl font-bold text-primary">{playerData.stats.bowling.wickets}</div>
                    <div className="text-[10px] uppercase text-muted-foreground font-semibold">Wickets</div>
                  </CardContent>
                </Card>
                <Card className="bg-card/50">
                  <CardContent className="pt-6 text-center px-2">
                    <div className="text-2xl font-bold">{playerData.stats.batting.fours}</div>
                    <div className="text-[10px] uppercase text-muted-foreground font-semibold">Fours</div>
                  </CardContent>
                </Card>
                <Card className="bg-card/50">
                  <CardContent className="pt-6 text-center px-2">
                    <div className="text-2xl font-bold">{playerData.stats.batting.sixes}</div>
                    <div className="text-[10px] uppercase text-muted-foreground font-semibold">Sixes</div>
                  </CardContent>
                </Card>
                <Card className="bg-card/50">
                  <CardContent className="pt-6 text-center px-2">
                    <div className="text-2xl font-bold">{playerData.stats.batting.strikeRate}</div>
                    <div className="text-[10px] uppercase text-muted-foreground font-semibold">SR</div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Scoring & Wicket Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={playerData.historyData}>
                        <defs>
                          <linearGradient id="colorRuns" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorWickets" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--secondary))" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="hsl(var(--secondary))" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                        <XAxis dataKey="month" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip />
                        <Area type="monotone" dataKey="runs" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorRuns)" strokeWidth={3} name="Runs" />
                        <Area type="monotone" dataKey="wickets" stroke="hsl(var(--secondary))" fillOpacity={1} fill="url(#colorWickets)" strokeWidth={3} name="Wickets" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history">
              <Card>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {playerData.stats.recentMatches.map((match, i) => (
                      <div key={i} className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors">
                        <div className="space-y-1">
                          <p className="font-semibold">{match.opponent}</p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Calendar className="h-3 w-3" /> {match.date}
                          </p>
                        </div>
                        <div className="text-right space-y-1">
                          <div className="font-bold text-lg">{match.runsScored}</div>
                          <Badge variant="outline" className="text-[10px] uppercase">{match.dismissalType}</Badge>
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
                      <label className="text-xs text-muted-foreground uppercase font-semibold">Role</label>
                      <p className="font-medium">{playerData.role}</p>
                    </div>
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
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3">
                <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 shrink-0">
                  <Award className="h-5 w-5" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">Top Scorer - Spring 2024</p>
                  <p className="text-xs text-muted-foreground">Academy Records</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
