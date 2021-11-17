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

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Ikea Video App" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Parts" component={PartsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const Stack = createNativeStackNavigator();

function DetailsScreen({ navigation, route }) {
  const { fullname, designer, videolink, price } = route.params;
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
      <Button
        title="Go To Parts"
        onPress={() => navigation.navigate("Parts")}
      />
      <YoutubePlayer
        height={400}
        play={playing}
        videoId={videolink}
        onChangeState={onStateChange}
      />
    </View>
  );
}

function PartsScreen() {
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
        height={400}
        play={playing}
        videoId={"mRXYpxvL-I8"}
        onChangeState={onStateChange}
      />
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
                    videolink: item.videolink ,
                    price: item.price,
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
  },
});
