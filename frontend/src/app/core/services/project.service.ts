import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '@entities/project.model';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { Map } from 'immutable';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) {
    this.getProjects().subscribe()
  }

  private projectsSource: BehaviorSubject<Map<number, Project>> = new BehaviorSubject<Map<number, Project>>(Map<number, Project>())
  projects$: Observable<Project[]> = this.projectsSource.asObservable().pipe(
    map((projects: Map<number, Project>) => Array.from(projects.toList())),
  )

  getProjectById(id: number): Project | undefined {
    const projects = this.projectsSource.value
    return projects.has(id) ?  projects.get(id) : undefined
  }

  setProjectById(id: number, project: Project) {
    this.projectsSource.next(this.projectsSource.value.set(id, project))
  }

  createProject(project: Project): Observable<Project> {
    return this.http.post<Project>('project', project)
    .pipe(
      tap(project => {
        this.projectsSource.next(this.projectsSource.value.set(project.id || 0, project))
      })
    )
  }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>('project')
    .pipe(
      tap(projects => {
        this.projectsSource.next(projects.reduce((acc, project) => acc.set(project.id || 0, project), Map<number, Project>()))
      })
    )
  }
}
