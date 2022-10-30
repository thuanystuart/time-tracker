export interface TimeEntry {
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
