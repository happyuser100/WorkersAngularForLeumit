import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { WorkerEntity } from 'src/app/models/worker-entity';
import { WorkerService } from 'src/app/services/worker.service';

@Component({
  selector: 'app-worker-edit',
  templateUrl: './worker-edit.component.html',
  styleUrls: ['./worker-edit.component.css']
})
export class WorkerEditComponent implements OnInit {

  worker?: WorkerEntity;
  editForm: FormGroup = new FormGroup({});
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private workerService: WorkerService
  ) {
    this.editForm = this.formBuilder.group({
      WorkerId: [''],
      WorkerName: ['', Validators.required],
      WorkerNumber: ['', Validators.required],
      WorkerPhone: ['', Validators.required],
      WorkerEmail: ['', Validators.required],
      WorkerSalary: ['', Validators.required],
    });
  }

  ngOnInit() {
    debugger
    let viewWorkerId = window.localStorage.getItem('viewWorkerId');

    console.log("viewWorkerId=" + viewWorkerId);
    if (viewWorkerId == null || viewWorkerId == "") {
      alert('Invalid action.');
      this.router.navigate(['/home']);
      return;
    }

    this.workerService.getworkerByIdFake(+viewWorkerId)
      .subscribe((data: any) => {
        debugger
        this.editForm.patchValue(data);
      });
  }

  onSubmit() {
    debugger
    const worker: WorkerEntity = this.editForm.value;

    this.workerService.updateworker(worker)
      .pipe(first())
      .subscribe(
        (data: any) => {
          const workers_local = localStorage.getItem('workers');
          if (workers_local != null) {
            const retrievedworkers: WorkerEntity[] = JSON.parse(workers_local);
            const index = retrievedworkers.findIndex(item => item.WorkerId === worker.WorkerId);
            retrievedworkers.splice(index, 1);
            retrievedworkers.push(worker);
            localStorage.setItem('workers', JSON.stringify(retrievedworkers));
          }
          alert('worker updated successfully.');
          this.router.navigate(['workers']);
        },
        error => {
          alert(error);
        }
      );
  }
}
