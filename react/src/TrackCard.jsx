import './TrackCard.css'



function TrackCard({albumCover, trackName, artist, albumName, timeSig, songKey, tempo}) {

    return (
        <div className="trackCard">
          <div className="trackCardHeader">
            <img className="albumCover" src={albumCover}></img>
            <div className="nameArtist">
              <p>{trackName}</p>
              <p>{artist}</p>
              <p>{albumName}</p>
            </div>
          </div>
          <div className="keyTempo">
            <p>Time signature: {timeSig}</p>
            <p>Key: {songKey}</p>
            <p>BPM: {tempo}</p>
          </div>
        </div>
    )
}

export default TrackCard