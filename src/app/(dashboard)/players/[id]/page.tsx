
"use client"

import React from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AIInsightsPanel } from "@/components/dashboard/ai-insights-panel"
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts"
import { 
  Calendar, 
  MapPin, 
  ShieldCheck, 
  Award, 
  History, 
  Trophy, 
  TrendingUp,
  User
} from "lucide-react"

// Mock Data for a single player
const mockPlayerData = {
  id: "p1",
  name: "Chandan",
  role: "Batsman",
  age: 22,
  hand: "Right-hand",
  style: "Aggressive",
  status: "Active",
  stats: {
    batting: {
      matches: 45,
      innings: 42,
      runs: 240,
      average: 5.7,
      strikeRate: 128.1,
      fifties: 2,
      hundreds: 0,
      fours: 14,
      sixes: 22,
      dismissalTypes: { "Caught": 12, "Bowled": 8, "LBW": 4, "Run Out": 2 }
    },
    bowling: {
      matches: 45,
      innings: 5,
      balls: 60,
      runsConceded: 80,
      wickets: 2,
      economy: 8.0,
      average: 40.0,
      strikeRate: 30.0,
      maidenOvers: 0,
      dotBallPercentage: 35
    },
    fielding: {
      matches: 45,
      catches: 15,
      runOuts: 2
    },
    recentMatches: [
      { date: "2024-03-01", opponent: "Royal XI", runsScored: 82, ballsFaced: 45, dismissalType: "Not Out" },
      { date: "2024-02-24", opponent: "Titans CC", runsScored: 12, ballsFaced: 8, dismissalType: "Caught" },
      { date: "2024-02-18", opponent: "Stormers", runsScored: 45, ballsFaced: 32, dismissalType: "Bowled" },
      { date: "2024-02-10", opponent: "Eagles", runsScored: 110, ballsFaced: 62, dismissalType: "Not Out" },
    ]
  },
  historyData: [
    { month: "Jan", runs: 40, strikeRate: 115 },
    { month: "Feb", runs: 60, strikeRate: 128 },
    { month: "Mar", runs: 82, strikeRate: 142 },
    { month: "Apr", runs: 30, strikeRate: 130 },
    { month: "May", runs: 28, strikeRate: 148 },
  ]
}

export default function PlayerProfilePage() {
  const { id } = useParams()
  // In real app, fetch player by id
  const player = mockPlayerData

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <Avatar className="h-24 w-24 border-4 border-primary/10">
            <AvatarImage src={`https://picsum.photos/seed/${id}/200/200`} />
            <AvatarFallback>{player.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h1 className="text-3xl font-bold font-headline">{player.name}</h1>
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                {player.role}
              </Badge>
              <span className="text-muted-foreground text-sm flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" /> {player.age} Years
              </span>
              <span className="text-muted-foreground text-sm flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5" /> {player.hand}
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Badge variant="secondary" className="px-3 py-1">Overall Rank: #1</Badge>
          <Badge className="px-3 py-1 bg-emerald-500 hover:bg-emerald-600">Available</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Tabs defaultValue="stats" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="stats" className="gap-2"><TrendingUp className="h-4 w-4" /> Performance</TabsTrigger>
              <TabsTrigger value="history" className="gap-2"><History className="h-4 w-4" /> Match History</TabsTrigger>
              <TabsTrigger value="details" className="gap-2"><User className="h-4 w-4" /> Personal Details</TabsTrigger>
            </TabsList>

            <TabsContent value="stats" className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="bg-card/50">
                  <CardContent className="pt-6 text-center">
                    <div className="text-2xl font-bold">{player.stats.batting.average}</div>
                    <div className="text-xs text-muted-foreground">Average</div>
                  </CardContent>
                </Card>
                <Card className="bg-card/50">
                  <CardContent className="pt-6 text-center">
                    <div className="text-2xl font-bold">{player.stats.batting.strikeRate}</div>
                    <div className="text-xs text-muted-foreground">Strike Rate</div>
                  </CardContent>
                </Card>
                <Card className="bg-card/50">
                  <CardContent className="pt-6 text-center">
                    <div className="text-2xl font-bold">{player.stats.batting.sixes}</div>
                    <div className="text-xs text-muted-foreground">Sixes</div>
                  </CardContent>
                </Card>
                <Card className="bg-card/50">
                  <CardContent className="pt-6 text-center">
                    <div className="text-2xl font-bold">{player.stats.batting.runs}</div>
                    <div className="text-xs text-muted-foreground">Total Runs</div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Run Scoring Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={player.historyData}>
                        <defs>
                          <linearGradient id="colorRuns" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                        <XAxis dataKey="month" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip 
                          contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}
                        />
                        <Area type="monotone" dataKey="runs" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorRuns)" strokeWidth={3} />
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
                    {player.stats.recentMatches.map((match, i) => (
                      <div key={i} className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors">
                        <div className="space-y-1">
                          <p className="font-semibold">{match.opponent}</p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Calendar className="h-3 w-3" /> {match.date}
                          </p>
                        </div>
                        <div className="text-right space-y-1">
                          <div className="font-bold text-lg">{match.runsScored}<span className="text-xs font-normal text-muted-foreground ml-1">({match.ballsFaced})</span></div>
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
                      <p className="font-medium">{player.hand} Bat</p>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground uppercase font-semibold">Bowling Style</label>
                      <p className="font-medium">Right-arm Medium</p>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground uppercase font-semibold">Playing Role</label>
                      <p className="font-medium">{player.role}</p>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground uppercase font-semibold">Join Date</label>
                      <p className="font-medium">Jan 12, 2024</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <AIInsightsPanel player={{ name: player.name, role: player.role, stats: player.stats }} />
          
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
                  <p className="text-sm font-medium">Academy Player of the Month</p>
                  <p className="text-xs text-muted-foreground">March 2024</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
