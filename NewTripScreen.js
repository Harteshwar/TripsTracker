import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NewTripScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>New Trip</Text>
            {/* Add input fields for start point, pickup points, drop-off location, and dashboard miles */}
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
        marginBottom: 20,
    },
});

export default NewTripScreen;