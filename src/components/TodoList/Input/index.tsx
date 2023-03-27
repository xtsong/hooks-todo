import React, { FC, ReactElement, useRef } from "react";
import { ITodo } from "../typings";

interface IProps {
    addTodo: (todo: ITodo) => void;
    todoList: ITodo[];
}

const TdInput: FC<IProps> = ({ addTodo, todoList }): ReactElement => {
    const inputRef = useRef<HTMLInputElement>(null);

    const addItem = (): void => {
        const val = inputRef.current!.value.trim();

        if (val.length) {
            const isExist = todoList.find(todo => todo.content === val);
            if (isExist) {
                alert("事项已存在");
                inputRef.current!.value = ''
                return;
            }

            addTodo({
                id: new Date().getTime(),
                content: val,
                completed: false
            });

            inputRef.current!.value = ''
        }

    }

    return (
        <div className="todo-input">
            <input type="text" ref={inputRef} placeholder="请输入待办事项" />
            <button onClick={addItem}>添加</button>
        </div>
    );
}

export default TdInput