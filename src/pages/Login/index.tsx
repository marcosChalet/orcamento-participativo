import React, {useRef, useState} from 'react';
import {ScrollView, TextInput, TouchableOpacity, View} from 'react-native';
import StyleSheet from 'react-native-media-query';

import AppText from 'components/ui/AppText';
import Button from 'components/ui/Button';
import EyeOn from 'assets/imgs/eye-on.svg';
import EyeOff from 'assets/imgs/eye-off.svg';

import {NavigationProp} from '@react-navigation/native';

import Strapi from "strapi-sdk-js";

const strapi = new Strapi({
  url: "http://192.168.0.6:1337",
  prefix: "/api",
  store: {
    key: "strapi_jwt",
    useLocalStorage: false,
    cookieOptions: { path: "/" },
  },
  axiosOptions: {
    headers: {
      'Authorization': 'Bearer 0ff43ad4a5309535078ffc1ece03c4408b9786e1a1e5e616479999a85cc15eaa6bc0f1b47731777a9d883c74dfc53bd3c7248b7ff9de0175846462168bb4849ab0225bc59c0cc3963e62916b8f9e95bb5bbc24e9d5d987c2f20334ad20187605d8078d55592d782205499b2b42bd6260c9ebb216d52928b6986b923fece42817',
      'Content-Type': 'application/json',
    }
  },
})

async function authenticate(user:string) {
  console.log(user);
  return strapi.find('usuarios', {
    filters: {
      matricula: {
        $eq: user,
      },
    },
  })
  .then((data : any) => {
    return data.data;
  })
  .catch((error) => {
    console.log(error);
  });
}

type LoginType = {
  navigation: NavigationProp<any, any>;
};

export default function Login({navigation}: LoginType) {
  const [login, setLogin] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const loginRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const [hidePassword, setHidePassword] = useState(true);

  function onSubmit() {
    if (login === '' || login === null) {
      setLogin(curr => curr ?? '');
      loginRef.current?.focus();
      return;
    }

    if (password === '' || password === null) {
      setPassword(curr => curr ?? '');
      passwordRef.current?.focus();
      return;
    }

    // verificar credenciais e logar...
    // TODO: fazer autenticação
    authenticate(login)
    .then( (data) => {
      if (data.length == 1) {
        let user = data[0]['attributes'];
        let nome = user['nome'];
        let matricula = user['matricula'];
        let email = user['email'];
        console.log('Logando o usuário: ');
        console.log(nome, matricula, email);
        navigation.navigate("Home");
      }
    }).catch( (error) => {
      console.log(error);
    })
  }

  function alertInputError(data: string | null) {
    return data === '' ? (
      <AppText style={styles.invalidInput}>Campo obrigatório!{'\n'}</AppText>
    ) : (
      false
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.container}>
        <AppText style={styles.screenTitle}>Login</AppText>
        <View style={styles.fullWidth}>
          <AppText style={[styles.inputText]}>
            {alertInputError(login)}
            E-mail institucional ou matrícula
          </AppText>
          <TextInput
            ref={loginRef}
            onChangeText={setLogin}
            autoCapitalize="none"
            keyboardType="email-address"
            style={styles.input}
            placeholderTextColor="#0004"
            placeholder="Digite..."
          />
        </View>
        <View style={[styles.fullWidth, styles.inputWrapper]}>
          <AppText style={styles.inputText}>
            {alertInputError(password)}
            Senha
          </AppText>
          <View style={styles.password}>
            <TextInput
              ref={passwordRef}
              onChangeText={setPassword}
              secureTextEntry={hidePassword}
              autoCapitalize="none"
              keyboardType="default"
              style={styles.input}
              placeholderTextColor="#0004"
              placeholder="Digite..."
            />
            <TouchableOpacity
              onPress={() => setHidePassword(!hidePassword)}
              style={styles.eyeIcon}>
              {hidePassword ? (
                <EyeOff width={24} height={24} />
              ) : (
                <EyeOn width={24} height={24} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        <Button style={styles.buttonStyle} clickFn={onSubmit}>
          <AppText style={styles.buttonText}>Login</AppText>
        </Button>

        <View style={styles.newAccountWrapper}>
          <AppText>Ainda não tem conta? </AppText>
          <TouchableOpacity>
            <AppText style={styles.newAccountText}>Se cadastre aqui.</AppText>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const {styles} = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    minHeight: 550,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 18,
    backgroundColor: '#FFF',
    '@media (min-width:400px)': {
      paddingHorizontal: 38,
    },
  },
  screenTitle: {
    width: '100%',
    marginBottom: 37,
    fontFamily: 'Alegreya-BoldItalic',
    fontSize: 37,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 27,
    fontFamily: 'Alegreya-BoldItalic',
  },
  buttonStyle: {
    marginTop: 20,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    width: '100%',
    borderRadius: 5,
    borderColor: '#848484',
    height: 41,
    fontSize: 16,
    paddingStart: 8,
    color: '#444',
  },
  inputText: {
    fontSize: 16,
    marginBottom: 5,
  },
  inputWrapper: {
    marginVertical: 20,
  },
  fullWidth: {
    width: '100%',
  },
  newAccountWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  newAccountText: {
    justifyContent: 'center',
    alignItems: 'center',
    color: '#F08D60',
  },
  password: {
    justifyContent: 'center',
  },
  eyeIcon: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    right: 8,
  },
  invalidInput: {
    color: '#c90007',
    backgroundColor: '#EEEFFF',
    fontFamily: 'Alegreya-ExtraBold',
  },
});
