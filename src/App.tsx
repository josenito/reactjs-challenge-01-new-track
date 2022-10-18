import { Header } from './components/Header';
import { Todo } from './components/Todo';

import styles from './App.module.css';

import './global.css';

function App() {

  return (
    <div>
      <Header />
      <main>
        <div className={styles.wrapper}>
          <Todo />
        </div>
      </main>
    </div>
  )
}

export default App
