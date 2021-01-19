import { Review } from './types';

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
