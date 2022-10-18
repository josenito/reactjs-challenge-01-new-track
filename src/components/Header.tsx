import styles from './Header.module.css';

import TodoListLogo from '../assets/logo-todo-list.svg';

export const Header = () => {
  return (
    <header className={styles.header}>
      <img src={TodoListLogo} alt="Logotipo do todo" />
    </header>
  )
}