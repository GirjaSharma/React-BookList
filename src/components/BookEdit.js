import { useState } from "react";
import useBooksContext from "../hooks/useBooksContext";

function BookEdit({book, onSubmit}) {
  const {editBookById}= useBooksContext();
const [title, setTitle] = useState(book.title);


const handleChange =(e)=>{
setTitle(e.target.value)
}

const handleSubmit=(e)=>{
  e.preventDefault()
  onSubmit();
  editBookById(book.id, title);
}

  return (
  <form className="book-edit" onSubmit={handleSubmit}>
<label>title</label>
<input className="input" value={title} onChange={handleChange}/>
<button className="button is-primary" >Save</button>
  </form>
    );
}

export default BookEdit;
