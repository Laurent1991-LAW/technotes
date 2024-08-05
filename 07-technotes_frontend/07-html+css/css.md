



垂直方向上配置flex-item

align-items: flex-end / center / flex-start 



水平方向上配置flex-item

justify-content: 



## 字体大小自适应

在Tailwind CSS中，你可以使用响应式前缀来实现字体大小的屏幕自适应。Tailwind CSS提供了一系列的响应式断点，你可以根据不同的屏幕尺寸应用不同的样式。

以下是一个示例，展示了如何使用Tailwind CSS的响应式前缀来设置字体大小：

```html
<div class="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
  这是一个响应式字体大小的示例。
</div>
```



### 字体大小

在这个示例中：

- `text-base` 是默认的字体大小。
- `sm:text-lg` 表示在小屏幕（sm）及以上尺寸时，字体大小为 `lg`。
- `md:text-xl` 表示在中等屏幕（md）及以上尺寸时，字体大小为 `xl`。
- `lg:text-2xl` 表示在大屏幕（lg）及以上尺寸时，字体大小为 `2xl`。
- `xl:text-3xl` 表示在超大屏幕（xl）及以上尺寸时，字体大小为 `3xl`。

### 默认断点

Tailwind CSS的默认断点如下：

- `sm`: 640 px
- `md`: 768 px
- `lg`: 1024 px
- `xl`: 1280 px
- `2xl`: 1536 px

你可以根据需要调整这些断点和对应的字体大小，以实现最佳的屏幕自适应效果。

在Tailwind CSS中，默认的字体大小定义如下：

- `text-sm`: 0.875rem (14px)
- `text-base`: 1rem (16px)
- `text-lg`: 1.125rem (18px)
- `text-xl`: 1.25rem (20px)
- `text-2xl`: 1.5rem (24px)
- `text-3xl`: 1.875rem (30px)

这些值是基于默认的根字体大小为16px。如果你改变了根字体大小，这些值也会相应调整。

要避免代码重复，可以使用Tailwind CSS的“@apply”指令将这些重复的样式组合成一个自定义的类。这样可以在多处使用相同的类，而不是每次都重复写相同的样式。

首先，创建一个自定义的CSS文件（例如，`styles.css`），并在文件中定义你的自定义类：
```css
/* styles.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

.custom-text-sizes {
  @apply sm:text-lg md:text-xl lg:text-2xl xl:text-3xl;
}
```

然后，在你的Tailwind配置文件（例如，`tailwind.config.js`）中导入这个自定义CSS文件:
```javascript
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // 根据你的项目路径调整
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

最后，在你的组件或HTML文件中使用这个自定义类：
```html
<div class="custom-text-sizes">
  这是带有自定义文本大小的内容。
</div>
```

这样就减少了重复代码，并且使你的代码更具可读性和可维护性。

### 字重

在 Tailwind CSS 中，可以使用以下预定义的字重（font-weight）选项来设置文本的粗细：

- `font-thin`: 对应 CSS 的 `font-weight: 100`
- `font-extralight`: 对应 CSS 的 `font-weight: 200`
- `font-light`: 对应 CSS 的 `font-weight: 300`
- `font-normal`: 对应 CSS 的 `font-weight: 400`
- `font-medium`: 对应 CSS 的 `font-weight: 500`
- `font-semibold`: 对应 CSS 的 `font-weight: 600`
- `font-bold`: 对应 CSS 的 `font-weight: 700`
- `font-extrabold`: 对应 CSS 的 `font-weight: 800`
- `font-black`: 对应 CSS 的 `font-weight: 900`

您可以根据需要选择合适的字重类名，来改变文本的显示效果。



## clsx

`clsx` 是一个用于条件性地构建 className 字符串的小型实用工具库。它的作用是在你需要根据条件动态生成 className 字符串时，提供一种简洁而灵活的方式。特别是在使用像 TailwindCSS 这样的实用工具类库时，`clsx` 会非常有帮助。

下面是 `clsx` 的几个主要功能和优点：

1. **条件渲染**: 根据条件添加或移除类名。例如，你可以使用布尔值来决定是否包括某个类名。
2. **简洁的 API**: `clsx` 提供了一个非常简洁的 API，让你能够轻松地组合多个类名。
3. **避免复杂的字符串拼接**: 不需要手动进行字符串拼接，减少了代码的复杂性和错误。
4. **支持对象和数组**: 可以传递对象和数组来动态生成类名。

以下是一个简单的示例，展示了如何使用 `clsx` 与 TailwindCSS 一起定义样式：

```javascript
import clsx from 'clsx';

const Button = ({ isPrimary, isDisabled }) => {
  const buttonClasses = clsx(
    'py-2 px-4 font-semibold rounded-lg',
    {
      'bg-blue-500 text-white': isPrimary,
      'bg-gray-500 text-black cursor-not-allowed': isDisabled,
    }
  );

  return <button className={buttonClasses} disabled={isDisabled}>Click me</button>;
};
```

在上面的例子中：

- `clsx` 根据 `isPrimary` 和 `isDisabled` 的值来动态地生成 `className` 字符串。
- 如果 `isPrimary` 为 `true`，按钮将会有 `bg-blue-500` 和 `text-white` 类。
- 如果 `isDisabled` 为 `true`，按钮将会有 `bg-gray-500`、`text-black` 和 `cursor-not-allowed` 类，并且 `disabled` 属性被设置。

通过使用 `clsx`，可以更方便地将多个类名条件性地组合在一起，而不需要手动拼接字符串。





# Troubleshooting



## 文字向左对齐后右侧易出现留白

以下两者搭配可解决: 

```css
text-align: justify;    
max-width: 300px; 
```

















