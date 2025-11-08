# PriceDisplay Component

A flexible and customizable component for displaying formatted prices in the application.

## Features

- Formats prices using the `formatPrice` utility function
- Supports different size variants (sm, md, lg, xl)
- Supports different color intent variants (default, primary, success, warning, danger)
- Allows custom className to be passed and merged with default styles
- Fully responsive
- Accessible

## Props

| Prop      | Type                                                         | Default   | Required | Description                        |
| --------- | ------------------------------------------------------------ | --------- | -------- | ---------------------------------- |
| price     | number                                                       | -         | Yes      | The price value to be displayed    |
| className | string                                                       | -         | No       | Optional custom class name         |
| size      | 'sm' \| 'md' \| 'lg' \| 'xl'                                 | 'md'      | No       | Size variant for the price display |
| intent    | 'default' \| 'primary' \| 'success' \| 'warning' \| 'danger' | 'default' | No       | Color intent variant               |

## Usage Examples

### Basic Usage

```jsx
import { PriceDisplay } from '@components/PriceDisplay';

function ProductCard() {
  return (
    <div>
      <h3>Product Title</h3>
      <PriceDisplay price={99.99} />
    </div>
  );
}
```

### With Custom Size and Intent

```jsx
<PriceDisplay price={199.99} size='lg' intent='primary' />
```

### With Custom Class Name

```jsx
<PriceDisplay price={49.99} className='rounded bg-gray-100 p-2' />
```

### Sale Price (Using Intent)

```jsx
<div className='flex items-center gap-2'>
  <PriceDisplay price={79.99} intent='danger' size='lg' />
  <PriceDisplay price={99.99} className='text-gray-400 line-through' size='sm' />
</div>
```

## TODO

- Add support for currency symbol customization
- Add support for discount/sale badge
- Implement price comparison functionality
- Add animation options for price changes
