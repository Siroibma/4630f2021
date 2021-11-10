import React, { useState, useEffect } from 'react';
import {
  Button,
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

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

function DetailsScreen({ navigation, route}) {
  const { fullname, designer, videolink, price } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Key Info</Text>
      <Button
        title="Go to Parts"
        onPress={() => navigation.navigate('Parts')}
      />
      <Text>{JSON.stringify(fullname)} </Text>

      <Text> </Text>
      <Text> </Text>
      <Text> </Text>
      <Image source={{uri: 'https://reactjs.org/logo-og.png'}}
       style={{width: 400, height: 400}} />
    </View>
  );
}

function PartsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Parts Screen</Text>
      <Text>Details Screen</Text>
    </View>
  );
}

function HomeScreen({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const response = await fetch('http://stockalerts.pythonanywhere.com/');
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
                style = {styles.button}
                title="Go to Details"
                onPress={() => navigation.navigate('Details', {
                  fullname: item.fullname,
                  designer: item.designer,
                  item: item.videolink,
                  price: item.price
                })}
              />
              <Text style={styles.itemRow}>{item.fullname} {"\n"} 
              ${item.price}
              {"\n"} 
                    <Image source={{uri: 'https://images.unsplash.com/photo-1616627988031-f912e383aebb?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8ZnVybml0dXJlfHx8fHx8MTYzNjU4MTY2MA&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600'}}
       style={{width: 150, height: 150, alignSelf: "center", elevation: 5 }} />
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
    backgroundColor: 'white',
    
  },
  header: {
    textAlign: 'center',
    paddingBottom: 15,
    paddingTop: 15,
    backgroundColor: 'blue',
    color: 'white',
    fontWeight: 'bold',
  },
  itemRow: {
    textAlign: 'center',
    color: 'black',
    paddingBottom: 125,
    fontWeight: 'bold',
  },
  button : {
    marginTop: 'auto'
  }
});
