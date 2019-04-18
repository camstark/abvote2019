  //layout the riding positions for the hex map
  var mapdata = [
      '..', '..', '..', '..', '..', '..', '..', '..', '..', '..',
      '..', '..', '55', '77', '49', '70', '61', '60', '..', '..',
      '..', '..', '64', '63', '67', '75', '62', '51', '..', '..',
      '..', '87', '82', '83', '28', '30', '35', '86', '..', '..',
      '..', '..', '45', '39', '32', '29', '27', '81', '..', '..',
      '..', '..', '36', '40', '44', '33', '34', '..', '..', '..',
      '..', '..', '46', '41', '38', '31', '37', '84', '..', '..',
      '..', '..', '43', '42', '69', '74', '68', '53', '..', '..',
      '..', '..', '..', '80', '58', '78', '79', '59', '..', '..',
      '..', '..', '50', '47', '48', '76', '66', '..', '..', '..',
      '..', '..', '..', '21', '12', '19', '20', '56', '..', '..',
      '..', '..', '..', '25', '08', '02', '17', '65', '..', '..',
      '..', '..', '..', '03', '18', '15', '10', '05', '..', '..',
      '..', '..', '..', '26', '06', '04', '07', '54', '..', '..',
      '..', '..', '..', '..', '13', '09', '01', '72', '..', '..',
      '..', '..', '..', '..', '16', '11', '22', '71', '..', '..',
      '..', '..', '..', '..', '..', '23', '24', '14', '52', '..',
      '..', '..', '..', '..', '..', '73', '85', '57', '..', '..',
      '..', '..', '..', '..', '..', '..', '..', '..', '..', '..',
      '..', '..', '..', '..', '..', '..', '..', '..', '..', '..',
  ];

  // Check to see if there are duplicates or missing ridings
  // function removeEllipse(ed) {
  //     return ed != '..';
  // }
  // var dataCheck = mapdata.filter(removeEllipse).sort()

  var colours = {
      'region': {
          '': '#fff',
          'Calgary': '#c8102e',
          'Edmonton': '#005087',
          'Red Deer': '#9b1309',
          'Lethbridge': '#cc9900',
          'Grande Prairie': '#37A46E',
          'Rest of Alberta': '#628000',
      },
      'party': {
          '': 'rgba(250,250,250,.1)', //'none', //'#fff',
          'UCP': '#377eb8',
          'NDP': '#ff7f00',
          'LIB': '#e41a1c',
          'AP': '#d7c500',
          'PC': '#377eb8',
          'WRP': '#4daf4a',
          'IND': '#bdbdbd',
          'AAP': '#bdbdbd',
          'AIP': '#bdbdbd',
          'CP-A': '#bdbdbd',
          'FCPA': '#bdbdbd',
          'GPA': '#bdbdbd',
          'PAPA': '#bdbdbd',
          'RPA': '#bdbdbd'
      }
  }
  var partyAbbrev = {
      'ALBERTA ADVANTAGE PARTY': 'AAP',
      'ALBERTA INDEPENDENCE PARTY': 'AIP',
      'ALBERTA LIBERAL PARTY': 'LIB',
      'ALBERTA NDP': 'NDP',
      'ALBERTA PARTY': 'AP',
      'COMMUNIST PARTY - ALBERTA': 'CP-A',
      'FREEDOM CONSERVATIVE PARTY': 'FCPA',
      'GREEN PARTY OF ALBERTA': 'GPA',
      'INDEPENDENT': 'IND',
      'PC PARTY': 'PC',
      'PRO-LIFE ALBERTA POLITICAL ASSOCIATION': 'PAPA',
      'REFORM PARTY': 'RPA',
      'UNITED CONSERVATIVE PARTY': 'UCP',
      'WILDROSE': 'WRP'
  }

  var regions = {
      'Calgary': 'Calgary',
      'Edmonto': 'Edmonton',
      'Red Dee': 'Red Deer',
      'Lethbri': 'Lethbridge',
      'Grande ': 'Grande Prairie'
  }

  //svg sizes and margins
  var margin = {
          top: 0, //27,
          right: 0,
          bottom: 0,
          left: 0
      },
      // width = $(window).width() - margin.left - margin.right - 40;
      width = 700 - margin.left - margin.right - 40;
  height = 400 - margin.top - margin.bottom; //- 20;
  // height = $(window).height() - margin.top - margin.bottom; //- 20;

  //The number of columns and rows of the cartogram
  var MapColumns = 10,
      MapRows = 18;

  //The maximum radius the hexagons can have to still fit the screen
  var hexRadius = d3.min([width / ((MapColumns + 0.5) * Math.sqrt(3)),
      height / ((MapRows + 1 / 3) * 1.5)
  ]);

  width = hexRadius * MapColumns * 2

  //Calculate the center positions of each hexagon
  //var points = [];
  //for (var r = 0; r < MapRows; r++) {
  //    for (var c = 0; c < MapColumns; c++) {
  //        points.push([hexRadius * c * 1.75, hexRadius * r * 1.5]);
  //    }//for c
  //}//for r

  var points = [];
  var truePoints = [];
  for (var i = 0; i < MapRows; i++) {
      for (var j = 0; j < MapColumns; j++) {
          points.push([hexRadius * j * 1.75, hexRadius * i * 1.5]);
          truePoints.push([hexRadius * j * Math.sqrt(3), hexRadius * i * 1.5]);
      } //for j
  } //for i

  //Create SVG element
  //var svg = d3.select("body").append("svg")
  var svg = d3.select(".hexmap").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  //Set the hexagon radius
  var hexbin = d3.hexbin()
      .radius(hexRadius);

  var radius = d3.scale.sqrt()
      // .domain([1, electorates.max_turnout])
      .domain([1, 37000])
      .range([1, hexRadius]);

  //Draw the hexagons
  var hex = svg.selectAll(".hexagon")
      .data(hexbin(points))
      .enter().append("path")
      .attr("class", "hexagon")
      .attr("d", function(d, i) {
          return hexbin.hexagon(radius(35000));
      })
      .attr("transform", function(d) {
          return "translate(" + d.x + "," + d.y + ")";
      })
      .style("stroke", "none")
      .style("stroke-width", function(d, i) {
          if (i < mapdata.length) {
              return .5;
          }
          return 'none';
      })
      .style("stroke-opacity", "0.5")
      .attr("id", function(d, i) {
          return "ed" + mapdata[i]
      })

  //MAPBOX
  mapboxgl.accessToken = 'pk.eyJ1IjoiY2Ftc3RhcmsiLCJhIjoiY2o2Y3o5bHFlMXp2MjM2bjZueTFtc3JneSJ9.qhidREzUi4mgVV1vCBmuxg'

  //Setup mapbox-gl map
  var map = new mapboxgl.Map({
      container: 'map', // container id
      style: 'mapbox://styles/mapbox/light-v10',
      center: [-114.215538, 54.210027],
      zoom: 4,
  });

  var popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false
  });

  var fullBounds = new mapboxgl.LngLatBounds({
          lng: -119.26924893749622,
          lat: 48.71563563900298
      }, //sw
      {
          lng: -109.16182706249779,
          lat: 59.05978335445522
      } //ne
  );
  var current = {
      'ed': 0
  };

  map.fitBounds(fullBounds, {
      padding: 35
  });

  map.on('load', function() {

      map.addSource("edmap", {
          "type": "geojson",
          "data": "EDS_ENACTED_BILL33_15DEC2017.geojson.json"
      });

      map.addLayer({
          'id': 'eds',
          'type': 'fill',
          'source': 'edmap',
          'layout': {},
          'paint': {
              'fill-color': '#088',
              'fill-opacity': 0.5
          }
      }); //end map.addLayer

      map.addLayer({
          'id': 'eds-highlight',
          'type': 'line',
          'source': 'edmap',
          'layout': {},
          'paint': {
              'line-color': 'white',
              'line-width': 1
          }
      }); //end map.addLayer
      map.setFilter('eds-highlight', ['==', 'EDNumber20', 0]);


      //Get electoral district data
      d3.json("EDS_ENACTED_BILL33_15DEC2017.geojson.json", function(error, json) {
          //Get candidate data - downloaded from Elections Alberta
          d3.csv("all-candidates.csv", function(error, csv) {
              //Get "Vote Anywhere" numbers - copied from Elections Alberta tables on html pages
              d3.csv("vote-anywhere.csv", function(error, anywhere) {

                  anywhereVotes = anywhere
                  anywhereVotes.getAnywhereVotes = function(key, value) {
                      return this.filter(function(feature) {
                          if (feature[key] === value) {
                              return true;
                          } else {
                              return false;
                          }
                      });
                  };

                  csv.forEach(function(d) {
                      d.EDNumber = parseInt(d.ElectoralDivision.substr(0, 2));
                      d.PartyAbbrev = partyAbbrev[d.PartyName]

                  })
                  candidates = csv
                  candidates.getCandidates = function(key, value) {
                      return this.filter(function(feature) {
                          if (feature[key] === value) {
                              return true;
                          } else {
                              return false;
                          }
                      });
                  };

                  electorates = json
                  electorates.getFeaturesByProperty = function(key, value) {
                      return this.features.filter(function(feature) {
                          if (feature.properties[key] === value) {
                              return true;
                          } else {
                              return false;
                          }
                      });
                  };

                  colourTheHexes(electorates, "elected")

                  // Activate the Results Pane and Tooltip Toggler
                  $('#collapser').on('click', function(event) {
                      event.preventDefault();
                      $('#resultsDiv').toggleClass('noDisplay')
                      $('.tooltip').toggleClass('noDisplay')
                  })

                  svg.selectAll('.hexagon')
                      .on("mouseover", mover)
                      .on("mouseout", mout)
                      .on("click", mclick)

              });
          });


      })

      $('.chooser').on('click', function(event) {
          event.preventDefault();
          colourTheHexes(electorates, event.target.id)
      })

      function colourTheHexes(data, how) {

          colourChoice = (how == 'region') ? 'region' : 'party';

          d3.json("https://electionsapi.cp.org/api/alberta2019/Totals_By_Riding", function(error, totals) {

              totals.getTotals = function(key, value) {
                  return this.filter(function(feature) {
                      if (feature[key] === value) {
                          return true;
                      } else {
                          return false;
                      }
                  });
              };

              // Start the expression to style the Mapbox map
              var expression = ["match", ["get", "EDNumber20"]];

              svg.selectAll(".hexagon")
                  .each(function(d) {
                      d.element = this;
                  })
                  .style("fill", function(d, i) {
                      id = d.element.id.replace("ed", "")
                      if (id != "..") {
                          if (how == 'region') {
                              EDName2017 = data.getFeaturesByProperty('EDNumber20', parseInt(id))[0].properties['EDName2017']
                              region = regions[EDName2017.substr(0, 7)]
                              if (region == undefined) {
                                  region = "Rest of Alberta"
                              }
                              if (EDName2017 == "Grande Prairie-Wapiti") {
                                  region = "Rest of Alberta"
                              }
                              expression.push(parseInt(id), colours[colourChoice][region])
                              return colours[colourChoice][region]
                          }
                          if (how == 'leading') {
                              leadingParty = totals.getTotals('RidingNumber', parseInt(id))[0]['LeadingParty']
                              console.log(leadingParty)
                              if (leadingParty != '' & leadingParty != 'Tie') {
                                  if (colours[colourChoice][leadingParty] != undefined) {
                                      expression.push(parseInt(id), colours[colourChoice][leadingParty])
                                      return colours[colourChoice][leadingParty]
                                  } else {
                                      expression.push(parseInt(id), '#ccc')
                                      return "#ccc"
                                  }
                              } else {
                                  expression.push(parseInt(id), '#ccc')
                                  return "#ccc"
                              }
                          }
                          if (how == 'elected') {
                              totalResults = totals.getTotals('RidingNumber', parseInt(id))[0]
                              leadingParty = totalResults['LeadingParty']
                              if (totalResults['Elected'] == 1) {
                                  expression.push(parseInt(id), colours[colourChoice][leadingParty])
                                  return colours[colourChoice][leadingParty]
                              } else {
                                  expression.push(parseInt(id), '#ccc')
                                  return "#ccc"
                              }
                          } else {
                              edCandidates = candidates.getCandidates('EDNumber', parseInt(id))
                              firstCandidate = edCandidates[0]['PartyAbbrev']
                              expression.push(parseInt(id), colours[colourChoice][firstCandidate])
                              return colours[colourChoice][firstCandidate]
                          }
                      }
                  })

              // Last value is the default, used where there is no data
              expression.push("rgba(0,0,0,0)");
              map.setPaintProperty('eds', 'fill-color', expression);
          })

      }


  }); //end map.on
  // map.addControl(new mapboxgl.NavigationControl());

  map.on('mousemove', 'eds', function(e) {
      // Change the cursor style as a UI indicator.
      map.getCanvas().style.cursor = 'pointer';

      // var coordinates = e.features[0].geometry.coordinates.slice();
      var description = e.features[0].properties.EDName2017 +
          " (" +
          e.features[0].properties.EDNumber20 +
          ")";

      d3.selectAll('.hexagon')
          .transition()
          .duration(1000)
          .style("fill-opacity", 1);
      var hexy = d3.select('#ed' + e.features[0].properties.EDNumber20.toString().padStart(2, '0'))
          .transition()
          .duration(10)
          .style("fill-opacity", 0.3);

      // Populate the popup and set its coordinates
      // based on the feature found.
      popup.setLngLat(e.lngLat)
          .setHTML(description)
          .addTo(map);
  });

  map.on('mouseleave', 'eds', function() {
      map.getCanvas().style.cursor = '';
      popup.remove();

      d3.selectAll('.hexagon')
          .transition()
          .duration(1000)
          .style("fill-opacity", 1);

  });

  var tooltip = d3.select("#tooltip")
      .attr("class", "tooltip")
      .style("opacity", 0);

  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////// Mouseover functions /////////////////////////
  ///////////////////////////////////////////////////////////////////////////

  //Function to call when you mouseover a node
  function mover(d) {
      var el = d3.select(this)
          .transition()
          .duration(10)
          .style("fill-opacity", 0.3);

      edId = this.id.replace("ed", "")
      if (edId != "..") {
          tooltip.transition().duration(100)
              .style("opacity", 1)
              // if (d3.event.pageX > (width - 200)) {
          if (d3.event.pageX > (width - 50)) {
              tooltip.style("left", (d3.event.pageX - 210) + "px");
          } else {
              tooltip.style("left", (d3.event.pageX + 20) + "px")
                  .style("top", (d3.event.pageY - 30) + "px");
          }
          if (d3.event.pageY > (height - 150)) {
              tooltip.style("top", (d3.event.pageY - 140) + "px");
          } else {
              tooltip.style("top", (d3.event.pageY - 30) + "px");
          }

          map.setFilter('eds-highlight', ['==', 'EDNumber20', parseInt(edId)]);
          details = electorates.getFeaturesByProperty('EDNumber20', parseInt(edId))[0]

          aVotes = anywhereVotes.filter(function(d) {
              return d['ED Number'] == edId
          })

          tooltip.select(".name")
              .html(
                  '<div id="tooltipChart">' +
                  '<h4 class="tooltitle">' +
                  '</h4>' +
                  '<div class="subinfo">' +
                  '</div>' +
                  '<div class="chart"></div></div>'
              );

          results = d3.select("#results")
              .html(
                  '<div id="overallChart">' +
                  '<h4 class="tooltitle">' +
                  '</h4>' +
                  '<div class="subinfo">' +
                  '</div>' +
                  '<div class="chart"></div></div>'
              );

          edCandidates = candidates.getCandidates('EDNumber', parseInt(edId))
          //make ed a number
          ed = parseInt(edId)
          d3.json("https://electionsapi.cp.org/api/alberta2019/Candidates_For_Riding?ridingnumber=" + ed, function(error, json) {

              resultsMaker("#overallChart")
              resultsMaker("#tooltipChart")

              function resultsMaker(locationSelector) {

                  var sortVotes = json.sort(function(a, b) {
                      return b.Votes - a.Votes
                  })

                  // Get the max number of voters in ech riding, from the 0th record
                  var scaleElectors = json[0]['TotalVoters']
                  var x = d3.scale.linear()
                      // .domain([0, 100]) // if we were doing percentages maybe
                      .domain([0, scaleElectors]) //measure out of the number of electors
                      .range([0, 200]);

                  totals = [{
                      'key': "TotalVoters",
                      'value': json[0]['TotalVoters'],
                      description: 'total voters'
                  }, {
                      'key': "Anywhere",
                      'value': aVotes[0]['Vote Anywhere Ballots'],
                      description: '"vote anywhere" votes cast'
                  }, {
                      'key': "TotalVotes",
                      'value': json[0]['TotalVotes'],
                      description: 'votes counted'
                  }]

                  $(locationSelector + ' > .tooltitle').text(
                      details.properties['EDName2017'] + ' (' + details.properties['EDNumber20'] + ')'
                  )

                  d3.select(locationSelector + " > .subinfo")
                      .selectAll("div")
                      .data(totals)
                      .enter().append("div")
                      .style("width", function(d) {
                          return x(d['value']) + "px";
                      })
                      .style("background-color", function(d) {
                          // console.log(d)
                          return "grey";
                      })

                  d3.selectAll(locationSelector + " > .subinfo > div").each(function() {
                      var t = document.createElement('p');
                      this.parentNode.insertBefore(t, this);
                  });

                  d3.selectAll(locationSelector + " > .subinfo > p").data(totals).text(function(d) {
                      // return toTitleCase(d.CandidateFirstName) + ' ' + toTitleCase(d.CandidateLastName) + ' (' + d.PartyAbbrev + ')'
                      // return d['Vote Anywhere Ballots'] + ' out of ' + d.Electors + ' (' + d3.round(d['Vote Anywhere Ballots'] / d.Electors * 100) + '%)'
                      return d.value + ' ' + d.description
                  });

                  var bars = d3.select(locationSelector + '> .chart')
                      .selectAll("div")
                      .data(sortVotes)
                      .enter().append("div")
                      .style("width", function(d) {
                          if (d.Votes == 0) {
                              return '1px'
                          } else {
                              return x(d.Votes) + "px";
                          }
                      })
                      .style("background-color", function(d) {
                          return colours['party'][d.PartyShortName_En];
                      })

                  d3.selectAll(locationSelector + " > .chart > div").each(function() {
                      var t = document.createElement('p');
                      this.parentNode.insertBefore(t, this);
                  });

                  d3.selectAll(locationSelector + " > .chart > p").data(sortVotes).html(function(d) {
                      // return toTitleCase(d.CandidateFirstName) + ' ' + toTitleCase(d.CandidateLastName) + ' (' + d.PartyAbbrev + ')'
                      calledElected = ''
                      if (d.Elected == 1) {
                          calledElected = '<span>&#10003;</span> '
                      }
                      return calledElected + d.First + ' ' + d.Last + ' (' + d.PartyShortName_En + ') ' + d3.format('.1%')(d.Votes / d.TotalVotes)
                  });
              }
          })
      }
  };

  function mclick(d) {

      currentBounds = map.getBounds()

      edId = this.id.replace("ed", "")
      if (edId != "..") {
          details = electorates.getFeaturesByProperty('EDNumber20', parseInt(edId))[0]

          var coordinates = details.geometry.coordinates[0];
          var bounds = coordinates.reduce(function(bounds, coord) {
              return bounds.extend(coord);
          }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));

          if (parseInt(edId) == current.ed) {
              map.fitBounds(fullBounds, {
                  padding: 35
              });
              current.ed = 0
          } else {
              map.fitBounds(bounds, {
                  // padding: 200
                  maxZoom: 8
              });
              current.ed = parseInt(edId);
          }
      }

  }


  //Mouseout function
  function mout(d) {
      var el = d3.select(this)
          .transition()
          .duration(1000)
          .style("fill-opacity", 1);
      var ttips = d3.select(this);
      tooltip.transition().duration(300)
          .style("opacity", 0);

      map.setFilter('eds-highlight', ['==', 'EDNumber20', 0]);

  };




  ///////////////////////////////////////////////////////////////////////////
  ///// Function to calculate the line segments between two node numbers ////
  ///////////////////////////////////////////////////////////////////////////
  // This is a pain to do...
  // It allows you to draw the boundaries around cities, but you have to figure out which
  // hexes have which numbers, in order to figure out where the boundaries should be drawn

  //Which nodes are neighbours
  var neighbour = [
      // [25, 26],
      // [15, 36],
      // [16, 26],
      // [26, 27],
      [36, 27],
      [36, 37],
      // [36, 47],
      [37, 47],
      [48, 47],
      [57, 47],
      // [46, 47],
      // [46, 46],
      // [56, 47],
      [56, 57],
      [56, 67],
      [66, 67],
      [66, 76],
      [66, 75],
      [65, 75],
      [65, 74],
      [64, 74],
      // [64, 73],
      // [63, 73],
      // [63, 72],
      // [62, 72],
      [71, 72],
      [82, 72],
      [83, 72],
      [83, 73],
      [84, 73],
      [74, 73],

      [62, 71],
      [62, 61],
      [62, 51],
      [52, 51],
      [42, 51],
      [42, 41],
      [42, 31],
      // [32, 31],
      // [32, 22],
      // [32, 23],
      [32, 33],
      [32, 43],
      [32, 42],
      [33, 23],
      [33, 24],
      [34, 24],
      [34, 25],
      [35, 25],
      [35, 26],
      [36, 26],

      // Red Deer
      [86, 87],
      [86, 76],
      [86, 75],
      [85, 75],
      [85, 74],
      [85, 84],
      [85, 94],
      [85, 95],
      [86, 95],
      [86, 96],
      // [35, 25],
      // [35, 26],
      // [36, 26],



      [103, 92],
      [103, 93],
      [104, 93],
      [104, 94],
      [105, 94],
      [105, 95],
      [106, 95],
      [106, 96],
      [106, 107],
      [116, 107],
      [116, 117],
      [127, 117],
      [127, 128],
      [127, 137],
      [136, 137],
      [136, 147],
      [146, 147],
      [156, 147],
      [156, 157],
      [167, 157],
      [167, 168],
      [167, 177],
      [167, 176],
      [166, 176],
      [166, 175],
      [165, 175],
      [165, 174],
      [165, 164],
      [154, 164],
      [154, 153],
      [144, 153],
      [144, 143],
      [133, 143],
      [133, 132],
      [123, 132],
      [123, 122],
      [112, 123],
      [113, 112],
      [103, 112],
      [103, 102],

      // Lethbridge
      [137, 147],
      [147, 148],
      [157, 148],
      [157, 158],
      [157, 168],


  ];


  //Initiate some variables
  var Sqr3 = 1 / Math.sqrt(3);
  var lineData = [];
  var Node1,
      Node2,
      Node1_xy,
      Node2_xy,
      P1,
      P2;

  //Calculate the x1, y1, x2, y2 of each line segment between neighbours
  for (var i = 0; i < neighbour.length; i++) {
      Node1 = neighbour[i][0];
      Node2 = neighbour[i][1];

      //An offset needs to be applied if the node is in an uneven row
      if (Math.floor(Math.floor((Node1 / MapColumns) % 2)) != 0) {
          Node1_xy = [(truePoints[Node1][0] + (hexRadius / (Sqr3 * 2))), truePoints[Node1][1]];
      } else {
          Node1_xy = [truePoints[Node1][0], truePoints[Node1][1]];
      }

      //An offset needs to be applied if the node is in an uneven row
      if (Math.floor(Math.floor((Node2 / MapColumns) % 2)) != 0) {
          Node2_xy = [(truePoints[Node2][0] + (hexRadius / (Sqr3 * 2))), truePoints[Node2][1]];
      } else {
          Node2_xy = [truePoints[Node2][0], truePoints[Node2][1]];
      } //else

      //P2 is the exact center location between two nodes
      P2 = [(Node1_xy[0] + Node2_xy[0]) / 2, (Node1_xy[1] + Node2_xy[1]) / 2]; //[x2,y2]
      P1 = Node1_xy; //[x1,x2]

      //A line segment will be drawn between the following two coordinates
      lineData.push([(P2[0] + Sqr3 * (P1[1] - P2[1])), (P2[1] + Sqr3 * (P2[0] - P1[0]))]); //[x3_top, y3_top]
      lineData.push([(P2[0] + Sqr3 * (P2[1] - P1[1])), (P2[1] + Sqr3 * (P1[0] - P2[0]))]); //[x3_bottom, y3_bottom]
  } //for i

  ///////////////////////////////////////////////////////////////////////////
  /////////////////// Draw the black line segments //////////////////////////
  ///////////////////////////////////////////////////////////////////////////

  var lineFunction = d3.svg.line()
      .x(function(d) {
          return d[0];
      })
      .y(function(d) {
          return d[1];
      })
      .interpolate("linear");

  var Counter = 0;
  //Loop over the linedata and draw each line
  for (var i = 0; i < (lineData.length / 2); i++) {
      svg.append("path")
          .attr("d", lineFunction([lineData[Counter], lineData[Counter + 1]]))
          .attr("stroke", "black")
          .attr("stroke-width", 3)
          .attr("fill", "none");

      Counter = Counter + 2;
  } //for i

  function toTitleCase(str) {
      return str.replace(
          /\w\S*/g,
          function(txt) {
              return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
          }
      );
  }
