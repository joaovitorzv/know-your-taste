# know your taste

### Project Overview
  In this project I implemented a OAuth flow using the Spotify API, when the user authenticates with his spotify account he's redirected back to a different page, where he can see a Chart of his Top artists popularity, an ordered list of his Top artists and Top Tracks, a discover section with some musics based on his taste where is possible to play a 30sec preview of these songs and finnaly a section showing all the user playlists with a button that opens a modal to rename the playlist.
  

#### Short history about the features implementation

  - [OAuth implementation](https://github.com/joaovitorzv/know-your-taste/blob/main/pages/api/auth/%5B...nextauth%5D.ts)
    - To implement the OAuth (something that I had never done before) I picked [next-auth-js](https://next-auth.js.org) which comes with built-in support for most used providers and spotify is included, there are CSRF token validation (Spotify really recommends while using their API) and other cool features, I also implemented the token refresh, whenever the user interacts with the "session" there are a `jwt()` callback that verifies if the 1 hour expiration time has passed if so it requests a new fresh token to the Spotify `/token` endpoint.

  - [Charts implementation](https://github.com/joaovitorzv/know-your-taste/blob/main/components/ArtistsChart/artistsChart.tsx)
    - There are nothing too special with this feature I just really wanted to implement a Chart, for that I used [recharts](http://recharts.org/), basically it's a bar chart that shows the popularity from 0 to 100 of the user Popular artists, by default the orientation is vertical I made It look horizontal, styled every piece to make it fit the application style and wrapped with a responsive container to make the chart responsible (of course)

  - [Top Items implementation](https://github.com/joaovitorzv/know-your-taste/blob/main/components/TopItems/topItems.tsx)
    - ([fetching](https://github.com/joaovitorzv/know-your-taste/blob/main/hooks/swr/useTopItems.ts)) Here I had to make the fetching of users Top Items reusable because I need them in differente places, using a custom hook that accepts 2 parameters `"topArtists" | "topTracks"` we make a call to `/api/user/${type}` using `useSWR` hook which fetches the data for us and returns an object, the interesting part here is that using typescript conditional types we set the type of `data` returned by `swr` "dynamic" using the parameters `type`, 
    - ([rendering](https://github.com/joaovitorzv/know-your-taste/blob/main/components/TopItems/topItems.tsx)) To render everything we have a file with 2 independent component functions `topTracks` and `topArtists` to fetch the data they call the custom hook with it's respective parameter and iterate over the data rendering a oriented list with name, image etc

  - [Discover implemenetation](https://github.com/joaovitorzv/know-your-taste/blob/main/components/Discover/discover.tsx)
    - To fetch songs based on the user taste I used the Spotify `recommendations` endpoint that requires 3 "seed" query parameters for genres, artists and tracks which is basically a string, using the `useTopItems()` custom hook implemented before I can reuse the top tracks and artists already fetched and get the `id` and the `genre` of the top artist and the `id` of the top track, on the next api side we handle the spotify request setting a limit to 5 songs
    - ([preview songs](https://github.com/joaovitorzv/know-your-taste/blob/main/components/List/list.tsx#L34)) Spotify returns a 30s MP3 preview of the songs, to make a fancy player there are a round div with the song cover as background and whenever the user starts the player a `<span />` with a little black opacity starts to fill the player using the `transform: translateX()` css property based on how many percent the sound has been playing 
     
    
  - User Playlists Implementation
    // TODO

## License

[MIT](LICENSE)
