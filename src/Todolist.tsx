import {FilterValuesType, TaskType} from "./App";
import {Button} from "./Button";

type PropsType = {
	title: string
	tasks: TaskType[]
	removeTask: (taskId: string) => void
	addTask: () => void
	changeFilter: (filter: FilterValuesType) => void
}

export const Todolist = ({title, tasks, removeTask, addTask, changeFilter}: PropsType) => {

	return (
		<div>
			<h3>{title}</h3>
			<div>
				<input/>
				<Button onClick={addTask} title={'+'}/>
			</div>
			{
				tasks.length === 0
					? <p>Тасок нет</p>
					: <ul>
						{tasks.map(task => {
							console.log(task.id)
							return (
								<li key={task.id}>
									<input type="checkbox" checked={task.isDone}/>
									<span>{task.title}</span>
									<Button title={'x'} onClick={() => removeTask(task.id)}/>
								</li>
							)
						})}
					</ul>
			}
			<div>
				<Button title={'All'} onClick={()=> changeFilter('all')}/>
				<Button title={'Active'} onClick={()=> changeFilter('active')}/>
				<Button title={'Completed'} onClick={()=> changeFilter('completed')}/>
			</div>
		</div>
	)
}
