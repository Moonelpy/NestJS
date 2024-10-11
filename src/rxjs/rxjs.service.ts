import { Injectable } from '@nestjs/common';
import axios from 'axios';
import {
  firstValueFrom,
  forkJoin,
  from,
  map,
  mergeAll,
  Observable,
  take,
  toArray,
} from 'rxjs';

@Injectable()
export class RxjsService {
  private readonly githubURL = 'https://api.github.com/search/repositories?q=';
  private readonly gitlabURL = 'https://gitlab.com/api/v4/projects?search=';

  private getGithub(text: string, count: number): Observable<any> {
    return from(axios.get(`${this.githubURL}${text}`))
      .pipe(
        map((res: any) => res.data.items),
        mergeAll(),
      )
      .pipe(take(count));
  }

  private getGitlab(text: string, count: number): Observable<any> {
    return from(axios.get(`${this.gitlabURL}${text}`))
      .pipe(
        map((res: any) => res.data),
        mergeAll(),
      )
      .pipe(take(count));
  }

  // Микс из двух репозиториев
  async searchRepositories(text: string): Promise<any> {
    const gitlab$ = this.getGitlab(text, 1).pipe(toArray());
    const github$ = this.getGithub(text, 1).pipe(toArray());

    const [githubData, gitlabData] = await firstValueFrom(
      forkJoin([gitlab$, github$]),
    );

    return [...githubData, ...gitlabData];
  }
}
