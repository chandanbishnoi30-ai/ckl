"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AIInsightsPanel } from "@/components/dashboard/ai-insights-panel"
import { Separator } from "@/components/ui/separator"
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
  name: "Krishan",
  role: "All-rounder",
  age: 15,
  hand: "Left-hand",
  status: "Active",
  stats: {
    batting: {
      matches: 10,
      innings: 10,
      runs: 185,
      average: 23.1,
      strikeRate: 118.5,
      fours: 12,
      sixes: 8,
    },
    bowling: {
      matches: 10,
      wickets: 8,
      economy: 7.2,
      average: 18.5,
    },
    fielding: {
      catches: 8,
      runOuts: 2
    },
    recentMatches: [
      { date: "2024-03-14", opponent: "Eagles CC", runsScored: 32, wicketsTaken: 2, dismissalType: "Caught" },
      { date: "2024-03-07", opponent: "Warriors", runsScored: 12, wicketsTaken: 1, dismissalType: "Bowled" },
    ]
  },
  historyData: [
    { month: "Jan", runs: 30 },
    { month: "Feb", runs: 85 },
    { month: "Mar", runs: 70 },
  ]
}

export default function KrishanProfilePage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <Avatar className="h-24 w-24 border-4 border-primary/10">
            <AvatarImage src="https://picsum.photos/seed/krishan/200/200" />
            <AvatarFallback>KR</AvatarFallback>
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
          <Badge variant="secondary" className="px-3 py-1">Overall Rank: #2</Badge>
          <Badge className="px-3 py-1 bg-emerald-500">Active</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Tabs defaultValue="stats" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="stats" className="gap-2"><TrendingUp className="h-4 w-4" /> Performance</TabsTrigger>
              <TabsTrigger value="history" className="gap-2"><History className="h-4 w-4" /> History</TabsTrigger>
              <TabsTrigger value="details" className="gap-2"><User className="h-4 w-4" /> Info</TabsTrigger>
            </TabsList>

            <TabsContent value="stats" className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="bg-card/50">
                  <CardContent className="pt-6 text-center">
                    <div className="text-2xl font-bold">{playerData.stats.batting.runs}</div>
                    <div className="text-xs text-muted-foreground">Runs</div>
                  </CardContent>
                </Card>
                <Card className="bg-card/50">
                  <CardContent className="pt-6 text-center">
                    <div className="text-2xl font-bold">{playerData.stats.bowling.wickets}</div>
                    <div className="text-xs text-muted-foreground">Wickets</div>
                  </CardContent>
                </Card>
                <Card className="bg-card/50">
                  <CardContent className="pt-6 text-center">
                    <div className="text-2xl font-bold">{playerData.stats.bowling.economy}</div>
                    <div className="text-xs text-muted-foreground">Economy</div>
                  </CardContent>
                </Card>
                <Card className="bg-card/50">
                  <CardContent className="pt-6 text-center">
                    <div className="text-2xl font-bold">{playerData.stats.fielding.catches}</div>
                    <div className="text-xs text-muted-foreground">Catches</div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Performance Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={playerData.historyData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="month" stroke="#888" fontSize={12} />
                        <YAxis stroke="#888" fontSize={12} />
                        <Tooltip />
                        <Area type="monotone" dataKey="runs" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.1} strokeWidth={3} />
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
                      <div key={i} className="flex items-center justify-between p-4">
                        <div className="space-y-1">
                          <p className="font-semibold">{match.opponent}</p>
                          <p className="text-xs text-muted-foreground">{match.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">{match.runsScored} Runs / {match.wicketsTaken} Wkts</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="details">
              <Card>
                <CardContent className="pt-6">
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
                  <Separator className="my-4" />
                  <p className="text-sm">Versatile all-rounder with strong finishing capabilities in middle overs.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <AIInsightsPanel player={{ name: playerData.name, role: playerData.role, stats: playerData.stats }} />
          <Card>
            <CardHeader><CardTitle className="text-lg">Honors</CardTitle></CardHeader>
            <CardContent>
              <div className="flex gap-3 items-center">
                <Trophy className="h-5 w-5 text-amber-500" />
                <p className="text-sm font-medium">Best All-rounder 2023</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}