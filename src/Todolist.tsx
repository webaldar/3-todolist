import {FilterValuesType, TaskType} from "./App";
import {Button} from "./Button";
import {ChangeEvent, KeyboardEvent, useState} from "react";

type PropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string) => void
    addTask: (title: string) => void
    changeFilter: (filter: FilterValuesType) => void
}

export const Todolist = ({title, tasks, removeTask, addTask, changeFilter}: PropsType) => {
    const [taskTitle, setTaskTitle] = useState('')
    const addTaskTitletHandler = () => {
        addTask(taskTitle)
        setTaskTitle('')
    }
    const changeTaskTitletHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
    }
    const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTaskTitletHandler()
        }
    }
    const changeFilterTaskHundler = (filter: FilterValuesType) => {
        changeFilter(filter)
    }
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input value={taskTitle}
                       onChange={changeTaskTitletHandler}
                       onKeyUp={addTaskOnKeyUpHandler}/>
                <Button onClick={addTaskTitletHandler}
                        title={'+'}/>
            </div>
            {
                tasks.length === 0
                    ? <p>Тасок нет</p>
                    : <ul>
                        {
                            tasks.map(task => {
								const removeTaskHundler = () => {
                                    removeTask(task.id)
                                }
                                return (
                                    <li key={task.id}>
                                        <input type="checkbox" checked={task.isDone}/>
                                        <span>{task.title}</span>
                                        <Button title={'x'} onClick={() => removeTaskHundler()}/>
                                    </li>
                                )
                            })
						}
                    </ul>
            }
            <div>
                <Button title={'All'} onClick={() => changeFilterTaskHundler('all')}/>
                <Button title={'Active'} onClick={() => changeFilterTaskHundler('active')}/>
                <Button title={'Completed'} onClick={() => changeFilterTaskHundler('completed')}/>
            </div>
        </div>
    )
}
