import DashboardLayout from '../../components/Dashboard/DashboardLayout';

const EducationalResources = () => {
  const courses = [
    { title: 'Budgeting Basics', link: '#' },
    { title: 'Investing 101', link: '#' },
    { title: 'Managing Credit', link: '#' },
  ];

  const workshops = [
    { title: 'How to Build Credit', link: '#' },
    { title: 'Navigating Life After College', link: '#' },
  ];

  const faqs = [
    { question: 'What is a budget?', answer: 'A budget is a plan that helps you manage your money.' },
    { question: 'How can I start saving?', answer: 'Start by setting a savings goal and creating a plan to reach it.' },
  ];

  return (
    <DashboardLayout>
      <div className="educational-resources-section">
        <h3>Educational Resources</h3>

        {/* Financial Literacy Courses */}
        <div className="resource-section">
          <h4>Financial Literacy Courses</h4>
          <ul>
            {courses.map((course, index) => (
              <li key={index}>
                <a href={course.link}>{course.title}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Workshops & Webinars */}
        <div className="resource-section">
          <h4>Workshops & Webinars</h4>
          <ul>
            {workshops.map((workshop, index) => (
              <li key={index}>
                <a href={workshop.link}>{workshop.title}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* FAQs */}
        <div className="resource-section">
          <h4>Frequently Asked Questions (FAQs)</h4>
          <ul>
            {faqs.map((faq, index) => (
              <li key={index}>
                <strong>{faq.question}</strong>: {faq.answer}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <style jsx>{`
        .educational-resources-section {
          padding: 20px;
          padding-left: 240px; /* Padding from the sidebar */
        }

        h3 {
          font-size: 28px;
          font-weight: 600;
          color: #333;
          margin-bottom: 30px;
          font-family: 'sans-serif';
        }

        .resource-section {
          padding: 20px;
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          margin-bottom: 20px;
        }

        h4 {
          font-size: 22px;
          font-weight: 500;
          margin-bottom: 15px;
          color: #2c3e50;
          font-family: 'sans-serif';
        }

        ul {
          list-style-type: none;
          padding: 0;
        }

        li {
          margin: 5px 0;
          font-family: 'sans-serif';
        }

        a {
          color: royalblue;
          text-decoration: underline;
        }

        a:hover {
          text-decoration: none;
        }
      `}</style>
    </DashboardLayout>
  );
};

export default EducationalResources;
