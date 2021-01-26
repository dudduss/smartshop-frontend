import { Review, MarkedFoodItem } from './types';
import { relevantClaims } from './constants';

export function getIpAddress() {
  return '192.168.0.32';
}

export function getItemNumReviews(itemReviews: Review[]): number {
  return itemReviews.length;
}

export function getItemRating(itemReviews: Review[]): number {
  return (
    itemReviews.reduce((sum, { rating }) => sum + rating, 0) /
    itemReviews.length
  );
}

export function convertToMarkedFoodItem(data: any): MarkedFoodItem {
  const markedFoodItem = {
    id: data['item_id'],
    created_at: data['created_at'],
    updated_at: data['updated_at'],
    image_url: data['image_url'],
    food_name: data['food_name'],
    brand_name: data['brand_name'],
    nix_item_id: data['nix_item_id'],
    user_id: data['user_id'],
    marked_food_item_id: data['id'],
  };

  return markedFoodItem;
}

export function getRelevantClaims(itemClaims: string[]): string[] {
  const itemRelevantClaims = [];
  for (var claimArr of relevantClaims) {
    for (var claim of claimArr) {
      if (itemClaims.includes(claim)) {
        itemRelevantClaims.push(claim);
        break;
      }
    }
  }

  return itemRelevantClaims;
}
