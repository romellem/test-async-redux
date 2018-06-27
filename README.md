This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

To view that project's README, view the markdown file [located here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

# React SPA with Redux, React Router, and Async API Requests

Everytime I start reading other code I end up getting lost because there is just too much
going on! I need to start super basic, and work my way up.

This repo should provide the space to do that.

### What am I building?

So for this, I am looking to create a simple App that does the following:

- Displays a Single Page Application (SPA)
- Uses React for UI, React Router for SPA routes using a Hash Router (e.g., `example.com/#article/5`)
- Retrieves data from an API that returns JSON
- Uses Redux to cache Articles so we don't have to retrieve them from API every time
- Implements _some_ reusable pattern for dealing with these async API requests

That last bullet was what I was struggling with.

Took me a while to find reliable information online that looked at this. Everything I found had too
many assumptions and just dove right in to code examples. I didn't know what I was looking at.

Luckily, I found this:

[What is the right way to do asynchronous operations in Redux?](https://decembersoft.com/posts/what-is-the-right-way-to-do-asynchronous-operations-in-redux/)

That really helped because it looked at a lot of libraries and layed out the type
of scenarios you might want to do.

[This reddit post](https://www.reddit.com/r/reactjs/comments/7yhhnx/reduxsaga_or_reduxobservable/dugwyrj/)
was what originally linked me to that, and it also contains some good links:

- [StackOverflow - Why use Redux-Observable over Redux-Saga?](https://stackoverflow.com/q/40021344)
- [StackOverflow - How to dispatch a Redux action with a timeout?](https://stackoverflow.com/a/38574266)
- [Curated tutorial and resource links on React, Redux, ES6, and more](https://github.com/markerikson/react-redux-links)

