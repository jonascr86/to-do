import React from 'react';
import { View, Text, StatusBar, StyleSheet } from 'react-native';

interface HeaderProps{
  isEnable: boolean;
}

export function Header({isEnable} : HeaderProps) {
  return (
    <View style={isEnable ? styles.headerDark : styles.header}>
      <Text style={isEnable ? styles.headerTextDark : styles.headerText}>to.</Text>
      <Text style={[isEnable ? styles.headerTextDark : styles.headerText, { fontFamily: 'Poppins-SemiBold' }]}>do</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    paddingTop: StatusBar.currentHeight,
    paddingBottom: 44,
    backgroundColor: '#273FAD',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  headerDark: {
    paddingTop: StatusBar.currentHeight,
    paddingBottom: 44,
    backgroundColor: '#191932',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  headerText: {
    fontSize: 24,
    color: '#FFF',
    fontFamily: 'Poppins-Regular',
  },
  headerTextDark: {
    fontSize: 24,
    color: '#E1E1E6',
    fontFamily: 'Poppins-Regular',
  }
});
