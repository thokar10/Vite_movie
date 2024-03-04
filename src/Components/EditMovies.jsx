import axios from "axios";
import { useEffect, useRef } from "react";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";

const EditMovies = () => {
  const { movie_id } = useParams();
  useEffect(() => {
    getMovies(movie_id);
  }, []);

  const navigate = useNavigate();

  const movie_name = useRef();
  const movie_info = useRef();
  const movie_image = useRef();
  const movie_rating = useRef();

  const getMovies = async (movie_id) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/movies/${movie_id}`
      );
      console.log(response.data.movie_data);

      movie_name.current.value = response.data.movie_data.name;
      movie_image.current.value = response.data.movie_data.img;
      movie_info.current.value = response.data.movie_data.info;
      movie_rating.current.value = response.data.movie_data.rating;
    } catch (e) {
      console.log("failed");
    }
  };

  const editMovies = async () => {
    const data = {
      _id: movie_id,
      name: movie_name.current.value,
      info: movie_info.current.value,
      img: movie_image.current.value,
      rating: movie_rating.current.value,
    };

    try {
      const response = await axios.patch("http://localhost:8000/movies", data);
      console.log(response.data);
      alert(" updated successfully");
      movie_name.current.value = "";
      movie_image.current.value = "";
      movie_info.current.value = "";
      movie_rating.current.value = "";
    } catch (e) {
      if (e == null) {
        alert("Cannot created");
      } else {
        alert(e);
      }
    }
  };
  return (
    <>
      <div className=" bg-red-600 p-3">
        <IoArrowBackCircleSharp
          className="hover:cursor-pointer hover:text-white text-6xl inline"
          onClick={() => {
            navigate("/");
          }}
        />
        <div className="inline text-center">
          <p className="text-white text-2xl ">Edit movies</p>
        </div>
      </div>

      <div className="p-5 flex  justify-center bg-slate-400">
        <form
          className="flex flex-col gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            editMovies(movie_id);
          }}
        >
          <p className="text-2xl">Movie Name</p>
          <input type="text" className=" w-[266px]" ref={movie_name} />
          <p className="text-2xl">Movie Information </p>
          <input
            type="text"
            className=" w-[266px]"
            style={{ height: "60px" }}
            ref={movie_info}
          />
          <p className="text-2xl">Movie image</p>
          <input type="text" className=" w-[266px]" ref={movie_image} />
          <p className="text-2xl">Movie rating</p>
          <input type="text" className=" w-[266px]" ref={movie_rating} />
          <input
            type="submit"
            className="hover:cursor-pointer h-10 bg-black text-white"
          />
        </form>
      </div>
    </>
  );
};

export default EditMovies;
