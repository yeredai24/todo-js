import { Todo } from "./todo.class";

export class TodoList{

    constructor( ){
        //this.todos = [];
        this.cargarLocalStorage();
    }

    nuevoTodo( tarea ){
        this.todos.push( tarea );
        this.guardarLocalStorage();
    }

    eliminarTodo( id ){
       this.todos = this.todos.filter(x => x.id !== parseInt(id, 10));
       this.guardarLocalStorage();
    }

    marcarCompletado( id ){
        for(const todo of this.todos){
            if(todo.id === parseInt(id, 10)){
                todo.completado = !todo.completado;
                break;
            }
        }
        this.guardarLocalStorage();
    }

    eliminarCompletados(){
        this.todos = this.todos.filter( x => !x.completado );
        this.guardarLocalStorage();
    }

    guardarLocalStorage(){
        localStorage.setItem('todo',  JSON.stringify( this.todos ));
    }

    cargarLocalStorage(){
        this.todos = localStorage.getItem('todo') ? JSON.parse(localStorage.getItem('todo')) : [];
        this.todos = this.todos.map( obj => Todo.fromJson( obj ));
    }

    static todosPendientes( todoList ){
        console.log(typeof(todoList));
        return todoList.todos.filter( x => !x.completado).length;
    }

}