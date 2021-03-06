function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);

}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array.
    var samples = data.samples;
    
    console.log(samples);

    // 3.5 Create a variable that filters the wfreq from the metadata for the desired sample number. 
    var metadata = data.metadata.filter(sampleObj => sampleObj.id == sample);
    var wFreq = parseFloat(metadata[0].wfreq);
    console.log(wFreq);
    
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var newSample = samples.filter(sampleObj => sampleObj.id == sample);
    
    //  5. Create a variable that holds the first sample in the array.
    var firstSample = newSample[0]
    console.log(firstSample);

    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otu_id = firstSample.otu_ids;
    var otu_label = firstSample.otu_labels;
    var sample_value = firstSample.sample_values;
    console.log(otu_id);

    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 

    var yticks = otu_id.slice(0, 10).map(otu_id => "OTU " + otu_id).reverse();
    var otu_sliced_reversed = otu_id.slice(0, 10).reverse();
    var sample_value_sliced_reversed = sample_value.slice(0, 10).reverse();
    var otu_label_sliced_reversed = otu_label.slice(0, 10).reverse();

    console.log(yticks)
    // 8. Create the trace for the bar chart. 
    var trace = {
      x: sample_value_sliced_reversed,
      y: yticks,
      text: otu_label_sliced_reversed,
      type: "bar",
      orientation: "h"
    }

    var barData = [trace];

    // 9. Create the layout for the bar chart. 
    var barLayout = {
      title: "Top 10 Bacteria Cultures Found",
      // xaxis: "OTU",
      // yaxis: "Sample"
    };
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", barData, barLayout);

    // Deliverable 2 Bubble chart:
    // 1. Create the trace for the bubble chart.
    var trace1 = {
      x: otu_id,
      y: sample_value,
      text: otu_label,
      mode: 'markers',
      marker: {
        color: otu_id,
        colorscale: 'Earth',
        size: sample_value,
        // sizeref: 0.05,
        // sizemode: 'area'
      },
      hoverinfo: "x+y+text"

    };

    var bubbleData = [trace1];

    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title: "Bacteria Cultures Per Sample",
      xaxis: { zeroline: true, title: "UTO ID" },
      // yaxis: {
      //   autorange : true,
      //   autotick: false,
      //   tick0: 0,
      //   dtick: 50,
      // },
      margin: {
        l: 20,
        r: 20,
        b: 25,
        t: 25,
        pad: 5
      },
      hovermode: "closest"
    };

    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);

    // Deliverable 3: Gauge Chart
    // 4. Create the trace for the gauge chart.
    var trace3 = {
      type: "indicator",
      mode: "gauge+number",
      value: wFreq,
      title: "Scrubs per Week",
      gauge: {
        axis: {range: [null, 10]},
        bar: {color: "black"},
        steps: [
          {range: [0, 2], color: "red"},
          {range: [2, 4], color: "orange"},
          {range: [4, 6], color: "yellow"},
          {range: [6, 8], color: "lightgreen"},
          {range: [8, 10], color: "green"}
      ]}
    };


    var gaugeData = [trace3];
    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
      title: "Belly Button Washing Frequency"     
      
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot("gauge", gaugeData, gaugeLayout);
  });


}
