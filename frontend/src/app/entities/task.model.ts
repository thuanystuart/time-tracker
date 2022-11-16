import { DateTime } from 'luxon';
import { RawTimeEntry, TimeEntry } from './timeEntry.model';

export interface RawTask {
  id?: number,
  user_id?: number,
  description: string,
  start_datetime: string,
  end_datetime: string,
  project?: {
    id: number,
    name: string,
  },
  project_id?: number,
  time_entries?: RawTimeEntry[]
}

export interface Task {
  id?: number,
  user_id?: number,
  description: string,
  start_datetime: DateTime,
  end_datetime: DateTime,
  project?: {
    id: number,
    name: string,
  },
  project_id?: number,
  time_entries?: TimeEntry[]
}

export const buildEmptyTask = () => {
  return {
    description: '',
    start_datetime: DateTime.now(),
    end_datetime: DateTime.now(),
  }
}
