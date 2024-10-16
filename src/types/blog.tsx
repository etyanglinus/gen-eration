export interface Blog {
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
