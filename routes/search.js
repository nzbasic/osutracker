import express from "express";
import Country from "../models/Country.model.js";
import User from "../models/User.model.js";
const router = express.Router();

router.route("/all").get(async (req, res) => {
  const page = req.query.page;
  const text = req.query.text.replace(
    /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,
    "\\$&"
  );
  const regex = new RegExp(text, "i");

  let countries = [];
  let users = [];

  const usersPromise = User.find(
    {
      name: {
        $regex: regex,
      },
    },
    {
      name: 1,
      id: 1,
      pp: 1,
    }
  );

  const countriesPromise = Country.find(
    {
      name: {
        $regex: regex,
      },
    },
    {
      name: 1,
      abbreviation: 1,
      pp: 1,
    }
  );

  await Promise.all([
    usersPromise.then((items) => (users = items)),
    countriesPromise.then((items) => (countries = items)),
  ]);

  // null PP will mess up the sort
  users = users.filter((user) => user.pp);

  const combined = countries.concat(users);
  const sorted = combined.sort((a, b) => parseFloat(b.pp) - parseFloat(a.pp));

  const resLength = sorted.length;
  const resPage = sorted.slice((page - 1) * 5, page * 5);

  res.json({ page: resPage, length: resLength });
});

export default router;
