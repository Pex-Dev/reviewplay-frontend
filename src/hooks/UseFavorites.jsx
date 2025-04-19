import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import axiosClient from "../utilities/AxiosClient";

export default function UseFavorites() {
  const [favorites, setFavorites] = useState([]);
  const [user, setUser] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const { id } = useParams();

  //Obtener valor de la URL
  const page = searchParams.get("page") || 1;

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

  const getData = async () => {
    try {
      setLoading(true);
      const response = await axiosClient.get(
        `/api/users/${id}/favorites?page=${page}`
      );
      if (response.data.success) {
        setFavorites(response.data.favorites.data);
        setPages(response.data.favorites.next_page_url, "next");
        setPages(response.data.favorites.prev_page_url, "prev");
        setUser(response.data.user);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage });
  };

  useEffect(() => {
    getData(id);
  }, [id, searchParams]);

  return { favorites, user, loading, prevPage, nextPage, handlePageChange };
}
