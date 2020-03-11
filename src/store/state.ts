export interface State {
    credential?: __esri.Credential;
    portalItems: __esri.PortalItem[];
    layers: __esri.Layer[] | __esri.FeatureLayer[] | __esri.PortalLayer[];
    webmapSaved: boolean;
    state: string;
}

export const state: State = {
    credential: null,
    portalItems: [],
    layers: [],
    webmapSaved: false,
    state: 'ready'
};
