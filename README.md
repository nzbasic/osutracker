# osuTracker
> A statistics tracker for the game osu!

# [osutracker.com](https://osutracker.com)

## General info
osuTracker collects data from the osu! API, allowing users to track their progress (or other peoples) in the game. 

The REST API is currently public, so you may request data from the current endpoints which can be seen in the routes folder. Documentation for the API is in progress.

For Example:

`axios.get('https://osutracker.com/players/ningalu').then(response => console.log(response))`

Current Routes:

Players:

GET "/players/" returns all player names

GET "/players/:id" returns player data 


Stats:

GET "/stats/:id" get list of data points for a user name


Countries:

GET "/country/names" gets all country names

GET "/country/nameAbr" gets all country names with abbreviations

GET "/country/nameAbrPp" gets all country names, abbreviations, and latest pp 

GET "/country/abbreviation/:country" gets abbreviation for a country

GET "/country/data/:country" gets data points for a country

GET "country/ppHistory/:country" gets ppHistory of a country

GET "country/scores/:country/latest" get latest top 100 scores of a country

GET "country/scores/:country/all" gets full history of country top 100s


## Screenshots
![Example user profile](https://media.discordapp.net/attachments/627267590862929961/800561480679292928/unknown.png?width=887&height=465)
![Example country profile](https://media.discordapp.net/attachments/627267590862929961/800561567409111070/unknown.png?width=887&height=464)

## Technologies
* MongoDB 
* Express
* React
* NodeJS
* CanvasJS - Graph library 
* ReCharts - Another Graph Library
* Material-UI

## Features
List of features ready and TODOs for future development
* Tracking user stats
* Allowing any user to apply to be tracked
* Tracking country top plays

To-do list:
* Track history of plays for each user 

## Status
Project is: _in progress_
