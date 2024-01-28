import React, { useEffect } from 'react'
import {useSelector,useDispatch} from "react-redux"
import { deleteNote, getNotes, updatedNote } from '../../redux/noteSlice'
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
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
import Loader from '../Loader/Loader';
import { Chip } from '@mui/material';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import Divider from '@mui/joy/Divider';
import DialogActions from '@mui/joy/DialogActions';
import "./Home.css"


function Home() {
  const {notes,status} = useSelector(state=>state.note)
  const dispatch = useDispatch()
  const [open, setOpen] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
    const [title,setTitle] = useState()
    const [content,setContent] = useState()
    const [category,setCategory] = useState()
    const [id,setId] = useState()
    const [prev,setPrev] = useState({})

   

  const deleteFun = (id) =>{
    setId(id);
    setOpenDelete(true)
  }

  const handleDelete = () =>{
    dispatch(deleteNote(id))
    setOpenDelete(false);
  }
  
  const handleUpdate = (id,note) =>{
    setId(id)
    setPrev(note)
    setOpen(true)
  }

  const handleSubmit =(title,content,category) =>{
     const obj = {
      id: id,
      title: title || prev.title,
      content: content || prev.content,
      category:category || prev.category
     }
     dispatch(updatedNote(obj))
  }

  useEffect(()=>{
     dispatch(getNotes())
  },[])
  
  if (status === 'pending') {
    return  <div  style={{height:"50vh",width:"100%", display:"flex",justifyContent:"center",alignItems:"center"}}>
      <Loader />
    </div>
  }

  if (status === 'rejected') {
    return <h1>Failed to get Notes! Try again later.</h1>;
  }
  
  return (
    <div style={{}}>
       <Box  sx={{ minWidth: 275 }} style={{display:"flex" , flexWrap: "wrap"}}>
  {notes && notes.data && notes.data.notes && notes.data.notes.map((note,id)=>{
     return  <Card key={id} style={{width:"20rem",height:"20rem",margin:"1.2rem",display:"flex",justifyContent:"space-between",flexDirection:"column"}} variant="outlined">
      <React.Fragment>
    <CardContent>
      <Typography variant="h5" component="div">
        {note.title}
      </Typography>
      <Chip sx={{ mb: 1.5, mt:1.5 }} label={note.category} />
      <Typography variant="body2" style={{wordBreak:"break-word"}}>
        {note.content}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small" onClick={() => deleteFun(note._id)}>Delete</Button>
      <Button size="small" onClick={()=>{handleUpdate(note._id,note)}}>Edit</Button>
    </CardActions>
  </React.Fragment>
  </Card>


  }) 
}

 </Box>
 <Modal open={open}  onClose={() => setOpen(false)}>
        <ModalDialog>
          <DialogTitle>Create new note</DialogTitle>
          <DialogContent>Fill in the information of the note.</DialogContent>
          <form
            onSubmit={(e) => {
              e.preventDefault(); // Prevent the default form submission behavior
              setOpen(false); // Close the modal
              handleSubmit(title, content, category); 
            }}
          >
            <Stack spacing={2} >
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input defaultValue={prev.title} onChange={(e)=>{setTitle(e.target.value)}} autoFocus required  />
              </FormControl>
              <FormControl>
                <FormLabel>Category</FormLabel>
                <Input defaultValue={prev.category} onChange={(e)=>{setCategory(e.target.value)}}  autoFocus required />
              </FormControl>
              <FormControl>
                <FormLabel>Content</FormLabel>
                <Textarea  maxRows={10} defaultValue={prev.content} onChange={(e)=>{setContent(e.target.value)}} required />
              </FormControl>
              <Button type="submit">Submit</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>

      <Modal open={openDelete} onClose={() => setOpenDelete(false)}>
        <ModalDialog variant="outlined" role="alertdialog">
          <DialogTitle>
            <WarningRoundedIcon />
            Confirmation
          </DialogTitle>
          <Divider />
          <DialogContent>
            Are you sure you want to discard all of your notes?
          </DialogContent>
          <DialogActions>   
            <Button className='danger' variant="solid"onClick={() => handleDelete()}>
              Discard notes
            </Button>
            <Button variant="plain" color="neutral" onClick={() => setOpenDelete(false)}>
              Cancel
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>

</div>
  )
}

export default Home
