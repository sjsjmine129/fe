/* eslint-disable react-native/no-inline-styles */
import React, {
  useState,
  useCallback,
  useEffect,
  useContext,
  useRef,
} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Pressable,
} from 'react-native';
import {
  COLOR_WHITE,
  COLOR_BACKGROUND,
  COLOR_GRAY,
  COLOR_PRIMARY,
  COLOR_TEXT70GRAY,
  COLOR_TEXT_BLACK,
  COLOR_TEXT60GRAY,
} from '../assets/color';
import {useNavigation} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';
import {svgXml} from '../assets/svg';
import Header from '../components/Header';
import AppContext from '../components/AppContext';
import axios from 'axios';
import {API_URL} from '@env';
import {Dimensions} from 'react-native';
import AnimatedButton from './AnimationButton';

const windowWidth = Dimensions.get('window').width;

export default function FoodCategory(props) {
  const navigation = useNavigation();
  const context = useContext(AppContext);

  const categroyList1 = ['한식', '양식', '일식', '중식', '분식'];
  const categroyList2 = ['치킨', '피자', '버거', '아시안', '카페'];

  return (
    <View style={styles.todayPick}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 14,
        }}>
        <Text style={styles.todayPickTitle}>카테고리</Text>
        {/* TODO: 기능 구현 */}
        <AnimatedButton
          onPress={() => {
            console.log('카테고리로 넘어가기');
          }}>
          <SvgXml xml={svgXml.button.goForward} />
        </AnimatedButton>
      </View>
      <View style={styles.buttonLine}>
        {categroyList1.map((categroy, index) => {
          return (
            <AnimatedButton
              key={index}
              // {/* TODO: 기능 구현 */}
              onPress={() => {
                console.log(categroy, '누름');
              }}
              style={styles.categroyButton}>
              <Text style={styles.categroyText2}>{categroy}</Text>
            </AnimatedButton>
          );
        })}
      </View>
      <View style={styles.buttonLine}>
        {categroyList2.map((categroy, index) => {
          return (
            <AnimatedButton
              key={index}
              // {/* TODO: 기능 구현 */}
              onPress={() => {
                console.log(categroy, '누름');
              }}
              style={styles.categroyButton}>
              {categroy.length > 2 ? (
                <Text
                  style={{
                    fontSize: 16,
                    color: COLOR_WHITE,
                    fontWeight: 'bold',
                  }}>
                  {categroy}
                </Text>
              ) : (
                <Text style={styles.categroyText2}>{categroy}</Text>
              )}
            </AnimatedButton>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  todayPick: {
    marginTop: 15,
    width: windowWidth - 32,
    padding: 12,
    paddingHorizontal: 10,
    backgroundColor: COLOR_WHITE,
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4, // for Android
  },
  todayPickTitle: {
    fontSize: 20,
    color: COLOR_TEXT70GRAY,
    fontWeight: '700',
  },
  line: {
    marginVertical: 8,
    height: 0.5,
    backgroundColor: '#D9D9D9', // Change color as needed
    width: '100%', // Adjust width as needed
  },
  buttonLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 3,
  },
  categroyButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 34,
    width: 50,
    height: 50,
    backgroundColor: COLOR_PRIMARY,
    borderRadius: 20,
  },
  categroyText2: {
    fontSize: 20,
    color: COLOR_WHITE,
    fontWeight: 'bold',
  },
});
