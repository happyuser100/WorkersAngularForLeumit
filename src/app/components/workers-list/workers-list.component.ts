import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WorkerEntity } from 'src/app/models/worker-entity';
import { WorkerService } from 'src/app/services/worker.service';

@Component({
  selector: 'app-workers-list',
  templateUrl: './workers-list.component.html',
  styleUrls: ['./workers-list.component.css']
})
export class WorkersListComponent implements OnInit {

  workers?: WorkerEntity[];
  constructor(private router: Router,private workerService: WorkerService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    console.log('LoadData');
    debugger;

    const workers_local = localStorage.getItem('workers');
    if (workers_local) {
      this.workers = JSON.parse(workers_local);
      console.log('localstorage workersList=' + this.workers);
      return;
    }

    //this.workerService.getWorkers()
    this.workerService.getWorkersFake()
      .subscribe((workers: WorkerEntity[]) => {
        this.workers = workers;
        localStorage.setItem('workers', JSON.stringify(this.workers));
        console.log('getworkersList=' + this.workers);
      });
  }

  showdetails(id: number) {
    debugger
    window.localStorage.removeItem('viewWorkerId');
    window.localStorage.setItem('viewWorkerId', id.toString());
    this.router.navigate(['/view-worker']);
    //this.router.navigate(['/view-worker']);
    //this.router.navigate(['/orders', id]);
  }

  editworker(workerEntity: WorkerEntity) {
    debugger
    window.localStorage.removeItem('viewWorkerId');
    window.localStorage.setItem('viewWorkerId', workerEntity.WorkerId.toString());
    this.router.navigate(['/edit-worker']);
  }
}
