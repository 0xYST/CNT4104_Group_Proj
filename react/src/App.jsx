import Header from "./components/Header";
import SearchBar from "./components/Search_Bar";
import SongInfo from "./components/Song_Info";

export default function App() {
    return (
      <div className="app" id="app-container"> 
        <Header />
        <SearchBar />
        <SongInfo />
      </div>
    )
  }