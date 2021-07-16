import React from 'react'
import { Image } from 'react-native'
import { styles } from './styles'

import { CDN_IMAGE } from '../../configs' 

type Props = {
    guildId: string,
    iconId: null | string,
}
export function GuildIcon({guildId, iconId}: Props) {

    const uri = `${CDN_IMAGE}/icons/${guildId}/${iconId}.png`
    const default_uri = "https://i.pinimg.com/originals/dd/89/c3/dd89c3f7743c253763c1d2ed8b552cc8.jpg"

    return (
        <>
        {
            iconId ? 
            <Image 
            source={{ uri }}
            style={styles.image}
            resizeMode="cover"
            />
            :
            <Image 
            source={{ uri: default_uri }}
            style={styles.image}
            resizeMode="cover"
            />
        }

        </>
    )

}