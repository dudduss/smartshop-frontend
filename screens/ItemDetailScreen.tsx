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
import {
  RootStackParamsList,
  FoodItemDetail,
  Review,
  WriteReviewNavigationProp,
  MarkedFoodItem,
} from '../types';
import {
  getIpAddress,
  getItemNumReviews,
  getItemRating,
  convertToMarkedFoodItem,
} from '../utils';
import axios from 'axios';
import StarRating from 'react-native-star-rating';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList,
} from 'accordion-collapse-react-native';
import ReviewsList from '../components/ReviewsList';
import ActionButton from '../components/ActionButton';
import {
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native-gesture-handler';

// We need the List inside of ScrollView
LogBox.ignoreLogs([
  'VirtualizedLists should never be nested inside plain ScrollViews',
  'Cannot update a component from inside the function body of a different component',
]);

type ItemDetailScreenRouteProp = RouteProp<RootStackParamsList, 'ItemDetail'>;

type ItemDetailScreenProps = {
  route: ItemDetailScreenRouteProp;
  navigation: WriteReviewNavigationProp;
};

type ItemDetailScreenState = {
  itemDetail?: FoodItemDetail;
  reviews: Review[];
  isLoading: boolean;
  isMarked: boolean;
  numReviews: number;
  rating: number;
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
      isMarked: false,
      reviews: [],
      numReviews: 0,
      rating: 0,
    };
  }

  getMarkedItem() {
    const { route } = this.props;

    const markedItemsUrl =
      'http://' +
      getIpAddress() +
      ':3000/markedItemsByUserId?userId=' +
      route.params.userId;

    axios
      .get(markedItemsUrl)
      .then((response) => {
        const markedItems: MarkedFoodItem[] = response.data.map((data) =>
          convertToMarkedFoodItem(data)
        );

        const markedItem = markedItems.find(
          (markedItem) => markedItem.id === route.params.item.id
        );

        this.setState({
          isMarked: markedItem ? true : false,
        });
      })
      .catch((error) => console.log(error));
  }

  changeMarkedItem() {
    const { route } = this.props;
    const { isMarked } = this.state;

    if (isMarked) {
      const deleteMarkedItemsUrl =
        'http://' +
        getIpAddress() +
        ':3000/markedItems?userId=' +
        route.params.userId +
        '&itemId=' +
        route.params.item.id;

      axios
        .delete(deleteMarkedItemsUrl)
        .then((response) => {
          this.setState({
            isMarked: false,
          });
        })
        .catch((error) => console.log(error));

      return;
    } else {
      const createdMarkedItemsUrl =
        'http://' + getIpAddress() + ':3000/markedItems';

      const body = {
        userId: route.params.userId,
        itemId: route.params.item.id,
      };
      axios
        .post(createdMarkedItemsUrl, body)
        .then((response) => {
          this.setState({
            isMarked: true,
          });
        })
        .catch((error) => console.log(error));
    }
  }

  getReviews() {
    const { route } = this.props;

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
          reviews: reviews,
          rating: getItemRating(reviews),
          numReviews: getItemNumReviews(reviews),
        });
      })
      .catch((error) => console.log(error));
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    this.props.navigation.addListener('focus', () => {
      this.componentDidMount();
    });

    // const detailUrl =
    //   'http://' +
    //   getIpAddress() +
    //   ':3000/items/search/detail?nix_item_id=' +
    //   route.params.item.nix_item_id;

    // axios
    //   .get(detailUrl)
    //   .then((response) => {
    //     this.setState({
    //       itemDetail: (response.data as unknown) as FoodItemDetail,
    //       isLoading: false,
    //     });
    //   })
    //   .catch((error) => console.log(error));

    this.getReviews();

    this.getMarkedItem();

    // We also want to make requests to our "health endpoint" when that is ready + get reviews endpoint
  }

  componentWillUnmount() {
    this.forceUpdate();
  }

  render() {
    const { route, navigation } = this.props;
    const { itemDetail, reviews, rating, numReviews, isMarked } = this.state;
    const item = route.params.item;
    const userId = route.params.userId;

    return (
      <ScreenContainer>
        <ScrollView nestedScrollEnabled={false}>
          <View style={{ flexDirection: 'row' }}>
            <Image source={{ uri: item.image_url }} style={styles.foodImage} />

            <View style={styles.bookmarkContainer}>
              <TouchableOpacity
                onPress={() => this.changeMarkedItem()}
                activeOpacity={1}
              >
                {isMarked ? (
                  <Image
                    source={require('../assets/bookmark_filled.png')}
                    style={styles.bookMarkImage}
                  ></Image>
                ) : (
                  <Image
                    source={require('../assets/bookmark_unfilled.png')}
                    style={styles.bookMarkImage}
                  ></Image>
                )}
              </TouchableOpacity>
            </View>

            {/* </TouchableHighlight> */}
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.foodNameText}>{item.food_name}</Text>
            <Text style={styles.brandNameText}>by {item.brand_name}</Text>
            <View style={styles.ratingReviewButtonContainer}>
              <View style={styles.ratingContainer}>
                <StarRating
                  disabled={true}
                  maxStars={5}
                  rating={rating}
                  fullStarColor={'#2AD478'}
                  emptyStarColor={'#2AD478'}
                  starSize={30}
                ></StarRating>
                <Text style={styles.numReviewsText}>
                  {numReviews}
                  {numReviews == 1 ? ' review' : ' reviews'}
                </Text>
              </View>

              <View style={styles.buttonContainer}>
                <ActionButton
                  onPress={() => {
                    const review = findReviewOfUser(reviews, userId);
                    navigation.push('WriteReview', {
                      item,
                      userId,
                      review,
                    });
                  }}
                  buttonText={'Review'}
                ></ActionButton>
              </View>
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
        <Text style={styles.noReviewsText}>
          No reviews yet, be the first one!
        </Text>
      ) : (
        <ReviewsList reviews={reviews}></ReviewsList>
      )}
    </View>
  );
}

function findReviewOfUser(
  reviews: Review[],
  userId: number
): Review | undefined {
  const review = reviews.find((item) => item.user_id === userId);
  return review;
}

const styles = StyleSheet.create({
  bookmarkContainer: {
    position: 'absolute',
    right: 0,
  },
  bookMarkImage: {
    width: 30,
    height: 30,
    margin: 15,
  },
  touchable: {
    width: 30,
    height: 30,
    // margin: 15,
  },
  foodImage: {
    marginTop: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '40%',
    paddingTop: '40%',
    position: 'relative',
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
  ratingReviewButtonContainer: {
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ratingContainer: {
    paddingTop: 5,
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
  noReviewsText: {
    marginTop: 50,
    textAlign: 'center',
  },
  buttonContainer: {
    // marginTop: 10,
    marginRight: 20,
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
