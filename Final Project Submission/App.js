import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Button,
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  StatusBar,
  ActivityIndicator,
  Alert,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import YoutubePlayer from "react-native-youtube-iframe";
import { WebView } from "react-native-webview";
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
} from "react-native-table-component";
import * as OpenAnything from "react-native-openanything";

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Ikea Video App" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const Stack = createNativeStackNavigator();

function DetailsScreen({ navigation, route }) {
  const { fullname, designer, videolink, price, pdf, height, width, depth} = route.params;
  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  return (
    <View>
      <YoutubePlayer
        height={250}
        play={playing}
        videoId={videolink}
        onChangeState={onStateChange}
      />
      <Text style = {styles.generalText}>
        Full Name : {fullname}
        {"\n"}{"\n"}
        Designer : {designer}
        {"\n"}{"\n"}
        Price : {price}
        {"\n"}{"\n"}
        Height : {height}
        {"\n"}{"\n"}
        Width : {width}
        {"\n"}{"\n"}
        Height : {height}
        {"\n"}{"\n"}
        Depth : {depth}
        {"\n"}{"\n"}
      </Text>
      <Button
        title="PDF"
        onPress={() => OpenAnything.Web(pdf)}
      ></Button>
    </View>
  );
}


function HomeScreen({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const response = await fetch("http://stockalerts.pythonanywhere.com/");
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        <Text>Home Page</Text>
      </Text>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <>
              <Button
                style={styles.button}
                title="Go to Details"
                onPress={() =>
                  navigation.navigate("Details", {
                    fullname: item.fullname,
                    designer: item.designer,
                    videolink: item.videolink,
                    price: item.price,
                    pdf: item.pdf,
                    height: item.height,
                    width: item.width,
                    depth: item.depth 
                  })
                }
              />
              <Text style={styles.itemRow}>
                {item.fullname}
                <Image
                  source={{
                    uri: item.picturelink,
                  }}
                  style={{
                    width: 150,
                    height: 150,
                    alignSelf: "center",
                    resizeMode: "contain",
                  }}
                />
              </Text>
              <Text style={styles.generalText}>
                {"Furniture Price"}
                {"\n"} ${item.price}
              </Text>
            </>
          )}
        />
      )}
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  header: {
    textAlign: "center",
    paddingBottom: 15,
    paddingTop: 15,
    backgroundColor: "blue",
    color: "white",
    fontWeight: "bold",
  },
  itemRow: {
    textAlign: "center",
    color: "black",
    paddingBottom: 80,
    fontWeight: "bold",
  },
  button: {
    marginTop: "auto",
  },
  generalText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 17.90,
    color: "black",
  },
});
