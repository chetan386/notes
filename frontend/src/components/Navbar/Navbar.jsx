import * as React from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Textarea from '@mui/joy/Textarea';
import Stack from '@mui/joy/Stack';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createNote } from '../../redux/noteSlice';





function Navbar() {
    const [open, setOpen] = React.useState(false);
    const [title,setTitle] = useState("")
    const [content,setContent] = useState("")
    const [category,setCategory] = useState("")
    const dispatch = useDispatch()
    
    const handleSubmit=()=>{
        const obj = {
            title: title,
            content: content,
            category: category,
        }
        dispatch(createNote(obj))
    }
    
  return (
    <div style={{margin:"2rem"}}>
      <h1 style={{textAlign:"center",fontFamily:"sans-serif"}}>Notes.....</h1>
      <Button variant="outlined" onClick={() => setOpen(true)}>Add a note</Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <DialogTitle>Create new note</DialogTitle>
          <DialogContent>Fill in the information of the note.</DialogContent>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setOpen(false);
            }}
          >
            <Stack spacing={2} >
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input autoFocus required onChange={(e)=>{setTitle(e.target.value)}} />
              </FormControl>
              <FormControl>
                <FormLabel>Category</FormLabel>
                <Input autoFocus required onChange={(e)=>{setCategory(e.target.value)}} />
              </FormControl>
              <FormControl>
                <FormLabel>Content</FormLabel>
                <Textarea maxRows={10} onChange={(e)=>{setContent(e.target.value)}} required />
              </FormControl>
              <Button type="submit" onClick = {()=>{handleSubmit(title,content,category)}}>Submit</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </div>
  )
}

export default Navbar
