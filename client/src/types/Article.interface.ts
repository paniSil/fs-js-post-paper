export interface ArticleInterface {
  articleId: number;
  authorId: number;
  title: string;
  subtitle: string;
  text: string;
  createdAt?: string;
  updatedAt?: string;
  likes?: number;
  paperclips?: number;
  cover?: string;
}
