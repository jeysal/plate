import { OverridesByKey } from '../types/OverridesByKey';
import { PlatePlugin } from '../types/plugins/PlatePlugin';
import { NoInfer } from '../types/utility/NoInfer';
import { overridePluginsByKey } from './overridePluginsByKey';

/**
 * Create plugin factory with a default plugin.
 * The plugin factory:
 * - first param can be used to (deeply) override the default plugin.
 * - second param can be used to (deeply) override a nested plugin (plugin.plugins) by key.
 */
export const createPluginFactory = <P = {}>(
  defaultPlugin: PlatePlugin<{}, NoInfer<P>>
) => <T = {}>(
  overrides?: Partial<PlatePlugin<T, NoInfer<P>>>,
  overridesByKey: OverridesByKey<T, NoInfer<P>> = {}
): PlatePlugin<T, NoInfer<P>> => {
  overridesByKey[defaultPlugin.key] = overrides as any;

  return overridePluginsByKey<T, P>(defaultPlugin as any, overridesByKey);
};