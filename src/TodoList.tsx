import React, { useState } from 'react';
import './Todolist.css';

interface Task {
  id: number;
  text: string;
}

const TodoList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editedTaskText, setEditedTaskText] = useState('');

  const addTask = () => {
    if (inputValue.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: inputValue }]);
      setInputValue('');
    }
  };

  const removeTask = (taskId: number) => {
    const newTasks = tasks.filter(task => task.id !== taskId);
    setTasks(newTasks);
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
      </div>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {editingTaskId === task.id ? (
              <input
                type="text"
                value={editedTaskText}
                onChange={e => setEditedTaskText(e.target.value)}
              />
            ) : (
              <span>{task.text}</span>
            )}
            <button className='delete' onClick={() => removeTask(task.id)}>삭제</button>
            {editingTaskId === task.id ? (
              <button className='done' onClick={() => finishEditing(task.id)}>완료</button>
            ) : (
              <button className='edit' onClick={() => startEditing(task.id, task.text)}>수정</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;