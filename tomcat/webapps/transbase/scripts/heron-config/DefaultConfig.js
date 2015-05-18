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
Ext.namespace("Heron");
Ext.namespace("Heron.options");
Ext.namespace("Heron.options.layertree");

/**
 * Defines the entire layout of a Heron webapp using ExtJS-style.
 *
 * The layout specifies a hierarchy of ExtJS (Panel) components.
 * Each component is either a container of components (xtype: 'panel', i.e. an ExtJS Panel)
 * or a specific leaf component like a map panel (xtype: 'hr_mappanel') or simple HTML
 * panel (xtype: 'hr_htmlpanel'). Each component has a 'xtype' string and component-specific options.
 * The 'xtype' defines the component widget class .
 * For a container-type (xtype: 'panel') the options should include a 'layout' (like 'border' or 'card',
 * and an array of 'items' with each element being a component (another container or a leaf widget component).
 *
 * In order to distinguish ExtJS-specific config options from those that are Heron-specific,
 * the later are prefixed with "hr". These are defined outside this file to allow quick custimization.
 *
 * Specific config options for ExtJS components can be found in the API docs:
 * http://docs.sencha.com/ext-js/3-4/#!/api
 *
 * This is the core config, mainly the layout of a Heron browser application for all examples.
 * Many of the options refer to Javascript variables that are defined within
 * the DefaultOptions*.js. In particular Layers and specific widgets. This has been done
 * to create a reusable config for all examples. Each example may also add a 3rd refinement
 * using a local Config.js file. The names of the config files and variables like Heron.options.bookmarks
 * don't matter. They are just a convenience as to break up a large configuration into
 * the more stable common parts and the more variable parts. As it is all JSON/JavaScript, we
 * can use variables, in our case namespaced, like "Heron.options.bookmarks" as to avoid conflicts in
 * the global JS namespace. (If we would have XML configs we would have to resort to xlinks).
 *
 **/

// Custom accordion layout that does not allow the accordion to be fully closed.  
// I.e., at least one panel must be open, and that panel cannot be explicitly closed.
// Credit to Gjslick http://www.sencha.com/forum/showthread.php?61487-Way-to-keep-at-least-one-panel-in-an-accordion-layout-always-expanded
Ext.ux.NonCollapsingAccordionLayout = Ext.extend(Ext.layout.Accordion, {
    animate: false,
    // A reference to the currently expanded panel that I can change without altering the this.activeItem object
    currentlyExpandedPanel: null,
    renderItem: function(c) {
        // Call super.renderItem
        Ext.ux.NonCollapsingAccordionLayout.superclass.renderItem.apply(this, arguments);
        // If not set yet, initialize this.currentlyExpandedPanel to the first panel
        if (!this.currentlyExpandedPanel) this.currentlyExpandedPanel = this.container.items.items[0];
        // Setup event listeners for beforeexpand and beforecollapse to run the functionality
        c.on('beforeexpand', this.beforeExpandPanel, this);
        c.on('beforecollapse', this.beforeCollapsePanel, this);
    },
    beforeExpandPanel: function(panel) {
        var panelToCollapse = this.currentlyExpandedPanel; // A holder for the previously selected panel
        this.currentlyExpandedPanel = panel; // Set the new panel as the currently expanded one
        panelToCollapse.collapse(); // Collapse the previously selected panel
    },
    beforeCollapsePanel: function(panel) {
        // Cancel the collapse if the panel to collapse is the currently expanded panel
        if (panel == this.currentlyExpandedPanel) return false;
    }
});
Ext.Container.LAYOUTS['noncollapsingaccordion'] = Ext.ux.NonCollapsingAccordionLayout;

Ext.override(Ext.layout.CardLayout, {
    getActiveIndex: function() {
        return this.container.items.indexOf(this.activeItem);
    }
});

//Create extjs panel inputs 
var connections = "/resouces/connection.htm"
var meta_id = null

var layertree = {
    xtype: 'hr_layertreepanel',
    // Optional, use internal default if not set
    hropts: Heron.options.layertree,
    title: 'Available Features',
    height: 500,
    hideCollapseTool: false,
    collapsible: false,
    titleCollapse: false,
    defaults: {
        border: false
    },
    listeners: {
        click: function(node) {
            meta_id = node.attributes.meta_tag
            Ext.Ajax.request({
                url: '../metadata/metadata.php',
                method: 'POST',
                params: {
                    meta_id: node.attributes.meta_tag
                },
                success: function(response) {
                    var text = response.responseText;
                    metacard.body.update(text), metacard.expand();
                }
            });
        }
    }
}

var myNav = function(incr) {
    if (isNaN(meta_id) == true) {
        var meta_id = 2
    } else {
        var meta_id = 1
    }
    var next = incr;
    Ext.getCmp('card-prev').setDisabled(next - 1 <= 0);
    Ext.Ajax.request({
        url: '../metadata/metadata.php',
        method: 'POST',
        params: {
            meta_id: next
        },
        success: function(response) {
            var text = response.responseText;
            metacard.body.update(text), metacard.expand();
            return meta_id
        }
    });
};

var metacard = new Ext.Panel({
    xtype: 'panel',
    layout: 'card',
    id: 'hr-info-west-meta',
    activeItem: 0,
    defaults: {
        border: false
    },
    autoScroll: true,
    preventBodyReset: true,
    title: 'Metadata',
    bbar: ['->', {
        id: 'card-prev',
        text: '&laquo; Previous',
        handler: function() {
            myNav(meta_id -= 1)
        }
    }, {
        id: 'card-next',
        text: 'Next &raquo;',
        handler: function() {
            myNav(meta_id += 1)
        }
    }],
});

var connections = new Ext.Panel({
    xtype: 'panel',
    id: 'hr-info-west-connections',
    defaults: {
        border: false
    },
    preventBodyReset: true,
    autoScroll: true,
    title: 'Connect',
    autoLoad: '../connection/connection.php'
})

var header = {
    xtype: 'hr_htmlpanel',
    id: 'hr-logo-panel',
    region: 'center',
    bodyBorder: false,
    border: false,
    autoLoad: {
        url: 'resources/html/north-logo.html',
    },
    height: 55
}

var hrlegend = {
    xtype: 'hr_layerlegendpanel',
    id: 'hr-layerlegend-panel',
    collapsible: false,
    defaults: {
        useScaleParameter: false,
        baseParams: {
            FORMAT: 'image/png',
            LEGEND_OPTIONS: 'fontName:sans-serif;fontSize:11',
        }
    },
    hropts: {
        prefetchLegends: false
    }
}

var activepanel =

    {
        xtype: 'hr_activelayerspanel',
        height: 240,
        title: 'Active Features',
        flex: 3,
        defaults: {
            border: false
        },
        preventBodyReset: true,
        autoScroll: true,
        contextMenu: [{
            xtype: 'hr_layernodemenulayerinfo'
        }, {
            xtype: 'hr_layernodemenuzoomextent'
        }, {
            xtype: 'hr_layernodemenuopacityslider'
        }],
        hropts: {
            /** Defines the custom component added under the standard layer node. */
            component: {
                xtype: "gx_opacityslider",
                showTitle: false,
                plugins: new GeoExt.LayerOpacitySliderTip(),
                width: 160,
                inverse: false,
                aggressive: false,
                style: {
                    marginLeft: '18px'
                }
            }
        }
    }

Heron.layout = {
    xtype: 'panel',
    /* Optional ExtJS Panel properties here, like "border", see ExtJS API docs. */
    id: 'hr-container-main',
    layout: 'border',
    border: true,
    /** Any classes in "items" and nested items are automatically instantiated (via "xtype") and added by ExtJS. */
    items: [{
        xtype: 'panel',
        id: 'hr-container-north',
        region: 'north',
        layout: 'border',
        width: '100%',
        height: 70,
        bodyBorder: false,
        border: true,
        items: [
            header
        ]
    }, {
        xtype: 'panel',
        id: 'hr-menu-left-container',
        layout: 'noncollapsingaccordion',
        region: "west",
        layoutConfig: {
            animate: true
        },
        width: 340,
        collapsible: true,
        fill: true,
        split: true,
        defaults: {
            border: true,
            frame: false
        },
        border: false,
        items: [
            layertree, 
			activepanel
        ]
    }, {
        xtype: 'panel',
        id: 'hr-map-and-info-container',
        layout: 'border',
        region: 'center',
        width: '100%',
        collapsible: false,
        split: false,
        border: false,
        items: [{
            xtype: 'hr_mappanel',
            id: 'hr-map',
            title: '&nbsp;',
            region: 'center',
            collapsible: false,
            border: false,
            hropts: Heron.options.map
        }]
    }, {
        xtype: 'panel',
        id: 'hr-menu-right-container',
        layout: 'noncollapsingaccordion',
        region: "east",
        layoutConfig: {
            animate: true
        },
        width: 270,
        collapsible: true,
        split: true,
        border: false,
        items: [
            hrlegend,
            metacard,
            connections,
        ]
    }]
}

var treeTheme = [
    //Base maps
    {
        text: 'Base Maps',
        expanded: false,
        icon: "resources/images/icons/earth.png",
        children: [{
                test: 1,
                nodeType: "gx_layer",
                layer: "ESRI Topographic Map"
            }, {
                nodeType: "gx_layer",
                layer: "ESRI Imagery"
            }, {
                nodeType: "gx_layer",
                layer: "ESRI Street Labels"
            }, {
                nodeType: "gx_layer",
                layer: "ESRI Street Map"
            }, {
                nodeType: "gx_layer",
                layer: "toner",
                text: "Stamen Toner"
            }, {
                nodeType: "gx_layer",
                layer: "terrain",
                text: "Stamen Terrain"
            }, {
                nodeType: "gx_layer",
                layer: "Google Street Map"
            },

        ]
    },
    //Intersection variables
    {
        text: 'Intersection Variables',
        expanded: true,
        icon: "resources/images/icons/intersection.png",
        children: [{
            text: 'Infrastructure',
            icon: "resources/images/icons/traffic_lights.png",
            children: [{
                meta_tag: 157,
                nodeType: "gx_layer",
                layer: "Intersection Control Device",
                qtip: "Click to access metadata panel."
            }, {
                meta_tag: 161,
                nodeType: "gx_layer",
                layer: "Intersection Description",
                qtip: "Click to access metadata panel."
            }, {
                meta_tag: 159,
                nodeType: "gx_layer",
                layer: "Presence of Audible Traffic Signal (ATS)",
                qtip: "Click to access metadata panel."
            }, {
                meta_tag: 159,
                nodeType: "gx_layer",
                layer: "Presence of Red Light Camera",
                qtip: "Click to access metadata panel."
            },{
                meta_tag: 172,
                nodeType: "gx_layer",
                layer: "Presence of Traffic Calming Feature",
                qtip: "Click to access metadata panel."
            }, {
                meta_tag: 174,
                nodeType: "gx_layer",
                layer: "Presence of Continental Crosswalk",
                qtip: "Click to access metadata panel."
            }, 
			// {
                // meta_tag: 176,
                // nodeType: "gx_layer",
                // layer: "Presence of School Crosswalk",
                // qtip: "Click to access metadata panel."
            // }, 
			{
                meta_tag: 173,
                nodeType: "gx_layer",
                layer: "Presence of Truck Route",
                qtip: "Click to access metadata panel."
            }, {
                meta_tag: 150,
                nodeType: "gx_layer",
                layer: "Count PUC Lights Along Segments",
                qtip: "Click to access metadata panel."
            }, {
                meta_tag: 169,
                nodeType: "gx_layer",
                layer: "Count of Trees within 50-foot Radius",
                qtip: "Click to access metadata panel."
            }, {
                meta_tag: 170,
                nodeType: "gx_layer",
                layer: "Count of Trees within 100-foot Radius",
                qtip: "Click to access metadata panel."
            }, {
                meta_tag: 171,
                nodeType: "gx_layer",
                layer: "Count of Trees within 500-foot Radius",
                qtip: "Click to access metadata panel."
            }, {
                meta_tag: 168,
                nodeType: "gx_layer",
                layer: "Count of Trees within Quarter Mile Radius",
                qtip: "Click to access metadata panel."
            }, {
                meta_tag: 142,
                nodeType: "gx_layer",
                layer: "Count of Muni Lines Crossing Intersection",
                qtip: "Click to access metadata panel."
            }, {
                meta_tag: 144,
                nodeType: "gx_layer",
                layer: "Count of Muni Stops within 100 Feet",
                qtip: "Click to access metadata panel."
            }, {
                meta_tag: 146,
                nodeType: "gx_layer",
                layer: "Count of Off Street Parking Along Segments",
                qtip: "Click to access metadata panel."
            }, {
                meta_tag: 147,
                nodeType: "gx_layer",
                layer: "Count of On Street Parking Along Segments",
                qtip: "Click to access metadata panel."
            }, {
                meta_tag: 164,
                nodeType: "gx_layer",
                layer: "Maximum Slope Along Segments",
                qtip: "Click to access metadata panel."
            }, {
                meta_tag: 165,
                nodeType: "gx_layer",
                layer: "Maximum Speed Limit Along Segments",
                qtip: "Click to access metadata panel."
            }, {
                meta_tag: 166,
                nodeType: "gx_layer",
                layer: "Maximum Street Width at Intersection",
                qtip: "Click to access metadata panel."
            }]
        }, {
            text: 'Transportation',
            icon: "resources/images/icons/transportation.png",
            children: [{
                    meta_tag: 189,
                    nodeType: "gx_layer",
                    layer: "Daily Pedestrian Traffic Volume",
                    qtip: "Click to access metadata panel."
                }, {
                    meta_tag: 188,
                    nodeType: "gx_layer",
                    layer: "Annual Pedestrian Traffic Volume",
                    qtip: "Click to access metadata panel."
                }, {
                    meta_tag: 186,
                    nodeType: "gx_layer",
                    layer: "Daily Transit Riders within Quarter Mile Radius",
                    qtip: "Click to access metadata panel."
                }, {
                    meta_tag: 187,
                    nodeType: "gx_layer",
                    layer: "Daily Transit Riders within Eighth Mile Radius",
                    qtip: "Click to access metadata panel."
                },
                // {meta_tag:190, nodeType:"gx_layer", layer:"Walk Trips From Origin (TAZ Level)", qtip:"Click to access metadata panel." },
                // {meta_tag:191, nodeType:"gx_layer", layer:"Walk Trips From Origin (TAZ District Level)", qtip:"Click to access metadata panel." },
                // {meta_tag:184, nodeType:"gx_layer", layer:"Bike Trips From Origin (TAZ Level)", qtip:"Click to access metadata panel." },
                // {meta_tag:185, nodeType:"gx_layer", layer:"Bike Trips From Origin (TAZ District Level)", qtip:"Click to access metadata panel." }
            ]
        }, {
            text: 'Community',
            icon: "resources/images/icons/community.png",
            children: [{
                meta_tag: 74,
                nodeType: "gx_layer",
                layer: "Count of Art Installations within a Quarter Mile Radius",
                qtip: "Click to access metadata panel."
            }, {
                meta_tag: 75,
                nodeType: "gx_layer",
                layer: "Nearest Art Installation to Intersection in Feet",
                qtip: "Click to access metadata panel."
            }, {
                meta_tag: 76,
                nodeType: "gx_layer",
                layer: "Count of Childcare Facilities within a Quarter Mile Radius",
                qtip: "Click to access metadata panel."
            }, {
                meta_tag: 77,
                nodeType: "gx_layer",
                layer: "Nearest Childcare Facility to Intersection in Feet",
                qtip: "Click to access metadata panel."
            }, {
                meta_tag: 78,
                nodeType: "gx_layer",
                layer: "Count of Community Centers within a Quarter Mile Radius",
                qtip: "Click to access metadata panel."
            }, {
                meta_tag: 79,
                nodeType: "gx_layer",
                layer: "Nearest Community Center to Intersection in Feet",
                qtip: "Click to access metadata panel."
            }, {
                meta_tag: 80,
                nodeType: "gx_layer",
                layer: "Count Community Gardens within a Quarter Mile Radius",
                qtip: "Click to access metadata panel."
            }, {
                meta_tag: 81,
                nodeType: "gx_layer",
                layer: "Nearest Community Garden to Intersection in Feet",
                qtip: "Click to access metadata panel."
            }, {
                meta_tag: 82,
                nodeType: "gx_layer",
                layer: "Count Libraries within a Quarter Mile Radius",
                qtip: "Click to access metadata panel."
            }, {
                meta_tag: 83,
                nodeType: "gx_layer",
                layer: "Nearest Library to Intersection in Feet",
                qtip: "Click to access metadata panel."
            }, {
                meta_tag: 84,
                nodeType: "gx_layer",
                layer: "Count Parks within a Quarter Mile Radius",
                qtip: "Click to access metadata panel."
            }, {
                meta_tag: 85,
                nodeType: "gx_layer",
                layer: "Nearest Park to Intersection in Feet",
                qtip: "Click to access metadata panel."
            }, {
                meta_tag: 86,
                nodeType: "gx_layer",
                layer: "Count Post Offices within a Quarter Mile Radius",
                qtip: "Click to access metadata panel."
            }, {
                meta_tag: 87,
                nodeType: "gx_layer",
                layer: "Nearest Post Office to Intersection in Feet",
                qtip: "Click to access metadata panel."
            }, {
                meta_tag: 88,
                nodeType: "gx_layer",
                layer: "Count SROs within a Quarter Mile Radius",
                qtip: "Click to access metadata panel."
            }, {
                meta_tag: 89,
                nodeType: "gx_layer",
                layer: "Nearest SRO to Intersection in Feet",
                qtip: "Click to access metadata panel."
            }, {
                meta_tag: 90,
                nodeType: "gx_layer",
                layer: "Count Senior Centers within a Quarter Mile Radius",
                qtip: "Click to access metadata panel."
            }, {
                meta_tag: 91,
                nodeType: "gx_layer",
                layer: "Nearest Senior Center to Intersection in Feet",
                qtip: "Click to access metadata panel."
            }]
        }, {
            text: 'Education',
            icon: "resources/images/icons/education.png",
            children: [{
                meta_tag: 114,
                nodeType: "gx_layer",
                layer: "Count Elementary Schools within a Quarter Mile Radius",
                qtip: "Click to access metadata panel."
            }, {
                meta_tag: 115,
                nodeType: "gx_layer",
                layer: "Nearest Elementary School to Intersection in Feet",
                qtip: "Click to access metadata panel."
            }, {
                meta_tag: 116,
                nodeType: "gx_layer",
                layer: "Count Middle Schools within a Quarter Mile Radius",
                qtip: "Click to access metadata panel."
            }, {
                meta_tag: 117,
                nodeType: "gx_layer",
                layer: "Nearest Middle School to Intersection in Feet",
                qtip: "Click to access metadata panel."
            }, {
                meta_tag: 118,
                nodeType: "gx_layer",
                layer: "Count High Schools within a Quarter Mile Radius",
                qtip: "Click to access metadata panel."
            }, {
                meta_tag: 119,
                nodeType: "gx_layer",
                layer: "Nearest High School to Intersection in Feet",
                qtip: "Click to access metadata panel."
            }, {
                meta_tag: 120,
                nodeType: "gx_layer",
                layer: "Count Higher Education Facilities within a Quarter Mile Radius",
                qtip: "Click to access metadata panel."
            }, {
                meta_tag: 121,
                nodeType: "gx_layer",
                layer: "Nearest Higher Education Facility to Intersection in Feet",
                qtip: "Click to access metadata panel."
            }, {
                meta_tag: 122,
                nodeType: "gx_layer",
                layer: "Count all Public/Private Schools within a Quarter Mile Radius",
                qtip: "Click to access metadata panel."
            }, {
                meta_tag: 123,
                nodeType: "gx_layer",
                layer: "Nearest Public/Private School to Intersection in Feet",
                qtip: "Click to access metadata panel."
            }]
        }, {
            text: 'Business',
            icon: "resources/images/icons/business.png",
            children: [{
                meta_tag: 44,
                nodeType: "gx_layer",
                layer: "Alcohol Outlets within a Quarter Mile Radius",
                qtip: "Click to access metadata panel."
            }, {
                meta_tag: 45,
                nodeType: "gx_layer",
                layer: "Nearest Alcohol Outlet to Intersection in Feet",
                qtip: "Click to access metadata panel."
            }, {
                meta_tag: 46,
                nodeType: "gx_layer",
                layer: "Auto Repair Shops within a Quarter Mile Radius",
                qtip: "Click to access metadata panel."
            }, {
                meta_tag: 47,
                nodeType: "gx_layer",
                layer: "Nearest Auto Repair Shops to Intersection in Feet",
                qtip: "Click to access metadata panel."
            }, {
                meta_tag: 48,
                nodeType: "gx_layer",
                layer: "Banks within a Quarter Mile Radius",
                qtip: "Click to access metadata panel."
            }, {
                meta_tag: 49,
                nodeType: "gx_layer",
                layer: "Nearest Bank to Intersection in Feet",
                qtip: "Click to access metadata panel."
            }, {
                meta_tag: 50,
                nodeType: "gx_layer",
                layer: "Bike Shops within a Quarter Mile Radius",
                qtip: "Click to access metadata panel."
            }, {
                meta_tag: 51,
                nodeType: "gx_layer",
                layer: "Nearest Bike Shop to Intersection in Feet",
                qtip: "Click to access metadata panel."
            }, {
                meta_tag: 52,
                nodeType: "gx_layer",
                layer: "Dry Cleaners within a Quarter Mile Radius",
                qtip: "Click to access metadata panel."
            }, {
                meta_tag: 53,
                nodeType: "gx_layer",
                layer: "Nearest Dry Cleaner to Intersection in Feet",
                qtip: "Click to access metadata panel."
            }, {
                meta_tag: 54,
                nodeType: "gx_layer",
                layer: "Farmers Market within a Quarter Mile Radius",
                qtip: "Click to access metadata panel."
            }, {
                meta_tag: 55,
                nodeType: "gx_layer",
                layer: "Nearest Farms Market to Intersection in Feet",
                qtip: "Click to access metadata panel."
            }, {
                meta_tag: 56,
                nodeType: "gx_layer",
                layer: "Gyms within a Quarter Mile Radius",
                qtip: "Click to access metadata panel."
            }, {
                meta_tag: 57,
                nodeType: "gx_layer",
                layer: "Nearest Gym to Intersection in Feet",
                qtip: "Click to access metadata panel."
            }, {
                meta_tag: 58,
                nodeType: "gx_layer",
                layer: "Hair Salon/Barber Shop within a Quarter Mile Radius",
                qtip: "Click to access metadata panel."
            }, {
                meta_tag: 59,
                nodeType: "gx_layer",
                layer: "Nearest Hair Salon/Barber Shop to Intersection in Feet",
                qtip: "Click to access metadata panel."
            }, {
                meta_tag: 60,
                nodeType: "gx_layer",
                layer: "Hardware Stores within a Quarter Mile Radius",
                qtip: "Click to access metadata panel."
            }, {
                meta_tag: 61,
                nodeType: "gx_layer",
                layer: "Nearest Hardware Store to Intersection in Feet",
                qtip: "Click to access metadata panel."
            }, {
                meta_tag: 62,
                nodeType: "gx_layer",
                layer: "Laundromats within a Quarter Mile Radius",
                qtip: "Click to access metadata panel."
            }, {
                meta_tag: 63,
                nodeType: "gx_layer",
                layer: "Nearest Laundromat to Intersection in Feet",
                qtip: "Click to access metadata panel."
            }, {
                meta_tag: 64,
                nodeType: "gx_layer",
                layer: "Produce Markets within a Quarter Mile Radius",
                qtip: "Click to access metadata panel."
            }, {
                meta_tag: 65,
                nodeType: "gx_layer",
                layer: "Nearest Produce Market to Intersection in Feet",
                qtip: "Click to access metadata panel."
            }, {
                meta_tag: 66,
                nodeType: "gx_layer",
                layer: "Restaurants within a Quarter Mile Radius",
                qtip: "Click to access metadata panel."
            }, {
                meta_tag: 67,
                nodeType: "gx_layer",
                layer: "Nearest Restaurant to Intersection in Feet",
                qtip: "Click to access metadata panel."
            }, {
                meta_tag: 68,
                nodeType: "gx_layer",
                layer: "Supermarkets within a Quarter Mile Radius",
                qtip: "Click to access metadata panel."
            }, {
                meta_tag: 69,
                nodeType: "gx_layer",
                layer: "Nearest Supermarket to Intersection in Feet",
                qtip: "Click to access metadata panel."
            }, {
                meta_tag: 70,
                nodeType: "gx_layer",
                layer: "Video Stores/Theaters within a Quarter Mile Radius",
                qtip: "Click to access metadata panel."
            }, {
                meta_tag: 71,
                nodeType: "gx_layer",
                layer: "Nearest Video Store/Theater to Intersection in Feet",
                qtip: "Click to access metadata panel."
            }]
        }, {
            text: 'Demographics',
            icon: "resources/images/icons/demographics.png",
            children: [{
                meta_tag: 94,
                nodeType: "gx_layer",
                layer: "Count of Individuals Below 200% of Poverty Line Within Quarter Mile Radius",
                qtip: "Click to access metadata panel."
            }, {
                meta_tag: 95,
                nodeType: "gx_layer",
                layer: "Count of Individuals with Disabilities Within Quarter Mile Radius",
                qtip: "Click to access metadata panel."
            }, {
                meta_tag: 96,
                nodeType: "gx_layer",
                layer: "Count of Estimated Employees Within a Quarter Mile Radius",
                qtip: "Click to access metadata panel."
            }, {
                meta_tag: 97,
                nodeType: "gx_layer",
                layer: "Average Household Income Within a Quarter Mile Radius",
                qtip: "Click to access metadata panel."
            }, {
                meta_tag: 98,
                nodeType: "gx_layer",
                layer: "Count of Estimated Non-English Speakers Within a Quarter Mile Radius",
                qtip: "Click to access metadata panel."
            }, {
                meta_tag: 99,
                nodeType: "gx_layer",
                layer: "Count of Estimated People of Color within a Quarter Mile Radius",
                qtip: "Click to access metadata panel."
            }, {
                meta_tag: 100,
                nodeType: "gx_layer",
                layer: "Estimated Proportion of People of Color Within a Quarter Mile Radius",
                qtip: "Click to access metadata panel."
            }, {			
                meta_tag: 101,
                nodeType: "gx_layer",
                layer: "Estimated Proportion of Population with No Vehicle Access Within a Quarter Mile Radius",
                qtip: "Click to access metadata panel."
            }, {
                meta_tag: 102,
                nodeType: "gx_layer",
                layer: "Proportion of Ages Less Than 13 Living Within a Quarter Mile Radius",
                qtip: "Click to access metadata panel."
            }, {
                meta_tag: 103,
                nodeType: "gx_layer",
                layer: "Proportion of Ages 13-20 Living Within a Quarter Mile Radius",
                qtip: "Click to access metadata panel."
            }, {
                meta_tag: 104,
                nodeType: "gx_layer",
                layer: "Proportion of Ages 21-44 Living Within a Quarter Mile Radius",
                qtip: "Click to access metadata panel."
            }, {
                meta_tag: 105,
                nodeType: "gx_layer",
                layer: "Proportion of Ages 45-64 Living Within a Quarter Mile Radius",
                qtip: "Click to access metadata panel."
            }, {
                meta_tag: 106,
                nodeType: "gx_layer",
                layer: "Proportion of Ages 65+ Living Within a Quarter Mile Radius",
                qtip: "Click to access metadata panel."
            }, {
                meta_tag: 107,
                nodeType: "gx_layer",
                layer: "Percent of Household Below Poverty Line Within a Quarter Mile Radius",
                qtip: "Click to access metadata panel."
            }, {
                meta_tag: 108,
                nodeType: "gx_layer",
                layer: "Estimated Residential Population Within a Quarter Mile Radius",
                qtip: "Click to access metadata panel."
            }, {
                meta_tag: 111,
                nodeType: "gx_layer",
                layer: "Estimated Youth Less Than 18 Within a Quarter Mile Radius",
                qtip: "Click to access metadata panel."
            }, {
                meta_tag: 110,
                nodeType: "gx_layer",
                layer: "Estimated Violent Crime Within a Quarter Mile Radius",
                qtip: "Click to access metadata panel."
            }, ]
        }, {
            text: 'Land Use',
            icon: "resources/images/icons/landuse.png",
            children: [{
                meta_tag: 209,
                nodeType: "gx_layer",
                layer: "Proportion of Industrial Zoning within a Quarter Mile Radius",
                qtip: "Click to access metadata panel."
            }, {
                meta_tag: 210,
                nodeType: "gx_layer",
                layer: "Proportion of Commercial Zoning within a Quarter Mile Radius",
                qtip: "Click to access metadata panel."
            }, {
                meta_tag: 211,
                nodeType: "gx_layer",
                layer: "Proportion of Mixed Use within a Quarter Mile Radius",
                qtip: "Click to access metadata panel."
            }, {
                meta_tag: 212,
                nodeType: "gx_layer",
                layer: "Proportion of Neighborhood Commercial Zoning within a Quarter Mile Radius",
                qtip: "Click to access metadata panel."
            }, {
                meta_tag: 213,
                nodeType: "gx_layer",
                layer: "Proportion of Residential Zoning within a Quarter Mile Radius",
                qtip: "Click to access metadata panel."
            }, {
                meta_tag: 214,
                nodeType: "gx_layer",
                layer: "Proportion of Residential Mixed Use Zoning within a Quarter Mile Radius",
                qtip: "Click to access metadata panel."
            }, {
                meta_tag: 215,
                nodeType: "gx_layer",
                layer: "Proportion of Redevelopment Zoning within a Quarter Mile Radius",
                qtip: "Click to access metadata panel."
            }, {
                meta_tag: 216,
                nodeType: "gx_layer",
                layer: "Proportion of Public Use Zoning within a Quarter Mile Radius",
                qtip: "Click to access metadata panel."
            }, ]
        }, {
            text: 'High Injury Intersections',
            icon: "resources/images/icons/other.png",
            children: [{
                meta_tag: 0,
                nodeType: "gx_layer",
                layer: "Pedestrian High Injury Intersections (HIPIs)"
            },{
                meta_tag: 0,
                nodeType: "gx_layer",
                layer: "Cyclist High Injury Intersections (CHIIs)"
            },]
        }]
    },
    // Street variables
    {
        text: 'Street Segment Variables',
        expanded: false,
        icon: "resources/images/icons/roadway.png",
        children: [{
            text: 'Infrastructure',
            icon: "resources/images/icons/traffic_lights.png",
            children: [{
                    meta_tag: 10,
                    nodeType: "gx_layer",
                    layer: "Street Type",
                    qtip: "Click to access metadata panel."
                }, {
                    meta_tag: 238,
                    nodeType: "gx_layer",
                    layer: "Caltrans Maintained",
                    qtip: "Click to access metadata panel."
                }, {
                    meta_tag: 258,
                    nodeType: "gx_layer",
                    layer: "Speed Limit",
                    qtip: "Click to access metadata panel."
                }, {
                    meta_tag: 257,
                    nodeType: "gx_layer",
                    layer: "Slope of Street",
                    qtip: "Click to access metadata panel."
                }, {
                    meta_tag: 262,
                    nodeType: "gx_layer",
                    layer: "Street Width",
                    qtip: "Click to access metadata panel."
                }, {
                    meta_tag: 242,
                    nodeType: "gx_layer",
                    layer: "Number of Lanes AM",
                    qtip: "Click to access metadata panel."
                }, {
                    meta_tag: 243,
                    nodeType: "gx_layer",
                    layer: "Number of Lanes Off-Peak",
                    qtip: "Click to access metadata panel."
                }, {
                    meta_tag: 244,
                    nodeType: "gx_layer",
                    layer: "Number of Lanes PM",
                    qtip: "Click to access metadata panel."
                }, {
                    meta_tag: 236,
                    nodeType: "gx_layer",
                    layer: "Presence of Cyclist Route",
                    qtip: "Click to access metadata panel."
                }, {
                    meta_tag: 246,
                    nodeType: "gx_layer",
                    layer: "Presence of Muni Line",
                    qtip: "Click to access metadata panel."
                }, {
                    meta_tag: 245,
                    nodeType: "gx_layer",
                    layer: "Presence of Median",
                    qtip: "Click to access metadata panel."
                }, {
                    meta_tag: 248,
                    nodeType: "gx_layer",
                    layer: "Presence of One-way Street",
                    qtip: "Click to access metadata panel."
                }, {
                    meta_tag: 255,
                    nodeType: "gx_layer",
                    layer: "Presence of Off/On Ramp",
                    qtip: "Click to access metadata panel."
                }, {
                    meta_tag: 267,
                    nodeType: "gx_layer",
                    layer: "Presence of Truck Route (Segment)",
                    qtip: "Click to access metadata panel."
                },
                // {meta_tag:268, nodeType:"gx_layer", layer:"Presence of Mid-block Crossing", qtip:"Click to access metadata panel."  },
                // {meta_tag:269, nodeType:"gx_layer", layer:"Presence of Continental Crosswalk", qtip:"Click to access metadata panel."  },
                // {meta_tag:270, nodeType:"gx_layer", layer:"Presence of Mid-block Traffic Signal", qtip:"Click to access metadata panel."  },
                // {meta_tag:271, nodeType:"gx_layer", layer:"Mid-block Traffic Signal Type", qtip:"Click to access metadata panel."  },
                // {meta_tag:272, nodeType:"gx_layer", layer:"Presence of Audible Traffic Signal (ATS) at Mid-block Crossing", qtip:"Click to access metadata panel."  },
                // {meta_tag:249, nodeType:"gx_layer", layer:"Count of Off Street Parking on Segment", qtip:"Click to access metadata panel."  },
                // {meta_tag:251, nodeType:"gx_layer", layer:"Count of On Street Parking on Segment", qtip:"Click to access metadata panel."  },
                // {meta_tag:252, nodeType:"gx_layer", layer:"Count of Metered Parking Spaces", qtip:"Click to access metadata panel."  },
                // {meta_tag:254, nodeType:"gx_layer", layer:"Count of PUC Lighting", qtip:"Click to access metadata panel."  },
                // {meta_tag:247, nodeType:"gx_layer", layer:"Count of Muni Stops", qtip:"Click to access metadata panel."  },
                // {meta_tag:256, nodeType:"gx_layer", layer:"Count of Regional Transit Within a Quarter Mile of Segment", qtip:"Click to access metadata panel."  },
                // {meta_tag:259, nodeType:"gx_layer", layer:"Count of Speed Cushions", qtip:"Click to access metadata panel."  },
                // {meta_tag:260, nodeType:"gx_layer", layer:"Count of Speed Humps", qtip:"Click to access metadata panel."  },
                // {meta_tag:261, nodeType:"gx_layer", layer:"Count of Speed Radar", qtip:"Click to access metadata panel."  },
                // {meta_tag:263, nodeType:"gx_layer", layer:"Count of Traffic Circles", qtip:"Click to access metadata panel."  },
                // {meta_tag:264, nodeType:"gx_layer", layer:"Count of Traffic Islands", qtip:"Click to access metadata panel."  },
                // {meta_tag:237, nodeType:"gx_layer", layer:"Count of Bulb-outs", qtip:"Click to access metadata panel."  },
                // {meta_tag:239, nodeType:"gx_layer", layer:"Count of Channelized Segments", qtip:"Click to access metadata panel."  },
                // {meta_tag:240, nodeType:"gx_layer", layer:"Count of Chicanes", qtip:"Click to access metadata panel."  },
                // {meta_tag:241, nodeType:"gx_layer", layer:"Count of Chokers", qtip:"Click to access metadata panel."  },
                // {meta_tag:265, nodeType:"gx_layer", layer:"Count of Traffic Calming Features", qtip:"Click to access metadata panel."  },
                // {meta_tag:266, nodeType:"gx_layer", layer:"Count of Trees", qtip:"Click to access metadata panel."  },
            ]
        }, {
            text: 'Transportation',
            icon: "resources/images/icons/transportation.png",
            children: [{
                meta_tag: 277,
                nodeType: "gx_layer",
                layer: "Daily Transit Riders within Quarter Mile Radius (Segment)",
                qtip: "Click to access metadata panel."
            }, {
                meta_tag: 278,
                nodeType: "gx_layer",
                layer: "Daily Transit Riders within Eighth Mile Radius (Segment)",
                qtip: "Click to access metadata panel."
            }, {
                meta_tag: 280,
                nodeType: "gx_layer",
                layer: "MTA Speed Survey Average Speed",
                qtip: "Click to access metadata panel."
            }, ]
        }, {
            text: 'High Injury Corridors',
            icon: "resources/images/icons/other.png",
            children: [{
                nodeType: "gx_layer",
                layer: "Pedestrian High Injury Corridors (HICs)"
            }, {
                nodeType: "gx_layer",
                layer: "Cyclist High Injury Corridors (CHICs)"
            }, {
                nodeType: "gx_layer",
                layer: "Vehicle High Injury Corridors (VHICs)"
            }, {
                nodeType: "gx_layer",
                layer: "Vision Zero High Injury Network"
            } ]
        }]
    },
    //SWITRS variables
    {
        text: 'Vehicle-Pedestrian SWITRS Variables (2005-2012)',
        expanded: false,
        icon: "resources/images/icons/pedestrian.png",
        children: [{
                text: 'Collisions',
                icon: "resources/images/icons/collision.png",
                children: [{
                    meta_tag: 288,
                    text: 'Time',
                    icon: "resources/images/icons/simple14.png",
                    children: [{
                            meta_tag: 288,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Pedestrian Collisions - 6am to 10am",
                            text: "6:01am to 10:00am"
                        }, {
                            meta_tag: 288,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Pedestrian Collisions - 10am to 2pm",
                            text: "10:01am to 2:00pm"
                        }, {
                            meta_tag: 288,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Pedestrian Collisions - 2pm to 6pm",
                            text: "2:01pm to 6:00pm"
                        }, {
                            meta_tag: 288,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Pedestrian Collisions - 6pm to 10pm",
                            text: "6:01pm to 10:00pm"
                        }, {
                            meta_tag: 288,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Pedestrian Collisions - 10pm to 2am",
                            text: "10:01pm to 2:00am"
                        }, {
                            meta_tag: 288,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Pedestrian Collisions - 2am to 6am",
                            text: "2:01am to 6:00am"
                        },

                    ],
                }, {
                    meta_tag: 291,
                    text: 'Day of Week',
                    icon: "resources/images/icons/calendar7.png",
                    children: [{
                        meta_tag: 291,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Pedestrian Collisions - Monday",
                        text: "Monday"
                    }, {
                        meta_tag: 291,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Pedestrian Collisions - Tuesday",
                        text: "Tuesday"
                    }, {
                        meta_tag: 291,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Pedestrian Collisions - Wednesday",
                        text: "Wednesday"
                    }, {
                        meta_tag: 291,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Pedestrian Collisions - Thursday",
                        text: "Thursday"
                    }, {
                        meta_tag: 291,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Pedestrian Collisions - Friday",
                        text: "Friday"
                    }, {
                        meta_tag: 291,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Pedestrian Collisions - Saturday",
                        text: "Saturday"
                    }, {
                        meta_tag: 291,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Pedestrian Collisions - Sunday",
                        text: "Sunday"
                    }, ]
                }, {
                    meta_tag: 287,
                    text: 'Month',
                    icon: "resources/images/icons/month2.png",
                    children: [{
                        meta_tag: 287,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Pedestrian Collisions - January",
                        text: "January"
                    }, {
                        meta_tag: 287,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Pedestrian Collisions - February",
                        text: "February"
                    }, {
                        meta_tag: 287,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Pedestrian Collisions - March",
                        text: "March"
                    }, {
                        meta_tag: 287,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Pedestrian Collisions - April",
                        text: "April"
                    }, {
                        meta_tag: 287,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Pedestrian Collisions - May",
                        text: "May"
                    }, {
                        meta_tag: 287,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Pedestrian Collisions - June",
                        text: "June"
                    }, {
                        meta_tag: 287,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Pedestrian Collisions - July",
                        text: "July"
                    }, {
                        meta_tag: 287,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Pedestrian Collisions - August",
                        text: "August"
                    }, {
                        meta_tag: 287,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Pedestrian Collisions - September",
                        text: "September"
                    }, {
                        meta_tag: 287,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Pedestrian Collisions - October",
                        text: "October"
                    }, {
                        meta_tag: 287,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Pedestrian Collisions - November",
                        text: "November"
                    }, {
                        meta_tag: 287,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Pedestrian Collisions - December",
                        text: "December"
                    }, ]
                }, {
                    meta_tag: 284,
                    text: 'Year',
                    icon: "resources/images/icons/year.png",
                    children: [{
                        meta_tag: 284,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Pedestrian Collisions - 2005",
                        text: "2005"
                    }, {
                        meta_tag: 284,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Pedestrian Collisions - 2006",
                        text: "2006"
                    }, {
                        meta_tag: 284,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Pedestrian Collisions - 2007",
                        text: "2007"
                    }, {
                        meta_tag: 284,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Pedestrian Collisions - 2008",
                        text: "2008"
                    }, {
                        meta_tag: 284,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Pedestrian Collisions - 2009",
                        text: "2009"
                    }, {
                        meta_tag: 284,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Pedestrian Collisions - 2010",
                        text: "2010"
                    }, {
                        meta_tag: 284,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Pedestrian Collisions - 2011",
                        text: "2011"
                    },{
                        meta_tag: 284,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Pedestrian Collisions - 2012",
                        text: "2012"
                    }, ]
                }, {
                    meta_tag: 306,
                    text: 'Weather',
                    icon: "resources/images/icons/weather.png",
                    children: [{
                        meta_tag: 306,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Pedestrian Collisions - Clear",
                        text: "Clear"
                    }, {
                        meta_tag: 306,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Pedestrian Collisions - Cloudy",
                        text: "Cloudy"
                    }, {
                        meta_tag: 306,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Pedestrian Collisions - Raining",
                        text: "Raining"
                    }, {
                        meta_tag: 306,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Pedestrian Collisions - Snowing",
                        text: "Snowing"
                    }, {
                        meta_tag: 306,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Pedestrian Collisions - Fog",
                        text: "Fog"
                    }, {
                        meta_tag: 306,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Pedestrian Collisions - Other Weather",
                        text: "Other"
                    }, {
                        meta_tag: 306,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Pedestrian Collisions - Wind",
                        text: "Wind"
                    }, {
                        meta_tag: 306,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Pedestrian Collisions - Weather Not Stated",
                        text: "Not Stated"
                    }, ]
                }, {
                    meta_tag: 329,
                    text: 'Type of Collision',
                    icon: "resources/images/icons/traffic1.png",
                    children: [{
                        meta_tag: 329,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Pedestrian Collisions - Head-On",
                        text: "Head-On"
                    }, {
                        meta_tag: 329,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Pedestrian Collisions - Sideswipe",
                        text: "Sideswipe"
                    }, {
                        meta_tag: 329,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Pedestrian Collisions - Rear End",
                        text: "Rear End"
                    }, {
                        meta_tag: 329,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Pedestrian Collisions - Broadside",
                        text: "Broadside"
                    }, {
                        meta_tag: 329,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Pedestrian Collisions - Hit Object",
                        text: "Hit Object"
                    }, {
                        meta_tag: 329,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Pedestrian Collisions - Overturned",
                        text: "Overturned"
                    }, {
                        meta_tag: 329,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Pedestrian Collisions - Vehicle/Pedestrian",
                        text: "Vehicle/Pedestrian"
                    }, {
                        meta_tag: 329,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Pedestrian Collisions - Other Type of Collision",
                        text: "Other"
                    }, {
                        meta_tag: 329,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Pedestrian Collisions - Type of Collision Not Stated",
                        text: "Not Stated"
                    }, ]
                }, {
                    meta_tag: 325,
                    text: 'PCF Violation Category',
                    icon: "resources/images/icons/standing10.png",
                    children: [{
                        meta_tag: 325,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Pedestrian Collisions - Under Influence",
                        text: "Driving or Bicycling Under the Influence of Drugs/Alcohol"
                    }, {
                        meta_tag: 325,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Pedestrian Collisions - Impeding Traffic",
                        text: "Impeding Traffic"
                    }, {
                        meta_tag: 325,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Pedestrian Collisions - Unsafe Speed",
                        text: "Unsafe Speed"
                    }, {
                        meta_tag: 325,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Pedestrian Collisions - Following Too Closely",
                        text: "Following Too Closely"
                    }, {
                        meta_tag: 325,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Pedestrian Collisions - Wrong Side of Road",
                        text: "Wrong Side of Road"
                    }, {
                        meta_tag: 325,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Pedestrian Collisions - Improper Passing",
                        text: "Improper Passing"
                    }, {
                        meta_tag: 325,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Pedestrian Collisions - Unsafe Lane Change",
                        text: "Unsafe Lane Change"
                    }, {
                        meta_tag: 325,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Pedestrian Collisions - Improper Turning",
                        text: "Improper Turning"
                    }, {
                        meta_tag: 325,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Pedestrian Collisions - Automobile Right of Way",
                        text: "Automobile Right of Way"
                    }, {
                        meta_tag: 325,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Pedestrian Collisions - Pedestrian Right of Way",
                        text: "Pedestrian Right of Way"
                    }, {
                        meta_tag: 325,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Pedestrian Collisions - Pedestrian Violation",
                        text: "Pedestrian Violation"
                    }, {
                        meta_tag: 325,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Pedestrian Collisions - Traffic Signals and Signs",
                        text: "Traffic Signals and Signs"
                    }, {
                        meta_tag: 325,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Pedestrian Collisions - Hazardous Parking",
                        text: "Hazardous Parking"
                    }, {
                        meta_tag: 325,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Pedestrian Collisions - Lights",
                        text: "Lights"
                    }, {
                        meta_tag: 325,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Pedestrian Collisions - Brakes",
                        text: "Brakes"
                    }, {
                        meta_tag: 325,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Pedestrian Collisions - Other Equipment",
                        text: "Other Equipment"
                    }, {
                        meta_tag: 325,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Pedestrian Collisions - Other Hazardous Violation",
                        text: "Other Hazardous Violation"
                    }, {
                        meta_tag: 325,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Pedestrian Collisions - Other Than Driver (or Pedestrian)",
                        text: "Other Than Driver (or Pedestrian)"
                    }, {
                        meta_tag: 325,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Pedestrian Collisions - Unsafe Starting or Backing",
                        text: "Unsafe Starting or Backing"
                    }, {
                        meta_tag: 325,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Pedestrian Collisions - Other Improper Driving",
                        text: "Other Improper Driving"
                    }, {
                        meta_tag: 325,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Pedestrian Collisions - Pedestrian Under the Influence of Drugs/Alcohol",
                        text: "Pedestrian or Other Under the Influence of Drugs/Alcohol"
                    }, {
                        meta_tag: 325,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Pedestrian Collisions - Fell Asleep",
                        text: "Fell Asleep"
                    }, {
                        meta_tag: 325,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Pedestrian Collisions - PCF Violation Unknown",
                        text: "Unknown"
                    }, {
                        meta_tag: 325,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Pedestrian Collisions - PCF Not Stated",
                        text: "Not Stated"
                    }, ]
                }, {
                    meta_tag: 328,
                    text: 'Hit and Run',
                    icon: "resources/images/icons/card.png",
                    children: [{
                        meta_tag: 328,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Pedestrian Collisions - Felony Hit and Run",
                        text: "Felony"
                    }, {
                        meta_tag: 328,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Pedestrian Collisions - Misdemeanor Hit and Run",
                        text: "Misdemeanor"
                    }, {
                        meta_tag: 328,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Pedestrian Collisions - Not a Hit and Run",
                        text: "Not Hit and Run"
                    }, ]
                }, {
                    meta_tag: 343,
                    text: 'Alcohol Involved',
                    icon: "resources/images/icons/bottle3.png",
                    children: [{
                        meta_tag: 343,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Pedestrian Collisions - Alcohol Involved",
                        text: "Yes"
                    }, ]
                }, ]
            }, {
                text: 'Parties',
                icon: "resources/images/icons/party.png",
                children: [{
                    text: 'Vehicle',
                    icon: "resources/images/icons/family.png",
                    children: [{
                        meta_tag: 363,
                        text: 'At Fault',
                        icon: "resources/images/icons/index.png",
                        children: [{
                            meta_tag: 363,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Pedestrian Collisions - Driver Party at Fault",
                            text: "Yes"
                        }, ],
                    }, {
                        meta_tag: 364,
                        text: 'Gender',
                        icon: "resources/images/icons/man19.png",
                        children: [{
                            meta_tag: 364,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Pedestrian Collisions - Driver Party Male",
                            text: "Male"
                        }, {
                            meta_tag: 364,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Pedestrian Collisions - Driver Party Female",
                            text: "Female"
                        }, {
                            meta_tag: 364,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Pedestrian Collisions - Driver Party Gender Not Stated",
                            text: "Not Stated"
                        }, ],
                    }, {
                        meta_tag: 365,
                        text: 'Age',
                        icon: "resources/images/icons/mother1.png",
                        children: [{
                            meta_tag: 365,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Pedestrian Collisions - Driver Party Age 13 to 17",
                            text: "13 to 17"
                        }, {
                            meta_tag: 365,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Pedestrian Collisions - Driver Party Age 18 to 24",
                            text: "18 to 24"
                        }, {
                            meta_tag: 365,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Pedestrian Collisions - Driver Party Age 25 to 34",
                            text: "25 to 34"
                        }, {
                            meta_tag: 365,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Pedestrian Collisions - Driver Party Age 35 to 44",
                            text: "35 to 44"
                        }, {
                            meta_tag: 365,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Pedestrian Collisions - Driver Party Age 45 to 54",
                            text: "45 to 54"
                        }, {
                            meta_tag: 365,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Pedestrian Collisions - Driver Party Age 55 to 64",
                            text: "55 to 64"
                        }, {
                            meta_tag: 365,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Pedestrian Collisions - Driver Party Age 65 Plus",
                            text: "65 Plus"
                        }, {
                            meta_tag: 365,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Pedestrian Collisions - Driver Party Age Unknown",
                            text: "Unknown"
                        }, ],
                    }, {
                        meta_tag: 383,
                        text: 'Movement Preceding Collision',
                        icon: "resources/images/icons/synchronize2.png",
                        children: [{
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Pedestrian Collisions - Driver Movement Preceding Collision Stopped",
                            text: "Stopped"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Pedestrian Collisions - Driver Movement Preceding Collision Straight",
                            text: "Proceeding Straight"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Pedestrian Collisions - Driver Movement Preceding Collision Ran Off Road",
                            text: "Ran Off Road"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Pedestrian Collisions - Driver Movement Preceding Collision Making Right Turn",
                            text: "Making Right Turn"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Pedestrian Collisions - Driver Movement Preceding Collision Making Left",
                            text: "Making Left Turn"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Pedestrian Collisions - Driver Movement Preceding Collision Making U Turn",
                            text: "Making U-Turn"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Pedestrian Collisions - Driver Movement Preceding Collision Backing",
                            text: "Backing"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Pedestrian Collisions - Driver Movement Preceding Collision Slowing",
                            text: "Slowing/Stopping"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Pedestrian Collisions - Driver Movement Preceding Collision Passing",
                            text: "Passing Other Vehicle"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Pedestrian Collisions - Driver Movement Preceding Collision Lane Change",
                            text: "Changing Lanes"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Pedestrian Collisions - Driver Movement Preceding Collision Parking",
                            text: "Parking Maneuver"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Pedestrian Collisions - Driver Movement Preceding Collision Entering Roadway",
                            text: "Entering Traffic"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Pedestrian Collisions - Driver Movement Preceding Collision Other Turning",
                            text: "Other Unsafe Turning"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Pedestrian Collisions - Driver Movement Preceding Collision Crossed Into Opposing Lane",
                            text: "Crossed Into Opposing Lane"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Pedestrian Collisions - Driver Movement Preceding Collision Parked",
                            text: "Parked"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Pedestrian Collisions - Driver Movement Preceding Collision Merging",
                            text: "Merging"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Pedestrian Collisions - Driver Movement Preceding Collision Wrong Way",
                            text: "Traveling Wrong Way"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Pedestrian Collisions - Driver Movement Preceding Collision Other",
                            text: "Other"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Pedestrian Collisions - Driver Movement Preceding Collision Not Stated",
                            text: "Not Stated"
                        }, ],
                    }, {
                        meta_tag: 386,
                        text: 'Statewide Vehicle Type',
                        icon: "resources/images/icons/traffic.png",
                        children: [{
                            meta_tag: 386,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Pedestrian Collisions - State Vehicle Type Passenger Car",
                            text: "Passenger Car/Station Wagon"
                        }, {
                            meta_tag: 386,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Pedestrian Collisions - State Vehicle Type Passenger Trailer",
                            text: "Passenger Car with Trailer"
                        }, {
                            meta_tag: 386,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Pedestrian Collisions - State Vehicle Type Motorcycle",
                            text: "Motorcycle/Scooter"
                        }, {
                            meta_tag: 386,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Pedestrian Collisions - State Vehicle Type Pickup",
                            text: "Pickup or Panel Truck"
                        }, {
                            meta_tag: 386,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Pedestrian Collisions - State Vehicle Type Pickup Trailer",
                            text: "Pickup or Panel Truck with Trailer"
                        }, {
                            meta_tag: 386,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Pedestrian Collisions - State Vehicle Type Truck",
                            text: "Truck or Truck Tractor"
                        }, {
                            meta_tag: 386,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Pedestrian Collisions - State Vehicle Type Truck Trailer",
                            text: "Truck of Truck Tractor with Trailer"
                        }, {
                            meta_tag: 386,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Pedestrian Collisions - State Vehicle Type School Bus",
                            text: "School Bus"
                        }, {
                            meta_tag: 386,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Pedestrian Collisions - State Vehicle Type Other Bus",
                            text: "Other Bus"
                        }, {
                            meta_tag: 386,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Pedestrian Collisions - State Vehicle Type Emergency Vehicle",
                            text: "Emergency Vehicle"
                        }, {
                            meta_tag: 386,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Pedestrian Collisions - State Vehicle Type Heavy Equipment",
                            text: "Highway Construction Equipment"
                        }, {
                            meta_tag: 386,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Pedestrian Collisions - State Vehicle Type Bicycle",
                            text: "Bicycle"
                        }, {
                            meta_tag: 386,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Pedestrian Collisions - State Vehicle Type Other Vehicle",
                            text: "Other Vehicle"
                        }, {
                            meta_tag: 386,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Pedestrian Collisions - State Vehicle Type Pedestrian",
                            text: "Pedestrian"
                        }, {
                            meta_tag: 386,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Pedestrian Collisions - State Vehicle Type Moped",
                            text: "Moped"
                        }, {
                            meta_tag: 386,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Pedestrian Collisions - State Vehicle Type Not Stated",
                            text: "Not Stated"
                        }, ],
                    }, {
                        meta_tag: 389,
                        text: 'Race',
                        icon: "resources/images/icons/people5.png",
                        children: [{
                            meta_tag: 389,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Pedestrian Collisions - Driver Party Asian",
                            text: "Asian"
                        }, {
                            meta_tag: 389,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Pedestrian Collisions - Driver Party Black",
                            text: "Black"
                        }, {
                            meta_tag: 389,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Pedestrian Collisions - Driver Party Hispanic",
                            text: "Hispanic"
                        }, {
                            meta_tag: 389,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Pedestrian Collisions - Driver Party Race Other",
                            text: "Other"
                        }, {
                            meta_tag: 389,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Pedestrian Collisions - Driver Party White",
                            text: "White"
                        }, {
                            meta_tag: 389,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Pedestrian Collisions - Driver Party Race Not Stated",
                            text: "Not Stated"
                        }, ],
                    }, {
                        meta_tag: 366,
                        text: 'Sobriety',
                        icon: "resources/images/icons/glass.png",
                        children: [{
                            meta_tag: 366,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Pedestrian Collisions - Driver Party Had Not Been Drinking",
                            text: "Had Not Been Drinking"
                        }, {
                            meta_tag: 366,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Pedestrian Collisions - Driver Party Had Been Drinking, Under the Influence",
                            text: "Had Been Drinking, Under Influence"
                        }, {
                            meta_tag: 366,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Pedestrian Collisions - Driver Party Had Been Drinking, Not Under Influence",
                            text: "Had Been Drinking, Not Under Influence"
                        }, {
                            meta_tag: 366,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Pedestrian Collisions - Driver Party Had Been Drinking, Impairment Unknown",
                            text: "Had Been Drinking, Impairment Unknown"
                        }, {
                            meta_tag: 366,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Pedestrian Collisions - Driver Party Impairment Unknown",
                            text: "Impairment Unknown"
                        }, {
                            meta_tag: 366,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Pedestrian Collisions - Driver Party Sobriety Not Applicable",
                            text: "Not Applicable"
                        }, {
                            meta_tag: 366,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Pedestrian Collisions - Driver Party Sobriety Not Stated",
                            text: "Not Stated"
                        }, ],
                    }, ],
                }, {
                    text: 'Pedestrian',
                    icon: "resources/images/icons/man.png",
                    children: [{
                        meta_tag: 363,
                        text: 'At Fault',
                        icon: "resources/images/icons/index.png",
                        children: [{
                            meta_tag: 363,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Pedestrian Collisions - Pedestrian Party at Fault",
                            text: "Yes"
                        }, ],
                    }, {
                        meta_tag: 383,
                        text: 'Movement Preceding Collision',
                        icon: "resources/images/icons/synchronize2.png",
                        children: [{
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Pedestrian Collisions - Pedestrian Party Movement Preceding Collision Stopped",
                            text: "Stopped"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Pedestrian Collisions - Pedestrian Party Movement Preceding Collision Straight",
                            text: "Proceeding Straight"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Pedestrian Collisions - Pedestrian Party Movement Preceding Collision Ran Off Road",
                            text: "Ran Off Road"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Pedestrian Collisions - Pedestrian Party Movement Preceding Collision Making Right Turn",
                            text: "Making Right Turn"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Pedestrian Collisions - Pedestrian Party Movement Preceding Collision Making Left Turn",
                            text: "Making Left Turn"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Pedestrian Collisions - Pedestrian Party Movement Preceding Collision Making U Turn",
                            text: "Making U-Turn"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Pedestrian Collisions - Pedestrian Party Movement Preceding Collision Backing",
                            text: "Backing"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Pedestrian Collisions - Pedestrian Party Movement Preceding Collision Slowing",
                            text: "Slowing/Stopping"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Pedestrian Collisions - Pedestrian Party Movement Preceding Collision Passing",
                            text: "Passing Other Vehicle"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Pedestrian Collisions - Pedestrian Party Movement Preceding Collision Changing Lanes",
                            text: "Changing Lanes"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Pedestrian Collisions - Pedestrian Party Movement Preceding Collision Parking",
                            text: "Parking Maneuver"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Pedestrian Collisions - Pedestrian Party Movement Preceding Collision Entering Roadway",
                            text: "Entering Traffic"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Pedestrian Collisions - Pedestrian Party Movement Preceding Collision Other Turning",
                            text: "Other Unsafe Turning"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Pedestrian Collisions - Pedestrian Party Movement Preceding Collision Crossed Into Opposing Lane",
                            text: "Crossed Into Opposing Lane"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Pedestrian Collisions - Pedestrian Party Movement Preceding Collision Parked",
                            text: "Parked"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Pedestrian Collisions - Pedestrian Party Movement Preceding Collision Merging",
                            text: "Merging"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Pedestrian Collisions - Pedestrian Party Movement Preceding Collision Wrong Way",
                            text: "Traveling Wrong Way"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Pedestrian Collisions - Pedestrian Party Movement Preceding Collision Other",
                            text: "Other"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Pedestrian Collisions - Pedestrian Party Movement Preceding Collision Not Stated",
                            text: "Not Stated"
                        }, ],
                    }, {
                        meta_tag: 389,
                        text: 'Race',
                        icon: "resources/images/icons/people5.png",
                        children: [{
                            meta_tag: 389,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Pedestrian Collisions - Pedestrian Party Asian",
                            text: "Asian"
                        }, {
                            meta_tag: 389,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Pedestrian Collisions - Pedestrian Party Black",
                            text: "Black"
                        }, {
                            meta_tag: 389,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Pedestrian Collisions - Pedestrian Party Hispanic",
                            text: "Hispanic"
                        }, {
                            meta_tag: 389,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Pedestrian Collisions - Pedestrian Party Other Race",
                            text: "Other"
                        }, {
                            meta_tag: 389,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Pedestrian Collisions - Pedestrian Party White",
                            text: "White"
                        }, {
                            meta_tag: 389,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Pedestrian Collisions - Pedestrian Party Race Not Stated",
                            text: "Not Stated"
                        }, ],
                    }, {
                        meta_tag: 366,
                        text: 'Sobriety',
                        icon: "resources/images/icons/glass.png",
                        children: [{
                            meta_tag: 366,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Pedestrian Collisions - Pedestrian Party Had Not Been Drinking",
                            text: "Had Not Been Drinking"
                        }, {
                            meta_tag: 366,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Pedestrian Collisions - Pedestrian Party Had Been Drinking, Under the Influence",
                            text: "Had Been Drinking, Under Influence"
                        }, {
                            meta_tag: 366,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Pedestrian Collisions - Pedestrian Party Had Been Drinking, Not Under Influence",
                            text: "Had Been Drinking, Not Under Influence"
                        }, {
                            meta_tag: 366,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Pedestrian Collisions - Pedestrian Party Had Been Drinking, Impairment Unknown",
                            text: "Had Been Drinking, Impairment Unknown"
                        }, {
                            meta_tag: 366,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Pedestrian Collisions - Pedestrian Party Impairment Unknown",
                            text: "Impairment Unknown"
                        }, {
                            meta_tag: 366,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Pedestrian Collisions - Pedestrian Party Sobriety Not Applicable",
                            text: "Not Applicable"
                        }, {
                            meta_tag: 366,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Pedestrian Collisions - Pedestrian Party Sobriety Not Stated",
                            text: "Not Stated"
                        }, ],
                    }, ],
                }, ]
            }, {
                text: 'Pedestrian Victims',
                icon: "resources/images/icons/victim.png",
                children: [{
                    meta_tag: 397,
                    text: 'Gender',
                    icon: "resources/images/icons/mother1.png",
                    children: [{
                        meta_tag: 397,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Pedestrian Collisions - Pedestrian Victim Male",
                        text: "Male"
                    }, {
                        meta_tag: 397,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Pedestrian Collisions - Pedestrian Victim Female",
                        text: "Female"
                    }, {
                        meta_tag: 397,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Pedestrian Collisions - Pedestrian Victim Not Stated",
                        text: "Not Stated"
                    }, ],
                }, {
                    meta_tag: 398,
                    text: 'Age',
                    icon: "resources/images/icons/people5.png",
                    children: [{
                        meta_tag: 398,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Pedestrian Collisions - Pedestrian Victim Age 0 to 12",
                        text: "0 to 12"
                    }, {
                        meta_tag: 398,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Pedestrian Collisions - Pedestrian Victim Age 13 to 17",
                        text: "13 to 17"
                    }, {
                        meta_tag: 398,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Pedestrian Collisions - Pedestrian Victim Age 18 to 24",
                        text: "18 to 24"
                    }, {
                        meta_tag: 398,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Pedestrian Collisions - Pedestrian Victim Age 25 to 34",
                        text: "25 to 34"
                    }, {
                        meta_tag: 398,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Pedestrian Collisions - Pedestrian Victim Age 35 to 44",
                        text: "35 to 44"
                    }, {
                        meta_tag: 398,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Pedestrian Collisions - Pedestrian Victim Age 45 to 54",
                        text: "45 to 54"
                    }, {
                        meta_tag: 398,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Pedestrian Collisions - Pedestrian Victim Age 55 to 64",
                        text: "55 to 64"
                    }, {
                        meta_tag: 398,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Pedestrian Collisions - Pedestrian Victim Age 65 Plus",
                        text: "65 Plus"
                    }, {
                        meta_tag: 398,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Pedestrian Collisions - Pedestrian Victim Age Unknown",
                        text: "Unknown"
                    }, ],
                }, {
                    meta_tag: 399,
                    text: 'Degree of Injury',
                    icon: "resources/images/icons/bandage1.png",
                    children: [{
                        meta_tag: 399,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Pedestrian Collisions - Pedestrian Victim Killed",
                        text: "Killed"
                    }, {
                        meta_tag: 399,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Pedestrian Collisions - Pedestrian Victim Severely Injured",
                        text: "Severe Injury"
                    }, {
                        meta_tag: 399,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Pedestrian Collisions - Pedestrian Victim Other Visible Injury",
                        text: "Other Visible Injury"
                    }, {
                        meta_tag: 399,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Pedestrian Collisions - Pedestrian Victim Complaint of Pain",
                        text: "Complaint of Pain"
                    }, ],
                }, ]
            },
            // {
            // text:'Other', icon:"resources/images/icons/other.png", children:[
            // {meta_tag:0, nodeType:"gx_layer", layer:"Count Pedestrian Injuries by Intersection", leaf:true}
            // ]
            // },		
        ]
    }, {
        text: 'Vehicle-Bicycle SWITRS Variables (2005-2012)',
        expanded: false,
        icon: "resources/images/icons/riding.png",
        children: [{
                text: 'Collisions',
                icon: "resources/images/icons/collision.png",
                children: [{
                    meta_tag: 288,
                    text: 'Time',
                    icon: "resources/images/icons/simple14.png",
                    children: [{
                            meta_tag: 288,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Cyclist Collisions - 6am to 10am",
                            text: "6:01am to 10:00am"
                        }, {
                            meta_tag: 288,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Cyclist Collisions - 10am to 2pm",
                            text: "10:01am to 2:00pm"
                        }, {
                            meta_tag: 288,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Cyclist Collisions - 2pm to 6pm",
                            text: "2:01pm to 6:00pm"
                        }, {
                            meta_tag: 288,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Cyclist Collisions - 6pm to 10pm",
                            text: "6:01pm to 10:00pm"
                        }, {
                            meta_tag: 288,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Cyclist Collisions - 10pm to 2am",
                            text: "10:01pm to 2:00am"
                        }, {
                            meta_tag: 288,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Cyclist Collisions - 2am to 6am",
                            text: "2:01am to 6:00am"
                        },

                    ],
                }, {
                    meta_tag: 291,
                    text: 'Day of Week',
                    icon: "resources/images/icons/calendar7.png",
                    children: [{
                        meta_tag: 291,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Cyclist Collisions - Monday",
                        text: "Monday"
                    }, {
                        meta_tag: 291,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Cyclist Collisions - Tuesday",
                        text: "Tuesday"
                    }, {
                        meta_tag: 291,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Cyclist Collisions - Wednesday",
                        text: "Wednesday"
                    }, {
                        meta_tag: 291,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Cyclist Collisions - Thursday",
                        text: "Thursday"
                    }, {
                        meta_tag: 291,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Cyclist Collisions - Friday",
                        text: "Friday"
                    }, {
                        meta_tag: 291,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Cyclist Collisions - Saturday",
                        text: "Saturday"
                    }, {
                        meta_tag: 291,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Cyclist Collisions - Sunday",
                        text: "Sunday"
                    }, ]
                }, {
                    meta_tag: 287,
                    text: 'Month',
                    icon: "resources/images/icons/month2.png",
                    children: [{
                        meta_tag: 287,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Cyclist Collisions - January",
                        text: "January"
                    }, {
                        meta_tag: 287,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Cyclist Collisions - February",
                        text: "February"
                    }, {
                        meta_tag: 287,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Cyclist Collisions - March",
                        text: "March"
                    }, {
                        meta_tag: 287,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Cyclist Collisions - April",
                        text: "April"
                    }, {
                        meta_tag: 287,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Cyclist Collisions - May",
                        text: "May"
                    }, {
                        meta_tag: 287,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Cyclist Collisions - June",
                        text: "June"
                    }, {
                        meta_tag: 287,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Cyclist Collisions - July",
                        text: "July"
                    }, {
                        meta_tag: 287,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Cyclist Collisions - August",
                        text: "August"
                    }, {
                        meta_tag: 287,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Cyclist Collisions - September",
                        text: "September"
                    }, {
                        meta_tag: 287,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Cyclist Collisions - October",
                        text: "October"
                    }, {
                        meta_tag: 287,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Cyclist Collisions - November",
                        text: "November"
                    }, {
                        meta_tag: 287,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Cyclist Collisions - December",
                        text: "December"
                    }, ]
                }, {
                    meta_tag: 284,
                    text: 'Year',
                    icon: "resources/images/icons/year.png",
                    children: [{
                        meta_tag: 284,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Cyclist Collisions - 2005",
                        text: "2005"
                    }, {
                        meta_tag: 284,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Cyclist Collisions - 2006",
                        text: "2006"
                    }, {
                        meta_tag: 284,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Cyclist Collisions - 2007",
                        text: "2007"
                    }, {
                        meta_tag: 284,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Cyclist Collisions - 2008",
                        text: "2008"
                    }, {
                        meta_tag: 284,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Cyclist Collisions - 2009",
                        text: "2009"
                    }, {
                        meta_tag: 284,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Cyclist Collisions - 2010",
                        text: "2010"
                    }, {
                        meta_tag: 284,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Cyclist Collisions - 2011",
                        text: "2011"
                    },{
                        meta_tag: 284,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Cyclist Collisions - 2012",
                        text: "2012"
                    }, ]
                }, {
                    meta_tag: 306,
                    text: 'Weather',
                    icon: "resources/images/icons/weather.png",
                    children: [{
                        meta_tag: 306,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Cyclist Collisions - Clear",
                        text: "Clear"
                    }, {
                        meta_tag: 306,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Cyclist Collisions - Cloudy",
                        text: "Cloudy"
                    }, {
                        meta_tag: 306,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Cyclist Collisions - Raining",
                        text: "Raining"
                    }, {
                        meta_tag: 306,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Cyclist Collisions - Snowing",
                        text: "Snowing"
                    }, {
                        meta_tag: 306,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Cyclist Collisions - Fog",
                        text: "Fog"
                    }, {
                        meta_tag: 306,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Cyclist Collisions - Other Weather",
                        text: "Other"
                    }, {
                        meta_tag: 306,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Cyclist Collisions - Wind",
                        text: "Wind"
                    }, {
                        meta_tag: 306,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Cyclist Collisions - Weather Not Stated",
                        text: "Not Stated"
                    }, ]
                }, {
                    meta_tag: 329,
                    text: 'Type of Collision',
                    icon: "resources/images/icons/traffic1.png",
                    children: [{
                        meta_tag: 329,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Cyclist Collisions - Head-On",
                        text: "Head-On"
                    }, {
                        meta_tag: 329,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Cyclist Collisions - Sideswipe",
                        text: "Sideswipe"
                    }, {
                        meta_tag: 329,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Cyclist Collisions - Rear End",
                        text: "Rear End"
                    }, {
                        meta_tag: 329,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Cyclist Collisions - Broadside",
                        text: "Broadside"
                    }, {
                        meta_tag: 329,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Cyclist Collisions - Hit Object",
                        text: "Hit Object"
                    }, {
                        meta_tag: 329,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Cyclist Collisions - Overturned",
                        text: "Overturned"
                    }, {
                        meta_tag: 329,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Cyclist Collisions - Vehicle/Pedestrian",
                        text: "Vehicle/Pedestrian"
                    }, {
                        meta_tag: 329,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Cyclist Collisions - Other Type of Collision",
                        text: "Other"
                    }, {
                        meta_tag: 329,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Cyclist Collisions - Type of Collision Not Stated",
                        text: "Not Stated"
                    }, ]
                }, {
                    meta_tag: 325,
                    text: 'PCF Violation Category',
                    icon: "resources/images/icons/standing10.png",
                    children: [{
                        meta_tag: 325,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Cyclist Collisions - Under Influence",
                        text: "Driving or Bicycling Under the Influence of Drugs/Alcohol"
                    }, {
                        meta_tag: 325,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Cyclist Collisions - Impeding Traffic",
                        text: "Impeding Traffic"
                    }, {
                        meta_tag: 325,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Cyclist Collisions - Unsafe Speed",
                        text: "Unsafe Speed"
                    }, {
                        meta_tag: 325,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Cyclist Collisions - Following Too Closely",
                        text: "Following Too Closely"
                    }, {
                        meta_tag: 325,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Cyclist Collisions - Wrong Side of Road",
                        text: "Wrong Side of Road"
                    }, {
                        meta_tag: 325,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Cyclist Collisions - Improper Passing",
                        text: "Improper Passing"
                    }, {
                        meta_tag: 325,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Cyclist Collisions - Unsafe Lane Change",
                        text: "Unsafe Lane Change"
                    }, {
                        meta_tag: 325,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Cyclist Collisions - Improper Turning",
                        text: "Improper Turning"
                    }, {
                        meta_tag: 325,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Cyclist Collisions - Automobile Right of Way",
                        text: "Automobile Right of Way"
                    }, {
                        meta_tag: 325,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Cyclist Collisions - Pedestrian Right of Way",
                        text: "Pedestrian Right of Way"
                    }, {
                        meta_tag: 325,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Cyclist Collisions - Pedestrian Violation",
                        text: "Pedestrian Violation"
                    }, {
                        meta_tag: 325,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Cyclist Collisions - Traffic Signals and Signs",
                        text: "Traffic Signals and Signs"
                    }, {
                        meta_tag: 325,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Cyclist Collisions - Hazardous Parking",
                        text: "Hazardous Parking"
                    }, {
                        meta_tag: 325,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Cyclist Collisions - Lights",
                        text: "Lights"
                    }, {
                        meta_tag: 325,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Cyclist Collisions - Brakes",
                        text: "Brakes"
                    }, {
                        meta_tag: 325,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Cyclist Collisions - Other Equipment",
                        text: "Other Equipment"
                    }, {
                        meta_tag: 325,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Cyclist Collisions - Other Hazardous Violation",
                        text: "Other Hazardous Violation"
                    }, {
                        meta_tag: 325,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Cyclist Collisions - Other Than Driver (or Cyclist)",
                        text: "Other Than Driver (or Pedestrian)"
                    }, {
                        meta_tag: 325,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Cyclist Collisions - Unsafe Starting or Backing",
                        text: "Unsafe Starting or Backing"
                    }, {
                        meta_tag: 325,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Cyclist Collisions - Other Improper Driving",
                        text: "Other Improper Driving"
                    }, {
                        meta_tag: 325,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Cyclist Collisions - Pedestrian or Other Under the Influence of Drugs/Alcohol",
                        text: "Pedestrian or Other Under the Influence of Drugs/Alcohol"
                    }, {
                        meta_tag: 325,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Cyclist Collisions - Fell Asleep",
                        text: "Fell Asleep"
                    }, {
                        meta_tag: 325,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Cyclist Collisions - PCF Violation Unknown",
                        text: "Unknown"
                    }, {
                        meta_tag: 325,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Cyclist Collisions - PCF Violation Not Stated",
                        text: "Not Stated"
                    }, ]
                }, {
                    meta_tag: 328,
                    text: 'Hit and Run',
                    icon: "resources/images/icons/card.png",
                    children: [{
                        meta_tag: 328,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Cyclist Collisions - Felony Hit and Run",
                        text: "Felony"
                    }, {
                        meta_tag: 328,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Cyclist Collisions - Misdemeanor Hit and Run",
                        text: "Misdemeanor"
                    }, {
                        meta_tag: 328,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Cyclist Collisions - Not a Hit and Run",
                        text: "Not Hit and Run"
                    }, ]
                }, {
                    meta_tag: 343,
                    text: 'Alcohol Involved',
                    icon: "resources/images/icons/bottle3.png",
                    children: [{
                        meta_tag: 343,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Cyclist Collisions - Alcohol Involved",
                        text: "Yes"
                    }, ]
                }, ]
            }, {
                text: 'Parties',
                icon: "resources/images/icons/party.png",
                children: [{
                    text: 'Vehicle',
                    icon: "resources/images/icons/family.png",
                    children: [{
                        meta_tag: 363,
                        text: 'At Fault',
                        icon: "resources/images/icons/index.png",
                        children: [{
                            meta_tag: 363,
                            nodeType: "gx_layer",
                 
				 layer: "Vehicle-Cyclist Collisions - Driver at Fault",
                            text: "Yes"
                        }, ],
                    }, {
                        meta_tag: 364,
                        text: 'Gender',
                        icon: "resources/images/icons/man19.png",
                        children: [{
                            meta_tag: 364,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Cyclist Collisions - Driver Party Male",
                            text: "Male"
                        }, {
                            meta_tag: 364,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Cyclist Collisions - Driver Party Female",
                            text: "Female"
                        }, {
                            meta_tag: 364,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Cyclist Collisions - Driver Party Gender Not Stated",
                            text: "Not Stated"
                        }, ],
                    }, {
                        meta_tag: 365,
                        text: 'Age',
                        icon: "resources/images/icons/mother1.png",
                        children: [{
                            meta_tag: 365,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Cyclist Collisions - Driver Party Age 13 to 17",
                            text: "13 to 17"
                        }, {
                            meta_tag: 365,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Cyclist Collisions - Driver Party Age 18 to 24",
                            text: "18 to 24"
                        }, {
                            meta_tag: 365,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Cyclist Collisions - Driver Party Age 25 to 34",
                            text: "25 to 34"
                        }, {
                            meta_tag: 365,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Cyclist Collisions - Driver Party Age 35 to 44",
                            text: "35 to 44"
                        }, {
                            meta_tag: 365,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Cyclist Collisions - Driver Party Age 45 to 54",
                            text: "45 to 54"
                        }, {
                            meta_tag: 365,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Cyclist Collisions - Driver Party Age 55 to 64",
                            text: "55 to 64"
                        }, {
                            meta_tag: 365,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Cyclist Collisions - Driver Party Age 65 Plus",
                            text: "65 Plus"
                        }, {
                            meta_tag: 365,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Cyclist Collisions - Driver Party Age Unknown",
                            text: "Unknown"
                        }, ],
                    }, {
                        meta_tag: 383,
                        text: 'Movement Preceding Collision',
                        icon: "resources/images/icons/synchronize2.png",
                        children: [{
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Cyclist Collisions - Driver Party Movement Preceding Collision Stopped",
                            text: "Stopped"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Cyclist Collisions - Driver Party Movement Preceding Collision Straight",
                            text: "Proceeding Straight"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Cyclist Collisions - Driver Party Movement Preceding Collision Ran Off Road",
                            text: "Ran Off Road"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Cyclist Collisions - Driver Party Movement Preceding Collision Making Right Turn",
                            text: "Making Right Turn"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Cyclist Collisions - Driver Party Movement Preceding Collision Making Left Turn",
                            text: "Making Left Turn"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Cyclist Collisions - Driver Party Movement Preceding Collision Making U Turn",
                            text: "Making U-Turn"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Cyclist Collisions - Driver Party Movement Preceding Collision Backing",
                            text: "Backing"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Cyclist Collisions - Driver Party Movement Preceding Collision Slowing",
                            text: "Slowing/Stopping"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Cyclist Collisions - Driver Party Movement Preceding Collision Passing",
                            text: "Passing Other Vehicle"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Cyclist Collisions - Driver Party Movement Preceding Collision Lane Change",
                            text: "Changing Lanes"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Cyclist Collisions - Driver Party Movement Preceding Collision Parking",
                            text: "Parking Maneuver"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Cyclist Collisions - Driver Party Movement Preceding Collision Entering Traffic",
                            text: "Entering Traffic"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Cyclist Collisions - Driver Party Movement Preceding Collision Other Turning",
                            text: "Other Unsafe Turning"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Cyclist Collisions - Driver Party Movement Preceding Collision Crossed Into Opposing Lane",
                            text: "Crossed Into Opposing Lane"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Cyclist Collisions - Driver Party Movement Preceding Collision Parked",
                            text: "Parked"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Cyclist Collisions - Driver Party Movement Preceding Collision Merging",
                            text: "Merging"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Cyclist Collisions - Driver Party Movement Preceding Collision Wrong Way",
                            text: "Traveling Wrong Way"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Cyclist Collisions - Driver Party Movement Preceding Collision Other",
                            text: "Other"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Cyclist Collisions - Driver Party Movement Preceding Collision Not Stated",
                            text: "Not Stated"
                        }, ],
                    }, {
                        meta_tag: 386,
                        text: 'Statewide Vehicle Type',
                        icon: "resources/images/icons/traffic.png",
                        children: [{
                            meta_tag: 386,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Cyclist Collisions - State Vehicle Type Passenger Car",
                            text: "Passenger Car/Station Wagon"
                        }, {
                            meta_tag: 386,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Cyclist Collisions - State Vehicle Type Passenger Car with Trailer",
                            text: "Passenger Car with Trailer"
                        }, {
                            meta_tag: 386,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Cyclist Collisions - State Vehicle Type Motorcycle",
                            text: "Motorcycle/Scooter"
                        }, {
                            meta_tag: 386,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Cyclist Collisions - State Vehicle Type Pickup",
                            text: "Pickup or Panel Truck"
                        }, {
                            meta_tag: 386,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Cyclist Collisions - State Vehicle Type Pickup with Trailer",
                            text: "Pickup or Panel Truck with Trailer"
                        }, {
                            meta_tag: 386,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Cyclist Collisions - State Vehicle Type Truck",
                            text: "Truck or Truck Tractor"
                        }, {
                            meta_tag: 386,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Cyclist Collisions - State Vehicle Type Truck with Trailer",
                            text: "Truck or Truck Tractor with Trailer"
                        }, {
                            meta_tag: 386,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Cyclist Collisions - State Vehicle Type School Bus",
                            text: "School Bus"
                        }, {
                            meta_tag: 386,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Cyclist Collisions - State Vehicle Type Other Bus",
                            text: "Other Bus"
                        }, {
                            meta_tag: 386,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Cyclist Collisions - State Vehicle Type Emergency Equipment",
                            text: "Emergency Vehicle"
                        }, {
                            meta_tag: 386,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Cyclist Collisions - State Vehicle Type Heavy Equipment",
                            text: "Highway Construction Equipment"
                        }, {
                            meta_tag: 386,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Cyclist Collisions - State Vehicle Type Bicycle",
                            text: "Bicycle"
                        }, {
                            meta_tag: 386,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Cyclist Collisions - State Vehicle Type Other Vehicle",
                            text: "Other Vehicle"
                        }, {
                            meta_tag: 386,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Cyclist Collisions - State Vehicle Type Pedestrian",
                            text: "Pedestrian"
                        }, {
                            meta_tag: 386,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Cyclist Collisions - State Vehicle Type Moped",
                            text: "Moped"
                        }, {
                            meta_tag: 386,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Cyclist Collisions - State Vehicle Type Not Stated",
                            text: "Not Stated"
                        }, ],
                    }, {
                        meta_tag: 389,
                        text: 'Race',
                        icon: "resources/images/icons/people5.png",
                        children: [{
                            meta_tag: 389,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Cyclist Collisions - Driver Party Asian",
                            text: "Asian"
                        }, {
                            meta_tag: 389,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Cyclist Collisions - Driver Party Black",
                            text: "Black"
                        }, {
                            meta_tag: 389,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Cyclist Collisions - Driver Party Hispanic",
                            text: "Hispanic"
                        }, {
                            meta_tag: 389,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Cyclist Collisions - Driver Party Other Race",
                            text: "Other"
                        }, {
                            meta_tag: 389,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Cyclist Collisions - Driver Party White",
                            text: "White"
                        }, {
                            meta_tag: 389,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Cyclist Collisions - Driver Party Race Not Stated",
                            text: "Not Stated"
                        }, ],
                    }, {
                        meta_tag: 366,
                        text: 'Sobriety',
                        icon: "resources/images/icons/glass.png",
                        children: [{
                            meta_tag: 366,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Cyclist Collisions - Driver Party Had Not Been Drinking",
                            text: "Had Not Been Drinking"
                        }, {
                            meta_tag: 366,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Cyclist Collisions - Driver Party Had Been Drinking, Under the Influence",
                            text: "Had Been Drinking, Under Influence"
                        }, {
                            meta_tag: 366,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Cyclist Collisions - Driver Party Had Been Drinking, Not Under the Influence",
                            text: "Had Been Drinking, Not Under Influence"
                        }, {
                            meta_tag: 366,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Cyclist Collisions - Driver Party Had Been Drinking, Impairment Unknown",
                            text: "Had Been Drinking, Impairment Unknown"
                        }, {
                            meta_tag: 366,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Cyclist Collisions - Driver Party Impairment Unknown",
                            text: "Impairment Unknown"
                        }, {
                            meta_tag: 366,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Cyclist Collisions - Driver Party Sobriety Not Applicable",
                            text: "Not Applicable"
                        }, {
                            meta_tag: 366,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Cyclist Collisions - Driver Party Sobriety Not Stated",
                            text: "Not Stated"
                        }, ],
                    }, ],
                }, {
                    text: 'Bicycle',
                    icon: "resources/images/icons/riding.png",
                    children: [{
                        meta_tag: 363,
                        text: 'At Fault',
                        icon: "resources/images/icons/index.png",
                        children: [{
                            meta_tag: 363,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Cyclist Collisions - Cyclist Party at Fault",
                            text: "Yes"
                        }, ],
                    }, {
                        meta_tag: 383,
                        text: 'Movement Preceding Collision',
                        icon: "resources/images/icons/synchronize2.png",
                        children: [{
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Cyclist Collisions - Cyclist Party Movement Preceding Collision Stopped",
                            text: "Stopped"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Cyclist Collisions - Cyclist Party Movement Preceding Collision Straight",
                            text: "Proceeding Straight"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Cyclist Collisions - Cyclist Party Movement Preceding Collision Ran Off Road",
                            text: "Ran Off Road"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Cyclist Collisions - Cyclist Party Movement Preceding Collision Making Right Turn",
                            text: "Making Right Turn"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Cyclist Collisions - Cyclist Party Movement Preceding Collision Making Left Turn",
                            text: "Making Left Turn"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Cyclist Collisions - Cyclist Party Movement Preceding Collision Making U Turn",
                            text: "Making U-Turn"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Cyclist Collisions - Cyclist Party Movement Preceding Collision Backing",
                            text: "Backing"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Cyclist Collisions - Cyclist Party Movement Preceding Collision Slowing",
                            text: "Slowing/Stopping"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Cyclist Collisions - Cyclist Party Movement Preceding Collision Passing",
                            text: "Passing Other Vehicle"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Cyclist Collisions - Cyclist Party Movement Preceding Collision Changing Lanes",
                            text: "Changing Lanes"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Cyclist Collisions - Cyclist Party Movement Preceding Collision Parking",
                            text: "Parking Maneuver"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Cyclist Collisions - Cyclist Party Movement Preceding Collision Entering Roadway",
                            text: "Entering Traffic"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Cyclist Collisions - Cyclist Party Movement Preceding Collision Other Turning",
                            text: "Other Unsafe Turning"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Cyclist Collisions - Cyclist Party Movement Preceding Collision Crossed Into Opposing Lane",
                            text: "Crossed Into Opposing Lane"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Cyclist Collisions - Cyclist Party Movement Preceding Collision Parked",
                            text: "Parked"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Cyclist Collisions - Cyclist Party Movement Preceding Collision Merging",
                            text: "Merging"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Cyclist Collisions - Cyclist Party Movement Preceding Collision Wrong Way",
                            text: "Traveling Wrong Way"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Cyclist Collisions - Cyclist Party Movement Preceding Collision Other",
                            text: "Other"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Cyclist Collisions - Cyclist Party Movement Preceding Collision Not Stated",
                            text: "Not Stated"
                        }, ],
                    }, {
                        meta_tag: 389,
                        text: 'Race',
                        icon: "resources/images/icons/people5.png",
                        children: [{
                            meta_tag: 389,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Cyclist Collisions - Cyclist Party Asian",
                            text: "Asian"
                        }, {
                            meta_tag: 389,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Cyclist Collisions - Cyclist Party Black",
                            text: "Black"
                        }, {
                            meta_tag: 389,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Cyclist Collisions - Cyclist Party Hispanic",
                            text: "Hispanic"
                        }, {
                            meta_tag: 389,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Cyclist Collisions - Cyclist Party Other Race",
                            text: "Other"
                        }, {
                            meta_tag: 389,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Cyclist Collisions - Cyclist Party White",
                            text: "White"
                        }, {
                            meta_tag: 389,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Cyclist Collisions - Cyclist Party Race Not Stated",
                            text: "Not Stated"
                        }, ],
                    }, {
                        meta_tag: 366,
                        text: 'Sobriety',
                        icon: "resources/images/icons/glass.png",
                        children: [{
                            meta_tag: 366,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Cyclist Collisions - Cyclist Party Had Not Been Drinking",
                            text: "Had Not Been Drinking"
                        }, {
                            meta_tag: 366,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Cyclist Collisions - Cyclist Party Been Drinking, Under the Influence",
                            text: "Had Been Drinking, Under Influence"
                        }, {
                            meta_tag: 366,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Cyclist Collisions - Cyclist Party Been Drinking, Not Under the Influence",
                            text: "Had Been Drinking, Not Under Influence"
                        }, {
                            meta_tag: 366,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Cyclist Collisions - Cyclist Party Been Drinking, Impairment Unknown",
                            text: "Had Been Drinking, Impairment Unknown"
                        }, {
                            meta_tag: 366,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Cyclist Collisions - Cyclist Party Impairment Unknown",
                            text: "Impairment Unknown"
                        }, {
                            meta_tag: 366,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Cyclist Collisions - Cyclist Party Sobriety Not Applicable",
                            text: "Not Applicable"
                        }, {
                            meta_tag: 366,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Cyclist Collisions - Cyclist Party Sobriety Not Stated",
                            text: "Not Stated"
                        }, ],
                    }, ],
                }, ],

            }, {
                text: 'Bicycle Victims',
                icon: "resources/images/icons/victim.png",
                children: [{
                    meta_tag: 397,
                    text: 'Gender',
                    icon: "resources/images/icons/mother1.png",
                    children: [{
                        meta_tag: 397,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Cyclist Collisions - Cyclist Victim Male",
                        text: "Male"
                    }, {
                        meta_tag: 397,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Cyclist Collisions - Cyclist Victim Female",
                        text: "Female"
                    }, {
                        meta_tag: 397,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Cyclist Collisions - Cyclist Victim Not Stated",
                        text: "Not Stated"
                    }, ],
                }, {
                    meta_tag: 398,
                    text: 'Age',
                    icon: "resources/images/icons/people5.png",
                    children: [{
                        meta_tag: 398,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Cyclist Collisions - Cyclist Victim Age 0 to 12",
                        text: "0 to 12"
                    }, {
                        meta_tag: 398,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Cyclist Collisions - Cyclist Victim Age 13 to 17",
                        text: "13 to 17"
                    }, {
                        meta_tag: 398,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Cyclist Collisions - Cyclist Victim Age 18 to 24",
                        text: "18 to 24"
                    }, {
                        meta_tag: 398,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Cyclist Collisions - Cyclist Victim Age 25 to 34",
                        text: "25 to 34"
                    }, {
                        meta_tag: 398,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Cyclist Collisions - Cyclist Victim Age 35 to 44",
                        text: "35 to 44"
                    }, {
                        meta_tag: 398,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Cyclist Collisions - Cyclist Victim Age 45 to 54",
                        text: "45 to 54"
                    }, {
                        meta_tag: 398,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Cyclist Collisions - Cyclist Victim Age 55 to 64",
                        text: "55 to 64"
                    }, {
                        meta_tag: 398,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Cyclist Collisions - Cyclist Victim Age 65 Plus",
                        text: "65 Plus"
                    }, {
                        meta_tag: 398,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Cyclist Collisions - Cyclist Victim Age Unknown",
                        text: "Unknown"
                    }, ],
                }, {
                    meta_tag: 399,
                    text: 'Degree of Injury',
                    icon: "resources/images/icons/bandage1.png",
                    children: [{
                        meta_tag: 399,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Cyclist Collisions - Cyclist Victim Killed",
                        text: "Killed"
                    }, {
                        meta_tag: 399,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Cyclist Collisions - Cyclist Victim Severe",
                        text: "Severe Injury"
                    }, {
                        meta_tag: 399,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Cyclist Collisions - Cyclist Victim Visible",
                        text: "Other Visible Injury"
                    }, {
                        meta_tag: 399,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Cyclist Collisions - Cyclist Victim Complaint of Pain",
                        text: "Complaint of Pain"
                    }, ],
                }, ]
            },
            // {
            // text:'Other', icon:"resources/images/icons/other.png", children:[
            // {meta_tag:0, nodeType:"gx_layer", layer:"Count Pedestrian Injuries by Intersection", leaf:true}
            // ]
            // },		
        ]
    }, 
	   {
        text: 'Non-Highway Vehicle-Vehicle SWITRS Variables (2005-2012)',
        expanded: false,
        icon: "resources/images/icons/car172.png",
        children: [{
                text: 'Collisions',
                icon: "resources/images/icons/collision.png",
                children: [{
                    meta_tag: 288,
                    text: 'Time',
                    icon: "resources/images/icons/simple14.png",
                    children: [{
                            meta_tag: 288,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Vehicle Collisions - 6am to 10am",
                            text: "6:01am to 10:00am"
                        }, {
                            meta_tag: 288,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Vehicle Collisions - 10am to 2pm",
                            text: "10:01am to 2:00pm"
                        }, {
                            meta_tag: 288,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Vehicle Collisions - 2pm to 6pm",
                            text: "2:01pm to 6:00pm"
                        }, {
                            meta_tag: 288,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Vehicle Collisions - 6pm to 10pm",
                            text: "6:01pm to 10:00pm"
                        }, {
                            meta_tag: 288,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Vehicle Collisions - 10pm to 2am",
                            text: "10:01pm to 2:00am"
                        }, {
                            meta_tag: 288,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Vehicle Collisions - 2am to 6am",
                            text: "2:01am to 6:00am"
                        },

                    ],
                }, {
                    meta_tag: 291,
                    text: 'Day of Week',
                    icon: "resources/images/icons/calendar7.png",
                    children: [{
                        meta_tag: 291,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Vehicle Collisions - Monday",
                        text: "Monday"
                    }, {
                        meta_tag: 291,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Vehicle Collisions - Tuesday",
                        text: "Tuesday"
                    }, {
                        meta_tag: 291,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Vehicle Collisions - Wednesday",
                        text: "Wednesday"
                    }, {
                        meta_tag: 291,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Vehicle Collisions - Thursday",
                        text: "Thursday"
                    }, {
                        meta_tag: 291,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Vehicle Collisions - Friday",
                        text: "Friday"
                    }, {
                        meta_tag: 291,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Vehicle Collisions - Saturday",
                        text: "Saturday"
                    }, {
                        meta_tag: 291,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Vehicle Collisions - Sunday",
                        text: "Sunday"
                    }, ]
                }, {
                    meta_tag: 287,
                    text: 'Month',
                    icon: "resources/images/icons/month2.png",
                    children: [{
                        meta_tag: 287,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Vehicle Collisions - January",
                        text: "January"
                    }, {
                        meta_tag: 287,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Vehicle Collisions - February",
                        text: "February"
                    }, {
                        meta_tag: 287,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Vehicle Collisions - March",
                        text: "March"
                    }, {
                        meta_tag: 287,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Vehicle Collisions - April",
                        text: "April"
                    }, {
                        meta_tag: 287,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Vehicle Collisions - May",
                        text: "May"
                    }, {
                        meta_tag: 287,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Vehicle Collisions - June",
                        text: "June"
                    }, {
                        meta_tag: 287,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Vehicle Collisions - July",
                        text: "July"
                    }, {
                        meta_tag: 287,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Vehicle Collisions - August",
                        text: "August"
                    }, {
                        meta_tag: 287,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Vehicle Collisions - September",
                        text: "September"
                    }, {
                        meta_tag: 287,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Vehicle Collisions - October",
                        text: "October"
                    }, {
                        meta_tag: 287,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Vehicle Collisions - November",
                        text: "November"
                    }, {
                        meta_tag: 287,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Vehicle Collisions - December",
                        text: "December"
                    }, ]
                }, {
                    meta_tag: 284,
                    text: 'Year',
                    icon: "resources/images/icons/year.png",
                    children: [{
                        meta_tag: 284,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Vehicle Collisions - 2005",
                        text: "2005"
                    }, {
                        meta_tag: 284,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Vehicle Collisions - 2006",
                        text: "2006"
                    }, {
                        meta_tag: 284,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Vehicle Collisions - 2007",
                        text: "2007"
                    }, {
                        meta_tag: 284,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Vehicle Collisions - 2008",
                        text: "2008"
                    }, {
                        meta_tag: 284,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Vehicle Collisions - 2009",
                        text: "2009"
                    }, {
                        meta_tag: 284,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Vehicle Collisions - 2010",
                        text: "2010"
                    }, {
                        meta_tag: 284,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Vehicle Collisions - 2011",
                        text: "2011"
                    },{
                        meta_tag: 284,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Vehicle Collisions - 2012",
                        text: "2012"
                    }, ]
                }, {
                    meta_tag: 306,
                    text: 'Weather',
                    icon: "resources/images/icons/weather.png",
                    children: [{
                        meta_tag: 306,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Vehicle Collisions - Clear",
                        text: "Clear"
                    }, {
                        meta_tag: 306,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Vehicle Collisions - Cloudy",
                        text: "Cloudy"
                    }, {
                        meta_tag: 306,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Vehicle Collisions - Raining",
                        text: "Raining"
                    }, {
                        meta_tag: 306,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Vehicle Collisions - Snowing",
                        text: "Snowing"
                    }, {
                        meta_tag: 306,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Vehicle Collisions - Fog",
                        text: "Fog"
                    }, {
                        meta_tag: 306,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Vehicle Collisions - Other Weather",
                        text: "Other"
                    }, {
                        meta_tag: 306,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Vehicle Collisions - Wind",
                        text: "Wind"
                    }, {
                        meta_tag: 306,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Vehicle Collisions - Weather Not Stated",
                        text: "Not Stated"
                    }, ]
                }, {
                    meta_tag: 329,
                    text: 'Type of Collision',
                    icon: "resources/images/icons/traffic1.png",
                    children: [{
                        meta_tag: 329,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Vehicle Collisions - Head-On",
                        text: "Head-On"
                    }, {
                        meta_tag: 329,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Vehicle Collisions - Sideswipe",
                        text: "Sideswipe"
                    }, {
                        meta_tag: 329,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Vehicle Collisions - Rear End",
                        text: "Rear End"
                    }, {
                        meta_tag: 329,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Vehicle Collisions - Broadside",
                        text: "Broadside"
                    }, {
                        meta_tag: 329,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Vehicle Collisions - Hit Object",
                        text: "Hit Object"
                    }, {
                        meta_tag: 329,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Vehicle Collisions - Overturned",
                        text: "Overturned"
                    }, {
                        meta_tag: 329,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Vehicle Collisions - Vehicle/Pedestrian",
                        text: "Vehicle/Pedestrian"
                    }, {
                        meta_tag: 329,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Vehicle Collisions - Other Type of Collision",
                        text: "Other"
                    }, {
                        meta_tag: 329,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Vehicle Collisions - Type of Collision Not Stated",
                        text: "Not Stated"
                    }, ]
                }, {
                    meta_tag: 325,
                    text: 'PCF Violation Category',
                    icon: "resources/images/icons/standing10.png",
                    children: [{
                        meta_tag: 325,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Vehicle Collisions - Under Influence",
                        text: "Driving or Bicycling Under the Influence of Drugs/Alcohol"
                    }, {
                        meta_tag: 325,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Vehicle Collisions - Impeding Traffic",
                        text: "Impeding Traffic"
                    }, {
                        meta_tag: 325,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Vehicle Collisions - Unsafe Speed",
                        text: "Unsafe Speed"
                    }, {
                        meta_tag: 325,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Vehicle Collisions - Following Too Closely",
                        text: "Following Too Closely"
                    }, {
                        meta_tag: 325,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Vehicle Collisions - Wrong Side of Road",
                        text: "Wrong Side of Road"
                    }, {
                        meta_tag: 325,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Vehicle Collisions - Improper Passing",
                        text: "Improper Passing"
                    }, {
                        meta_tag: 325,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Vehicle Collisions - Unsafe Lane Change",
                        text: "Unsafe Lane Change"
                    }, {
                        meta_tag: 325,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Vehicle Collisions - Improper Turning",
                        text: "Improper Turning"
                    }, {
                        meta_tag: 325,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Vehicle Collisions - Automobile Right of Way",
                        text: "Automobile Right of Way"
                    }, {
                        meta_tag: 325,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Vehicle Collisions - Pedestrian Right of Way",
                        text: "Pedestrian Right of Way"
                    }, {
                        meta_tag: 325,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Vehicle Collisions - Pedestrian Violation",
                        text: "Pedestrian Violation"
                    }, {
                        meta_tag: 325,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Vehicle Collisions - Traffic Signals and Signs",
                        text: "Traffic Signals and Signs"
                    }, {
                        meta_tag: 325,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Vehicle Collisions - Hazardous Parking",
                        text: "Hazardous Parking"
                    }, {
                        meta_tag: 325,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Vehicle Collisions - Lights",
                        text: "Lights"
                    }, {
                        meta_tag: 325,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Vehicle Collisions - Brakes",
                        text: "Brakes"
                    }, {
                        meta_tag: 325,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Vehicle Collisions - Other Equipment",
                        text: "Other Equipment"
                    }, {
                        meta_tag: 325,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Vehicle Collisions - Other Hazardous Violation",
                        text: "Other Hazardous Violation"
                    }, {
                        meta_tag: 325,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Vehicle Collisions - Other Than Driver (or Pedestrian)",
                        text: "Other Than Driver (or Pedestrian)"
                    }, {
                        meta_tag: 325,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Vehicle Collisions - Unsafe Starting or Backing",
                        text: "Unsafe Starting or Backing"
                    }, {
                        meta_tag: 325,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Vehicle Collisions - Other Improper Driving",
                        text: "Other Improper Driving"
                    }, {
                        meta_tag: 325,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Vehicle Collisions - Pedestrian Under the Influence of Drugs/Alcohol",
                        text: "Pedestrian or Other Under the Influence of Drugs/Alcohol"
                    }, {
                        meta_tag: 325,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Vehicle Collisions - Fell Asleep",
                        text: "Fell Asleep"
                    }, {
                        meta_tag: 325,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Vehicle Collisions - PCF Violation Unknown",
                        text: "Unknown"
                    }, {
                        meta_tag: 325,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Vehicle Collisions - PCF Not Stated",
                        text: "Not Stated"
                    }, ]
                }, {
                    meta_tag: 328,
                    text: 'Hit and Run',
                    icon: "resources/images/icons/card.png",
                    children: [{
                        meta_tag: 328,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Vehicle Collisions - Felony Hit and Run",
                        text: "Felony"
                    }, {
                        meta_tag: 328,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Vehicle Collisions - Misdemeanor Hit and Run",
                        text: "Misdemeanor"
                    }, {
                        meta_tag: 328,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Vehicle Collisions - Not a Hit and Run",
                        text: "Not Hit and Run"
                    }, ]
                }, {
                    meta_tag: 343,
                    text: 'Alcohol Involved',
                    icon: "resources/images/icons/bottle3.png",
                    children: [{
                        meta_tag: 343,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Vehicle Collisions - Alcohol Involved",
                        text: "Yes"
                    }, ]
                }, ]
            }, {
                text: 'Parties',
                icon: "resources/images/icons/party.png",
                children: [{
                    text: 'Non-Injured Vehicle Party',
                    icon: "resources/images/icons/family.png",
                    children: [{
                        meta_tag: 363,
                        text: 'At Fault',
                        icon: "resources/images/icons/index.png",
                        children: [{
                            meta_tag: 363,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Vehicle Collisions - Non-Injured Vehicle Party at Fault",
                            text: "Yes"
                        }, ],
                    }, {
                        meta_tag: 364,
                        text: 'Gender',
                        icon: "resources/images/icons/man19.png",
                        children: [{
                            meta_tag: 364,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Vehicle Collisions - Non-Injured Vehicle Party Male",
                            text: "Male"
                        }, {
                            meta_tag: 364,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Vehicle Collisions - Non-Injured Vehicle Party Female",
                            text: "Female"
                        }, {
                            meta_tag: 364,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Vehicle Collisions - Non-Injured Vehicle Party Gender Not Stated",
                            text: "Not Stated"
                        }, ],
                    }, {
                        meta_tag: 365,
                        text: 'Age',
                        icon: "resources/images/icons/mother1.png",
                        children: [{
                            meta_tag: 365,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Vehicle Collisions - Non-Injured Vehicle Party Age 13 to 17",
                            text: "13 to 17"
                        }, {
                            meta_tag: 365,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Vehicle Collisions - Non-Injured Vehicle Party Age 18 to 24",
                            text: "18 to 24"
                        }, {
                            meta_tag: 365,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Vehicle Collisions - Non-Injured Vehicle Party Age 25 to 34",
                            text: "25 to 34"
                        }, {
                            meta_tag: 365,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Vehicle Collisions - Non-Injured Vehicle Party Age 35 to 44",
                            text: "35 to 44"
                        }, {
                            meta_tag: 365,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Vehicle Collisions - Non-Injured Vehicle Party Age 45 to 54",
                            text: "45 to 54"
                        }, {
                            meta_tag: 365,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Vehicle Collisions - Non-Injured Vehicle Party Age 55 to 64",
                            text: "55 to 64"
                        }, {
                            meta_tag: 365,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Vehicle Collisions - Non-Injured Vehicle Party Age 65 Plus",
                            text: "65 Plus"
                        }, {
                            meta_tag: 365,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Vehicle Collisions - Non-Injured Vehicle Party Age Unknown",
                            text: "Unknown"
                        }, ],
                    }, {
                        meta_tag: 383,
                        text: 'Movement Preceding Collision',
                        icon: "resources/images/icons/synchronize2.png",
                        children: [{
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Vehicle Collisions - Non-Injured Vehicle Movement Preceding Collision Stopped",
                            text: "Stopped"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Vehicle Collisions - Non-Injured Vehicle Movement Preceding Collision Straight",
                            text: "Proceeding Straight"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Vehicle Collisions - Non-Injured Vehicle Movement Preceding Collision Ran Off Road",
                            text: "Ran Off Road"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Vehicle Collisions - Non-Injured Vehicle Movement Preceding Collision Making Right Turn",
                            text: "Making Right Turn"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Vehicle Collisions - Non-Injured Vehicle Movement Preceding Collision Making Left",
                            text: "Making Left Turn"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Vehicle Collisions - Non-Injured Vehicle Movement Preceding Collision Making U Turn",
                            text: "Making U-Turn"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Vehicle Collisions - Non-Injured Vehicle Movement Preceding Collision Backing",
                            text: "Backing"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Vehicle Collisions - Non-Injured Vehicle Movement Preceding Collision Slowing",
                            text: "Slowing/Stopping"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Vehicle Collisions - Non-Injured Vehicle Movement Preceding Collision Passing",
                            text: "Passing Other Vehicle"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Vehicle Collisions - Non-Injured Vehicle Movement Preceding Collision Lane Change",
                            text: "Changing Lanes"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Vehicle Collisions - Non-Injured Vehicle Movement Preceding Collision Parking",
                            text: "Parking Maneuver"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Vehicle Collisions - Non-Injured Vehicle Movement Preceding Collision Entering Roadway",
                            text: "Entering Traffic"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Vehicle Collisions - Non-Injured Vehicle Movement Preceding Collision Other Turning",
                            text: "Other Unsafe Turning"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Vehicle Collisions - Non-Injured Vehicle Movement Preceding Collision Crossed Into Opposing Lane",
                            text: "Crossed Into Opposing Lane"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Vehicle Collisions - Non-Injured Vehicle Movement Preceding Collision Parked",
                            text: "Parked"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Vehicle Collisions - Non-Injured Vehicle Movement Preceding Collision Merging",
                            text: "Merging"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Vehicle Collisions - Non-Injured Vehicle Movement Preceding Collision Wrong Way",
                            text: "Traveling Wrong Way"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Vehicle Collisions - Non-Injured Vehicle Movement Preceding Collision Other",
                            text: "Other"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Vehicle Collisions - Non-Injured Vehicle Movement Preceding Collision Not Stated",
                            text: "Not Stated"
                        }, ],
                    }, {
                        meta_tag: 386,
                        text: 'Statewide Vehicle Type',
                        icon: "resources/images/icons/traffic.png",
                        children: [{
                            meta_tag: 386,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Vehicle Collisions - Non-Injured Vehicle State Vehicle Type Passenger Car",
                            text: "Passenger Car/Station Wagon"
                        }, {
                            meta_tag: 386,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Vehicle Collisions - Non-Injured Vehicle State Vehicle Type Passenger Trailer",
                            text: "Passenger Car with Trailer"
                        }, {
                            meta_tag: 386,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Vehicle Collisions - Non-Injured Vehicle State Vehicle Type Motorcycle",
                            text: "Motorcycle/Scooter"
                        }, {
                            meta_tag: 386,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Vehicle Collisions - Non-Injured Vehicle State Vehicle Type Pickup",
                            text: "Pickup or Panel Truck"
                        }, {
                            meta_tag: 386,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Vehicle Collisions - Non-Injured Vehicle State Vehicle Type Pickup Trailer",
                            text: "Pickup or Panel Truck with Trailer"
                        }, {
                            meta_tag: 386,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Vehicle Collisions - Non-Injured Vehicle State Vehicle Type Truck",
                            text: "Truck or Truck Tractor"
                        }, {
                            meta_tag: 386,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Vehicle Collisions - Non-Injured Vehicle State Vehicle Type Truck Trailer",
                            text: "Truck of Truck Tractor with Trailer"
                        }, {
                            meta_tag: 386,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Vehicle Collisions - Non-Injured Vehicle State Vehicle Type School Bus",
                            text: "School Bus"
                        }, {
                            meta_tag: 386,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Vehicle Collisions - Non-Injured Vehicle State Vehicle Type Other Bus",
                            text: "Other Bus"
                        }, {
                            meta_tag: 386,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Vehicle Collisions - Non-Injured Vehicle State Vehicle Type Emergency Vehicle",
                            text: "Emergency Vehicle"
                        }, {
                            meta_tag: 386,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Vehicle Collisions - Non-Injured Vehicle State Vehicle Type Heavy Equipment",
                            text: "Highway Construction Equipment"
                        }, {
                            meta_tag: 386,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Vehicle Collisions - Non-Injured Vehicle State Vehicle Type Bicycle",
                            text: "Bicycle"
                        }, {
                            meta_tag: 386,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Vehicle Collisions - Non-Injured Vehicle State Vehicle Type Other Vehicle",
                            text: "Other Vehicle"
                        }, {
                            meta_tag: 386,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Vehicle Collisions - Non-Injured Vehicle State Vehicle Type Pedestrian",
                            text: "Pedestrian"
                        }, {
                            meta_tag: 386,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Vehicle Collisions - Non-Injured Vehicle State Vehicle Type Moped",
                            text: "Moped"
                        }, {
                            meta_tag: 386,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Vehicle Collisions - Non-Injured Vehicle State Vehicle Type Not Stated",
                            text: "Not Stated"
                        }, ],
                    }, {
                        meta_tag: 389,
                        text: 'Race',
                        icon: "resources/images/icons/people5.png",
                        children: [{
                            meta_tag: 389,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Vehicle Collisions - Non-Injured Vehicle Party Asian",
                            text: "Asian"
                        }, {
                            meta_tag: 389,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Vehicle Collisions - Non-Injured Vehicle Party Black",
                            text: "Black"
                        }, {
                            meta_tag: 389,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Vehicle Collisions - Non-Injured Vehicle Party Hispanic",
                            text: "Hispanic"
                        }, {
                            meta_tag: 389,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Vehicle Collisions - Non-Injured Vehicle Party Race Other",
                            text: "Other"
                        }, {
                            meta_tag: 389,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Vehicle Collisions - Non-Injured Vehicle Party White",
                            text: "White"
                        }, {
                            meta_tag: 389,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Vehicle Collisions - Non-Injured Vehicle Party Race Not Stated",
                            text: "Not Stated"
                        }, ],
                    }, {
                        meta_tag: 366,
                        text: 'Sobriety',
                        icon: "resources/images/icons/glass.png",
                        children: [{
                            meta_tag: 366,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Vehicle Collisions - Non-Injured Vehicle Party Had Not Been Drinking",
                            text: "Had Not Been Drinking"
                        }, {
                            meta_tag: 366,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Vehicle Collisions - Non-Injured Vehicle Party Had Been Drinking, Under the Influence",
                            text: "Had Been Drinking, Under Influence"
                        }, {
                            meta_tag: 366,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Vehicle Collisions - Non-Injured Vehicle Party Had Been Drinking, Not Under Influence",
                            text: "Had Been Drinking, Not Under Influence"
                        }, {
                            meta_tag: 366,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Vehicle Collisions - Non-Injured Vehicle Party Had Been Drinking, Impairment Unknown",
                            text: "Had Been Drinking, Impairment Unknown"
                        }, {
                            meta_tag: 366,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Vehicle Collisions - Non-Injured Vehicle Party Impairment Unknown",
                            text: "Impairment Unknown"
                        }, {
                            meta_tag: 366,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Vehicle Collisions - Non-Injured Vehicle Party Sobriety Not Applicable",
                            text: "Not Applicable"
                        }, {
                            meta_tag: 366,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Vehicle Collisions - Non-Injured Vehicle Party Sobriety Not Stated",
                            text: "Not Stated"
                        }, ],
                    }, ],
                }, {
                    text: 'Injured Vehicle Party',
                    icon: "resources/images/icons/car97.png",
                    children: [{
                        meta_tag: 363,
                        text: 'At Fault',
                        icon: "resources/images/icons/index.png",
                        children: [{
                            meta_tag: 363,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Vehicle Collisions - Injured Vehicle Party at Fault",
                            text: "Yes"
                        }, ],
                    }, {
                        meta_tag: 383,
                        text: 'Movement Preceding Collision',
                        icon: "resources/images/icons/synchronize2.png",
                        children: [{
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Vehicle Collisions - Injured Vehicle Party Movement Preceding Collision Stopped",
                            text: "Stopped"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Vehicle Collisions - Injured Vehicle Party Movement Preceding Collision Straight",
                            text: "Proceeding Straight"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Vehicle Collisions - Injured Vehicle Party Movement Preceding Collision Ran Off Road",
                            text: "Ran Off Road"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Vehicle Collisions - Injured Vehicle Party Movement Preceding Collision Making Right Turn",
                            text: "Making Right Turn"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Vehicle Collisions - Injured Vehicle Party Movement Preceding Collision Making Left Turn",
                            text: "Making Left Turn"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Vehicle Collisions - Injured Vehicle Party Movement Preceding Collision Making U Turn",
                            text: "Making U-Turn"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Vehicle Collisions - Injured Vehicle Party Movement Preceding Collision Backing",
                            text: "Backing"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Vehicle Collisions - Injured Vehicle Party Movement Preceding Collision Slowing",
                            text: "Slowing/Stopping"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Vehicle Collisions - Injured Vehicle Party Movement Preceding Collision Passing",
                            text: "Passing Other Vehicle"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Vehicle Collisions - Injured Vehicle Party Movement Preceding Collision Changing Lanes",
                            text: "Changing Lanes"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Vehicle Collisions - Injured Vehicle Party Movement Preceding Collision Parking",
                            text: "Parking Maneuver"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Vehicle Collisions - Injured Vehicle Party Movement Preceding Collision Entering Roadway",
                            text: "Entering Traffic"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Vehicle Collisions - Injured Vehicle Party Movement Preceding Collision Other Turning",
                            text: "Other Unsafe Turning"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Vehicle Collisions - Injured Vehicle Party Movement Preceding Collision Crossed Into Opposing Lane",
                            text: "Crossed Into Opposing Lane"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Vehicle Collisions - Injured Vehicle Party Movement Preceding Collision Parked",
                            text: "Parked"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Vehicle Collisions - Injured Vehicle Party Movement Preceding Collision Merging",
                            text: "Merging"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Vehicle Collisions - Injured Vehicle Party Movement Preceding Collision Wrong Way",
                            text: "Traveling Wrong Way"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Vehicle Collisions - Injured Vehicle Party Movement Preceding Collision Other",
                            text: "Other"
                        }, {
                            meta_tag: 383,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Vehicle Collisions - Injured Vehicle Party Movement Preceding Collision Not Stated",
                            text: "Not Stated"
                        }, ],
                    }, {
                        meta_tag: 389,
                        text: 'Race',
                        icon: "resources/images/icons/people5.png",
                        children: [{
                            meta_tag: 389,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Vehicle Collisions - Injured Vehicle Party Asian",
                            text: "Asian"
                        }, {
                            meta_tag: 389,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Vehicle Collisions - Injured Vehicle Party Black",
                            text: "Black"
                        }, {
                            meta_tag: 389,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Vehicle Collisions - Injured Vehicle Party Hispanic",
                            text: "Hispanic"
                        }, {
                            meta_tag: 389,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Vehicle Collisions - Injured Vehicle Party Other Race",
                            text: "Other"
                        }, {
                            meta_tag: 389,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Vehicle Collisions - Injured Vehicle Party White",
                            text: "White"
                        }, {
                            meta_tag: 389,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Vehicle Collisions - Injured Vehicle Party Race Not Stated",
                            text: "Not Stated"
                        }, ],
                    }, {
                        meta_tag: 366,
                        text: 'Sobriety',
                        icon: "resources/images/icons/glass.png",
                        children: [{
                            meta_tag: 366,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Vehicle Collisions - Injured Vehicle Party Had Not Been Drinking",
                            text: "Had Not Been Drinking"
                        }, {
                            meta_tag: 366,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Vehicle Collisions - Injured Vehicle Party Had Been Drinking, Under the Influence",
                            text: "Had Been Drinking, Under Influence"
                        }, {
                            meta_tag: 366,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Vehicle Collisions - Injured Vehicle Party Had Been Drinking, Not Under Influence",
                            text: "Had Been Drinking, Not Under Influence"
                        }, {
                            meta_tag: 366,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Vehicle Collisions - Injured Vehicle Party Had Been Drinking, Impairment Unknown",
                            text: "Had Been Drinking, Impairment Unknown"
                        }, {
                            meta_tag: 366,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Vehicle Collisions - Injured Vehicle Party Impairment Unknown",
                            text: "Impairment Unknown"
                        }, {
                            meta_tag: 366,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Vehicle Collisions - Injured Vehicle Party Sobriety Not Applicable",
                            text: "Not Applicable"
                        }, {
                            meta_tag: 366,
                            nodeType: "gx_layer",
                            layer: "Vehicle-Vehicle Collisions - Injured Vehicle Party Sobriety Not Stated",
                            text: "Not Stated"
                        }, ],
                    }, ],
                }, ]
            }, {
                text: 'Vehicle Victims',
                icon: "resources/images/icons/victim.png",
                children: [{
                    meta_tag: 397,
                    text: 'Gender',
                    icon: "resources/images/icons/mother1.png",
                    children: [{
                        meta_tag: 397,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Vehicle Collisions - Injured Vehicle Victim Male",
                        text: "Male"
                    }, {
                        meta_tag: 397,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Vehicle Collisions - Injured Vehicle Victim Female",
                        text: "Female"
                    }, {
                        meta_tag: 397,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Vehicle Collisions - Injured Vehicle Victim Not Stated",
                        text: "Not Stated"
                    }, ],
                }, {
                    meta_tag: 398,
                    text: 'Age',
                    icon: "resources/images/icons/people5.png",
                    children: [{
                        meta_tag: 398,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Vehicle Collisions - Injured Vehicle Victim Age 0 to 12",
                        text: "0 to 12"
                    }, {
                        meta_tag: 398,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Vehicle Collisions - Injured Vehicle Victim Age 13 to 17",
                        text: "13 to 17"
                    }, {
                        meta_tag: 398,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Vehicle Collisions - Injured Vehicle Victim Age 18 to 24",
                        text: "18 to 24"
                    }, {
                        meta_tag: 398,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Vehicle Collisions - Injured Vehicle Victim Age 25 to 34",
                        text: "25 to 34"
                    }, {
                        meta_tag: 398,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Vehicle Collisions - Injured Vehicle Victim Age 35 to 44",
                        text: "35 to 44"
                    }, {
                        meta_tag: 398,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Vehicle Collisions - Injured Vehicle Victim Age 45 to 54",
                        text: "45 to 54"
                    }, {
                        meta_tag: 398,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Vehicle Collisions - Injured Vehicle Victim Age 55 to 64",
                        text: "55 to 64"
                    }, {
                        meta_tag: 398,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Vehicle Collisions - Injured Vehicle Victim Age 65 Plus",
                        text: "65 Plus"
                    }, {
                        meta_tag: 398,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Vehicle Collisions - Injured Vehicle Victim Age Unknown",
                        text: "Unknown"
                    }, ],
                }, {
                    meta_tag: 399,
                    text: 'Degree of Injury',
                    icon: "resources/images/icons/bandage1.png",
                    children: [{
                        meta_tag: 399,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Vehicle Collisions - Injured Vehicle Victim Killed",
                        text: "Killed"
                    }, {
                        meta_tag: 399,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Vehicle Collisions - Injured Vehicle Victim Severely Injured",
                        text: "Severe Injury"
                    }, {
                        meta_tag: 399,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Vehicle Collisions - Injured Vehicle Victim Other Visible Injury",
                        text: "Other Visible Injury"
                    }, {
                        meta_tag: 399,
                        nodeType: "gx_layer",
                        layer: "Vehicle-Vehicle Collisions - Injured Vehicle Victim Complaint of Pain",
                        text: "Complaint of Pain"
                    }, ],
                }, ]
            },
            // {
            // text:'Other', icon:"resources/images/icons/other.png", children:[
            // {meta_tag:0, nodeType:"gx_layer", layer:"Count Injured Vehicle Injuries by Intersection", leaf:true}
            // ]
            // },		
        ]
    }, {
        text: 'Additional Datasets',
        expanded: false,
        icon: "resources/images/icons/additional.png",
        children: [{
            text: 'Boundaries',
            icon: "resources/images/icons/location.png",
            children: [{
                    meta_tag: 0,
                    nodeType: "gx_layer",
                    layer: "6a - Neighborhoods",
                    text: "Neighborhoods"
                }, {
                    meta_tag: 0,
                    nodeType: "gx_layer",
                    layer: "6b - Supervisor Districts",
                    text: "Supervisor Districts"
                }, {
                    meta_tag: 0,
                    nodeType: "gx_layer",
                    layer: "6c - Zipcodes",
                    text: "Zipcodes"
                }, {
                    meta_tag: 0,
                    nodeType: "gx_layer",
                    layer: "6d - TAZ Districts",
                    text: "TAZ Districts"
                }, {
                    meta_tag: 0,
                    nodeType: "gx_layer",
                    layer: "6e - Police Districts",
                    text: "Police Districts"
                }, {
                    meta_tag: 0,
                    nodeType: "gx_layer",
                    layer: "6f - Census Tracts 2010",
                    text: "Census Tracts 2010"
                }, {
                    meta_tag: 0,
                    nodeType: "gx_layer",
                    layer: "6g - Census Tracts 2000",
                    text: "Census Tracts 2000"
                },

            ]
        }, {
            text: 'Locations',
            icon: "resources/images/icons/bounds.png",
            children: [{
                meta_tag: 0,
                nodeType: "gx_layer",
                layer: "x"
            }]
        }, {
            text: 'Other',
            icon: "resources/images/icons/other.png",
            children: [{
                meta_tag: 0,
                nodeType: "gx_layer",
                layer: "x",
                leaf: true
            }]
        }, ]
    }, 

];

Heron.options.layertree.tree = treeTheme;