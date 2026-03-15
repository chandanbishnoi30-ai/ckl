
"use client"

import React from "react"
import Link from "next/link"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Plus, UserCog, ExternalLink } from "lucide-react"

const players = [
  { id: "p1", name: "Virat Kohli", role: "Batsman", age: 34, status: "Active", avg: 52.4, sr: 138.1 },
  { id: "p2", name: "Jasprit Bumrah", role: "Bowler", age: 29, status: "Active", econ: 6.8, wkts: 124 },
  { id: "p3", name: "Hardik Pandya", role: "All-rounder", age: 30, status: "Training", avg: 31.2, wkts: 85 },
  { id: "p4", name: "Suryakumar Yadav", role: "Batsman", age: 32, status: "Active", avg: 45.8, sr: 172.4 },
  { id: "p5", name: "Ravindra Jadeja", role: "All-rounder", age: 35, status: "Injured", avg: 28.5, econ: 7.2 },
  { id: "p6", name: "Shubman Gill", role: "Batsman", age: 24, status: "Active", avg: 61.2, sr: 102.5 },
]

export default function PlayersPage() {
  const [searchTerm, setSearchTerm] = React.useState("")

  const filteredPlayers = players.filter(player => 
    player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    player.role.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight font-headline">Academy Roster</h2>
          <p className="text-muted-foreground">Manage and view all registered academy players.</p>
        </div>
        <Button className="shrink-0">
          <Plus className="mr-2 h-4 w-4" /> Add New Player
        </Button>
      </div>

      <div className="flex items-center gap-2 max-w-sm">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search players..." 
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-[80px]">Player</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Key Stat</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPlayers.map((player) => (
              <TableRow key={player.id} className="group transition-colors">
                <TableCell>
                  <Avatar>
                    <AvatarImage src={`https://picsum.photos/seed/${player.id}/40/40`} />
                    <AvatarFallback>{player.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="font-medium">{player.name}</TableCell>
                <TableCell>{player.role}</TableCell>
                <TableCell>
                  <Badge variant={player.status === "Active" ? "default" : player.status === "Injured" ? "destructive" : "secondary"}>
                    {player.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-mono text-sm">
                  {player.role === "Batsman" ? `AVG: ${player.avg}` : player.role === "Bowler" ? `ECON: ${player.econ}` : `AVG: ${player.avg}`}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/players/${player.id}`}>
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon">
                      <UserCog className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
