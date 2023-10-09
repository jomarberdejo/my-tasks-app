
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'My Tasks';
  tasks: string[]=  JSON.parse(localStorage.getItem('taskList')) || [];
  newTask: string = '';
  editIndex: number | null = null;

  addTask() {
    if (this.newTask.trim() !== '') {
      if (this.editIndex !== null) {
        this.tasks[this.editIndex] = this.newTask;
        this.editIndex = null; 
        this.saveTask();
      } else {
        this.tasks.push(this.newTask);
        this.saveTask();
      }
      this.newTask = ''; 
    }
  }

  

  editTask(index: number) {

    this.newTask = this.tasks[index];
    this.editIndex = index; 
  }

  deleteTask(index: number) {
    this.tasks.splice(index, 1);
    
    this.saveTask();
    if (this.editIndex === index) {
      this.newTask = ''; 
      this.editIndex = null;
    }
  }
  
  saveTask(){
    localStorage.setItem('taskList', JSON.stringify(this.tasks));
  }
}