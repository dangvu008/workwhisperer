import React, { useState } from 'react';
import { WorkNote } from '../types';

interface WorkNotesProps {
  notes: WorkNote[];
  onAddNote: (note: Omit<WorkNote, 'id'>) => void;
  onEditNote: (note: WorkNote) => void;
  onDeleteNote: (id: string) => void;
}

export const WorkNotes: React.FC<WorkNotesProps> = ({
  notes,
  onAddNote,
  onEditNote,
  onDeleteNote,
}) => {
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [editingNote, setEditingNote] = useState<WorkNote | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    reminderTime: '',
    weekDays: [] as number[],
  });

  const weekDays = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingNote) {
      onEditNote({
        ...editingNote,
        ...formData,
        reminderTime: new Date(formData.reminderTime),
      });
    } else {
      onAddNote({
        ...formData,
        reminderTime: new Date(formData.reminderTime),
      });
    }
    
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      reminderTime: '',
      weekDays: [],
    });
    setIsAddingNote(false);
    setEditingNote(null);
  };

  const handleDelete = (note: WorkNote) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa ghi chú này?')) {
      onDeleteNote(note.id);
    }
  };

  return (
    <div className="work-notes">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Ghi Chú Công Việc</h2>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => setIsAddingNote(true)}
        >
          Thêm Ghi Chú
        </button>
      </div>

      <div className="space-y-4">
        {notes.slice(0, 3).map((note) => (
          <div key={note.id} className="border p-4 rounded">
            <div className="flex justify-between">
              <h3 className="font-bold">{note.title}</h3>
              <div>
                <button
                  className="mr-2"
                  onClick={() => {
                    setEditingNote(note);
                    setFormData({
                      title: note.title,
                      content: note.content,
                      reminderTime: note.reminderTime.toISOString().slice(0, 16),
                      weekDays: note.weekDays,
                    });
                  }}
                >
                  ✏️
                </button>
                <button onClick={() => handleDelete(note)}>🗑️</button>
              </div>
            </div>
            <p className="text-gray-600">{note.content}</p>
            <p className="text-sm text-gray-500">
              Nhắc nhở: {note.reminderTime.toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      {(isAddingNote || editingNote) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg max-w-md w-full"
          >
            <h3 className="text-lg font-bold mb-4">
              {editingNote ? 'Sửa Ghi Chú' : 'Thêm Ghi Chú'}
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block mb-1">
                  Tiêu đề ({formData.title.length}/100)
                </label>
                <input
                  type="text"
                  maxLength={100}
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full border p-2 rounded"
                />
              </div>

              <div>
                <label className="block mb-1">
                  Nội dung ({formData.content.length}/300)
                </label>
                <textarea
                  maxLength={300}
                  required
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  className="w-full border p-2 rounded"
                  rows={3}
                />
              </div>

              <div>
                <label className="block mb-1">Thời gian nhắc nhở</label>
                <input
                  type="datetime-local"
                  required
                  value={formData.reminderTime}
                  onChange={(e) =>
                    setFormData({ ...formData, reminderTime: e.target.value })
                  }
                  className="w-full border p-2 rounded"
                />
              </div>

              <div>
                <label className="block mb-1">Ngày trong tuần</label>
                <div className="flex gap-2">
                  {weekDays.map((day, index) => (
                    <label key={day} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.weekDays.includes(index + 1)}
                        onChange={(e) => {
                          const newWeekDays = e.target.checked
                            ? [...formData.weekDays, index + 1]
                            : formData.weekDays.filter((d) => d !== index + 1);
                          setFormData({ ...formData, weekDays: newWeekDays });
                        }}
                      />
                      <span className="ml-1">{day}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                {editingNote ? 'Lưu' : 'Thêm'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-200 px-4 py-2 rounded"
              >
                Hủy
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};