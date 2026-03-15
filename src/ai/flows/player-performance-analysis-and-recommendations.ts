'use server';
/**
 * @fileOverview An AI agent that analyzes player statistics to provide personalized performance reports.
 *
 * - analyzePlayerPerformance - A function that handles the player performance analysis process.
 * - PlayerPerformanceAnalysisInput - The input type for the analyzePlayerPerformance function.
 * - PlayerPerformanceAnalysisOutput - The return type for the analyzePlayerPerformance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PlayerPerformanceAnalysisInputSchema = z.object({
  playerName: z.string().describe('The name of the player.'),
  playerRole: z.string().describe('The primary role of the player (e.g., Batsman, Bowler, All-rounder).'),
  battingStats: z.object({
    matches: z.number().optional().describe('Number of matches played.'),
    innings: z.number().optional().describe('Number of innings batted.'),
    runs: z.number().optional().describe('Total runs scored.'),
    average: z.number().optional().describe('Batting average.'),
    strikeRate: z.number().optional().describe('Batting strike rate.'),
    fifties: z.number().optional().describe('Number of fifties scored.'),
    hundreds: z.number().optional().describe('Number of hundreds scored.'),
    fours: z.number().optional().describe('Total fours hit.'),
    sixes: z.number().optional().describe('Total sixes hit.'),
    dismissalTypes: z.record(z.string(), z.number()).optional().describe('Map of dismissal types and their counts.'),
  }).optional().describe('Comprehensive batting statistics for the player.'),
  bowlingStats: z.object({
    matches: z.number().optional().describe('Number of matches played.'),
    innings: z.number().optional().describe('Number of innings bowled.'),
    balls: z.number().optional().describe('Total balls bowled.'),
    runsConceded: z.number().optional().describe('Total runs conceded.'),
    wickets: z.number().optional().describe('Total wickets taken.'),
    economy: z.number().optional().describe('Bowling economy rate.'),
    average: z.number().optional().describe('Bowling average.'),
    strikeRate: z.number().optional().describe('Bowling strike rate.'),
    maidenOvers: z.number().optional().describe('Number of maiden overs bowled.'),
    dotBallPercentage: z.number().optional().describe('Percentage of dot balls bowled.'),
  }).optional().describe('Comprehensive bowling statistics for the player.'),
  fieldingStats: z.object({
    matches: z.number().optional().describe('Number of matches played.'),
    catches: z.number().optional().describe('Total catches taken.'),
    runOuts: z.number().optional().describe('Total run-outs effected.'),
    stumpings: z.number().optional().describe('Total stumpings effected (for wicketkeepers).'),
  }).optional().describe('Comprehensive fielding statistics for the player.'),
  recentMatchData: z.array(z.object({
    date: z.string().optional().describe('Date of the match.'),
    opponent: z.string().optional().describe('Opponent team.'),
    runsScored: z.number().optional().describe('Runs scored in this match.'),
    wicketsTaken: z.number().optional().describe('Wickets taken in this match.'),
    ballsFaced: z.number().optional().describe('Balls faced in this match.'),
    ballsBowled: z.number().optional().describe('Balls bowled in this match.'),
    runsConceded: z.number().optional().describe('Runs conceded in this match.'),
    dismissalType: z.string().optional().describe('Type of dismissal in this match.'),
  })).optional().describe('Recent match-by-match performance data for trend analysis.'),
});

export type PlayerPerformanceAnalysisInput = z.infer<typeof PlayerPerformanceAnalysisInputSchema>;

const PlayerPerformanceAnalysisOutputSchema = z.object({
  strengths: z.array(z.string()).describe('A list of the player\u0027s key strengths based on their statistics.'),
  areasForImprovement: z.array(z.string()).describe('A list of specific areas where the player needs to improve, based on statistical analysis.'),
  trainingRecommendations: z.array(z.string()).describe('Concrete training drills or strategies to address the identified areas for improvement.'),
});

export type PlayerPerformanceAnalysisOutput = z.infer<typeof PlayerPerformanceAnalysisOutputSchema>;

export async function analyzePlayerPerformance(input: PlayerPerformanceAnalysisInput): Promise<PlayerPerformanceAnalysisOutput> {
  return playerPerformanceAnalysisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'playerPerformanceAnalysisPrompt',
  input: {schema: PlayerPerformanceAnalysisInputSchema},
  output: {schema: PlayerPerformanceAnalysisOutputSchema},
  prompt: `You are an expert cricket coach and analyst. Your task is to analyze a player's statistics and provide a personalized performance report. Based on the provided data, identify the player's strengths, specific areas for improvement, and suggest concrete training recommendations.

Player Name: {{{playerName}}}
Player Role: {{{playerRole}}}

{{#if battingStats}}
Batting Statistics:
  - Matches: {{{battingStats.matches}}}
  - Innings: {{{battingStats.innings}}}
  - Runs: {{{battingStats.runs}}}
  - Average: {{{battingStats.average}}}
  - Strike Rate: {{{battingStats.strikeRate}}}
  - Fifties: {{{battingStats.fifties}}}
  - Hundreds: {{{battingStats.hundreds}}}
  - Fours: {{{battingStats.fours}}}
  - Sixes: {{{battingStats.sixes}}}
  {{#if battingStats.dismissalTypes}}
  - Dismissal Types: {{#each battingStats.dismissalTypes}}{{@key}}: {{this}} {{/each}}
  {{/if}}
{{/if}}

{{#if bowlingStats}}
Bowling Statistics:
  - Matches: {{{bowlingStats.matches}}}
  - Innings: {{{bowlingStats.innings}}}
  - Balls: {{{bowlingStats.balls}}}
  - Runs Conceded: {{{bowlingStats.runsConceded}}}
  - Wickets: {{{bowlingStats.wickets}}}
  - Economy: {{{bowlingStats.economy}}}
  - Average: {{{bowlingStats.average}}}
  - Strike Rate: {{{bowlingStats.strikeRate}}}
  - Maiden Overs: {{{bowlingStats.maidenOvers}}}
  - Dot Ball Percentage: {{{bowlingStats.dotBallPercentage}}}%
{{/if}}

{{#if fieldingStats}}
Fielding Statistics:
  - Matches: {{{fieldingStats.matches}}}
  - Catches: {{{fieldingStats.catches}}}
  - Run Outs: {{{fieldingStats.runOuts}}}
  - Stumpings: {{{fieldingStats.stumpings}}}
{{/if}}

{{#if recentMatchData}}
Recent Match Performance:
{{#each recentMatchData}}
  - Match Date: {{{this.date}}}, Opponent: {{{this.opponent}}}
    {{#if this.runsScored}} Runs Scored: {{{this.runsScored}}},{{/if}}{{#if this.ballsFaced}} Balls Faced: {{{this.ballsFaced}}},{{/if}}{{#if this.dismissalType}} Dismissal: {{{this.dismissalType}}}{{/if}}
    {{#if this.wicketsTaken}} Wickets Taken: {{{this.wicketsTaken}}},{{/if}}{{#if this.runsConceded}} Runs Conceded: {{{this.runsConceded}}},{{/if}}{{#if this.ballsBowled}} Balls Bowled: {{{this.ballsBowled}}}{{/if}}
{{/each}}
{{/if}}

Based on the above data, provide:
1. A summary of {{{playerName}}}'s strengths.
2. Specific areas for improvement (e.g., 'needs to improve strike rotation against spin,' 'bowling economy in death overs is high').
3. Concrete training drills or strategies to address these areas.

Ensure your analysis is data-backed and actionable.
`,
});

const playerPerformanceAnalysisFlow = ai.defineFlow(
  {
    name: 'playerPerformanceAnalysisFlow',
    inputSchema: PlayerPerformanceAnalysisInputSchema,
    outputSchema: PlayerPerformanceAnalysisOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
