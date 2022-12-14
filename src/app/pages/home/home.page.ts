import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { TaskModel } from 'src/app/model/task';
import { TaskServiceService } from 'src/app/task-service.service';

@Component({
  selector: 'page-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],

})
export class HomePage implements OnInit {

  // <--Inputs and outputs-->
  @Input() sideBarStatus?: boolean;

  // <-- variables -->
  totalTaks = this.TaskServiceService.getTotalTaks();
  totalCompletedTask = this.TaskServiceService.getTotalCompletedTask();
  list: TaskModel[] = this.TaskServiceService.getTaskList();
  dateToday: number = Date.now();
  message: String = '';

  // <-- constructor -->
  constructor(private TaskServiceService: TaskServiceService) { }

  // <-- functions -->

  ngOnInit(): void {

    let date = new Date();
    let hours: Number = date.getHours();

    if (hours > 3 && hours < 12) {
      this.message = "Good Morning";
    }
    else if (hours > 11 && hours < 18) {
      this.message = "Good Afternoon";
    }
    else if (hours > 17 && hours < 20) {
      this.message = "Good Evening";
    }
    else {
      this.message = "sleep time";
    }
  }

  AddNewTask($event: any): void {
    this.TaskServiceService.postNewTask($event);
    this.list.push($event);
    this.totalTaks = this.TaskServiceService.getTotalTaks();
  }

  updateStatus(id: any) {
    for (let i = 0; i < this.list.length; i++) {
      if (id == this.list[i].id) {
        this.list[i].status = false;
        this.TaskServiceService.postTaskList(this.list);
        // localStorage.setItem("TaskList", JSON.stringify(this.list));
        this.totalCompletedTask = (parseInt(this.totalCompletedTask!) + 1).toString();
        this.TaskServiceService.postTotalCompleted(this.totalCompletedTask);
        // localStorage.setItem("totalCompleted", this.totalCompletedTask);
        break;
      }
    }
  }

  get filterByStatus() {
    return this.list.filter(x => x.status);
  }
}
