# AppProvider Component

A provider component that wraps the application to provide theme context and other global functionality.

## Features

- Theme management using `next-themes`
- System theme detection and synchronization
- Dark/light mode support
- Future context providers support (TODO: SC-125)

## Usage

Wrap your application with the `AppProvider`:

```tsx
import { AppProvider } from './components/AppProvider';

function App() {
  return <AppProvider>{/* Your app content */}</AppProvider>;
}
```

## Props

| Prop     | Type      | Required | Description                                        |
| -------- | --------- | -------- | -------------------------------------------------- |
| children | ReactNode | Yes      | The child components to be wrapped by the provider |

## Theme Configuration

The theme provider is configured with the following defaults:

- Attribute: 'class' (for Tailwind dark mode)
- Default theme: 'system'
- System theme detection: enabled

## TODO

- [ ] Implement AppContextProvider (SC-125)
- [ ] Add additional global contexts as needed
- [ ] Add theme persistence
- [ ] Add theme change animations
