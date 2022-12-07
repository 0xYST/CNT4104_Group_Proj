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
      </header>
    </div>
  )
}

export default App
