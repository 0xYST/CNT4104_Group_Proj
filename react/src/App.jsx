import './App.css'
import TrackCard from './TrackCard'

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <h1>Spotify Networking Project</h1>
        <p>Enter a Song:</p>
        <form>
        <label>
        <input type="text" name="name" />
        </label>
        <input type="submit" value="Submit" />
        </form>   
        <TrackCard albumCover={"https://i.scdn.co/image/ab67616d00001e02df4c348a2f9d6c3f6c5813bd"}
        trackName={"Vicious Cycle"}
        
        artist={"Slackjaw"}
        
        albumName={"Vicious Cycle"}
        
        timeSig={"4/4"}

        songKey={"C#"}

        tempo={"140"}/>
      </header>
      
    </div>
  )
}

export default App
