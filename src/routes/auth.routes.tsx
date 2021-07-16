import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { Home } from '../screens/Home'
import { AppointmentDetails } from '../components/appointment-details'
import { AppointmentCreate } from '../components/appointment-create'

const { Navigator, Screen} = createStackNavigator();

const config = {
    animation: 'timing',
    config: {
        duration: 3
    },
  };

export function AuthRoutes() {

    return (
        <Navigator
            headerMode="none"
            screenOptions={{
                cardStyle: {
                    backgroundColor: "transparent"
                },
                animationTypeForReplace: "push"
            }}
            // mode="modal"
            detachInactiveScreens
            

        >
            <Screen 
                name="Home"
                component={Home}
            />
            <Screen 
                name="AppointmentDetails"
                component={AppointmentDetails}
            />
            <Screen 
                name="AppointmentCreate"
                component={AppointmentCreate}
            />
        </Navigator>
    )
}