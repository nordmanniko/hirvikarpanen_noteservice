import { View, StyleSheet, Text, Pressable, Modal, Alert } from 'react-native';
import { Link, Stack } from 'expo-router';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import {getNotes, deleteNotes} from '../services/notes.service';

interface Note {
  id: number;
  note_h1: string;
  note: string;
  img: string;
  date: string;
}

const loadNotes = (notes: Note[], setNotes: Dispatch<SetStateAction<Note[]>>) => {
  setNotes([]);
  const userID = 1;
  getNotes(userID).then((res) => {
    if (res.length <= 0) {
      setNotes(res);
      console.log("notes null: ", notes, ", res:", res);
    } else {
      setNotes(res);
      console.log("notes contains: ", notes, ", res:", res);
    }
  });
};
const DeleteNote = (id: number) => {
  Alert.alert(
    'Delete Note',
    'Are you sure you want to delete this note?',
    [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => console.log('OK Pressed'),


      },
    ],
    {
      cancelable: true,
    }
  );
}
function BigModal({ note, setOpnNote }: { note: Note | null; setOpnNote: Dispatch<SetStateAction<Note | null>> }) {
  const [isPressed, setIsPressed] = useState(false);
  return (
    <View style={styles.overlay}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={note !== null}
        onRequestClose={() => setOpnNote(null)}
        style={styles.inspectionModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <Pressable
              onPress={() => setOpnNote(null)}
              onPressIn={() => setIsPressed(true)}
              onPressOut={() => setIsPressed(false)}
              style={[
                styles.closeButton,
                isPressed && styles.closeButtonPressed,
              ]}
            >
              <Text style={styles.closeText}>Close</Text>
            </Pressable>
            <Text style={styles.noteH1}>{note?.note_h1}</Text>
            <Text style={styles.noteText}>{note?.note}</Text>
            <Text style={styles.noteText}>{note?.date}</Text>
            <Pressable
            onPress={() => DeleteNote(id: note?.id)}
              onPressIn={() => setIsPressed(true)}
              onPressOut={() => setIsPressed(false)}
              style={[
                styles.deleteButton,
                isPressed && styles.deleteButtonPressed,
              ]}>
              <Text style={styles.closeText}>DELETE</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

function NoteItem({ note, setOpnNote }: { note: Note; setOpnNote: Dispatch<SetStateAction<Note | null>> }) {
  return (
    <Pressable style={styles.note} onPress={() => setOpnNote(note)}>
      <Text style={styles.noteH1}>{note.note_h1}</Text>
      <Text style={styles.truncatedText} numberOfLines={3} ellipsizeMode="tail">
        {note.note}
      </Text>
      <Text style={styles.noteText}>{note.date}</Text>
    </Pressable>
  );
}

function Notes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [opnNote, setOpnNote] = useState<Note | null>(null);

  useEffect(() => {
    loadNotes(notes, setNotes);
  }, []);

  return (
    <>
      <Stack.Screen options={{ title: 'Notes' }} />
      {opnNote && <BigModal note={opnNote} setOpnNote={setOpnNote} />}
      <View style={styles.container}>
        {notes.map((note) => (
          <NoteItem key={note.note_h1} note={note} setOpnNote={setOpnNote} />
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  overlay: {
    elevation: 5,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  inspectionModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,

  },
  text: {
    color: '#bab7eb',
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#25292e',
    borderRadius: 20,
    borderWidth: 1,
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
  
  closeDeletePressed: {
    backgroundColor: '#3a3d4a', // Darker shade when pressed
  },
});

export { Notes, loadNotes };
