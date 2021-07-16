import React, { useState, useCallback } from 'react'
import { View, Text } from 'react-native'
import { styles } from './styles'

import { Background } from '../../components/background'
import { Profile } from '../../components/profile'
import { ButtonAdd } from '../../components/button-add'
import { CategorySelect } from '../../components/category-select'
import { ListHeader } from '../../components/list-header'
import { FlatList } from 'react-native-gesture-handler'
import { Appointment, AppointmentProps } from '../../components/appointment'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { COLLECTION_APPOINTMENTS } from '../../configs'
import { useEffect } from 'react'
import { Load } from '../../components/load'

export function Home() {
    const [category, setCategory] = useState('')
    const navigation = useNavigation()
    const [appointments, setAppointments] = useState<AppointmentProps[]>([])
    const [loading, setLoading] = useState(true)

    async function loadAppointments() {
        const response = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS)
        const storage: AppointmentProps[] = response ? JSON.parse(response) : []

        if (category) {
            setAppointments(storage.filter(item => item.category === category))
        } else {
            setAppointments(storage)
        }

        setLoading(false)
    }


    useFocusEffect(useCallback(() => {
        loadAppointments()
    }, [category]))

    function handleCategorySelect(categoryId:string) {
        categoryId === category ? setCategory('') : setCategory(categoryId)

    }

    function handleAppointmentDetails(guildSelected: AppointmentProps) {
        navigation.navigate("AppointmentDetails", { guildSelected })
    }
    
    function handleAppointmentCreate() {
        navigation.navigate("AppointmentCreate")
    }
    
    const Divider = () => <View style={{marginVertical:15}}/>

    return (
        <Background>
        <View style={styles.container}>
        <View style={styles.header}>
            <Profile />
            <ButtonAdd onPress={handleAppointmentCreate}/>
        </View>
            <CategorySelect 
                categorySelected={category}
                setCategory={handleCategorySelect}
            />
            {
                loading ? <Load /> :
                <View style={styles.content}>
                    <ListHeader 
                        title="Partidas Agendadas"
                        subtitle={`Total: ${appointments.length}`}
                    />

                    <FlatList
                        style={styles.matches}
                        showsVerticalScrollIndicator={false} 
                        data={appointments}
                        keyExtractor={item => item.id}
                        renderItem={({item}) => (
                            <Appointment 
                            data={item}
                            onPress={() => handleAppointmentDetails(item)} 
                            />
                        )}
                        ItemSeparatorComponent={Divider}
                        contentContainerStyle={{paddingBottom: 69}}
                    />
                </View>
            }
        </View>
        </Background>
    )
}