import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// Mock database
const items = [
  {
    id: 'John',
    name: 'Doe',
    email: 'johndoe@example.com',
  },
  {
    first_name: 'Alice',
    last_name: 'Smith',
    email: 'alicesmith@example.com',
  },
];

// Getting the list of items from the mock database
router.get('/', (req, res) => {
    res.send(items);
})

//post
router.post('/', (req, res) => {
    const user = req.body;

    items.push({ ...user, id: uuidv4() });

    res.send(`${user.first_name} has been added to the Database`);
})

//delete
router.delete('/:id', (req, res) => {
    const { id } = req.params;
  
    items = items.filter((user) => user.id !== id)
  
    res.send(`${id} deleted successfully from database`);
  });


export default router