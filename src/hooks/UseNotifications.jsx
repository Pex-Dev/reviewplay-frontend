import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axiosClient from "../utilities/AxiosClient";

export default function UseNotifications() {
  const [loading, setLoading] = useState(true);
  const [sendingRequest, setSendingRequest] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [users, setUsers] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const { setUnreadNotificationsCount } = useAuth();

  //Obtener valor de la URL
  const page = searchParams.get("page") || 1;
  const order = searchParams.get("order") || "desc";

  const setPages = (page, type) => {
    if (page === null) {
      if (type === "next") {
        setNextPage(null);
      }
      if (type === "prev") {
        setPrevPage(null);
      }
      return;
    }

    // Usar URLSearchParams para obtener el parámetro 'page'
    const urlParams = new URLSearchParams(new URL(page).search);
    const pageNumber = urlParams.get("page");

    if (type === "next") {
      setNextPage(parseInt(pageNumber));
    }
    if (type === "prev") {
      setPrevPage(parseInt(pageNumber));
    }
  };

  const getNotifications = async () => {
    if (sendingRequest) return;

    try {
      setSendingRequest(true);
      setLoading(true);
      const response = await axiosClient(
        `/api/notifications?page=${page}&order=${order}`
      );
      //Almacenar las notificaciones
      setNotifications(response.data.notifications.data);

      //Almacenar usuarios
      setUsers(response.data.users);

      //Almacenar botones para paginación
      setPages(response.data.notifications.next_page_url, "next");
      setPages(response.data.notifications.prev_page_url, "prev");

      //Terminar el loading
      setSendingRequest(false);
      setLoading(false);

      //Marcar las notificaciones como leidas
      const ids = response.data.notifications.data.map(
        (notification) => notification.id
      );
      setVisibleAsRead(ids);
    } catch (error) {
      setSendingRequest(false);
      setLoading(false);
    }
  };

  //Marcar las notificaciónes visibles como leidas
  const setVisibleAsRead = async (ids) => {
    if (sendingRequest) return;

    try {
      setSendingRequest(true);
      const response = await axiosClient.post(
        `/api/notifications/mark-visible-as-read`,
        { _method: "PUT", ids }
      );
      setUnreadNotificationsCount(response.data.unreadNotificationsCount);
      setSendingRequest(false);
    } catch (error) {
      setSendingRequest(false);
    }
  };

  useEffect(() => {
    getNotifications();
  }, [searchParams]);

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage });
  };

  const handleOrderChange = (newOrder) => {
    setSearchParams({ page: 1, order: newOrder });
  };

  return {
    loading,
    getNotifications,
    notifications,
    users,
    handlePageChange,
    nextPage,
    prevPage,
    handleOrderChange,
  };
}
