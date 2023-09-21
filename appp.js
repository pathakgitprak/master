
const express = require('express');
const sequelize=require('./config/db')
const bodyParser = require('body-parser');
const Task = require('./models/model');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Routes
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.findAll();
   
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/tasks', async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.put('/tasks/:id', async (req, res) => {

  const empId = req.params.id;

  try {

    const [updated] = await Task.update(req.body, {

      where: { id: empId },

    });

    if (updated) {

      const updatedemp = await Task.findOne({ where: { id: empId } });

      return res.json(updatedemp);

    }

    throw new Error('employee not found');

  } catch (error) {

    return res.status(500).json({ error: 'Something went wrong!' });

  }

});

 

 

app.delete('/tasks/:id', async (req, res) => {

  const empid = req.params.id;

  try {

    const deleted = await Task.destroy({

      where: { id: empid },

    });

    if (deleted) {

      return res.json({ message: 'Product deleted' });

    }

    throw new Error('Product not found');

  } catch (error) {

    return res.status(500).json({ error: 'Something went wrong!' });

  }

});

// Additional CRUD routes (PUT, DELETE) can be added here

// Start the server
sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });
