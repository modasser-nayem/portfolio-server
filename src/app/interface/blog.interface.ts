export type TBlog = {
  title: string;
  thumbnail: string;
  content: string;
  category: string;
  tags: string[];
  status?: "draft" | "publish";
  createdAt?: Date;
};
