import { useEffect, useState } from 'react';
import { Campaign } from '../types/DBTypes';
import { getAllCampaigns } from '../services/campaignService';

const useCampaigns = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const data = await getAllCampaigns();
        setCampaigns(data);
      } catch (error) {
        setError('Failed to fetch campaigns');
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  return { campaigns, loading, error, getAllCampaigns };
};
export default useCampaigns;
