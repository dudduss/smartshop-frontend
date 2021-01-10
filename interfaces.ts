export interface FoodItem {
  id: number;
  user_id: number;
  item_id: number;
  created_at: Date;
  updated_at: Date;
  image_url: string;
  food_name: string;
  brand_name: string;
  rating: number;
  num_reviews: number;
}
