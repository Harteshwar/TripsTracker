import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import app from './firebaseConfig';

const HomeScreen = ({ navigation }) => {
    const handleSignOut = () => {
        const auth = getAuth(app);
        signOut(auth)
            .then(() => {
                navigation.navigate('Welcome');
            })
            .catch((error) => {
                console.error('SignOut Error:', error);
            });
    };

    return (
        <View style={styles.container}>
            <Text>Welcome!</Text>
            <Button title="Sign Out" onPress={handleSignOut} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default HomeScreen;