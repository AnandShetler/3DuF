import ManufacturingLayer from "./manufacturingLayer";
import DepthFeatureMap from "./depthFeatureMap";

export default class CNCGenerator {
    constructor(device, viewManagerDelegate){

        this.__device = device;
        this.__viewManagerDelegate = viewManagerDelegate;

        this.__svgData = new Map();

    }

    /**
     * Generate the port layers
     */
    generatePortLayers() {
        /*
        Step 1 - Get all the layers
        Step 2 - Get all the ports in each of the layers
        Step 3 - Create a manufacturing layer
                -  Populate with the ports
         */
        // let components = this.__device.getComponents();
        let layers = this.__device.getLayers();

        let mfglayers = [];

        let isControl = false;

        for(let i in layers){
            let layer = layers[i];
            let ports = [];

            let features = layer.features;

            if(layer.name == "control"){
                isControl = true;
            }

            for(let key in features){
                let feature = features[key];
                //TODO: Include fabtype check also
                if(feature.getType() == "Port"){
                    ports.push(key);
                }
            }

            if(ports.length == 0){
                continue;
            }

            let manufacturinglayer = new ManufacturingLayer("ports_" + layer.name + "_" + i);
            // console.log("manufacturing layer :", manufacturinglayer);


            for(let fi in ports){
                let featurekey = ports[fi];
                // console.log("Key:", featurekey);
                // console.log("rendered:feature", this.__viewManagerDelegate.view.getRenderedFeature(featurekey));
                manufacturinglayer.addFeature(this.__viewManagerDelegate.view.getRenderedFeature(featurekey));
            }

            if(isControl){
                manufacturinglayer.flipX();
                isControl = false;
            }


            mfglayers.push(manufacturinglayer);
        }


        console.log("mfglayers:", mfglayers);


        let ref = this;
        mfglayers.forEach(function(mfglayer, index){
            ref.__svgData.set(mfglayer.name, mfglayer.exportToSVG());
        });

        console.log("SVG Outputs:", this.__svgData);

    }

    /**
     * Generates separate mfglayers and svgs for each of the depth layers
     */
    generateDepthLayers(){
        /*
        Step 1 - Go through each of the layers
        Step 2 - At each layer:
                   Step 2.1 - Sort each of the features based on their depths
                   Step 2.2 - Generate manufacturing layers for each of the depths

         */
        let layers = this.__device.getLayers();

        let mfglayers = [];
        let isControl = false;


        for(let i in layers) {
            let layer = layers[i];

            let features = layer.features;

            if(layer.name == "control"){
                isControl = true;
            }

            //Create the depthmap for this
            let featuredepthmap = new DepthFeatureMap(layer.name);

            for(let key in features){
                let feature = features[key];
                //TODO: Modify the port check
                if(feature.fabType == "XY" && feature.getType() != "Port"){
                    let depth = feature.getValue("height");
                    console.log("Depth of feature: ", key, depth);
                    featuredepthmap.addFeature(depth, key);
                }
            }


            //Generate Manufacturing Layers for each depth
            let manufacturinglayer;
            for(let depth of featuredepthmap.getDepths()){
                manufacturinglayer = new ManufacturingLayer(layer.name + "_" + i + "_" + depth);
                let depthfeatures = featuredepthmap.getFeaturesAtDepth(depth);
                for(let j in depthfeatures){
                    let featurekey = depthfeatures[i];


                    manufacturinglayer.addFeature(this.__viewManagerDelegate.view.getRenderedFeature(featurekey));

                }

                if(isControl){
                    manufacturinglayer.flipX();
                    isControl = false;
                }

                mfglayers.push(manufacturinglayer);

            }

        }

        console.log("XY Manufacturing Layers:", mfglayers);
        let ref = this;
        mfglayers.forEach(function(mfglayer, index){
            ref.__svgData.set(mfglayer.name, mfglayer.exportToSVG());
        });

    }

    /**
     * Generates all the edge cuts
     */
    generateEdgeLayers(){
        /*
        Step 1 - Go through each of the layers
        Step 2 - Get all the EDGE features in the drawing
        Step 3 - Generate separate SVGs
         */
        let layers = this.__device.getLayers();

        let mfglayers = [];

        let manufacturinglayer;

        let isControl = false;


        for(let i in layers) {
            let layer = layers[i];
            manufacturinglayer = new ManufacturingLayer(layer.name + "_" + i + "_EDGE");


            if(layer.name == "control"){
                isControl = true;
            }

            let features = layer.features;

            for(let key in features){
                let feature = features[key];
                //TODO: Modify the port check
                if(feature.fabType == "EDGE"){
                    console.log("EDGE Feature: ", key);
                    manufacturinglayer.addFeature(this.__viewManagerDelegate.view.getRenderedFeature(key));
                }
            }

            if(isControl){
                manufacturinglayer.flipX();
                isControl = false;
            }


            mfglayers.push(manufacturinglayer);

        }

        console.log("EDGE Manufacturing Layers:", mfglayers);

        let ref = this;
        mfglayers.forEach(function(mfglayer, index){
            ref.__svgData.set(mfglayer.name, mfglayer.exportToSVG());
        });

    }

    /**
     * Sets the device the CNCGenerator needs to work of
     * @param currentDevice
     */
    setDevice(currentDevice) {
        this.__device = currentDevice;
        console.log("Currentdevice:", currentDevice);
    }


}