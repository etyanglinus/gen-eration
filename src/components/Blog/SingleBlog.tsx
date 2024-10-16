/* eslint-disable @next/next/no-img-element */
import React from 'react';

// Define the Blog type
interface Blog {
  id: number;
  title: string;
  paragraph: string;
  image: string;
  author: {
    name: string;
    designation: string;
  };
  publishDate: string;
}

// Define the props type for SingleBlog
interface SingleBlogProps {
  blog: Blog; // Add blog prop here
}

const SingleBlog: React.FC<SingleBlogProps> = ({ blog }) => {
  return (
    <div className="single-blog">
      <img src={blog.image} alt={blog.title} className="w-full h-auto" />
      <h3 className="text-xl font-bold">{blog.title}</h3>
      <p className="mt-2">{blog.paragraph}</p>
      <p className="mt-4 text-sm text-gray-600">
        By: {blog.author.name} ({blog.author.designation})
      </p>
      <p className="mt-1 text-xs text-gray-500">Published on: {blog.publishDate}</p>
    </div>
  );
};

export default SingleBlog;
