export default interface Player {
  account: Account
  legends: Legends
  session: Session
  created_at: string
  edited_at: string
  times_edited: number
}

interface Tracker {
  name: string
  value?: number
}

interface Badge {
  name: string
  value?: number
}

interface Skin {
  name: string
  rarity: string
}

interface Frame {
  name: string
  rarity: string
}

interface Intro {
  name: string
  rarity: string
}

interface Pose {
  name: string
  rarity: string
}

interface Rank {
  rank_score: number
  rank_name: string
  rank_division: number
}

interface LegendSchema {
  name: string
  trackers: Tracker[]
  badges: Badge[]
  skin: Skin
  frame: Frame
  intro: Intro
  pose?: Pose
}

interface Legends {
  selected: LegendSchema
  all: { [legend_name: string]: LegendSchema }
}

interface Account {
  username: string
  platform: string
  uid: number
  level: number
  level_progression: number
  rank: Rank
}

interface Session {
  online: boolean
  in_match: boolean
  party_joinable: boolean
  party_full: boolean
}

