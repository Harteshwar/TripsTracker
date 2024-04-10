import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import DashboardScreen from './DashboardScreen';
import NewTripScreen from './NewTripScreen';
import TripListScreen from './TripListScreen';
import ReportsScreen from './ReportsScreen';

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="SignIn" component={SignInScreen} />
                <Stack.Screen name="SignUp" component={SignUpScreen} />
                <Stack.Screen name="Dashboard" component={DashboardScreen} />
                <Stack.Screen name="NewTrip" component={NewTripScreen} />
                <Stack.Screen name="TripList" component={TripListScreen} />
                <Stack.Screen name="Reports" component={ReportsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;