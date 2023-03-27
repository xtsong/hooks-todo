import React, { FC, ReactElement, useReducer, useEffect, useCallback } from "react";

import TdInput from "./Input";
import TdList from "./List";
import { ITodo, IState, ACTION_TYPE } from "./typings";
import { todoReducer } from "./reducer";

const init = (initTodoList: ITodo[]): IState => {
    return {
        todoList: initTodoList
    }
}

const TodoList: FC = (): ReactElement => {
    // const [todoList, settodoList] = useState<ITodo[]>([]);

    const [state, dispatch] = useReducer(todoReducer, [], init)

    useEffect(() => {
        console.log(localStorage.getItem('todolist'))
        const todoList = JSON.parse(localStorage.getItem('todolist') || '[]');

        dispatch({
            type: ACTION_TYPE.INIT_TODO,
            payload: todoList
        });
    }, []);

    useEffect(() => {
        localStorage.setItem('todolist', JSON.stringify(state.todoList));
    }, [state.todoList])

    const addTodo = useCallback((todo: ITodo) => {
        // settodoList(todoList => [...todoList, todo]);
        dispatch({
            type: ACTION_TYPE.ADD_TODO,
            payload: todo
        })
    }, []);

    const removeTodo = useCallback((id: number) => {
        dispatch({
            type: ACTION_TYPE.REMOVE_TODO,
            payload: id
        })
    }, []);

    const toggleTodo = useCallback((id: number) => {
        dispatch({
            type: ACTION_TYPE.TOGGLE_TODO,
            payload: id
        })
    }, []);

    return (
        <div className="td-list">
            <TdInput
                addTodo={addTodo}
                todoList={state.todoList}
            />
            <TdList
                todoList={state.todoList}
                removeTodo={removeTodo}
                toggleTodo={toggleTodo}
            />
        </div>
    );
}

export default TodoList