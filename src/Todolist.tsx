import {FilterValuesType, TaskType} from "./App";
import {Button} from "./Button";
import {ChangeEvent, KeyboardEvent, useState} from "react";

type PropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string) => void
    addTask: (title: string) => void
    changeFilter: (filter: FilterValuesType) => void
    changeTaskStatus: (taskId: string, newStatusValue: boolean) => void
    filter: FilterValuesType
}

export const Todolist = ({title, tasks, removeTask, addTask, changeFilter, changeTaskStatus, filter}: PropsType) => {
    const [taskTitle, setTaskTitle] = useState('')
    const [error, setError] = useState<string | null>( null)

    const addTaskTitletHandler = () => {
        if(taskTitle.trim() !== ''){
            addTask(taskTitle.trim())
            setTaskTitle('')
        } else {
            setError('Title is required')
        }

    }
    const changeTaskTitletHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
    }
    const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
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
                       className={error ? 'error' : ''}
                       onChange={changeTaskTitletHandler}
                       onKeyUp={addTaskOnKeyUpHandler}/>
                <Button onClick={addTaskTitletHandler}
                        title={'+'}/>
                {error && <div className={'error-message'}>{error}</div> }
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
                                const changeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
                                    const newStatusValue = event.currentTarget.checked
                                    changeTaskStatus(task.id, newStatusValue)
                                }
                                return (
                                    <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                                        <input type="checkbox"
                                               checked={task.isDone}
                                               onChange={changeTaskStatusHandler}/>
                                        <span>{task.title}</span>
                                        <Button title={'x'} onClick={() => removeTaskHundler()}/>
                                    </li>
                                )
                            })
						}
                    </ul>
            }
            <div>
                <Button
                    className={filter === 'all' ? 'active-filter' : ''}
                    title={'All'}
                    onClick={() => changeFilterTaskHundler('all')}/>
                <Button
                    className={filter === 'active' ? 'active-filter' : ''}
                    title={'Active'}
                    onClick={() => changeFilterTaskHundler('active')}/>
                <Button
                    className={filter === 'completed' ? 'active-filter' : ''}
                    title={'Completed'}
                    onClick={() => changeFilterTaskHundler('completed')}/>
            </div>
        </div>
    )
}
