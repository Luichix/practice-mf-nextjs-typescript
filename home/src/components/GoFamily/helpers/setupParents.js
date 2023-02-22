export default 

// process parent-child relationships once all marriages are known
function setupParents(diagram) {
  var model = diagram.model;
  var nodeDataArray = model.nodeDataArray;
  for (var i = 0; i < nodeDataArray.length; i++) {
    var data = nodeDataArray[i];
    var key = data.key;
    var mother = data.mother;
    var father = data.father;
    // if (mother !== undefined && father !== undefined) {
    //   var link = findMarriage(diagram, mother, father);
    //   if (link === null) {
    //     // or warn no known mother or no known father or no known marriage between them
    //     if (window.console) window.console.log("unknown marriage: " + mother + " & " + father);
    //     continue;
    //   }
    //   var mdata = link.data;
    //   var mlabkey = mdata.labelKeys[0];
    //   var cdata = {
    //     from: mlabkey,
    //     to: key
    //   };
    //   myDiagram.model.addLinkData(cdata);
    // }
    if (father !== undefined && mother !== undefined) {
      var link = findMarriage(diagram, mother, father);
      if (link !== null) {
        var mdata = link.data;
        var mlabkey = mdata.labelKeys[0];
        var cdata = {
          from: mlabkey,
          to: key,
        };
        myDiagram.model.addLinkData(cdata);
        continue;
      }
    }
    if (father !== undefined) {
      myDiagram.model.addLinkData({
        from: father,
        to: key,
      });
    }
    if (mother !== undefined) {
      myDiagram.model.addLinkData({
        from: mother,
        to: key,
      });
    }
  }
}
