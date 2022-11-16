import { Task } from './task.model'

export interface Project {
  id?: number,
  name: string,
  user_id?: number,
  tasks?: Task[],
}

export const buildEmptyProject = () => {
  return {
    name: '',
  }
}
