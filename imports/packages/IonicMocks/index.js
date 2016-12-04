import ionPlatform from './mocks/ionPlatform';
import WrapperComponent from './components/Wrapper';

/**
 * Simply use this or combine it with your mock
 * context
 *
 * ```
 * import { context } from 'IonicMocks';
 *
 * // ...
 *
 * const wrapper = mount(<MyComponent />, { context });
 * ```
 *
 * @see Wrapper
 */
export const context = {
  ionPlatform,
};

export const Wrapper = WrapperComponent;
