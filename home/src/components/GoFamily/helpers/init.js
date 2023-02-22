function init() {
  var $ = go.GraphObject.make;
  myDiagram = $(go.Diagram, "familyDiagram", {
    initialAutoScale: go.Diagram.Uniform,
    "undoManager.isEnabled": true,
    maxSelectionCount: 1,
    isReadOnly: true,
    //isEnabled: false,
    allowSelect: false,
    nodeSelectionAdornmentTemplate: $(
      go.Adornment,
      "Auto",
      {
        layerName: "Grid",
      },
      $(go.Shape, "Circle", {
        fill: "yellow",
        stroke: null,
      }),
      $(go.Placeholder)
    ),
    layout: $(GenogramLayout, {
      direction: 90,
      layerSpacing: 30,
      columnSpacing: 10,
    }),
  });

  function findHeadShot(gender) {
    return gender === "M"
      ? "https://png.pngtree.com/svg/20170705/498034869c.png"
      : "https://png.pngtree.com/svg/20170705/49805b929c.png";
    //return "./images/" + gender + ".png";
  }

  // two different node templates, one for each sex,
  // named by the category value in the node data object
  // myDiagram.nodeTemplateMap.add("M",  // male
  //   $(go.Node, "Vertical",
  //     // { locationSpot: go.Spot.Center, locationObjectName: "ICON" },
  //     $(go.Panel,
  //       // { name: "ICON" },
  //       $(go.Shape, "Square",
  //         { width: 40, height: 40, strokeWidth: 2, fill: "white", portId: "" }
  //       )
  //       // $(go.Picture,
  //       //   { width: 40, height: 40, imageStretch: go.GraphObject.UniformToFill },
  //       //   new go.Binding("source", "key", findHeadShot)
  //       // )
  //     ),
  //     $(go.TextBlock,
  //       { textAlign: "center", maxSize: new go.Size(80, NaN) },
  //       new go.Binding("text", "n")
  //     )
  //   )
  // );

  myDiagram.nodeTemplateMap.add(
    "M",
    $(
      go.Node,
      "Vertical",
      {
        /* selectable: true, */
        click: function (e, obj) {
          /* console.log(obj);  */
          console.log("Clicked on " + obj.part.data.key);
          jQuery.fancybox.open({
            src: "#form1",
            type: "inline",
            opts: {
              touch: false,
              afterShow: function (instance, current) {
                console.info("done!");
              },
            },
          });
        },
        // selectionChanged: function(part) {
        //   var shape = part.elt(0);
        //   // shape.fill = part.isSelected ? "red" : "white";
        //   console.log('selectionChanged');
        //   console.log(part);
        // }
      },
      $(
        go.Panel,
        "Spot",
        $(go.Shape, "Circle", {
          width: 45,
          strokeWidth: 1,
          fill: "#aac8ff",
          portId: "",
        }),
        $(
          go.Panel,
          "Spot",
          {
            isClipping: true,
          },
          $(go.Shape, "Circle", {
            width: 40,
            strokeWidth: 0,
          }),
          $(
            go.Picture,
            {
              width: 40,
              height: 40,
              imageStretch: go.GraphObject.UniformToFill,
            },
            new go.Binding("source", "gender", findHeadShot)
          ),
          $(
            go.Panel,
            $(
              go.Shape,
              {
                stroke: null,
                strokeWidth: 0,
                fill: "gray",
              },
              new go.Binding("geometry", "", function () {
                return go.Geometry.parse("F M38 0 L40 0 40 2 2 40 0 40 0 38z");
              })
            ),
            new go.Binding("visible", "", function (data) {
              return data.dead === true;
            })
          )
        ),
        new go.Binding("opacity", "", function (data) {
          return data.dead === true ? 0.2 : 1;
        })
      ),
      $(
        go.TextBlock,
        {
          textAlign: "center",
          maxSize: new go.Size(80, NaN),
          margin: new go.Margin(5, 0, 0, 0),
        },
        new go.Binding("text", "name")
      ),
      $(
        go.TextBlock,
        {
          maxSize: new go.Size(80, NaN),
          margin: new go.Margin(5, 0, 0, 0),
        },
        new go.Binding("text", "birthday")
      ),
      $(
        go.TextBlock,
        {
          maxSize: new go.Size(80, NaN),
          margin: new go.Margin(5, 0, 0, 0),
        },
        new go.Binding("text", "title"),
        new go.Binding("visible", "", function (data) {
          return data.title !== undefined;
        })
      )
    )
  );

  // myDiagram.nodeTemplateMap.add("F", // female
  //   $(go.Node, "Vertical", {
  //       locationSpot: go.Spot.Center,
  //       locationObjectName: "ICON"
  //     },
  //     $(go.Panel, {
  //         name: "ICON"
  //       },
  //       $(go.Shape, "Circle", {
  //         width: 40,
  //         height: 40,
  //         strokeWidth: 2,
  //         fill: "white",
  //         portId: ""
  //       })
  //     ),
  //     $(go.TextBlock, {
  //         textAlign: "center",
  //         maxSize: new go.Size(80, NaN)
  //       },
  //       new go.Binding("text", "name")
  //     )
  //   )
  // );

  myDiagram.nodeTemplateMap.add(
    "F",
    $(
      go.Node,
      "Vertical",
      {
        click: function (e, obj) {
          /* console.log(obj);  */
          console.log("Clicked on " + obj.part.data.key);
          jQuery.fancybox.open({
            src: "#form1",
            type: "inline",
            opts: {
              touch: false,
              afterShow: function (instance, current) {
                console.info("done!");
              },
            },
          });
        },
        // selectionChanged: function(part) {
        //   var shape = part.elt(0);
        //   // shape.fill = part.isSelected ? "red" : "white";
        //   console.log('selectionChanged');
        //   console.log(part);
        // }
      },
      $(
        go.Panel,
        "Spot",
        $(go.Shape, "Circle", {
          width: 45,
          strokeWidth: 1,
          fill: "#ffaaca",
          portId: "",
        }),
        $(
          go.Panel,
          "Spot",
          {
            isClipping: true,
          },
          $(go.Shape, "Circle", {
            width: 40,
            strokeWidth: 0,
          }),
          $(
            go.Picture,
            {
              width: 40,
              height: 40,
              imageStretch: go.GraphObject.UniformToFill,
            },
            new go.Binding("source", "gender", findHeadShot)
          ),
          $(
            go.Panel,
            $(
              go.Shape,
              {
                stroke: null,
                strokeWidth: 0,
                fill: "gray",
              },
              new go.Binding("geometry", "", function () {
                return go.Geometry.parse("F M38 0 L40 0 40 2 2 40 0 40 0 38z");
              })
            ),
            new go.Binding("visible", "", function (data) {
              return data.dead === true;
            })
          )
        ),
        new go.Binding("opacity", "", function (data) {
          return data.dead === true ? 0.2 : 1;
        })
      ),
      $(
        go.TextBlock,
        {
          textAlign: "center",
          maxSize: new go.Size(80, NaN),
          margin: new go.Margin(5, 0, 0, 0),
        },
        new go.Binding("text", "name")
      ),
      $(
        go.TextBlock,
        {
          maxSize: new go.Size(80, NaN),
          margin: new go.Margin(5, 0, 0, 0),
        },
        new go.Binding("text", "birthday")
      ),
      $(
        go.TextBlock,
        {
          maxSize: new go.Size(80, NaN),
          margin: new go.Margin(5, 0, 0, 0),
        },
        new go.Binding("text", "title"),
        new go.Binding("visible", "", function (data) {
          return data.title !== undefined;
        })
      )
    )
  );

  // the representation of each label node -- nothing shows on a Marriage Link
  myDiagram.nodeTemplateMap.add(
    "LinkLabel",
    $(go.Node, {
      selectable: false,
      width: 1,
      height: 1,
      fromEndSegmentLength: 20,
    })
  );

  // for parent-child relationships
  myDiagram.linkTemplate = $(
    go.Link,
    {
      routing: go.Link.Orthogonal,
      curviness: 15,
      layerName: "Background",
      selectable: false,
      fromSpot: go.Spot.Bottom,
      toSpot: go.Spot.Top,
    },
    $(go.Shape, {
      strokeWidth: 2,
    })
  );

  // for marriage relationships
  myDiagram.linkTemplateMap.add(
    "Marriage",
    $(
      go.Link,
      {
        selectable: false,
      },
      $(go.Shape, {
        strokeWidth: 2,
        stroke: "blue",
      })
    )
  );

  setupDiagram(
    myDiagram,
    [
      {
        key: 0,
        name: "陳俊德",
        birthday: "2000-01-01",
        gender: "M",
        father: -10,
        //mother: -11,
        wife: 1,
        title: "本人",
      },
      {
        key: 1,
        name: "Alice",
        birthday: "2000-01-01",
        gender: "F",
        father: -12,
        mother: -13,
        title: "妻子",
      },
      {
        key: 2,
        name: "陳中啟",
        birthday: "2000-01-01",
        gender: "M",
        father: 1,
        mother: 0,
        wife: 3,
        title: "兒子",
      },
      {
        key: 3,
        name: "Barbara",
        birthday: "2000-01-01",
        gender: "F",
      },
      {
        key: 4,
        name: "陳凱諭",
        birthday: "2000-01-01",
        gender: "M",
        father: 1,
        mother: 0,
        wife: 5,
        title: "兒子",
      },
      {
        key: 5,
        name: "Brooke",
        birthday: "2000-01-01",
        gender: "F",
        title: "兒媳",
      },
      // {
      //     key: 6,
      //     name: "陳伊菁",
      //     birthday: '2000-01-01',
      //     gender: "F",
      //     father: 1,
      //     mother: 0,
      //     title: '女兒'
      // },
      {
        key: 7,
        name: "陳芝慧",
        birthday: "2000-01-01",
        gender: "F",
        father: 1,
        mother: 0,
        title: "女兒",
      },
      {
        key: 8,
        name: "陳潔音",
        birthday: "2000-01-01",
        gender: "F",
        father: 1,
        mother: 0,
        husband: 9,
        title: "女兒",
      },
      {
        key: 9,
        name: "Chris",
        birthday: "2000-01-01",
        gender: "M",
        title: "女婿",
      },
      {
        key: 10,
        name: "Ellie",
        birthday: "2000-01-01",
        gender: "F",
        father: 3,
        mother: 2,
      },
      {
        key: 11,
        name: "Dan",
        birthday: "2000-01-01",
        gender: "M",
        father: 3,
        mother: 2,
      },
      {
        key: 12,
        name: "Elizabeth",
        birthday: "2000-01-01",
        gender: "F",
        husband: 13,
      },
      {
        key: 13,
        name: "David",
        birthday: "2000-01-01",
        gender: "M",
        father: 5,
        mother: 4,
      },
      {
        key: 14,
        name: "Emma",
        birthday: "2000-01-01",
        gender: "F",
        father: 5,
        mother: 4,
      },
      {
        key: 15,
        name: "Evan",
        birthday: "2000-01-01",
        gender: "M",
        father: 8,
        mother: 9,
      },
      {
        key: 16,
        name: "Ethan",
        birthday: "2000-01-01",
        gender: "M",
        father: 8,
        mother: 9,
      },
      {
        key: 17,
        name: "Eve",
        birthday: "2000-01-01",
        gender: "F",
        husband: 16,
      },
      {
        key: 18,
        name: "Emily",
        birthday: "2000-01-01",
        gender: "F",
        father: 8,
        mother: 9,
      },
      {
        key: 19,
        name: "Fred",
        birthday: "2000-01-01",
        gender: "M",
        father: 17,
        mother: 16,
      },
      {
        key: 20,
        name: "Faith",
        birthday: "2000-01-01",
        gender: "F",
        father: 17,
        mother: 16,
      },
      {
        key: 21,
        name: "Felicia",
        birthday: "2000-01-01",
        gender: "F",
        father: 12,
        mother: 13,
      },
      {
        key: 22,
        name: "Frank",
        birthday: "2000-01-01",
        gender: "M",
        father: 12,
        mother: 13,
      },
      {
        key: 10000,
        name: "aaaaaaaa1",
        birthday: "2000-01-01",
        gender: "M",
        // father: 12,
        // mother: 13
      },
      {
        key: 10001,
        name: "aaaaaaaa2",
        birthday: "2000-01-01",
        gender: "M",
        // father: 12,
        // mother: 13
      },
      {
        key: 10002,
        name: "aaaaaaaa3",
        birthday: "2000-01-01",
        gender: "M",
        // father: 12,
        // mother: 13
      },
      {
        key: 10003,
        name: "aaaaaaaa4",
        birthday: "2000-01-01",
        gender: "M",
        // father: 12,
        // mother: 13
      },
      {
        key: 10004,
        name: "aaaaaaaa5",
        birthday: "2000-01-01",
        gender: "M",
        // father: 12,
        // mother: 13
      },

      // "Aaron"'s ancestors
      {
        key: -10,
        name: "Paternal Grandfather",
        birthday: "2000-01-01",
        gender: "M",
        father: -33,
        mother: -32,
        //wife: -11
      },
      {
        key: -11,
        name: "Paternal Grandmother",
        birthday: "2000-01-01",
        gender: "F",
      },
      {
        key: -32,
        name: "Paternal Great",
        birthday: "2000-01-01",
        gender: "M",
        wife: -33,
        dead: true,
      },
      {
        key: -33,
        name: "Paternal Great",
        birthday: "2000-01-01",
        gender: "F",
      },
      /* {
                        key: -40,
                        name: "Great Uncle",
                        birthday: '2000-01-01',
                        gender: "M",
                        father: -33,
                        mother: -32
                    },
                    {
                        key: -41,
                        name: "Great Aunt",
                        birthday: '2000-01-01',
                        gender: "F",
                        father: -33,
                        mother: -32
                    },
                    {
                        key: -20,
                        name: "陳岳谷",
                        birthday: '2000-01-01',
                        gender: "M",
                        father: -11,
                        mother: -10,
                        title: '兄弟'
                    }, */

      // "Alice"'s ancestors
      {
        key: -12,
        name: "Maternal Grandfather",
        birthday: "2000-01-01",
        gender: "M",
        wife: -13,
      },
      {
        key: -13,
        name: "Maternal Grandmother",
        birthday: "2000-01-01",
        gender: "F",
        father: -31,
        mother: -30,
      },
      /* {
                        key: -21,
                        name: "Aunt",
                        birthday: '2000-01-01',
                        gender: "F",
                        father: -13,
                        mother: -12
                    },
                    {
                        key: -22,
                        name: "Uncle",
                        birthday: '2000-01-01',
                        gender: "M",
                        wife: -21
                    },
                    {
                        key: -23,
                        name: "Cousin",
                        birthday: '2000-01-01',
                        gender: "M",
                        father: -21,
                        mother: -22
                    }, */
      {
        key: -30,
        name: "Maternal Great",
        birthday: "2000-01-01",
        gender: "M",
        wife: -31,
      },
      {
        key: -31,
        name: "Maternal Great",
        birthday: "2000-01-01",
        gender: "F",
        father: -50,
        // mother: -51
      },
      /* {
                        key: -42,
                        name: "Great Uncle",
                        birthday: '2000-01-01',
                        gender: "M",
                        father: -30,
                        mother: -31
                    },
                    {
                        key: -43,
                        name: "Great Aunt",
                        birthday: '2000-01-01',
                        gender: "F",
                        father: -30,
                        mother: -31
                    }, */
      {
        key: -50,
        name: "Maternal Great Great",
        birthday: "2000-01-01",
        gender: "M",
        // wife: -51
      },
      // {
      //   key: -51,
      //   name: "Maternal Great Great",
      //   birthday: '2000-01-01',
      //   gender: "F"
      // }
    ],
    0 /* focus on this person */
  );
}
