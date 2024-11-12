import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch } from 'react-redux';
import { addPost } from '../redux/blogSlice';
import { BlogPost } from '../types';
import Select from 'react-select';

const BlogForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPost: BlogPost = { title, description, date, tags };
    dispatch(addPost(newPost));
    setTitle('');
    setDescription('');
    setDate('');
    setTags([]);
  };

  const handleTagChange = (selectedOptions: any) => {
    setTags(selectedOptions.map((option: { value: string }) => option.value));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-lg shadow-lg space-y-6"
    >
      <h2 className="text-2xl font-semibold text-center text-gray-700">
        Create New Blog Post
      </h2>
      <div className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter Post Title"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <ReactQuill
          value={description}
          onChange={setDescription}
          className="border border-gray-300 rounded-md"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Select
          isMulti
          name="tags"
          options={[
            { value: 'react', label: 'React' },
            { value: 'javascript', label: 'JavaScript' },
            { value: 'css', label: 'CSS' },
          ]}
          className="basic-multi-select"
          classNamePrefix="select"
          value={tags.map((tag) => ({ value: tag, label: tag }))}
          onChange={handleTagChange}
          styles={{
            control: (base) => ({
              ...base,
              borderColor: '#d1d5db',
              borderRadius: '0.375rem',
              padding: '0.5rem',
            }),
          }}
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition"
      >
        Submit Post
      </button>
    </form>
  );
};

export default BlogForm;
