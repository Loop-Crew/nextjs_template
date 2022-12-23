This is a [Next.js](https://nextjs.org/) project : Here are the technologies you should be familiar with before starting a project with this stack :

- [Next.js](https://nextjs.org/)
- [Apollo Client](https://www.apollographql.com/docs/react/why-apollo)
- [GraphQL](https://graphql.org/learn/)
- Graphql-codegen
- [Storybook](https://storybook.js.org/)
- [Jest](https://jestjs.io/fr/docs/getting-started)
- I18n
- Husky

## Getting Started

### IDE

You need to use VSCode. With [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) plugins installed. You may need to restart VSCode.

### System Dependencies

You need to install [nvm](https://github.com/creationix/nvm).

Then you need to `nvm use` at the root of the repo to use the good version of node. Install it if needed.

You can also make nvm use automatically the good version of node by installing [this](https://stackoverflow.com/questions/57110542/how-to-write-a-nvmrc-file-which-automatically-change-node-version) script in your .zshrc or .bashrc file.

### Install the dependancies

Run yarn install

```bash
yarn install
```

Start the server

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

If your Prettier plugin says it can not find the Prettier module just run:

```
yarn dlx @yarnpkg/sdks vscode
```

## Configuration

- **The .env file** - `.env` - Describes the env variables used in development environment.
- **The config file** - `src/config/config.js` - Creates a config data structure which can be accessed thoughout the application.

**It is really important to KEEP the .local so as to NOT upload the secrets on git**

### Environment variables

Add a `.env` file at the root.
Here is an exemple on how to fill it but CHANGE the values:

```bash
NEXT_PUBLIC_URL='http://localhost:3000'
NEXT_PUBLIC_API_URL='http://localhost:8080/graphql'
NODE_ENV="development"
```

## Folder structure

`public` : where you store your static files (images, font, etc)

`locales` : where the language files for i18n are stored

`styles` : the global .css files for the project. Note that you should only put global css variables inside this folder, most of your css should be inside your common/components folder inside `.module.css` files in order to allow smaller bundle files in production

`src` : the main folder where you should put your code

- `common` : contains code that is used all over the app

  - `components` contains **stateless** reusable components, part of the UI Kit. These components should mostly receive props and adapt their UI based on the props received.

  - `hooks` contains your custom hooks

  - `types` contains your typescript reusable types (note that most types will be generated with codegen inside services/generated)

- ` features` : contains code specific to business implementation. should contain subfolder grouping specific business logic (like auth, ...). Inside those folders, you will mostly have components with **state**, inside which you call your reusable common components. You will also have your .graphql files where you write your queries and mutations. You should also call your queries and mutation inside those features files (and not inside your common components)

- `lib` contains specific library implementation

- `config` contains configuration files, such as .env loading and routes constants

- `pages` contains the application routes : here you should only create files regarding your routing, and inside those files, call the features needed

- `services` contains the graphql query / mutation hooks and typescript types from the API, generated with codegen

most likely, you will code new features inside the "features" folder.
This features can call stateless reusable components, located inside `common/components`.
When you are done writing your module, you can add it to a page by creating the corresponding file into `pages`

## Apollo Client on top of Next.js

This projet use the Apollo Client to query the graphql API, on top of NextJS. Based on your needs, you can either use Server Side Rendering, Client Side Rendering, Static Site Generation, or a mixt of Client Side Rendering and Static Site Generation.

**Client Side Rendering** is the default behaviour. Use it when data changes quite often and you want the user to see the page as fast as possible, even without data. You can then load data in the client and implement skeleton loaders while data is fetching.

For **Server Side Rendering**, you have to do your queries inside a getServerSideProps method. Use it for front pages where SEO matters and data changes quite often. It will be slower than CSR but can be usefull for SEO.

For **Static Site Generation**, you have to do your queries inside a getStaticProps method. It gets data and generate static (html) files during Build. Use it for data that don't change often, where you don't need user input (for front pages mostly, where no connexion is needed).
You can also implement **Incremental Site Regeneration**, where the site is rebuilt every X hour to take changes into account. This is the best setup for CMS like pages.

An example on how to implement each of them should be included inside `src/pages`

### Apollo implementation choices

There is a few different Apollo implementation possible for server side rendering:

- fetch data in the top level page (server side), pass it as props in all components and sub-components. where you need it. Then send the result to the client. In sub components, get data from props.

- fetch data in the page (server-side), pass it to cache, Then send it to the client. In the sub-components, get data from query hooks just like in CSR. The apollo queries will just get data from cache instead of refetching data.

The second method was prefered for this project: we don't populate the page props with our fetched data, we just pass the apollo cache. It allows us to use queries in our components (instead of just having queries in pages and getting data from props). If we have components shared by two different pages, it will just use the cache instead of having to do a call for every page.

More info [on this here](https://stackoverflow.com/questions/67116297/passing-as-props-vs-extracting-cache-apollo-client-nextjs)

## Using Graphql-Codegen

Graphql-Codegen is a tool that automatically create graphql hooks and types based on the graphql api schema located in the backend server.
When you want to use a new query or mutation, write your graphql in a .graphql file (most likely inside the features folder),
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

When you need to create a new component, you can just copy paste the `components/templates/base` structure, and replace the name BaseTemplate with your component name. This would allow you to have the Storybook structure already built.

## Husky

Husky allow to run command before commit and push. In this project, we use husky to test if tere is not lint error before each commit, and if the project builds correctly before pushing. It explains why commiting and pushing take a while, but it prevent from pushing non working code on github.

**Important note** : based on your locale NodeJS version and installation, you might run into errors where Husky uses a wrong node version and output weird errors when you commit or push. If it is the case, you will most likely need to remove husky from running in order for you to commit and push.

## Languages with I18n

In this project, we use a specific I18n library called [Next-translate](https://www.npmjs.com/package/next-translate?activeTab=readme). It was used for its ease of use and implementation. Note that there is some conflicts between I18n and Storybook in React 18, and you might have a hard time using I18n translations when running your isolated components inside storybook (it will most likely output your variable name istead of the translation, but only in development in storybook, not in production)

## Other stuff

Don't hesitate if anything is missing in this Readme for the project comprehension.
