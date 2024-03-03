import axios from "axios";
import { useRef } from "react";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const AddMovie = () => {
  const navigate = useNavigate();

  const movie_name = useRef();
  const movie_info = useRef();
  const movie_image = useRef();
  const movie_rating = useRef();

  const addMovies = async (e) => {
    e.preventDefault();

    const data = {
      name: movie_name.current.value,
      info: movie_info.current.value,
      img: movie_image.current.value,
      rating: movie_rating.current.value,
    };

    try {
      if (isNaN(movie_rating.current.value)) {
        throw "movie rating should be in  number";
      }
      // if (
      //   movie_name.current.value === "" ||
      //   movie_info.current.value === "" ||
      //   movie_image.current.value === "" ||
      //   movie_rating.current.value === ""
      // ) {
      //   throw "all input is required";
      // }

      const response = await axios.post("http://localhost:8000/movies", data);
      console.log(response.data);
      alert(" created successfully");
      movie_name.current.value = "";
      movie_rating.current.value = "";
      movie_info.current.value = "";
      movie_image.current.value = "";
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
            navigate(-1);
          }}
        />
        <div className="inline text-center">
          <p className="text-white text-2xl ">Add Movies</p>
        </div>
      </div>

      <div className="p-5 flex  justify-center bg-slate-400">
        <form className="flex flex-col gap-2" onSubmit={addMovies}>
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

export default AddMovie;
