import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { useFetch } from "./useFetch";

export default function App() {
  console.log("App rendered");

  const { data, loading, error } = useFetch(
    "https://pokeapi.co/api/v2/pokemon?limit=10&offset=0"
  );

  console.log("Data in App:", data);

  if (loading) return <ActivityIndicator size="large" />;
  if (error) return <Text>Error occurred</Text>;

  return (
    <View style={styles.container}>
      {data.map(item => (
        <Text key={item.name} style={styles.text}>
          {item.name}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 18,
  },
});
