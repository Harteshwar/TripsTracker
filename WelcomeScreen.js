// WelcomeScreen.js
import React from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to TripTracker</Text>
            <Button
                title="Sign Up"
                onPress={() => navigation.navigate('SignUp')}
                color="#007bff"
            />
            <Button
                title="Sign In"
                onPress={() => navigation.navigate('SignIn')}
                color="#28a745"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    }
});

export default WelcomeScreen;
