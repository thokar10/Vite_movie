import axios from "axios";
import { useEffect, useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";

const AllMovie = () => {
  const [movies, Setmovie] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getMovies();
  }, []);
  const getMovies = async () => {
    const response = await axios.get("http://localhost:8000/movies");
    console.log(response.data.data);
    Setmovie(response.data.data);
  };

  const deleteMovies = async (movie_id) => {
    try {
      await axios.delete(`http://localhost:8000/movies/${movie_id}`);
      getMovies();
    } catch (e) {
      alert("could not be deleted");
    }
  };

  return (
    <>
      <div className=" bg-red-600 p-4 text-white flex justify-between">
        <p className="text-3xl">Movies</p>
        <IoIosAddCircle
          className="text-3xl   hover:cursor-pointer"
          onClick={() => {
            navigate("/addMovies");
          }}
        />
      </div>

      <div>
        {movies.map((movie) => {
          return (
            <>
              <div className="flex justify-center">
                <div className="border-2 border-[azure] p-2 bg-[darkgrey] text-2xl flex justify-between items-center w-[550px] ">
                  <div>
                    <div>
                      Movie Name:
                      <span className="font-bold">{movie.name}</span>
                    </div>
                    <div>
                      {" "}
                      Rating:<span className="font-bold">{movie.rating}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 justify-center ">
                    <MdEdit
                      className="hover:cursor-pointer hover:text-red-500 text-[floralwhite]"
                      onClick={() => {
                        navigate(`/editMovies/${movie._id}`);
                      }}
                    />

                    <MdDelete
                      className="hover:cursor-pointer hover:text-red-500 text-[floralwhite]"
                      onClick={() => {
                        deleteMovies(movie._id);
                      }}
                    />
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};
export default AllMovie;
