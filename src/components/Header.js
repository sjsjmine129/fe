import React, {useState, useCallback, useEffect} from 'react';
import {View, Text, SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {
  COLOR_WHITE,
  COLOR_BACKGROUND,
  COLOR_GRAY,
  COLOR_PRIMARY,
} from '../assets/color';
import AnimatedButton from './AnimationButton';
import {useNavigation} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';
import {svgXml} from '../assets/svg';

export default function Header(props) {
  const navigation = useNavigation();
  const {title, isBackButton} = props;
  return (
    <View
      style={{
        backgroundColor: COLOR_PRIMARY,
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
      }}>
      {isBackButton ? (
        <AnimatedButton
          style={{
            position: 'absolute',
            // backgroundColor: 'red',
            left: 6,
            padding: 10,
          }}
          onPress={() => {
            navigation.goBack();
          }}>
          <SvgXml xml={svgXml.button.goback} width="24" height="24" />
        </AnimatedButton>
      ) : null}
      <Text
        style={{
          color: COLOR_WHITE,
          fontSize: 16,
          fontWeight: 'bold',
          textAlign: 'center',
        }}>
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({});
