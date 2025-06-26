export interface ArticleInterface {
  _id: string;
  authorId: string;
  title: string;
  description: string;
  text: string;
  createdAt?: string;
  updatedAt?: string;
  likes?: number;
  paperclips?: number;
  cover?: string;
}
