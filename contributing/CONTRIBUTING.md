# Contributing

Do you want to contribute your work to ReactTogether? Well, then first and most important: **THANK YOU!**.
The following is a set of contrbuting guidelines. Please spend several minutes reading them before you create an issue or pull request.


### <a name="terms-and-conditions"></a>[Terms and Conditions](#terms-and-conditions)

We are eager to receive your contributions, but before you do, make sure you are acquainted with our [Terms and Conditions](https://github.com/multisynq/react-together/blob/develop/contributing/TERMS_AND_CONDITIONS.md)

### <a name="code-of-conduct"></a>[Code of Conduct](#code-of-conduct)

We have adopted the [Contributor Covenant](https://www.contributor-covenant.org/) as its Code of Conduct, and we expect project participants to adhere to it. Please read [the full text](https://github.com/multisynq/react-together/blob/develop/contributing/CODE_OF_CONDUCT.md) so that you can understand what actions will and will not be tolerated.

### <a name="open-development"></a>[Open Development](#open-development)

All work on ReactTogether happens directly on [GitHub](https://github.com/multisynq/react-together). Both core team members and external contributors send pull requests which go through the same review process.

### <a name="semantic-versioning"></a>[Semantic Versioning](#semantic-versioning)

ReactTogether follows [semantic versioning](https://semver.org/). We release patch versions for critical bugfixes, minor versions for new features or non-essential changes, and major versions for any breaking changes. Every significant change made to the `react-together` package is documented in the [changelog file](https://github.com/multisynq/react-together/blob/develop/react-together/CHANGELOG.md).

### <a name="branch-organization"></a>[Branch Organization](#branch-organization)

Submit your changes directly to the [`main branch`](https://github.com/multisynq/react-together/tree/main/). Code that lands in `main` must be compatible with the latest stable release.

### <a name="bugs"></a>[Bugs](#bugs)

We are using [GitHub Issues](https://github.com/multisynq/react-together/issues) for our public bugs. We keep a close eye on this and try to make it clear when we have an internal fix in progress. Before filing a new task, try to make sure your problem doesn’t already exist. The best way to get your bug fixed is to provide a reduced test case.

### <a name="proposing-a-change"></a>[Proposing a Change](#proposing-a-change)

If you intend to change the public API, or introduce a new feature, we recommend [filing an issue](https://github.com/multisynq/react-together/issues/new). This lets us reach an agreement on your proposal before you put significant effort into it.

If you’re only fixing a bug, it’s fine to submit a pull request right away but we still recommend to file an issue detailing what you’re fixing. This is helpful in case we don’t accept that specific fix but want to keep track of the issue.

### <a name="your-first-pull-request"></a>[Your First Pull Request](#your-first-pull-request)

Working on your first Pull Request? You can learn how from this free video series:

**[How to Contribute to an Open Source Project on GitHub](https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github)**

Feel free to pick an [issue](https://github.com/multisynq/react-together/issues) that you're comfortable with.

If you decide to fix an issue, please be sure to check the comment thread in case somebody is already working on a fix. If nobody is working on it at the moment, please leave a comment stating that you intend to work on it so other people don’t accidentally duplicate your effort.

If somebody claims an issue but doesn’t follow up for more than two weeks, it’s fine to take it over but you should still leave a comment.

### <a name="sending-a-pull-request"></a>[Sending a Pull Request](#sending-a-pull-request)

The core team is monitoring for pull requests. We will review your pull request and either merge it, request changes to it, or close it with an explanation.

**Before submitting a pull request,** please make sure the following is done:

1.  Fork [the repository](https://github.com/multisynq/react-together) and create your branch from `main`.
2.  Run `npm install` in the repository root.
3.  Format your code with [prettier](https://github.com/prettier/prettier) (`npm run prettier`).
4.  Make sure your code lints (`npm run lint`).


### <a name="development-workflow"></a>[Development Workflow](#development-workflow)

To begin with, clone the ReactTogether repository from [GitHub](https://github.com/multisynq/react-together).

```
git clone git@github.com:multisynq/react-together.git
cd react-together
```

Then run the showcase in your local environment at [http://localhost:5173](http://localhost:5173).

```
npm install
npm run dev
```

#### Project Structure
```
 - react-together   // the react-together package
     - models       // Where the Croquet Models are defined
     - hooks        // ReactTogether hooks (where the magic happens)
     - components   // The set of ReactTogether components
       - primereact // Wrapped components
       - ...        // More libraries coming soon!
 - website          // The React Together website
```

#### Development commands

The ReactTogether repository contains the source code for the `react-together` package, for the website, and for the wrapped libraries packages as well. Make sure you run the `npm` commands under the right directory.

Before you start, make sure you run `npm i` to install all the dependencies. Then, you can run several commands:

*   `npm run lint` checks the code style.
*   `npm run dev` runs the project in development mode.
*   `npm run build` builds the package.
*   `npm run prettier` formats the source code according to our style.

If your project uses ReactTogether from npm, you may delete `react-together` from its dependencies and use [`npm link`](https://docs.npmjs.com/cli/v10/commands/npm-link) to point them to your local `build` folder.

```
$ cd ~/path_to_your_react-together_clone/
$ npm run build
$ npm run link

$ cd ~/path/to/your/project
$ npm link react-together
```

### <a name="style-guide"></a>[Style Guide](#style-guide)

We use an automatic code formatter called [Prettier](https://prettier.io/). Run `npm run prettier` after making any changes to the code. If you are using VS Code, make sure you install the recommended extensions (if you don't have them already) and that the project settings (under the `/.vscode` directory) are in place.

However, there are still some styles and conventions that the linter cannot pick up. If you are unsure about something, looking at our [Coding Standards](https://github.com/multisynq/react-together/blob/develop/contributing/CODING_STANDARDS.md) will guide you in the right direction.

Many changes, including bug fixes and documentation improvements can be implemented and reviewed via the normal GitHub pull request workflow. Some changes though are “substantial”, and we ask that these be put through a bit of a design process and produce a consensus among the ReactTogether core team.

### <a name="license"></a>[License](#license)

By contributing to ReactTogether, you agree that your contributions will be licensed under its Apache-2.0 license.

### <a name="getting-in-touch"></a>[Getting in Touch](#getting-in-touch)

You can get in touch with the project team, as well as with the developer community, via the [Multisynq Discord](https://discord.com/invite/6Bvt8vx8NA).