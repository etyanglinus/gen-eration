"use client";
import { useEffect, useState } from 'react';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('/api/blog');
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error('Error fetching blog data:', error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div>
      {blogs.map(blog => (
        <div key={blog.id}>
          <h2>{blog.title}</h2>
          <p>{blog.paragraph}</p>
          <img src={blog.image} alt={blog.title} />
          <div>
            <strong>{blog.author.name}</strong> - {blog.author.designation}
          </div>
          <div>{blog.publishDate}</div>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
