import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TripListScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>All Trips</Text>
            {/* Add a list or flatlist to display all the trips */}
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

export default TripListScreen;