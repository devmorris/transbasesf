/*
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
/** api: example[querybuilder]
 *  Edit and execute WFS Queries
 *  ----------------------------
 *  Use the GXP QueryPanel to build and execute WFS spatial and filter-queries.
 */
/** This config assumes the DefaultOptionsWorld.js to be included first!! */
Proj4js.defs["EPSG:3857"] = "+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0; +k=1.0 +units=m +nadgrids=@null +no_defs";
var extent = new OpenLayers.Bounds(-13650000, 4537120, -13611500, 4558760);
Heron.options.map.settings.zoom = 12;
Heron.options.map.settings.center = '-13630000, 4545000';
Heron.options.map.settings.restrictedExtent = extent;
OpenLayers.ProxyHost = "/transbase/cgi-bin/proxy.cgi?url=";
Ext.namespace("Heron.examples");
//TEST

// var queryLayer = "geo_bndry_neighborhoods";
// var protocol= OpenLayers.Protocol.WFS({
// url: "/geoserver/transbase_v1/wfs",
// featureNS: "www.transbasesf.org/wfs", //Just for SE proper featureNS website used in application
// version: "1.1.0",
// srsName: "EPSG:3857",
// featureType: queryLayer,
// schema: "http://transbasesf.org/geoserver/wfs?service=WFS&request=DescribeFeatureType"
// });
// var assetStore = new GeoExt.data.FeatureStore({
// features: 'geo_bndry_neighborhoods',
// fields: [
// 'name', 'key'
// //{name: "type", type: "string"}
// ],
// data: [
// 'gid', 'neighborho'
// ],
// proxy: new GeoExt.data.ProtocolProxy({
// protocol: protocol              
// }),
// autoLoad: true	
// });
// var mobilesStore = new GeoExt.data.FeatureStore({
// layer: queryLayer,
// proxy: new GeoExt.data.ProtocolProxy({
// protocol: new OpenLayers.Protocol.HTTP({
// url: "www.transbasesf.org/geoserver/transbase_v1/ows",
// format: new OpenLayers.Format.GeoJSON()
// })
// }),
// autoLoad: false,
// fields: 'neighborho'})
// var combo = new Ext.form.ComboBox({
// name:'cmb-P', 
// fieldLabel: 'Search for an asset:',
// store: assetStore,
// queryMode: 'local',
// typeAhead: true,
// triggerAction: 'all',
// valueField: 'key',
// displayField: 'name',
// forceSelection: true,
// minChars: 1,   
// })
//THIS ONE WORKS
// var combo2 =  new Ext.form.ComboBox({
// id: 'neighCombo',
// name: 'neigh',
// store: new GeoExt.data.FeatureStore({
// fields: [
// 'neighborho', 'string'      
// ],
// proxy: new GeoExt.data.ProtocolProxy({
// protocol: new OpenLayers.Protocol.HTTP({
// url: "http://transbasesf.org/geoserver/transbase_v1/ows?service=WFS&version=1.1.0&request=GetFeature&typeName=transbase_v1:geo_bndry_neighborhoods&maxFeatures=50&outputFormat=json",
// format: new OpenLayers.Format.GeoJSON()
// })
// }),
// autoLoad: true
// }),
// mode : 'local',
// valueField: 'neighborho',
// displayField: 'neighborho',
// emptyText: 'Neighborhood',
// triggerAction: 'all',
// typeAhead: true 

// })		

// See ToolbarBuilder.js : each string item points to a definition
// in Heron.ToolbarBuilder.defs. Extra options and even an item create function
// can be passed here as well. By providing a "create" function your own toolbar
// item can be added.
// For menu's and other standard ExtJS Toolbar items, the "any" type can be
// used. There you need only pass the options, similar as in the function
// ExtJS Toolbar.add().
/**
 * Copyright (c) 2008-2009 The Open Source Geospatial Foundation
 *
 * Published under the BSD license.
 * See http://svn.geoext.org/core/trunk/geoext/license.txt for the full text
 * of the license.
 */

// Note - original from
// http://dev.geoext.org/geoext/trunk/geoext ... GeoExt.ux.PrintPreview.js
// http://dev.geoext.org/geoext/trunk/geoext ... GeoExt.ux.PrintSimple.js
//
// adapted and extended by: wolfram.winter@gmail.com
// Rev. 2012/11/15
// Rev. 2013/12/12 - mapAttribution, mapPreviewAutoHeight flag
//

Ext.namespace("GeoExt.ux");

/** api: (define)
 *  module = GeoExt.ux
 *  class = PrintPreview
 *  base_link = `Ext.Container <http://dev.sencha.com/deploy/dev/docs/?class=Ext.Container>`_
 */

/** api: constructor
 *  .. class:: PrintPreview
 *
 *  A print preview with an interactive map. Requires a server-side print
 *  module configuration with two custom fields (by default ``mapTitle`` and
 *  ``comment``).
 */

GeoExt.ux.PrintPreview = Ext.extend(Ext.Container, {

    /* begin i18n */
    /** api: config[paperSizeText] ``String`` i18n */
    paperSizeText: "Layout:",
    /** api: config[resolutionText] ``String`` i18n */
    resolutionText: "Resolution:",
    /** api: config[printText] ``String`` i18n */
    printText: "Print",
    /** api: config[emptyTitleText] ``String`` i18n */
    emptyTitleText: "Enter map title here.",
    /** api: config[emptyCommentText] ``String`` i18n */
    emptyCommentText: "Enter comments here.",
    /** api: config[emptyTitleText] ``String`` i18n */
    emptyFooterText: "Enter map footer here.",
    /** api: config[creatingPdfText] ``String`` i18n */
    creatingPdfText: "Creating PDF...",
    /** api: config[creatingPrintText] ``String`` i18n */
    creatingPrintText: "Creating Print...",
    /** api: config[includeLegendText] ``String`` i18n */
    includeLegendText: "Include legend?",
    /** api: config[rotationText] ``String`` i18n */
    rotationText: "Rotation",
    /** api: config[outputFormatText] ``String`` i18n */
    outputFormatText: "Format",
    /* end i18n */

    /** api: config[printProvider]
     *  :class:`GeoExt.data.PrintProvider`|``Object`` Instance or
     *  configuration for the PrintProvider that this dialog will use. Not
     *  required if provided with the
     *  :ref:`GeoExt.ux.PrintPreview.printMapPanel`.
     */

    /** private: property[printProvider]
     *  :class:`GeoExt.data.PrintProvider`
     */
    printProvider: null,

    /** api: config[sourceMap]
     *  :class:`GeoExt.MapPanel`|``OpenLayers.Map`` The map to copy layers and
     *  extent from for printing. Not required if provided with the
     *  :ref:`GeoExt.ux.PrintPreview.printMapPanel`.
     */

    /** private: property[sourceMap]
     *  ``OpenLayers.Map`` The map to copy layers and extent from for printing.
     */
    sourceMap: null,

    /** api: config[printMapPanel]
     *  :class:`GeoExt.PrintMapPanel`:``Object`` Optional. Useful e.g.
     *  for adding a ZoomSlider (via ``items``) or setting map options (like
     *  configuring custom controls or filtering out unsupported layers with
     *  a preaddlayer listener via ``map``).
     *
     *  .. note:: If provided as :class:`GeoExt.PrintMapPanel`, this has to be
     *       configured with ``printProvider`` and ``sourceMap``.
     */

    /** api: property[printMapPanel]
     *  class:`GeoExt.PrintMapPanel` The print preview map. Read-only.
     */
    printMapPanel: null,

    /** api: config[showTitle]
     *  ``Boolean`` If set to true, the 'mapTitleYAML' field will be rendered.
     *  If set to false, the field will not be rendered, but the contents of the
     *  'mapTitleYAML' is given to the print service for the map title - if 'mapTitleYAML'
     *  is set to Null, this will disable the map title print output
     *  Default is true.
     */
    showTitle: true,

    /** api: config[mapTitle]
     *  ``String`` An optional title to set for the mapTitle field when
     *  creating the dialog.
     */
    mapTitle: null,

    /** api: config[mapTitleYAML]
     *  ``String`` The custom field of the print service for the map title
     *  Default is 'mapTitle'.
     */
    mapTitleYAML: "mapTitle",

    /** api: config[showComment]
     *  ``Boolean`` If set to true, the 'mapCommentYAML' field will be rendered.
     *  If set to false, the field will not be rendered, but the contents of the
     *  'mapCommentYAML' is given to the print service for the map comment - if 'mapCommentYAML'
     *  is set to Null, this will disable the comment print output
     *  Default is true.
     */
    showComment: true,

    /** api: config[mapComment]
     *  ``String`` An optional comment to set for the comment field when
     *  creating the dialog.
     */
    mapComment: null,

    /** api: config[mapCommentYAML]
     *  ``String`` The custom field of the print service for the comment
     *  Default is 'mapComment'.
     */
    mapCommentYAML: "mapComment",

    /** api: config[showFooter]
     *  ``Boolean`` If set to true, the 'mapFooterYAML' field will be rendered.
     *  If set to false, the field will not be rendered, but the contents of the
     *  'mapFooterYAML' is given to the print service for the map title - if 'mapFooterYAML'
     *  is set to Null, this will disable the map title print output
     *  Default is true.
     */
    showFooter: true,

    /** api: config[mapFooter]
     *  ``String`` An optional title to set for the mapFooter field when
     *  creating the dialog.
     */
    mapFooter: null,

    /** api: config[mapFooterYAML]
     *  ``String`` The custom field of the print service for the map footer
     *  Default is 'mapFooter'.
     */
    mapFooterYAML: "mapFooter",

    /** api: config[printAttribution]
     *  ``Boolean`` If set to true, the 'mapAttribution' content is given to the print
     *  service for the map attribution - if 'mapAttribution' is set to Null, the map
     *  attributions of the visible layers will be determined and given to the print
     *  service. If set to false, this will disable the map attribution print output.
     *  Default is true.
     */
    printAttribution: true,

    /** api: config[mapAttribution]
     *  ``String`` An optional attribution text to set for the map when
     *  creating the output. If 'mapAttribution' is set to Null, the map
     *  attributions of the visible layers will be determined.
     *  Default is Null.
     */
    mapAttribution: null,

    /** api: config[mapAttributionYAML]
     *  ``String`` The custom field of the print service for the map attribution
     *  Default is 'mapAttribution'.
     */
    mapAttributionYAML: "mapAttribution",

    /** api: config[showLegend]
     *  ``Boolean`` If set to true, the 'legend' select box will be rendered.
     *  If set to false, the select box will not be rendered, but the contents of
     *  'legend' is given to the print service, if 'showLegendChecked' is set to true
     *  Default is true.
     */
    showLegend: true,

    /** api: config[legend]
     *  ref:`GeoExt.LegendPanel` The legend to include. If not provided, the
     *  dialog won't have an option to include the legend.
     */
    mapLegend: null,

    /** api: config[showLegendChecked]
     *  ``Boolean`` Initial status of the "Include legend?" checkbox. Will be
     *  ignored if :ref:`GeoExt.ux.PrintPreview.legend` is not provided.
     */
    showLegendChecked: false,

    /** api: config[showRotation]
     *  ``Boolean`` If set to true, the "Rotation" field will be rendered.
     *  Default is true.
     */
    showRotation: true,

    /** private: property[printRotationPage]
     *  :class:`GeoExt.data.PrintPage` The print page for this form. Useful
     *  e.g. for rotating handles when used in a style map context. Read-only.
     */
    printRotationPage: null,

    /** private: property[printRotationExtent]
     *  :class:`GeoExt.plugins.PrintExtent`
     */
    printRotationExtent: null,

    /** api: config[printRotationExtentOptions]
     *  ``Object`` Optional options for the `GeoExt.plugins.Print` plugin.
     */
    printRotationExtentOptions: null,

    /** api: config[showOutputFormats]
     *  ``Boolean`` should possible outputformats be shown in combobox?
     *  Default is False.
     */
    showOutputFormats: false,

    /** api: config[addMapOverlay]
     *  ``Boolean`` Set to false if no map overlay with scale, scale selector
     *  and north arrow should be added. Default is true.
     */
    addMapOverlay: true,

    /** api: config[mapPreviewAutoHeight]
     *  ``Boolean`` Set to false if no automatic preview map height adjustment
     *  should be done. Default is true.
     */
    mapPreviewAutoHeight: true,

    /** api: config[mapPreviewHeight]
     *  ``Integer`` Static height of the preview map, if no automatic height
     *  adjustment is set by 'mapPreviewAutoHeight'. Default is 250.
     */
    mapPreviewHeight: 250,

    /** api: config[busyMask]
     *  ``Ext.LoadMask`` A LoadMask to use while the print document is
     *  prepared. Optional, will be auto-created with ``creatingPdfText` if
     *  not provided.
     */

    /** private: property[busyMask]
     *  ``Ext.LoadMask``
     */
    busyMask: null,

    /** private: property[form]
     *  ``Ext.form.FormPanel`` The form for this dialog.
     */
    form: null,

    /** private: property[autoEl]
     *  override
     */
    autoEl: "center",

    /** private: property[cls]
     *  override
     */
    cls: "x-panel-body x-panel-body-noheader",

    /** private: method[initComponent]
     */
    initComponent: function() {
        var printMapPanelOptions = {
            sourceMap: this.sourceMap,
            printProvider: this.printProvider
        };
        if (this.printMapPanel) {
            if (!(this.printMapPanel instanceof GeoExt.PrintMapPanel)) {
                printMapPanelOptions.xtype = "gx_printmappanel";
                this.printMapPanel = new GeoExt.PrintMapPanel(
                    Ext.applyIf(this.printMapPanel, printMapPanelOptions));
            }
        } else {
            this.printMapPanel = new GeoExt.PrintMapPanel(
                printMapPanelOptions);
        }
        this.sourceMap = this.printMapPanel.sourceMap;
        this.printProvider = this.printMapPanel.printProvider;

        // Behavior of the print preview map
        this.printMapPanel.autoHeight = this.mapPreviewAutoHeight;
        this.printMapPanel.height = this.mapPreviewHeight;

        // Bugfix issue #144, legends for Vector layers are not supported
        // http://code.google.com/p/geoext-viewer/issues/detail?id=144
        // Just print empty label name for now
        if (this.mapLegend) {
            this.printProvider.encoders.legends.gx_vectorlegend = function(legend) {
                return [{
                    name: '',
                    classes: []
                }];
            }
        }

        if (this.showRotation) {
            this.printRotationPage = new GeoExt.data.PrintPage({
                printProvider: this.printProvider
            });
            this.printRotationExtent = new GeoExt.plugins.PrintExtent(Ext.applyIf({
                pages: [this.printRotationPage],
                layer: this.initialConfig.layer
            }, this.printRotationExtentOptions));
        }

        if (this.printAttribution) {
            var attributions = [];
            if (!this.mapAttribution) {
                // Get attribution from visible layers
                if (this.sourceMap && this.sourceMap.layers) {
                    for (var i = 0, len = this.sourceMap.layers.length; i < len; i++) {
                        var layer = this.sourceMap.layers[i];
                        if (layer.attribution && layer.getVisibility()) {
                            // Add attribution only if attribution text is unique
                            if (OpenLayers.Util.indexOf(attributions, layer.attribution) === -1) {
                                attributions.push(layer.attribution);
                            }
                        }
                    }
                    this.mapAttribution = attributions;
                }
            }
        } else {
            this.mapAttribution = null;
        }

        this.form = this.createForm();

        if (!this.items) {
            this.items = [];
        }
        this.items.push(this.createToolbar(), {
            xtype: "container",
            cls: "gx-printpreview",
            // autoHeight: this.autoHeight,
            // autoWidth: this.autoWidth,
            autoHeight: this.printMapPanel.autoHeight ? this.autoHeight : true,
            autoWidth: this.printMapPanel.autoHeight ? this.autoWidth : true,
            items: [
                this.form,
                this.printMapPanel
            ]
        });

        GeoExt.ux.PrintPreview.superclass.initComponent.call(this);

        this.addMapOverlay && this.printMapPanel.add(this.createMapOverlay());

        if (this.showRotation) {
            this.printMapPanel.initPlugin(this.printRotationExtent);
        }

        this.printMapPanel.on({
            "resize": this.updateSize,
            scope: this
        });
        this.on({
            "render": function() {
                if (!this.busyMask) {
                    this.busyMask = new Ext.LoadMask(this.getEl(), {
                        msg: this.showOutputFormats ? this.creatingPrintText : this.creatingPdfText
                    });
                }
                this.printProvider.on({
                    "beforeprint": this.busyMask.show,
                    "print": this.busyMask.hide,
                    "printexception": this.busyMask.hide,
                    scope: this.busyMask
                });
            },
            scope: this
        });

    },

    /** private: method[createToolbar]
     *  :return: ``Ext.Toolbar``
     */
    createToolbar: function() {
        var items = [];
        this.printProvider.layouts.getCount() > 1 && items.push(this.paperSizeText, {
            xtype: "combo",
            width: 100,
            plugins: new GeoExt.plugins.PrintProviderField({
                printProvider: this.printProvider
            }),
            store: this.printProvider.layouts,
            displayField: "name",
            typeAhead: true,
            mode: "local",
            forceSelection: true,
            triggerAction: "all",
            selectOnFocus: true
        }, "&nbsp;");
        this.printProvider.dpis.getCount() > 1 && items.push(this.resolutionText, {
            xtype: "combo",
            width: 65,
            plugins: new GeoExt.plugins.PrintProviderField({
                printProvider: this.printProvider
            }),
            store: this.printProvider.dpis,
            displayField: "name",
            tpl: '<tpl for="."><div class="x-combo-list-item">{name} dpi</div></tpl>',
            typeAhead: true,
            mode: "local",
            forceSelection: true,
            triggerAction: "all",
            selectOnFocus: true,
            setValue: function(v) {
                v = parseInt(v) + " dpi";
                Ext.form.ComboBox.prototype.setValue.apply(this, arguments);
            }
        }, "&nbsp;");
        // items.push("-");
        items.push("->", {
            text: "&nbsp;" + this.printText,
            iconCls: "icon-print",
            handler: function() {
                if (!this.showRotation) {
                    this.printMapPanel.print(this.showLegendChecked && {
                        legend: this.mapLegend
                    });
                } else {
                    this.printRotationExtent.print(this.showLegendChecked && {
                        legend: this.mapLegend
                    });
                }
            },
            scope: this
        });
        return {
            xtype: "toolbar",
            enableOverflow: true,
            items: items
        };
    },

    /** private: method[stripHTML]
     *  :return: ``Text``
     */
    stripHTML: function(html) {
        var tmp = document.createElement("DIV");
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || "";
    },

    /** private: method[createForm]
     *  :return: ``Ext.form.FormPanel``
     */
    createForm: function() {
        var titleCfg = {
            xtype: "textfield",
            name: this.mapTitleYAML,
            value: this.mapTitle,
            emptyText: this.emptyTitleText,
            hideLabel: true,
            cls: "x-form-item",
            hidden: !this.showTitle,
            plugins: new GeoExt.plugins.PrintProviderField({
                printProvider: this.printProvider
            })
        };

        var commentCfg = {
            xtype: "textarea",
            name: this.mapCommentYAML,
            value: this.mapComment,
            emptyText: this.emptyCommentText,
            hideLabel: true,
            cls: "x-form-item",
            hidden: !this.showComment,
            plugins: new GeoExt.plugins.PrintProviderField({
                printProvider: this.printProvider
            })
        };

        var footerCfg = {
            xtype: "textfield",
            name: this.mapFooterYAML,
            value: this.mapFooter,
            emptyText: this.emptyFooterText,
            hideLabel: true,
            cls: "x-form-item",
            hidden: !this.showFooter,
            plugins: new GeoExt.plugins.PrintProviderField({
                printProvider: this.printProvider
            })
        };

        var attributionCfg = {
            xtype: "textfield",
            name: this.mapAttributionYAML,
            value: this.mapAttribution ? this.stripHTML(this.mapAttribution) : "",
            hidden: true,
            plugins: new GeoExt.plugins.PrintProviderField({
                printProvider: this.printProvider
            })
        };

        var advancedItems = [];

        if (this.showOutputFormats) {
            advancedItems.push(this.outputFormatText + ':', {
                xtype: "combo",
                width: 62,
                listWidth: 80,
                plugins: new GeoExt.plugins.PrintProviderField({
                    printProvider: this.printProvider
                }),
                store: this.printProvider.outputFormats,
                displayField: "name",
                tpl: '<tpl for="."><div class="x-combo-list-item">{name}</div></tpl>',
                typeAhead: true,
                mode: "local",
                forceSelection: true,
                triggerAction: "all",
                selectOnFocus: true,
                setValue: function(v) {
                    Ext.form.ComboBox.prototype.setValue.apply(this, arguments);
                }
            }, {
                xtype: 'tbspacer',
                width: 12
            });
        }

        if (this.showRotation) {
            advancedItems.push(
                this.rotationText + ":", {
                    xtype: "numberfield",
                    name: "rotation",
                    value: 0,
                    hideLabel: true,
                    width: 40,
                    allowBlank: false,
                    allowNegative: false,
                    allowDecimals: false,
                    decimalPrecision: 0,
                    minValue: -360,
                    maxValue: 360,
                    enableKeyEvents: true,
                    plugins: new GeoExt.plugins.PrintPageField({
                        printPage: this.printRotationPage
                    })
                }, {
                    xtype: 'tbspacer',
                    width: 12
                }
            );
        }

        if (this.mapLegend) {
            advancedItems.push('->', new Ext.form.Checkbox({
                name: "mapLegend",
                checked: this.showLegendChecked,
                boxLabel: this.includeLegendText,
                hideLabel: true,
                ctCls: "gx-item-nowrap",
                hidden: !this.showLegend,
                handler: function(cb, checked) {
                    this.showLegendChecked = checked;
                },
                scope: this
            }));
        }

        var formItems = [titleCfg, commentCfg, footerCfg, attributionCfg];
        advancedItems.length > 0 && formItems.push({
            xtype: "toolbar",
            cls: "x-form-item",
            items: advancedItems
        });
        return new Ext.form.FormPanel({
            autoHeight: true,
            border: false,
            defaults: {
                anchor: "100%"
            },
            items: formItems
        });
    },

    /** private: method[createMapOverlay]
     *  :return: ``Ext.Panel``
     */
    createMapOverlay: function() {
        var map = this.printMapPanel.map;
        var scaleLine = new OpenLayers.Control.ScaleLine({
            geodesic: !(map.getProjectionObject() || new OpenLayers.Projection(map.projection || "EPSG:3857")).equals("EPSG:3857")
        });
        map.addControl(scaleLine);
        scaleLine.activate();
        return new Ext.Panel({
            cls: "gx-map-overlay",
            layout: "column",
            width: 235,
            bodyStyle: "padding:5px",
            items: [{
                xtype: "box",
                el: scaleLine.div,
                width: scaleLine.maxWidth
            }, {
                xtype: "container",
                layout: "form",
                style: "padding: .2em 5px 0 0;",
                columnWidth: 1,
                cls: "x-small-editor x-form-item",
                items: {
                    xtype: "combo",
                    name: "scale",
                    anchor: "100%",
                    hideLabel: true,
                    store: this.printMapPanel.previewScales,
                    displayField: "name",
                    typeAhead: true,
                    mode: "local",
                    forceSelection: true,
                    triggerAction: "all",
                    selectOnFocus: true,
                    getListParent: function() {
                        return this.el.up(".x-window") || document.body;
                    },
                    plugins: (!this.showRotation) ?
                        new GeoExt.plugins.PrintPageField({
                            printPage: this.printMapPanel.printPage
                        }) : new GeoExt.plugins.PrintPageField({
                            printPage: this.printRotationPage
                        })
                }
            }, {
                xtype: "box",
                autoEl: {
                    tag: "div",
                    cls: "gx-northarrow"
                }
            }],
            listeners: {
                "render": function() {
                    function stop(evt) {
                        evt.stopPropagation();
                    }

                    this.getEl().on({
                        "click": stop,
                        "dblclick": stop,
                        "mousedown": stop
                    });
                }
            }
        });
    },

    /** private: method[updateSize]
     *  sync the form's width with the map with, and make sure that the window
     *  shadow is updated if this dialog is added to an ``Ext.Window``
     */
    updateSize: function() {
        this.suspendEvents();
        var mapWidth = this.printMapPanel.getWidth();
        // sync form and toolbar width with map width
        this.form.setWidth(mapWidth);
        // the line with title and legend needs an extra invitation
        this.form.items.get(0).setWidth(mapWidth);
        var minWidth = this.initialConfig.minWidth || 0;
        this.items.get(0).setWidth(
            this.form.ownerCt.el.getPadding("lr") + Math.max(mapWidth, minWidth)
        );
        // shadow does not sync, so do it manually
        var parent = this.ownerCt;
        if (parent && parent instanceof Ext.Window) {
            this.ownerCt.syncShadow();
        }
        this.resumeEvents();
    },

    /** private: method[beforeDestroy]
     */
    beforeDestroy: function() {
        if (this.busyMask) {
            this.printProvider.un("beforeprint", this.busyMask.show, this.busyMask);
            this.printProvider.un("print", this.busyMask.hide, this.busyMask);
        }
        this.printMapPanel.un("resize", this.updateSize, this);
        GeoExt.ux.PrintPreview.superclass.beforeDestroy.apply(this, arguments);
    }

});
GeoExt.Lang.add("en", {

    "GeoExt.ux.PrintPreview.prototype": {
        paperSizeText: "Layout:",
        resolutionText: "Resolution:",
        printText: "Print",
        emptyTitleText: "Enter map title here.",
        emptyCommentText: "Enter comments here.",
        emptyFooterText: "Enter map footer here.",
        rotationText: "Rotation",
        includeLegendText: "Include legend?",
        creatingPdfText: "Creating PDF...",
        creatingPrintText: "Creating Print...",
        outputFormatText: "Format"
    }

});


/** api: xtype = gxux_printpreview */
Ext.reg("gxux_printpreview", GeoExt.ux.PrintPreview);


Heron.examples.searchPanelConfig = {
    xtype: 'hr_multisearchcenterpanel',
    height: 600,
    width: 800,
    hropts: [{
        searchPanel: {
            xtype: 'hr_gxpquerypanel',
            name: 'Search by Attributes',
            description: 'This search uses both search within Map extent and/or your own attribute criteria',
            header: false,
            border: false,
            layerSortOrder: 'ASC',
            maxFeatures: 1000,
            spatialQuery: false,
            attributeQuery: true,
            caseInsensitiveMatch: false,
            autoWildCardAttach: false,
        },
        resultPanel: {
            xtype: 'hr_featuregridpanel',
            id: 'hr-featuregridpanel_1',
            header: false,
            border: false,
            autoConfig: true,
            exportFormats: [],
            showTopToolbar: true,
            // Option values are 'Table' and 'Detail', default is 'Table'
            displayPanels: ['Detail', 'Table'],
            hropts: {
                zoomOnRowDoubleClick: true,
                zoomOnFeatureSelect: false,
                zoomLevelPointSelect: 17,
                zoomToDataExtent: true
            }
        }
    }, {
        searchPanel: {
            xtype: 'hr_searchbydrawpanel',
            name: 'Search by Drawing',
            maxFeatures: 1000,
            header: false
        },
        resultPanel: {
            xtype: 'hr_featuregridpanel',
            id: 'hr-featuregridpanel_2',
            header: false,
            autoConfig: true,
            exportFormats: [],
            showTopToolbar: true,
            // Option values are 'Table' and 'Detail', default is 'Table'
            displayPanels: ['Detail', 'Table'],
            hropts: {
                zoomOnRowDoubleClick: true,
                zoomOnFeatureSelect: false,
                zoomLevelPointSelect: 17,
                zoomToDataExtent: false
            }
        }
    }, {
        searchPanel: {
            xtype: 'hr_searchbyfeaturepanel',
            name: 'Search by Feature Selection',
            description: 'Select feature-geometries from one layer and use these to perform a spatial search in another layer.',
            header: false,
            border: false,
            bodyStyle: 'padding: 6px',
            maxFeatures: 1000,
            style: {
                fontFamily: 'Verdana, Arial, Helvetica, sans-serif',
                fontSize: '12px'
            }
        },
        resultPanel: {
            xtype: 'hr_featuregridpanel',
            id: 'hr-featuregridpanel',
            showTopToolbar: true,
            // Option values are 'Table' and 'Detail', default is 'Table'
            displayPanels: ['Detail', 'Table'],
            header: false,
            border: false,
            autoConfig: true,
            exportFormats: [],
            hropts: {
                zoomOnRowDoubleClick: true,
                zoomOnFeatureSelect: false,
                zoomLevelPointSelect: 17,
                zoomToDataExtent: true
            }
        }
    }]
};

Heron.options.map.toolbar = [{
        type: "featureinfo",
        options: {
            //pressed: true,
            popupWindow: {
                width: 460,
                height: 200,
                featureInfoPanel: {
                    showTopToolbar: true,
                    // Option values are 'Table' and 'Detail', default is 'Table'
                    displayPanels: ['Detail', 'Table'],
                    // Export to download file. Option values are 'CSV', 'XLS', default is no export (results in no export menu).
                    //  exportFormats: ['CSV', 'XLS', 'GMLv2', 'Shapefile', 'GeoJSON', 'WellKnownText'],
                    exportFormats: [],
                    hideColumns: ['objectid', 'gid'],
                    maxFeatures: 10,
                    autoConfigMaxSniff: 10,
                    hropts: {
                        zoomOnRowDoubleClick: true,
                        zoomOnFeatureSelect: false,
                        zoomLevelPointSelect: 17,
                        zoomToDataExtent: true
                    },
                    // In case that the same layer would be requested more than once: discard the styles
                    discardStylesForDups: true
                }
            }
        }
    }, {
        type: "-"
    }, {
        type: "pan"
    }, {
        type: "zoomin"
    }, {
        type: "zoomout"
    }, {
        type: "zoomvisible"
    }, {
        type: "-"
    }, {
        type: "zoomprevious"
    }, {
        type: "zoomnext"
    }, {
        type: "-"
    }, {
        type: "printdialog",
        options: {
            url: 'http://transbasesf.org/print-servlet-2.0-SNAPSHOT/pdf/',
            srs: 'ESPG:3857',
            tooltip: 'Print dialog popup with print preview map',
            legendDefaults: {
                useScaleParameter: false,
                baseParams: {
                    FORMAT: 'image/png',
                    LEGEND_OPTIONS: 'fontName:Gill Sans MT;fontSize:8;dpi:660;fontAntiAliasing:true;'
                }
            },
            windowWidth: 360,
            showTitle: false
                // , mapTitle: 'My Header - Print Dialog'
                // , mapTitleYAML: "mapTitle"		// MapFish - field name in config.yaml - default is: 'mapTitle'
                ,
            showComment: false
                // , mapComment: 'My Comment - Print Dialog'
                // , mapCommentYAML: "mapComment"	// MapFish - field name in config.yaml - default is: 'mapComment'
                ,
            showFooter: false
                // , mapFooter: 'My Footer - Print Dialog'
                // , mapFooterYAML: "mapFooter"	    // MapFish - field name in config.yaml - default is: 'mapFooter'
                // , printAttribution: true         // Flag for printing the attribution
                // , mapAttribution: null           // Attribution text or null = visible layer attributions
                // , mapAttributionYAML: "mapAttribution" // MapFish - field name in config.yaml - default is: 'mapAttribution'
                ,
            showOutputFormats: true,
            showRotation: true,
            showLegend: true,
            showLegendChecked: true,
            mapLimitScales: true,
            mapPreviewAutoHeight: false // Adapt height of preview map automatically, if false mapPreviewHeight is used.
                // , mapPreviewHeight: 400
        }
    }, {
        type: "-"
    }, {
        type: "searchcenter",
        // Options for SearchPanel window
        options: {
            iconCls: null,
            tooltip: 'Search for features in datasets',
            text: "Query Datasets",
            show: false,
            searchWindow: {
                title: 'Multiple Searches',
                x: 100,
                y: undefined,
                width: 620,
                height: 440,
                items: [
                    Heron.examples.searchPanelConfig
                ]
            }
        }
    }, {
        type: "-"
    }, {
        type: "any",
        options: {
            tooltip: 'Filter and search metadata table',
            text: 'Search Metadata',
            handler: function() {
                window.open("../metatable/metatable.php");
            }
        }
    },
	{
        type: "-"
    }, 		
	{
        type: "->"
    }, 	
	{
        type: "namesearch",
        // Optional options, see NominatimSearchCombo.js, here we restrict search to San Francisco.
        options: {
            url: 'http://nominatim.openstreetmap.org/search?format=json&addressdetails=1&countrycodes=us&bounded=1&viewbox=-122.57,37.84,-122.31,37.7&limit=3',
            xtype: 'hr_nominatimsearchcombo',
            emptyText: 'Search for Address in' + ' San Francisco',
            tpl: '<tpl for="."><tpl for="address"><div class="x-combo-list-item">{house_number} {road} {city} {state}</div></tpl></tpl>',
            displayTpl: '<tpl for="."><tpl for="address">{house_number} {road} {city} {state}</tpl></tpl>'
        }
    },
	{
        type: "-"
    },
    // {type: "any", options:combo2},
	{
        type: "any",
        options: {
            tooltip: "Helpful documentation and tools",
            icon: "resources/images/icons/question3.png",
            text: null,
            menu: {
                items: [{
                    text: 'User Manual',
                    handler: function() {
                        window.open("documentation/TransBASE_User_Manual_DRAFT_20140228.pdf");
                    }
                }, {
                    text: 'About/FAQ',
                    handler: function() {
                        window.open("../faq/faq.php");
                    }
                }, {
                    text: 'Technical Manual',
                    handler: function() {
                        window.open("documentation/TransBASE_Technical_Design_Manual_DRAFT_20140922.pdf");
                    }
                }, {
                    text: 'YouTube',
                    handler: function() {
                        window.open("../youtube/youtube.php");
                    }
                }, {
                    text: 'New Datasets',
                    handler: function() {
                        window.open("../newdatasets/newdatasets.php");
                    }
                }, {
                    text: 'Bug Report',
                    handler: function() {
                        window.open("../bugreport/bugpage.php");
                    }
                }, ]
            }
        }
    },
];
/*
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * Some Heron components derive from GXP classes.
 * This would  require the entire GXP lib to be included.
 * This file is needed when NOT using GXP or Heron-GXP-derived classes
 * such that including GXP is not required.
 */

Ext.namespace("gxp");
if (!gxp.QueryPanel) {
    // Just make a null def for the query Panel
    gxp.QueryPanel = function() {};
} else {
    /** GXP is used. Below fixes that did not make it into the Boundless GXP Master branch or were too kludgy. */

    /** api: (define)
     *  module = gxp.data
     *  class = WFSProtocolProxy
     *  base_link = `Ext.data.DataProxy <http://extjs.com/deploy/dev/docs/?class=Ext.data.DataProxy>`_
     */
    Ext.namespace("gxp.data");

    gxp.data.WFSProtocolProxy = Ext.extend(GeoExt.data.ProtocolProxy, {

        /** api: method[setFilter]
         *  :arg filter: ``OpenLayers.Filter`` Filter to be set on the WFS protocol.
         *
         *  Does not trigger anything on the protocol (for now).
         */
        setFilter: function(filter) {
            this.protocol.filter = filter;
            // TODO: The protocol could use a setFilter method.
            this.protocol.options.filter = filter;
        },

        /** api: constructor
         *  .. class:: WFSProtocolProxy
         *
         *      A data proxy for use with ``OpenLayers.Protocol.WFS`` objects.
         *
         *      This is mainly to extend Ext 3.0 functionality to the
         *      GeoExt.data.ProtocolProxy.  This could be simplified by having
         *      the ProtocolProxy support writers (implement doRequest).
         */
        constructor: function(config) {

            Ext.applyIf(config, {

                /** api: config[version]
                 *  ``String``
                 *  WFS version.  Default is "1.1.0".
                 */
                version: "1.1.0"

                /** api: config[maxFeatures]
                 *  ``Number``
                 *  Optional limit for number of features requested in a read.  No
                 *  limit set by default.
                 */

                /** api: config[multi]
                 *  ``Boolean`` If set to true, geometries will be casted to Multi
                 *  geometries before writing. No casting will be done for reading.
                 */

            });

            // create the protocol if none provided
            if (!(this.protocol && this.protocol instanceof OpenLayers.Protocol)) {
                config.protocol = new OpenLayers.Protocol.WFS(Ext.apply({
                    version: config.version,
                    srsName: config.srsName,
                    url: config.url,
                    featureType: config.featureType,
                    featureNS: config.featureNS,
                    geometryName: config.geometryName,
                    schema: config.schema,
                    filter: config.filter,
                    maxFeatures: config.maxFeatures,
                    // VERY VERY NASTY FIX: but the Dutch National SDI (PDOK) still uses an old GeoServer version
                    // which returns "null" namespaces for the default GML3 format. So force GML2 for that domain.
                    // Remove entire override when PDOK have their act together.
                    // JvdB oct 30, 2013.
                    outputFormat: config.url.indexOf('transbasesf') > 0 ? 'GML2' : undefined,
                    multi: config.multi
                }, config.protocol));
            }

            gxp.data.WFSProtocolProxy.superclass.constructor.apply(this, arguments);
        },


        /** private: method[doRequest]
         *  :arg action: ``String`` The crud action type (create, read, update,
         *      destroy)
         *  :arg records: ``Array(Ext.data.Record)`` If action is load, records will
         *      be null
         *  :arg params: ``Object`` An object containing properties which are to be
         *      used as request parameters.
         *  :arg reader: ``Ext.data.DataReader`` The Reader object which converts
         *      the data object into a block of ``Ext.data.Record`` objects.
         *  :arg callback: ``Function``  A function to be called after the request.
         *      The callback is passed the following arguments: records, options,
         *      success.
         *  :arg scope: ``Object`` The scope in which to call the callback.
         *  :arg arg: ``Object`` An optional argument which is passed to the
         *      callback as its second parameter.
         */
        doRequest: function(action, records, params, reader, callback, scope, arg) {

            // remove the xaction param tagged on because we're using a single url
            // for all actions
            delete params.xaction;

            if (action === Ext.data.Api.actions.read) {
                this.load(params, reader, callback, scope, arg);
            } else {
                if (!(records instanceof Array)) {
                    records = [records];
                }
                // get features from records
                var features = new Array(records.length),
                    feature;
                Ext.each(records, function(r, i) {
                    features[i] = r.getFeature();
                    feature = features[i];
                    feature.modified = Ext.apply(feature.modified || {}, {
                        attributes: Ext.apply(
                            (feature.modified && feature.modified.attributes) || {},
                            r.modified
                        )
                    });
                }, this);


                var o = {
                    action: action,
                    records: records,
                    callback: callback,
                    scope: scope
                };

                var options = {
                    callback: function(response) {
                        this.onProtocolCommit(response, o);
                    },
                    scope: this
                };

                Ext.applyIf(options, params);

                this.protocol.commit(features, options);
            }

        },


        /** private: method[onProtocolCommit]
         *  Callback for the protocol.commit method.  Called with an additional
         *  object containing references to arguments to the doRequest method.
         */
        onProtocolCommit: function(response, o) {
            if (response.success()) {
                var features = response.reqFeatures;
                // deal with inserts, updates, and deletes
                var state, feature;
                var destroys = [];
                var insertIds = response.insertIds || [];
                var i, len, j = 0;
                for (i = 0, len = features.length; i < len; ++i) {
                    feature = features[i];
                    state = feature.state;
                    if (state) {
                        if (state == OpenLayers.State.DELETE) {
                            destroys.push(feature);
                        } else if (state == OpenLayers.State.INSERT) {
                            feature.fid = insertIds[j];
                            ++j;
                        } else if (feature.modified) {
                            feature.modified = {};
                        }
                        feature.state = null;
                    }
                }

                for (i = 0, len = destroys.length; i < len; ++i) {
                    feature = destroys[i];
                    feature.layer && feature.layer.destroyFeatures([feature]);
                }

                /**
                 * TODO: Update the FeatureStore and FeatureReader to work with
                 * callbacks from 3.0.
                 *
                 * The callback here is the result of store.createCallback.  The
                 * signature should be what is expected by the anonymous function
                 * created in store.createCallback: (data, response, success).  The
                 * callback is a wrapped version of store.onCreateRecords etc.
                 *
                 * The onCreateRecords method calls reader.realize, which expects a
                 * primary key in the data.  Though it *feels* like the job of the
                 * reader, we need to create valid record data here (eventually to
                 * be passed to reader.realize).  The reader.realize method calls
                 * reader.extractValues - which seems like a nice place to grab the
                 * fids from the features.  However, we need the fid in the data
                 * object *before* extractValues is called.  So, we create a basic
                 * data object with just the id (mapping determined by
                 * reader.meta.idProperty or, for Ext > 3.0, reader.getId) and the
                 * state property, which is always reset to null after a commit.
                 *
                 * After the reader.realize method determines that the data is valid
                 * (determined by reader.isValid(data)), then extractValues gets
                 * called - where it will create values objects (to be set as
                 * record.data) from data.features.
                 *
                 * An important thing to note here is that though we may have "batch"
                 * set to true, the store.save sequence issues one request per action.
                 * So, we should *never* be here with a mix of features (deleted,
                 * updated, created).
                 *
                 * Bottom line (based on my current understanding): we need to
                 * implement extractValues for the FeatureReader.
                 */
                len = features.length;
                var data = new Array(len);
                var f;
                for (i = 0; i < len; ++i) {
                    f = features[i];
                    // TODO - check if setting the state to null here is appropriate,
                    // or if feature state handling should rather be done in
                    // GeoExt.data.FeatureStore
                    data[i] = {
                        id: f.id,
                        feature: f,
                        state: null
                    };
                    var fields = o.records[i].fields;
                    for (var a in f.attributes) {
                        if (fields.containsKey(a)) {
                            data[i][a] = f.attributes[a];
                        }
                    }
                }

                o.callback.call(o.scope, data, response.priv, true);
            } else {
                // TODO: determine from response if exception was "response" or "remote"
                var request = response.priv;
                if (request.status >= 200 && request.status < 300) {
                    // service exception with 200
                    this.fireEvent("exception", this, "remote", o.action, o, response.error, o.records);
                } else {
                    // non 200 status
                    this.fireEvent("exception", this, "response", o.action, o, request);
                }
                o.callback.call(o.scope, [], request, false);
            }

        }

    });


}

Ext.onReady(function() {
    Ext.Msg.show({
        title: 'Disclaimer',
        msg: "This data is being provided as public information as defined under San Francisco and " +
            "California public records laws. The San Francisco Department of Public Health (SFDPH, " +
            "or the Department) cannot limit or restrict the use of this data or its interpretation " +
            "by other parties in any way. Where the data is communicated, distributed, reproduced, " +
            "mapped, or used in any other way, the user should acknowledge SFDPH as the source of " +
            "the data, provide a reference to the original data source where also applicable, and " +
            "note any caveats specified in the associated methodological documentation provided by " +
            "the Department. However, users should not attribute their analysis or interpretation " +
            "of this data to SFDPH. While the data has been collected and/or produced for the use " +
            "of SFDPH, the Department cannot guarantee its accuracy or completeness. As all data " +
            "is associated with methodological assumptions and limitations, the Department recommends " +
            "that users review methodological documentation associated with the data prior to its " +
            "analysis, interpretation, or communication. <b>This project is currently in beta and being " +
            "released as is.</b> Please report any bugs to transbasesf@sfdph.org.<br><br> " +
            "This project was built on the following open source products:<br>" +
            "<A HREF='http://www.postgresql.org/' target='_blank'>PostgreSQL</A><br>" +
            "<A HREF='http://postgis.net/' target='_blank'>PostGIS</A><br>" +
            "<A HREF='http://httpd.apache.org/' target='_blank'>Apache HTTP Server</A><br>" +
            "<A HREF='http://tomcat.apache.org/' target='_blank'>Apache Tomcat</A><br>" +
            "<A HREF='http://geoserver.org/' target='_blank'>GeoServer</A><br>" +
            "<A HREF='http://openlayers.org/' target='_blank'>OpenLayers</A><br>" +
            "<A HREF='http://www.sencha.com/products/extjs/' target='_blank'>Ext JS</A><br>" +
            "<A HREF='http://geoext.org/' target='_blank'>GeoExt</A><br>" +
            "<A HREF='http://heron-mc.org/' target='_blank'>Heron MC</A><br>" +
            "<A HREF='http://www.flaticon.com/' target='_blank'>Flaticon</A><br><br>" +
            "The Centers for Disease Control and Prevention (CDC) provided funding for this project through " +
            "the Health Impact Assessment to Foster Healthy Community Design grant.",
        buttons: Ext.MessageBox.OK,
    });
}); // onReady()