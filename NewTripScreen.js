import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import app from './firebaseConfig';
import { getDistance } from 'geolib';

const NewTripScreen = () => {
  const [startPoint, setStartPoint] = useState('');
  const [startPointCoords, setStartPointCoords] = useState(null);
  const [pickupPoints, setPickupPoints] = useState([]);
  const [dropOffLocation, setDropOffLocation] = useState('');
  const [dropOffCoords, setDropOffCoords] = useState(null);
  const [dashboardMiles, setDashboardMiles] = useState('');
  const navigation = useNavigation();

  const handleStartPointSelect = (data, details) => {
    if (details && details.geometry && details.geometry.location) {
      setStartPoint(data.description);
      setStartPointCoords({
        latitude: details.geometry.location.lat,
        longitude: details.geometry.location.lng,
      });
    }
  };
  
  const handlePickupPointSelect = (data, details, index) => {
    if (details && details.geometry && details.geometry.location) {
      const updatedPickupPoints = [...pickupPoints];
      updatedPickupPoints[index] = {
        address: data.description,
        coords: {
          latitude: details.geometry.location.lat,
          longitude: details.geometry.location.lng,
        },
      };
      setPickupPoints(updatedPickupPoints);
    }
  };
  
  const handleDropOffSelect = (data, details) => {
    if (details && details.geometry && details.geometry.location) {
      setDropOffLocation(data.description);
      setDropOffCoords({
        latitude: details.geometry.location.lat,
        longitude: details.geometry.location.lng,
      });
    }
  };

  const handleAddPickupPoint = () => {
    setPickupPoints([...pickupPoints, { address: '', coords: null }]);
  };

  const handleRemovePickupPoint = (index) => {
    const updatedPickupPoints = [...pickupPoints];
    updatedPickupPoints.splice(index, 1);
    setPickupPoints(updatedPickupPoints);
  };

  const calculateDistance = (start, end) => {
    if (!start || !end) return 0;
    const distance = getDistance(start, end);
    return distance / 1609.344; // Convert meters to miles
  };

  const calculateTotalMiles = () => {
    let totalMiles = 0;

    if (startPointCoords && pickupPoints.length > 0) {
      totalMiles += calculateDistance(startPointCoords, pickupPoints[0].coords);
    }

    for (let i = 0; i < pickupPoints.length - 1; i++) {
      totalMiles += calculateDistance(pickupPoints[i].coords, pickupPoints[i + 1].coords);
    }

    if (pickupPoints.length > 0 && dropOffCoords) {
      totalMiles += calculateDistance(pickupPoints[pickupPoints.length - 1].coords, dropOffCoords);
    }

    return totalMiles.toFixed(2);
  };

  const handleStartTrip = async () => {
    if (!startPoint || !dropOffLocation || !dashboardMiles) {
      Alert.alert('Error', 'Please fill in all the required fields.');
      return;
    }

    const numericDashboardMiles = parseFloat(dashboardMiles);
    if (isNaN(numericDashboardMiles) || numericDashboardMiles <= 0) {
      Alert.alert('Error', 'Please enter a valid positive number for dashboard miles.');
      return;
    }

    try {
      const db = getFirestore(app);
      const tripsCollection = collection(db, 'trips');

      const newTrip = {
        startPoint,
        startPointCoords,
        pickupPoints,
        dropOffLocation,
        dropOffCoords,
        dashboardMiles: numericDashboardMiles,
        createdAt: new Date(),
      };

      await addDoc(tripsCollection, newTrip);

      setStartPoint('');
      setStartPointCoords(null);
      setPickupPoints([]);
      setDropOffLocation('');
      setDropOffCoords(null);
      setDashboardMiles('');

      const totalMiles = calculateTotalMiles();
      Alert.alert('Trip Started', `Total Miles: ${totalMiles}`);

      navigation.goBack();
    } catch (error) {
      console.error('Error starting trip:', error);
      Alert.alert('Error', 'An error occurred while starting the trip. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Start a New Trip</Text>

      <GooglePlacesAutocomplete
        placeholder="Start Point"
        onPress={handleStartPointSelect}
        query={{
          key: 'AIzaSyCsMIwajCzsLKL89krZj-410UwawZlqOrI',
          language: 'en',
        }}
        styles={{
          textInput: styles.input,
        }}
      />

      <Text style={styles.subtitle}>Pickup Points:</Text>
      {pickupPoints.map((point, index) => (
        <View key={index} style={styles.pickupPointContainer}>
          <GooglePlacesAutocomplete
            placeholder={`Pickup Point ${index + 1}`}
            onPress={(data, details) => handlePickupPointSelect(data, details, index)}
            query={{
              key: 'AIzaSyCsMIwajCzsLKL89krZj-410UwawZlqOrI',
              language: 'en',
            }}
            styles={{
              textInput: styles.input,
            }}
          />
          <Button
            title="Remove"
            onPress={() => handleRemovePickupPoint(index)}
            color="#FF0000"
          />
        </View>
      ))}
      <Button title="Add Pickup Point" onPress={handleAddPickupPoint} />

      <GooglePlacesAutocomplete
        placeholder="Drop-off Location"
        onPress={handleDropOffSelect}
        query={{
          key: 'AIzaSyCsMIwajCzsLKL89krZj-410UwawZlqOrI',
          language: 'en',
        }}
        styles={{
          textInput: styles.input,
        }}
      />

      <TextInput
        style={styles.input}
        placeholder="Dashboard Miles"
        value={dashboardMiles}
        onChangeText={setDashboardMiles}
        keyboardType="numeric"
      />

      <Text style={styles.calculatedMiles}>
        Calculated Miles: {calculateTotalMiles()} miles
      </Text>

      <Button title="Start Trip" onPress={handleStartTrip} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  pickupPointContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  calculatedMiles: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
  },
});

export default NewTripScreen;