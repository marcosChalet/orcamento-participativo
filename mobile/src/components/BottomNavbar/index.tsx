import React from 'react';
import {TouchableOpacity, StyleSheet, View, Text} from 'react-native';

import HomeIcon from 'assets/imgs/home-icon.svg';
import HeartIcon from 'assets/imgs/heart-icon.svg';
import PeopleIcon from 'assets/imgs/people-icon.svg';

export default function BottomNavbar() {
  return (
    <View style={styles.navbar}>
      <TouchableOpacity style={styles.barContent}>
        <HomeIcon width={30} height={26} />
        <Text style={styles.iconText}>Início</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.barContent}>
        <HeartIcon width={30} height={26} />
        <Text style={styles.iconText}>Favoritos</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.barContent}>
        <PeopleIcon width={30} height={26} />
        <Text style={styles.iconText}>Propostas da comunidade</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    width: '100%',
    height: 65,
    backgroundColor: '#FFF',
    borderTopWidth: 0.7,
    borderColor: '#CAC8C7',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: 7,
  },
  barContent: {
    height: '100%',
    width: 75,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 9,
    color: '#434343',
    paddingTop: 2,
  },
});
