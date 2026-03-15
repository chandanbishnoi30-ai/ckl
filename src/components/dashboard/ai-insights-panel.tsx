
"use client"

import React from "react"
import { analyzePlayerPerformance, PlayerPerformanceAnalysisOutput } from "@/ai/flows/player-performance-analysis-and-recommendations"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, Loader2, CheckCircle2, ChevronRight, Target, Dumbbell } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface AIInsightsPanelProps {
  player: {
    name: string
    role: string
    stats: any // In a real app, this would be typed properly
  }
}

export function AIInsightsPanel({ player }: AIInsightsPanelProps) {
  const [loading, setLoading] = React.useState(false)
  const [insights, setInsights] = React.useState<PlayerPerformanceAnalysisOutput | null>(null)

  const handleGenerate = async () => {
    setLoading(true)
    try {
      const result = await analyzePlayerPerformance({
        playerName: player.name,
        playerRole: player.role,
        battingStats: player.stats.batting,
        bowlingStats: player.stats.bowling,
        fieldingStats: player.stats.fielding,
        recentMatchData: player.stats.recentMatches
      })
      setInsights(result)
    } catch (error) {
      console.error("Failed to generate AI insights:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-1">
          <CardTitle className="text-xl flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            AI Performance Insights
          </CardTitle>
          <CardDescription>
            Smart analysis based on historical stats and recent trends.
          </CardDescription>
        </div>
        {!insights && !loading && (
          <Button onClick={handleGenerate} size="sm" className="gap-2">
            <Sparkles className="h-4 w-4" /> Generate Report
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Analyzing statistics and formulating recommendations...</p>
          </div>
        ) : insights ? (
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <h4 className="font-semibold text-sm flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  Key Strengths
                </h4>
                <ul className="space-y-2">
                  {insights.strengths.map((s, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                      <ChevronRight className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-sm flex items-center gap-2">
                  <Target className="h-4 w-4 text-amber-500" />
                  Areas for Improvement
                </h4>
                <ul className="space-y-2">
                  {insights.areasForImprovement.map((a, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                      <ChevronRight className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t">
              <h4 className="font-semibold text-sm flex items-center gap-2">
                <Dumbbell className="h-4 w-4 text-primary" />
                Training Recommendations
              </h4>
              <div className="grid gap-2">
                {insights.trainingRecommendations.map((r, i) => (
                  <div key={i} className="p-3 bg-white rounded-lg border text-sm text-muted-foreground">
                    {r}
                  </div>
                ))}
              </div>
            </div>

            <Button variant="outline" size="sm" onClick={() => setInsights(null)} className="w-full">
              Recalculate with new data
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center space-y-2">
            <Sparkles className="h-10 w-10 text-primary/20" />
            <p className="text-sm text-muted-foreground max-w-xs">
              Click generate to get an AI-powered analysis of {player.name}'s performance.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
