import './App.css'
import TrackCard from './TrackCard'
import ReactDOM from 'react-dom'

function getTrackModel(data) {
  return {
    'album-cover': data['album-cover'],
    'artist-name': data['artist-name'],
    'album-name': data['album-name'],
    'name': data['name'],
    'id': data['id']
  }
}

function getAnalysisModel(data) {
  return {
    'energy': data['energy'],
    'key': data['key'],
    'tempo': data['tempo'],
    'time-signature': data['time-signature']
  }
}

async function getTrack(id) {  

  const URL = 'http://localhost:8080/track/' + id

  var response = await fetch(URL).then((res) => res.json()).then((data) => getTrackModel(data))

  return response
}

async function getAnalysis(id) {
  const URL = 'http://localhost:8080/analysis/' + id

  var response = await fetch(URL).then((res) => res.json()).then((data) => getAnalysisModel(data))

  return response
}

async function getInputValue(){
   
  var inputVal = document.getElementById("myInput").value;
  //https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT?si=594bd5bcfc8e432b
  
  var song_id = inputVal.substring(31, 53)
  
  var track = await getTrack(song_id)
  var analysis = await getAnalysis(song_id)
  console.log(track)
  console.log(analysis)

  var albumCover = track['album-cover']
  var trackName = track['name']
  var artist = track['artist-name']
  var albumName = track['album-name']
  var timeSig = analysis['time-signature']
  var songKey = analysis['key']
  var tempo = Math.round(analysis['tempo'])

  let wrapper = document.getElementById('track-wrapper')
  
  ReactDOM.render(
    <TrackCard albumCover={albumCover}
        trackName={trackName}
        
        artist={artist}
        
        albumName={albumName}
        
        timeSig={timeSig}
        
        songKey={songKey}

        tempo={tempo}/>, wrapper
  )

  //return song_id
}

function App() {

  

  return (
    <div className="App">
      <header className="App-header">
        <h1>Spotify Networking Project</h1>
        <p>Enter a Song:</p>
        {/* <form>
        <label>
        <input type="text" name="name" />
        </label>
        <input type="submit" value="Submit" />
        </form>    */}
        <input type="text" placeholder="paste spotify link here" id="myInput"/>
        <button type="button" onClick={getInputValue}>Get Value</button>

        
        <div id="track-wrapper"></div>
      </header>
      
    </div>
  )
}

export default App
