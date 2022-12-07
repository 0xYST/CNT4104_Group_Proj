import './App.css'

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

        <div className="trackCard">
          <img id="albumCover"></img>
          <p>Song name</p>
          <hr/>
          <p>Artist</p>
          <hr/>
          <p>Album</p>
          <hr/>
          <div className="keyTempo">
            <p>Time signature</p>
            <p>Key</p>
            <p>Tempo</p>
          </div>
        </div>

      </header>
      
    </div>
  )
}

export default App
