import { BlogPost } from '../types';
import DOMPurify from 'dompurify';

interface BlogPreviewProps {
  post: BlogPost;
}

const BlogPreview = ({ post }: BlogPreviewProps) => {
  const sanitizedDescription = DOMPurify.sanitize(post.description);

  return (
    <div className="p-6 border border-gray-300 rounded-md shadow-sm hover:shadow-lg transition">
      <h2 className="text-xl font-semibold text-gray-700">{post.title}</h2>
      <div
        className="text-gray-600 mt-4"
        dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
      />
      <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
        <span>{new Date(post.date).toLocaleDateString()}</span>
        <span className="flex space-x-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="bg-blue-100 text-blue-500 py-1 px-2 rounded-full text-xs"
            >
              {tag}
            </span>
          ))}
        </span>
      </div>
    </div>
  );
};

export default BlogPreview;
