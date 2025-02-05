import {StyleSheet} from 'react-native';
const noteStyle=StyleSheet.create({
    
  inspectionModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,

  },
  note: {
    width: '90%',
    maxWidth: 600,
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#23262E',
    borderRadius: 10,
    alignSelf: 'center',
    shadowColor: '#ffffff',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  noteH1: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#bab7eb',
  },
  noteText: {
    fontSize: 16,
    color: '#bab7eb',
  },
  truncatedText: {
    fontSize: 16,
    color: '#CEFFFB',
    overflow: 'hidden',
  },
  textStyle: {
    color: '#CEFFFB',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
    backgroundColor: 'transparent',
    borderRadius: 5,
  },
  closeButtonPressed: {
    backgroundColor: '#3a3d4a', // Darker shade when pressed
  },
  closeText: {
    color: '#bab7eb',
    fontSize: 18,
    fontWeight: 'bold',
  },
  deleteButton: {
    position: 'absolute',
    top: 100,
    right: 10,
    padding: 10,
    backgroundColor: 'transparent',
    borderRadius: 5,
  },
  
  deleteButtonPressed: {
    backgroundColor: '#3a3d4a', // Darker shade when pressed
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
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
})
export default noteStyle;