# Flask backend
---

These backend routes return data that is obtained
through Spotify's api. Right now, you can only
return data from a song by it's ID (will show how to obtain)
and return audio analysis data about the song.


## Usage
---


#### Running the app
##### Windows Command Line
First set the `FLASK_APP` environment variable to our 
app's `.py` file

in Windows command line:
`set FLASK_APP=app.py`

install the requirements
`pip install -r reqs.txt`

Then run the app
`python app.py <client_id> <client_secret>`

Client ID and Secret can be provided to Professor Greenwell
if desired. I didn't want to upload the secret keys to github. 
They do not need to be provided when running through
docker.

##### Docker
I recommend using the docker image.

first run `docker pull jasonknoll/networking-spotify-proj:alpha-1.2`

Then to create a container with the image
`docker run --publish 8080:5000 --name spotify-metadata-proj jasonknoll/networking-spotify-proj:alpha-1.2`

`--publish 8080:5000` sets the internal port of 5000 to the external port of 8080
where we can access it. You can pick whichever port you like. I just think 8080 looks nice.


#### Authenticating
Before api calls can be made, we must authenticate this session.
Enter `http://localhost:5000/auth/token` to give the app an access
token which grants access to the api responses. **INFO**: the port 
may be different if you use the docker version


#### Retrieving song metadata
 To receive (right now just view in browser) JSON data about a song,
 simply navigate to `http://localhost:5000/track/<song-id>` 
 *remember port may be different in docker*

 ##### Obtaining a song ID 
 In Spotify desktop, right-click a song, `share -> copy song link`. 
 Paste is somewhere and it should look like this
 `https://open.spotify.com/track/0qF4xqpP1jTTmFLqgGPSYX?si=82083512683b472e`

 What we want is the string between the last `/` and the `?`. 

 We can then paste the ID at the end of our URL as such
 `http://localhost:8080/track/0qF4xqpP1jTTmFLqgGPSYX`

 The page will then display the JSON response assuming everything went 
 right.

 ##### Audio Analysis

  `http://localhost:8080/analysis/0qF4xqpP1jTTmFLqgGPSYX`
