import { useEffect, useState } from 'react';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';

// Define the type for the settings
interface Setting {
  id: number;
  name: string;
  description: string;
  link: string;
}

const Settings = () => {
  // Use the Setting[] type for the useState hook
  const [settings, setSettings] = useState<Setting[]>([]);
  const [loading, setLoading] = useState(true);

  // Simulate fetching settings from an API
  const fetchSettings = async () => {
    // Sample data simulating an API response
    const sampleSettings: Setting[] = [
      {
        id: 1,
        name: 'Account Settings',
        description: 'Manage your account settings, including username and email.',
        link: 'https://example.com/settings/account',
      },
      {
        id: 2,
        name: 'Notification Preferences',
        description: 'Set your preferences for receiving notifications.',
        link: 'https://example.com/settings/notifications',
      },
      {
        id: 3,
        name: 'Privacy Settings',
        description: 'Manage your privacy settings and control data sharing.',
        link: 'https://example.com/settings/privacy',
      },
    ];

    // Simulate network delay
    setTimeout(() => {
      setSettings(sampleSettings);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  if (loading) {
    return <p>Loading settings...</p>;
  }

  return (
    <DashboardLayout>
      <div className="settings-section">
        <h3>Settings</h3>

        {/* Settings List Section */}
        <div className="tool-section settings-list">
          {settings.map((setting) => (
            <div className="setting-card" key={setting.id}>
              <h4>{setting.name}</h4>
              <p>{setting.description}</p>
              <a href={setting.link} target="_blank" rel="noopener noreferrer">
                Go to Settings
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Styling */}
      <style jsx>{`
        .settings-section {
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

        .setting-card {
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

export default Settings;
