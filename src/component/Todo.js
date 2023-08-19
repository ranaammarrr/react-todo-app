import React, { useEffect, useState } from 'react'
import  { Container, Row, Col, Form, Button, ListGroup, ListGroupItem} from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import 'bootstrap/dist/css/bootstrap.min.css';



const Todo = () => {

  const getLocalItems = ()=> {
      let list = localStorage.getItem('storedItems');
      if (list) {
        return JSON.parse(localStorage.getItem('storedItems'));
      }
      else{
        return [];
      }
  }


  const [input, setInput] = useState('');
  const [items, setItems] = useState(getLocalItems());
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [isEditItem, setIsEditItem] = useState(null);

  const addItems = (e)=>{
    e.preventDefault();
    if (!input) {
      return;
    }
     
    // To check if todo is already present
    const isTodoPresent = items.some((item) => item.name === input);
    if (isTodoPresent) {
      alert('Todo already exist!');
      return;
    }
    

      if(!input){
        
      }else if(input && !toggleSubmit){
        setItems(
          items.map((elem)=>{
            if(elem.id === isEditItem ){
              return {...elem, name: input}
            }
            return elem;
          })
          )
          setToggleSubmit(true);
          setInput('');
          setIsEditItem(null); 
        }
        else{
          const allInput = {id: new Date().getTime().toString(), name: input}
          setItems([...items, allInput]);
          setInput('')
        }
      }
      
      
const deleteItem = (index)=>{
  const updatedItems = items.filter((elem)=>{
    return index !== elem.id;
  })
  setItems(updatedItems);

}

const editItem = (id)=>{

  

  const newEditItem = items.find((elem)=> {
    return elem.id === id;
  })
  setToggleSubmit(false);
  setInput(newEditItem.name);
  setIsEditItem(id);
}

useEffect(()=>{
  localStorage.setItem('storedItems', JSON.stringify(items))
}, [items]);

  return (
    <div>

    <div>
        <Container className=''>

                <h2 className='text-center my-5'>Todo App</h2>
        <Row className='justify-content-center'>
           
            <Col md={7}>
              
            <Form onSubmit={addItems}>
            <Form.Group className="d-flex justify-content-center align-items-center mb-4" >        
              <Form.Control   type="text" placeholder="Add a new todo" value={input} onChange={(e)=>setInput(e.target.value)}/>
              {
                toggleSubmit ? <Button  className='noBorder ms-2 px-3' variant="dark" type='submit' onClick={addItems} >Add</Button> : <Button  className='noBorder ms-2 px-3' variant="dark" type='submit' onClick={addItems} >Edit</Button>
              }
              
            </Form.Group>
              <ListGroup className='mt-3'>
                {items.map((elem) =>{

                 return( 
                 <ListGroupItem key={elem.id}><p>{elem.name}
                 <FontAwesomeIcon className='position-absolute top-1 end-0 me-5 ' role='button' onClick={()=>{editItem(elem.id)}} icon={faPenToSquare} style={{color: "#121212",}}  />
                 <FontAwesomeIcon className='position-absolute top-1 end-0 me-2 ' role='button' onClick={()=> deleteItem(elem.id)} icon={faXmark} style={{color: "#121212",}} /></p> 
                 </ListGroupItem>   
                 );
                  
                } )}
              </ListGroup>
            </Form>
                
            </Col>
        </Row>
        </Container>
    </div>
    </div>
  )
}

export default Todo