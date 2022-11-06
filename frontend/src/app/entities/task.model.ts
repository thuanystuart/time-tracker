import { TimeEntry } from './timeEntry.model'

export interface Task {
  id?: number,
  user_id?: number,
  description: string,
  start_datetime: string,
  end_datetime: string,
  project?: {
    id: number,
    name: string,
  },
  time_entries?: TimeEntry[]
}
