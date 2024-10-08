import DashboardLayout from '../../components/Dashboard/DashboardLayout';

const CommunitySupport = () => {
  const savingsGroups = [
    { name: 'Graduation Trip Fund', description: 'Join to save collectively for an unforgettable graduation trip!' },
    { name: 'Emergency Fund Pool', description: 'Contribute to a shared fund to help members in need.' },
    { name: 'First Job Outfits', description: 'Save together for essential work attire for your first job.' },
  ];

  const discussionTopics = [
    { title: 'Budgeting Tips', description: 'Share your best strategies for budgeting as a student.' },
    { title: 'Saving for Emergencies', description: 'Discuss how to build an emergency fund effectively.' },
    { title: 'Investing Basics', description: 'Ask questions and share resources on getting started with investing.' },
  ];

  return (
    <DashboardLayout>
      <h3>Community & Peer Support</h3>

      <div className="section">
        <h4>Savings Groups</h4>
        <ul>
          {savingsGroups.map((group, index) => (
            <li key={index}>
              <strong>{group.name}</strong>: {group.description}
            </li>
          ))}
        </ul>
      </div>

      <div className="section">
        <h4>Discussion Forums</h4>
        <ul>
          {discussionTopics.map((topic, index) => (
            <li key={index}>
              <strong>{topic.title}</strong>: {topic.description}
            </li>
          ))}
        </ul>
      </div>

      <style jsx>{`
        .section {
          margin-top: 20px;
          padding: 20px;
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        h4 {
          margin-bottom: 10px;
        }

        ul {
          list-style-type: none;
          padding: 0;
        }

        li {
          margin: 5px 0;
        }
      `}</style>
    </DashboardLayout>
  );
};

export default CommunitySupport;
