# osuTracker
> A statistics tracker for the game osu!

# ![osutracker.com](osutracker.com)

## General info
osuTracker collects data from the osu! API, allowing users to track their progress (or other peoples) in the game. 

The REST API is currently public, so you may request data from the current endpoints which can be seen in the routes folder. Documentation for the API is in progress.

For Example:

`axios.get('https://osutracker.com/players/ningalu').then(response => console.log(response))`

## Screenshots
![Example user profile](https://media.discordapp.net/attachments/627267590862929961/793289830757826590/unknown.png?width=926&height=468)

## Technologies
* MongoDB 
* Express
* React
* NodeJS
* CanvasJS - Graph library 

## Features
List of features ready and TODOs for future development
* Tracking user stats
* Allowing any user to apply to be tracked

To-do list:
* Track countries as a whole (using a countries top 100 players)
* Track history of plays for each user 

## Status
Project is: _in progress_
