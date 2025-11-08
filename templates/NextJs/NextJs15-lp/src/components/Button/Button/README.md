## Props

| Prop        | Type                       | Default     | Required | Description          |
| ----------- | -------------------------- | ----------- | -------- | -------------------- |
| `intent`    | `'primary' \| 'secondary'` | `'primary'` | No       | Button style variant |
| `size`      | `'sm' \| 'lg'`             | `'lg'`      | No       | Button size          |
| `underline` | `boolean`                  | `false`     | No       | Text underline style |
| `href`      | `string`                   | -           | Yes      | Link destination     |
| `children`  | `ReactNode`                | -           | Yes      | Button content       |

## Usage

```tsx
import { Button } from "./Button";
// Primary button (default)
<Button href="/" size="lg">
  Click me
</Button>
// Secondary variant
<Button href="/" intent="secondary">
  Learn more
</Button>
```

## Documentation

For more examples and detailed documentation, check the component's Storybook stories.

<!-- ## TODO

- [ ] Add disabled state
- [ ] Add loading state
- [ ] Add icon support
- [ ] Add more variants -->
