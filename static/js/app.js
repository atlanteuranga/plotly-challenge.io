counter = 0;
function BellyButton(sample){
    d3.json("../../samples.json").then(function(data){
        if (counter === 0){
        let select = document.querySelector('select');
        let options = data.names.map(id => `<option value =${id}>${id}</option>`).join('\n');

            select.innerHTML = options;
        counter = 1}
        let string_otu = []
        for (i=0; i<data.samples[data.names.indexOf(sample)].otu_ids.length; i++){
            string_otu.push("OTU" + String(data.samples[data.names.indexOf(sample)].otu_ids[i]))
        }
        let trace1 = {
            x: data.samples[data.names.indexOf(sample)].sample_values.slice(0,10).reverse(),
            y: string_otu.slice(0,10).reverse(), 
            text: data.samples[data.names.indexOf(sample)].otu_labels.slice(0,10).reverse(),
            type: "bar", 
            orientation: 'h'
          };
          
          let bar_trace = [trace1];
          
          let layout = {
            title: "Sample " + data.samples[data.names.indexOf(sample)].id
          };
          
          Plotly.newPlot("bar", bar_trace, layout);;

          var trace2 = {
            x: data.samples[data.names.indexOf(sample)].otu_ids,
            y: data.samples[data.names.indexOf(sample)].sample_values,
            mode: 'markers',
            marker: {
              size: data.samples[data.names.indexOf(sample)].sample_values, 
              color:data.samples[data.names.indexOf(sample)].otu_ids
            },
            text: data.samples[data.names.indexOf(sample)].otu_labels
          };
          
          var bubble_trace = [trace2];
          
          var layout2 = {
            title: 'OTU ID Frequency',
            showlegend: false,
            height: 600,
            width: 1200
          };
          
          Plotly.newPlot('bubble', bubble_trace, layout2);

          console.log(Object.entries(data.metadata[data.names.indexOf(sample)]))
          var div_panel = document.getElementById('sample-metadata');
          div_panel.innerHTML = ''
            for (i=0; i<Object.entries(data.metadata[data.names.indexOf(sample)]).length;i++){
                div_panel.innerHTML += Object.entries(data.metadata[data.names.indexOf(sample)])[i];
                div_panel.innerHTML += '<br>'}
    })};
BellyButton('940')

