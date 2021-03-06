import React, {useState} from 'react';
import {AppContainer, ContentStyled} from './AppStyled';
import {TaskType, Todolist} from './Components/TodoList/Todolist';
import {v1} from 'uuid';
import {AddItem} from './common/AddItem/AddItem';

export type FilterValuesType = 'all' | 'completed' | 'active';
export type TodoListType = {
    id: string,
    title: string,
    filter: FilterValuesType,
};
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export const App = () => {

    const todoList1 = v1();
    const todoList2 = v1();

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoList1, title: 'What to Learn', filter: 'all'},
        {id: todoList2, title: 'What to Buy', filter: 'all'}
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todoList1]: [
            {id: v1(), title: 'CSS&HTML', isDone: true,},
            {id: v1(), title: 'JS', isDone: true,},
            {id: v1(), title: 'REACT.JS', isDone: false,},
            {id: v1(), title: 'REST API', isDone: false,},
            {id: v1(), title: 'GraphQL', isDone: false,},
        ],
        [todoList2]: [
            {id: v1(), title: 'MIlK', isDone: true,},
            {id: v1(), title: 'BOOK', isDone: true,},
            {id: v1(), title: 'BEER', isDone: false,},
        ]
    });

    const deleteTask = (id: string, todoListId: string) => {
        let newTasks = tasks[todoListId];
        tasks[todoListId] = newTasks.filter(f => f.id !== id);
        setTasks({...tasks})
    }
    const addTask = (title: string, todoListId: string) => {
        let newTask = {id: v1(), title: title, isDone: false};
        let newTasks = tasks[todoListId];
        tasks[todoListId] = [newTask, ...newTasks];
        setTasks({...tasks});
    }
    const changeTaskStatus = (todoListId: string, taskID: string, isDone: boolean) => {
        let task = tasks[todoListId].find(f => f.id === taskID);
        if (task) {
            task.isDone = isDone;
            setTasks({...tasks})
        }
    }
    const changeFilter = (value: FilterValuesType, todoListId: string) => {
        let todoList = todoLists.find(f => f.id === todoListId)
        if (todoList) {
            todoList.filter = value
            setTodoLists([...todoLists])
        }
    }

    const removeTodoList = (todoListId: string) => {
        let filteredTodoLists = todoLists.filter(f => f.id !== todoListId);
        setTodoLists(filteredTodoLists);
        delete tasks[todoListId];
    }

    const addTodoList = (title: string) => {
        let todoList: TodoListType = {
            id: v1(),
            title: title,
            filter: "all",
        }
        setTodoLists([todoList, ...todoLists])
        setTasks({...tasks, [todoList.id]: []})
    }

    const changeTodoListTitle = (todoListId: string, newTitle: string) => {
        let todoList = todoLists.find(f => f.id === todoListId)
        if (todoList) {
            todoList.title = newTitle
            setTodoLists([...todoLists])
        }
    }

    const changeTaskTitle = (todoListId: string, taskId: string, newTitle: string) => {
        let task = tasks[todoListId].find(f => f.id === taskId)
        if (task) {
            task.title = newTitle
            setTasks({...tasks})
        }
    }

    return (
        <AppContainer>
            <AddItem addItem={addTodoList}/>
            <ContentStyled>
                {todoLists.map(m => {
                    let tasksForTodo: Array<TaskType> = tasks[m.id];
                    if (m.filter === 'active') {
                        tasksForTodo = tasks[m.id].filter(f => !f.isDone)
                    }
                    if (m.filter === 'completed') {
                        tasksForTodo = tasks[m.id].filter(f => f.isDone)
                    }
                    return <Todolist
                        key={m.id}
                        id={m.id}
                        title={m.title}
                        tasks={tasksForTodo}
                        deleteTask={deleteTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        filter={m.filter}
                        removeTodoList={removeTodoList}
                        changeTaskTitle={changeTaskTitle}
                        changeTodoListTitle={changeTodoListTitle}
                    />
                })}
            </ContentStyled>
        </AppContainer>
    );
};
