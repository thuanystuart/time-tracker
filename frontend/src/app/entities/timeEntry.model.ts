import { DateTime } from "luxon"

export interface TimeEntry {
  id?: number,
  task_id?: number,
  description: string,
  start_datetime: DateTime,
  end_datetime: DateTime,
  task?: {
    id: number,
    description: string,
  }
}

export interface RawTimeEntry {
  id?: number,
  task_id?: number,
  description: string,
  start_datetime: string,
  end_datetime: string,
  task?: {
    id: number,
    description: string,
  }
}

export const buildEmptyTimeEntry = () => {
  return {
    description: '',
    start_datetime: DateTime.now(),
    end_datetime: DateTime.now(),
  }
}
