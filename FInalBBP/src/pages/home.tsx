import React, { useState } from 'react';
import { HiUserCircle } from 'react-icons/hi';
import { BiSolidBook } from "react-icons/bi";
import { TbMessageReport } from "react-icons/tb";
import { HiMiniPencilSquare } from "react-icons/hi2";
import { FiCheck } from "react-icons/fi";
import Swal from 'sweetalert2';
import { useBookContext } from '../Context/BookContext';
import { useAuth } from "../Context/AuthContext";
import { useRouter } from "next/router";

const Home: React.FC = () => {
  const { books, editBook, addBook, deleteBook } = useBookContext();
  const { user } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    router.push('/');
  };

  const handleEditBook = async (bookId: string) => {
    const { value: section, dismiss: sectionDismiss } = await Swal.fire({
      title: "Edit Section",
      input: "text",
      inputValue: books.find(book => book.id === bookId)?.section || '',
      inputPlaceholder: "Enter new section",
      confirmButtonColor: "#0b5394",
      showCancelButton: true,
    });

    if (section === undefined || sectionDismiss === Swal.DismissReason.cancel) {
      Swal.fire("Edit Cancelled", "", "error", );
      return;
    }

    const { value: title, dismiss: titleDismiss } = await Swal.fire({
      title: "Edit Title",
      input: "text",
      inputValue: books.find(book => book.id === bookId)?.title || '',
      inputPlaceholder: "Enter new title",
      confirmButtonColor: "#0b5394",
      showCancelButton: true,
    });

    if (title === undefined || titleDismiss === Swal.DismissReason.cancel) {
      Swal.fire("Edit Cancelled", "", "error");
      return;
    }

    const { value: genre, dismiss: genreDismiss } = await Swal.fire({
      title: "Edit Genre",
      input: "text",
      inputValue: books.find(book => book.id === bookId)?.genre || '',
      inputPlaceholder: "Enter new genre",
      confirmButtonColor: "#0b5394",
      showCancelButton: true,
    });

    if (genre === undefined || genreDismiss === Swal.DismissReason.cancel) {
      Swal.fire("Edit Cancelled", "", "error");
      return;
    }

    const { value: date, dismiss: dateDismiss } = await Swal.fire({
      title: "Edit Date",
      input: "date",
      inputValue: books.find(book => book.id === bookId)?.date || '',
      confirmButtonColor: "#0b5394",
      showCancelButton: true,
    });

    if (date === undefined || dateDismiss === Swal.DismissReason.cancel) {
      Swal.fire("Edit Cancelled", "", "error");
      return;
    }

    const updatedBook = { section, title, genre, date };
    await editBook(bookId, updatedBook);
  };

  const handleReportBook = async (bookId: string) => {
    const { value: text } = await Swal.fire({
      input: "textarea",
      inputLabel: "Report",
      inputPlaceholder: "Is there any problem in the Book?...",
      inputAttributes: {
        "aria-label": "Is there any problem in the Book"
      },
      confirmButtonColor: "#0b5394",
      showCancelButton: true
    });

    if (text) {
      Swal.fire("Your report has been submitted, Thank you", "", "info");
    }
  };

  const handleSubmit = async (formData: any) => {
    await addBook(formData);
    setShowModal(false);
    Swal.fire("Book is added successfully", "", "success");
  };

  return (
    <div className="min-h-screen bg-gradient-to-t from-zinc-50 via-sky-700 to-indigo-900">
      <header className="bg-blue-900 text-white py-4 px-8 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-semibold mb-1 ml-3 mt-2">Welcome Student</h1>
          <p className="text-lg ml-3">
            Please input your borrowed books details below. Happy reading!😊
          </p>
        </div>
        <div className="relative mr-12">
          <HiUserCircle
            size={34}
            className="cursor-pointer"
            onClick={() => setShowDropdown(!showDropdown)}
          />
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg">
            <div className="p-2 border-b border-gray-300">
            <p className="text-sm text-gray-700">
            {user ? `${user.email}` : "Welcome"}                
            </p>
            </div>
            <button
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-300"
              onClick={handleLogout}
            >
              Logout
              </button>
            </div>
          )}
        </div>
      </header>
      <div className="flex justify-end px-8 mt-10 mr-10">
        <button
          className="bg-green-500 hover:bg-green-600 text-lg text-white px-4 py-2 rounded-lg flex items-center mb-2 "
          onClick={() => setShowModal(true)} 
        >
          <BiSolidBook className="mr-2" />
          Add Book
        </button>
      </div>
      <div className="overflow-x-auto shadow-md sm:rounded-lg mx-16 mt-4">
        <table className="w-full table-auto text-sm text-center text-gray-500 dark:text-gray-400">
          <thead className="text-lg bg-gray-300 border border-gray-500 text-gray-600 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className=""> 
                Section
              </th>
              <th scope="col" className="px-4 py-3"> 
                Title
              </th>
              <th scope="col" className="px-4 py-3"> 
                Genre
              </th>
              <th scope="col" className=""> 
                Date
              </th>
              <th scope="col" className=""> 
              </th>
            </tr>
          </thead>
          <tbody className="bg-white text-base text-center">
            {books.map((book) => (
              <tr key={book.id}>
                <td className="px-6 py-4 hover:bg-sky-200">{book.section}</td>
                <td className="px-6 py-4 hover:bg-sky-200">{book.title}</td>
                <td className="px-6 py-4 hover:bg-sky-200">{book.genre}</td>
                <td className="hover:bg-sky-200">{book.date}</td>
                <td>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 text-2xl rounded-lg mr-3"
                    onClick={() => handleReportBook(book.id)} 
                  >
                    <TbMessageReport />
                  </button>
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 text-2xl rounded-lg mr-3"
                    onClick={() => handleEditBook(book.id)}
                  >
                   <HiMiniPencilSquare />
                  </button>
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 text-2xl rounded-lg"
                    onClick={() => deleteBook(book.id)}
                  >
                    <FiCheck />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
          <div className="bg-white rounded-lg p-8 w-96">
            <h2 className="text-2xl font-semibold mb-4">Add Book</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                const section = formData.get('section') as string;
                const title = formData.get('title') as string;
                const genre = formData.get('genre') as string;
                const date = formData.get('date') as string;
                handleSubmit({ section, title, genre, date });
              }}
            >
              <div className="mb-6">
                <label htmlFor="section" className="block text-sm font-medium text-gray-700">
                  Section
                </label>
                <input 
                  type="text"
                  id="section"
                  name="section"
                  className="mt-1 block w-full border border-gray-400 rounded-md shadow-sm focus:ring-sky-800 sm:text-sm h-10 focus:ring focus:ring-sky-300 focus:ring-opacity-75 focus:outline-none"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="mt-1 block w-full border border-gray-400 rounded-md shadow-sm focus:ring-sky-800 focus:border-sky-300 sm:text-sm h-10 focus:ring focus:ring-sky-300 focus:ring-opacity-75 focus:outline-none"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="genre" className="block text-sm font-medium text-gray-700">
                  Genre
                </label>
                <input
                  type="text"
                  id="genre"
                  name="genre"
                  className="mt-1 block w-full border border-gray-400 rounded-md shadow-sm focus:ring-sky-800 focus:border-sky-300 sm:text-sm h-10 focus:ring focus:ring-sky-300 focus:ring-opacity-75 focus:outline-none"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  className="mt-1 block w-full border border-gray-400 rounded-md shadow-sm focus:ring-sky-800 focus:border-sky-300 sm:text-sm h-10 focus:ring focus:ring-sky-300 focus:ring-opacity-75 focus:outline-none"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg mr-4"
                >
                  Save
                </button>
                <button
                  type="button"
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
