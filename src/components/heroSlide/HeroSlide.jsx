import { Box, Button, Chip, Divider, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import axios from "axios";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const HeroSlide = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const getMovies = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3//trending/movie/week?api_key=0b1318cf62848e9c1bf60a2db46b0b0e`
      );
      if (response.data) setMovies(response.data.results);
    };

    getMovies();
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        color: "#fff",
        "&::before": {
          content: '""',
          width: "100%",
          height: "30%",
          position: "absolute",
          bottom: 0,
          left: 0,
          zIndex: 2,
          pointerEvents: "none",
          backgroundImage:
            "linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0))",
        },
      }}
    >
      <Swiper
        grabCursor={true}
        loop={true}
        //modules={[Autoplay]}
        style={{ width: "100%", height: "max-content" }}
        // autoplay={{
        //   delay: 3000,
        //   disableOnInteraction: false,
        // }}
      >
        {movies.map((movie, index) => (
          <SwiperSlide key={index}>
            <Box
              sx={{
                paddingTop: {
                  xs: "130%",
                  sm: "80%",
                  md: "60%",
                  lg: "45%",
                },
                backgroundPosition: "top",
                backgroundSize: "cover",
                backgroundImage: `url(https://image.tmdb.org/t/p/original${
                  movie.backdrop_path || movie.poster_path
                })`,
              }}
            />
            <Box
              sx={{
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
              }}
            />
            <Box
              sx={{
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                paddingX: { sm: "10px", md: "5rem", lg: "10rem" },
              }}
            >
              <Box
                sx={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  paddingX: "30px",
                  color: "text.primary",
                  width: { sm: "unset", md: "30%", lg: "40%" },
                }}
              >
                <Stack spacing={4} direction="column">
                  {/* title */}
                  <Typography
                    variant="h4"
                    fontSize={{ xs: "2rem", md: "2rem", lg: "4rem" }}
                    fontWeight="700"
                  >
                    {movie.title || movie.name}
                  </Typography>
                  {/* title */}

                  <Stack direction="row" spacing={1} alignItems="center">
                    {/* rating */}

                    {/* rating */}

                    <Divider orientation="vertical" />
                    {/* genres */}

                    {/* genres */}
                  </Stack>

                  {/* overview */}

                  {/* overview */}

                  {/* buttons */}

                  {/* buttons */}
                </Stack>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default HeroSlide;
