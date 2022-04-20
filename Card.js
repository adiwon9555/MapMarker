import React, {useRef,useMemo} from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Animated,
} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { getRandomImages } from "./utils";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const CARD_HEIGHT = 380;

const Card = ({ itemData, closeBottomSlider }) => {
  const {
    p:title = "$379,590",
    addr: description = "address",
    // image = "https://www.linkpicture.com/q/panipuri_gupchup_indian_food.jpg",
    be:beds = '-',
    ba:baths = '-',
    sqft:ft = '-',
  } = itemData || {};

  const animatedValue = React.useRef(new Animated.Value(0))

  const bottom = animatedValue.current.interpolate({
    inputRange: [0, 1],
    outputRange: [height, CARD_HEIGHT],
  })

  const image = useMemo(()=>{
    return getRandomImages();
  },[title])

  React.useEffect(() => {
    showCard()
    return ()=>{hideCard()}
  }, [])

  const showCard=()=>{
    Animated.timing(animatedValue.current, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start()
  }

  const hideCard=()=>{
    Animated.timing(animatedValue.current, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(()=>{
      closeBottomSlider()
    })
  }
  const currency = title?.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,');


  return (
    <Animated.View
      style={[{
        position: "absolute",
        flex: 1,
        width: width,
        height: "100%",
      },{transform: [{ translateY: bottom }]}]}
    >
      
      <TouchableWithoutFeedback onPress={hideCard}>
        <View style={styles.card}>
          <Image
            source={{ uri: image }}
            style={styles.cardImage}
            resizeMode="cover"
          />
          <View style={styles.textContent}>
            <View>
              <Text numberOfLines={1} style={styles.cardtitle}>
                {'$'+currency}
              </Text>
              <Text numberOfLines={2} style={styles.cardDescription}>
                {description}
              </Text>
              <View style={styles.button}>
                <View style={styles.detailIconsView}>
                  <Ionicons name="bed" size={18} color={'gray'} />
                  <Text style={styles.detailText}>{beds} beds</Text>
                </View>
                <View style={styles.detailIconsView}>
                <FontAwesome5 name="bath" size={16} color={'gray'} />
                  <Text style={styles.detailText}>{baths} baths</Text>
                </View>
                <View style={styles.detailIconsView}>
                <FontAwesome5 name="ruler-combined" size={16} color={'gray'} />
                  <Text style={styles.detailText}>{ft} ft</Text>
                </View>
              </View>
            </View>
            <View>
              <Entypo name="heart-outlined" size={36} color={'black'} />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Animated.View>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    // padding: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: width - 32,
    overflow: "hidden",
  },
  cardImage: {
    flex: 4,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 2,
    padding: 10,
    flexDirection: "row",
  },
  cardtitle: {
    fontSize: 25,
    // marginTop: 5,
    fontWeight: "bold",
    color: "darkgreen",
  },
  cardDescription: {
    marginTop: 9,
    marginBottom: 6,
    fontSize: 16,
    color: "#444",
    width: width - 100,
  },
  button: {
    alignItems: "center",
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    width: width - 140,
  },
  detailText: {
    color: "gray",
    marginLeft: 8,
  },
  detailIconsView:{
    flexDirection: 'row'
  }
});
