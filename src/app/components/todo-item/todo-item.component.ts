import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo } from 'src/app/models/Todos';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter();
  
  constructor(private todoSerive:TodoService) { }

  ngOnInit(): void {
  }

  // Set Dynamic class binding
  setClasses(){
    let classes = {
      todo: true,
      'is-complete': this.todo.completed
    }
    return classes;
  }

  //On Toggle mark completed
  onToggle(todo){
    todo.completed = !todo.completed;

    //Toggle on server
    this.todoSerive.toggleCompleted(todo).subscribe(todo=>{
      console.log(todo);
    });
  }

  onDelete(todo){
    this.deleteTodo.emit(todo);
  }

}
