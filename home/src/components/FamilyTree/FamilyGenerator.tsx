import React from "react";
import styles from "./FamilyGenerator.module.css";

export default function FamilyGenerator() {
  const zoomIn = () => {};
  const zoomOut = () => {};
  const resetZoom = () => {};
  const downloadTree = () => {};
  const updateFamilyJSON = () => {};

  const handleMouseDown = (event: any) => {
    console.log(event);
  };
  const handleMouseUp = (event: any) => {
    console.log(event);
  };
  const handleMouseMove = (event: any) => {
    console.log(event);
  };

  const myFunction = (event: any) => {
    console.log(event);
  };

  return (
    <>
      <div className={styles.options}>
        <button onClick={zoomIn}>zoom in (+)</button> |
        <button onClick={zoomOut}>zoom out (-)</button> |
        <button onClick={resetZoom}>reset zoom</button> |
        <button onClick={downloadTree}>download tree</button> | (click and drag
        to move)
      </div>
      <div style={{ float: "left" }}>
        <canvas
          id="tutorial"
          width="500"
          height="600"
          onDrag={(event) => myFunction(event)}
          onMouseMoveCapture={(event) => handleMouseMove(event)}
          onMouseDownCapture={(event) => handleMouseDown(event)}
          onMouseUpCapture={(event) => handleMouseUp(event)}
        ></canvas>
      </div>
      <div style={{ float: "left" }}>
        <button onClick={updateFamilyJSON} style={{ width: "100%" }}>
          re-draw tree
        </button>
        <br />
        <textarea cols={60} rows={33} id="familyJSON"></textarea>
      </div>

      <div id="hiddenImages" style={{ display: "none" }}>
        <img
          id="sourceFemale"
          crossOrigin="anonymous"
          src="https://thumbs.dreamstime.com/z/profile-icon-female-avatar-woman-portrait-casual-person-silhouette-face-flat-design-vector-47075231.jpg"
        />
        <img
          id="sourceMale"
          crossOrigin="anonymous"
          src="https://st2.depositphotos.com/1006318/5909/v/950/depositphotos_59095529-stock-illustration-profile-icon-male-avatar.jpg"
        />
      </div>
    </>
  );
}

/**
 * 
 * 
 * var rowHeight = 60;
var columnWidth = 100;
var boxHeight = 60;
var boxWidth = 60;
var canvasPadding = 30;
var zoomLevel = 1;
var translationOffsetX = 0;
var translationOffsetY = 0;
var overallTranslationOffsetX = 0;
var overallTranslationOffsetY = 0;
var clickLocationX = 0;
var clickLocationY = 0;
var lastTranslationX = 0;
var lastTranslationY = 0;
var maleColor = "#80ccff";
var femaleColor = "#ffb3d9";
var numAncestorGenerations = 1;
// var originX = 330;
// var originY = 150;
var originX = columnWidth + canvasPadding;
var originY = rowHeight * 2 + canvasPadding;
var family = {
  person: {name: "Eric Smith", gender: "Male", notes: "some note here"},
  siblings: [
    {name: "Eric Smith Jr.", gender: "Male", notes: "some note here"},
    {name: "Mary Dott Smith", gender: "Female", notes: "some note here"},
    {name: "Pauline Smith", gender: "Female", notes: "some note here"},
  ],
  families: [{
    spouse:  {name: "Rachel Eaton", gender: "Female", notes: "some note here"},
    children: [
          {name: "Richard Smith", gender: "Male", notes: "some note here"},
          {name: "Kelly Smith", gender: "Female", notes: "some note here"},
          {name: "Kristy Smith", gender: "Female", notes: "some note here"},
          {name: "Jill Smith", gender: "Female", notes: "some note here"}
    ]
  }],
  mother: {name: "Ila Thomas", gender: "Female",
          father: {name: "Ila Father", gender: "Male"},
          mother: {name: "Nora Kennedy", gender: "Female"}
          },
  father: {name: "Samuel Smith", gender: "Male",
          father: {name: "Samuel Father", gender: "Male"},
          mother: {name: "Samuel Mother", gender: "Female"}
          }
}

document.getElementById('familyJSON').value = JSON.stringify(family, null, 2);

function drawTree() {
  numAncestorGenerations = getTreeDepth(family, 0);

  adjustOriginBasedOnTreeData(numAncestorGenerations);

  var canvas = document.getElementById('tutorial');
  canvas.style.display = "inline"; // for codepen
  //document.getElementById('treeHolder').style.display = "inline"; // for family history site

  var ctx = canvas.getContext('2d');
  setCanvasDimensions(canvas, numAncestorGenerations);
  //canvas.width += 3000;

  ctx.save();
  ctx.scale(zoomLevel, zoomLevel);
  var x = overallTranslationOffsetX + translationOffsetX;
  var y = overallTranslationOffsetY + translationOffsetY;
  ctx.translate(x/zoomLevel,y/zoomLevel);
  ctx.lineWidth = 2;
  ctx.strokeStyle = "#555555";

  drawChildrenConnectors(ctx);

  drawAncestors(ctx, family, 0, 0);

  family.siblings.forEach(function (sibling, i) {
    drawSiblingConnector(ctx, originX + (boxWidth / 2), originY + (boxHeight / 2), i + 1);
  });

  if (family.families[0].spouse) {
    drawSpouseConnector(ctx, originX + (boxWidth / 2), originY + (boxHeight / 2));
  }


  // person
  drawPerson(ctx, originX, originY, 0, 0, "#777", family.person);

  // parents 
  if (family.father) {
    drawPerson(ctx, originX, originY, -1, -2, maleColor, family.father);
  }
  if (family.mother) {
    drawPerson(ctx, originX, originY, 1, -2, femaleColor, family.mother);
  }

  // siblings
  family.siblings.forEach(function (sibling, i) {
    var color = (sibling.gender === "Male") ? maleColor : femaleColor;
    drawPerson(ctx, originX, originY, i + 1, 0, color, sibling);
  });
  // spouce
  if (family.families[0].spouse) {
    drawPerson(ctx, originX, originY, -1, 0, femaleColor, family.families[0].spouse);
  }
  // children
  drawChildren(ctx);
  ctx.restore();
  checkFamilyCoordinates(family); // will be used to check click position for selecting a person
}

function checkFamilyCoordinates(aPerson) {
  if(aPerson) {
    console.log(aPerson.name);
//    console.log(aPerson.coordinates);
    if(aPerson.siblings) {
      aPerson.siblings.forEach((s) => {
        checkFamilyCoordinates(s);
        
      });
    }
    if(aPerson.families && aPerson.families[0]) {
      checkFamilyCoordinates(family.families[0].spouse);
      aPerson.families[0].children.forEach((c) => {
        checkFamilyCoordinates(c);
      });
    }
    //checkFamilyCoordinates(family.father);
    //checkFamilyCoordinates(family.mother);
  }
}

function adjustOriginBasedOnTreeData(numAncestorGenerations) {
  originX = columnWidth + canvasPadding;
  originY = (rowHeight * numAncestorGenerations) * 2 + canvasPadding;
  var childCount = family.families[0].children.length;
  var childrenPushingLeft = Math.floor(childCount / 2) - 1;
  var columnsToShiftNonNegative = Math.max(childrenPushingLeft, 0)
  originX += (columnsToShiftNonNegative * columnWidth);
}

function setCanvasDimensions(canvas, numAncestorGenerations) {
  var numSiblings = family.siblings.length;
  var numChildrenPerSide = Math.floor(family.families[0].children.length / 2);
  var leftSide = Math.max(numChildrenPerSide, 1);
  var rightSide = Math.max(numChildrenPerSide, numSiblings);
  var totalColumns = leftSide + 1 + rightSide;
  canvas.width = totalColumns * columnWidth + canvasPadding;
  canvas.height = (rowHeight * (numAncestorGenerations + 2)) * 2 + canvasPadding;
  canvas.width *= zoomLevel;
  canvas.height *= zoomLevel;
}

function drawChildren(ctx) {
  var childColumn = 0;
  family.families[0].children.forEach(function (child, i) {
    var color = (child.gender === "Male") ? maleColor : femaleColor;
    drawPerson(ctx, originX, originY, childColumn, 2, color, child);
    childColumn *= -1;
    if (childColumn <= 0) {
      childColumn -= 1;
    }
  });
}

function drawPerson(ctx, x, y, colOffset, rowOffset, fill, person) {
  drawPersonCircle(ctx, x, y, colOffset, rowOffset, fill, person);
}

function drawPersonCircle(ctx, x, y, colOffset, rowOffset, fill, person) {
  var personName = person.name;
  var gender = person.gender
  var xOffset = colOffset * columnWidth + (columnWidth / 4) + 5;
  var yOffset = rowOffset * rowHeight + (rowHeight / 2);
  ctx.beginPath();
  ctx.arc(x + xOffset, y + yOffset, rowHeight / 2, 0, Math.PI * 2, true);
  ctx.stroke();
  ctx.fillStyle = fill;
  ctx.fill();
  ctx.beginPath();
  ctx.arc(x + xOffset, y + yOffset, 24, 0, 2 * Math.PI);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.fillStyle = "white";
  ctx.font = "12px Arial";
  ctx.fillText(personName, x + xOffset - ctx.measureText(personName).width / 2 + 1, y + yOffset + (rowHeight / 2 + 12) + 1);
  ctx.fillStyle = "black";
  ctx.fillText(personName, x + xOffset - ctx.measureText(personName).width / 2, y + yOffset + (rowHeight / 2 + 12));
  ctx.stroke();
  var image = document.getElementById('source' + gender);
  //ctx.drawImage(image, x + xOffset - (boxWidth/2), y + yOffset - (boxHeight/2), boxWidth, boxHeight);
  ctx.save();
  ctx.beginPath();
  ctx.arc(x + xOffset, y + yOffset, 24, 0, 6.28, false);
  ctx.stroke();
  ctx.clip(); //call the clip method so the next render is clipped in last path
  ctx.closePath();
  ctx.drawImage(image, x + xOffset - (boxWidth / 2), y + yOffset - (boxHeight / 2), 60, 60);
  ctx.restore();
  person.coordinates = {
    "X1": xOffset - rowHeight,
    "Y1": yOffset - rowHeight,
    "X2": xOffset + rowHeight,
    "Y2": yOffset + rowHeight,
  };

}

function drawChildrenConnectors(ctx) {
  var childColumn = 0;
  family.families[0].children.forEach(function (child, i) {
    drawChildConnector(ctx, originX + (boxWidth / 2), originY + boxHeight, childColumn);
    childColumn *= -1;
    if (childColumn <= 0) {
      childColumn -= 1;
    }
  });
}

function drawChildConnector(ctx, startX, startY, spacesOver) {
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  var totalColumnWidth = spacesOver * columnWidth;
  ctx.bezierCurveTo(startX, startY + rowHeight, startX + totalColumnWidth, startY, startX + totalColumnWidth, startY + rowHeight);
  ctx.stroke();
}

function drawSiblingConnector(ctx, startX, startY, spacesOver) {
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  var totalColumnWidth = spacesOver * columnWidth;
  ctx.lineTo(startX + totalColumnWidth, startY);
  ctx.stroke();
}

function drawSpouseConnector(ctx, startX, startY) {
  ctx.save();
  ctx.beginPath();
  ctx.setLineDash([5, 5]);
  ctx.moveTo(startX, startY);
  var totalColumnWidth = -1 * columnWidth;
  ctx.lineTo(startX + totalColumnWidth, startY);
  ctx.stroke();
  ctx.restore();
}

function drawAncestors(ctx, objectWithParents, columnOffset, generationNumber) {
  if (objectWithParents.father) {
    drawAncestorConnector(ctx, columnOffset, generationNumber, columnOffset - 1, generationNumber - 1);
    dawLeftAncestorTree(ctx, objectWithParents.father, columnOffset - 1, generationNumber - 1);
    drawAncestorConnector(ctx, columnOffset, generationNumber, columnOffset + 1, generationNumber - 1);
    dawRightAncestorTree(ctx, objectWithParents.mother, columnOffset + 1, generationNumber - 1);
  }
}

function dawLeftAncestorTree(ctx, objectWithParents, columnOffset, generationNumber) {
  if (objectWithParents) {
    var generationFromTop = numAncestorGenerations + generationNumber;
    if (objectWithParents.father) {
      var endPoint = { column: columnOffset - generationFromTop, row: generationNumber - 2 };
      dawLeftAncestorTree(ctx, objectWithParents.father, endPoint.column, generationNumber - 1);
      drawAncestorConnector(ctx, columnOffset, generationNumber, endPoint.column, endPoint.row);
      drawPerson(ctx, originX, originY, endPoint.column, 2 * (endPoint.row + 1), maleColor, objectWithParents.father);
    }
    if (objectWithParents.mother) {
      var endPoint = { column: columnOffset, row: generationNumber - 1 };
      drawAncestorConnector(ctx, columnOffset, generationNumber, endPoint.column, endPoint.row);
      drawPerson(ctx, originX, originY, endPoint.column, 2 * endPoint.row, femaleColor, objectWithParents.mother);
      dawLeftAncestorTree(ctx, objectWithParents.mother, endPoint.column, generationNumber - 1 );
    }
  }
}

function dawRightAncestorTree(ctx, objectWithParents, columnOffset, generationNumber) {
  if (objectWithParents) {
    var generationFromTop = numAncestorGenerations + generationNumber;
    if (objectWithParents.father) {
      var endPoint = { column: columnOffset, row: generationNumber - 1 };
      drawAncestorConnector(ctx, columnOffset, generationNumber, endPoint.column, endPoint.row);
      drawPerson(ctx, originX, originY, endPoint.column, 2 * endPoint.row, maleColor, objectWithParents.father);
      dawRightAncestorTree(ctx, objectWithParents.father, endPoint.column, generationNumber - 1);
    }
    if (objectWithParents.mother) {
      var endPoint = { column: columnOffset + generationFromTop, row: generationNumber - 1 };
      drawAncestorConnector(ctx, columnOffset, generationNumber, endPoint.column, endPoint.row);
      drawPerson(ctx, originX, originY, endPoint.column, 2 * endPoint.row, femaleColor, objectWithParents.mother);
      dawRightAncestorTree(ctx, objectWithParents.mother, endPoint.column, generationNumber - 1);
    }
  }
}

function drawAncestorConnector(ctx, startColumn, startRow, endColumn, endRow) {
  var startX = originX + (boxWidth / 2) + (startColumn * columnWidth);
  var startY = originY + (startRow * (rowHeight + boxHeight));
  var endX = originX + (boxWidth / 2) + (endColumn * columnWidth);
  var endY = startY - rowHeight;
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  var spacesOver = endColumn - startColumn;
  var totalColumnWidth = spacesOver * columnWidth;
  ctx.bezierCurveTo(startX, startY - rowHeight, startX + totalColumnWidth, startY, endX, endY);
  ctx.stroke();
}

function getTreeDepth(objectWithParents, depth) {
  let leftDepth = depth;
  let rightDepth = depth;
  if (objectWithParents.father) {
    leftDepth = getTreeDepth(objectWithParents.father, depth + 1);
  }
  if (objectWithParents.mother) {
    rightDepth = getTreeDepth(objectWithParents.mother, depth + 1);
  }
  return Math.max(leftDepth, rightDepth);
}

function zoomIn() {
  zoomLevel += 0.1;
  zoomLevel = Math.min(2,zoomLevel);
  drawTree();
}

function zoomOut() {
  zoomLevel -= 0.1;
  zoomLevel = Math.max(0.1,zoomLevel);
  drawTree();
}

function resetZoom() {
  zoomLevel = 1;
  drawTree();
}

function handleMouseDown(event) {
  clickLocationX = event.clientX;
  clickLocationY = event.clientY;
}

function handleMouseMove(event) {
  if(event.buttons == 1) {
    translationOffsetX = event.clientX - clickLocationX;
    translationOffsetY = event.clientY - clickLocationY;
    drawTree();
  }
}

function handleMouseUp(event) {
  overallTranslationOffsetX += translationOffsetX;
  overallTranslationOffsetY += translationOffsetY;
}

function updateFamilyJSON() {
  var newTreeJSON = document.getElementById('familyJSON').value;
  family = JSON.parse(newTreeJSON);
  drawTree();
}

function downloadTree() {
  var canvas = document.getElementById('tutorial');
  var a = document.createElement('a');
  a.href = canvas.toDataURL();
  a.download = "output.png";
  var div = document.getElementById('hiddenImages');
  div.appendChild(a);
  a.click();
}

drawTree();
 */
