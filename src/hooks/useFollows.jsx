import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../utilities/AxiosClient";
import { useNavigate } from "react-router-dom";

export default function useFollows(type = "followers") {
  const [loading, setLoading] = useState(true);
  const [sendingRequest, setSendingRequest] = useState(false);
  const [user, setUser] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [followedUsers, setFollowedUsers] = useState([]);
  const [followedGames, setFollowedGames] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();

  const getData = async () => {
    if (sendingRequest) return;
    let url = "/api";
    if (type === "followers") {
      url += `/users/${id}/followers`;
    }
    if (type === "followed") {
      url += `/users/${id}/followed`;
    }
    try {
      setSendingRequest(true);
      setLoading(true);
      const response = await axiosClient(url);

      //Almacenar resultados
      setUser(response.data.user);
      if (type === "followers") {
        setFollowers(response.data.users);
      }
      if (type === "followed") {
        setFollowedGames(response.data.games);
        setFollowedUsers(response.data.users);
      }

      setSendingRequest(false);
      setLoading(false);
    } catch (error) {
      if (error.status === 404) {
        navigate("/");
      }
      setSendingRequest(false);
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

  return {
    loading,
    user,
    followers,
    followedGames,
    followedUsers,
  };
}
