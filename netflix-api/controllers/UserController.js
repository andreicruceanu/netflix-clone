const UserModel = require("../models/UserModel.js");

const registerUser = async (req, res) => {
  try {
    const { email } = req.body;

    const userExist = await UserModel.findOne({ email });

    if (userExist) {
      return res.status(400).json({ msg: "User already exist" });
    }

    if (email) {
      const newUser = new UserModel({ email, likedMovies: [] });
      await newUser.save();
      return res.status(201).json(newUser);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error." });
  }
};

const getLikedMovies = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.json({ listFavorites: user.likedMovies });
    } else {
      res.status(400).json({ msg: "User with given email not found." });
    }
  } catch (error) {
    return res.status(500).json({ msg: "Error fetching movies." });
  }
};

const addToLikedMovies = async (req, res) => {
  try {
    const { email, data } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "User not exist" });
    }

    const { likedMovies } = user;
    const movieAlreadyLiked = likedMovies.find(({ id }) => id === data.id);

    if (movieAlreadyLiked) {
      return res
        .status(400)
        .json({ msg: "Movie already added to the liked list" });
    } else {
      await UserModel.findByIdAndUpdate(user._id, {
        likedMovies: [data, ...user.likedMovies],
      });
      return res.json(data);
    }
  } catch (err) {
    return res
      .status(500)
      .json({ msg: "Error adding movie to the liked list" });
  }
};

const removeFromLikedMovies = async (req, res) => {
  try {
    const { email, mediaId } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User with given email not found." });
    }
    let movies = user.likedMovies;
    const indexLikedMovie = user.likedMovies.findIndex(
      (movie) => movie.id === mediaId
    );

    if (indexLikedMovie < 0) {
      return res.status(404).json({ msg: "Movie not exist" });
    }
    movies.splice(indexLikedMovie, 1);

    await UserModel.findByIdAndUpdate(
      user._id,
      { likedMovies: movies },
      { new: true }
    );
    return res.json({ msg: "Movie successfully removed.", movies });
  } catch (error) {
    return res.json({ msg: "Error removing movie to the liked list" });
  }
};

module.exports = {
  getLikedMovies,
  addToLikedMovies,
  registerUser,
  removeFromLikedMovies,
};
