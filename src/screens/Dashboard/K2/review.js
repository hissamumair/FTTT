import { View, Image } from 'react-native';
import React from 'react';
import { Card, Text } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';

export default function Review() {
  return (
    <ScrollView>
    <View style={{ justifyContent: 'center', flex: 1, padding: 10 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 12 }}>Comments and Review</Text>
      <Card style={{ justifyContent: 'center', marginTop: 20, padding: 10 }}>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
          {/* Profile Picture */}
          <Image 
            source={require('../../../assets/icons/profile2.png')} // Update the path to your image
            style={{ width: 40, height: 40, borderRadius: 20, marginRight: 10 }} // Rounded image
          />
          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 14 }}>Ed Viesturs (American Mountaineer):</Text>
            <Text style={{ fontSize: 12, marginVertical: 5 }}>
              This is a sample comment content. The weather is great!
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5 }}>
              <Text style={{ fontSize: 12 }}>⭐⭐⭐⭐⭐</Text>
              <Text style={{ fontSize: 10, color: 'gray' }}>5 mins ago</Text>
            </View>
          </View>
        </View>
      </Card>
      <Card style={{ justifyContent: 'center', marginTop: 20, padding: 10 }}>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
          {/* Profile Picture */}
          <Image 
            source={require('../../../assets/icons/profilepic.png')} // Update the path to your image
            style={{ width: 40, height: 40, borderRadius: 20, marginRight: 10 }} // Rounded image
          />
          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 14 }}>Reinhold (Legendary Italian Climber):</Text>
            <Text style={{ fontSize: 12, marginVertical: 5 }}>
              This is a sample comment content. The weather is great!
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5 }}>
              <Text style={{ fontSize: 12 }}>⭐⭐⭐⭐⭐</Text>
              <Text style={{ fontSize: 10, color: 'gray' }}>5 mins ago</Text>
            </View>
          </View>
        </View>
      </Card>
      <Card style={{ justifyContent: 'center', marginTop: 20, padding: 10 }}>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
          {/* Profile Picture */}
          <Image 
            source={require('../../../assets/icons/profile2.png')} // Update the path to your image
            style={{ width: 40, height: 40, borderRadius: 20, marginRight: 10 }} // Rounded image
          />
          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 14 }}>Nirmal Purja (Nepalese Mountaineer, First Winter Ascent)</Text>
            <Text style={{ fontSize: 12, marginVertical: 5 }}>
              This is a sample comment content. The weather is great!
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5 }}>
              <Text style={{ fontSize: 12 }}>⭐⭐⭐⭐⭐</Text>
              <Text style={{ fontSize: 10, color: 'gray' }}>5 mins ago</Text>
            </View>
          </View>
        </View>
      </Card>
      <Card style={{ justifyContent: 'center', marginTop: 20, padding: 10 }}>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
          {/* Profile Picture */}
          <Image 
            source={require('../../../assets/icons/profilepic.png')} // Update the path to your image
            style={{ width: 40, height: 40, borderRadius: 20, marginRight: 10 }} // Rounded image
          />
          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 14 }}>John Doe</Text>
            <Text style={{ fontSize: 12, marginVertical: 5 }}>
              This is a sample comment content. The weather is great!
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5 }}>
              <Text style={{ fontSize: 12 }}>⭐⭐⭐⭐⭐</Text>
              <Text style={{ fontSize: 10, color: 'gray' }}>5 mins ago</Text>
            </View>
          </View>
        </View>
      </Card>
      <Card style={{ justifyContent: 'center', marginTop: 20, padding: 10 }}>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
          {/* Profile Picture */}
          <Image 
            source={require('../../../assets/icons/profilepic.png')} // Update the path to your image
            style={{ width: 40, height: 40, borderRadius: 20, marginRight: 10 }} // Rounded image
          />
          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 14 }}>John Doe</Text>
            <Text style={{ fontSize: 12, marginVertical: 5 }}>
              This is a sample comment content. The weather is great!
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5 }}>
              <Text style={{ fontSize: 12 }}>⭐⭐⭐⭐⭐</Text>
              <Text style={{ fontSize: 10, color: 'gray' }}>5 mins ago</Text>
            </View>
          </View>
        </View>
      </Card>
    </View>
    </ScrollView>
  );
}
