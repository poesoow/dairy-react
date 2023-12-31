import React, { useState, useEffect } from 'react';
import './Todolist.css';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

enum TaskFilter {
  ALL = 'ALL',
  COMPLETED = 'COMPLETED',
  INCOMPLETE = 'INCOMPLETE'
}

const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
};

const TodoList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editedTaskText, setEditedTaskText] = useState('');
  const [taskFilter, setTaskFilter] = useState<TaskFilter>(TaskFilter.ALL);

  useEffect(() => {
    // Load tasks from local storage on component mount
    const savedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    // Save tasks to local storage whenever tasks state changes
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (inputValue.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: inputValue, completed: false }]);
      setInputValue('');
    }
  };

  const removeTask = (taskId: number) => {
    const newTasks = tasks.filter(task => task.id !== taskId);
    setTasks(newTasks);
  };

  const toggleComplete = (taskId: number) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const startEditing = (taskId: number, taskText: string) => {
    setEditingTaskId(taskId);
    setEditedTaskText(taskText);
  };

  const finishEditing = (taskId: number) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, text: editedTaskText } : task
    );
    setTasks(updatedTasks);
    setEditingTaskId(null);
    setEditedTaskText('');
  };

  const filteredTasks = tasks.filter(task => {
    if (taskFilter === TaskFilter.COMPLETED) {
      return task.completed;
    } else if (taskFilter === TaskFilter.INCOMPLETE) {
      return !task.completed;
    }
    return true;
  });

  return (
    <div className="todo-list">
      <h2>Todo List</h2>
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
        />
        <button onClick={addTask}>추가</button>
        <select onChange={e => setTaskFilter(e.target.value as TaskFilter)}>
          <option value={TaskFilter.ALL}>전체</option>
          <option value={TaskFilter.COMPLETED}>완료</option>
          <option value={TaskFilter.INCOMPLETE}>미완료</option>
        </select>
      </div>
      <ul>
        {filteredTasks.map(task => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleComplete(task.id)}
            />
            {editingTaskId === task.id ? (
              <input
                type="text"
                value={editedTaskText}
                onChange={e => setEditedTaskText(e.target.value)}
              />
            ) : (
              <span>{task.text}</span>
            )}
            <span className="timestamp">{formatDate(task.id)}</span>
            <button className="delete" onClick={() => removeTask(task.id)}>삭제</button>
            {editingTaskId === task.id ? (
              <button className="done" onClick={() => finishEditing(task.id)}>완료</button>
            ) : (
              <button className="edit" onClick={() => startEditing(task.id, task.text)}>수정</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
