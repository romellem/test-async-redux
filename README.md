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

### How I am doing async actions in this app

Originally I was trying to mimic the type of middleware found in the
[RealWorld App w/ React and Redux](https://github.com/gothinkster/react-redux-realworld-example-app/blob/master/src/middleware.js#L10).
It seemed to make sense, and looked like it fit a lot of my requirements. However, after looking
at it, and knowing about all the options I have now to choose from, this is just a re-implementation
of [Redux-Promise](https://github.com/redux-utilities/redux-promise)!

I initially liked that approach, because it uses the Promise nature of the Axios request, so
I can just dispatch an async action and this middleware will inject the `_REQUEST` and `_SUCCESS`
actions before my actual request.

However, after reading Dan Abramov's post (listed above) on the [Redux Thunk Middleware](https://stackoverflow.com/a/35415559/864233), as well a post on handling `REQUEST`, `SUCCESS` and
`FAILURE` states with Redux actions in [A Better Way To Handle Loading State In Redux](http://nikolay.rocks/2017-06-18-better-redux-loading)),
I think I am going to go with Thunks.

Without further ado, here is the explanation on where I eventually arrived!

## Central Ideas (or What I Ended Up Doing)

- In this example, to keep things simple, I'm not really making any
  [Presentational components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0).
  This is evident in the fact that all my components ultimately make the requests to load the data
  from our API.
- The way the data is loaded is all done through [Redux](https://redux.js.org/). We dispatch actions
  to load the data, the data is ultimately stored in the state, and we connect the state to our
  components using [React-Redux](https://github.com/reduxjs/react-redux), and the components use
  the data from the state to render the info.
- The entire application is given an "SPA" makeover, and we use [React Router](https://reacttraining.com/react-router/)
  to handle render specific components when a route is matched.
- One key thing with the state is, [we don't save](https://stackoverflow.com/a/36749963/864233)
  a `currentlySelectedArticle` within the Redux state. We let React Router store that information,
  which then passes that data as a [prop](https://reactjs.org/docs/components-and-props.html)
  down to the component. In this case, we only have one variable route (`/article/:id`), so that is
  the `<Article />` is the only component that accesses that data and uses it when we dispatch an action.
- One other key thing with using React Router is allowing the component to re-render when we change
  the URL. So typing in the URL from `/article/1` to `/article/2`. Normally, this wouldn't trigger
  a re-render, but adding a [`componentDidUpdate`](https://reactjs.org/docs/react-component.html#componentdidupdate)
  lifecycle, we can dispatch another fetch action if our ID has changed.
- We use [Action Creators](https://redux.js.org/basics/actions#action-creators) to (obviously) create
  our actions! This allows us to `dispatch(someAction())` as opposed to
  `dispatch({type: SOME_ACTION})`
- The shape of the actual action object should look like a
  [Flux Standard Action](https://github.com/redux-utilities/flux-standard-action).
- The actually action that is dispatched for API requests is _not_ a plain old object but is actually a function!
  More specifically, we are dispatching a [Thunk](https://daveceddia.com/what-is-a-thunk/),
  and we allow Redux to handle this thunk by use of the
  [Thunk middleware](https://github.com/reduxjs/redux-thunk). The main reason we dispatch thunks is
  to handle async action (aka, API calls)
- The thunks we use are actually [async functions](http://mdn.io/async_function), because it allows us
  to [await](http://mdn.io/await) the AJAX request, which is made using the [Axios](https://github.com/axios/axios)
  library.
- Our thunks make use of an idea that async actions should come in [three flavors](https://decembersoft.com/posts/a-simple-naming-convention-for-action-creators-in-redux-js/):
  - The initial **Request**
  - When/if that request **Succeeds**
  - When/if that request **Fails**
- Because these actions are separated, this allows us to cache API data within the store, and when we
  dispatch a thunk, skip the **Request** action because we can just load that data from the store!
