import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery, setFilterTags, sortByDate } from '../redux/blogSlice';
import { RootState } from '../redux/store';
import BlogPreview from './BlogPreview';

const BlogList = () => {
  const { posts, searchQuery, filterTags } = useSelector(
    (state: RootState) => state.blog
  );
  const dispatch = useDispatch();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleTagFilter = (tags: string[]) => {
    dispatch(setFilterTags(tags));
  };

  const filteredPosts = posts
    .filter((post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(
      (post) =>
        filterTags.length === 0 ||
        filterTags.some((tag) => post.tags.includes(tag))
    );

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg space-y-8">
      <h2 className="text-2xl font-semibold text-gray-700 text-center">
        Blog Posts
      </h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Search by title"
          value={searchQuery}
          onChange={handleSearch}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex space-x-4 justify-center">
          <button
            onClick={() => dispatch(sortByDate())}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
          >
            Sort by Date
          </button>
          <button
            onClick={() => handleTagFilter([])}
            className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition"
          >
            All Tags
          </button>
          <button
            onClick={() => handleTagFilter(['react'])}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
          >
            React
          </button>
          <button
            onClick={() => handleTagFilter(['javascript'])}
            className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition"
          >
            JavaScript
          </button>
        </div>
        <div className="space-y-4 mt-6">
          {filteredPosts.map((post, index) => (
            <BlogPreview key={index} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogList;
