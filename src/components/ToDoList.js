import { useState } from 'react';
import { List, TextField, Typography, Box, Button, ListItem, ListItemText, FormControlLabel, Checkbox } from '@mui/material';

function ToDoList() {
    const [tasks, setTasks] = useState([]);
    const [newTodo, setNewTodo] = useState('');
    const [filter, setFilter] = useState('All');

    const filteredTasks = tasks.filter((task) => {
        if (filter === 'Active') {
            return !task.isCompleted;
        } else if (filter === 'Completed') {
            return task.isCompleted;
        }
        return true; // Tüm listeyi döndürür...
    });

    const handleFilter = (selectedFilter) => {
        setFilter(selectedFilter);
    };

    const handleAddTodo = () => {
        if (newTodo === '') {
            alert('Please fill in the task field...');
        } else {
            setTasks([...tasks, { text: newTodo, isCompleted: false }]);
            setNewTodo('');
        }
    };

    const handleToggleComplete = (index) => {
        const updatedTasks = [...tasks];
        updatedTasks[index].isCompleted = !updatedTasks[index].isCompleted;
        setTasks(updatedTasks);
    };

    const handleDeleteCompleted = () => {
        const dones = tasks.filter((task) => !task.isCompleted);
        setTasks(dones)
    }

    return (
        <Box>
            <Box display={'flex'} alignItems={'center'} flexDirection={'column'}>
                <TextField
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder='Add a new todo'
                    margin='dense'
                />
                <Button onClick={handleAddTodo}>Add</Button>
            </Box>
            <List sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                {filteredTasks.map((todo, index) => (
                    <ListItem key={index}>
                        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                            <FormControlLabel
                                value={todo.isCompleted}
                                control={<Checkbox checked={todo.isCompleted} onChange={() => handleToggleComplete(index)} />}
                            />
                            <ListItemText sx={{
                                ...(todo.isCompleted ? { color: 'gray', textDecorationLine: 'line-through', marginTop: '8px', textAlign: 'left' } : { color: 'black', marginTop: '10px', textAlign: 'left' })
                            }}>{todo.text}</ListItemText>
                        </Box>
                    </ListItem>
                ))}
            </List>
            <br />
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <Typography variant='body1' textAlign={'center'}>{filteredTasks.filter(task => !task.isCompleted).length} items left</Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Typography variant='body1' sx={{ marginRight: '20px' }} onClick={() => handleFilter('All')}>All</Typography>
                    <Typography variant='body1' sx={{ marginRight: '20px' }} onClick={() => handleFilter('Active')}>Active</Typography>
                    <Typography variant='body1' onClick={() => handleFilter('Completed')}>Completed</Typography>
                </Box>
                <Box>
                    <Typography variant='body1' onClick={handleDeleteCompleted}>Clear Completed</Typography>
                </Box>
            </Box>
        </Box>
    );
}

export default ToDoList;
