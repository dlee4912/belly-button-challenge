
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

let names = [];
let metadata = [];
let samples = [];

d3.json(url).then(function(data) {
    console.log(data);
    names = data.names;
    metadata = data.metadata;
    samples = data.samples;

    init();
  });


function init(){

    // Populate the dropdown from the list/array
    selector = d3.select("#selDataset");
    for (let i = 0; i < names.length; i++){
        selector.append("option").text(names[i]).property("value", names[i]);
    }

    let dropdownMenu = d3.select("#selDataset");
    let dataset = dropdownMenu.property("value");

    optionChanged(dataset);

}

function optionChanged(data){

    let row = [];

    //console.log(metadata);

    for(let i = 0; i < samples.length; i++){
        if(samples[i].id == data){
            row.push(samples[i]);

            meta = JSON.stringify(metadata[i], null, 2).trim().replaceAll('"', "").replace("{", "").replace("}", "").split(",");
            //console.log(meta);

            let metaHTML = d3.select("#sample-metadata");

            metaHTML.text("");

            for(let i = 0; i < meta.length; i++){
                metaHTML.append("p").text(meta[i]);
            }
        };
    };    

    //console.log(row[0]);

    let tenLabels = [];
    let tenValues = [];
    let stringIds = [];
    

    for(let i = 0; i < 10; i++){
        tenLabels.push(row[0].otu_labels[i]);
        tenValues.push(row[0].sample_values[i]); 
        stringIds.push(String("OTU " + row[0].otu_ids[i]));
        
    };

    let trace1 = {
        x: tenValues,
        y: stringIds,
        text: tenLabels,
        type: "bar",
        orientation: 'h', 
        transforms: [{
            type: 'sort',
            target: 'y',
            order: 'descending'
          }]
    };
    
    Plotly.newPlot("bar", [trace1]);


    let trace2 = {
        x: row[0].otu_ids,
        y: row[0].sample_values,
        text: row[0].otu_labels,
        mode: 'markers',
        marker: {
            color: row[0].otu_ids,
            size: row[0].sample_values
        }
      };

    var layout = {
        showlegend: false,
        xaxis: {
            title: {
              text: 'OTU ID'
            },
          },
    };

    Plotly.newPlot("bubble", [trace2], layout);

}


