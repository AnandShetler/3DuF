import Template from "./template";
import paper from "paper";

export default class CellTrapL extends Template {
    constructor() {
        super();
    }

    __setupDefinitions() {
        this.__unique = {
            position: "Point"
        };

        this.__heritable = {
            chamberLength: "Float",
            feedingChannelWidth: "Float",
            rotation: "Float",
            chamberWidth: "Float",
            numberOfChambers: "Float",
            chamberSpacing: "Float",
            height: "Float"
        };

        this.__defaults = {
            chamberLength: 1.2 * 1000,
            feedingChannelWidth: 0.41 * 1000,
            rotation: 0,
            chamberWidth: 1.23 * 1000,
            numberOfChambers: 6,
            chamberSpacing: 2.46 * 1000,
            height: 250
        };

        this.__units = {
            chamberLength: "&mu;m",
            feedingChannelWidth: "&mu;m",
            rotation: "&deg;",
            chamberWidth: "&mu;m",
            numberOfChambers: "",
            chamberSpacing: "&mu;m",
            height: "&mu;m"
        };

        this.__minimum = {
            chamberLength: 30,
            feedingChannelWidth: 10,
            chamberWidth: 30,
            numberOfChambers: 1,
            chamberSpacing: 60,
            height: 10,
            rotation: 0
        };

        this.__maximum = {
            chamberLength: 6000,
            feedingChannelWidth: 2000,
            chamberWidth: 6000,
            numberOfChambers: 10,
            chamberSpacing: 12 * 1000,
            height: 1200,
            rotation: 360
        };

        this.__featureParams = {
            position: "position",
            rotation: "rotation",
            chamberWidth: "chamberWidth",
            chamberLength: "chamberLength",
            numberOfChambers: "numberOfChambers",
            chamberSpacing: "chamberSpacing",
            feedingChannelWidth: "feedingChannelWidth",
            height: "height"
        };

        this.__targetParams = {
            rotation: "rotation",
            chamberWidth: "chamberWidth",
            chamberLength: "chamberLength",
            numberOfChambers: "numberOfChambers",
            chamberSpacing: "chamberSpacing",
            feedingChannelWidth: "feedingChannelWidth",
            height: "height"
        };

        this.__placementTool = "CellPositionTool";

        this.__toolParams = {
            position: "position"
        };

        this.__renderKeys = ["FLOW", "CELL"];

        this.__mint = "LONG CELL TRAP";
    }

    render2D(params, key="FLOW") {
        if (key == "FLOW") {
            return this.__drawFlow(params);
        } else if (key == "CELL") {
            return this.__drawCell(params);
        }
    }

    render2DTarget(key, params) {
        let rotation = params["rotation"];
        let position = params["position"];
        let chamberLength = params["chamberLength"];
        let numChambers = params["numberOfChambers"];
        let chamberWidth = params["chamberWidth"];
        let feedingChannelWidth = params["feedingChannelWidth"];
        let chamberSpacing = params["chamberSpacing"];
        let color = params["color"];
        let x = position[0];
        let y = position[1];

        let chamberList = [];
        let rec;
        let traps;
        let channels;

        for (let i = 0; i < numChambers / 2; i++) {
            rec = paper.Path.Rectangle({
                size: [2 * chamberLength + feedingChannelWidth, chamberWidth],
                point: [x, y + i * (chamberWidth + chamberSpacing) + chamberSpacing],
                fillColor: color,
                strokeWidth: 0
            });
            chamberList.push(rec);
        }
        channels = paper.Path.Rectangle({
            point: [x + chamberLength, y],
            size: [feedingChannelWidth, (numChambers / 2) * (chamberWidth + chamberSpacing) + chamberSpacing],
            fillColor: color,
            strokeWidth: 0
        });
        chamberList.push(channels);
        for (let i = 0; i < numChambers / 2; i++) {
            rec = paper.Path.Rectangle({
                size: [chamberWidth, 2 * chamberLength + feedingChannelWidth],
                point: [x + i * (chamberWidth + chamberSpacing) + chamberSpacing, y],
                fillColor: color,
                strokeWidth: 0
            });
            chamberList.push(rec);
        }
        channels = paper.Path.Rectangle({
            point: [x, y + chamberLength],
            size: [(numChambers / 2) * (chamberWidth + chamberSpacing) + chamberSpacing, feedingChannelWidth],
            fillColor: color,
            strokeWidth: 0
        });
        chamberList.push(channels);
        traps = new paper.CompoundPath(chamberList);
        traps.fillColor = color;
        traps.fillColor.alpha = 0.5;
        return traps.rotate(rotation, new paper.Point(x, y));
    }

    __drawFlow(params) {
        let rotation = params["rotation"];
        let position = params["position"];
        let chamberLength = params["chamberLength"];
        let numChambers = params["numberOfChambers"];
        let chamberWidth = params["chamberWidth"];
        let feedingChannelWidth = params["feedingChannelWidth"];
        let chamberSpacing = params["chamberSpacing"];

        // console.log(orientation, position, chamberLength, numChambers, chamberWidth, feedingChannelWidth, chamberSpacing);
        let color = params["color"];
        let x = position[0];
        let y = position[1];
        let chamberList = new paper.CompoundPath();
        chamberList.fillColor = color;
        let rec;
        let traps;
        let channels;
        let startPoint = new paper.Point(x + chamberLength, y);
        channels = new paper.Path.Rectangle({
            point: startPoint,
            size: [feedingChannelWidth, (numChambers / 2) * (chamberWidth + chamberSpacing) + chamberSpacing],
            fillColor: color,
            strokeWidth: 0
        });
        chamberList.addChild(channels);
        traps = new paper.CompoundPath(chamberList);
        traps.fillColor = color;
        let center = new paper.Point(position[0], position[1]);
        return traps.rotate(rotation, center);
    }

    __drawCell(params) {
        let rotation = params["rotation"];
        let position = params["position"];
        let chamberLength = params["chamberLength"];
        let numChambers = params["numberOfChambers"];
        let chamberWidth = params["chamberWidth"];
        let feedingChannelWidth = params["feedingChannelWidth"];
        let chamberSpacing = params["chamberSpacing"];
        let color = params["color"];
        let x = position[0];
        let y = position[1];
        let chamberList = new paper.CompoundPath();
        let rec;
        for (let i = 0; i < numChambers / 2; i++) {
            let startPoint = new paper.Point(x, y + i * (chamberWidth + chamberSpacing) + chamberSpacing);
            rec = new paper.Path.Rectangle({
                size: [2 * chamberLength + feedingChannelWidth, chamberWidth],
                point: startPoint,
                fillColor: color,
                strokeWidth: 0
            });
            chamberList.addChild(rec);
        }
        chamberList.fillColor = color;
        let center = new paper.Point(x, y);
        return chamberList.rotate(rotation, center);
    }
}
