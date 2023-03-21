import { createContext, useCallback, useState } from "react";
import axios from "axios";
const BookContext = createContext();

function Provider({children}){
    const [books, setBooks] = useState([]);

    const fetchBooks= useCallback (async ()=>{
        const response = await axios.get('http://localhost:3001/books');
    
        setBooks(response.data)
      }, []);


      const createBook = async (title)=>{

        const response = await axios.post('http://localhost:3001/books', {
          title
        })
        const updatedBooks = [
          ...books, response.data
        ]
        setBooks(updatedBooks)
        
        console.log(response, 'response')
      }
    
      const deleteBookById =async(id)=>{
        await axios.delete(`http://localhost:3001/books/${id}`);
        const updatedBooks = books.filter((book) =>{
          return book.id !== id
        })
        setBooks(updatedBooks)
      }
      
      const editBookById =async(id, newTitle) => {
        const response = await axios.put(`http://localhost:3001/books/${id}`, {
          title: newTitle
        })
    
        const updatedbooks = books.map((book) =>{
        if(book.id === id) {
          return {...book, ...response.data}
        }
        return book;
      })
      setBooks(updatedbooks)
      }
    
    const valueToShare = {
        books, 
        deleteBookById, 
        editBookById, 
        createBook, 
        fetchBooks
    }

    return (<BookContext.Provider value={valueToShare}>{children}</BookContext.Provider>)
}

export {Provider};
export default BookContext;