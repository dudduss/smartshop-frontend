import { StackNavigationProp } from '@react-navigation/stack';

export type HomeStackParamsList = {
  Home: undefined;
  SearchResults: { searchString: string; userId: number };
  ItemDetail: { item: FoodItem; userId: number };
  BarcodeScanner: undefined;
  // WriteReview: { item: FoodItem; userId: number; review?: Review };
};

export type RootStackParamsList = {
  Home: undefined;
  SearchResults: { searchString: string; userId: number };
  ItemDetail: { item: FoodItem; userId: number };
  WriteReview: { item: FoodItem; userId: number; review?: Review };
  BarcodeScanner: { userId: number };
};

export type SearchResultsNavigationProp = StackNavigationProp<
  RootStackParamsList,
  'SearchResults'
>;

export type ItemDetailNavigationProp = StackNavigationProp<
  RootStackParamsList,
  'ItemDetail'
>;

export type WriteReviewNavigationProp = StackNavigationProp<
  RootStackParamsList,
  'WriteReview'
>;

export type BarcodeScannerNavigationProp = StackNavigationProp<
  RootStackParamsList,
  'BarcodeScanner'
>;

export type FoodItem = {
  id: number;
  created_at: Date;
  updated_at: Date;
  image_url: string;
  food_name: string;
  brand_name: string;
  nix_item_id: string;
  nix_brand_id?: string;
};

export type MarkedFoodItem = FoodItem & {
  user_id: number;
  marked_food_item_id: number;
};

export type FoodItemDetail = {
  food_name: string;
  brand_name: string;
  serving_qty: number;
  serving_unit: string;
  serving_weight_grams: number;
  nf_calories: number;
  nf_total_fat: number;
  nf_saturated_fat: number;
  nf_cholesterol: number;
  nf_sodium: number;
  nf_total_carbohydrate: number;
  nf_dietary_fiber: number;
  nf_sugars: number;
  nf_protein: number;
  nf_potassium?: number;
  nix_brand_id: string;
  photo: {
    thumb: 'string';
  };
  nix_item_id: string;
  nf_ingredient_statement: string;
  claims: string[];
};

export type Review = {
  id: number;
  user_id: number;
  profile_picture_url?: string;
  first_name: string;
  last_name: string;
  item_id: number;
  content: string;
  rating: number;
  created_at: Date;
  updated_at: Date;
};
