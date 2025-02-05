import api from './api';
import React, {useState} from 'react';

const getNotes = async (userID: number) => {
try {
    const response = await api.get(`/notes/user/${userID}`);
    return response.data;
  } catch (error) {
    console.error('Error getting note:', error);
    return [];
  }
}
const deleteNotes = async (id: number) => {
  try {
    const response = await api.delete(`/notes/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting note:', error);
    return [];
  }
}
export {getNotes, deleteNotes};