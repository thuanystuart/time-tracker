import { Task } from './task.model'
import { Project } from './project.model'

export interface User {
  id?: number,
  email: string,
  first_name?: string,
  last_name?: string,
  projects?: Project[],
  tasks?: Task[],
}
