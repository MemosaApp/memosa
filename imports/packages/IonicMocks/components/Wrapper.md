<a name="Wrapper"></a>

## Wrapper
This component simply wraps components, but
exposes context types to your children for
testing

```
import { Wrapper, context } from 'IonicMocks';

// ...

const wrapper = mount(
  <Wrapper><MyComponent /></Wrapper>,
  { context }
);
```

**Kind**: global variable  
