import MapView from 'esri/views/MapView';
import WebMap from 'esri/WebMap';
import Layer from 'esri/layers/Layer';
import Bookmarks from 'esri/widgets/Bookmarks';
import Expand from 'esri/widgets/Expand';
import LayerList from 'esri/widgets/LayerList';
import Legend from 'esri/widgets/Legend';

import { basemap } from '../config';

export interface SmartMappingSliderParams {
    layer: __esri.Layer;
    type: string;
    rendererResult: any;
    field: string;
}

// ----------------------------------
// Public Properties
// ----------------------------------

export const webmap = new WebMap({ basemap });

export const view = new MapView({
    container: 'viewDiv',
    map: webmap,
    center: [-100, 40],
    zoom: 3
});

// add a legend widget instance to the view
// and set the style to 'card'. This is a
// responsive style, which is good for mobile devices
export const legend = new Expand({
    content: new Legend({
        view,
        style: 'card'
    }),
    view
});
view.ui.add(legend, 'bottom-left');

// user a layerlist to manage multiple layers
// being added to the map
export const layerList = new Expand({
    content: new LayerList({ view }),
    view
});
view.ui.add(layerList, 'top-right');

// add the bookmarks widget for editing
export const bookmarks = new Expand({
    content: new Bookmarks({
        view,
        editingEnabled: true
    }),
    view
});
view.ui.add(bookmarks, 'bottom-right');

// ----------------------------------
// Public methods
// ----------------------------------

/**
 * Assigns the container element to the View
 * @param container
 */
export async function initialize(container: HTMLDivElement) {
    view.container = container;
    try {
        await view.when();
        console.log('Map and View are ready');
    } catch (error) {
        console.warn('An error in creating the map occurred:', error);
    }
}

/**
 * Adds a Portal Layer Item to the map
 * @param portalItem
 */
export async function addLayerItemToMap(portalItem: __esri.PortalItem) {
    const layer = await Layer.fromPortalItem({ portalItem });
    await layer.load();
    webmap.add(layer);
    // try to zoom to layer
    goToLayer(layer);
}

/**
 * Remove a Portal Layer Item from the map
 * @param portalItem
 */
export function removeLayerItemFromMap({ id }: __esri.PortalItem) {
    const layer = webmap.layers.find(x => ((x as unknown) as __esri.PortalLayer).portalItem.id === id);
    webmap.remove(layer);
}

/**
 * Save the current WebMap with a  given title
 * @param title
 */
export async function saveWebMap(title: string) {
    // update webmap with view related information,
    // thumbnail, and bookmarks
    webmap.updateFrom(view);
    await webmap.saveAs({ title });
}

/**
 * Open the webmap id in an external application
 * @param webmapid
 */
export function openWebMapExternal() {
    window.open(`${webmap.portalItem.portal.url}/apps/mapviewer/index.html?webmap=${webmap.portalItem.id}`, '_blank');
}

// ----------------------------------
// Private methods
// ----------------------------------

function goToLayer(layer: any) {
    if (layer.type === 'feature') {
        const extent = (layer as __esri.FeatureLayer).queryExtent();
        view.goTo(extent);
    } else if (layer.fullExtent) {
        view.goTo(layer.fullExtent);
    } else if (layer.type === 'group') {
        view.goTo(((layer as unknown) as __esri.PortalLayer).portalItem.extent);
    }
}
