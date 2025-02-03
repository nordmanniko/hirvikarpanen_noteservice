import { View, StyleSheet, Text} from 'react-native';
import { Link, Stack } from 'expo-router';
import { SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import React, {useState, useEffect, Dispatch, SetStateAction} from 'react';
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
    if(res.length<=0){
    setNotes(res);
    console.log("notes null: ",notes,", res:",res);
  }else{
    setNotes(res);
    console.log("notes contains: ",notes,", res:",res);
  } 
  })
};
function NoteItem({ note }: { note: Note }) {
  return (
    <View style={styles.note}>
      <Text style={styles.noteH1}>{note.note_h1}</Text>
      <Text style={styles.noteText}>{note.note}</Text>
      <Text style={styles.noteText}>{note.date}</Text>
    </View>
  );
}
function Notes() {
    const [notes, setNotes] = useState<Note[]>([]);
    useEffect(() => {
      loadNotes(notes, setNotes);
    }, []);
    
    return (
      <>
        <Stack.Screen options={{ title: 'Notes' }} />
        <View style={styles.container}>
        {notes.map((note) => (
            <NoteItem key={note.note_h1} note={note} />
        ))}
        </View>
      </>
    );
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#25292e',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 6,
    },
    text: {
      color: '#fff',
    },
    note: {
      padding: 20,
      margin: 10,
      backgroundColor: '#fff',
      borderRadius: 10,
    },
    noteH1: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    noteText: {
      fontSize: 16,
    },
  });
export { Notes, loadNotes };