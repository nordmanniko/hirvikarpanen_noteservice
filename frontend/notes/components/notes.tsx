import { View, StyleSheet, Text, Pressable, Modal, Alert } from 'react-native';
import { Link, Stack } from 'expo-router';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import getNotes from '../services/notes.service';

interface Note {
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

function BigModal({ note, setOpnNote }: { note: Note | null; setOpnNote: Dispatch<SetStateAction<Note | null>> }) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={note !== null}
      onRequestClose={() => setOpnNote(null)}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Pressable onPress={() => setOpnNote(null)}>
            <Text style={{ color: 'white', fontSize: 18 }}>Close</Text>
          </Pressable>
          <Text style={styles.noteH1}>{note?.note_h1}</Text>
          <Text style={styles.noteText}>{note?.note}</Text>
          <Text style={styles.noteText}>{note?.date}</Text>
        </View>
      </View>
    </Modal>
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
  text: {
    color: '#fff',
  },
  note: {
    width: '90%',
    maxWidth: 600,
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  noteH1: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  noteText: {
    fontSize: 16,
    color: '#333',
  },
  truncatedText: {
    fontSize: 16,
    color: '#333',
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
});

export { Notes, loadNotes };
