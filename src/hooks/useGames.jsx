import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axiosClient from "../utilities/AxiosClient";

export default function () {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState([]);
  const [prevPage, setPrevPage] = useState(null);
  const [nextPage, setNextPage] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();

  //Obtener valores de la URL
  const page = searchParams.get("page") || 1;
  const selectedTags = searchParams.getAll("tags") || [];
  const selectedGenres = searchParams.getAll("genres") || [];
  const selectedPlatforms = searchParams.getAll("platforms") || [];
  const order = searchParams.get("order") || "null";
  const searchValue = searchParams.get("search") || "";

  //Obtener datos
  const getData = async () => {
    setLoading(true);
    const data = {
      genres: selectedGenres.join(","),
      tags: selectedTags.join(","),
      platforms: selectedPlatforms.join(","),
      search: searchValue,
      order,
      page,
    };
    try {
      const response = await axiosClient("/api/games", { params: data });
      setGames(response.data.games);
      setPrevPage(response.data.previous);
      setNextPage(response.data.next);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  //Llamar a getData cada vez que se cambien los filtros
  useEffect(() => {
    getData();
  }, [searchParams]);

  const handlePageChange = (newPage) => {
    setSearchParams({
      tags: selectedTags,
      genres: selectedGenres,
      platforms: selectedPlatforms,
      search: searchValue,
      order,
      page: newPage,
    });
  };

  const handleOrderChange = (newOrder) => {
    setSearchParams({
      tags: [],
      genres: [],
      platforms: [],
      search: searchValue,
      order: newOrder,
      page: 1,
    });
  };

  const handleFilterChange = (value, type = "search") => {
    let newTags = selectedTags || [];
    let newGenres = selectedGenres || [];
    let newPlatforms = selectedPlatforms || [];
    let newSearch = searchValue || "";

    let newOrder = "null";
    switch (type) {
      case "tags":
        newTags = newTags.includes(value)
          ? newTags.filter((tag) => tag !== value)
          : [...newTags, value];
        break;
      case "genres":
        newGenres = newGenres.includes(value)
          ? newGenres.filter((tag) => tag !== value)
          : [...newGenres, value];
        break;
      case "platforms":
        newPlatforms = newPlatforms.includes(value)
          ? newPlatforms.filter((tag) => tag !== value)
          : [...newPlatforms, value];
        break;
      case "search":
        newOrder = order;
        newSearch = value;
        break;
      default:
        break;
    }

    setSearchParams({
      tags: newTags,
      genres: newGenres,
      platforms: newPlatforms,
      search: newSearch,
      order: newOrder,
      page: 1,
    });
  };

  return {
    games,
    loading,
    selectedGenres,
    selectedTags,
    selectedPlatforms,
    searchValue,
    handleFilterChange,
    page,
    handleOrderChange,
    handlePageChange,
    prevPage,
    nextPage,
    order,
  };
}
