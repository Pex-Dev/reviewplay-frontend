import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAlert } from "../context/AlertContext";
import axiosClient from "../utilities/AxiosClient";

export default function useProfile() {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [followed, setFollowed] = useState(false);
  const [sendingRequet, setSendingRequest] = useState(false);

  const { showAlert } = useAlert();

  //Obtener id
  const { id } = useParams();

  const getProfileData = async () => {
    if (sendingRequet) return;

    try {
      setLoading(true);
      setSendingRequest(true);
      const response = await axiosClient(`/api/profile/${id}`);
      if (response.data.success) {
        //Obtener datos del usuario
        setUserProfile(response.data.user);
        //Si sigue o no al usuario
        if (response.data.followed) {
          setFollowed(response.data.followed);
        }
        setSendingRequest(false);
        setLoading(false);
      } else {
        setLoading(false);
        setSendingRequest(false);
        return navigate("/");
      }
    } catch (error) {
      setSendingRequest(false);
      setLoading(false);
      const data = error.response.data;

      //Si el usuario no se encontro
      if (error.status === 404) {
        return navigate("/");
      }

      //Si no esta el email confirmado
      if (!data.user.verified) {
        return navigate("/verification-notification");
      }
    }
  };

  const followUser = async (id) => {
    if (sendingRequet) return;

    try {
      setSendingRequest(true);
      const response = await axiosClient(`/api/users/${id}/follow`);
      setFollowed(true);
      setSendingRequest(false);
    } catch (error) {
      if (error.status == 403) {
        showAlert("alert", "Error", error.response.data.message, "error");
      }
      setSendingRequest(false);
    }
  };

  const unfollowUser = async (id) => {
    if (sendingRequet) return;

    try {
      setSendingRequest(true);
      const response = await axiosClient.post(`/api/users/${id}/unfollow`, {
        _method: "DELETE",
      });
      setFollowed(false);
      setSendingRequest(false);
    } catch (error) {
      setSendingRequest(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getProfileData();
  }, [id]);

  return {
    userProfile,
    loading,
    followUser,
    unfollowUser,
    followed,
  };
}
