import { resolve } from 'path';

export default function (kibana) {
  return new kibana.Plugin({
    require: ['elasticsearch'],
    name: 'custom_export',
    uiExports: {
       visTypes: ['plugins/custom_export/vis']
    },
  });
}

