import { VisFactoryProvider } from 'ui/vis/vis_factory';
import { VisTypesRegistryProvider } from 'ui/registry/vis_types';

const CustomExportVis = (Private) => {
  const VisFactory = Private(VisFactoryProvider);

  return  VisFactory.createBaseVisualization({
    name: 'custom_export',
    title: 'Custom export',
    icon: 'fa_tachometer',
    description: 'Custom export button for Kibana',
  });
}
VisTypesRegistryProvider.register(CustomExportVis);
