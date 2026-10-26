import { StatusBar } from 'expo-status-bar';
import {Navigation} from '@react-navigation/native';
import {
  StyleSheet, Text, View, Dimensions, FlatList,
  TouchableOpacity, Pressable, Modal, Button, Platform
} from 'react-native';
import { useState, useRef } from 'react';
import DynamicBottomSheet from './DynamicBottomSheet';
import DateTimePicker from '@react-native-community/datetimepicker';
const screenWidth = Dimensions.get('window').width;


export default function HomeScreen({navigation}) {
  const [noOfPerson, setNoOfPerson] = useState(2);
  const [reservationDate, setReservationDate] = useState(new Date());
  const [time, setTime] = useState("12:00");
  const noOfPersonSheetRef = useRef(null);
  const [showDate, setShowDate] = useState(false);
  const today = new Date();
  const timeRef = useRef(null);

  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 10);

  const reservationData ={
    noOfPerson,
    reservationDate,
    time
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Book a table</Text>
      <View style={styles.inputField}>
        <Text style={{ fontSize: 16, textAlign: 'center', marginHorizontal: 20, fontStyle: 'italic' }}>
          Persons
        </Text>
        <Pressable onPress={() => noOfPersonSheetRef.current?.open()}>
          <Text style={{ fontSize: 16, textAlign: 'center', marginHorizontal: 20, fontStyle: 'regular' }}>
            {noOfPerson} Persons
          </Text>
        </Pressable>
      </View>
      <Pressable onPress={() => setShowDate(true)}>
        <View style={styles.inputField}>

          <Text style={{ fontSize: 16, textAlign: 'center', marginHorizontal: 20, fontStyle: 'italic' }}>
            Date
          </Text>

          <Pressable onPress={() => setShowDate(true)}>
            <Text style={{ fontSize: 16, textAlign: 'center', marginHorizontal: 20, fontStyle: 'regular' }}>
              {reservationDate.toDateString()}
            </Text>
          </Pressable>
          <Modal transparent visible={showDate} animationType="slide">
            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
              <DateTimePicker
                value={reservationDate}
                mode="date"
                display="spinner"
                minimumDate={today}
                maximumDate={maxDate}
                onChange={(event, selectedDate) => {
                  if (selectedDate) setReservationDate(selectedDate);
                }}
              />
              <Button title="Done" onPress={() => setShowDate(false)} />
            </View>

          </Modal>

        </View>
      </Pressable>
      <Pressable onPress={() => timeRef.current?.open()}>
        <View style={styles.inputField}>
          <Text style={{ fontSize: 16, textAlign: 'center', marginHorizontal: 20, fontStyle: 'italic' }}>
            Time
          </Text>

          <Text style={{ fontSize: 16, textAlign: 'center', marginHorizontal: 20, fontStyle: 'regular' }}>
            {time}
          </Text>

        </View>
      </Pressable>

      <DynamicBottomSheet ref={noOfPersonSheetRef}>
        <View style={{ padding: 20, color: '#fff' }}>
          <Text style={{ fontSize: 18, marginBottom: 10, textAlign: 'center' }}>
            Number of Persons
          </Text>
          <TouchableOpacity style={{ paddingVertical: 10 }} onPress={async () => {
            setOrder('asc');
            await fetchData(text, 1);
            sheetRef.current?.close();
          }}>
            <FlatList
              data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
              keyExtractor={(item) => item.toString()}
              renderItem={({ item }) => (
                <Pressable onPress={() => {
                  setNoOfPerson(item);
                  noOfPersonSheetRef.current?.close();
                }}>
                  <Text style={{ fontSize: 16, paddingVertical: 10, textAlign: 'center' }}>{item} Persons</Text>
                </Pressable>
              )}
            ></FlatList>

          </TouchableOpacity>
        </View>


      </DynamicBottomSheet>
      <DynamicBottomSheet ref={timeRef}>
        <View style={{ padding: 20, color: '#fff' }}>
          <Text style={{ fontSize: 18, marginBottom: 10, textAlign: 'center' }}>
            Select Time Slot
          </Text>
          <FlatList
            data={["12:00", "12:30", "1:00", "1:30", "2:00", "2:30", "3:00", "3:30", "4:00", "4:30", "5:00", "5:30", "6:00"]}
            keyExtractor={(item) => item.toString()}
            renderItem={({ item }) => (
              <Pressable onPress={() => {
                setTime(item);
                timeRef.current?.close();
              }}>
                <Text style={{ fontSize: 16, paddingVertical: 10, textAlign: 'center' }}>{item}</Text>
              </Pressable>
            )}
          ></FlatList>
        </View>
      </DynamicBottomSheet>

      <TouchableOpacity style={styles.button} onPress={() => {
       
        navigation.navigate('FinalReservation', {reservationData});
      }}>
        <Text style={styles.text}>Submit</Text>
      </TouchableOpacity>


      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'top',
    paddingTop: 150,
  },
  inputField: {
    flexDirection: 'row',
    marginTop: 20,
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 10,
    width: screenWidth - 40,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#0011ff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 30,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  }
});
