import './TrackCard.css'

function TrackCard() {
    return (
        <div className="trackCard">
          <div className="trackCardHeader">
            <img id="albumCover" src="https://i.scdn.co/image/ab67616d00001e02df4c348a2f9d6c3f6c5813bd"></img>
            <div className="nameArtist">
              <p>Song name</p>
              <p>Artist</p>
              <p>Album</p>
            </div>
          </div>
          <div className="keyTempo">
            <p>Time signature</p>
            <p>Key</p>
            <p>Tempo</p>
          </div>
        </div>
    )
}

export default TrackCard