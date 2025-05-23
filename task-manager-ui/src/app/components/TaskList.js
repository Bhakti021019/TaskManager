import api from '../utils/api';

export default function TaskList({ tasks, fetchTasks }) {
  const handleDelete = async (id) => {
    await api.delete(`/${id}`);
    fetchTasks();
  };

  return (
    <ul className="space-y-2 mt-4">
      {tasks.map(task => (
        <li key={task._id} className="p-4 bg-gray-100 rounded shadow flex justify-between items-center">
          <div>
            <h3 className="font-bold">{task.title}</h3>
            <p>{task.description}</p>
            <p className="text-sm text-gray-500">Due: {task.dueDate?.split('T')[0]} | Priority: {task.priority} | Status: {task.status}</p>
          </div>
          <button onClick={() => handleDelete(task._id)} className="text-red-600">Delete</button>
        </li>
      ))}
    </ul>
  );
}