import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { WorkerEntity } from '../models/worker-entity';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {

  baseURL: string = environment.baseURL;
  constructor(private httpClient: HttpClient) { }

  private mockworkerEntityList: WorkerEntity[] = [
    {
      WorkerId: 1,
      WorkerName: "Moshe",
      WorkerNumber: 1,
      WorkerPhone: "1111111",
      WorkerEmail: "aaa@aaa.com",
      WorkerSalary: 1200
    },
    {
      WorkerId: 2,
      WorkerName: "Lia",
      WorkerNumber: 2,
      WorkerPhone: "2234344",
      WorkerEmail: "hhh@aaa.com",
      WorkerSalary: 1500
    }
  ];

  getWorkersFake() {
    return of(this.mockworkerEntityList);
  }

  getWorkers() {
    return this.httpClient.get<WorkerEntity[]>(`${this.baseURL}/Workers/GetWorkers`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getworkerByIdFake(WorkerId: number)
  {
    return of(this.mockworkerEntityList.find(x=> x.WorkerId == WorkerId));
  }

  updateworker(workerEntity: WorkerEntity)
  {
    return this.httpClient.post(`${this.baseURL}/Workers/Updateworker`, workerEntity)
      .pipe(
        catchError(this.handleError)
      );
  }

  handleError = (error: any) => {
    let errorMessage = '';
    let errorMessageSnack = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}\n Error:${error.error}`;
      errorMessageSnack = `Error:${error.error}`;
    }
    console.log(errorMessage);
    return throwError(error);
  }
}
