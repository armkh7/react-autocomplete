1. What is the difference between Component and PureComponent? Give an example where it might break my app

The key difference between Component and PureComponent is that the PureComponent performs a shallow comparison of the new props and state with the previous ones before deciding whether to re-render. If the props and state have not changed, it will prevent unnecessary re-renders, which is good for performance. 
However there may be some cases which can lead to unexpected behavior. For example, if you pass mutable data structures (like arrays or objects) as props to a PureComponent, or if your component's props or state contains complex nested structures, a shallow comparison might not catch changes

2. Context + ShouldComponentUpdate might be dangerous. Why is that?

shouldComponentUpdate is used in class components for checking if component should re-render or not. And using it with the context API might be dangerous as it can lead to excessive re-renders.
If the value provided by the context API changes frequently and the shouldComponentUpdate method is not implemented carefully to consider these changes, the component might re-render more often than necessary

3. Describe 3 ways to pass information from a component to its PARENT

We can use Context API, callback functions and state management libraries like redux Redux, Redux-toolkit, Flux or MobX

4. Give 2 ways to prevent components from re-rendering

We can use shouldComponentUpdate method in class components. Write some logic in this method to determine whether a re-render is necessary

And we can use React.memo for functional components, which performs a shallow comparison of the previous and current props and prevents the component from re-rendering if the props are the same

5. What is a fragment and why do we need it? Give an example where it might break my app

Fragment is a way to group multiple elements without adding additional element to the DOM. So, it allows us to avoid additional elemets to be rendered

However, it might break an app if CSS styles were dependent on the structure of the returned JSX

6. Give 3 examples of the HOC pattern

Theming HOC: To provide some style configurations to the component ( dark / light theme )
Internationalization (i18n) HOC: To provide translations based on the user's language settings
Layout HOC: To provide a layout structure to multiple components

7. What's the difference in handling exceptions in promises, callbacks and async…await?

In callbacks, we need to manually check for errors in each callback. This can lead to what's often referred to as "callback hell"
Promises provide a more structured way to handle errors by chaining .then() and .catch()
async / await builds on Promises and error handling is achieved using standard try / catch blocks

8. How many arguments does setState take and why is it async

The setState function takes two arguments. The first one is the state object, and the second one is the callback function which is an optional.
An asynchronous behavior of setState helps in avoiding unnecessary re-renders. So if you call setState multiple times in the same code block, the state updates might be combined into a single re-render

9. List the steps needed to migrate a Class to Function Component

Check what contains the class component's state and what lifecycle methods we have
In the functional component: import all the required dependencies, replace lifecycle methods by using useEffect add state parameters using useState, refactor event handlers and finally, do some testings to make sure everything works as expected

10. List a few ways styles can be used with components

We can use inline styles, styled components, CSS modules, CSS frameworks and libraries like Tailwind / Material UI / Ant Design

11. How to render an HTML string coming from the server

For doing that, we can use dangerouslySetInnerHTML
