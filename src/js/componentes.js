import { Todo } from '../classes/todo.class';
import { TodoList } from '../classes/todo-list.class';
import { todoList } from '../index';

// Referencias en el HTML 

const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnBorrarTodo = document.querySelector('.clear-completed');
const ulFiltros = document.querySelector('.filters');
const ancharFiltros = document.querySelectorAll('.filtro');
const pendientes = document.querySelector('.todo-count');


export const crearTodoHtml = ( todo ) =>{
    const htmlTodo = `<li class="${ (todo.completado)? 'completed' : ''}" data-id="${ todo.id }">
                        <div class="view">
                            <input class="toggle" type="checkbox" ${ (todo.completado)? 'checked' : ''}>
                            <label>${ todo.tarea }</label>
                            <button class="destroy"></button>
                        </div>
                        <input class="edit" value="Create a TodoMVC template">
                    </li>`;


    const div = document.createElement('div');
    div.innerHTML = htmlTodo; 
    divTodoList.append( div.firstChild );

    return div;
}


txtInput.addEventListener('keyup', ( event ) =>{
    if(event.keyCode === 13 && txtInput.value.length > 0){
        const nuevoTodo = new Todo( txtInput.value);
        todoList.nuevoTodo(nuevoTodo);
        crearTodoHtml( nuevoTodo );
        txtInput.value = '';
        spanPendientes( todoList );
    }
    
});

divTodoList.addEventListener('click', ( event )=>{
    const nombreElemento = event.target.localName; // input, label, button
    const todoElemento = event.target.parentElement.parentElement;
    const todoId = todoElemento.getAttribute('data-id');

    if(nombreElemento.includes('input')){
        todoList.marcarCompletado( todoId );
        todoElemento.classList.toggle('completed');
        spanPendientes( todoList );
    }
    else if(nombreElemento.includes('button')){
        todoList.eliminarTodo( todoId );
        divTodoList.removeChild( todoElemento );
    }

});

btnBorrarTodo.addEventListener('click', () =>{ 
    for(let i = divTodoList.children.length - 1; i >= 0; i--){
        if(divTodoList.children[i].classList.contains('completed')){
            divTodoList.removeChild( divTodoList.children[i] ); 
        }
    }
    todoList.eliminarCompletados();
});

ulFiltros.addEventListener('click', ( event )=>{
    const filtro = event.target.text
    if(!filtro){return;}

    ancharFiltros.forEach( elem => elem.classList.remove('selected'));
    event.target.classList.add('selected');


    for(const element of divTodoList.children){
        element.classList.remove('hidden');
        const completado = element.classList.contains('completed');

        switch ( filtro ){
            case 'Pendientes':
                if ( completado ){
                    element.classList.add('hidden')
                }
            break;
            
            case 'Completados':
                if ( !completado ){
                    element.classList.add('hidden')
                }
            break;
        }
    }

});

export const spanPendientes = ( todoList ) =>{
    pendientes.innerHTML = '';
    pendientes.innerHTML = `<strong>${TodoList.todosPendientes(todoList)}</strong> pendiente(s)`;
}