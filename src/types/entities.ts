export interface Feedback {
  id: string;
  comment: string;
  rating: number;
  updatedAt: string;
  user: {
    email: string;
  };
  product: {
    id: string;
    name: string;
  };
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  image: string;
  rating: number;
  feedbackCount: number;
  feedbacks?: Feedback[];
}
