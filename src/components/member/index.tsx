import React from 'react'

import { View, Text } from 'react-native'
import { theme } from '../../global/styles/theme'

import { Avatar } from '../avatar'
import { styles } from './style'

export type MemberProps = {
    id: string,
    username: string,
    avatar_url: string,
    status: string
}

type Props = {
    data: MemberProps
}

export function Member({data}: Props) {

    const {on, primary} = theme.colors
    const isOnline = data.status === 'online'

    return (
        <View style={styles.container}>
            <Avatar urlImage={data.avatar_url} />
            <View style={styles.playerContent}>
                <Text style={styles.title}>
                    { data.username }
                </Text>

                <View style={styles.status}>
                    <View 
                        style={[styles.bulletStatus, {
                            backgroundColor: isOnline ? on : primary
                        }]}
                    />
                    <Text style={styles.nameStatus}>
                        { isOnline ? 'Disponível' : 'Ocupado'} 
                    </Text>
                </View>
                <View style={{
                    height: 1,
                    width: '100%',
                    backgroundColor: theme.colors.heading,
                    opacity: 0.3
                }}/>
            </View>
        </View>
    )
}