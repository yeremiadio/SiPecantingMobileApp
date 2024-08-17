import {ICategory} from '../category';

export interface IArticle {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  content: string;
  thumbnailImage: string | null;
  authorId: number;
  categoryId: number | null;
  category?: ICategory;
}
