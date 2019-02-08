import { VisFactoryProvider } from 'ui/vis/vis_factory';
import { VisTypesRegistryProvider } from 'ui/registry/vis_types';
import { Schemas } from 'ui/vis/editors/default/schemas';
import { AggResponseTabifyProvider } from 'ui/agg_response/tabify/tabify';
import visTemplate from './view.html';
import optionsTemplate from './options_template.html';

const CustomExportVis = (Private) => {
  const VisFactory = Private(VisFactoryProvider);

  //return  VisFactory.createBaseVisualization({
  return  VisFactory.createAngularVisualization({
    name: 'custom_export',
    title: 'Custom export',
    icon: 'fa_tachometer',
    description: 'Custom export button for Kibana',
    visConfig: {
      defaults: {
         button_name: "Export",
         filename: "export.txt"
      },
      template: visTemplate,
    },
    editor: 'default',
    editorConfig: {
      optionsTemplate: optionsTemplate,
      schemas: new Schemas([
        {
          group: 'metrics',
          name: 'metric',
          title: 'Metric',
          aggFilter: ['!geo_centroid', '!geo_bounds'],
          min: 1,
          defaults: [
            { type: 'count', schema: 'metric' }
          ]
        },
        {
          group: 'buckets',
          name: 'segment',
          title: 'Row',
          min: 1,
          max: 1,
          aggFilter: ['terms']
        },
      ])
    },

  });
}
VisTypesRegistryProvider.register(CustomExportVis);

import 'angular';
import 'angular-recursion';

//const app = require('ui/modules').get('apps/custom_export', []);
const app = require('ui/modules').get('kibana/custom_export', ['kibana']);

app.controller('CustomExportApp', function ($scope) {
      //const tabifyAggResponse = Private(AggResponseTabifyProvider);

        $scope.button_name = $scope.vis.params.button_name;

        $scope._saveAs = require('@elastic/filesaver').saveAs;

        $scope.exportAsTxt = function (formatted) {
          console.log($scope);
          console.log($scope.esResponse);
          var rows = $scope.esResponse.tables[0].rows;

          var output = rows[0][0];
          for (let i=1; i<rows.length; i++) {
             output = output + "\n" + rows[i][0];
          }

          var blob = new Blob([output], {type: "text/plain;charset=utf-8"});
         
          $scope._saveAs(blob, $scope.vis.params.filename);
        };
});
