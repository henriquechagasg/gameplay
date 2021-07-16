import React from 'react'
import { BorderlessButton } from 'react-native-gesture-handler'
import { Fontisto } from '@expo/vector-icons'
import uuid from 'react-native-uuid'
import { 
    Text, 
    View, 
    KeyboardAvoidingView, 
    Platform, 
    ScrollView, 
    Modal 
} from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'
import { Background } from '../background'
import { Header } from '../Header'
import { CategorySelect } from '../category-select'
import { GuildIcon } from '../guild-icon'
import { SmallInput } from '../small-input'
import { TextArea } from '../text-area'
import { ButtonIcon } from '../button-icon'
import { ModalView } from '../modal-view'
import { Guilds } from '../../screens/Guilds'
import { ListHeader } from '../list-header'
import { Member } from '../member'

import { COLLECTION_APPOINTMENTS } from '../../configs'
import { theme } from '../../global/styles/theme'
import { styles } from './styles'
import { useState } from 'react'
import { GuildProps } from '../guild'
import { useNavigation } from '@react-navigation/native'
import BannerImg from '../../assets/banner.png'
import AsyncStorage from '@react-native-async-storage/async-storage'


export function AppointmentCreate() {
    const [category, setCategory] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [guild, setGuild] = useState<GuildProps>({} as GuildProps)

    const [day, setDay] = useState('')
    const [month, setMonth] = useState('')
    const [hour, setHour] = useState('')
    const [minute, setMinute] = useState('')
    const [description, setDescription] = useState('')

    const navigation = useNavigation()
    
    function toggleModal() {
        setShowModal(!showModal)
    }

    function handleGuildSelect(guildSelect: GuildProps) {
        setGuild(guildSelect)
        toggleModal()
    }

    async function handleSave() {
        const newAppointment = {
            id: uuid.v4(),
            guild,
            category,
            date: `${day}/${month} às ${hour}:${minute}h`,
            description,
        }

        const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS)
        const appointments = storage ? JSON.parse(storage) : []
        await AsyncStorage.setItem(
            COLLECTION_APPOINTMENTS,
            JSON.stringify([
                ...appointments,
                newAppointment,
            ])
        )
        navigation.navigate('Home')
    }

    return (

        <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}>
                        <Background>

            <ScrollView>
                <Header
                    title="Agenda Partida"
                />

                <Text style={[styles.label, { marginLeft: 24, marginTop: 30, marginBottom: 18}]}>
                    Categoria
                </Text>
                <CategorySelect 
                    hasCheckBox
                    setCategory={setCategory}
                    categorySelected={category}
                />
                <View style={styles.form}>
                    <RectButton onPress={toggleModal}>

                        <View style={styles.select}>
                            {
                                guild.icon ? <GuildIcon 
                                guildId={guild.id}
                                iconId={guild.icon}
                                /> : <View style={styles.image} /> 
                            }
                            <View style={styles.selectBody}>
                                <Text style={styles.label}>
                                    {guild.name ? guild.name : 'Selecione um servidor'}
                                </Text>
                            </View>

                            <Feather 
                                name="chevron-right"
                                color={theme.colors.heading}
                                size={18}
                            />



                        </View>
                    </RectButton>
                    <View style={styles.field}>
                        <View>
                            <Text style={styles.label}>
                                Dia e mês
                            </Text>
                            <View style={styles.column}>   
                                <SmallInput 
                                    maxLength={2}
                                    onChangeText={setDay}
                                />
                                <Text style={styles.divider}>/</Text>
                                <SmallInput 
                                maxLength={2}
                                onChangeText={setMonth}
                                />
                            </View>
                        </View>

                        <View>
                            <Text style={styles.label}>
                                Hora e minuto
                            </Text>
                            <View style={styles.column}>   
                                <SmallInput 
                                maxLength={2}
                                onChangeText={setHour}
                                />
                                <Text style={styles.divider}>:</Text>
                                <SmallInput 
                                maxLength={2}
                                onChangeText={setMinute}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={[styles.field, {marginBottom: 12}]}>
                        <Text style={styles.label}>
                            Descrição
                        </Text>
                        <Text style={styles.caracterLimit}>
                            Max 100 caracteres
                        </Text>
                    </View>
                    <TextArea 
                        multiline
                        maxLength={100}
                        numberOfLines={5}
                        autoCorrect={false}
                        onChangeText={setDescription}
                    /> 
                    <View style={styles.btnContainer}>
                    <ButtonIcon 
                    title="Agendar"
                    noIcon
                    onPress={handleSave}
                    />
                </View>

                </View>



                

            </ScrollView>
            </Background>

            <ModalView visible={showModal} closeModal={toggleModal}>
                <Guilds handleGuildSelect={handleGuildSelect}/>
            </ModalView>

        </KeyboardAvoidingView>
    )
}