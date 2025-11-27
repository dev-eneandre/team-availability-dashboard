# Team Availability Dashboard

A React dashboard for tracking team member availability. Shows who's available, busy, or offline, with filtering and basic stats.

## What It Does

- View team members and their current status
- Click to toggle between available/busy/offline
- Filter the list by status
- See how many people are in each status
- Persists to localStorage so your changes stick around

## Project Structure
```
src/
├── components/          # UI components
├── data/               # Team member data
├── hooks/              # useTeamMembers hook
├── utils/              # Helper functions
└── types.d.ts          # TypeScript types
```

## How It Works

**Status Flow:**
When you click a status button, it cycles: available → busy → offline → available

**Task Counting:**
When someone goes from offline back to available, it increments their "tasks completed" counter (assumes they finished something while offline).

**Data Persistence:**
- Loads from localStorage if it exists, otherwise uses the JSON file
- Saves changes to localStorage (debounced to avoid spamming writes)
- On mount, merges any new team members from the JSON into existing data

**Filtering:**
Just basic filtering with useMemo - If you select "Only Available", it shows only available people.

## Tech Choices

- **React + TypeScript** - type safety is nice
- **Vite** - way faster than CRA
- **Tailwind** - utility classes are quick to work with
- **No state library** - custom hook was enough for this
- **localStorage** - no backend needed for a demo

## Performance

Everything is wrapped in React.memo and callbacks are memoized. Probably overkill for less than 10 team members but good for performance optimization.

The filtered list and summary stats are memoized so they only recalculate when needed.

## Running It
```bash
npm install
npm run dev
```

Built with React 19, TypeScript, Vite, and Tailwind CSS.

Test By Crashra Team 
Developed By Andre Ene