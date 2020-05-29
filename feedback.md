# Checklist for Northcoders News Front End
​
## README - write your own and make sure that it:
​
- [ ] has a link to the deployed version
- [ ] provides general info about your app
- [ ] includes links to your back end repo
- [ ] specifies the minimum version of Node required to run locally (check your Node version, `node --version` and use the major version that you are on)
- [ ] has clear instructions on how to run your project locally (`git clone <repo-url>, cd ...`)
​
## UX
​
- ✅ Basic styling added
- ✅ Responsive design
- ✅ Items aligned
  - Some overlapping occurs when the screen becomes too narrow - consider a CSS media query to rearrange columns
- ✅ Content legible (not too wide, obstructed, etc)
- ✅ Refreshing doesn’t cause an issue on sub-pages
- ✅ No errors in the console
- ✅ Votes / Posts / Deletions happen instantly _OR_ give user indication of loading
​
## Functionality
​
### Login
​
- [ ] Some indication of who is logged in
  - We're hardcoded in as 'happyamy2016' - some sort of visual indication of who is signed in would be great
​
### Articles
​
- ✅ Serves all articles / top articles
- ✅ Can vote on articles
- ✅ Can vote a maximum of once in either direction per page load
- ✅ Votes are persistent when page is refreshed
- ✅ Topic pages load only relevant articles (especially when navigating from one topic page to another)
- ✅ Can sort articles by date created / comment_count / votes
​
### Individual Article / Comments
​
- ✅ Individual articles are served with comments
- ✅ Can vote on comments
- ✅ Can vote a maximum of once in either direction per page load
- ✅ Votes are persistent when page is refreshed
- ✅ Can post new comments, which are persistent
- ✅ Can only delete comments of logged in user
  - When forcing a slow connection speed it's possible to click delete several times and receive a 404. Perhaps optimistically remove the comment before making the api call or at the same time - doing this in the `.then()` means we MUST wait for the response
- ✅ Deleted comments don’t re-appear on re-render/refresh
​
### Additional functionality:
​
- [ ] sort comments by date created / votes
- ✅ navigate over pages of articles (if implemented in back-end)
  - When on page 2 (for example) and then navigate to a different topic we are still on page 2. Perhaps revert to page 1 when specifically the topic changes
- [ ] navigate over pages of comments (if implemented in back-end)
- [ ] filter / display articles by specific user
- [ ] post new article
- [ ] delete logged in user's articles
​
## Error Handling
​
- ✅ Bad url
- ✅ Bad topic slug in url
- ✅ Bad article id in url
- ✅ Post comment: (No text in comment body / Can you post without logging in?)
​
## Code
​
- ✅ Well named components
  - Very minor - ArticleVoteUpdator is used for comments as well - perhaps just 'Voter' or 'VoteUpdator'
- ✅ Functional components used where possible
- ✅ Components reused where possible (`Articles` / `Voter`...)
- ✅ Minimal state - don't hold derivable data in state
- ✅ Set state correctly, using previous state where possible
- ✅ Handle asynchronicity clearly (i.e. isLoading pattern)
- ✅ Functions are DRY (`handleChange` for controlled components / api calls)
- ✅ Use object destructuring where possible
  - Some inconsistencies but this is more of an organisational thing
- ✅ Tidy? If not: ESLint / Prettier
- ✅ `node_modules` git ignored
- [ ] No `console.log`s / comments
  - A couple to get rid of when you're done!
- ✅ remove unnecessary files (e.g. App.test.js)
​
## MAKE SURE ALL TESTS ARE STILL PASSING IN BACK END
​
## Once everything else is complete, here are some extra challenges:
​
- [ ] Use `aXe` extension to check for a11y issues
- [ ] Make sure any pure functions are extracted and tested with `Jest`
- [ ] Add integration tests with `cypress`
- [ ] Use Context API for sharing logged in user amongst components
- [ ] Use React Hooks
- [ ] Create a user page where you can change their profile information if they are "logged in as the right user". This will require having an additional PATCH endpoint on your backend
- [ ] Create a view for all the articles a user has liked. This will require additional functionality on your backend
- [ ] Make use of [web sockets](https://en.wikipedia.org/wiki/WebSocket) to allow your page to automatically update with a little notification if there have been any recent posts. [socket.io](https://socket.io/) is quite a good one to use and has some good getting started guides. This will require additional functionality on your backend for recent articles e.g. last 10 minutes
​
## General Comments
​
- Mentioned above - some overlapping when the screen becomes too narrow - could refactor into a grid and relocate left or right column using a media query?
​
- Hardcoding our user in state of App is fine for this project! Just include some sort of indication to the user _who_ is signed in!
​
- Quite a few divs! Remember that React Fragments need to be used when we attempt to return multiple JSX tags out of a render method. If there is one immediate tag being returned, the fragment is not necessary.
​
  - In terms of divs, remember to use the semantic HTML tags wherever possible eg. main, article, section, nav
​
- Mentioned above - When changing topic while on a page greater than 1, we remain on that page - perhaps revert page number to 1 when a topic changes
  - Eg. If we have 10 pages of football articles and 3 pages of cooking articles, switching from football to cooking shouldn't leave us on page 10 with no articles (not the case in this example but you knwo what I mean!)