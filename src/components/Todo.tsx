import { ChangeEvent, FormEvent, useState } from 'react';
import { PlusCircle } from 'phosphor-react';
import { v4 as uuid4 } from 'uuid';

import { Task } from './Task';
import clipboard from '../assets/clipboard.svg';
import styles from './Todo.module.css';

interface Task {
  id: string;
  description: string;
  completed: boolean;
}

export const Todo = () => {
  const [newTask, setNewTask] = useState<Task>({ id: '', description: '', completed: false });
  const [tasks, setTasks] = useState<Task[]>([]);

  const isNewTaskEmpty = newTask.description === '';

  const handleNewTaskChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTask({ id: uuid4(), description: event.target.value, completed: false });
  }

  const handleChangeCheckbox = (id: string) => {
    const changedTasks = tasks.map((task) => {
      if (task.id === id) {
        task.completed = !task.completed;
      }
      return task;
    })

    setTasks(changedTasks);
  }

  const handleCreateNewTask = (event: FormEvent) => {
    event.preventDefault();
    setTasks([...tasks, newTask]);
    setNewTask({ id: '', description: '', completed: false });
  }

  const getTasksCompleted = () => {
    return tasks.filter(task => task.completed);
  }

  const deleteTask = (id: string) => {
    const tasksWithoutDeletedOn = tasks.filter(task => {
      return task.id !== id;
    });

    setTasks(tasksWithoutDeletedOn);
  }

  return (
    <article className={styles.todo}>
      <form onSubmit={handleCreateNewTask} className={styles.form}>
        <input
          type="text"
          placeholder="Adicione uma nova tarefa"
          value={newTask.description}
          onChange={handleNewTaskChange}
        />
        <button
          type="submit"
          disabled={isNewTaskEmpty}
        >
          Criar
          <PlusCircle size={16} />
        </button>
      </form>

      <div className={styles.sumare}>
        <p className={styles.createdTasks}>Tarefas criadas <span>{tasks.length}</span></p>
        <p className={styles.completedTasks}>
          Concluídas <span>{`${getTasksCompleted().length} de ${tasks.length}`}</span>
        </p>
      </div>

      <div className={styles.content}>

        {tasks.length === 0 && (
          <div className={styles.tasksEmpty}>
            <img src={clipboard} alt="imagem prancheta vazia" />
            <p>Você ainda não tem tarefas cadastradas</p>
            <span>Crie tarefas e organize seus itens a fazer</span>
          </div>
        )}

        {tasks.length !== 0 && (
          tasks.map(task => {
            return (
              <Task
                key={task.id}
                id={task.id}
                description={task.description}
                completed={task.completed}
                onDeleteTask={deleteTask}
                handleInputChangeCheckbox={handleChangeCheckbox}
              />
            )
          })
        )}

      </div>
    </article>
  )
}