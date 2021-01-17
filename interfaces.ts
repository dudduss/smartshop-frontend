export type FoodItem = {
  id: number;
  created_at: Date;
  updated_at: Date;
  image_url: string;
  num_reviews: number;
  rating: number;
  food_name: string;
  brand_name: string;
  nix_item_id: string;
  nix_brand_id: string;
};

export type MarkedFoodItem = FoodItem & { user_id: number; item_id: number };

// export interface FoodItem {
//   id: number;
//   created_at: Date;
//   updated_at: Date;
//   image_url: string;
//   num_reviews: number;
//   rating: number;
//   food_name: string;
//   brand_name: string;
//   nix_item_id: string;
//   nix_brand_id: string;
// }
