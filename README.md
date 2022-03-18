# know your taste

### Project Overview
  In this project I implemented a OAuth flow using the Spotify API, when the user authenticates with his spotify account he's redirected back to a different page, where he can see a Chart of his Top artists popularity, an ordered list of his Top artists and Top Tracks, a discover section with some musics based on his taste where is possible to play a 30sec preview of these songs and finnaly a section showing all the user playlists with a button that opens a modal so the user can rename the playlist.

  - OAuth implementation
    - To implement the OAuth (something that I had never done before) I picked [next-auth-js](https://next-auth.js.org) which comes with built-in support for spotify OAuth, CSRF token validation (wich is something that spotify really recommends while using their API), tab syncing, auto revalidation etc, I just had to implement the token refreshing by myself

  - Charts implementation
    - There are nothing too special with this feature I just really wanted to implement a Chart, for that I used [recharts](http://recharts.org/), basically it's a bar chart that shows the popularity from 0 to 100 of the user Popular artists, by default the orientation is vertical I made It look horizontal, styled every piece to make it fit the application style and wrapped with a responsive container to make the chart responsible (of course)

  - Top Items implementation
    - refactoring rn

  - Discover implemenetation
    // TODO
  - User Playlists Implementation
    // TODO

## License

[MIT](LICENSE)
