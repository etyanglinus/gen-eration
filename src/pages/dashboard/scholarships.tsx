import { useEffect, useState } from 'react';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';

// Define the type for each scholarship object
interface Scholarship {
  id: number;
  name: string;
  description: string;
  link: string;
}

const Scholarships = () => {
  // Use the correct type for scholarships state
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [loading, setLoading] = useState(true);

  // Simulate fetching scholarships from an API based on user profile
  const fetchScholarships = async () => {
    // Sample data simulating an API response
    const sampleScholarships: Scholarship[] = [
      {
        id: 1,
        name: 'Academic Excellence Scholarship',
        description: 'For students with a GPA of 3.5 and above.',
        link: 'https://example.com/apply/academic-excellence',
      },
      {
        id: 2,
        name: 'Community Service Grant',
        description: 'For students engaged in community service activities.',
        link: 'https://example.com/apply/community-service',
      },
      {
        id: 3,
        name: 'STEM Scholarship',
        description: 'For students majoring in Science, Technology, Engineering, or Mathematics.',
        link: 'https://example.com/apply/stem',
      },
    ];

    // Simulate network delay
    setTimeout(() => {
      setScholarships(sampleScholarships);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    fetchScholarships();
  }, []);

  if (loading) {
    return <p>Loading scholarships...</p>;
  }

  return (
    <DashboardLayout>
      <div className="scholarships-section">
        <h3>Scholarship & Grant Alerts</h3>

        {/* Scholarships List Section */}
        <div className="tool-section scholarships-list">
          {scholarships.map((scholarship) => (
            <div className="scholarship-card" key={scholarship.id}>
              <h4>{scholarship.name}</h4>
              <p>{scholarship.description}</p>
              <a href={scholarship.link} target="_blank" rel="noopener noreferrer">
                Apply Now
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Styling */}
      <style jsx>{`
        .scholarships-section {
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

        .tool-section {
          background-color: #fff;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          margin-bottom: 30px;
          margin-left: 20px; /* Added padding to create space from left side */
        }

        .scholarship-card {
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

        p {
          font-size: 16px;
          color: #555;
          margin-bottom: 10px;
          font-family: 'sans-serif';
        }

        a {
          display: inline-block;
          margin-top: 10px;
          padding: 10px 15px;
          background-color: royalblue;
          color: white;
          border-radius: 5px;
          text-decoration: none;
        }

        a:hover {
          background-color: darkblue;
        }
      `}</style>
    </DashboardLayout>
  );
};

export default Scholarships;
