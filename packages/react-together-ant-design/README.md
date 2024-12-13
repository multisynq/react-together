# React Together Ant Design

[![NPM version][npm-image]][npm-url]

This library wraps a series of [Ant Design](https://ant.design/) components to make them synchronized across multiple clients.
All components maintain most of their original API, so you can use them as you would use the original components.

For more information about the wrapped components API, please refer to our [documentation](https://reacttogether.dev/antdesign/Checkbox).

## 📦 Installation

```bash
npm install react-together-ant-design
```

## 🔨 Usage

```tsx
import { CheckboxTogether } from 'react-together-ant-design'

export function YourComponent() {
  return (
    <div>
      <h1>Checkbox Demo</h1>
      <CheckboxTogether rtKey="checkbox-demo" />
    </div>
  )
}
```

Looking for a component that is not supported yet? [Submit a PR](https://github.com/multisynq/react-together/pulls) or [open an issue](https://github.com/multisynq/react-together/issues/new)!

## License

Licensed under the Apache License 2.0, Copyright © 2024-present Croquet Labs.

See [LICENSE](./LICENSE) for more information.

[npm-image]: https://img.shields.io/npm/v/react-together-primereact.svg
[npm-url]: https://www.npmjs.com/package/react-together-primereact
