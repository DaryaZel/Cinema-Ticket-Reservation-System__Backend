export function movieSample() {
  let movieSessionsSample = [
    {
      $sort: {
        date: 1
      }
    },
    {
      $lookup: {
        from: "cinemas",
        localField: "hall_id",
        foreignField: "hall_id",
        as: "hall"
      }
    },
    {
      $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ["$hall", 0] }, "$$ROOT"] } }
    },
    { $project: { hall: 0 } },
    {
      $lookup: {
        from: "movies",
        localField: "movie_id",
        foreignField: "_id",
        as: "movie"
      }
    },
    {
      $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ["$movie", 0] }, "$$ROOT"] } }
    },
    { $project: { movie: 0 } },
    {
      $lookup: {
        from: "cities",
        localField: "city_id",
        foreignField: "_id",
        as: "city"
      }
    },
    {
      $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ["$city", 0] }, "$$ROOT"] } }
    },
    { $project: { city: 0 } }
  ]
  return movieSessionsSample;
}
export function sessionsCalenderSample(timeZone, movieObjectId) {
  let sessionsCalenderSample = [
    { $match: { movie_id: movieObjectId } },
    {
      $group: {
        _id: null,
        days: { $addToSet: { $dateToString: { date: "$date", format: "%m/%d/%Y", timezone: timeZone } } }
      }
    }
  ]
  return sessionsCalenderSample;
}
