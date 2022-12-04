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

## Write

## Branch and commits
