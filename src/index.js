import './styles.css';

import { Todo, TodoList, crearTodoHtml, spanPendientes } from './classes/index'

export const todoList = new TodoList();

todoList.todos.forEach( todo => crearTodoHtml(todo));

spanPendientes(todoList);
