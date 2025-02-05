import { Alert, Modal, StyleSheet, Pressable, Text, View, TextInput, Button} from 'react-native';
import { Link } from 'expo-router';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import React, {useEffect, useState} from 'react';
import {Notes} from '../../components/notes';

import {basic} from '../../components/styles/basics'
export default function Index() {
    return (
      <View style={basic.container}>
        <Text style={basic.h1}>Home screen</Text>
      <Link href="/about" style={basic.button}>
        <Text>
        Go to About screen
        </Text>
      </Link>
      <SafeAreaProvider>
      <SafeAreaView style={basic.centeredView}>
        <Notes/>
      </SafeAreaView>
    </SafeAreaProvider>
    </View>
      
  );
}
