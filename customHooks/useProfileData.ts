import { useState, useEffect } from 'react';
import { getCookie } from 'cookies-next';

const useProfileData = () => {
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      setLoading(true);
      setError(null);

      try {
        const authToken = getCookie('authToken');
        if (!authToken) {
          setError('Authentication token not found.');
          return;
        }

        const response = await fetch('https://eservice.vemate.com/api/v1/account/public/users/profile/', {
          headers: {
            'Authorization': `Token ${authToken}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }

        const data = await response.json();
        setProfileData(data);
      } catch (err:any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  return { profileData, loading, error };
};

export default useProfileData;
