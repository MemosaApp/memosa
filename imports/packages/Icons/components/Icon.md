<a name="Icon"></a>

## Icon
The <Icon /> Component allows you to quickly create
accessible icons that also have different icons
depending on the platorm given by the ionPlatform
context.

By default, all icons are hidden. You must provide
`hidden={false}` to make them visible to screenreaders.

The component will warn if an Icon has `hidden={false}`
without `label` being set.

Usage:

```jsx
<Icon
  defaultIcon="fa fa-icon"
  icons={{ android: 'fa fa-android', ios: 'fa fa-ios', web: 'fa fa-web }}
/>
```

**Kind**: global variable  

| Param | Type | Description |
| --- | --- | --- |
| defaultIcon | <code>string</code> | Required. The default icon. |
| icons | <code>object</code> | Optional. Specific icons to use depending on the device |
| hidden | <code>boolean</code> | Optional. Defaults to true. Whether the icon is hidden for screen readers |
| label | <code>string</code> | Optional. Screen reader text. |

