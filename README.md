<div align="center"><a name="readme-top"></a>

# React Together

With React Together, you can _easily_ add real-time multi-user interaction to any React app.

No backend or net-code required!

[![NPM version][npm-image]][npm-url]
[![NPM downloads][download-image]][download-url]
[![NPM size][size-image]][size-url]

  <!-- [![License][license-image]][license-url] -->

[![Join Discord][discord-image]][discord-url]
[![Follow Twitter][twitter-image]][twitter-url]

[Changelog](./react-together/CHANGELOG.md) · [Report Bug][github-issues-url] · [Request Feature][github-issues-url]

![](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

[npm-image]: https://img.shields.io/npm/v/react-together.svg
[npm-url]: https://www.npmjs.com/package/react-together
[download-image]: https://img.shields.io/npm/dm/react-together.svg?style=flat-square
[download-url]: https://npmjs.org/package/react-together
[twitter-image]: https://img.shields.io/twitter/follow/Multisynq.svg?label=Multisynq
[twitter-url]: https://twitter.com/Multisynq
[size-image]: https://img.shields.io/bundlephobia/minzip/react-together?label=size
[size-url]: https://bundlephobia.com/result?p=react-together
[discord-image]: https://img.shields.io/badge/Join%20our%20Discord-7289da
[discord-url]: https://multisynq.io/discord
[github-issues-url]: https://new-issue.ant.design

  <!-- [license-image]: https://img.shields.io/npm/l/react-together.svg
  [license-url]: https://github.com/multisynq/react-together/blob/main/LICENSE -->

</div>

React Together provides a series of hooks that synchronize state across multiple clients.
This allows to build any component you want, such as real-time chat, live cursors and polls, multiplayer games, etc.
It also provides a series of pre-built components to help you get started.

## 📦 Installation

```bash
npm install react-together
```

## 🔨 Usage

The snippet below shows you how easy it is to create a synchronized counter.

```tsx
import { useStateTogether } from 'react-together'

export function SynchronizedCounter() {
  const [value, setValue] = useStateTogether('counter', false)

  return <button onClick={() => setValue((p) => p + 1)}>{value}</button>
}
```

Ready to start using React Together? Check out our [Getting Started](https://react-together.dev/getting-started) guide.

## 🫂 Community

[![Join Discord][discord-image]][discord-url]

Join our active Discord community to get involved with the project, get close support, and share what you're building.

---

[![Follow Twitter][twitter-image]][twitter-url]

Get up to date with the latest news and announcements.

---

<!-- [![Join Discord][discord-image]][discord-url]
[![Follow Twitter][twitter-image]][twitter-url] -->

## 🔗 Useful Links

- [Home page](https://react-together.dev/)
- [Documentation](https://react-together.dev/docs)
- [Change Log](./react-together/CHANGELOG.md)

## 🤝 Contributing [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

Let's build React Together... _together_!!

We warmly invite contributions from everyone. Before you get started, please take a moment to review our [Contributing Guide](https://reacttogether.dev/#/contributing). Feel free to share your ideas through [Pull Requests](https://github.com/multisynq/react-together/pulls) or [GitHub Issues](https://github.com/multisynq/react-together/issues). Enjoy your coding journey! :)

### ⌨️ Local Development

To run and test React Together locally, run the following commands:

```bash
$ git clone git@github.com:multisynq/react-together.git
$ cd react-together
$ npm install
$ npm run build
$ npm run website # This will start the website
$ npm run playground # This will start the playground
```

Open your browser and visit http://localhost:5173.

## License

Licensed under the Apache License 2.0, Copyright © 2024-present Croquet Labs.

See [LICENSE](./LICENSE) for more information.
