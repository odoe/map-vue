import Portal from 'esri/portal/Portal';

export async function loadPortal(url: string) {
    const portal = new Portal({ url });
    return portal.load();
}

export async function loadPortalLayerItems(portal: Portal) {
    const queryParams = {
        query: `group:47dd57c9a59d458c86d3d6b978560088 AND (type:("Feature Service") -typekeywords:"Table" -typekeywords:"Multilayer")  -type:"Code Attachment" -type:"Featured Items" -type:"Symbol Set" -type:"Color Set" -type:"Windows Viewer Add In" -type:"Windows Viewer Configuration" -type:"Map Area" -typekeywords:"MapAreaPackage"`,
        num: 50,
        categories: ['/Categories/People']
    };

    return portal.queryItems(queryParams as any);
}
