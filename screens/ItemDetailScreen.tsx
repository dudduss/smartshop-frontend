import React, { Component } from 'react';
import { ScreenContainer } from 'react-native-screens';
import {
  Text,
  StyleSheet,
  View,
  Image,
  ScrollView,
  LogBox,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { HomeStackParamsList, FoodItemDetail, Review } from '../types';
import { getIpAddress } from '../utils';
import axios from 'axios';
import StarRating from 'react-native-star-rating';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList,
} from 'accordion-collapse-react-native';
import ReviewsList from '../components/ReviewsList';

// We need the List inside of ScrollView
LogBox.ignoreLogs([
  'VirtualizedLists should never be nested inside plain ScrollViews',
]);

type ItemDetailScreenRouteProp = RouteProp<HomeStackParamsList, 'ItemDetail'>;

type ItemDetailScreenProps = {
  route: ItemDetailScreenRouteProp;
};

type ItemDetailScreenState = {
  itemDetail?: FoodItemDetail;
  reviews: Review[];
  isLoading: boolean;
};

export default class ItemDetailScreen extends Component<
  ItemDetailScreenProps,
  ItemDetailScreenState
> {
  constructor(props: ItemDetailScreenProps) {
    super(props);

    this.state = {
      isLoading: false,
      itemDetail: undefined,
      reviews: [],
    };
  }

  componentDidMount() {
    const { route } = this.props;
    this.setState({ isLoading: true });

    const detailUrl =
      'http://' +
      getIpAddress() +
      ':3000/items/search/detail?nix_item_id=' +
      route.params.item.nix_item_id;

    axios
      .get(detailUrl)
      .then((response) => {
        this.setState({
          itemDetail: (response.data as unknown) as FoodItemDetail,
          isLoading: false,
        });
      })
      .catch((error) => console.log(error));

    const reviewsUrl =
      'http://' +
      getIpAddress() +
      ':3000/reviewsByItemId?itemId=' +
      route.params.item.id;

    axios
      .get(reviewsUrl)
      .then((response) => {
        const reviews = (response.data as unknown) as Review[];
        reviews.sort((a: Review, b: Review) => {
          return (
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
        });
        this.setState({
          reviews: (response.data as unknown) as Review[],
        });
      })
      .catch((error) => console.log(error));

    // We also want to make requests to our "health endpoint" when that is ready + get reviews endpoint
  }

  render() {
    const { route } = this.props;
    const { itemDetail, reviews } = this.state;
    const item = route.params.item;

    return (
      <ScreenContainer>
        <ScrollView nestedScrollEnabled={false}>
          <Image source={{ uri: item.image_url }} style={styles.foodImage} />
          <View style={styles.infoContainer}>
            <Text style={styles.foodNameText}>{item.food_name}</Text>
            <Text style={styles.brandNameText}>by {item.brand_name}</Text>
            <View style={styles.ratingContainer}>
              <StarRating
                disabled={true}
                maxStars={5}
                rating={item.rating}
                fullStarColor={'#2AD478'}
                emptyStarColor={'#2AD478'}
                starSize={30}
              ></StarRating>
              <Text style={styles.numReviewsText}>
                {item.num_reviews}
                {item.num_reviews == 1 ? ' review' : ' reviews'}
              </Text>
            </View>
          </View>
          <View style={styles.sectionSeparator} />
          {createNutritionSection(itemDetail)}
          <View style={styles.sectionSeparator} />
          {createReviewsSection(reviews)}
        </ScrollView>
      </ScreenContainer>
    );
  }
}

function createNutritionSection(itemDetail: FoodItemDetail) {
  return (
    <Collapse style={nutritionStyles.nutritionContainer}>
      <CollapseHeader>
        <View>
          <Text style={styles.sectionHeader}>Nutrition</Text>
        </View>
      </CollapseHeader>
      <CollapseBody>
        <View style={nutritionStyles.nutritionFactsContainer}>
          <Text style={nutritionStyles.servingSizeText}>
            <Text style={nutritionStyles.nutrientNameText}>Serving Size: </Text>
            {itemDetail
              ? itemDetail.serving_qty + itemDetail.serving_unit
              : 'unknown'}
          </Text>

          <Text style={nutritionStyles.nutritionFactsText}>
            <Text style={nutritionStyles.nutrientNameText}>Calories: </Text>
            {itemDetail ? itemDetail.nf_calories : 'unknown'}
          </Text>
          <Text style={nutritionStyles.nutritionFactsMacroText}>
            <Text style={nutritionStyles.nutrientNameText}>Fat: </Text>
            {itemDetail ? itemDetail.nf_total_fat + 'g' : 'unknown'}
          </Text>
          <Text style={nutritionStyles.nutritionFactsSubMacroText}>
            <Text style={nutritionStyles.nutrientNameText}>
              Saturated Fat:{' '}
            </Text>
            {itemDetail ? itemDetail.nf_saturated_fat + 'g' : 'unknown'}
          </Text>
          <Text style={nutritionStyles.nutritionFactsMacroText}>
            <Text style={nutritionStyles.nutrientNameText}>Protein: </Text>
            {itemDetail ? itemDetail.nf_protein + 'g' : 'unknown'}
          </Text>
          <Text style={nutritionStyles.nutritionFactsMacroText}>
            <Text style={nutritionStyles.nutrientNameText}>Carbs: </Text>
            {itemDetail ? itemDetail.nf_total_carbohydrate + 'g' : 'unknown'}
          </Text>
          <Text style={nutritionStyles.nutritionFactsSubMacroText}>
            <Text style={nutritionStyles.nutrientNameText}>Fiber: </Text>
            {itemDetail ? itemDetail.nf_dietary_fiber + 'g' : 'unknown'}
          </Text>
          <Text style={nutritionStyles.nutritionFactsSubMacroText}>
            <Text style={nutritionStyles.nutrientNameText}>Sugar: </Text>
            {itemDetail ? itemDetail.nf_sugars + 'g' : 'unknown'}
          </Text>
          <Text style={nutritionStyles.nutritionFactsMacroText}>
            <Text style={nutritionStyles.nutrientNameText}>Cholestrol: </Text>
            {itemDetail ? itemDetail.nf_cholesterol + 'mg' : 'unknown'}
          </Text>
          <Text style={nutritionStyles.nutritionFactsMacroText}>
            <Text style={nutritionStyles.nutrientNameText}>Sodium: </Text>
            {itemDetail ? itemDetail.nf_sodium + 'mg' : 'unknown'}
          </Text>
        </View>
      </CollapseBody>
    </Collapse>
  );
}

function createReviewsSection(reviews: Review[]) {
  return (
    <View style={styles.reviewsContainer}>
      <Text style={styles.sectionHeader}>Reviews</Text>
      {reviews.length === 0 ? (
        <Text> Be the first to review </Text>
      ) : (
        <ReviewsList reviews={reviews}></ReviewsList>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  foodImage: {
    marginTop: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '40%',
    paddingTop: '40%',
  },
  foodNameText: {
    fontSize: 20,
    fontWeight: '400',
  },
  brandNameText: {
    marginTop: 5,
    fontSize: 12,
    fontWeight: '300',
  },
  infoContainer: {
    marginTop: 20,
    marginLeft: 20,
  },
  ratingContainer: {
    marginTop: 10,
    flexDirection: 'row',
  },
  numReviewsText: {
    marginLeft: 5,
    marginTop: 5,
  },
  sectionSeparator: {
    marginTop: 20,
    marginBottom: 20,
    borderBottomColor: '#E5E5E5',
    borderBottomWidth: 5,
  },
  sectionHeader: {
    fontSize: 18,
  },
  reviewsContainer: {
    marginLeft: 20,
  },
});

const nutritionStyles = StyleSheet.create({
  nutrientNameText: {
    fontWeight: '600',
  },
  nutritionContainer: {
    marginLeft: 20,
  },
  nutritionFactsText: {
    fontSize: 15,
  },
  nutritionFactsMacroText: {
    fontSize: 15,
    marginLeft: 10,
  },
  nutritionFactsSubMacroText: {
    fontSize: 15,
    marginLeft: 20,
  },
  servingSizeText: {
    fontSize: 15,
    marginBottom: 10,
  },
  nutritionFactsContainer: {
    marginTop: 15,
  },
});
