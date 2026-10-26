import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet, Text, View, Dimensions,TextInput, TouchableOpacity, ScrollView
} from 'react-native';
import { useState } from 'react';


const screenWidth = Dimensions.get('window').width;


export default function FinalReservationScreen({ route}) {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const {reservationData} = route.params;
 console.log("Reservation Data: ", reservationData);
 const reservationDate = new Date(reservationData.reservationDate);
  return (
    <ScrollView style={{backgroundColor: '#fff'}}>
       <View style={styles.container}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Contact details</Text>
      <View style ={styles.messageStyle}>
        <Text style={{ fontSize: 16, marginBottom: 10 }}>
          You are making a reservation for {reservationData.noOfPerson} persons on {reservationDate.toDateString()} at {reservationData.time}.
        </Text>
      </View>
      <View style={{ alignContent: 'left', marginTop: 20, width: screenWidth - 40 }}>
      <Text>Name</Text>
      <TextInput style={styles.inputField} placeholder="Enter your name" onChangeText={(text) => setName(text)} />
      <Text style={{ marginTop: 10 }}>Phone Number</Text>
      <TextInput style={styles.inputField} placeholder="Enter your phone number" 
      onChangeText={(text) => setPhoneNumber(text)}/>
      
     </View>
     <TouchableOpacity style={styles.button} onPress={() => {       
            console.log("Final Reservation Details: ", {
              name,
              phoneNumber,
              ...reservationData
            });
           }}>
        <Text style={styles.text}>Submit</Text>
      </TouchableOpacity>

      


      <StatusBar style="auto" />
       </View>
    </ScrollView>
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
  messageStyle:{
    backgroundColor: 'lightblue',
    padding: 10,
    marginTop: 20,
    width: screenWidth - 40,
  },
  inputField: {
    flexDirection: 'row',
  
    backgroundColor: 'white',
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    width: screenWidth - 40,
    justifyContent: 'space-between',
    alignItems: 'center',
    returnKeyType:"done"
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
