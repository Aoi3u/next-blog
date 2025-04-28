export type Comment = {
  id: string;
  content: string;
  postId: string;
  authorId: string;
  author: {
    name: string;
  };
  createdAt: Date;
  updatedAt: Date;
};