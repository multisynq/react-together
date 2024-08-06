## Contributing

Do you want to contribute your work to React Together? Well, then first and most important, thank you!


The following is a set of contributing guidelines. Please spend a few minutes reading them before you create an issue or pull request.


### Terms and Conditions

We are eager to receive your contributions, but before you do, make sure you are acquainted with our [Terms and Conditions](https://github.com/multisynq/react-together/blob/main/contributing/TERMS_AND_CONDITIONS.md)

### Code of Conduct

We have adopted the [Contributor Covenant](https://www.contributor-covenant.org/) as our Code of Conduct, and we expect project participants to adhere to it. Please read [the full text](https://github.com/multisynq/react-together/blob/main/contributing/CODE_OF_CONDUCT.md) so that you can understand what actions will and will not be tolerated.

### Open Development

All work on React Together happens directly on [GitHub](https://github.com/multisynq/react-together). Both core team members and external contributors send pull requests which go through the same review process.

If you want to make your own package available, we invite you to use the naming scheme `react-together-<your-lib-name>` so it's easier to find by other developers!

#### Bugs
We are using [GitHub Issues](https://github.com/multisynq/react-together/issues) for our public bugs. Before filing a new task, make sure your problem doesn’t already exist. The best way to get your bug fixed is to provide a reduced test case.

#### Proposing a Change

If you intend to change the public API, or introduce a new feature, we recommend [filing an issue](https://github.com/multisynq/react-together/issues/new). This lets us reach an agreement on your proposal before you put significant effort into it.

If you’re only fixing a bug, it’s fine to submit a pull request right away but we still recommend to file an issue detailing what you’re fixing. This is helpful in case we don’t accept that specific fix but want to keep track of the issue.

### Your First Pull Request

If you decide to fix an [issue](https://github.com/multisynq/react-together/issues), please be sure to check the comment thread in case somebody is already working on a fix. If nobody is working on it at the moment, please leave a comment stating that you intend to work on it so other people don’t accidentally duplicate your effort. If somebody claims an issue but doesn’t follow up for more than two weeks, it’s fine to take it over but you should still leave a comment.

**Before submitting a pull request,** please make sure the following is done:

1.  Fork [the repository](https://github.com/multisynq/react-together) and create your branch from `main`.
2.  Run `npm install` in the repository root to start local development.
3.  Make sure your code follows our [Coding Standards](https://github.com/multisynq/react-together/blob/main/contributing/CODING_STANDARDS.md).
4.  Make sure your code lints (`npm run lint`).
5.  Format your code with [prettier](https://github.com/prettier/prettier) (`npm run prettier`).


### Development Workflow

#### Setting up locally 

1. Clone the React Together repository from [GitHub](https://github.com/multisynq/react-together).

``` bash
$ git clone git@github.com:multisynq/react-together.git
$ cd react-together
```

2. Install dependencies and run the playground

``` bash
$ cd playground
$ npm install
$ npm run dev
```

3. Access the playground at [http://localhost:5173](http://localhost:5173).

#### Project Structure

Our monorepo is organized as follows

```
react-together/
├── website/                        # Website source code
├── packages/
│   ├── react-together/             # Main npm package
│   ├── react-together-primereact/  # Additional packages
│   └── ...
└── playground/                     # Development testing environment
```

#### Branch Organization

The React Together repository uses the following branch structure:

```
- website    // Live version of the website
- release    // Latest stable version of npm packages
- main       // Staging area for packages and website (release-ready)
- feature-x  // Individual developer branches for work in progress
```

Important notes:

 - The `website` branch should never contain documentation ahead of the `release` branch;
 - New features should be in their own branch and merged into `main`;
 - Bug fixes can be merged directly into the `main` branch;

#### Development commands

The React Together repository contains the source code for the website and multiple packages. Make sure you run the `npm` commands under the right directory.

Below we list useful commands during development:

*   `npm run dev` runs the project in development mode.
*   `npm run build` builds the package into a `dist` folder.
*   `npm run prettier` formats the source code.
*   `npm run lint` checks the code style.

If your local project uses React Together from `npm` and you want to include your local changes, you may use `npm link` to use your local version of React Together.
To do so, delete `react-together` from your project's dependencies and run the following commands:

``` bash
$ cd ~/path_to_your_react-together_clone/
$ cd packages/react-together
$ npm run build
$ npm run link # Register package locally

$ cd ~/path/to/your/project
$ npm uninstall react-together # Remove npm version
$ npm link react-together # Link to local version
```

#### Editor extensions

If you are using VS Code, it may be useful to install the recommended extensions (if you don't have them already) and to ensure the project settings (under the `.vscode` directory) are in place. This will automate formatting and linting for you.

### License

By contributing to React Together, you agree that your contributions will be licensed under its Apache-2.0 license.

### Getting in Touch

You can get in touch with the project team, as well as with the developer community, via the [Croquet Discord](https://croquet.io/discord).