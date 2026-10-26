import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TouchableOpacity,FlatList,Pressable } from 'react-native';
import * as ApiService from './api/ApiService';
import { useEffect, useState, useRef, use } from 'react';
import DynamicBottomSheet from './components/DynamicBottomSheet';



export default function App()  {
  const [countriesMap, setCountriesMap] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const countrySheetRef = useRef(null);
  const [holidaysList, setHolidaysList] = useState([]);
 useEffect(() => {
    ApiService.fetchCountries()
      .then((countries) => {
        
        const cm = [];
        for (const country of countries) {
          cm.push({ name: country.name[0].text, isoCode: country.isoCode   });
        }
        setCountriesMap(cm);
        console.log('Countries map set:', JSON.stringify(cm) );
      })
      .catch((error) => {
        console.error('Error fetching countries:', error);
      });
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      console.log('Selected country changed:', selectedCountry);
      var holidayss=[];
      ApiService.fetchHolidays(selectedCountry.isoCode)
        .then((holidays) => {
         console.log('Holidays fetched:', JSON.stringify(holidays));
          holidays.forEach(holiday => {
            holidayss.push(holiday.startDate+' '+holiday.name[0].text);
          });
          console.log('Holidays parsed:', JSON.stringify(holidayss));
          setHolidaysList(holidayss);
          
        })
        .catch((error) => {
          console.error(`Error fetching holidays for ${selectedCountry.name}:`, error);
        });
    }
  }, [selectedCountry]);
  
  return (
    <View style={styles.container}>
     
      <Button title="Select a country" onPress={() =>countrySheetRef.current?.open()} />  
         { selectedCountry &&(<Text>{selectedCountry.name}</Text>)}
      <StatusBar style="auto" />

      <DynamicBottomSheet ref={countrySheetRef}>
        <View style={{ padding: 20, color: '#fff' }}>
          <Text style={{ fontSize: 18, marginBottom: 10, textAlign: 'center' }}>
            Select a country
          </Text>
          
            <FlatList
              data={countriesMap}
              keyExtractor={(item) => item.isoCode}
              renderItem={({ item }) => (
                <Pressable onPress={() => {
                  setSelectedCountry(item);
                  countrySheetRef.current?.close();
                }}>
                  <Text style={{ fontSize: 16, paddingVertical: 10, textAlign: 'center' }}>{item.name}</Text>
                </Pressable>
              )}
            ></FlatList>     
        </View>
      </DynamicBottomSheet>
      <FlatList

        data={holidaysList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
            <Text style={{ fontSize: 16 }}>{item}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'top',
    paddingTop:50,
  },
});
