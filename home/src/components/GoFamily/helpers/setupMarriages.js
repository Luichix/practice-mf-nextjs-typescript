

// now process the node data to determine marriages
export default function setupMarriages(diagram) {
  var model = diagram.model;
  var nodeDataArray = model.nodeDataArray;
  for (var i = 0; i < nodeDataArray.length; i++) {
    var data = nodeDataArray[i];
    var key = data.key;
    var wifes = data.wife;
    if (wifes !== undefined) {
      if (typeof wifes === "number") wifes = [wifes];
      for (var j = 0; j < wifes.length; j++) {
        var wife = wifes[j];
        if (key === wife) {
          // or warn no reflexive marriages
          continue;
        }
        var link = findMarriage(diagram, key, wife);
        if (link === null) {
          // add a label node for the marriage link
          var mlab = {
            gender: "LinkLabel",
          };
          model.addNodeData(mlab);
          // add the marriage link itself, also referring to the label node
          var mdata = {
            from: key,
            to: wife,
            labelKeys: [mlab.key],
            category: "Marriage",
          };
          model.addLinkData(mdata);
        }
      }
    }
    var husbands = data.husband;
    if (husbands !== undefined) {
      if (typeof husbands === "number") husbands = [husbands];
      for (var j = 0; j < husbands.length; j++) {
        var husband = husbands[j];
        if (key === husband) {
          // or warn no reflexive marriages
          continue;
        }
        var link = findMarriage(diagram, key, husband);
        if (link === null) {
          // add a label node for the marriage link
          var mlab = {
            gender: "LinkLabel",
          };
          model.addNodeData(mlab);
          // add the marriage link itself, also referring to the label node
          var mdata = {
            from: key,
            to: husband,
            labelKeys: [mlab.key],
            category: "Marriage",
          };
          model.addLinkData(mdata);
        }
      }
    }
  }
}