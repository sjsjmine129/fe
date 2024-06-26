import React, {useState, useCallback, useEffect} from 'react';
import {View, Text, SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {
  COLOR_WHITE,
  COLOR_BACKGROUND,
  COLOR_GRAY,
  COLOR_PRIMARY,
} from '../../assets/color';
import AnimatedButton from '../../components/AnimationButton';
import {useNavigation} from '@react-navigation/native';
import Header from '../../components/Header';

export default function MypageScreen() {
  const navigation = useNavigation();

  return (
    <>
      <Header title={'마이 프로필'} isBackButton={false} />
      <View style={styles.entire}>
        <Text style={styles.textMain}>MypageScreen</Text>
        <AnimatedButton
          onPress={() => {
            navigation.navigate('UserDataChange');
          }}
          style={styles.buttonTest}>
          <Text style={styles.buttonText}>프로필 정보 수정 페이지 이동</Text>
        </AnimatedButton>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  entire: {
    flex: 1,
    backgroundColor: COLOR_BACKGROUND,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textMain: {
    fontSize: 50,
    color: COLOR_PRIMARY,
  },
  buttonTest: {
    backgroundColor: COLOR_PRIMARY,
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: COLOR_WHITE,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});
