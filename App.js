import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import Card from "./Card";
import { numFormatter } from "./utils";


export default function App() {
  const [markerData, setMarkerData] = useState([]);
  const [bottomSliderOpen, setBottomSliderOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState({});
  useEffect(() => {
    axios
      .get(
        "https://gist.githubusercontent.com/vivekverma1993/29379139e49f61c55d0e28a888ccaa0d/raw/6dbf62c815e1890919ddb3a904e202add6bd5fb7/test.json"
      )
      .then(function (response) {
        // handle success
        setMarkerData(response?.data?.listings);
        console.log(response?.data?.listings);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const openBottonSlider = useCallback(() => {
    setBottomSliderOpen(true);
  }, []);

  const onMarkerPress = useCallback((report) => {
    setSelectedReport(report);
    openBottonSlider();
  }, []);

  const closeBottomSlider = useCallback(() => {
    setBottomSliderOpen(false);
    //callback for closeBottomSlider
  }, []);

  const mapMarkers = () => {
    return markerData?.map((report) => (
      <Marker
        key={report.id}
        coordinate={{ latitude: report?.lt, longitude: report?.ln }}
        onPress={() => onMarkerPress(report)}
      >
        <View style={[styles.markerWrap]}>
          <Text style={styles.markerText}>{numFormatter(report?.p)}</Text>
        </View>
      </Marker>
    ));
  };

  return (
    <>
      <View style={styles.container}>
        {/*Render our MapView*/}
        <MapView
          style={styles.map}
          mapType={"standard"}
          //specify our coordinates.
          initialRegion={{
            latitude: 47.876774,
            longitude: -121.957482,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {mapMarkers()}
        </MapView>
      </View>
      {bottomSliderOpen && (
        <Card closeBottomSlider={closeBottomSlider} itemData={selectedReport} />
      )}
    </>
  );
}
//create our styling code:
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1, //the container will fill the whole screen.
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    width: 50,
    height: 20,
    backgroundColor: "#006400",
  },
  markerText: {
    color: "white",
    fontSize: 13,
  },
  marker: {
    width: 30,
    height: 30,
  },
});
