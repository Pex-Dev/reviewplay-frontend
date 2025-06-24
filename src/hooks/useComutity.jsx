import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axiosClient from "../utilities/AxiosClient";

export default function useComunity() {
  const [loading, setLoading] = useState(true);
  const [sendingRequest, setSendingRequest] = useState(false);
  const [topUsers, setTopUsers] = useState([]);
  const [topFollowers, setTopFollowers] = useState([]);
  const [topReviews, setTopReviews] = useState([]);
  const [loadingResults, setLoadingResults] = useState(false); //Si se estan cargando los usuarios
  const [results, setResults] = useState([]);
  const [prevPage, setPrevPage] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  //Obtener pagina de la url
  const search = searchParams.get("search") || null;
  const page = parseInt(searchParams.get("page")) || null;

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

    // Usar URLSearchParams para obtener el parámetro 'page' que viene desde el backend
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
    if (sendingRequest) return;

    try {
      setLoading(true);
      setSendingRequest(true);
      const response = await axiosClient("/api/community");
      setTopUsers(response.data.topUsers);
      setTopFollowers(response.data.topUsersFollowers);
      setTopReviews(response.data.topUsersReviews);
      setLoading(false);
      setSendingRequest(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setSendingRequest(false);
    }
  };

  const searchUsers = async () => {
    if (sendingRequest || !search) return;

    try {
      setLoadingResults(true);
      setSendingRequest(true);
      setResults([]);
      const response = await axiosClient(
        `/api/community/users/search/${search}?page=${page ? page : 1}`
      );
      //Almacenar resultados
      setResults(response.data.data);
      //ALmacenar paginas de paginación
      setPages(response.data.next_page_url, "next");
      setPages(response.data.prev_page_url, "prev");

      //Completar cargas
      setLoadingResults(false);
      setSendingRequest(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setSendingRequest(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (!search) return;
    searchUsers();
  }, [searchParams]);

  const handleSearch = (newSearch) => {
    setSearchParams({ search: newSearch, page: 1 });
  };

  const handlePageChange = (newPage) => {
    setSearchParams({ search, page: newPage });
  };

  return {
    topUsers,
    topFollowers,
    topReviews,
    searchUsers,
    loading,
    page,
    loadingResults,
    results,
    nextPage,
    prevPage,
    handlePageChange,
    handleSearch,
  };
}
