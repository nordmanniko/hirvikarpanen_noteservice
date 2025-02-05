import {StyleSheet} from 'react-native';
export const basic=StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: '#25292e',
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 10,
          paddingTop: 20,
          overflow: 'scroll',
          maxHeight: '100%',
        },
        overlay: {
          elevation: 5,
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        h1: {
            color: '#fff',
            fontSize: 24,
            marginBottom: 12,
          },
          text: {
            color: '#fff',
            marginBottom: 6,
          },
          multilineText: {
            color: '#fff',
          },
          input:{
            height: 40,
            margin: 12,
            borderWidth: 1,
            padding: 10,
            color: '#fff',
            borderColor: '#fff',
            borderRadius: 5
          },
          button: {
            fontSize: 20,
            color: '#fff',
            borderRadius: 20,
            padding: 10,
            elevation: 2,
          },
          backButton: {
            fontSize: 20,
            color: '#fff',
            borderRadius: 20,
            padding: 10,
            elevation: 2,
            alignSelf: 'flex-end',
            marginBottom: 10,
          },
          centeredView: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          },
          modalView: {
            margin: 20,
            backgroundColor: '#25292e',
            borderRadius: 20,
            borderWidth:1,
            borderColor: '#fff',
            padding: 35,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
          },
          buttonOpen: {
            backgroundColor: '#F194FF',
          },
          buttonClose: {
            backgroundColor: '#2196F3',
          },
          textStyle: {
            color: 'white',
            fontWeight: 'bold',
            textAlign: 'center',
          },
          modalText: {
            marginBottom: 15,
            textAlign: 'center',
          },
    })