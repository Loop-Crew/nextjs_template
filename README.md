This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, select the good node version:

```bash
nvm use
```

Install the dependancies :

```bash
yarn install
```

Start the server

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Apollo Client

This projet use Apollo Client. Based on your needs, you can either use Server Side Rendering, Client Side Rendering, Static Site Generation, or a mixt of Client Side Rendering and Static Site Generation.

**Client Side Rendering** is the default behaviour. Use it when data changes quite often and you want the user to see the page as fast as possible, even without data. You can then load data in the client and implement skeleton loaders while data is fetching.

For **Server Side Rendering**, you have to do your queries inside a getServerSideProps method. Use it for front pages where SEO matters and data changes quite often. It will be slower than CSR but can be usefull for SEO.

For **Static Site Generation**, you have to do your queries inside a getStaticProps method. It gets data and generate static (html) files during Build. Use it for data that don't change often, where you don't need user input (for front pages mostly, where no connexion is needed).
You can also implement **Incremental Site Regeneration**, where the site is rebuilt every X hour to take changes into account. This is the best setup for CMS like pages.

You can get more informations on how to implement each of theses [here](https://developers.wpengine.com/blog/apollo-client-cache-rehydration-in-next-js)

### Apollo implementation choices

There is a few different Apollo implementation possible for server side rendering:

- fetch data in the page (server side), pass it as props for the page, and use it in all sub-components. Then send the result to the client. In sub components, get data from props.

- fetch data in the page (server-side), pass it to cache, Then send it to the client. In the sub-components, get data from query hooks just like in CSR. The apollo queries will just get data from cache instead of refetching data.

The second method was prefered for this project: we don't populate the page props with our fetched data, we just pass the apollo cache. It allows us to use queries in our components (instead of just having queries in pages). If we have components shared by two different pages, it will just use the cache instead of having to do a call for every page.

More info [on this here](https://stackoverflow.com/questions/67116297/passing-as-props-vs-extracting-cache-apollo-client-nextjs)

## Folder structure

`src` : the main folder where you should put your code

- `common` : contains code that is used all over the app
  - `components` contains **stateless** reusable components, part of the UI Kit
  - `types` contains typescript reusable types
- ` modules` : contains code specific to business implementation. should contain subfolder grouping specific business logic (like auth, ...)
- `lib` contains specific library implementation
- `config` contains configuration files
- `pages` contains the application routes
- `services` contains the graphql query / mutation hooks and typescript types from the API

most likely, you will code new features inside the "modules" folder.
This modules can call stateless reusable components, located inside `common/components`.
When you are done writing your module, you can add it to a page by creating the corresponding file into `pages`

## Using Codegen

Codegen is a tool that automatically create graphql hooks based on the graphql api schema.
When you want to use a new query or mutation, write your graphql in a .graphql file (in components or modules),
run `yarn codegen`, and you can then import your React hook in the file you want.

To use, you need to know your graphql api url : if its local, should be something like 'http://localhost:8080/graphql'

Append this url in your `codegen.yml` file, next to schema :

```bashrc
schema: http://127.0.0.1:8080/graphql
```

The code is then written in services/generated

## Using storybook

Storybook allow you to develop and test UI Component in isolation from the rest of the app.

You can see an implementation example in `common/components/stories`

To start storybook, run `yarn storybook`

When you need to create a new component, you can just copy paste the `components/templates/base` structure, and replace the name BaseTemplate with your component name. This would allow you to have the Storybook structure already built
