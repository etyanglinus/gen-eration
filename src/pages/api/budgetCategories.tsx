import express from 'express';
const router = express.Router();

let budgetCategories = [
  { id: 1, name: 'Housing', planned: 20000, actual: 19000 },
  { id: 2, name: 'Food', planned: 10000, actual: 12000 },
  { id: 3, name: 'Entertainment', planned: 5000, actual: 4000 },
  { id: 4, name: 'Transportation', planned: 3000, actual: 3200 },
];

// GET: Fetch all budget categories
router.get('/', (req, res) => {
  res.json(budgetCategories);
});

// POST: Add a new budget category
router.post('/', (req, res) => {
  const { name, planned, actual } = req.body;
  const newCategory = {
    id: budgetCategories.length + 1,
    name,
    planned,
    actual,
  };
  budgetCategories.push(newCategory);
  res.status(201).json(newCategory);
});

// DELETE: Remove a budget category
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  budgetCategories = budgetCategories.filter((category) => category.id !== parseInt(id));
  res.status(204).send();
});

export default router;
