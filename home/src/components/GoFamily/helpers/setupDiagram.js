
// create and initialize the Diagram.model given an array of node data representing people
function setupDiagram(diagram, array, focusId) {
  diagram.model = go.GraphObject.make(go.GraphLinksModel, {
    // declare support for link label nodes
    linkLabelKeysProperty: "labelKeys",
    // this property determines which template is used
    nodeCategoryProperty: "gender",
    // if a node data object is copied, copy its data.a Array
    copiesArrays: true,
    // create all of the nodes for people
    nodeDataArray: array,
  });
  setupMarriages(diagram);
  setupParents(diagram);

  var node = diagram.findNodeForKey(focusId);
  if (node !== null) {
    diagram.select(node);
    // remove any spouse for the person under focus:
    //node.linksConnected.each(function(l) {
    //  if (!l.isLabeledLink) return;
    //  l.opacity = 0;
    //  var spouse = l.getOtherNode(node);
    //  spouse.opacity = 0;
    //  spouse.pickable = false;
    //});
  }
}
