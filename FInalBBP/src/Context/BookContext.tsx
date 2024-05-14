import React, { createContext, useContext, useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, updateDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { firebaseApp } from "../Firebase/firebaseConfig";
import Swal from 'sweetalert2';

interface IBookContext {
  books: any[];
  fetchBooks: () => void;
  addBook: (formData: any) => void;
  editBook: (id: string, updatedData: any) => void;
  deleteBook: (id: string) => void;
}

const BookContext = createContext<IBookContext | undefined>(undefined);

// Custom hook to use the context
export const useBookContext = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBookContext must be used within a BookProvider');
  }
  return context;
};

// Provider component
export const BookProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [books, setBooks] = useState<any[]>([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const db = getFirestore(firebaseApp); 
    const booksCollection = collection(db, 'Books Borrowed');
    const querySnapshot = await getDocs(booksCollection);
    const bookData: any[] = [];
    querySnapshot.forEach((doc) => {
      bookData.push({ id: doc.id, ...doc.data() });
    });
    setBooks(bookData);
  };

  const addBook = async (formData: any) => {
    const db = getFirestore(firebaseApp);
    try {
      await addDoc(collection(db, 'Books Borrowed'), formData);
      fetchBooks();
    } catch (error) {
      console.error('Error adding book to Firestore: ', error);
    }
  };

  const editBook = async (id: string, updatedData: any) => {
    const db = getFirestore(firebaseApp);
    try {
      await updateDoc(doc(db, 'Books Borrowed', id), updatedData);
      Swal.fire("Book updated successfully!", "", "success");
      fetchBooks(); 
    } catch (error) {
      console.error('Error updating book:', error);
      Swal.fire("Error updating book", (error as Error).message, "error");
    }
  };

  const deleteBook = async (id: string) => {
    const db = getFirestore(firebaseApp);
    try {
      await deleteDoc(doc(db, 'Books Borrowed', id));
      fetchBooks(); 
      Swal.fire('Submitted!', 'Your book has been removed in the list.', 'success');
    } catch (error) {
      console.error('Error submitting book:', error);
      Swal.fire('Error', 'An error occurred while deleting the book.', 'error');
    }
  };

  return (
    <BookContext.Provider value={{ books, fetchBooks, addBook, editBook, deleteBook }}>
      {children}
    </BookContext.Provider>
  );
};
