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
import { useDispatch, useSelector } from 'react-redux';
import { createNote, getNotes } from '../../redux/noteSlice';
import SearchBar from "material-ui-search-bar";
import "./Navbar.css"
import { Alert, InputLabel, MenuItem, Select, Snackbar } from '@mui/material';
import { logOut } from '../../redux/userSlice';
import { useNavigate } from 'react-router-dom';







function Navbar() {
    const [open, setOpen] = React.useState(false);
    const [title,setTitle] = useState("")
    const [content,setContent] = useState("")
    const [category,setCategory] = useState("")
    const dispatch = useDispatch()
    const [search,setSearch] = useState("")
    const {notes,render} = useSelector(state => state.note)
    const [sort,setSort] = useState("asc")
    const {status} = useSelector(state => state.user)
   const history = useNavigate()
    const [filter, setFilter] = React.useState("All");
    const [openSnack, setOpenSnack] = React.useState(false);

    const handleClick = ()=>{
      setOpenSnack(true);
    }

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpenSnack(false);
    };
  

   
    
    const handleChange = (e) => {
     setFilter(e.target.value)
    };
    const handleChangeSort = (e) => {
     setSort(e.target.value)
    };


    const handleSubmit=(title,content,category)=>{
        
      if(title && content && category) {
        const obj = {
            title: title,
            content: content,
            category: category,
        }
        dispatch(createNote(obj))
        handleClick()

    }}
    
    const handleHeading = () =>{
      window.location.reload();
    }
    const close = () =>{
      window.location.reload();
    }

    const handleLogout = () =>{
      dispatch(logOut())
    }

    const obj1 = {
      search: search,
      filter:filter,
      sort:sort
    }


    let mapping = []
    const initialArrayRef = React.useRef(null);

    if ((initialArrayRef.current === null && notes && notes.data && notes.data.notes )) {
      initialArrayRef.current = notes;
    }
    if(render === false){
      initialArrayRef.current = notes;
    }
    

    if( (initialArrayRef.current && initialArrayRef.current.data && initialArrayRef.current.data.notes) ){
       mapping = Array.from(new Set(initialArrayRef.current.data.notes.map((note) => note.category)))
    }



    
    React.useEffect(()=>{

        dispatch(getNotes(obj1))
        if(status === "logout"){
          history("/")
        }
    },[search,filter,sort,status])

  

    


  return (
    <div style={{margin:"2rem"}}>
      <h1 onClick={handleHeading} style={{textAlign:"center",fontFamily:"sans-serif",marginBottom:"2rem"}}>Notes.....</h1>
      <div style={{width: "100%",display: "flex",justifyContent: "flex-end"}}>
      <Button style={{marginRight: "37px"}} onClick={handleLogout}>Logout</Button>
      </div>
      <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap"}}>
      <Button style={{width: "12rem",height:"3rem",margin:"2rem",textAlign:"center"}} variant="outlined" onClick={() => setOpen(true)}>Add a note</Button>
      <div style={{display:"flex",flexWrap:"wrap"}}>
      <FormControl >
  <InputLabel id="demo-simple-select-label">Categories</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={sort}
    label="Age"
    onChange={handleChangeSort}
    style={{width:"10rem",height:"3rem"}}
  >

    <MenuItem value ="asc" >Asc</MenuItem>
    <MenuItem value="desc" >Desc</MenuItem>
  </Select>
</FormControl>
      <FormControl  variant="filled" >
  <InputLabel  id="demo-simple-select-label" shrink>Filter</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={filter}
    onChange={handleChange}
    style={{width:"10rem",height:"3rem"}}
  >
    {/* {notes && notes.data && notes.data.notes && notes.data.notes?.map((note,id)=>{
        return <MenuItem key={id} value={note.category}>{note.category}</MenuItem>
    })} */}
    <MenuItem value="All">All</MenuItem>
{mapping.map((note,id)=>{
     return <MenuItem key={id} value={note}>{note}</MenuItem>
})
}

  </Select>
</FormControl>
      <SearchBar onCancelSearch={close} className='search'  onChange={(newValue) => setSearch(newValue)} style={{width:"18rem",margin:"2rem"}}/>
      </div>
      </div>


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

      <Snackbar open={openSnack} autoHideDuration={1000} onClose={handleClose}>
  <Alert
    onClose={handleClose}
    severity="success"
    variant="filled"
    sx={{ width: '100%' }}
  >
  
    Note created successfully!
  </Alert>
</Snackbar>

</div>
  
  )
}

export default Navbar
