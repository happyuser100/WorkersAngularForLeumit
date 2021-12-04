import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WorkerEntity } from 'src/app/models/worker-entity';
import { WorkerService } from 'src/app/services/worker.service';

@Component({
  selector: 'app-worker-view',
  templateUrl: './worker-view.component.html',
  styleUrls: ['./worker-view.component.css']
})
export class WorkerViewComponent implements OnInit {
  WorkerId?: number;
  WorkerName?: string;
  WorkerNumber?: number;
  WorkerPhone?: string;
  WorkerEmail?: string;
  WorkerSalary?: number;

  constructor(
    private router: Router,
    private workerService: WorkerService
  ) { }

  ngOnInit(): void {
    debugger
    let viewWorkerId = window.localStorage.getItem('viewWorkerId');

    console.log("viewWorkerId=" + viewWorkerId);
    if (viewWorkerId == null || viewWorkerId == "") {
      alert('Invalid action.');
      this.router.navigate(['/home']);
      return;
    }

    this.workerService.getworkerByIdFake(+viewWorkerId)
      .subscribe((data?: WorkerEntity) => {
        debugger
        this.WorkerId = data?.WorkerId;
        this.WorkerName = data?.WorkerName;
        this.WorkerNumber =  data?.WorkerNumber;
        this.WorkerPhone =  data?.WorkerPhone;
        this.WorkerEmail =  data?.WorkerEmail;
        this.WorkerSalary =  data?.WorkerSalary;
      ;
      });

  }

}
