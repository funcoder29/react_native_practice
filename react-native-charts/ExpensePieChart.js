import React from 'react';
import { View, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;


export default function ExpensePieChart({ data }) {
   
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <PieChart
        data={data}
        width={screenWidth}
        height={220}
        chartConfig={{
          backgroundColor: '#ffff00',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          color: () => '#000',
        }}
        accessor="population"
        backgroundColor="white"
        paddingLeft="16"
        absolute
      />
    </View>
  );
}


