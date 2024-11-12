import BlogForm from '../components/BlogForm';
import BlogList from '../components/BlogList';

const Home = () => {
  return (
    <div className="max-w-4xl mx-auto mt-12">
      <BlogForm />
      <BlogList />
    </div>
  );
};

export default Home;
