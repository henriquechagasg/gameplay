import React from 'react';
import { styles } from './styles'
import {
        View, 
        Text,
        Image,
        Alert,
        ActivityIndicator
        } from 'react-native';
import IllustrationImage from '../../assets/illustration.png'
import { ButtonIcon } from '../../components/button-icon';
import { useAuth } from '../../hooks/auth.context';
import { theme } from '../../global/styles/theme';


export function SignIn() {

    const { loading, signIn } = useAuth()

    async function handleSignIn() {
      try {
        await signIn()
      } catch (error) {
        Alert.alert(error)
      }
    }



    return (
      <View style={styles.container}>
        <Image 
        source={IllustrationImage}
        style={styles.image}
        resizeMode="stretch"
        />

        <View style={styles.content}>
            <Text style={styles.title}>
                Conecte-se{`\n`}
                e organize suas{`\n`}
                jogatinas
            </Text>

            <Text style={styles.subtitle}>
                Crie grupos para jogar seus games {`\n`}
                favoritos com seus amigos
            </Text>
            {
              loading ? <ActivityIndicator color={theme.colors.primary} /> 
              :
              <ButtonIcon 
              title={"Entrar com Discord."}
              activeOpacity={0.7}
              onPress={handleSignIn}
              />
            }

        </View>
      </View>
    );
}


