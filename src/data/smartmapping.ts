interface RendererParams {
    view: any;
    layer: __esri.FeatureLayer;
    field: string;
}

export async function createColorRenderer({ view, layer, field }: RendererParams) {
    const { createVisualVariable } = await import('esri/renderers/smartMapping/creators/color');
    const colorParams = {
        view,
        layer,
        field,
        theme: 'high-to-low'
    };
    const result = await createVisualVariable(colorParams);
    const { visualVariable } = result;
    const renderer = (layer.renderer as __esri.SimpleRenderer).clone();
    if (renderer.visualVariables.length) {
        renderer.visualVariables.push(visualVariable);
    } else {
        renderer.visualVariables = [visualVariable];
    }

    return { result, renderer };
}

export async function createOpacityRenderer({ view, layer, field }: RendererParams) {
    const { createVisualVariable } = await import('esri/renderers/smartMapping/creators/opacity');
    const params = {
        view,
        layer,
        field,
        theme: 'high-to-low'
    };
    const result = await createVisualVariable(params);
    const { visualVariable } = result;
    const renderer = (layer.renderer as __esri.SimpleRenderer).clone();
    if (renderer.visualVariables.length) {
        renderer.visualVariables.push(visualVariable);
    } else {
        renderer.visualVariables = [visualVariable];
    }

    return { result, renderer };
}
