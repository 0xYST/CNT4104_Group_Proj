# THIS FILE IS IN THE DOCKER CONTAINER
import base64
from flask import Flask, redirect, request
from flask_cors import CORS, cross_origin
import requests
import json
import sys
import os.path

app = Flask(__name__)
CORS(app)


# Global Constants
SPOTIFY_URL = 'https://api.spotify.com/v1'
ACCOUNTS_URL = 'https://accounts.spotify.com'
REDIRECT_URL = 'http://localhost:5000/callback'

# sensitive data
CLIENT_SECRET = ''
CLIENT_ID = ''  # will be generated when making the application on spotify dashboard
AUTH_CODE = ''
ACCESS_TOK = 'Bearer '  # the space at the end is needed


@app.route('/')
def index():
    return 'This is the index loser'


# easter egg
@app.route('/pinkman')
def get_breaking_bad_quote():
    url = 'https://api.breakingbadquotes.xyz/v1/quotes'
    response = requests.get(url)
    response_dict = response.json()[0]
    return f'{response_dict["quote"]} - <i>{response_dict["author"]}</i>'


'''
 request_access_token
 Before api calls can be made, spotify needs to authenticate 
 and receive an access token. These tokens are valid for 6 minutes
 and will need to be refreshed afterward. (not implemented, must restart app)
'''


@app.route('/auth/token')
def request_access_token():
    encoded = base64.b64encode((CLIENT_ID + ':' + CLIENT_SECRET).encode('ascii')).decode('ascii')

    '''
     To practice safe token handling, the client_id and client_secret 
     are passed as arguments to the image when being built. However, passing
     the args through docker brings a slightly different encoded token than 
     when running it vanila with python in the terminal.

     My bandaid solution was just to replace the two wrong characters
    '''
    if encoded[-2:] != "U=":
        encoded = encoded[:-2] + "U="

    app.logger.info(encoded)

    response = requests.post(ACCOUNTS_URL + '/api/token', headers={"Authorization": f'Basic {encoded}',
                                                                   "Content-Type": "application/x-www-form-urlencoded"},
                             params={"grant_type": "client_credentials"})

    global ACCESS_TOK
    app.logger.info(f'{response.json()}')
    ACCESS_TOK += response.json()['access_token']

    app.logger.info(ACCESS_TOK)

    if response.status_code == 200:
        return f'token granted. Will expire in 6 minutes'
    else:
        return f"something not good happened, error: {response.status_code}"


'''
 get_full_track_data_by_id
 used for testing to as it shows every piece of data 
 so i know which pieces to pick for the /track/ call
'''


@app.route('/full-track/<id>')
def get_full_track_data_by_id(id):
    url = SPOTIFY_URL + f'/tracks/{id}'
    response = requests.get(
        url, headers={'Authorization': f'{ACCESS_TOK}', 'Content-Type': 'application/json'})

    response_dict = response.json()  # might not need the [0] idk yet

    return response_dict


'''
 get_track_by_id
 Calls spotify 'get track' feature which returns 
 a bunch of metadata about a song like the artist,
 the title, the album, etc.
'''


@app.route('/track/<id>')
def get_track_by_id(id):
    url = SPOTIFY_URL + f'/tracks/{id}'
    response = requests.get(
        url, headers={'Authorization': f'{ACCESS_TOK}', 'Content-Type': 'application/json'})

    response_dict = response.json()  # might not need the [0] idk yet

    # idk which data we need
    track_data = {"name": response_dict['name'],
                  "album-name": response_dict['album']['name'],
                  "artist-name": response_dict['artists'][0]['name'],
                  "album-cover": response_dict['album']['images'][1]['url'],
                  "id": response_dict['id']  # idk do we need it?
                  }

    return track_data  # json form may be needed


'''
 analysis
 This function calls spotify's audio-analysis feature
 which gives back cool data like the song's key,
 time-signature, and other cool music data. 
'''


@app.route('/analysis/<id>')
def analysis(id):
    url = f'{SPOTIFY_URL}/audio-features/{id}'
    response = requests.get(
        url, headers={'Authorization': f'{ACCESS_TOK}', 'Content-Type': 'application/json'})

    response_dict = response.json()

    song_keys = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

    key = None
    if response_dict['key'] == -1:
        key = 'No key was detected'
    else:
        key = song_keys[response_dict['key']]

    data = {
        "key": key,
        "tempo": response_dict['tempo'],
        "time-signature": f'{response_dict["time_signature"]}/4',
        "energy": response_dict['energy']  # idk? how lively it is
    }

    return data


if __name__ == '__main__':
    pls = os.path.isfile('secret.json')
    if os.path.isfile('secret.json'):
        # having the file is convenient
        f = open('secret.json')
        secret = json.load(f)
        f.close()

        CLIENT_ID = secret['client-id']
        CLIENT_SECRET = secret['secret']

    else:
        # must provide this (docker does this)
        CLIENT_ID = sys.argv[1]
        CLIENT_SECRET = sys.argv[2]

    app.run(debug=True, port=5000, host="0.0.0.0")
