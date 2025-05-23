import { useState, useEffect } from 'react';

export default function TaskForm({ onSave, editingTask, onCancel }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    duedate: '',
    priority: 'Medium',
    status: 'Pending',
  });

  useEffect(() => {
    if (editingTask) {
      setForm({
        ...editingTask,
        duedate: editingTask.duedate ? editingTask.duedate.slice(0, 10) : '',
      });
    }
  }, [editingTask]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSave(form);
    setForm({
      title: '',
      description: '',
      duedate: '',
      priority: 'Medium',
      status: 'Pending',
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        required
        style={{ width: 200, marginRight: 12 }}
      />
      <input
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        style={{ width: 200, marginRight: 12 }}
      />
      <input
        type="date"
        name="duedate"
        value={form.duedate}
        onChange={handleChange}
        style={{ marginRight: 12 }}
      />
      <select name="priority" value={form.priority} onChange={handleChange} style={{ marginRight: 12 }}>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>
      <select name="status" value={form.status} onChange={handleChange} style={{ marginRight: 12 }}>
        <option>Pending</option>
        <option>In Progress</option>
        <option>Completed</option>
      </select>
      <button type="submit">{editingTask ? 'Update' : 'Add'} Task</button>
      {editingTask && <button type="button" onClick={onCancel} style={{ marginLeft: 8 }}>Cancel</button>}
    </form>
  );
}