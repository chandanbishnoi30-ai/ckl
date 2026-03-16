
"use client"

import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Trophy, TrendingUp, CheckCircle2 } from "lucide-react"
import { 
  Bar, 
  BarChart, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip,
  Cell
} from "recharts"
import { PlaceHolderImages } from "@/lib/placeholder-images"

const data = [
  { name: "Mon", runs: 45 },
  { name: "Tue", runs: 52 },
  { name: "Wed", runs: 38 },
  { name: "Thu", runs: 65 },
  { name: "Fri", runs: 48 },
  { name: "Sat", runs: 85 },
  { name: "Sun", runs: 72 },
]

const stats = [
  { title: "Total Players", value: "3", icon: Users, description: "Chandan, Krishan, Laxman", color: "text-blue-600" },
  { title: "Avg. Strike Rate", value: "112.4", icon: TrendingUp, description: "+5.2% improvement", color: "text-purple-600" },
]

export default function DashboardPage() {
  const pitchImg = PlaceHolderImages.find(img => img.id === 'cricket-pitch');

  return (
    <div className="space-y-6 relative min-h-screen -m-4 md:-m-8 p-4 md:p-8">
      {/* Background Wallpaper */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {pitchImg && (
          <Image
            src={pitchImg.imageUrl}
            alt={pitchImg.description}
            fill
            className="object-cover opacity-15"
            priority
            data-ai-hint={pitchImg.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/60 to-background" />
      </div>

      <div className="flex flex-col gap-1 relative z-10">
        <h2 className="text-3xl font-bold tracking-tight font-headline">Academy Overview</h2>
        <p className="text-muted-foreground">Welcome back! Here's a quick look at your academy's performance.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 relative z-10">
        {stats.map((stat) => (
          <Card key={stat.title} className="hover:shadow-md transition-shadow cursor-default bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 relative z-10">
        <Card className="lg:col-span-4 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Team Performance Trend</CardTitle>
            <CardDescription>Average runs scored per player this week</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                  <Tooltip 
                    cursor={{fill: 'rgba(0,0,0,0.05)'}}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-white p-2 border rounded-lg shadow-sm">
                            <p className="text-xs font-bold text-primary">{`${payload[0].value} Runs`}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="runs" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]}>
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 5 ? "hsl(var(--secondary))" : "hsl(var(--primary))"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest performance updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              <div className="flex items-center">
                <div className="bg-blue-100 p-2 rounded-full mr-4">
                  <CheckCircle2 className="h-4 w-4 text-blue-600" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">Chandan achieved new personal best</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="bg-emerald-100 p-2 rounded-full mr-4">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">Krishan profile updated with session #22</p>
                  <p className="text-xs text-muted-foreground">Yesterday</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="bg-purple-100 p-2 rounded-full mr-4">
                  <TrendingUp className="h-4 w-4 text-purple-600" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">Laxman bowling economy improved</p>
                  <p className="text-xs text-muted-foreground">2 days ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
