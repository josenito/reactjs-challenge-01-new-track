import { Trash } from 'phosphor-react';

import styles from './Task.module.css';

interface taskProps {
  id: string;
  description: string;
  completed: boolean;
  onDeleteTask: (id: string) => void;
  handleInputChangeCheckbox: (id: string) => void;
}

export const Task = ({ id, description, completed, onDeleteTask, handleInputChangeCheckbox }: taskProps) => {

  const handleDeleteTask = () => {
    onDeleteTask(id);
  }

  const handleInputChangeTask = () => {
    handleInputChangeCheckbox(id);
  }

  return (
    <div className={styles.task}>
      <div className={styles.inputCheckbox}>
        <div >
          <input
            type="checkbox"
            className={styles.customCheckbox}
            checked={completed}
            onChange={handleInputChangeTask}
          />
        </div>

        <strong className={completed ? styles.descriptionLineThrough : styles.description}>
          {description}
        </strong>
      </div>

      <button title="Deletar tarefa" onClick={handleDeleteTask}>
        <Trash size={20} />
      </button>
    </div>
  )
}