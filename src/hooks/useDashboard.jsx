import { useEffect } from "react";
import { useState } from "react";
import axiosClient from "../utilities/AxiosClient";

export default function useDashboard() {
  const [highestScoreGames, setHighestScoreGames] = useState([]);
  const [latestReviews, setLatestReviews] = useState([]);
  const [topUsers, setTopUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sendingRequest, setSendingRequest] = useState(false);

  const getData = async () => {
    if (sendingRequest) return;
    try {
      setSendingRequest(true);
      setLoading(true);
      const response = await axiosClient("/api/dashboard");
      setHighestScoreGames(response.data.games);
      setLatestReviews(response.data.latestReviews);
      setTopUsers(response.data.topUsers);
      setSendingRequest(false);
      // setTimeout(() => {
      //   setLoading(false);
      // }, 2000);
      setLoading(false);
    } catch (error) {
      setSendingRequest(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return { highestScoreGames, latestReviews, topUsers, loading };
}
