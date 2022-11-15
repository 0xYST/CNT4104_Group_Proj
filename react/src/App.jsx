import './App.css'

function App() {
  const CLIENT_ID = "88fb5309a15343db8f0e7d7891c98ea9"
  const REDIRECT_URI = "http://localhost:3000"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"


  return (
    <div className="App">
      <header className="App-header">
        <h1>Spotify Networking Project</h1>
        <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login To Spotify</a>
      </header>
    </div>
  )
}

export default App
