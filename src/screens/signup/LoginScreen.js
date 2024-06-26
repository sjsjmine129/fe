/* eslint-disable react-native/no-inline-styles */
import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useContext,
} from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  TextInput,
  StyleSheet,
  Keyboard,
  Pressable,
} from 'react-native';
import {
  COLOR_WHITE,
  COLOR_BACKGROUND,
  COLOR_GRAY,
  COLOR_PRIMARY,
  COLOR_TEXT70GRAY,
  COLOR_SECONDARY,
} from '../../assets/color';
import AnimatedButton from '../../components/AnimationButton';
import {useNavigation} from '@react-navigation/native';
import {API_URL} from '@env';
import axios from 'axios';
import HeaderWhite from '../../components/HeaderWhite';
import {SvgXml} from 'react-native-svg';
import {svgXml} from '../../assets/svg';
import LongPrimaryButton from '../../components/LongPrimaryButton';
import AppContext from '../../components/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen() {
  const navigation = useNavigation();

  //state 선언 -> UI에 영향을 미치는 변수들 만약 이게 바뀌었을때 화면이 바뀌어야하면 state로 선언
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordShow, setPasswordShow] = useState(true);
  const [disable, setDisable] = useState(true);

  //ref 선언 -> 요소를 직접 제어할때 사용
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  // 앱내부에서 전역변수로 사용하는 것 쓰고싶으면 선언한다
  const context = useContext(AppContext);

  // [ ] 안의 State가 변경될 때마다 실행된다. 여기서는 email, password가 변경될 때마다 실행되서 로그인 버튼이 활성화 될지 비활성화 될지 결정한다.
  useEffect(() => {
    if (email && password && disable) {
      setDisable(false);
    } else if ((!email || !password) && !disable) {
      setDisable(true);
    }
  }, [email, password]);

  // 이메일 입력이 끝나면 패스워드 입력으로 커서를 이동시키는 함수
  const endEmailInput = () => {
    passwordInputRef.current.focus();
  };

  // 로그인 하는 함수 -> 버튼 누르면 & 입력하고 엔터 누르면 작동
  const login = async () => {
    console.log('email:', email);
    console.log('password:', password);

    try {
      // 백엔드 요청 -> 아직 로그인 전인 백엔드 요청이라 토큰이 필요없다.
      const response = await axios.post(`${API_URL}/v1/users/email/sign-in`, {
        email: email,
        password: password,
      });

      //출력
      console.log('response:', response.data.data);

      //백엔드에서 받은 데이터가 없으면 에러 출력
      if (!response.data.data) {
        console.log('Error: No return data');
        return;
      }

      //백엔드에서 받은 토큰을 저장하고 화면 이동
      const accessToken = response.data.data.token.accessToken;
      const refreshToken = response.data.data.token.refreshToken;

      //전역 변수에 저장
      context.setAccessTokenValue(accessToken);
      context.setRefreshTokenValue(refreshToken);

      //디바이스에 저장
      AsyncStorage.setItem('accessToken', accessToken);
      AsyncStorage.setItem('refreshToken', refreshToken);

      navigation.navigate('BottomTab');
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <>
      <HeaderWhite title={'로그인'} isBackButton={true} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.entire}>
          <View style={styles.container}>
            <View style={styles.textAndInput}>
              <Text style={styles.samllText}>이메일 주소</Text>
              <TextInput
                ref={emailInputRef}
                onSubmitEditing={endEmailInput}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor={COLOR_GRAY}
                onChangeText={value => {
                  setEmail(value);
                }}
                value={email}
                style={styles.textinputBox}
              />
            </View>
            <View style={{height: 15}} />
            <View style={styles.textAndInput}>
              <Text style={styles.samllText}>비밀 번호</Text>
              <AnimatedButton
                style={styles.showButton}
                onPress={() => {
                  setPasswordShow(!passwordShow);
                }}>
                <SvgXml
                  width={20}
                  height={13}
                  xml={
                    passwordShow
                      ? svgXml.button.passwordShow
                      : svgXml.button.passwordNotShow
                  }
                />
              </AnimatedButton>
              <TextInput
                ref={passwordInputRef}
                onSubmitEditing={login}
                secureTextEntry={passwordShow}
                autoCapitalize="none"
                placeholderTextColor={COLOR_GRAY}
                onChangeText={value => {
                  setPassword(value);
                }}
                value={password}
                style={styles.textinputBox}
              />
            </View>

            <AnimatedButton
              onPress={() => {
                navigation.navigate('FindPassword');
              }}
              style={{marginTop: 7, padding: 3}}>
              <Text style={styles.samllText}>비밀번호 찾기</Text>
            </AnimatedButton>
          </View>

          <View style={{height: 20}} />
          <LongPrimaryButton text="로그인" action={login} disable={disable} />
          <AnimatedButton
            onPress={() => {
              navigation.navigate('Signup');
            }}
            style={{
              marginTop: 12,
              padding: 4,
            }}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.samllText}>{'계정이 없으신가요?'}</Text>
              <Text style={styles.samllTextColor}>{'회원가입'}</Text>
            </View>
          </AnimatedButton>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
}

const styles = StyleSheet.create({
  entire: {
    flex: 1,
    backgroundColor: COLOR_BACKGROUND,
    alignItems: 'center',
  },
  container: {
    width: '90%',
    // backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 160,
    marginHorizontal: 16,
  },
  textAndInput: {
    width: '100%',
    // backgroundColor: 'blue',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  samllText: {
    color: COLOR_TEXT70GRAY,
    fontSize: 12,
    fontWeight: 'normal',
    textAlign: 'center',
    paddingVertical: 4,
  },
  samllTextColor: {
    marginLeft: 60,
    color: COLOR_SECONDARY,
    fontSize: 12,
    fontWeight: 'normal',
    textAlign: 'center',
    paddingVertical: 4,
  },
  textinputBox: {
    padding: 0,
    fontSize: 15,
    height: 45,
    width: '100%',
    borderBottomWidth: 0.5,
    borderBottomColor: COLOR_TEXT70GRAY,
  },
  showButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    padding: 5,
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
