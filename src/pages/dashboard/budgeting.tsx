import 'chart.js/auto';
import { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';

const BudgetPlanner = () => {
  const [budgetCategories, setBudgetCategories] = useState([
    { id: 1, name: 'Housing', planned: 20000, actual: 19000 },
    { id: 2, name: 'Food', planned: 10000, actual: 12000 },
    { id: 3, name: 'Entertainment', planned: 5000, actual: 4000 },
    { id: 4, name: 'Transportation', planned: 3000, actual: 3200 },
  ]);

  const [newCategory, setNewCategory] = useState({ name: '', planned: '', actual: '' });

  // Add new category
  const addCategory = () => {
    if (newCategory.name && newCategory.planned && newCategory.actual) {
      setBudgetCategories([
        ...budgetCategories,
        {
          id: budgetCategories.length + 1,
          name: newCategory.name,
          planned: parseInt(newCategory.planned),
          actual: parseInt(newCategory.actual),
        },
      ]);
      setNewCategory({ name: '', planned: '', actual: '' }); // Clear form after submission
    }
  };

  // Delete category
  const deleteCategory = (id: number) => {
    setBudgetCategories(budgetCategories.filter((category) => category.id !== id));
  };

  // Spending data for the pie chart
  const spendingData = {
    labels: budgetCategories.map((category) => category.name),
    datasets: [
      {
        label: 'Actual Spending',
        data: budgetCategories.map((category) => category.actual),
        backgroundColor: ['#ff6384', '#36a2eb', '#ffcd56', '#4bc0c0'],
      },
    ],
  };

  return (
    <DashboardLayout>
      <div className="budget-planner-container">
        <h3>Budget Planner</h3>

        {/* Add new category */}
        <div className="add-category-form">
          <input
            type="text"
            placeholder="Category Name"
            value={newCategory.name}
            onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
          />
          <input
            type="number"
            placeholder="Planned Amount"
            value={newCategory.planned}
            onChange={(e) => setNewCategory({ ...newCategory, planned: e.target.value })}
          />
          <input
            type="number"
            placeholder="Actual Amount"
            value={newCategory.actual}
            onChange={(e) => setNewCategory({ ...newCategory, actual: e.target.value })}
          />
          <button onClick={addCategory}>Add Category</button>
        </div>

        {/* Display budget categories */}
        <div className="budget-categories">
          {budgetCategories.map((category) => (
            <div className="category-card" key={category.id}>
              <h4>{category.name}</h4>
              <p>Planned: Ksh {category.planned}</p>
              <p>Actual: Ksh {category.actual}</p>
              <div className="budget-vs-actual">
                <div
                  className="progress-bar planned"
                  style={{ width: `${(category.planned / 20000) * 100}%` }}
                ></div>
                <div
                  className="progress-bar actual"
                  style={{ width: `${(category.actual / 20000) * 100}%`, backgroundColor: 'orange' }}
                ></div>
              </div>
              <button onClick={() => deleteCategory(category.id)}>Delete</button>
            </div>
          ))}
        </div>

        {/* Spending insights (Pie Chart) */}
        <div className="spending-insights">
          <h4>Spending Insights</h4>
          <div className="chart-container">
            <Pie data={spendingData} />
          </div>
        </div>
      </div>

      {/* Inline styling */}
      <style jsx>{`
        * {
          font-family: 'Poppins', sans-serif;
        }

        h3 {
          color: black;
          font-size: 24px;
          margin-bottom: 20px;
        }

        .budget-planner-container {
          padding: 20px;
          padding-left: calc(250px + 20px); /* Adjust padding from the sidebar width (250px assumed) */
          background-color: #f9f9f9;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .add-category-form {
          margin-bottom: 20px;
          display: flex;
          gap: 10px;
        }

        .add-category-form input {
          padding: 10px;
          font-size: 14px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        .add-category-form button {
          padding: 10px;
          background-color: royalblue;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .budget-categories {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }

        .category-card {
          padding: 20px;
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          color: black;
        }

        .budget-vs-actual {
          display: flex;
          margin-top: 10px;
          gap: 5px;
        }

        .progress-bar {
          height: 15px;
          border-radius: 7px;
          background-color: royalblue;
        }

        .spending-insights {
          margin-top: 30px;
          padding: 20px;
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .spending-insights h4 {
          margin-bottom: 20px;
          color: black;
        }

        .chart-container {
          width: 300px;
          height: 300px;
        }
      `}</style>
    </DashboardLayout>
  );
};

export default BudgetPlanner;
