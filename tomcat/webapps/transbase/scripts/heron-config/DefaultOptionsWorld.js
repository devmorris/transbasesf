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
 * Defines settings for the Heron App layout wihtin Layout.js.
 *
 * The layout specifies a hierarchy of ExtJS (Panel) and GeoExt and Heron MC components.
 * For convenience specific settings within this layout are defined here
 * for structuring and reuse purposes.
 *
 **/
OpenLayers.Util.onImageLoadErrorColor = "transparent";
OpenLayers.ProxyHost = "/cgi-bin/proxy.cgi?url=";
Ext.BLANK_IMAGE_URL = 'http://cdnjs.cloudflare.com/ajax/libs/extjs/3.4.1-1/resources/images/default/s.gif';

/*
 * Set resolutions based on basemaps
 */

var bm_resolutions = [156543.03390625, 78271.516953125, 39135.7584765625, 19567.87923828125, 9783.939619140625, 4891.9698095703125, 2445.9849047851562, 1222.9924523925781, 611.4962261962891, 305.74811309814453, 152.87405654907226, 76.43702827453613, 38.218514137268066, 19.109257068634033, 9.554628534317017, 4.777314267158508, 2.388657133579254, 1.194328566789627, 0.5971642833948135, 0.29858214169740677, 0.14929107084870338, 0.07464553542435169]
var bm_scales = [4513.988705, 9027.977411, 18055.954822, 36111.909643, 72223.819286, 144447.638572, 288895.277144, 577790.554289, 1155581.108577, 2311162.217155, 4622324.434309, 9244648.868618, 18489297.737236, 36978595.474472, 73957190.948944, 147914381.897889]

/*
 * Common settings for MapPanel
 * These will be assigned as "hropts" within the MapPanel config
 */

// can be passed here as well. "-" denotes a separator item.

// See ToolbarBuilder.js : each string item points to a definition
// in Heron.ToolbarBuilder.defs. Extra options and even an item create function
Ext.namespace("Heron.options.map");
Heron.options.map.settings = {
    projection: 'EPSG:3857',
    units: 'm',
    displayOutsideMaxExtent: false,
    resolutions: bm_resolutions,
    scales: bm_scales,
    maxExtent: '-13639895, 4536938, -13618927, 4558402',

    /**
     * Useful to always have permalinks enabled. default is enabled with these settings.
     * MapPanel.getPermalink() returns current permalink
     *
     **/

    permalinks: {

        /** The prefix to be used for parameters, e.g. map_x, default is 'map' */

        paramPrefix: 'map',

        /** Encodes values of permalink parameters default false*/

        encodeType: false,

        /** Use Layer names i.s.o. OpenLayers-generated Layer Id's in Permalinks */

        prettyLayerNames: true
    }
};

Ext.namespace("Heron.options.wfs");
Heron.options.wfs.downloadFormats = [{
    name: 'CSV',
    outputFormat: 'csv',
    fileExt: '.csv'
}, {
    name: 'ESRI Shapefile (zipped)',
    outputFormat: 'SHAPE-ZIP',
    fileExt: '.zip'
}, {
    name: 'GeoJSON',
    outputFormat: 'json',
    fileExt: '.json'
}];

Heron.options.map.toolbar = [{
    type: "scale",
    options: {
        width: 110
    }
}, {
    type: "-"
}, {
    type: "featureinfo",
    options: {
        popupWindow: {
            width: 360,
            height: 200,
            featureInfoPanel: {
                // Option values are 'Grid', 'Tree' and 'XML', default is 'Grid' (results in no display menu)
                displayPanels: ['Grid', 'XML', 'Tree'],
                // Export to download file. Option values are 'CSV', 'XLS', default is no export (results in no export menu).
                exportFormats: ['CSV', 'XLS'],
                // Export to download file. Option values are 'CSV', 'XLS', default is no export (results in no export menu).
                // exportFormats: ['CSV', 'XLS'],
                maxFeatures: 10
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
    type: "coordinatesearch",
    options: {
        onSearchCompleteZoom: 8,
        fieldLabelX: 'lon',
        fieldLabelY: 'lat'
    }
}, {
    type: "-"
}, {
    type: "zoomprevious"
}, {
    type: "zoomnext"
}, {
    type: "-"
}, {
    type: "measurelength",
    options: {
        geodesic: true
    }
}, {
    type: "measurearea",
    options: {
        geodesic: true
    }
}, {
    type: "-"
}, {
    type: "addbookmark"
}];

/*
 * Layers to be added to the map.
 * Syntax is defined in OpenLayers Layer API.
 * ("isBaseLayer: true" means the layer will be added as base/background layer).
 */

Heron.options.map.layers = [

    /*
     * ==================================
     * BASE MAP LAYERS
     * ==================================
     */

    new OpenLayers.Layer.XYZ("ESRI Topographic Map",
        "http://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/${z}/${y}/${x}", {
            sphericalMercator: true,
            attribution: "Base Map Tiles &copy; <a href='http://www.esri.com/'>Esri</a>",
            isBaseLayer: true
        }
    ),
    new OpenLayers.Layer.XYZ("ESRI Imagery",
        "http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/${z}/${y}/${x}", {
            sphericalMercator: true,
            attribution: "<font color='white'>Base Map Tiles &copy; <a href='http://www.esri.com/'>Esri</a></font>",
            isBaseLayer: true
        }
    ),
    new OpenLayers.Layer.XYZ("ESRI Street Map",
        "http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/${z}/${y}/${x}", {
            sphericalMercator: true,
            attribution: "Base Map Tiles &copy; <a href='http://www.esri.com/'>Esri</a>",
            isBaseLayer: true
        }
    ),
    new OpenLayers.Layer.Google(
        "Google Street Map", {
            type: google.maps.MapTypeId.ROADMAP,
            visibility: false,
            sphericalMercator: true,
            attribution: "Base Map Tiles &copy <a href='http://www.google.com'>Google</a>"
        }, {
            singleTile: false,
            buffer: 0,
            isBaseLayer: true
        }
    ),
    new OpenLayers.Layer.Stamen("toner"),
    new OpenLayers.Layer.Stamen("terrain"),

    /*
     * ==================================
     * BASE MAP OVERLAYS
     * ==================================
     */

    new OpenLayers.Layer.XYZ("ESRI Street Labels",
        "http://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer/tile/${z}/${y}/${x}", {
            sphericalMercator: true,
            isBaseLayer: false,
            maxZoom: 18,
            visibility: false
        }
    ),

    /*
     * ==================================
     * WMS/WFS -- QUERY LAYERS
     * ==================================
     */
	 
    //INTERSECTION LEVEL

    new OpenLayers.Layer.WMS(
        "1a - Intersection Infrastructure Variables",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_infrstcr",
            transparent: true,
            format: 'image/png8'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize',
            metadata: {
                wfs: {
                    protocol: 'fromWMSLayer',
                    downloadFormats: Heron.options.wfs.downloadFormats,
                    featureType: 'vw_geo_intrsctn_infrstcr',
                }
            },
        }
    ),
    new OpenLayers.Layer.WMS(
        "1b - Intersection Transportation Variables",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_trnsprtn",
            transparent: true,
            format: 'image/png8'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize',
            metadata: {
                wfs: {
                    protocol: 'fromWMSLayer',
                    downloadFormats: Heron.options.wfs.downloadFormats,
                    featureType: 'vw_geo_intrsctn_trnsprtn'
                }
            },
        }
    ),
    new OpenLayers.Layer.WMS(
        "1c - Intersection Community Variables",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_cmnty",
            transparent: true,
            format: 'image/png8'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize',
            metadata: {
                wfs: {
                    protocol: 'fromWMSLayer',
                    downloadFormats: Heron.options.wfs.downloadFormats,
                    featureType: 'vw_geo_intrsctn_cmnty'
                }
            },
        }
    ),
    new OpenLayers.Layer.WMS(
        "1d - Intersection Education Variables",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_edctn",
            transparent: true,
            format: 'image/png8'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize',
            metadata: {
                wfs: {
                    protocol: 'fromWMSLayer',
                    downloadFormats: Heron.options.wfs.downloadFormats,
                    featureType: 'vw_geo_intrsctn_edctn'
                }
            },
        }
    ),
    new OpenLayers.Layer.WMS(
        "1e - Intersection Business Variables",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_bsns",
            transparent: true,
            format: 'image/png8'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize',
            metadata: {
                wfs: {
                    protocol: 'fromWMSLayer',
                    downloadFormats: Heron.options.wfs.downloadFormats,
                    featureType: 'vw_geo_intrsctn_bsns'
                }
            },
        }
    ),
    new OpenLayers.Layer.WMS(
        "1f - Intersection Demographic Variables",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_dmgrphc",
            transparent: true,
            format: 'image/png8'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize',
            metadata: {
                wfs: {
                    protocol: 'fromWMSLayer',
                    downloadFormats: Heron.options.wfs.downloadFormats,
                    featureType: 'vw_geo_intrsctn_dmgrphc'
                }
            },
        }
    ),
    new OpenLayers.Layer.WMS(
        "1g - Intersection Zoning Variables",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_zng",
            transparent: true,
            format: 'image/png8',
            styles: 'Proportion of Industrial Zoning within a Quarter Mile Radius'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize',
            metadata: {
                wfs: {
                    protocol: 'fromWMSLayer',
                    downloadFormats: Heron.options.wfs.downloadFormats,
                    featureType: 'vw_geo_intrsctn_zng'
                }
            },
        }
    ),

    //STREET SEGMENT LEVEL

    new OpenLayers.Layer.WMS(
        "2a - Street Segment Infrastructure Variables",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_st_sgmt_infrstcr",
            transparent: true,
            format: 'image/png8'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize',
            metadata: {
                wfs: {
                    protocol: 'fromWMSLayer',
                    downloadFormats: Heron.options.wfs.downloadFormats,
                    featureType: 'vw_geo_st_sgmt_infrstcr'
                }
            },
        }
    ),
    new OpenLayers.Layer.WMS(
        "2b - Street Segment Transportation Variables",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_st_sgmt_trnsprtn",
            transparent: true,
            format: 'image/png8'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize',
            metadata: {
                wfs: {
                    protocol: 'fromWMSLayer',
                    downloadFormats: Heron.options.wfs.downloadFormats,
                    featureType: 'vw_geo_st_sgmt_trnsprtn'
                }
            },
        }
    ),

    // SWITRS PEDESTRIAN VARIABLES

    new OpenLayers.Layer.WMS(
        "3a - Pedestrian SWITRS Collision Variables",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_switrs_all_types_ped_col",
            transparent: true,
            format: 'image/png8',
            styles: ''
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize',
            metadata: {
                wfs: {
                    protocol: 'fromWMSLayer',
                    downloadFormats: Heron.options.wfs.downloadFormats,
                    featureType: 'vw_geo_intrsctn_switrs_all_types_ped_col'
                }
            }
        }
    ),
    new OpenLayers.Layer.WMS(
        "3b - Pedestrian SWITRS All Party Variables",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_switrs_all_types_ped_col_all_prties",
            transparent: true,
            format: 'image/png8'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize',
            metadata: {
                wfs: {
                    protocol: 'fromWMSLayer',
                    downloadFormats: Heron.options.wfs.downloadFormats,
                    featureType: 'vw_geo_intrsctn_switrs_all_types_ped_col_all_prties',
                }
            },
        }
    ),
    new OpenLayers.Layer.WMS(
        "3c - Pedestrian SWITRS Victim Variables",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_switrs_all_types_ped_col_prty_vctm",
            transparent: true,
            format: 'image/png8'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize',
            metadata: {
                wfs: {
                    protocol: 'fromWMSLayer',
                    downloadFormats: Heron.options.wfs.downloadFormats,
                    featureType: 'vw_geo_intrsctn_switrs_all_types_ped_col_prty_vctm',
                }
            },
        }
    ),

    // SWITRS CYCLIST VARIABLES

    new OpenLayers.Layer.WMS(
        "4a - Cyclist SWITRS Collision Variables",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_switrs_all_types_cyc_col",
            transparent: true,
            format: 'image/png8',
            styles: ''
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize',
            metadata: {
                wfs: {
                    protocol: 'fromWMSLayer',
                    downloadFormats: Heron.options.wfs.downloadFormats,
                    featureType: 'vw_geo_intrsctn_switrs_all_types_cyc_col'
                }
            }
        }
    ),
    new OpenLayers.Layer.WMS(
        "4b - Cyclist SWITRS All Party Variables",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_switrs_all_types_cyc_col_all_prties",
            transparent: true,
            format: 'image/png8'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize',
            metadata: {
                wfs: {
                    protocol: 'fromWMSLayer',
                    downloadFormats: Heron.options.wfs.downloadFormats,
                    featureType: 'vw_geo_intrsctn_switrs_all_types_cyc_col_all_prties',
                }
            },
        }
    ),
    new OpenLayers.Layer.WMS(
        "4c - Cyclist SWITRS Victim Variables",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_switrs_all_types_cyc_col_prty_vctm",
            transparent: true,
            format: 'image/png8'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize',
            metadata: {
                wfs: {
                    protocol: 'fromWMSLayer',
                    downloadFormats: Heron.options.wfs.downloadFormats,
                    featureType: 'vw_geo_intrsctn_switrs_all_types_cyc_col_prty_vctm',
                }
            },
        }
    ),
	
	// SWITRS VEHICLE VARIABLES
	
    new OpenLayers.Layer.WMS(
        "5a - Vehicle SWITRS Collision Variables",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_switrs_all_types_veh_col",
            transparent: true,
            format: 'image/png8'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize',
            metadata: {
                wfs: {
                    protocol: 'fromWMSLayer',
                    downloadFormats: Heron.options.wfs.downloadFormats,
                    featureType: 'vw_geo_intrsctn_switrs_all_types_veh_col',
                }
            },
        }
    ),

    new OpenLayers.Layer.WMS(
        "5b - Vehicle SWITRS All Party Variables",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_switrs_all_types_veh_col_all_prties",
            transparent: true,
            format: 'image/png8'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize',
            metadata: {
                wfs: {
                    protocol: 'fromWMSLayer',
                    downloadFormats: Heron.options.wfs.downloadFormats,
                    featureType: 'vw_geo_intrsctn_switrs_all_types_veh_col_all_prties',
                }
            },
        }
    ),
	
    new OpenLayers.Layer.WMS(
        "5c - Vehicle SWITRS Victim Variables",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_switrs_all_types_veh_col_prty_vctm",
            transparent: true,
            format: 'image/png8'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize',
            metadata: {
                wfs: {
                    protocol: 'fromWMSLayer',
                    downloadFormats: Heron.options.wfs.downloadFormats,
                    featureType: 'vw_geo_intrsctn_switrs_all_types_veh_col_prty_vctm',
                }
            },
        }
    ),

    /*
     * ==================================
     * INTERSECTION -- INFRASTRUCTURE LAYERS
     * ==================================
     */

    new OpenLayers.Layer.WMS(
        "Count Pedestrian Injuries by Intersection",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geoserver_ped_male",
            transparent: true,
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Intersection Control Device",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_infrstcr",
            transparent: true,
            format: 'image/png8',
            styles: 'Intersection Control Device'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            tiled: true,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Intersection Description",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_infrstcr",
            transparent: true,
            format: 'image/png8',
            styles: 'Intersection Description'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Presence of Audible Traffic Signal (ATS)",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_infrstcr",
            transparent: true,
            format: 'image/png8',
            styles: 'Presence of Audible Traffic Signal (ATS)'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Presence of Red Light Camera",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_infrstcr",
            transparent: true,
            format: 'image/png8',
            styles: 'Presence of Red Light Camera'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),	
    new OpenLayers.Layer.WMS(
        "Presence of School Crosswalk",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_infrstcr",
            transparent: true,
            format: 'image/png8',
            styles: 'Presence of School Crosswalks'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Presence of Traffic Calming Feature",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_infrstcr",
            transparent: true,
            format: 'image/png8',
            styles: 'Presence of Traffic Calming Feature'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Presence of Continental Crosswalk",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_infrstcr",
            transparent: true,
            format: 'image/png8',
            styles: 'Presence of Continental Crosswalk'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Presence of Truck Route",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_infrstcr",
            transparent: true,
            format: 'image/png8',
            styles: 'Presence of Truck Route'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Count PUC Lights Along Segments",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_infrstcr",
            transparent: true,
            format: 'image/png8',
            styles: 'Count PUC Lights Along Segments'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Count of Trees within 50-foot Radius",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_infrstcr",
            transparent: true,
            format: 'image/png8',
            styles: 'Count of Trees within 50-foot Radius'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Count of Trees within 100-foot Radius",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_infrstcr",
            transparent: true,
            format: 'image/png8',
            styles: 'Count of Trees within 100-foot Radius'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Count of Trees within 500-foot Radius",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_infrstcr",
            transparent: true,
            format: 'image/png8',
            styles: 'Count of Trees within 500-foot Radius'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Count of Trees within Quarter Mile Radius",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_infrstcr",
            transparent: true,
            format: 'image/png8',
            styles: 'Count of Trees within Quarter Mile Radius'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Count of Muni Lines Crossing Intersection",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_infrstcr",
            transparent: true,
            format: 'image/png8',
            styles: 'Count of Muni Lines Crossing Intersection'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Count of Muni Stops within 100 Feet",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_infrstcr",
            transparent: true,
            format: 'image/png8',
            styles: 'Count of Muni Stops within 100 Feet'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Count of Off Street Parking Along Segments",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_infrstcr",
            transparent: true,
            format: 'image/png8',
            styles: 'Count of Off Street Parking Along Segments'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Count of On Street Parking Along Segments",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_infrstcr",
            transparent: true,
            format: 'image/png8',
            styles: 'Count of On Street Parking Along Segments'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Maximum Slope Along Segments",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_infrstcr",
            transparent: true,
            format: 'image/png8',
            styles: 'Maximum Slope Along Segments'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Maximum Speed Limit Along Segments",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_infrstcr",
            transparent: true,
            format: 'image/png8',
            styles: 'Maximum Speed Limit Along Segments'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Maximum Street Width at Intersection",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_infrstcr",
            transparent: true,
            format: 'image/png8',
            styles: 'Maximum Street Width at Intersection'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),

    /*
     * ==================================
     * INTERSECTION -- TRANSPORTATION LAYERS
     * ==================================
     */

    new OpenLayers.Layer.WMS(
        "Bike Trips From Origin (TAZ Level)",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_trnsprtn",
            transparent: true,
            format: 'image/png8',
            styles: 'Bike Trips From Origin (TAZ Level)'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Bike Trips From Origin (TAZ District Level)",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_trnsprtn",
            transparent: true,
            format: 'image/png8',
            styles: 'Bike Trips From Origin (TAZ District Level)'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Daily Transit Riders within Quarter Mile Radius",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_trnsprtn",
            transparent: true,
            format: 'image/png8',
            styles: 'Daily Transit Riders within Quarter Mile Radius'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Daily Transit Riders within Eighth Mile Radius",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_trnsprtn",
            transparent: true,
            format: 'image/png8',
            styles: 'Daily Transit Riders within Eighth Mile Radius'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Annual Pedestrian Traffic Volume",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_trnsprtn",
            transparent: true,
            format: 'image/png8',
            styles: 'Annual Pedestrian Traffic Volume'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Daily Pedestrian Traffic Volume",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_trnsprtn",
            transparent: true,
            format: 'image/png8',
            styles: 'Daily Pedestrian Traffic Volume'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Walk Trips From Origin (TAZ Level)",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_trnsprtn",
            transparent: true,
            format: 'image/png8',
            styles: 'Walk Trips From Origin (TAZ Level)'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Walk Trips From Origin (TAZ District Level)",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_trnsprtn",
            transparent: true,
            format: 'image/png8',
            styles: 'Walk Trips From Origin (TAZ District Level)'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),

    /*
     * ==================================
     * INTERSECTION -- COMMUNITY LAYERS
     * ==================================
     */

    new OpenLayers.Layer.WMS(
        "Count of Art Installations within a Quarter Mile Radius",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_cmnty",
            transparent: true,
            format: 'image/png8',
            styles: 'Count of Art Installations within a Quarter Mile Radius'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Nearest Art Installation to Intersection in Feet",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_cmnty",
            transparent: true,
            format: 'image/png8',
            styles: 'Nearest Art Installation to Intersection in Feet'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Count of Childcare Facilities within a Quarter Mile Radius",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_cmnty",
            transparent: true,
            format: 'image/png8',
            styles: 'Count of Childcare Facilities within a Quarter Mile Radius'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Nearest Childcare Facility to Intersection in Feet",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_cmnty",
            transparent: true,
            format: 'image/png8',
            styles: 'Nearest Childcare Facility to Intersection in Feet'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Count of Community Centers within a Quarter Mile Radius",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_cmnty",
            transparent: true,
            format: 'image/png8',
            styles: 'Count of Community Centers within a Quarter Mile Radius'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Nearest Community Center to Intersection in Feet",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_cmnty",
            transparent: true,
            format: 'image/png8',
            styles: 'Nearest Community Center to Intersection in Feet'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Count Community Gardens within a Quarter Mile Radius",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_cmnty",
            transparent: true,
            format: 'image/png8',
            styles: 'Count Community Gardens within a Quarter Mile Radius'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Nearest Community Garden to Intersection in Feet",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_cmnty",
            transparent: true,
            format: 'image/png8',
            styles: 'Nearest Community Garden to Intersection in Feet'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Count Libraries within a Quarter Mile Radius",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_cmnty",
            transparent: true,
            format: 'image/png8',
            styles: 'Count Libraries within a Quarter Mile Radius'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Nearest Library to Intersection in Feet",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_cmnty",
            transparent: true,
            format: 'image/png8',
            styles: 'Nearest Library to Intersection in Feet'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Count Parks within a Quarter Mile Radius",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_cmnty",
            transparent: true,
            format: 'image/png8',
            styles: 'Count Parks within a Quarter Mile Radius'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Nearest Park to Intersection in Feet",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_cmnty",
            transparent: true,
            format: 'image/png8',
            styles: 'Nearest Park to Intersection in Feet'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Count Post Offices within a Quarter Mile Radius",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_cmnty",
            transparent: true,
            format: 'image/png8',
            styles: 'Count Post Offices within a Quarter Mile Radius'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Nearest Post Office to Intersection in Feet",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_cmnty",
            transparent: true,
            format: 'image/png8',
            styles: 'Nearest Post Office to Intersection in Feet'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Count SROs within a Quarter Mile Radius",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_cmnty",
            transparent: true,
            format: 'image/png8',
            styles: 'Count SROs within a Quarter Mile Radius'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Nearest SRO to Intersection in Feet",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_cmnty",
            transparent: true,
            format: 'image/png8',
            styles: 'Nearest SRO to Intersection in Feet'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Count Senior Centers within a Quarter Mile Radius",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_cmnty",
            transparent: true,
            format: 'image/png8',
            styles: 'Count Senior Centers within a Quarter Mile Radius'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Nearest Senior Center to Intersection in Feet",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_cmnty",
            transparent: true,
            format: 'image/png8',
            styles: 'Nearest Senior Center to Intersection in Feet'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),

    /*
     * ==================================
     * INTERSECTION -- EDUCATION LAYERS
     * ==================================
     */

    new OpenLayers.Layer.WMS(
        "Count Elementary Schools within a Quarter Mile Radius",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_edctn",
            transparent: true,
            format: 'image/png8',
            styles: 'Count of Elementary Schools within a Quarter Mile Radius'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Nearest Elementary School to Intersection in Feet",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_edctn",
            transparent: true,
            format: 'image/png8',
            styles: 'Nearest Elementary School to Intersection in Feet'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Count Middle Schools within a Quarter Mile Radius",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_edctn",
            transparent: true,
            format: 'image/png8',
            styles: 'Count Middle Schools within a Quarter Mile Radius'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Nearest Middle School to Intersection in Feet",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_edctn",
            transparent: true,
            format: 'image/png8',
            styles: 'Nearest Middle School to Intersection in Feet'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Count High Schools within a Quarter Mile Radius",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_edctn",
            transparent: true,
            format: 'image/png8',
            styles: 'Count High Schools within a Quarter Mile Radius'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Nearest High School to Intersection in Feet",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_edctn",
            transparent: true,
            format: 'image/png8',
            styles: 'Nearest High School to Intersection in Feet'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Count Higher Education Facilities within a Quarter Mile Radius",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_edctn",
            transparent: true,
            format: 'image/png8',
            styles: 'Count Higher Education Facilities within a Quarter Mile Radius'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Nearest Higher Education Facility to Intersection in Feet",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_edctn",
            transparent: true,
            format: 'image/png8',
            styles: 'Nearest Higher Education Facility to Intersection in Feet'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Count all Public/Private Schools within a Quarter Mile Radius",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_edctn",
            transparent: true,
            format: 'image/png8',
            styles: 'Count all Public or Private Schools within a Quarter Mile Radius'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Nearest Public/Private School to Intersection in Feet",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_edctn",
            transparent: true,
            format: 'image/png8',
            styles: 'Nearest Public or Private School to Intersection in Feet'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),

    /*
     * ==================================
     * INTERSECTION -- BUSINESS LAYERS
     * ==================================
     */

    new OpenLayers.Layer.WMS(
        "Alcohol Outlets within a Quarter Mile Radius",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_bsns",
            transparent: true,
            format: 'image/png8',
            styles: 'Alcohol Outlets within a Quarter Mile Radius'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Nearest Alcohol Outlet to Intersection in Feet",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_bsns",
            transparent: true,
            format: 'image/png8',
            styles: 'Nearest Alcohol Outlet to Intersection in Feet'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Auto Repair Shops within a Quarter Mile Radius",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_bsns",
            transparent: true,
            format: 'image/png8',
            styles: 'Auto Repair Shops within a Quarter Mile Radius'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Nearest Auto Repair Shops to Intersection in Feet",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_bsns",
            transparent: true,
            format: 'image/png8',
            styles: 'Nearest Auto Repair Shops to Intersection in Feet'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Banks within a Quarter Mile Radius",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_bsns",
            transparent: true,
            format: 'image/png8',
            styles: 'Banks within a Quarter Mile Radius'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Nearest Bank to Intersection in Feet",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_bsns",
            transparent: true,
            format: 'image/png8',
            styles: 'Nearest Bank to Intersection in Feet'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Bike Shops within a Quarter Mile Radius",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_bsns",
            transparent: true,
            format: 'image/png8',
            styles: 'Bike Shops within a Quarter Mile Radius'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Nearest Bike Shop to Intersection in Feet",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_bsns",
            transparent: true,
            format: 'image/png8',
            styles: 'Nearest Bike Shop to Intersection in Feet'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Dry Cleaners within a Quarter Mile Radius",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_bsns",
            transparent: true,
            format: 'image/png8',
            styles: 'Dry Cleaners within a Quarter Mile Radius'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Nearest Dry Cleaner to Intersection in Feet",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_bsns",
            transparent: true,
            format: 'image/png8',
            styles: 'Nearest Dry Cleaner to Intersection in Feet'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Farmers Market within a Quarter Mile Radius",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_bsns",
            transparent: true,
            format: 'image/png8',
            styles: 'Farmers Market within a Quarter Mile Radius'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Nearest Farms Market to Intersection in Feet",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_bsns",
            transparent: true,
            format: 'image/png8',
            styles: 'Nearest Farms Market to Intersection in Feet'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Gyms within a Quarter Mile Radius",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_bsns",
            transparent: true,
            format: 'image/png8',
            styles: 'Gyms within a Quarter Mile Radius'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Nearest Gym to Intersection in Feet",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_bsns",
            transparent: true,
            format: 'image/png8',
            styles: 'Nearest Gym to Intersection in Feet'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Hair Salon/Barber Shop within a Quarter Mile Radius",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_bsns",
            transparent: true,
            format: 'image/png8',
            styles: 'Hair Salon or Barber Shop within a Quarter Mile Radius'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Nearest Hair Salon/Barber Shop to Intersection in Feet",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_bsns",
            transparent: true,
            format: 'image/png8',
            styles: 'Nearest Hair Salon or Barber Shop to Intersection in Feet'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Hardware Stores within a Quarter Mile Radius",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_bsns",
            transparent: true,
            format: 'image/png8',
            styles: 'Hardware Stores within a Quarter Mile Radius'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Nearest Hardware Store to Intersection in Feet",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_bsns",
            transparent: true,
            format: 'image/png8',
            styles: 'Nearest Hardware Store to Intersection in Feet'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Laundromats within a Quarter Mile Radius",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_bsns",
            transparent: true,
            format: 'image/png8',
            styles: 'Laundromats within a Quarter Mile Radius'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Nearest Laundromat to Intersection in Feet",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_bsns",
            transparent: true,
            format: 'image/png8',
            styles: 'Nearest Laundromat to Intersection in Feet'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Produce Markets within a Quarter Mile Radius",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_bsns",
            transparent: true,
            format: 'image/png8',
            styles: 'Produce Markets within a Quarter Mile Radius'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Nearest Produce Market to Intersection in Feet",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_bsns",
            transparent: true,
            format: 'image/png8',
            styles: 'Nearest Produce Market to Intersection in Feet'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Restaurants within a Quarter Mile Radius",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_bsns",
            transparent: true,
            format: 'image/png8',
            styles: 'Restaurants within a Quarter Mile Radius'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Nearest Restaurant to Intersection in Feet",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_bsns",
            transparent: true,
            format: 'image/png8',
            styles: 'Nearest Restaurant to Intersection in Feet'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Supermarkets within a Quarter Mile Radius",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_bsns",
            transparent: true,
            format: 'image/png8',
            styles: 'Supermarkets within a Quarter Mile Radius'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Nearest Supermarket to Intersection in Feet",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_bsns",
            transparent: true,
            format: 'image/png8',
            styles: 'Nearest Supermarket to Intersection in Feet'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Video Stores/Theaters within a Quarter Mile Radius",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_bsns",
            transparent: true,
            format: 'image/png8',
            styles: 'Video Stores or Theaters within a Quarter Mile Radius'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Nearest Video Store/Theater to Intersection in Feet",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_bsns",
            transparent: true,
            format: 'image/png8',
            styles: 'Nearest Video Store or Theater to Intersection in Feet'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),

    /*
     * ==================================
     * INTERSECTION -- HEALTH LAYERS
     * ==================================
     */

    //PLACEHOLDER

    /*
     * ==================================
     * INTERSECTION -- DEMOGRAPHICS LAYERS
     * ==================================
     */

    new OpenLayers.Layer.WMS(
        "Count of Individuals Below 200% of Poverty Line Within Quarter Mile Radius",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_dmgrphc",
            transparent: true,
            format: 'image/png8',
            styles: 'Count of Individuals Below 200% of Poverty Line Within Quarter Mile Radius'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Count of Individuals with Disabilities Within Quarter Mile Radius",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_dmgrphc",
            transparent: true,
            format: 'image/png8',
            styles: 'Count of Individuals with Disabilities Within Quarter Mile Radius'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Count of Estimated Employees Within a Quarter Mile Radius",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_dmgrphc",
            transparent: true,
            format: 'image/png8',
            styles: 'Count of Estimated Employees Within a Quarter Mile Radius'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Average Household Income Within a Quarter Mile Radius",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_dmgrphc",
            transparent: true,
            format: 'image/png8',
            styles: 'Average Household Income Within a Quarter Mile Radius'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Count of Estimated Non-English Speakers Within a Quarter Mile Radius",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_dmgrphc",
            transparent: true,
            format: 'image/png8',
            styles: 'Count of Estimated Non-English Speakers Within a Quarter Mile Radius'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Count of Estimated People of Color within a Quarter Mile Radius",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_dmgrphc",
            transparent: true,
            format: 'image/png8',
            styles: 'Count of Estimated People of Color within a Quarter Mile Radius'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Estimated Proportion of People of Color Within a Quarter Mile Radius",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_dmgrphc",
            transparent: true,
            format: 'image/png8',
            styles: 'Estimated Proportion of People of Color Within a Quarter Mile Radius'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Estimated Proportion of Population with No Vehicle Access Within a Quarter Mile Radius",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_dmgrphc",
            transparent: true,
            format: 'image/png8',
            styles: 'Estimated Proportion of Population with No Vehicle Access Within a Quarter Mile Radius'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Proportion of Ages Less Than 13 Living Within a Quarter Mile Radius",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_dmgrphc",
            transparent: true,
            format: 'image/png8',
            styles: 'Proportion of Ages Less Than 13 Living Within a Quarter Mile Radius'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Proportion of Ages 13-20 Living Within a Quarter Mile Radius",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_dmgrphc",
            transparent: true,
            format: 'image/png8',
            styles: 'Proportion of Ages 13-20 Living Within a Quarter Mile Radius'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Proportion of Ages 21-44 Living Within a Quarter Mile Radius",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_dmgrphc",
            transparent: true,
            format: 'image/png8',
            styles: 'Proportion of Ages 21-44 Living Within a Quarter Mile Radius'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Proportion of Ages 45-64 Living Within a Quarter Mile Radius",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_dmgrphc",
            transparent: true,
            format: 'image/png8',
            styles: 'Proportion of Ages 45-64 Living Within a Quarter Mile Radius'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Percent of Household Below Poverty Line Within a Quarter Mile Radius",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_dmgrphc",
            transparent: true,
            format: 'image/png8',
            styles: 'Percent of Household Below Poverty Line Within a Quarter Mile Radius'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Estimated Residential Population Within a Quarter Mile Radius",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_dmgrphc",
            transparent: true,
            format: 'image/png8',
            styles: 'Estimated Residential Population Within a Quarter Mile Radius'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Proportion of Ages 65+ Living Within a Quarter Mile Radius",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_dmgrphc",
            transparent: true,
            format: 'image/png8',
            styles: 'Proportion of Ages 65+ Living Within a Quarter Mile Radius'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Estimated Youth Less Than 18 Within a Quarter Mile Radius",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_dmgrphc",
            transparent: true,
            format: 'image/png8',
            styles: 'Estimated Youth Less Than 18 Within a Quarter Mile Radius'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Estimated Violent Crime Within a Quarter Mile Radius",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_dmgrphc",
            transparent: true,
            format: 'image/png8',
            styles: 'Estimated Violent Crime Within a Quarter Mile Radius'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),

    /*
     * ==================================
     * INTERSECTION -- ZONING LAYERS
     * ==================================
     */

    new OpenLayers.Layer.WMS(
        "Proportion of Industrial Zoning within a Quarter Mile Radius",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_zng",
            transparent: true,
            format: 'image/png8',
            styles: 'Proportion of Industrial Zoning within a Quarter Mile Radius'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Proportion of Commercial Zoning within a Quarter Mile Radius",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_zng",
            transparent: true,
            format: 'image/png8',
            styles: 'Proportion of Commercial Zoning within a Quarter Mile Radius'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Proportion of Mixed Use within a Quarter Mile Radius",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_zng",
            transparent: true,
            format: 'image/png8',
            styles: 'Proportion of Mixed Use within a Quarter Mile Radius'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Proportion of Neighborhood Commercial Zoning within a Quarter Mile Radius",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_zng",
            transparent: true,
            format: 'image/png8',
            styles: 'Proportion of Neighborhood Commercial Zoning within a Quarter Mile Radius'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Proportion of Residential Zoning within a Quarter Mile Radius",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_zng",
            transparent: true,
            format: 'image/png8',
            styles: 'Proportion of Residential Zoning within a Quarter Mile Radius'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Proportion of Residential Mixed Use Zoning within a Quarter Mile Radius",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_zng",
            transparent: true,
            format: 'image/png8',
            styles: 'Proportion of Residential Mixed Use Zoning within a Quarter Mile Radius'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Proportion of Redevelopment Zoning within a Quarter Mile Radius",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_zng",
            transparent: true,
            format: 'image/png8',
            styles: 'Proportion of Redevelopment Zoning within a Quarter Mile Radius'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Proportion of Public Use Zoning within a Quarter Mile Radius",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_zng",
            transparent: true,
            format: 'image/png8',
            styles: 'Proportion of Public Use Zoning within a Quarter Mile Radius'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),

    /*
     * ==================================
     * INTERSECTION -- LOCATIONS LAYERS
     * ==================================
     */

    //PLACEHOLDER

    /*
     * ==================================
     * INTERSECTION -- HIGH INJURY INTERSECTIONS LAYERS
     * ==================================
     */
    new OpenLayers.Layer.WMS(
        "Pedestrian High Injury Intersections (HIPIs)",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_ped_hgh_injry_intrsctn",
            transparent: true,
            format: 'image/png8',
            styles: 'Pedestrian High Injury Intersections'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
	    new OpenLayers.Layer.WMS(
        "Cyclist High Injury Intersections (CHIIs)",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_cyc_hgh_injry_intrsctn",
            transparent: true,
            format: 'image/png8',
            styles: 'Cyclist High Injury Intersections'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    //PLACEHOLDER

    /*
     * ==================================
     * STREET SEGMENTS -- INFRASTRUCTURE LAYERS
     * ==================================
     */

    new OpenLayers.Layer.WMS(
        "Street Type",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_st_sgmt_infrstcr",
            transparent: true,
            format: 'image/png8',
            styles: 'Street Type'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Presence of Muni Line",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_st_sgmt_infrstcr",
            transparent: true,
            format: 'image/png8',
            styles: 'Presence of Muni Line'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Number of Lanes Off-Peak",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_st_sgmt_infrstcr",
            transparent: true,
            format: 'image/png8',
            styles: 'Number of Lanes OP'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Caltrans Maintained",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_st_sgmt_infrstcr",
            transparent: true,
            format: 'image/png8',
            styles: 'Caltrans Maintained'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Speed Limit",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_st_sgmt_infrstcr",
            transparent: true,
            format: 'image/png8',
            styles: 'Speed Limit'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Presence of Cyclist Route",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_st_sgmt_cyc_lanes",
            transparent: true,
            format: 'image/png8',
            styles: 'Presence of Cyclist Lane'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Count of Bulb-outs",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_st_sgmt_infrstcr",
            transparent: true,
            format: 'image/png8',
            styles: 'Count of Bulb-outs'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Count of Channelized Segments",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_st_sgmt_infrstcr",
            transparent: true,
            format: 'image/png8',
            styles: 'Count of Channelized Segments'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Count of Chicanes",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_st_sgmt_infrstcr",
            transparent: true,
            format: 'image/png8',
            styles: 'Count of Chicanes'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Count of Chokers",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_st_sgmt_infrstcr",
            transparent: true,
            format: 'image/png8',
            styles: 'Count of Chokers'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Number of Lanes AM",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_st_sgmt_infrstcr",
            transparent: true,
            format: 'image/png8',
            styles: 'Number of Lanes AM'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Number of Lanes Off-Peak",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_st_sgmt_infrstcr",
            transparent: true,
            format: 'image/png8',
            styles: 'Number of Lanes Off-Peak'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Number of Lanes PM",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_st_sgmt_infrstcr",
            transparent: true,
            format: 'image/png8',
            styles: 'Number of Lanes PM'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Presence of Median",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_st_sgmt_infrstcr",
            transparent: true,
            format: 'image/png8',
            styles: 'Presence of Median'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Count of Muni Stops",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_st_sgmt_infrstcr",
            transparent: true,
            format: 'image/png8',
            styles: 'Count of Muni Stops'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Presence of One-way Street",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_st_sgmt_infrstcr",
            transparent: true,
            format: 'image/png8',
            styles: 'Presence of One-way Street'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Count of Off Street Parking on Segment",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_st_sgmt_infrstcr",
            transparent: true,
            format: 'image/png8',
            styles: 'Count of Off Street Parking on Segment'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Count of On Street Parking on Segment",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_st_sgmt_infrstcr",
            transparent: true,
            format: 'image/png8',
            styles: 'Count of On Street Parking on Segment'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Count of Metered Parking Spaces",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_st_sgmt_infrstcr",
            transparent: true,
            format: 'image/png8',
            styles: 'Count of Metered Parking Spaces'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Count of PUC Lighting",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_st_sgmt_infrstcr",
            transparent: true,
            format: 'image/png8',
            styles: 'Count of PUC Lighting'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Presence of Off/On Ramp",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_st_sgmt_infrstcr",
            transparent: true,
            format: 'image/png8',
            styles: 'Presence of Off or On Ramp'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Count of Regional Transit Within a Quarter Mile of Segment",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_st_sgmt_infrstcr",
            transparent: true,
            format: 'image/png8',
            styles: 'Count of Regional Transit Within a Quarter Mile of Segment'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Slope of Street",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_st_sgmt_infrstcr",
            transparent: true,
            format: 'image/png8',
            styles: 'Slope'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Count of Speed Cushions",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_st_sgmt_infrstcr",
            transparent: true,
            format: 'image/png8',
            styles: 'Count of Speed Cushions'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Count of Speed Humps",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_st_sgmt_infrstcr",
            transparent: true,
            format: 'image/png8',
            styles: 'Count of Speed Humps'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Count of Speed Radar",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_st_sgmt_infrstcr",
            transparent: true,
            format: 'image/png8',
            styles: 'Count of Speed Radar'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Street Width",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_st_sgmt_infrstcr",
            transparent: true,
            format: 'image/png8',
            styles: 'Street Width'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Count of Traffic Circles",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_st_sgmt_infrstcr",
            transparent: true,
            format: 'image/png8',
            styles: 'Count of Traffic Circles'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Count of Traffic Islands",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_st_sgmt_infrstcr",
            transparent: true,
            format: 'image/png8',
            styles: 'Count of Traffic Islands'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Count of Traffic Calming Features",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_st_sgmt_infrstcr",
            transparent: true,
            format: 'image/png8',
            styles: 'Count of Traffic Calming Features'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Count of Trees",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_st_sgmt_infrstcr",
            transparent: true,
            format: 'image/png8',
            styles: 'Count of Trees'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Presence of Truck Route (Segment)",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_st_sgmt_infrstcr",
            transparent: true,
            format: 'image/png8',
            styles: 'Presence of Truck Route_segment'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    // new OpenLayers.Layer.WMS(
    // "Presence of Mid-block Crossing",
    // 'http://transbasesf.org/geoserver/transbase_public/ows?',
    // {layers: "vw_geo_st_sgmt_infrstcr", transparent: true, format: 'image/png8', styles:'Presence of Mid_block Crossing'},
    // {singleTile: true, opacity: 0.9, isBaseLayer: false, visibility: false, noLegend: false, featureInfoFormat: 'application/vnd.ogc.gml', transitionEffect: 'resize'
    // }
    // ),
    // new OpenLayers.Layer.WMS(
    // "Presence of Continental Crosswalk",
    // 'http://transbasesf.org/geoserver/transbase_public/ows?',
    // {layers: "vw_geo_st_sgmt_infrstcr", transparent: true, format: 'image/png8', styles:'Presence of Continental Crosswalk"'},
    // {singleTile: true, opacity: 0.9, isBaseLayer: false, visibility: false, noLegend: false, featureInfoFormat: 'application/vnd.ogc.gml', transitionEffect: 'resize'
    // }
    // ),
    // new OpenLayers.Layer.WMS(
    // "Presence of Mid-block Traffic Signal",
    // 'http://transbasesf.org/geoserver/transbase_public/ows?',
    // {layers: "vw_geo_st_sgmt_infrstcr", transparent: true, format: 'image/png8', styles:'Presence of Mid-block Traffic Signal'},
    // {singleTile: true, opacity: 0.9, isBaseLayer: false, visibility: false, noLegend: false, featureInfoFormat: 'application/vnd.ogc.gml', transitionEffect: 'resize'
    // }
    // ),
    // new OpenLayers.Layer.WMS(
    // "Mid-block Traffic Signal Type",
    // 'http://transbasesf.org/geoserver/transbase_public/ows?',
    // {layers: "vw_geo_st_sgmt_infrstcr", transparent: true, format: 'image/png8', styles:'Mid-block Traffic Signal Type'},
    // {singleTile: true, opacity: 0.9, isBaseLayer: false, visibility: false, noLegend: false, featureInfoFormat: 'application/vnd.ogc.gml', transitionEffect: 'resize'
    // }
    // ),
    // new OpenLayers.Layer.WMS(
    // "Presence of Audible Traffic Signal (ATS) at Mid-block Crossing",
    // 'http://transbasesf.org/geoserver/transbase_public/ows?',
    // {layers: "vw_geo_st_sgmt_infrstcr", transparent: true, format: 'image/png8', styles:'Presence of Audible Traffic Signal (ATS) at Mid-block Crossing'},
    // {singleTile: true, opacity: 0.9, isBaseLayer: false, visibility: false, noLegend: false, featureInfoFormat: 'application/vnd.ogc.gml', transitionEffect: 'resize'
    // }
    // ),

    /*
     * ==================================
     * STREET SEGMENTS -- TRANSPORTATION LAYERS
     * ==================================
     */

    new OpenLayers.Layer.WMS(
        "Daily Transit Riders within Quarter Mile Radius (Segment)",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_st_sgmt_trnsprtn",
            transparent: true,
            format: 'image/png8',
            styles: 'Daily Transit Riders within Quarter Mile Radius_segment'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Daily Transit Riders within Eighth Mile Radius (Segment)",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_st_sgmt_trnsprtn",
            transparent: true,
            format: 'image/png8',
            styles: 'Daily Transit Riders within Eighth Mile Radius_segment'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "MTA Speed Survey Average Speed",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_st_sgmt_trnsprtn",
            transparent: true,
            format: 'image/png8',
            styles: 'MTA Speed Survey Average Speed'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Cyclist High Injury Corridors (CHICs)",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_st_sgmt_cyc_hgh_injry_crrdr",
            transparent: true,
            format: 'image/png8',
            styles: 'Cyclist High Injury Corridors (CHICs)'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "Pedestrian High Injury Corridors (HICs)",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_st_sgmt_ped_hgh_injry_crrdr",
            transparent: true,
            format: 'image/png8',
            styles: 'Pedestrian High Injury Corridors (HICs)'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
	    new OpenLayers.Layer.WMS(
        "Vehicle High Injury Corridors (VHICs)",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_st_sgmt_veh_hgh_injry_crrdr",
            transparent: true,
            format: 'image/png8',
            styles: 'Vehicle High Injury Corridors (VHICs)'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
	    new OpenLayers.Layer.WMS(
        "Vision Zero High Injury Network",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_st_sgmt_vz_hgh_injry_ntwrk",
            transparent: true,
            format: 'image/png8',
            styles: 'Vision Zero High Injury Network'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),

    /*
     * ==================================
     * SWITRS DATA -- VEHICLE-PEDESTRIAN COLLISION VARIABLES
     * ==================================
     */

    //VEHICLE-PEDESTRIAN COLLISIONS TIME

    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - 6am to 10am",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_time_ped", "vw_geoserver_switrs_col_time_ped"],
            transparent: true,
            viewparams: 'timed:A',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - 10am to 2pm",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_time_ped", "vw_geoserver_switrs_col_time_ped"],
            transparent: true,
            viewparams: 'timed:B',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - 2pm to 6pm",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_time_ped", "vw_geoserver_switrs_col_time_ped"],
            transparent: true,
            viewparams: 'timed:C',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - 6pm to 10pm",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_time_ped", "vw_geoserver_switrs_col_time_ped"],
            transparent: true,
            viewparams: 'timed:D',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - 10pm to 2am",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_time_ped", "vw_geoserver_switrs_col_time_ped"],
            transparent: true,
            viewparams: 'timed:E',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - 2am to 6am",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_time_ped", "vw_geoserver_switrs_col_time_ped"],
            transparent: true,
            viewparams: 'timed:F',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),

    //VEHICLE-PEDESTRIAN COLLISIONS DAY

    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Monday",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_day_ped", "vw_geoserver_switrs_col_day_ped"],
            transparent: true,
            viewparams: 'day:1',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Tuesday",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_day_ped", "vw_geoserver_switrs_col_day_ped"],
            transparent: true,
            viewparams: 'day:2',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Wednesday",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_day_ped", "vw_geoserver_switrs_col_day_ped"],
            transparent: true,
            viewparams: 'day:3',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Thursday",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_day_ped", "vw_geoserver_switrs_col_day_ped"],
            transparent: true,
            viewparams: 'day:4',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Friday",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_day_ped", "vw_geoserver_switrs_col_day_ped"],
            transparent: true,
            viewparams: 'day:5',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Saturday",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_day_ped", "vw_geoserver_switrs_col_day_ped"],
            transparent: true,
            viewparams: 'day:6',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Sunday",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_day_ped", "vw_geoserver_switrs_col_day_ped"],
            transparent: true,
            viewparams: 'day:7',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),

    //VEHICLE-PEDESTRIAN COLLISION MONTH

    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - January",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_month_ped", "vw_geoserver_switrs_col_month_ped"],
            transparent: true,
            viewparams: 'date:01',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - February",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_month_ped", "vw_geoserver_switrs_col_month_ped"],
            transparent: true,
            viewparams: 'date:02',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - March",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_month_ped", "vw_geoserver_switrs_col_month_ped"],
            transparent: true,
            viewparams: 'date:03',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - April",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_month_ped", "vw_geoserver_switrs_col_month_ped"],
            transparent: true,
            viewparams: 'date:04',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - May",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_month_ped", "vw_geoserver_switrs_col_month_ped"],
            transparent: true,
            viewparams: 'date:05',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - June",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_month_ped", "vw_geoserver_switrs_col_month_ped"],
            transparent: true,
            viewparams: 'date:06',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - July",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_month_ped", "vw_geoserver_switrs_col_month_ped"],
            transparent: true,
            viewparams: 'date:07',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - August",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_month_ped", "vw_geoserver_switrs_col_month_ped"],
            transparent: true,
            viewparams: 'date:08',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - September",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_month_ped", "vw_geoserver_switrs_col_month_ped"],
            transparent: true,
            viewparams: 'date:09',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - October",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_month_ped", "vw_geoserver_switrs_col_month_ped"],
            transparent: true,
            viewparams: 'date:10',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - November",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_month_ped", "vw_geoserver_switrs_col_month_ped"],
            transparent: true,
            viewparams: 'date:11',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - December",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_month_ped", "vw_geoserver_switrs_col_month_ped"],
            transparent: true,
            viewparams: 'date:12',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),

    //VEHICLE-PEDESTRIAN COLLISIONS YEAR

    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - 2005",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_year_ped", "vw_geoserver_switrs_col_year_ped"],
            transparent: true,
            viewparams: 'yearc:2005',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - 2006",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_year_ped", "vw_geoserver_switrs_col_year_ped"],
            transparent: true,
            viewparams: 'yearc:2006',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - 2007",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_year_ped", "vw_geoserver_switrs_col_year_ped"],
            transparent: true,
            viewparams: 'yearc:2007',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - 2008",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_year_ped", "vw_geoserver_switrs_col_year_ped"],
            transparent: true,
            viewparams: 'yearc:2008',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - 2009",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_year_ped", "vw_geoserver_switrs_col_year_ped"],
            transparent: true,
            viewparams: 'yearc:2009',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - 2010",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_year_ped", "vw_geoserver_switrs_col_year_ped"],
            transparent: true,
            viewparams: 'yearc:2010',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - 2011",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_year_ped", "vw_geoserver_switrs_col_year_ped"],
            transparent: true,
            viewparams: 'yearc:2011',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
	    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - 2012",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_year_ped", "vw_geoserver_switrs_col_year_ped"],
            transparent: true,
            viewparams: 'yearc:2012',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),

    //VEHICLE-PEDESTRIAN COLLISION WEATHER

    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Clear",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_weather_ped", "vw_geoserver_switrs_col_weather_ped"],
            transparent: true,
            viewparams: 'weather:A',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Cloudy",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_weather_ped", "vw_geoserver_switrs_col_weather_ped"],
            transparent: true,
            viewparams: 'weather:B',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Raining",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_weather_ped", "vw_geoserver_switrs_col_weather_ped"],
            transparent: true,
            viewparams: 'weather:C',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Snowing",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_weather_ped", "vw_geoserver_switrs_col_weather_ped"],
            transparent: true,
            viewparams: 'weather:D',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Fog",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_weather_ped", "vw_geoserver_switrs_col_weather_ped"],
            transparent: true,
            viewparams: 'weather:E',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Other Weather",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_weather_ped", "vw_geoserver_switrs_col_weather_ped"],
            transparent: true,
            viewparams: 'weather:F',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Wind",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_weather_ped", "vw_geoserver_switrs_col_weather_ped"],
            transparent: true,
            viewparams: 'weather:G',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Weather Not Stated",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_weather_ped", "vw_geoserver_switrs_col_weather_ped"],
            transparent: true,
            viewparams: 'weather:-',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),

    //VEHICLE-PEDESTRIAN COLLISION TYPE OF COLLISION

    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Head-On",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_type_ped", "vw_geoserver_switrs_col_type_ped"],
            transparent: true,
            viewparams: 'typec:A',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Sideswipe",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_type_ped", "vw_geoserver_switrs_col_type_ped"],
            transparent: true,
            viewparams: 'typec:B',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Rear End",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_type_ped", "vw_geoserver_switrs_col_type_ped"],
            transparent: true,
            viewparams: 'typec:C',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Broadside",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_type_ped", "vw_geoserver_switrs_col_type_ped"],
            transparent: true,
            viewparams: 'typec:D',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Hit Object",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_type_ped", "vw_geoserver_switrs_col_type_ped"],
            transparent: true,
            viewparams: 'typec:E',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Overturned",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_type_ped", "vw_geoserver_switrs_col_type_ped"],
            transparent: true,
            viewparams: 'typec:F',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Vehicle/Pedestrian",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_type_ped", "vw_geoserver_switrs_col_type_ped"],
            transparent: true,
            viewparams: 'typec:G',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Other Type of Collision",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_type_ped", "vw_geoserver_switrs_col_type_ped"],
            transparent: true,
            viewparams: 'typec:H',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Type of Collision Not Stated",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_type_ped", "vw_geoserver_switrs_col_type_ped"],
            transparent: true,
            viewparams: 'typec:-',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),

    //VEHICLE-PEDESTRIAN COLLISIONS PCF VIOLATIONS	

    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Under Influence",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_pcf_ped", "vw_geoserver_switrs_col_pcf_ped"],
            transparent: true,
            viewparams: 'pcf:01',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Impeding Traffic",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_pcf_ped", "vw_geoserver_switrs_col_pcf_ped"],
            transparent: true,
            viewparams: 'pcf:02',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Unsafe Speed",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_pcf_ped", "vw_geoserver_switrs_col_pcf_ped"],
            transparent: true,
            viewparams: 'pcf:03',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Following Too Closely",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_pcf_ped", "vw_geoserver_switrs_col_pcf_ped"],
            transparent: true,
            viewparams: 'pcf:04',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Wrong Side of Road",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_pcf_ped", "vw_geoserver_switrs_col_pcf_ped"],
            transparent: true,
            viewparams: 'pcf:05',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Improper Passing",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_pcf_ped", "vw_geoserver_switrs_col_pcf_ped"],
            transparent: true,
            viewparams: 'pcf:06',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Unsafe Lane Change",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_pcf_ped", "vw_geoserver_switrs_col_pcf_ped"],
            transparent: true,
            viewparams: 'pcf:07',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Improper Turning",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_pcf_ped", "vw_geoserver_switrs_col_pcf_ped"],
            transparent: true,
            viewparams: 'pcf:08',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Automobile Right of Way",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_pcf_ped", "vw_geoserver_switrs_col_pcf_ped"],
            transparent: true,
            viewparams: 'pcf:09',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Pedestrian Right of Way",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_pcf_ped", "vw_geoserver_switrs_col_pcf_ped"],
            transparent: true,
            viewparams: 'pcf:10',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Pedestrian Violation",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_pcf_ped", "vw_geoserver_switrs_col_pcf_ped"],
            transparent: true,
            viewparams: 'pcf:11',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Traffic Signals and Signs",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_pcf_ped", "vw_geoserver_switrs_col_pcf_ped"],
            transparent: true,
            viewparams: 'pcf:12',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Hazardous Parking",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_pcf_ped", "vw_geoserver_switrs_col_pcf_ped"],
            transparent: true,
            viewparams: 'pcf:13',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Lights",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_pcf_ped", "vw_geoserver_switrs_col_pcf_ped"],
            transparent: true,
            viewparams: 'pcf:14',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Brakes",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_pcf_ped", "vw_geoserver_switrs_col_pcf_ped"],
            transparent: true,
            viewparams: 'pcf:15',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Other Equipment",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_pcf_ped", "vw_geoserver_switrs_col_pcf_ped"],
            transparent: true,
            viewparams: 'pcf:16',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Other Hazardous Violation",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_pcf_ped", "vw_geoserver_switrs_col_pcf_ped"],
            transparent: true,
            viewparams: 'pcf:17',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Other Than Driver (or Pedestrian)",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_pcf_ped", "vw_geoserver_switrs_col_pcf_ped"],
            transparent: true,
            viewparams: 'pcf:18',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Unsafe Starting or Backing",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_pcf_ped", "vw_geoserver_switrs_col_pcf_ped"],
            transparent: true,
            viewparams: 'pcf:21',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Other Improper Driving",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_pcf_ped", "vw_geoserver_switrs_col_pcf_ped"],
            transparent: true,
            viewparams: 'pcf:22',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Pedestrian Under the Influence of Drugs/Alcohol",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_pcf_ped", "vw_geoserver_switrs_col_pcf_ped"],
            transparent: true,
            viewparams: 'pcf:23',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Fell Asleep",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_pcf_ped", "vw_geoserver_switrs_col_pcf_ped"],
            transparent: true,
            viewparams: 'pcf:24',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - PCF Violation Unknown",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_pcf_ped", "vw_geoserver_switrs_col_pcf_ped"],
            transparent: true,
            viewparams: 'pcf:00',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - PCF Not Stated",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_pcf_ped", "vw_geoserver_switrs_col_pcf_ped"],
            transparent: true,
            viewparams: 'pcf:-',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),

    //VEHICLE-PEDESTRIAN COLLISION HIT AND RUN

    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Felony Hit and Run",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_hitrun_ped", "vw_geoserver_switrs_col_hitrun_ped"],
            transparent: true,
            viewparams: 'hr:F',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Misdemeanor Hit and Run",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_hitrun_ped", "vw_geoserver_switrs_col_hitrun_ped"],
            transparent: true,
            viewparams: 'hr:M',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Not a Hit and Run",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_hitrun_ped", "vw_geoserver_switrs_col_hitrun_ped"],
            transparent: true,
            viewparams: 'hr:N',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),

    //VEHICLE-PEDESTRIAN COLLISIONS DRUGS/ALCOHOL

    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Alcohol Involved",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_alcohol_ped", "vw_geoserver_switrs_col_alcohol_ped"],
            transparent: true,
            viewparams: 'alcohol:Y',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),

    /*
     * ==================================
     * SWITRS DATA -- VEHICLE-PEDESTRIAN PARTY=DRIVER VARIABLES
     * ==================================
     */

    //VEHICLE-PEDESTRIAN PARTY=DRIVER AT FAULT

    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Driver Party at Fault",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_ped_driver_prty_fault", "vw_geoserver_ped_driver_prty_fault"],
            transparent: true,
            viewparams: 'fault:Y',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),

    //VEHICLE-PEDESTRIAN PARTY=DRIVER GENDER

    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Driver Party Male",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_ped_driver_prty_gender", "vw_geoserver_ped_driver_prty_gender"],
            transparent: true,
            viewparams: 'gender:M',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Driver Party Female",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_ped_driver_prty_gender", "vw_geoserver_ped_driver_prty_gender"],
            transparent: true,
            viewparams: 'gender:F',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Driver Party Gender Not Stated",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_ped_driver_prty_gender", "vw_geoserver_ped_driver_prty_gender"],
            transparent: true,
            viewparams: 'gender:-',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),

    //VEHICLE-PEDESTRIAN PARTY=DRIVER AGE

    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Driver Party Age 13 to 17",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_ped_driver_prty_age", "vw_geoserver_ped_driver_prty_age"],
            transparent: true,
            viewparams: 'age1:13;age2:17',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Driver Party Age 18 to 24",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_ped_driver_prty_age", "vw_geoserver_ped_driver_prty_age"],
            transparent: true,
            viewparams: 'age1:18;age2:24',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Driver Party Age 25 to 34",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_ped_driver_prty_age", "vw_geoserver_ped_driver_prty_age"],
            transparent: true,
            viewparams: 'age1:25;age2:34',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Driver Party Age 35 to 44",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_ped_driver_prty_age", "vw_geoserver_ped_driver_prty_age"],
            transparent: true,
            viewparams: 'age1:35;age2:44',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Driver Party Age 45 to 54",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_ped_driver_prty_age", "vw_geoserver_ped_driver_prty_age"],
            transparent: true,
            viewparams: 'age1:45;age2:54',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Driver Party Age 55 to 64",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_ped_driver_prty_age", "vw_geoserver_ped_driver_prty_age"],
            transparent: true,
            viewparams: 'age1:55;age2:64',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Driver Party Age 65 Plus",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_ped_driver_prty_age", "vw_geoserver_ped_driver_prty_age"],
            transparent: true,
            viewparams: 'age1:65;age2:997',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Driver Party Age Unknown",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_ped_driver_prty_age", "vw_geoserver_ped_driver_prty_age"],
            transparent: true,
            viewparams: 'age1:998;age2:998',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),

    //VEHICLE-PEDESTRIAN PARTY=DRIVER MOVEMENT PRECEDING COLLISION (MPC)

    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Driver Movement Preceding Collision Stopped",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_ped_driver_prty_mpc", "vw_geoserver_ped_driver_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:A',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Driver Movement Preceding Collision Straight",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_ped_driver_prty_mpc", "vw_geoserver_ped_driver_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:B',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Driver Movement Preceding Collision Ran Off Road",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_ped_driver_prty_mpc", "vw_geoserver_ped_driver_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:C',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Driver Movement Preceding Collision Making Right Turn",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_ped_driver_prty_mpc", "vw_geoserver_ped_driver_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:D',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Driver Movement Preceding Collision Making Left",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_ped_driver_prty_mpc", "vw_geoserver_ped_driver_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:E',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Driver Movement Preceding Collision Making U Turn",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_ped_driver_prty_mpc", "vw_geoserver_ped_driver_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:F',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Driver Movement Preceding Collision Backing",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_ped_driver_prty_mpc", "vw_geoserver_ped_driver_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:G',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Driver Movement Preceding Collision Slowing",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_ped_driver_prty_mpc", "vw_geoserver_ped_driver_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:H',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Driver Movement Preceding Collision Passing",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_ped_driver_prty_mpc", "vw_geoserver_ped_driver_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:I',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Driver Movement Preceding Collision Lane Change",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_ped_driver_prty_mpc", "vw_geoserver_ped_driver_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:J',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ), new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Driver Movement Preceding Collision Parking",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_ped_driver_prty_mpc", "vw_geoserver_ped_driver_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:K',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Driver Movement Preceding Collision Entering Roadway",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_ped_driver_prty_mpc", "vw_geoserver_ped_driver_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:L',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Driver Movement Preceding Collision Other Turning",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_ped_driver_prty_mpc", "vw_geoserver_ped_driver_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:M',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Driver Movement Preceding Collision Crossed Into Opposing Lane",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_ped_driver_prty_mpc", "vw_geoserver_ped_driver_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:N',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Driver Movement Preceding Collision Parked",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_ped_driver_prty_mpc", "vw_geoserver_ped_driver_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:O',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Driver Movement Preceding Collision Merging",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_ped_driver_prty_mpc", "vw_geoserver_ped_driver_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:P',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Driver Movement Preceding Collision Wrong Way",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_ped_driver_prty_mpc", "vw_geoserver_ped_driver_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:Q',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Driver Movement Preceding Collision Other",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_ped_driver_prty_mpc", "vw_geoserver_ped_driver_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:R',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Driver Movement Preceding Collision Not Stated",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_ped_driver_prty_mpc", "vw_geoserver_ped_driver_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:-',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),

    //VEHICLE-PEDESTRIAN PARTY=DRIVER STATE VEHICLE TYPE (SVT)

    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - State Vehicle Type Passenger Car",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_ped_driver_prty_svt", "vw_geoserver_ped_driver_prty_svt"],
            transparent: true,
            viewparams: 'svt:A',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - State Vehicle Type Passenger Trailer",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_ped_driver_prty_svt", "vw_geoserver_ped_driver_prty_svt"],
            transparent: true,
            viewparams: 'svt:B',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - State Vehicle Type Motorcycle",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_ped_driver_prty_svt", "vw_geoserver_ped_driver_prty_svt"],
            transparent: true,
            viewparams: 'svt:C',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - State Vehicle Type Pickup",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_ped_driver_prty_svt", "vw_geoserver_ped_driver_prty_svt"],
            transparent: true,
            viewparams: 'svt:D',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - State Vehicle Type Pickup Trailer",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_ped_driver_prty_svt", "vw_geoserver_ped_driver_prty_svt"],
            transparent: true,
            viewparams: 'svt:E',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - State Vehicle Type Truck",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_ped_driver_prty_svt", "vw_geoserver_ped_driver_prty_svt"],
            transparent: true,
            viewparams: 'svt:F',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - State Vehicle Type Truck Trailer",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_ped_driver_prty_svt", "vw_geoserver_ped_driver_prty_svt"],
            transparent: true,
            viewparams: 'svt:G',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - State Vehicle Type School Bus",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_ped_driver_prty_svt", "vw_geoserver_ped_driver_prty_svt"],
            transparent: true,
            viewparams: 'svt:H',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - State Vehicle Type Other Bus",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_ped_driver_prty_svt", "vw_geoserver_ped_driver_prty_svt"],
            transparent: true,
            viewparams: 'svt:I',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - State Vehicle Type Emergency Vehicle",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_ped_driver_prty_svt", "vw_geoserver_ped_driver_prty_svt"],
            transparent: true,
            viewparams: 'svt:J',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - State Vehicle Type Heavy Equipment",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_ped_driver_prty_svt", "vw_geoserver_ped_driver_prty_svt"],
            transparent: true,
            viewparams: 'svt:K',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - State Vehicle Type Bicycle",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_ped_driver_prty_svt", "vw_geoserver_ped_driver_prty_svt"],
            transparent: true,
            viewparams: 'svt:L',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - State Vehicle Type Other Vehicle",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_ped_driver_prty_svt", "vw_geoserver_ped_driver_prty_svt"],
            transparent: true,
            viewparams: 'svt:M',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - State Vehicle Type Pedestrian",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_ped_driver_prty_svt", "vw_geoserver_ped_driver_prty_svt"],
            transparent: true,
            viewparams: 'svt:N',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - State Vehicle Type Moped",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_ped_driver_prty_svt", "vw_geoserver_ped_driver_prty_svt"],
            transparent: true,
            viewparams: 'svt:O',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - State Vehicle Type Not Stated",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_ped_driver_prty_svt", "vw_geoserver_ped_driver_prty_svt"],
            transparent: true,
            viewparams: 'svt:-',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),

    //VEHICLE-PEDESTRIAN PARTY=DRIVER RACE

    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Driver Party Asian",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_ped_driver_prty_race", "vw_geoserver_ped_driver_prty_race"],
            transparent: true,
            viewparams: 'race:A',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Driver Party Black",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_ped_driver_prty_race", "vw_geoserver_ped_driver_prty_race"],
            transparent: true,
            viewparams: 'race:B',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Driver Party Hispanic",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_ped_driver_prty_race", "vw_geoserver_ped_driver_prty_race"],
            transparent: true,
            viewparams: 'race:H',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Driver Party Race Other",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_ped_driver_prty_race", "vw_geoserver_ped_driver_prty_race"],
            transparent: true,
            viewparams: 'race:O',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Driver Party White",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_ped_driver_prty_race", "vw_geoserver_ped_driver_prty_race"],
            transparent: true,
            viewparams: 'race:W',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Driver Party Race Not Stated",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_ped_driver_prty_race", "vw_geoserver_ped_driver_prty_race"],
            transparent: true,
            viewparams: 'race:-',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),

    //VEHICLE-PEDESTRIAN PARTY=DRIVER SOBRIETY

    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Driver Party Had Not Been Drinking",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_ped_driver_prty_sobriety", "vw_geoserver_ped_driver_prty_sobriety"],
            transparent: true,
            viewparams: 'sobriety:A',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Driver Party Had Been Drinking, Under the Influence",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_ped_driver_prty_sobriety", "vw_geoserver_ped_driver_prty_sobriety"],
            transparent: true,
            viewparams: 'sobriety:B',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Driver Party Had Been Drinking, Not Under Influence",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_ped_driver_prty_sobriety", "vw_geoserver_ped_driver_prty_sobriety"],
            transparent: true,
            viewparams: 'sobriety:C',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Driver Party Had Been Drinking, Impairment Unknown",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_ped_driver_prty_sobriety", "vw_geoserver_ped_driver_prty_sobriety"],
            transparent: true,
            viewparams: 'sobriety:D',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Driver Party Impairment Unknown",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_ped_driver_prty_sobriety", "vw_geoserver_ped_driver_prty_sobriety"],
            transparent: true,
            viewparams: 'sobriety:G',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Driver Party Sobriety Not Applicable",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_ped_driver_prty_sobriety", "vw_geoserver_ped_driver_prty_sobriety"],
            transparent: true,
            viewparams: 'sobriety:H',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Driver Party Sobriety Not Stated",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_ped_driver_prty_sobriety", "vw_geoserver_ped_driver_prty_sobriety"],
            transparent: true,
            viewparams: 'sobriety:-',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),

    /*
     * ==================================
     * SWITRS DATA -- VEHICLE-PEDESTRIAN PARTY=PEDESTRIAN VARIABLES
     * ==================================
     */

    //VEHICLE-PEDESTRIAN PARTY=PEDESTRIAN AT FAULT

    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Pedestrian Party at Fault",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_ped_prty_fault", "vw_geoserver_ped_prty_fault"],
            transparent: true,
            viewparams: 'fault:Y',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),

    //VEHICLE-PEDESTRIAN PARTY=PEDESTRIAN MOVEMENT PRECEDING COLLISION (MPC)

    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Pedestrian Party Movement Preceding Collision Stopped",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_ped_prty_mpc", "vw_geoserver_ped_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:A',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Pedestrian Party Movement Preceding Collision Straight",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_ped_prty_mpc", "vw_geoserver_ped_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:B',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Pedestrian Party Movement Preceding Collision Ran Off Road",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_ped_prty_mpc", "vw_geoserver_ped_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:C',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Pedestrian Party Movement Preceding Collision Making Right Turn",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_ped_prty_mpc", "vw_geoserver_ped_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:D',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Pedestrian Party Movement Preceding Collision Making Left Turn",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_ped_prty_mpc", "vw_geoserver_ped_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:E',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Pedestrian Party Movement Preceding Collision Making U Turn",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_ped_prty_mpc", "vw_geoserver_ped_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:F',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Pedestrian Party Movement Preceding Collision Backing",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_ped_prty_mpc", "vw_geoserver_ped_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:G',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Pedestrian Party Movement Preceding Collision Slowing",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_ped_prty_mpc", "vw_geoserver_ped_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:H',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Pedestrian Party Movement Preceding Collision Passing",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_ped_prty_mpc", "vw_geoserver_ped_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:I',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Pedestrian Party Movement Preceding Collision Changing Lanes",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_ped_prty_mpc", "vw_geoserver_ped_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:J',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ), new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Pedestrian Party Movement Preceding Collision Parking",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_ped_prty_mpc", "vw_geoserver_ped_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:K',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Pedestrian Party Movement Preceding Collision Entering Roadway",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_ped_prty_mpc", "vw_geoserver_ped_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:L',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Pedestrian Party Movement Preceding Collision Other Turning",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_ped_prty_mpc", "vw_geoserver_ped_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:M',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Pedestrian Party Movement Preceding Collision Crossed Into Opposing Lane",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_ped_prty_mpc", "vw_geoserver_ped_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:N',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Pedestrian Party Movement Preceding Collision Parked",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_ped_prty_mpc", "vw_geoserver_ped_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:O',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Pedestrian Party Movement Preceding Collision Merging",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_ped_prty_mpc", "vw_geoserver_ped_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:P',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Pedestrian Party Movement Preceding Collision Wrong Way",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_ped_prty_mpc", "vw_geoserver_ped_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:Q',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Pedestrian Party Movement Preceding Collision Other",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_ped_prty_mpc", "vw_geoserver_ped_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:R',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Pedestrian Party Movement Preceding Collision Not Stated",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_ped_prty_mpc", "vw_geoserver_ped_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:-',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),

    //VEHICLE-PEDESTRIAN PARTY=PEDESTRIAN RACE

    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Pedestrian Party Asian",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_ped_prty_race", "vw_geoserver_ped_prty_race"],
            transparent: true,
            viewparams: 'race:A',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Pedestrian Party Black",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_ped_prty_race", "vw_geoserver_ped_prty_race"],
            transparent: true,
            viewparams: 'race:B',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Pedestrian Party Hispanic",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_ped_prty_race", "vw_geoserver_ped_prty_race"],
            transparent: true,
            viewparams: 'race:H',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Pedestrian Party Other Race",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_ped_prty_race", "vw_geoserver_ped_prty_race"],
            transparent: true,
            viewparams: 'race:O',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Pedestrian Party White",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_ped_prty_race", "vw_geoserver_ped_prty_race"],
            transparent: true,
            viewparams: 'race:W',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Pedestrian Party Race Not Stated",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_ped_prty_race", "vw_geoserver_ped_prty_race"],
            transparent: true,
            viewparams: 'race:-',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),

    //VEHICLE-PEDESTRIAN PARTY=PEDESTRIAN SOBRIETY

    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Pedestrian Party Had Not Been Drinking",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_ped_prty_sobriety", "vw_geoserver_ped_prty_sobriety"],
            transparent: true,
            viewparams: 'sobriety:A',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Pedestrian Party Had Been Drinking, Under the Influence",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_ped_prty_sobriety", "vw_geoserver_ped_prty_sobriety"],
            transparent: true,
            viewparams: 'sobriety:B',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Pedestrian Party Had Been Drinking, Not Under Influence",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_ped_prty_sobriety", "vw_geoserver_ped_prty_sobriety"],
            transparent: true,
            viewparams: 'sobriety:C',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Pedestrian Party Had Been Drinking, Impairment Unknown",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_ped_prty_sobriety", "vw_geoserver_ped_prty_sobriety"],
            transparent: true,
            viewparams: 'sobriety:D',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Pedestrian Party Impairment Unknown",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_ped_prty_sobriety", "vw_geoserver_ped_prty_sobriety"],
            transparent: true,
            viewparams: 'sobriety:G',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Pedestrian Party Sobriety Not Applicable",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_ped_prty_sobriety", "vw_geoserver_ped_prty_sobriety"],
            transparent: true,
            viewparams: 'sobriety:H',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Pedestrian Party Sobriety Not Stated",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_ped_prty_sobriety", "vw_geoserver_ped_prty_sobriety"],
            transparent: true,
            viewparams: 'sobriety:-',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),

    /*
     * ==================================
     * SWITRS DATA -- VEHICLE-PEDESTRIAN VICTIM=PEDESTRIAN VARIABLES
     * ==================================
     */

    //VEHICLE-PEDESTRIAN VICTIM=PEDESTRIAN GENDER

    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Pedestrian Victim Male",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_vctm_gender_ped", "vw_geoserver_switrs_vctm_gender_ped"],
            transparent: true,
            viewparams: 'gender:M',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Pedestrian Victim Female",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_vctm_gender_ped", "vw_geoserver_switrs_vctm_gender_ped"],
            transparent: true,
            viewparams: 'gender:F',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Pedestrian Victim Not Stated",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_vctm_gender_ped", "vw_geoserver_switrs_vctm_gender_ped"],
            transparent: true,
            viewparams: 'gender:-',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),

    //VEHICLE-PEDESTRIAN VICTIM=PEDESTRIAN AGE

    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Pedestrian Victim Age 0 to 12",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_vctm_age_ped", "vw_geoserver_switrs_vctm_age_ped"],
            transparent: true,
            viewparams: 'age1:0;age2:12',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Pedestrian Victim Age 13 to 17",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_vctm_age_ped", "vw_geoserver_switrs_vctm_age_ped"],
            transparent: true,
            viewparams: 'age1:13;age2:17',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Pedestrian Victim Age 18 to 24",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_vctm_age_ped", "vw_geoserver_switrs_vctm_age_ped"],
            transparent: true,
            viewparams: 'age1:18;age2:24',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Pedestrian Victim Age 25 to 34",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_vctm_age_ped", "vw_geoserver_switrs_vctm_age_ped"],
            transparent: true,
            viewparams: 'age1:25;age2:34',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Pedestrian Victim Age 35 to 44",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_vctm_age_ped", "vw_geoserver_switrs_vctm_age_ped"],
            transparent: true,
            viewparams: 'age1:35;age2:44',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Pedestrian Victim Age 45 to 54",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_vctm_age_ped", "vw_geoserver_switrs_vctm_age_ped"],
            transparent: true,
            viewparams: 'age1:45;age2:54',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Pedestrian Victim Age 55 to 64",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_vctm_age_ped", "vw_geoserver_switrs_vctm_age_ped"],
            transparent: true,
            viewparams: 'age1:55;age2:64',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Pedestrian Victim Age 65 Plus",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_vctm_age_ped", "vw_geoserver_switrs_vctm_age_ped"],
            transparent: true,
            viewparams: 'age1:65;age2:997',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Pedestrian Victim Age Unknown",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_vctm_age_ped", "vw_geoserver_switrs_vctm_age_ped"],
            transparent: true,
            viewparams: 'age1:998;age2:998',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),

    //VEHICLE-PEDESTRIAN VICTIM=PEDESTRIAN DEGREE OF INJURY

    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Pedestrian Victim Killed",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_vctm_doi_ped", "vw_geoserver_switrs_vctm_doi_ped"],
            transparent: true,
            viewparams: 'doi:1',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Pedestrian Victim Severely Injured",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_vctm_doi_ped", "vw_geoserver_switrs_vctm_doi_ped"],
            transparent: true,
            viewparams: 'doi:2',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Pedestrian Victim Other Visible Injury",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_vctm_doi_ped", "vw_geoserver_switrs_vctm_doi_ped"],
            transparent: true,
            viewparams: 'doi:3',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Pedestrian Collisions - Pedestrian Victim Complaint of Pain",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_vctm_doi_ped", "vw_geoserver_switrs_vctm_doi_ped"],
            transparent: true,
            viewparams: 'doi:4',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),

    /*
     * ==================================
     * SWITRS DATA -- VEHICLE-CYCLIST COLLISION VARIABLES
     * ==================================
     */

    //VEHICLE-CYCLIST COLLISIONS TIME

    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - 6am to 10am",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_time_cyc", "vw_geoserver_switrs_col_time_cyc"],
            transparent: true,
            viewparams: 'timed:A',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - 10am to 2pm",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_time_cyc", "vw_geoserver_switrs_col_time_cyc"],
            transparent: true,
            viewparams: 'timed:B',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - 2pm to 6pm",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_time_cyc", "vw_geoserver_switrs_col_time_cyc"],
            transparent: true,
            viewparams: 'timed:C',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - 6pm to 10pm",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_time_cyc", "vw_geoserver_switrs_col_time_cyc"],
            transparent: true,
            viewparams: 'timed:D',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - 10pm to 2am",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_time_cyc", "vw_geoserver_switrs_col_time_cyc"],
            transparent: true,
            viewparams: 'timed:E',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - 2am to 6am",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_time_cyc", "vw_geoserver_switrs_col_time_cyc"],
            transparent: true,
            viewparams: 'timed:F',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),

    //VEHICLE-CYCLIST COLLISIONS DAY

    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Monday",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_day_cyc", "vw_geoserver_switrs_col_day_cyc"],
            transparent: true,
            viewparams: 'day:1',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Tuesday",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_day_cyc", "vw_geoserver_switrs_col_day_cyc"],
            transparent: true,
            viewparams: 'day:2',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Wednesday",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_day_cyc", "vw_geoserver_switrs_col_day_cyc"],
            transparent: true,
            viewparams: 'day:3',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Thursday",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_day_cyc", "vw_geoserver_switrs_col_day_cyc"],
            transparent: true,
            viewparams: 'day:4',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Friday",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_day_cyc", "vw_geoserver_switrs_col_day_cyc"],
            transparent: true,
            viewparams: 'day:5',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Saturday",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_day_cyc", "vw_geoserver_switrs_col_day_cyc"],
            transparent: true,
            viewparams: 'day:6',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Sunday",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_day_cyc", "vw_geoserver_switrs_col_day_cyc"],
            transparent: true,
            viewparams: 'day:7',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),

    //VEHICLE-CYCLIST COLLISIONS MONTH

    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - January",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_month_cyc", "vw_geoserver_switrs_col_month_cyc"],
            transparent: true,
            viewparams: 'date:01',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - February",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_month_cyc", "vw_geoserver_switrs_col_month_cyc"],
            transparent: true,
            viewparams: 'date:02',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - March",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_month_cyc", "vw_geoserver_switrs_col_month_cyc"],
            transparent: true,
            viewparams: 'date:03',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - April",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_month_cyc", "vw_geoserver_switrs_col_month_cyc"],
            transparent: true,
            viewparams: 'date:04',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - May",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_month_cyc", "vw_geoserver_switrs_col_month_cyc"],
            transparent: true,
            viewparams: 'date:05',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - June",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_month_cyc", "vw_geoserver_switrs_col_month_cyc"],
            transparent: true,
            viewparams: 'date:06',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - July",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_month_cyc", "vw_geoserver_switrs_col_month_cyc"],
            transparent: true,
            viewparams: 'date:07',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - August",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_month_cyc", "vw_geoserver_switrs_col_month_cyc"],
            transparent: true,
            viewparams: 'date:08',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - September",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_month_cyc", "vw_geoserver_switrs_col_month_cyc"],
            transparent: true,
            viewparams: 'date:09',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - October",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geoserver_switrs_col_month_cyc",
            transparent: true,
            viewparams: 'date:10',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - November",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_month_cyc", "vw_geoserver_switrs_col_month_cyc"],
            transparent: true,
            viewparams: 'date:11',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - December",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_month_cyc", "vw_geoserver_switrs_col_month_cyc"],
            transparent: true,
            viewparams: 'date:12',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),

    //VEHICLE-CYCLIST COLLISIONS YEAR

    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - 2005",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_year_cyc", "vw_geoserver_switrs_col_year_cyc"],
            transparent: true,
            viewparams: 'yearc:2005',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - 2006",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_year_cyc", "vw_geoserver_switrs_col_year_cyc"],
            transparent: true,
            viewparams: 'yearc:2006',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - 2007",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_year_cyc", "vw_geoserver_switrs_col_year_cyc"],
            transparent: true,
            viewparams: 'yearc:2007',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - 2008",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_year_cyc", "vw_geoserver_switrs_col_year_cyc"],
            transparent: true,
            viewparams: 'yearc:2008',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - 2009",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_year_cyc", "vw_geoserver_switrs_col_year_cyc"],
            transparent: true,
            viewparams: 'yearc:2009',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - 2010",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_year_cyc", "vw_geoserver_switrs_col_year_cyc"],
            transparent: true,
            viewparams: 'yearc:2010',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - 2011",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_year_cyc", "vw_geoserver_switrs_col_year_cyc"],
            transparent: true,
            viewparams: 'yearc:2011',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - 2012",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_year_cyc", "vw_geoserver_switrs_col_year_cyc"],
            transparent: true,
            viewparams: 'yearc:2012',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),

    //VEHICLE-CYCLIST COLLISIONS WEATHER

    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Clear",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_weather_cyc", "vw_geoserver_switrs_col_weather_cyc"],
            transparent: true,
            viewparams: 'weather:A',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Cloudy",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_weather_cyc", "vw_geoserver_switrs_col_weather_cyc"],
            transparent: true,
            viewparams: 'weather:B',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Raining",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_weather_cyc", "vw_geoserver_switrs_col_weather_cyc"],
            transparent: true,
            viewparams: 'weather:C',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Snowing",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_weather_cyc", "vw_geoserver_switrs_col_weather_cyc"],
            transparent: true,
            viewparams: 'weather:D',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Fog",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_weather_cyc", "vw_geoserver_switrs_col_weather_cyc"],
            transparent: true,
            viewparams: 'weather:E',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Other Weather",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_weather_cyc", "vw_geoserver_switrs_col_weather_cyc"],
            transparent: true,
            viewparams: 'weather:F',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Wind",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_weather_cyc", "vw_geoserver_switrs_col_weather_cyc"],
            transparent: true,
            viewparams: 'weather:G',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Weather Not Stated",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_weather_cyc", "vw_geoserver_switrs_col_weather_cyc"],
            transparent: true,
            viewparams: 'weather:-',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),

    //VEHICLE-CYCLIST COLLISIONS TYPE OF COLLISION	

    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Head-On",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_type_cyc", "vw_geoserver_switrs_col_type_cyc"],
            transparent: true,
            viewparams: 'typec:A',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Sideswipe",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_type_cyc", "vw_geoserver_switrs_col_type_cyc"],
            transparent: true,
            viewparams: 'typec:B',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Rear End",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_type_cyc", "vw_geoserver_switrs_col_type_cyc"],
            transparent: true,
            viewparams: 'typec:C',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Broadside",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_type_cyc", "vw_geoserver_switrs_col_type_cyc"],
            transparent: true,
            viewparams: 'typec:D',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Hit Object",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_type_cyc", "vw_geoserver_switrs_col_type_cyc"],
            transparent: true,
            viewparams: 'typec:E',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Overturned",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_type_cyc", "vw_geoserver_switrs_col_type_cyc"],
            transparent: true,
            viewparams: 'typec:F',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Vehicle/Pedestrian",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_type_cyc", "vw_geoserver_switrs_col_type_cyc"],
            transparent: true,
            viewparams: 'typec:G',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Other Type of Collision",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_type_cyc", "vw_geoserver_switrs_col_type_cyc"],
            transparent: true,
            viewparams: 'typec:H',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Type of Collision Not Stated",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_type_cyc", "vw_geoserver_switrs_col_type_cyc"],
            transparent: true,
            viewparams: 'typec:-',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),

    //VEHICLE-CYCLIST COLLISIONS PCF VIOLATIONS		

    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Under Influence",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_pcf_cyc", "vw_geoserver_switrs_col_pcf_cyc"],
            transparent: true,
            viewparams: 'pcf:01',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Impeding Traffic",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_pcf_cyc", "vw_geoserver_switrs_col_pcf_cyc"],
            transparent: true,
            viewparams: 'pcf:02',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Unsafe Speed",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_pcf_cyc", "vw_geoserver_switrs_col_pcf_cyc"],
            transparent: true,
            viewparams: 'pcf:03',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Following Too Closely",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_pcf_cyc", "vw_geoserver_switrs_col_pcf_cyc"],
            transparent: true,
            viewparams: 'pcf:04',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Wrong Side of Road",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_pcf_cyc", "vw_geoserver_switrs_col_pcf_cyc"],
            transparent: true,
            viewparams: 'pcf:05',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Improper Passing",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_pcf_cyc", "vw_geoserver_switrs_col_pcf_cyc"],
            transparent: true,
            viewparams: 'pcf:06',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Unsafe Lane Change",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_pcf_cyc", "vw_geoserver_switrs_col_pcf_cyc"],
            transparent: true,
            viewparams: 'pcf:07',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Improper Turning",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_pcf_cyc", "vw_geoserver_switrs_col_pcf_cyc"],
            transparent: true,
            viewparams: 'pcf:08',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Automobile Right of Way",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_pcf_cyc", "vw_geoserver_switrs_col_pcf_cyc"],
            transparent: true,
            viewparams: 'pcf:09',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Pedestrian Right of Way",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_pcf_cyc", "vw_geoserver_switrs_col_pcf_cyc"],
            transparent: true,
            viewparams: 'pcf:10',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Pedestrian Violation",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_pcf_cyc", "vw_geoserver_switrs_col_pcf_cyc"],
            transparent: true,
            viewparams: 'pcf:11',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Traffic Signals and Signs",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_pcf_cyc", "vw_geoserver_switrs_col_pcf_cyc"],
            transparent: true,
            viewparams: 'pcf:12',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Hazardous Parking",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_pcf_cyc", "vw_geoserver_switrs_col_pcf_cyc"],
            transparent: true,
            viewparams: 'pcf:13',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Lights",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_pcf_cyc", "vw_geoserver_switrs_col_pcf_cyc"],
            transparent: true,
            viewparams: 'pcf:14',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Brakes",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_pcf_cyc", "vw_geoserver_switrs_col_pcf_cyc"],
            transparent: true,
            viewparams: 'pcf:15',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Other Equipment",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_pcf_cyc", "vw_geoserver_switrs_col_pcf_cyc"],
            transparent: true,
            viewparams: 'pcf:16',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Other Hazardous Violation",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_pcf_cyc", "vw_geoserver_switrs_col_pcf_cyc"],
            transparent: true,
            viewparams: 'pcf:17',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Other Than Driver (or Cyclist)",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_pcf_cyc", "vw_geoserver_switrs_col_pcf_cyc"],
            transparent: true,
            viewparams: 'pcf:18',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Unsafe Starting or Backing",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_pcf_cyc", "vw_geoserver_switrs_col_pcf_cyc"],
            transparent: true,
            viewparams: 'pcf:21',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Other Improper Driving",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_pcf_cyc", "vw_geoserver_switrs_col_pcf_cyc"],
            transparent: true,
            viewparams: 'pcf:22',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Pedestrian or Other Under the Influence of Drugs/Alcohol",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_pcf_cyc", "vw_geoserver_switrs_col_pcf_cyc"],
            transparent: true,
            viewparams: 'pcf:23',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Fell Asleep",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_pcf_cyc", "vw_geoserver_switrs_col_pcf_cyc"],
            transparent: true,
            viewparams: 'pcf:24',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - PCF Violation Unknown",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_pcf_cyc", "vw_geoserver_switrs_col_pcf_cyc"],
            transparent: true,
            viewparams: 'pcf:00',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - PCF Violation Not Stated",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_pcf_cyc", "vw_geoserver_switrs_col_pcf_cyc"],
            transparent: true,
            viewparams: 'pcf:-',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),

    //VEHICLE-CYCLIST COLLISIONS HIT AND RUN		

    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Felony Hit and Run",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_hitrun_cyc", "vw_geoserver_switrs_col_hitrun_cyc"],
            transparent: true,
            viewparams: 'hr:F',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Misdemeanor Hit and Run",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_hitrun_cyc", "vw_geoserver_switrs_col_hitrun_cyc"],
            transparent: true,
            viewparams: 'hr:M',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Not a Hit and Run",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_hitrun_cyc", "vw_geoserver_switrs_col_hitrun_cyc"],
            transparent: true,
            viewparams: 'hr:N',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),

    //VEHICLE-CYCLIST COLLISIONS DRUGS/ALCOHOL

    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Alcohol Involved",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_alcohol_cyc", "vw_geoserver_switrs_col_alcohol_cyc"],
            transparent: true,
            viewparams: 'alcohol:Y',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),

    //VEHICLE-CYCLIST PARTY=DRIVER AT FAULT

    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Driver at Fault",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_cyc_driver_prty_fault", "vw_geoserver_cyc_driver_prty_fault"],
            transparent: true,
            viewparams: 'fault:Y',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),

    //VEHICLE-CYCLIST PARTY=DRIVER GENDER

    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Driver Party Male",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_cyc_driver_prty_gender", "vw_geoserver_cyc_driver_prty_gender"],
            transparent: true,
            viewparams: 'gender:M',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Driver Party Female",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_cyc_driver_prty_gender", "vw_geoserver_cyc_driver_prty_gender"],
            transparent: true,
            viewparams: 'gender:F',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Driver Party Gender Not Stated",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_cyc_driver_prty_gender", "vw_geoserver_cyc_driver_prty_gender"],
            transparent: true,
            viewparams: 'gender:-',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),

    //VEHICLE-CYCLIST PARTY=DRIVER AGE

    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Driver Party Age 13 to 17",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_cyc_driver_prty_age", "vw_geoserver_cyc_driver_prty_age"],
            transparent: true,
            viewparams: 'age1:13;age2:17',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Driver Party Age 18 to 24",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_cyc_driver_prty_age", "vw_geoserver_cyc_driver_prty_age"],
            transparent: true,
            viewparams: 'age1:18;age2:24',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Driver Party Age 25 to 34",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_cyc_driver_prty_age", "vw_geoserver_cyc_driver_prty_age"],
            transparent: true,
            viewparams: 'age1:25;age2:34',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Driver Party Age 35 to 44",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_cyc_driver_prty_age", "vw_geoserver_cyc_driver_prty_age"],
            transparent: true,
            viewparams: 'age1:35;age2:44',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Driver Party Age 45 to 54",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_cyc_driver_prty_age", "vw_geoserver_cyc_driver_prty_age"],
            transparent: true,
            viewparams: 'age1:45;age2:54',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Driver Party Age 55 to 64",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_cyc_driver_prty_age", "vw_geoserver_cyc_driver_prty_age"],
            transparent: true,
            viewparams: 'age1:55;age2:64',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Driver Party Age 65 Plus",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_cyc_driver_prty_age", "vw_geoserver_cyc_driver_prty_age"],
            transparent: true,
            viewparams: 'age1:65;age2:997',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Driver Party Age Unknown",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_cyc_driver_prty_age", "vw_geoserver_cyc_driver_prty_age"],
            transparent: true,
            viewparams: 'age1:998;age2:998',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),

    //VEHICLE-CYCLIST PARTY=DRIVER MOVEMENT PRECEDING COLLISION (MPC)

    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Driver Party Movement Preceding Collision Stopped",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_cyc_driver_prty_mpc", "vw_geoserver_cyc_driver_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:A',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Driver Party Movement Preceding Collision Straight",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_cyc_driver_prty_mpc", "vw_geoserver_cyc_driver_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:B',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Driver Party Movement Preceding Collision Ran Off Road",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_cyc_driver_prty_mpc", "vw_geoserver_cyc_driver_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:C',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Driver Party Movement Preceding Collision Making Right Turn",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_cyc_driver_prty_mpc", "vw_geoserver_cyc_driver_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:D',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Driver Party Movement Preceding Collision Making Left Turn",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_cyc_driver_prty_mpc", "vw_geoserver_cyc_driver_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:E',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Driver Party Movement Preceding Collision Making U Turn",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_cyc_driver_prty_mpc", "vw_geoserver_cyc_driver_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:F',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Driver Party Movement Preceding Collision Backing",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_cyc_driver_prty_mpc", "vw_geoserver_cyc_driver_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:G',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Driver Party Movement Preceding Collision Slowing",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_cyc_driver_prty_mpc", "vw_geoserver_cyc_driver_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:H',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Driver Party Movement Preceding Collision Passing",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_cyc_driver_prty_mpc", "vw_geoserver_cyc_driver_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:I',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Driver Party Movement Preceding Collision Lane Change",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_cyc_driver_prty_mpc", "vw_geoserver_cyc_driver_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:J',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ), new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Driver Party Movement Preceding Collision Parking",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_cyc_driver_prty_mpc", "vw_geoserver_cyc_driver_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:K',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Driver Party Movement Preceding Collision Entering Traffic",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_cyc_driver_prty_mpc", "vw_geoserver_cyc_driver_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:L',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Driver Party Movement Preceding Collision Other Turning",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_cyc_driver_prty_mpc", "vw_geoserver_cyc_driver_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:M',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Driver Party Movement Preceding Collision Crossed Into Opposing Lane",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_cyc_driver_prty_mpc", "vw_geoserver_cyc_driver_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:N',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Driver Party Movement Preceding Collision Parked",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_cyc_driver_prty_mpc", "vw_geoserver_cyc_driver_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:O',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Driver Party Movement Preceding Collision Merging",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_cyc_driver_prty_mpc", "vw_geoserver_cyc_driver_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:P',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Driver Party Movement Preceding Collision Wrong Way",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_cyc_driver_prty_mpc", "vw_geoserver_cyc_driver_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:Q',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Driver Party Movement Preceding Collision Other",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_cyc_driver_prty_mpc", "vw_geoserver_cyc_driver_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:R',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Driver Party Movement Preceding Collision Not Stated",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_cyc_driver_prty_mpc", "vw_geoserver_cyc_driver_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:-',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),

    //VEHICLE-CYCLIST PARTY=DRIVER STATEWIDE VEHICLE TYPE (SVT)

    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - State Vehicle Type Passenger Car",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_cyc_driver_prty_svt", "vw_geoserver_cyc_driver_prty_svt"],
            transparent: true,
            viewparams: 'svt:A',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - State Vehicle Type Passenger Car with Trailer",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_cyc_driver_prty_svt", "vw_geoserver_cyc_driver_prty_svt"],
            transparent: true,
            viewparams: 'svt:B',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - State Vehicle Type Motorcycle",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_cyc_driver_prty_svt", "vw_geoserver_cyc_driver_prty_svt"],
            transparent: true,
            viewparams: 'svt:C',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - State Vehicle Type Pickup",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_cyc_driver_prty_svt", "vw_geoserver_cyc_driver_prty_svt"],
            transparent: true,
            viewparams: 'svt:D',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - State Vehicle Type Pickup with Trailer",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_cyc_driver_prty_svt", "vw_geoserver_cyc_driver_prty_svt"],
            transparent: true,
            viewparams: 'svt:E',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - State Vehicle Type Truck",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_cyc_driver_prty_svt", "vw_geoserver_cyc_driver_prty_svt"],
            transparent: true,
            viewparams: 'svt:F',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - State Vehicle Type Truck with Trailer",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_cyc_driver_prty_svt", "vw_geoserver_cyc_driver_prty_svt"],
            transparent: true,
            viewparams: 'svt:G',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - State Vehicle Type School Bus",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_cyc_driver_prty_svt", "vw_geoserver_cyc_driver_prty_svt"],
            transparent: true,
            viewparams: 'svt:H',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - State Vehicle Type Other Bus",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_cyc_driver_prty_svt", "vw_geoserver_cyc_driver_prty_svt"],
            transparent: true,
            viewparams: 'svt:I',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - State Vehicle Type Emergency Equipment",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_cyc_driver_prty_svt", "vw_geoserver_cyc_driver_prty_svt"],
            transparent: true,
            viewparams: 'svt:J',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - State Vehicle Type Heavy Equipment",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_cyc_driver_prty_svt", "vw_geoserver_cyc_driver_prty_svt"],
            transparent: true,
            viewparams: 'svt:K',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - State Vehicle Type Bicycle",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_cyc_driver_prty_svt", "vw_geoserver_cyc_driver_prty_svt"],
            transparent: true,
            viewparams: 'svt:L',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - State Vehicle Type Other Vehicle",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_cyc_driver_prty_svt", "vw_geoserver_cyc_driver_prty_svt"],
            transparent: true,
            viewparams: 'svt:M',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - State Vehicle Type Pedestrian",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_cyc_driver_prty_svt", "vw_geoserver_cyc_driver_prty_svt"],
            transparent: true,
            viewparams: 'svt:N',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - State Vehicle Type Moped",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_cyc_driver_prty_svt", "vw_geoserver_cyc_driver_prty_svt"],
            transparent: true,
            viewparams: 'svt:O',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - State Vehicle Type Not Stated",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_cyc_driver_prty_svt", "vw_geoserver_cyc_driver_prty_svt"],
            transparent: true,
            viewparams: 'svt:-',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),

    //VEHICLE-CYCLIST PARTY=DRIVER RACE

    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Driver Party Asian",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_cyc_driver_prty_race", "vw_geoserver_cyc_driver_prty_race"],
            transparent: true,
            viewparams: 'race:A',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Driver Party Black",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_cyc_driver_prty_race", "vw_geoserver_cyc_driver_prty_race"],
            transparent: true,
            viewparams: 'race:B',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Driver Party Hispanic",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_cyc_driver_prty_race", "vw_geoserver_cyc_driver_prty_race"],
            transparent: true,
            viewparams: 'race:H',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Driver Party Other Race",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_cyc_driver_prty_race", "vw_geoserver_cyc_driver_prty_race"],
            transparent: true,
            viewparams: 'race:O',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Driver Party White",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_cyc_driver_prty_race", "vw_geoserver_cyc_driver_prty_race"],
            transparent: true,
            viewparams: 'race:W',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Driver Party Race Not Stated",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_cyc_driver_prty_race", "vw_geoserver_cyc_driver_prty_race"],
            transparent: true,
            viewparams: 'race:-',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),

    //VEHICLE-CYCLIST PARTY=DRIVER SOBRIETY

    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Driver Party Had Not Been Drinking",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_cyc_driver_prty_sobriety", "vw_geoserver_cyc_driver_prty_sobriety"],
            transparent: true,
            viewparams: 'sobriety:A',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Driver Party Had Been Drinking, Under the Influence",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_cyc_driver_prty_sobriety", "vw_geoserver_cyc_driver_prty_sobriety"],
            transparent: true,
            viewparams: 'sobriety:B',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Driver Party Had Been Drinking, Not Under the Influence",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_cyc_driver_prty_sobriety", "vw_geoserver_cyc_driver_prty_sobriety"],
            transparent: true,
            viewparams: 'sobriety:C',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Driver Party Had Been Drinking, Impairment Unknown",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_cyc_driver_prty_sobriety", "vw_geoserver_cyc_driver_prty_sobriety"],
            transparent: true,
            viewparams: 'sobriety:D',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Driver Party Impairment Unknown",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_cyc_driver_prty_sobriety", "vw_geoserver_cyc_driver_prty_sobriety"],
            transparent: true,
            viewparams: 'sobriety:G',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Driver Party Sobriety Not Applicable",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_cyc_driver_prty_sobriety", "vw_geoserver_cyc_driver_prty_sobriety"],
            transparent: true,
            viewparams: 'sobriety:H',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Driver Party Sobriety Not Stated",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_cyc_driver_prty_sobriety", "vw_geoserver_cyc_driver_prty_sobriety"],
            transparent: true,
            viewparams: 'sobriety:-',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),

    //VEHICLE-CYCLIST PARTY=CYCLIST AT FAULT

    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Cyclist Party at Fault",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_cyc_prty_fault", "vw_geoserver_cyc_prty_fault"],
            transparent: true,
            viewparams: 'fault:Y',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),

    //VEHICLE-CYCLIST PARTY=CYCLIST MOVEMENT PRECEDING COLLISION (MPC)

    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Cyclist Party Movement Preceding Collision Stopped",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_cyc_prty_mpc", "vw_geoserver_cyc_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:A',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Cyclist Party Movement Preceding Collision Straight",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_cyc_prty_mpc", "vw_geoserver_cyc_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:B',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Cyclist Party Movement Preceding Collision Ran Off Road",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_cyc_prty_mpc", "vw_geoserver_cyc_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:C',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Cyclist Party Movement Preceding Collision Making Right Turn",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_cyc_prty_mpc", "vw_geoserver_cyc_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:D',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Cyclist Party Movement Preceding Collision Making Left Turn",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_cyc_prty_mpc", "vw_geoserver_cyc_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:E',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Cyclist Party Movement Preceding Collision Making U Turn",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_cyc_prty_mpc", "vw_geoserver_cyc_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:F',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Cyclist Party Movement Preceding Collision Backing",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_cyc_prty_mpc", "vw_geoserver_cyc_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:G',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Cyclist Party Movement Preceding Collision Slowing",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_cyc_prty_mpc", "vw_geoserver_cyc_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:H',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Cyclist Party Movement Preceding Collision Passing",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_cyc_prty_mpc", "vw_geoserver_cyc_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:I',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Cyclist Party Movement Preceding Collision Changing Lanes",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_cyc_prty_mpc", "vw_geoserver_cyc_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:J',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ), new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Cyclist Party Movement Preceding Collision Parking",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_cyc_prty_mpc", "vw_geoserver_cyc_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:K',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Cyclist Party Movement Preceding Collision Entering Roadway",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_cyc_prty_mpc", "vw_geoserver_cyc_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:L',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Cyclist Party Movement Preceding Collision Other Turning",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_cyc_prty_mpc", "vw_geoserver_cyc_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:M',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Cyclist Party Movement Preceding Collision Crossed Into Opposing Lane",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_cyc_prty_mpc", "vw_geoserver_cyc_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:N',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Cyclist Party Movement Preceding Collision Parked",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_cyc_prty_mpc", "vw_geoserver_cyc_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:O',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Cyclist Party Movement Preceding Collision Merging",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_cyc_prty_mpc", "vw_geoserver_cyc_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:P',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Cyclist Party Movement Preceding Collision Wrong Way",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_cyc_prty_mpc", "vw_geoserver_cyc_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:Q',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Cyclist Party Movement Preceding Collision Other",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_cyc_prty_mpc", "vw_geoserver_cyc_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:R',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Cyclist Party Movement Preceding Collision Not Stated",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_cyc_prty_mpc", "vw_geoserver_cyc_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:-',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),

    //VEHICLE-CYCLIST PARTY=CYCLIST RACE

    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Cyclist Party Asian",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_cyc_prty_race", "vw_geoserver_cyc_prty_race"],
            transparent: true,
            viewparams: 'race:A',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Cyclist Party Black",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_cyc_prty_race", "vw_geoserver_cyc_prty_race"],
            transparent: true,
            viewparams: 'race:B',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Cyclist Party Hispanic",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_cyc_prty_race", "vw_geoserver_cyc_prty_race"],
            transparent: true,
            viewparams: 'race:H',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Cyclist Party Other Race",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_cyc_prty_race", "vw_geoserver_cyc_prty_race"],
            transparent: true,
            viewparams: 'race:O',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Cyclist Party White",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_cyc_prty_race", "vw_geoserver_cyc_prty_race"],
            transparent: true,
            viewparams: 'race:W',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Cyclist Party Race Not Stated",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_cyc_prty_race", "vw_geoserver_cyc_prty_race"],
            transparent: true,
            viewparams: 'race:-',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),

    //VEHICLE-CYCLIST PARTY=CYCLIST SOBRIETY

    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Cyclist Party Had Not Been Drinking",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_cyc_prty_sobriety", "vw_geoserver_cyc_prty_sobriety"],
            transparent: true,
            viewparams: 'sobriety:A',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Cyclist Party Been Drinking, Under the Influence",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_cyc_prty_sobriety", "vw_geoserver_cyc_prty_sobriety"],
            transparent: true,
            viewparams: 'sobriety:B',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Cyclist Party Been Drinking, Not Under the Influence",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_cyc_prty_sobriety", "vw_geoserver_cyc_prty_sobriety"],
            transparent: true,
            viewparams: 'sobriety:C',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Cyclist Party Been Drinking, Impairment Unknown",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_cyc_prty_sobriety", "vw_geoserver_cyc_prty_sobriety"],
            transparent: true,
            viewparams: 'sobriety:D',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Cyclist Party Impairment Unknown",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_cyc_prty_sobriety", "vw_geoserver_cyc_prty_sobriety"],
            transparent: true,
            viewparams: 'sobriety:G',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Cyclist Party Sobriety Not Applicable",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_cyc_prty_sobriety", "vw_geoserver_cyc_prty_sobriety"],
            transparent: true,
            viewparams: 'sobriety:H',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Cyclist Party Sobriety Not Stated",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_cyc_prty_sobriety", "vw_geoserver_cyc_prty_sobriety"],
            transparent: true,
            viewparams: 'sobriety:-',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),

    //VEHICLE-CYCLIST VICTIM=CYCLIST GENDER

    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Cyclist Victim Male",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_vctm_gender_cyc", "vw_geoserver_switrs_vctm_gender_cyc"],
            transparent: true,
            viewparams: 'gender:M',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Cyclist Victim Female",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_vctm_gender_cyc", "vw_geoserver_switrs_vctm_gender_cyc"],
            transparent: true,
            viewparams: 'gender:F',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Cyclist Victim Not Stated",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_vctm_gender_cyc", "vw_geoserver_switrs_vctm_gender_cyc"],
            transparent: true,
            viewparams: 'gender:-',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),

    //VEHICLE-CYCLIST VICTIM=CYCLIST AGE

    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Cyclist Victim Age 0 to 12",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_vctm_age_cyc", "vw_geoserver_switrs_vctm_age_cyc"],
            transparent: true,
            viewparams: 'age1:0;age2:12',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Cyclist Victim Age 13 to 17",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_vctm_age_cyc", "vw_geoserver_switrs_vctm_age_cyc"],
            transparent: true,
            viewparams: 'age1:13;age2:17',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Cyclist Victim Age 18 to 24",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_vctm_age_cyc", "vw_geoserver_switrs_vctm_age_cyc"],
            transparent: true,
            viewparams: 'age1:18;age2:24',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Cyclist Victim Age 25 to 34",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_vctm_age_cyc", "vw_geoserver_switrs_vctm_age_cyc"],
            transparent: true,
            viewparams: 'age1:25;age2:34',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Cyclist Victim Age 35 to 44",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_vctm_age_cyc", "vw_geoserver_switrs_vctm_age_cyc"],
            transparent: true,
            viewparams: 'age1:35;age2:44',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Cyclist Victim Age 45 to 54",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_vctm_age_cyc", "vw_geoserver_switrs_vctm_age_cyc"],
            transparent: true,
            viewparams: 'age1:45;age2:54',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Cyclist Victim Age 55 to 64",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_vctm_age_cyc", "vw_geoserver_switrs_vctm_age_cyc"],
            transparent: true,
            viewparams: 'age1:55;age2:64',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Cyclist Victim Age 65 Plus",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_vctm_age_cyc", "vw_geoserver_switrs_vctm_age_cyc"],
            transparent: true,
            viewparams: 'age1:65;age2:997',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Cyclist Victim Age Unknown",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_vctm_age_cyc", "vw_geoserver_switrs_vctm_age_cyc"],
            transparent: true,
            viewparams: 'age1:998;age2:998',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),

    //VEHICLE-CYCLIST VICTIM=CYCLIST DEGREE OF INJURY

    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Cyclist Victim Killed",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_vctm_doi_cyc", "vw_geoserver_switrs_vctm_doi_cyc"],
            transparent: true,
            viewparams: 'doi:1',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Cyclist Victim Severe",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_vctm_doi_cyc", "vw_geoserver_switrs_vctm_doi_cyc"],
            transparent: true,
            viewparams: 'doi:2',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Cyclist Victim Visible",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_vctm_doi_cyc", "vw_geoserver_switrs_vctm_doi_cyc"],
            transparent: true,
            viewparams: 'doi:3',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Cyclist Collisions - Cyclist Victim Complaint of Pain",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_vctm_doi_cyc", "vw_geoserver_switrs_vctm_doi_cyc"],
            transparent: true,
            viewparams: 'doi:4',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
	    /*
     * ==================================
     * SWITRS DATA -- VEHICLE-PEDESTRIAN COLLISION VARIABLES
     * ==================================
     */

    //VEHICLE-VEHICLE COLLISIONS TIME

    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - 6am to 10am",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_time_veh", "vw_geoserver_switrs_col_time_veh"],
            transparent: true,
            viewparams: 'timed:A',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - 10am to 2pm",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_time_veh", "vw_geoserver_switrs_col_time_veh"],
            transparent: true,
            viewparams: 'timed:B',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - 2pm to 6pm",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_time_veh", "vw_geoserver_switrs_col_time_veh"],
            transparent: true,
            viewparams: 'timed:C',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - 6pm to 10pm",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_time_veh", "vw_geoserver_switrs_col_time_veh"],
            transparent: true,
            viewparams: 'timed:D',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - 10pm to 2am",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_time_veh", "vw_geoserver_switrs_col_time_veh"],
            transparent: true,
            viewparams: 'timed:E',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - 2am to 6am",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_time_veh", "vw_geoserver_switrs_col_time_veh"],
            transparent: true,
            viewparams: 'timed:F',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),

    //Vehicle-Vehicle Collisions DAY

    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Monday",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_day_veh", "vw_geoserver_switrs_col_day_veh"],
            transparent: true,
            viewparams: 'day:1',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Tuesday",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_day_veh", "vw_geoserver_switrs_col_day_veh"],
            transparent: true,
            viewparams: 'day:2',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Wednesday",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_day_veh", "vw_geoserver_switrs_col_day_veh"],
            transparent: true,
            viewparams: 'day:3',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Thursday",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_day_veh", "vw_geoserver_switrs_col_day_veh"],
            transparent: true,
            viewparams: 'day:4',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Friday",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_day_veh", "vw_geoserver_switrs_col_day_veh"],
            transparent: true,
            viewparams: 'day:5',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Saturday",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_day_veh", "vw_geoserver_switrs_col_day_veh"],
            transparent: true,
            viewparams: 'day:6',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Sunday",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_day_veh", "vw_geoserver_switrs_col_day_veh"],
            transparent: true,
            viewparams: 'day:7',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),

    //VEHICLE-VEHICLE COLLISION MONTH

    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - January",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_month_veh", "vw_geoserver_switrs_col_month_veh"],
            transparent: true,
            viewparams: 'date:01',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - February",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_month_veh", "vw_geoserver_switrs_col_month_veh"],
            transparent: true,
            viewparams: 'date:02',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - March",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_month_veh", "vw_geoserver_switrs_col_month_veh"],
            transparent: true,
            viewparams: 'date:03',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - April",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_month_veh", "vw_geoserver_switrs_col_month_veh"],
            transparent: true,
            viewparams: 'date:04',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - May",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_month_veh", "vw_geoserver_switrs_col_month_veh"],
            transparent: true,
            viewparams: 'date:05',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - June",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_month_veh", "vw_geoserver_switrs_col_month_veh"],
            transparent: true,
            viewparams: 'date:06',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - July",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_month_veh", "vw_geoserver_switrs_col_month_veh"],
            transparent: true,
            viewparams: 'date:07',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - August",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_month_veh", "vw_geoserver_switrs_col_month_veh"],
            transparent: true,
            viewparams: 'date:08',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - September",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_month_veh", "vw_geoserver_switrs_col_month_veh"],
            transparent: true,
            viewparams: 'date:09',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - October",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_month_veh", "vw_geoserver_switrs_col_month_veh"],
            transparent: true,
            viewparams: 'date:10',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - November",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_month_veh", "vw_geoserver_switrs_col_month_veh"],
            transparent: true,
            viewparams: 'date:11',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - December",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_month_veh", "vw_geoserver_switrs_col_month_veh"],
            transparent: true,
            viewparams: 'date:12',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),

    //Vehicle-Vehicle Collisions YEAR

    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - 2005",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_year_veh", "vw_geoserver_switrs_col_year_veh"],
            transparent: true,
            viewparams: 'yearc:2005',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - 2006",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_year_veh", "vw_geoserver_switrs_col_year_veh"],
            transparent: true,
            viewparams: 'yearc:2006',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - 2007",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_year_veh", "vw_geoserver_switrs_col_year_veh"],
            transparent: true,
            viewparams: 'yearc:2007',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - 2008",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_year_veh", "vw_geoserver_switrs_col_year_veh"],
            transparent: true,
            viewparams: 'yearc:2008',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - 2009",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_year_veh", "vw_geoserver_switrs_col_year_veh"],
            transparent: true,
            viewparams: 'yearc:2009',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - 2010",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_year_veh", "vw_geoserver_switrs_col_year_veh"],
            transparent: true,
            viewparams: 'yearc:2010',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - 2011",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_year_veh", "vw_geoserver_switrs_col_year_veh"],
            transparent: true,
            viewparams: 'yearc:2011',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
	    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - 2012",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_year_veh", "vw_geoserver_switrs_col_year_veh"],
            transparent: true,
            viewparams: 'yearc:2012',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),

    //VEHICLE-VEHICLE COLLISION WEATHER

    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Clear",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_weather_veh", "vw_geoserver_switrs_col_weather_veh"],
            transparent: true,
            viewparams: 'weather:A',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Cloudy",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_weather_veh", "vw_geoserver_switrs_col_weather_veh"],
            transparent: true,
            viewparams: 'weather:B',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Raining",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_weather_veh", "vw_geoserver_switrs_col_weather_veh"],
            transparent: true,
            viewparams: 'weather:C',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Snowing",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_weather_veh", "vw_geoserver_switrs_col_weather_veh"],
            transparent: true,
            viewparams: 'weather:D',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Fog",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_weather_veh", "vw_geoserver_switrs_col_weather_veh"],
            transparent: true,
            viewparams: 'weather:E',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Other Weather",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_weather_veh", "vw_geoserver_switrs_col_weather_veh"],
            transparent: true,
            viewparams: 'weather:F',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Wind",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_weather_veh", "vw_geoserver_switrs_col_weather_veh"],
            transparent: true,
            viewparams: 'weather:G',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Weather Not Stated",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_weather_veh", "vw_geoserver_switrs_col_weather_veh"],
            transparent: true,
            viewparams: 'weather:-',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),

    //VEHICLE-VEHICLE COLLISION TYPE OF COLLISION

    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Head-On",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_type_veh", "vw_geoserver_switrs_col_type_veh"],
            transparent: true,
            viewparams: 'typec:A',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Sideswipe",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_type_veh", "vw_geoserver_switrs_col_type_veh"],
            transparent: true,
            viewparams: 'typec:B',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Rear End",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_type_veh", "vw_geoserver_switrs_col_type_veh"],
            transparent: true,
            viewparams: 'typec:C',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Broadside",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_type_veh", "vw_geoserver_switrs_col_type_veh"],
            transparent: true,
            viewparams: 'typec:D',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Hit Object",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_type_veh", "vw_geoserver_switrs_col_type_veh"],
            transparent: true,
            viewparams: 'typec:E',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Overturned",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_type_veh", "vw_geoserver_switrs_col_type_veh"],
            transparent: true,
            viewparams: 'typec:F',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Vehicle/Pedestrian",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_type_veh", "vw_geoserver_switrs_col_type_veh"],
            transparent: true,
            viewparams: 'typec:G',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Other Type of Collision",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_type_veh", "vw_geoserver_switrs_col_type_veh"],
            transparent: true,
            viewparams: 'typec:H',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Type of Collision Not Stated",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_type_veh", "vw_geoserver_switrs_col_type_veh"],
            transparent: true,
            viewparams: 'typec:-',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),

    //Vehicle-Vehicle Collisions PCF VIOLATIONS	

    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Under Influence",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_pcf_veh", "vw_geoserver_switrs_col_pcf_veh"],
            transparent: true,
            viewparams: 'pcf:01',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Impeding Traffic",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_pcf_veh", "vw_geoserver_switrs_col_pcf_veh"],
            transparent: true,
            viewparams: 'pcf:02',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Unsafe Speed",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_pcf_veh", "vw_geoserver_switrs_col_pcf_veh"],
            transparent: true,
            viewparams: 'pcf:03',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Following Too Closely",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_pcf_veh", "vw_geoserver_switrs_col_pcf_veh"],
            transparent: true,
            viewparams: 'pcf:04',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Wrong Side of Road",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_pcf_veh", "vw_geoserver_switrs_col_pcf_veh"],
            transparent: true,
            viewparams: 'pcf:05',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Improper Passing",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_pcf_veh", "vw_geoserver_switrs_col_pcf_veh"],
            transparent: true,
            viewparams: 'pcf:06',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Unsafe Lane Change",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_pcf_veh", "vw_geoserver_switrs_col_pcf_veh"],
            transparent: true,
            viewparams: 'pcf:07',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Improper Turning",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_pcf_veh", "vw_geoserver_switrs_col_pcf_veh"],
            transparent: true,
            viewparams: 'pcf:08',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Automobile Right of Way",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_pcf_veh", "vw_geoserver_switrs_col_pcf_veh"],
            transparent: true,
            viewparams: 'pcf:09',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Pedestrian Right of Way",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_pcf_veh", "vw_geoserver_switrs_col_pcf_veh"],
            transparent: true,
            viewparams: 'pcf:10',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Pedestrian Violation",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_pcf_veh", "vw_geoserver_switrs_col_pcf_veh"],
            transparent: true,
            viewparams: 'pcf:11',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Traffic Signals and Signs",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_pcf_veh", "vw_geoserver_switrs_col_pcf_veh"],
            transparent: true,
            viewparams: 'pcf:12',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Hazardous Parking",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_pcf_veh", "vw_geoserver_switrs_col_pcf_veh"],
            transparent: true,
            viewparams: 'pcf:13',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Lights",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_pcf_veh", "vw_geoserver_switrs_col_pcf_veh"],
            transparent: true,
            viewparams: 'pcf:14',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Brakes",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_pcf_veh", "vw_geoserver_switrs_col_pcf_veh"],
            transparent: true,
            viewparams: 'pcf:15',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Other Equipment",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_pcf_veh", "vw_geoserver_switrs_col_pcf_veh"],
            transparent: true,
            viewparams: 'pcf:16',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Other Hazardous Violation",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_pcf_veh", "vw_geoserver_switrs_col_pcf_veh"],
            transparent: true,
            viewparams: 'pcf:17',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Other Than Driver (or Pedestrian)",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_pcf_veh", "vw_geoserver_switrs_col_pcf_veh"],
            transparent: true,
            viewparams: 'pcf:18',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Unsafe Starting or Backing",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_pcf_veh", "vw_geoserver_switrs_col_pcf_veh"],
            transparent: true,
            viewparams: 'pcf:21',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Other Improper Driving",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_pcf_veh", "vw_geoserver_switrs_col_pcf_veh"],
            transparent: true,
            viewparams: 'pcf:22',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Pedestrian Under the Influence of Drugs/Alcohol",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_pcf_veh", "vw_geoserver_switrs_col_pcf_veh"],
            transparent: true,
            viewparams: 'pcf:23',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Fell Asleep",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_pcf_veh", "vw_geoserver_switrs_col_pcf_veh"],
            transparent: true,
            viewparams: 'pcf:24',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - PCF Violation Unknown",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_pcf_veh", "vw_geoserver_switrs_col_pcf_veh"],
            transparent: true,
            viewparams: 'pcf:00',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - PCF Not Stated",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_pcf_veh", "vw_geoserver_switrs_col_pcf_veh"],
            transparent: true,
            viewparams: 'pcf:-',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),

    //VEHICLE-VEHICLE COLLISION HIT AND RUN

    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Felony Hit and Run",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_hitrun_veh", "vw_geoserver_switrs_col_hitrun_veh"],
            transparent: true,
            viewparams: 'hr:F',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Misdemeanor Hit and Run",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_hitrun_veh", "vw_geoserver_switrs_col_hitrun_veh"],
            transparent: true,
            viewparams: 'hr:M',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Not a Hit and Run",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_hitrun_veh", "vw_geoserver_switrs_col_hitrun_veh"],
            transparent: true,
            viewparams: 'hr:N',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),

    //Vehicle-Vehicle Collisions DRUGS/ALCOHOL

    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Alcohol Involved",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_col_alcohol_veh", "vw_geoserver_switrs_col_alcohol_veh"],
            transparent: true,
            viewparams: 'alcohol:Y',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),

    /*
     * ==================================
     * SWITRS DATA -- VEHICLE-VEHICLE PARTY=DRIVER VARIABLES
     * ==================================
     */

    //VEHICLE-VEHICLE PARTY=NON-INJURY DRIVER AT FAULT

    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Non-Injured Vehicle Party at Fault",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_veh_no_injry_drivers_prty_fault", "vw_geoserver_veh_no_injry_drivers_prty_fault"],
            transparent: true,
            viewparams: 'fault:Y',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),

    //VEHICLE-VEHICLE PARTY=NON INJURY-DRIVER GENDER

    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Non-Injured Vehicle Party Male",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_veh_no_injry_drivers_prty_gender", "vw_geoserver_veh_no_injry_drivers_prty_gender"],
            transparent: true,
            viewparams: 'gender:M',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Non-Injured Vehicle Party Female",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_veh_no_injry_drivers_prty_gender", "vw_geoserver_veh_no_injry_drivers_prty_gender"],
            transparent: true,
            viewparams: 'gender:F',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Non-Injured Vehicle Party Gender Not Stated",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_veh_no_injry_drivers_prty_gender", "vw_geoserver_veh_no_injry_drivers_prty_gender"],
            transparent: true,
            viewparams: 'gender:-',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),

    //VEHICLE-VEHICLE PARTY=NON INJURY-DRIVER AGE

    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Non-Injured Vehicle Party Age 13 to 17",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_veh_no_injry_drivers_prty_age", "vw_geoserver_veh_no_injry_drivers_prty_age"],
            transparent: true,
            viewparams: 'age1:13;age2:17',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Non-Injured Vehicle Party Age 18 to 24",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_veh_no_injry_drivers_prty_age", "vw_geoserver_veh_no_injry_drivers_prty_age"],
            transparent: true,
            viewparams: 'age1:18;age2:24',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Non-Injured Vehicle Party Age 25 to 34",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_veh_no_injry_drivers_prty_age", "vw_geoserver_veh_no_injry_drivers_prty_age"],
            transparent: true,
            viewparams: 'age1:25;age2:34',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Non-Injured Vehicle Party Age 35 to 44",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_veh_no_injry_drivers_prty_age", "vw_geoserver_veh_no_injry_drivers_prty_age"],
            transparent: true,
            viewparams: 'age1:35;age2:44',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Non-Injured Vehicle Party Age 45 to 54",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_veh_no_injry_drivers_prty_age", "vw_geoserver_veh_no_injry_drivers_prty_age"],
            transparent: true,
            viewparams: 'age1:45;age2:54',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Non-Injured Vehicle Party Age 55 to 64",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_veh_no_injry_drivers_prty_age", "vw_geoserver_veh_no_injry_drivers_prty_age"],
            transparent: true,
            viewparams: 'age1:55;age2:64',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Non-Injured Vehicle Party Age 65 Plus",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_veh_no_injry_drivers_prty_age", "vw_geoserver_veh_no_injry_drivers_prty_age"],
            transparent: true,
            viewparams: 'age1:65;age2:997',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Non-Injured Vehicle Party Age Unknown",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_veh_no_injry_drivers_prty_age", "vw_geoserver_veh_no_injry_drivers_prty_age"],
            transparent: true,
            viewparams: 'age1:998;age2:998',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),

    //VEHICLE-VEHICLE PARTY=NON INJURY-DRIVER MOVEMENT PRECEDING COLLISION (MPC)

    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Non-Injured Vehicle Movement Preceding Collision Stopped",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_veh_no_injry_drivers_prty_mpc", "vw_geoserver_veh_no_injry_drivers_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:A',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Non-Injured Vehicle Movement Preceding Collision Straight",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_veh_no_injry_drivers_prty_mpc", "vw_geoserver_veh_no_injry_drivers_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:B',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Non-Injured Vehicle Movement Preceding Collision Ran Off Road",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_veh_no_injry_drivers_prty_mpc", "vw_geoserver_veh_no_injry_drivers_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:C',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Non-Injured Vehicle Movement Preceding Collision Making Right Turn",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_veh_no_injry_drivers_prty_mpc", "vw_geoserver_veh_no_injry_drivers_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:D',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Non-Injured Vehicle Movement Preceding Collision Making Left",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_veh_no_injry_drivers_prty_mpc", "vw_geoserver_veh_no_injry_drivers_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:E',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Non-Injured Vehicle Movement Preceding Collision Making U Turn",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_veh_no_injry_drivers_prty_mpc", "vw_geoserver_veh_no_injry_drivers_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:F',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Non-Injured Vehicle Movement Preceding Collision Backing",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_veh_no_injry_drivers_prty_mpc", "vw_geoserver_veh_no_injry_drivers_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:G',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Non-Injured Vehicle Movement Preceding Collision Slowing",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_veh_no_injry_drivers_prty_mpc", "vw_geoserver_veh_no_injry_drivers_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:H',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Non-Injured Vehicle Movement Preceding Collision Passing",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_veh_no_injry_drivers_prty_mpc", "vw_geoserver_veh_no_injry_drivers_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:I',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Non-Injured Vehicle Movement Preceding Collision Lane Change",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_veh_no_injry_drivers_prty_mpc", "vw_geoserver_veh_no_injry_drivers_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:J',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ), new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Non-Injured Vehicle Movement Preceding Collision Parking",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_veh_no_injry_drivers_prty_mpc", "vw_geoserver_veh_no_injry_drivers_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:K',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Non-Injured Vehicle Movement Preceding Collision Entering Roadway",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_veh_no_injry_drivers_prty_mpc", "vw_geoserver_veh_no_injry_drivers_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:L',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Non-Injured Vehicle Movement Preceding Collision Other Turning",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_veh_no_injry_drivers_prty_mpc", "vw_geoserver_veh_no_injry_drivers_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:M',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Non-Injured Vehicle Movement Preceding Collision Crossed Into Opposing Lane",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_veh_no_injry_drivers_prty_mpc", "vw_geoserver_veh_no_injry_drivers_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:N',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Non-Injured Vehicle Movement Preceding Collision Parked",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_veh_no_injry_drivers_prty_mpc", "vw_geoserver_veh_no_injry_drivers_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:O',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Non-Injured Vehicle Movement Preceding Collision Merging",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_veh_no_injry_drivers_prty_mpc", "vw_geoserver_veh_no_injry_drivers_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:P',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Non-Injured Vehicle Movement Preceding Collision Wrong Way",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_veh_no_injry_drivers_prty_mpc", "vw_geoserver_veh_no_injry_drivers_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:Q',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Non-Injured Vehicle Movement Preceding Collision Other",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_veh_no_injry_drivers_prty_mpc", "vw_geoserver_veh_no_injry_drivers_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:R',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Non-Injured Vehicle Movement Preceding Collision Not Stated",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_veh_no_injry_drivers_prty_mpc", "vw_geoserver_veh_no_injry_drivers_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:-',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),

    //VEHICLE-VEHICLE PARTY=NON INJURY-DRIVER STATE VEHICLE TYPE (SVT)

    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Non-Injured Vehicle State Vehicle Type Passenger Car",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_veh_no_injry_drivers_prty_svt", "vw_geoserver_veh_no_injry_drivers_prty_svt"],
            transparent: true,
            viewparams: 'svt:A',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Non-Injured Vehicle State Vehicle Type Passenger Trailer",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_veh_no_injry_drivers_prty_svt", "vw_geoserver_veh_no_injry_drivers_prty_svt"],
            transparent: true,
            viewparams: 'svt:B',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Non-Injured Vehicle State Vehicle Type Motorcycle",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_veh_no_injry_drivers_prty_svt", "vw_geoserver_veh_no_injry_drivers_prty_svt"],
            transparent: true,
            viewparams: 'svt:C',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Non-Injured Vehicle State Vehicle Type Pickup",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_veh_no_injry_drivers_prty_svt", "vw_geoserver_veh_no_injry_drivers_prty_svt"],
            transparent: true,
            viewparams: 'svt:D',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Non-Injured Vehicle State Vehicle Type Pickup Trailer",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_veh_no_injry_drivers_prty_svt", "vw_geoserver_veh_no_injry_drivers_prty_svt"],
            transparent: true,
            viewparams: 'svt:E',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Non-Injured Vehicle State Vehicle Type Truck",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_veh_no_injry_drivers_prty_svt", "vw_geoserver_veh_no_injry_drivers_prty_svt"],
            transparent: true,
            viewparams: 'svt:F',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Non-Injured Vehicle State Vehicle Type Truck Trailer",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_veh_no_injry_drivers_prty_svt", "vw_geoserver_veh_no_injry_drivers_prty_svt"],
            transparent: true,
            viewparams: 'svt:G',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Non-Injured Vehicle State Vehicle Type School Bus",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_veh_no_injry_drivers_prty_svt", "vw_geoserver_veh_no_injry_drivers_prty_svt"],
            transparent: true,
            viewparams: 'svt:H',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Non-Injured Vehicle State Vehicle Type Other Bus",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_veh_no_injry_drivers_prty_svt", "vw_geoserver_veh_no_injry_drivers_prty_svt"],
            transparent: true,
            viewparams: 'svt:I',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Non-Injured Vehicle State Vehicle Type Emergency Vehicle",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_veh_no_injry_drivers_prty_svt", "vw_geoserver_veh_no_injry_drivers_prty_svt"],
            transparent: true,
            viewparams: 'svt:J',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Non-Injured Vehicle State Vehicle Type Heavy Equipment",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_veh_no_injry_drivers_prty_svt", "vw_geoserver_veh_no_injry_drivers_prty_svt"],
            transparent: true,
            viewparams: 'svt:K',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Non-Injured Vehicle State Vehicle Type Bicycle",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_veh_no_injry_drivers_prty_svt", "vw_geoserver_veh_no_injry_drivers_prty_svt"],
            transparent: true,
            viewparams: 'svt:L',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Non-Injured Vehicle State Vehicle Type Other Vehicle",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_veh_no_injry_drivers_prty_svt", "vw_geoserver_veh_no_injry_drivers_prty_svt"],
            transparent: true,
            viewparams: 'svt:M',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Non-Injured Vehicle State Vehicle Type Pedestrian",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_veh_no_injry_drivers_prty_svt", "vw_geoserver_veh_no_injry_drivers_prty_svt"],
            transparent: true,
            viewparams: 'svt:N',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Non-Injured Vehicle State Vehicle Type Moped",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_veh_no_injry_drivers_prty_svt", "vw_geoserver_veh_no_injry_drivers_prty_svt"],
            transparent: true,
            viewparams: 'svt:O',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Non-Injured Vehicle State Vehicle Type Not Stated",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_veh_no_injry_drivers_prty_svt", "vw_geoserver_veh_no_injry_drivers_prty_svt"],
            transparent: true,
            viewparams: 'svt:-',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),

    //VEHICLE-VEHICLE PARTY=NON INJURY-DRIVER RACE

    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Non-Injured Vehicle Party Asian",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_veh_no_injry_drivers_prty_race", "vw_geoserver_veh_no_injry_drivers_prty_race"],
            transparent: true,
            viewparams: 'race:A',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Non-Injured Vehicle Party Black",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_veh_no_injry_drivers_prty_race", "vw_geoserver_veh_no_injry_drivers_prty_race"],
            transparent: true,
            viewparams: 'race:B',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Non-Injured Vehicle Party Hispanic",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_veh_no_injry_drivers_prty_race", "vw_geoserver_veh_no_injry_drivers_prty_race"],
            transparent: true,
            viewparams: 'race:H',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Non-Injured Vehicle Party Race Other",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_veh_no_injry_drivers_prty_race", "vw_geoserver_veh_no_injry_drivers_prty_race"],
            transparent: true,
            viewparams: 'race:O',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Non-Injured Vehicle Party White",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_veh_no_injry_drivers_prty_race", "vw_geoserver_veh_no_injry_drivers_prty_race"],
            transparent: true,
            viewparams: 'race:W',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Non-Injured Vehicle Party Race Not Stated",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_veh_no_injry_drivers_prty_race", "vw_geoserver_veh_no_injry_drivers_prty_race"],
            transparent: true,
            viewparams: 'race:-',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),

    //VEHICLE-VEHICLE PARTY=NON INJURY-DRIVER SOBRIETY

    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Non-Injured Vehicle Party Had Not Been Drinking",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_veh_no_injry_drivers_prty_sobriety", "vw_geoserver_veh_no_injry_drivers_prty_sobriety"],
            transparent: true,
            viewparams: 'sobriety:A',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Non-Injured Vehicle Party Had Been Drinking, Under the Influence",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_veh_no_injry_drivers_prty_sobriety", "vw_geoserver_veh_no_injry_drivers_prty_sobriety"],
            transparent: true,
            viewparams: 'sobriety:B',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Non-Injured Vehicle Party Had Been Drinking, Not Under Influence",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_veh_no_injry_drivers_prty_sobriety", "vw_geoserver_veh_no_injry_drivers_prty_sobriety"],
            transparent: true,
            viewparams: 'sobriety:C',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Non-Injured Vehicle Party Had Been Drinking, Impairment Unknown",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_veh_no_injry_drivers_prty_sobriety", "vw_geoserver_veh_no_injry_drivers_prty_sobriety"],
            transparent: true,
            viewparams: 'sobriety:D',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Non-Injured Vehicle Party Impairment Unknown",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_veh_no_injry_drivers_prty_sobriety", "vw_geoserver_veh_no_injry_drivers_prty_sobriety"],
            transparent: true,
            viewparams: 'sobriety:G',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Non-Injured Vehicle Party Sobriety Not Applicable",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_veh_no_injry_drivers_prty_sobriety", "vw_geoserver_veh_no_injry_drivers_prty_sobriety"],
            transparent: true,
            viewparams: 'sobriety:H',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Non-Injured Vehicle Party Sobriety Not Stated",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_veh_no_injry_drivers_prty_sobriety", "vw_geoserver_veh_no_injry_drivers_prty_sobriety"],
            transparent: true,
            viewparams: 'sobriety:-',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),

    /*
     * ==================================
     * SWITRS DATA -- VEHICLE-VEHICLE PARTY=INJURED VEHICLE VARIABLES
     * ==================================
     */

    //VEHICLE-VEHICLE PARTY=INJURED VEHICLE AT FAULT

    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Injured Vehicle Party at Fault",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_veh_injry_prty_fault", "vw_geoserver_veh_injry_prty_fault"],
            transparent: true,
            viewparams: 'fault:Y',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),

    //VEHICLE-VEHICLE PARTY=INJURED VEHICLE MOVEMENT PRECEDING COLLISION (MPC)

    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Injured Vehicle Party Movement Preceding Collision Stopped",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_veh_injry_prty_mpc", "vw_geoserver_veh_injry_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:A',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Injured Vehicle Party Movement Preceding Collision Straight",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_veh_injry_prty_mpc", "vw_geoserver_veh_injry_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:B',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Injured Vehicle Party Movement Preceding Collision Ran Off Road",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_veh_injry_prty_mpc", "vw_geoserver_veh_injry_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:C',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Injured Vehicle Party Movement Preceding Collision Making Right Turn",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_veh_injry_prty_mpc", "vw_geoserver_veh_injry_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:D',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Injured Vehicle Party Movement Preceding Collision Making Left Turn",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_veh_injry_prty_mpc", "vw_geoserver_veh_injry_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:E',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Injured Vehicle Party Movement Preceding Collision Making U Turn",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_veh_injry_prty_mpc", "vw_geoserver_veh_injry_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:F',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Injured Vehicle Party Movement Preceding Collision Backing",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_veh_injry_prty_mpc", "vw_geoserver_veh_injry_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:G',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Injured Vehicle Party Movement Preceding Collision Slowing",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_veh_injry_prty_mpc", "vw_geoserver_veh_injry_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:H',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Injured Vehicle Party Movement Preceding Collision Passing",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_veh_injry_prty_mpc", "vw_geoserver_veh_injry_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:I',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Injured Vehicle Party Movement Preceding Collision Changing Lanes",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_veh_injry_prty_mpc", "vw_geoserver_veh_injry_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:J',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ), new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Injured Vehicle Party Movement Preceding Collision Parking",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_veh_injry_prty_mpc", "vw_geoserver_veh_injry_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:K',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Injured Vehicle Party Movement Preceding Collision Entering Roadway",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_veh_injry_prty_mpc", "vw_geoserver_veh_injry_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:L',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Injured Vehicle Party Movement Preceding Collision Other Turning",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_veh_injry_prty_mpc", "vw_geoserver_veh_injry_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:M',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Injured Vehicle Party Movement Preceding Collision Crossed Into Opposing Lane",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_veh_injry_prty_mpc", "vw_geoserver_veh_injry_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:N',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Injured Vehicle Party Movement Preceding Collision Parked",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_veh_injry_prty_mpc", "vw_geoserver_veh_injry_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:O',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Injured Vehicle Party Movement Preceding Collision Merging",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_veh_injry_prty_mpc", "vw_geoserver_veh_injry_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:P',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Injured Vehicle Party Movement Preceding Collision Wrong Way",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_veh_injry_prty_mpc", "vw_geoserver_veh_injry_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:Q',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Injured Vehicle Party Movement Preceding Collision Other",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_veh_injry_prty_mpc", "vw_geoserver_veh_injry_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:R',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Injured Vehicle Party Movement Preceding Collision Not Stated",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_veh_injry_prty_mpc", "vw_geoserver_veh_injry_prty_mpc"],
            transparent: true,
            viewparams: 'mpc:-',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),

    //VEHICLE-VEHICLE PARTY=INJURED VEHICLE RACE

    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Injured Vehicle Party Asian",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_veh_injry_prty_race", "vw_geoserver_veh_injry_prty_race"],
            transparent: true,
            viewparams: 'race:A',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Injured Vehicle Party Black",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_veh_injry_prty_race", "vw_geoserver_veh_injry_prty_race"],
            transparent: true,
            viewparams: 'race:B',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Injured Vehicle Party Hispanic",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_veh_injry_prty_race", "vw_geoserver_veh_injry_prty_race"],
            transparent: true,
            viewparams: 'race:H',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Injured Vehicle Party Other Race",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_veh_injry_prty_race", "vw_geoserver_veh_injry_prty_race"],
            transparent: true,
            viewparams: 'race:O',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Injured Vehicle Party White",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_veh_injry_prty_race", "vw_geoserver_veh_injry_prty_race"],
            transparent: true,
            viewparams: 'race:W',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Injured Vehicle Party Race Not Stated",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_veh_injry_prty_race", "vw_geoserver_veh_injry_prty_race"],
            transparent: true,
            viewparams: 'race:-',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),

    //VEHICLE-VEHICLE PARTY=INJURED VEHICLE SOBRIETY

    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Injured Vehicle Party Had Not Been Drinking",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_veh_injry_prty_sobriety", "vw_geoserver_veh_injry_prty_sobriety"],
            transparent: true,
            viewparams: 'sobriety:A',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Injured Vehicle Party Had Been Drinking, Under the Influence",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_veh_injry_prty_sobriety", "vw_geoserver_veh_injry_prty_sobriety"],
            transparent: true,
            viewparams: 'sobriety:B',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Injured Vehicle Party Had Been Drinking, Not Under Influence",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_veh_injry_prty_sobriety", "vw_geoserver_veh_injry_prty_sobriety"],
            transparent: true,
            viewparams: 'sobriety:C',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Injured Vehicle Party Had Been Drinking, Impairment Unknown",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_veh_injry_prty_sobriety", "vw_geoserver_veh_injry_prty_sobriety"],
            transparent: true,
            viewparams: 'sobriety:D',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Injured Vehicle Party Impairment Unknown",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_veh_injry_prty_sobriety", "vw_geoserver_veh_injry_prty_sobriety"],
            transparent: true,
            viewparams: 'sobriety:G',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Injured Vehicle Party Sobriety Not Applicable",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_veh_injry_prty_sobriety", "vw_geoserver_veh_injry_prty_sobriety"],
            transparent: true,
            viewparams: 'sobriety:H',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Injured Vehicle Party Sobriety Not Stated",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_veh_injry_prty_sobriety", "vw_geoserver_veh_injry_prty_sobriety"],
            transparent: true,
            viewparams: 'sobriety:-',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),

    /*
     * ==================================
     * SWITRS DATA -- VEHICLE-VEHICLE VICTIM=Injured Vehicle VARIABLES
     * ==================================
     */

    //VEHICLE-VEHICLE VICTIM=Injured Vehicle GENDER

    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Injured Vehicle Victim Male",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_vctm_gender_veh", "vw_geoserver_switrs_vctm_gender_veh"],
            transparent: true,
            viewparams: 'gender:M',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Injured Vehicle Victim Female",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_vctm_gender_veh", "vw_geoserver_switrs_vctm_gender_veh"],
            transparent: true,
            viewparams: 'gender:F',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Injured Vehicle Victim Not Stated",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_vctm_gender_veh", "vw_geoserver_switrs_vctm_gender_veh"],
            transparent: true,
            viewparams: 'gender:-',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),

    //VEHICLE-VEHICLE VICTIM=Injured Vehicle AGE

    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Injured Vehicle Victim Age 0 to 12",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_vctm_age_veh", "vw_geoserver_switrs_vctm_age_veh"],
            transparent: true,
            viewparams: 'age1:0;age2:12',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Injured Vehicle Victim Age 13 to 17",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_vctm_age_veh", "vw_geoserver_switrs_vctm_age_veh"],
            transparent: true,
            viewparams: 'age1:13;age2:17',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Injured Vehicle Victim Age 18 to 24",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_vctm_age_veh", "vw_geoserver_switrs_vctm_age_veh"],
            transparent: true,
            viewparams: 'age1:18;age2:24',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Injured Vehicle Victim Age 25 to 34",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_vctm_age_veh", "vw_geoserver_switrs_vctm_age_veh"],
            transparent: true,
            viewparams: 'age1:25;age2:34',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Injured Vehicle Victim Age 35 to 44",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_vctm_age_veh", "vw_geoserver_switrs_vctm_age_veh"],
            transparent: true,
            viewparams: 'age1:35;age2:44',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Injured Vehicle Victim Age 45 to 54",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_vctm_age_veh", "vw_geoserver_switrs_vctm_age_veh"],
            transparent: true,
            viewparams: 'age1:45;age2:54',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Injured Vehicle Victim Age 55 to 64",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_vctm_age_veh", "vw_geoserver_switrs_vctm_age_veh"],
            transparent: true,
            viewparams: 'age1:55;age2:64',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Injured Vehicle Victim Age 65 Plus",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_vctm_age_veh", "vw_geoserver_switrs_vctm_age_veh"],
            transparent: true,
            viewparams: 'age1:65;age2:997',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Injured Vehicle Victim Age Unknown",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_vctm_age_veh", "vw_geoserver_switrs_vctm_age_veh"],
            transparent: true,
            viewparams: 'age1:998;age2:998',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),

    //VEHICLE-VEHICLE VICTIM=Injured Vehicle DEGREE OF INJURY

    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Injured Vehicle Victim Killed",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_vctm_doi_veh", "vw_geoserver_switrs_vctm_doi_veh"],
            transparent: true,
            viewparams: 'doi:1',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Injured Vehicle Victim Severely Injured",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_vctm_doi_veh", "vw_geoserver_switrs_vctm_doi_veh"],
            transparent: true,
            viewparams: 'doi:2',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Injured Vehicle Victim Other Visible Injury",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_vctm_doi_veh", "vw_geoserver_switrs_vctm_doi_veh"],
            transparent: true,
            viewparams: 'doi:3',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS("Vehicle-Vehicle Collisions - Injured Vehicle Victim Complaint of Pain",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: ["vw_geoserver_switrs_vctm_doi_veh", "vw_geoserver_switrs_vctm_doi_veh"],
            transparent: true,
            viewparams: 'doi:4',
            format: 'image/png8',
            styles: ['Heatmap', 'Stacker']
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize'
        }
    ),

    //Boundaries

    new OpenLayers.Layer.WMS(
        "6a - Neighborhoods",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "geo_bndry_neighborhoods",
            transparent: true,
            format: 'image/png8',
			styles:'Neighborhoods'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize',
            metadata: {
                wfs: {
                    protocol: 'fromWMSLayer',
                    downloadFormats: Heron.options.wfs.downloadFormats,
                    featureType: 'geo_bndry_neighborhoods',
                }
            },
        }
    ),
    new OpenLayers.Layer.WMS(
        "6b - Supervisor Districts",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "geo_bndry_supervisor_districts",
            transparent: true,
            format: 'image/png8',
			styles:'Supervisor Districts'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize',
            metadata: {
                wfs: {
                    protocol: 'fromWMSLayer',
                    downloadFormats: Heron.options.wfs.downloadFormats,
                    featureType: 'geo_bndry_supervisor_districts',
                }
            },
        }
    ),
    new OpenLayers.Layer.WMS(
        "6c - Zipcodes",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "geo_bndry_zipcodes",
            transparent: true,
            format: 'image/png8',
			styles: 'Zipcodes'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize',
            metadata: {
                wfs: {
                    protocol: 'fromWMSLayer',
                    downloadFormats: Heron.options.wfs.downloadFormats,
                    featureType: 'geo_bndry_zipcodes',
                }
            },
        }
    ),
    new OpenLayers.Layer.WMS(
        "6d - TAZ Districts",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "geo_bndry_taz_districts",
            transparent: true,
            format: 'image/png8',
			styles: 'TAZ Districts'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize',
            metadata: {
                wfs: {
                    protocol: 'fromWMSLayer',
                    downloadFormats: Heron.options.wfs.downloadFormats,
                    featureType: 'geo_bndry_taz_districts',
                }
            },
        }
    ),
    new OpenLayers.Layer.WMS(
        "6e - Police Districts",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "geo_bndry_sfpd_districts",
            transparent: true,
            format: 'image/png8',
			styles: 'SFPD Districts'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize',
            metadata: {
                wfs: {
                    protocol: 'fromWMSLayer',
                    downloadFormats: Heron.options.wfs.downloadFormats,
                    featureType: 'geo_bndry_sfpd_districts',
                }
            },
        }
    ),
    new OpenLayers.Layer.WMS(
        "6f - Census Tracts 2010",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "geo_bndry_census_tracts_2010",
            transparent: true,
            format: 'image/png8',
			styles: '2010 Census Tracts'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize',
            metadata: {
                wfs: {
                    protocol: 'fromWMSLayer',
                    downloadFormats: Heron.options.wfs.downloadFormats,
                    featureType: 'geo_bndry_census_tracts_2010',
                }
            },
        }
    ),
    new OpenLayers.Layer.WMS(
        "6g - Census Tracts 2000",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "geo_bndry_census_tracts_2000",
            transparent: true,
            format: 'image/png8',
			styles: '2000 Census Tracts'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize',
            metadata: {
                wfs: {
                    protocol: 'fromWMSLayer',
                    downloadFormats: Heron.options.wfs.downloadFormats,
                    featureType: 'geo_bndry_census_tracts_2000',
                }
            },
        }
    ),
	    new OpenLayers.Layer.WMS(
        "7a - Vision Zero High Injury Network",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_st_sgmt_vz_hgh_injry_ntwrk",
            transparent: true,
            format: 'image/png8'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize',
            metadata: {
                wfs: {
                    protocol: 'fromWMSLayer',
                    downloadFormats: Heron.options.wfs.downloadFormats,
                    featureType: 'vw_geo_st_sgmt_vz_hgh_injry_ntwrk',
                }
            },
        }
    ),
	    new OpenLayers.Layer.WMS(
        "7b - Pedestrian High Injury Corridors",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_st_sgmt_ped_hgh_injry_crrdr",
            transparent: true,
            format: 'image/png8',
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize',
            metadata: {
                wfs: {
                    protocol: 'fromWMSLayer',
                    downloadFormats: Heron.options.wfs.downloadFormats,
                    featureType: 'vw_geo_st_sgmt_ped_hgh_injry_crrdr',
                }
            },
        }
    ),
	    new OpenLayers.Layer.WMS(
        "7c - Cyclist High Injury Corridors",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_st_sgmt_cyc_hgh_injry_crrdr",
            transparent: true,
            format: 'image/png8'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize',
            metadata: {
                wfs: {
                    protocol: 'fromWMSLayer',
                    downloadFormats: Heron.options.wfs.downloadFormats,
                    featureType: 'vw_geo_st_sgmt_cyc_hgh_injry_crrdr',
                }
            },
        }
    ),
	    new OpenLayers.Layer.WMS(
        "7d - Vehicle High Injury Corridors",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_ped_hgh_injry_intrsctn",
            transparent: true,
            format: 'image/png8'
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize',
            metadata: {
                wfs: {
                    protocol: 'fromWMSLayer',
                    downloadFormats: Heron.options.wfs.downloadFormats,
                    featureType: 'vw_geo_intrsctn_ped_hgh_injry_intrsctn',
                }
            },
        }
    ),
	    new OpenLayers.Layer.WMS(
        "7e - Pedestrian High Injury Intersections",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_ped_hgh_injry_intrsctn",
            transparent: true,
            format: 'image/png8',
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize',
            metadata: {
                wfs: {
                    protocol: 'fromWMSLayer',
                    downloadFormats: Heron.options.wfs.downloadFormats,
                    featureType: 'vw_geo_intrsctn_ped_hgh_injry_intrsctn',
                }
            },
        }
    ),
		    new OpenLayers.Layer.WMS(
        "7f - Cyclist High Injury Intersections",
        'http://transbasesf.org/geoserver/transbase_public/ows?', {
            layers: "vw_geo_intrsctn_cyc_hgh_injry_intrsctn",
            transparent: true,
            format: 'image/png8',
        }, {
            singleTile: true,
            opacity: 0.9,
            isBaseLayer: false,
            visibility: false,
            noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize',
            metadata: {
                wfs: {
                    protocol: 'fromWMSLayer',
                    downloadFormats: Heron.options.wfs.downloadFormats,
                    featureType: 'vw_geo_intrsctn_cyc_hgh_injry_intrsctn',
                }
            },
        }
    )
]