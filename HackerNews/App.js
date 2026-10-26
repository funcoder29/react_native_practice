import { useEffect, useState } from 'react';
import { View, Text, FlatList, Linking, ActivityIndicator } from 'react-native';
import { fetchTop10Stories } from './api_service/ApiService';

export default function App() {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    fetchTop10Stories().then(setStories);
  }, []);

  return (
    <View style={{ flex: 1, paddingTop: 50, justifyContent: 'center', backgroundColor: '#f5f5f5' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 }}>
        Hacker News Top 10 Stories
      </Text>
      {stories.length === 0 ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={stories}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
        <View style={{ padding: 12 }}>
          <Text
            style={{ fontSize: 16, fontWeight: 'bold', color: 'blue' }}
            onPress={() => item.url && Linking.openURL(item.url)}
          >
            {item.title}
          </Text>
          <Text>{item.score} by {item.by}</Text>
        </View>
      )}
    />)}
    </View>
  );
}
