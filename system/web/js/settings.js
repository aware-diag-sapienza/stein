if (window.system == undefined) window.system = {}
system.settings = (function() {
    const that = this;


    this.perfect_selected = false;
    this.quantile_selected = false;
    this.cluster_selected = false;
    this.indipendent_selected = false;
    this.radvizplusplus_selected = false;

    this.color_selected = false;

    this.max_quantile_value = -1;
    this.max_cluster_quantile_value = -1;

    this.max_quantile_label = null;
    this.max_cluster_quantile_label = null;

    this.max_quantile_label_dimensions = null;
    this.max_cluster_quantile_label_dimensions = null;

    this.indipendent_mean = null;
    this.radvizplusplus_mean = null;

    this.quantile_DBI = null;
    this.cluster_DBI = null;
    this.indipendent_DBI = null;
    this.radvizplusplus_DBI = null;
    this.perfect_DBI = null;
    this.value_DBI = null;

    this.quantile_global_quality = null;
    this.indipendent_global_quality = null;
    this.radvix_plus_plus_global_quality = null;
    this.value_global_quality = null;

    this.selected_dataset_option = '';


    this.cleanVisualization = () => {
        system.structure.removeElementsByClass("checkbox_attributes");
        system.structure.removeElementsByClass("label_attributes");
        system.structure.removeElementsByClass("label_classification");
        system.structure.removeElementsByClass("checkbox_classification");
        system.structure.removeElementsByClass("axisforce");
        d3.select("#btn_quantile").attr("class", "btn_style");
        d3.select("#btn_cluster").attr("class", "btn_style");
        document.getElementById('dominance-check').checked = false
        document.getElementById('dominance-mean-check').checked = false

        system.settings.lazoSelection()
        system.settings.reprPoint()
        system.settings.updateDominanceMean()
        system.settings.updateDominance()


    };

    this.resetVariables = () => {
        this.perfect_selected = false;
        this.quantile_selected = false;
        this.cluster_selected = false;
        this.max_quantile_value = -1;
        this.max_cluster_quantile_value = -1;

        $('button').removeClass('active');
        
        document.getElementById('lazoselection').checked = false
        
    }

    this.newDataset = function(loadfile, nameDataset) {

        document.getElementById('lazoselection').checked = false
        d3_radviz = d3.radviz()

        d3.csv(loadfile).then(dataset => {

            DATASET_NAME = nameDataset
            dimensions_removed = []
            attr_removed = []

            if (DATASET_NAME.indexOf('(') > 0) {
                name_attr = DATASET_NAME.substring(DATASET_NAME.indexOf('(') + 1, DATASET_NAME.indexOf(')'));
                ORIGINAL_CLASSIFIED = true
            }

            d3_radviz.data(dataset, name_attr)
            if (d3_radviz.data().attributes.length != 0) {
                name_attr = d3_radviz.data().attributes[0].id
                d3_radviz.setColorClassification()
                d3_radviz.setColorClassification(name_attr)
                ORIGINAL_CLASSIFIED = true

            } else if (DATASET_NAME.indexOf('(') > 0) {
                name_attr = DATASET_NAME.substring(DATASET_NAME.indexOf('(') + 1, DATASET_NAME.indexOf(')'));
                d3_radviz.setColorClassification(name_attr);
                ORIGINAL_CLASSIFIED = true

            } else {
                ORIGINAL_CLASSIFIED = false
            }

            //document.getElementById('avg-similarity').innerHTML = `<b>Avg ReprSimilarity: ${d3.mean(d3_radviz.data().entries, d => d.representativeSimilarity).toFixed(4)}</b>`
    
            system.data.load( system.data.LINK_SERVER + "data/" + nameDataset + ".csv", nameDataset);
            //system.structure.initializeForce();
            //system.structure.initializeRadar();
            //system.structure.initializeForceAxes(d3_radviz.data().angles);
            //system.structure.initializeRadarAxes(d3_radviz.data().angles);


            let f_context_menu = function(_) {
                //system.structure.initializeForceAxes(_);
                //system.structure.initializeRadarAxes(_);
                //system.radar.changeRadar(_);
            }
            let f_click = function(a, b, c) {
                //system.radar.drawRadar(a, b, c);
                //system.structure.uploadProgressBar();

                // DA INSERIRE FUNZIONE DELLA SELEZIONE

            }

            let f_drag_end = function(a) {
                //system.structure.initializeForceAxes(a);
                //system.structure.initializeRadarAxes(a);
                //system.radar.changeRadar(a);
                //system.structure.drawboxplot(d3_radviz.data().entries.map(d => d.errorE));

            }

            let f_mouse_over = function(a, b) {
                
                //system.spring.drawForce(a, b);

                var div = d3.select(".tooltip")
                div.transition()
                    .duration(200)
                    .style("opacity", .9)
                    .delay(500);
                
                let str = `Point #${b.id.replace('p', '')}`
                    + `<br><small>[ ${b.x1.toFixed(2)} , ${b.x2.toFixed(2)} ]</small>`
                    + `<br><small>EE ${b.errorE.toFixed(2)}</small>`
                    + `<br><small>RPSim ${b.representativeSimilarity.toFixed(3)}</small>`
                //div.html('(' + b.x1.toFixed(2) + ',' + b.x2.toFixed(2) + ')<br> EE: ' +  + '<br> <font size="1">PR: '+ b.representativeSimilarity.toFixed(3)+'</font>')
                div.html(str)
                .style("left", (d3.event.pageX + 20) + "px")
                    .style("top", (d3.event.pageY - 40) + "px")
                    .style("color", "white")
                    .style("background", "black")
            }

            let f_mouse_out = function() {
                //d3.selectAll(".lineforce").remove();
                var div = d3.select(".tooltip")
                div.transition()
                    .duration(50)
                    .style("opacity", 0);

            }

            
            //d3_radviz.setFunctionUpdateResults(results1)
            d3_radviz.setFunctionClick(f_click)
            d3_radviz.setFunctionMouseOver(f_mouse_over)
            d3_radviz.setFunctionMouseOut(f_mouse_out)
            d3_radviz.setFunctionDragEnd(f_drag_end)
            d3_radviz.setFunctionContextMenu(f_context_menu)
            
            

            //const set = d3_radviz.data().dimensions.map(d => d.values)
            d3.select('#container').call(d3_radviz);
            //system.structure.drawboxplot(d3_radviz.data().entries.map(d => d.errorE));
            //system.structure.uploadProgressBar();

        })
        
    }

    this.addOtherMetrics = function(){
        let metrics = new RadVizMetrics(d3_radviz)
        if (d3.select("#oth-metrics").property('checked')){
            if (isNaN(metrics.dbindex())){
            document.getElementById('additional-metrics').innerHTML = "  <b>Projection Error COS</b>: " + metrics.projectionError("cosine").toFixed(4)+
            "<br>  <b>Clumping50</b>: " + metrics.clumping50().toFixed(4)
            } else {
                document.getElementById('additional-metrics').innerHTML = "  <b>Projection Error COS</b>: " + metrics.projectionError("cosine").toFixed(4)+
            "<br>  <b>Clumping50</b>: " + metrics.clumping50().toFixed(4)+
            "<br>  <b>DB index</b>: " + metrics.dbindex().toFixed(4)
            }
        } else {
            document.getElementById('additional-metrics').innerHTML = ""
        }
    }

    this.deselectPoints = function(){
        
        d3.selectAll('.data_point-'+ d3_radviz.getIndex())
        .each(function(d){
            d.selected = false;
        })
        .style("stroke-width", '0.2')
        
    }


    this.choiceDimensionsNewDataset = function(d, dat, but) {


        d3.csv(dat).then(currentdataset => {
            if (but == 'check') {
                if (!d.checked) {
                    if (dimensions_removed.indexOf(d.value) == -1) {
                        dimensions_removed.push(d.value);
                    }
                } else {

                    let indx = dimensions_removed.indexOf(d.value)
                    if (indx > -1)
                        dimensions_removed.splice(indx, 1)
                    else
                        attr_removed = []

                    let ind_clas = attr_removed.indexOf(d.value)
                    if (ind_clas > -1) {
                        attr_removed = []
                    }


                }


            }
            if (but == 'radio') {


                if (attr_removed.indexOf(d.value) > -1) attr_removed = []
                else attr_removed = [d.value]

            }

            currentdataset.forEach(element => {
                dimensions_removed.forEach(dd => {
                    if (attr_removed.indexOf(dd) == -1) {
                        delete currentdataset.columns[currentdataset.columns.indexOf(dd)]
                        delete element[dd];
                    }
                })
            });


            if (but == 'check') {


                if (DATASET_NAME.indexOf('(') != -1) {
                    name_attr = DATASET_NAME.substring(DATASET_NAME.indexOf('(') + 1, DATASET_NAME.length - 1)

                    d3_radviz.data(currentdataset, name_attr)
                    d3_radviz.setColorClassification(name_attr)
                    system.data.load(dat, DATASET_NAME);
                } else if (attr_removed != []) {
                    name_attr = attr_removed[0]
                    d3_radviz.data(currentdataset, name_attr)
                    d3_radviz.setColorClassification(name_attr)
                    system.data.load(dat, DATASET_NAME);

                } else if (d3_radviz.data().attributes.length != 0) {

                    name_attr = d3_radviz.data().attributes[0].id
                    d3_radviz.setColorClassification()
                    d3_radviz.setColorClassification(name_attr)
                    d3_radviz.data(currentdataset, name_attr)
                    system.data.load(dat, DATASET_NAME);
                } else {
                    d3_radviz.data(currentdataset)
                    system.data.load(dat, DATASET_NAME);
                }

            }
            if (but == 'radio') {

                name_attr = d.value

                d3_radviz.data(currentdataset, name_attr)
                d3_radviz.setColorClassification(name_attr)
                system.data.load(dat, DATASET_NAME);
            }



            system.structure.initializeForce();
            system.structure.initializeRadar();
            system.structure.initializeForceAxes(d3_radviz.data().angles);
            system.structure.initializeRadarAxes(d3_radviz.data().angles);


            let f_context_menu = function(_) {
                system.structure.initializeForceAxes(_);
                system.structure.initializeRadarAxes(_);
                system.radar.changeRadar(_);
            }
            let f_click = function(a, b, c) {

                system.radar.drawRadar(a, b, c);
                system.structure.uploadProgressBar();

            }

            let f_drag_end = function(a) {
                system.structure.initializeForceAxes(a);
                system.structure.initializeRadarAxes(a);
                system.radar.changeRadar(a);

            }

            let f_mouse_over = function(a, b) {
                
                //system.spring.drawForce(a, b);

                var div = d3.select(".tooltip")
                div.transition()
                    .duration(200)
                    .style("opacity", .9)

                .delay(500);
                div.html('(' + b.x1.toFixed(2) + ',' + b.x2.toFixed(2) + ')<br> EE: ' + b.errorE.toFixed(2) + '<br> <font size="1">PR: '+ b.representativeSimilarity.toFixed(3)+'</font>')
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 50) + "px")
                    .style("color", "white")
                    .style("background", "black")
            }

            let f_mouse_out = function() {

                d3.selectAll(".lineforce").remove();
                var div = d3.select(".tooltip")
                div.transition()
                    .duration(50)
                    .style("opacity", 0);
            }
            d3_radviz.setFunctionClick(f_click);
            d3_radviz.setFunctionMouseOver(f_mouse_over);
            d3_radviz.setFunctionMouseOut(f_mouse_out);
            d3_radviz.setFunctionDragEnd(f_drag_end);
            d3_radviz.setFunctionContextMenu(f_context_menu);

            system.structure.legenda_cluster(Array.from(new Set(d3_radviz.data().attributes.filter(function(pilot) {
                return pilot.id === name_attr
            }).map(d => d.values)[0])))
            const set = d3_radviz.data().dimensions.map(d => d.values)
            d3.select('#container').call(d3_radviz);
            system.structure.uploadProgressBar();

        })

    }

    this.choiceDimensionsNewDataset_upload = function(d, dat, but) {


        let dataset = d3.csvParse(system.uploadedfile.readDataUploaded(dat))


        if (but == 'check') {
            if (!d.checked) {
                if (dimensions_removed.indexOf(d.value) == -1) {
                    dimensions_removed.push(d.value);
                }
            } else {

                let indx = dimensions_removed.indexOf(d.value)
                if (indx > -1)
                    dimensions_removed.splice(indx, 1)
                else
                    attr_removed = []

                let ind_clas = attr_removed.indexOf(d.value)
                if (ind_clas > -1) {
                    attr_removed = []
                }


            }


        }
        if (but == 'radio') {
            if (attr_removed.indexOf(d.value) > -1) attr_removed = []
            else attr_removed = [d.value]

        }

        dataset.forEach(element => {
            dimensions_removed.forEach(dd => {
                if (attr_removed.indexOf(dd) == -1) {
                    delete dataset.columns[dataset.columns.indexOf(dd)]
                    delete element[dd];
                }
            })
        });


        if (but == 'check') {


            if (attr_removed != []) {
                name_attr = attr_removed[0]
                d3_radviz.data(dataset, name_attr)
                d3_radviz.setColorClassification(name_attr)
                system.data.load(dat, DATASET_NAME);

            } else if (d3_radviz.data().attributes.length != 0) {

                name_attr = d3_radviz.data().attributes[0].id
                d3_radviz.setColorClassification()
                d3_radviz.setColorClassification(name_attr)
                d3_radviz.data(dataset, name_attr)
                system.data.load(dat, DATASET_NAME);
            } else {
                d3_radviz.data(dataset)
                system.data.load(dat, DATASET_NAME);
            }

        }
        if (but == 'radio') {

            name_attr = d.value

            d3_radviz.data(dataset, name_attr)
            d3_radviz.setColorClassification(name_attr)
            system.data.load(dat, DATASET_NAME);
        }


        name_attr = DATASET_NAME.substring(DATASET_NAME.indexOf('(') + 1, DATASET_NAME.length - 1)
        d3_radviz.setColorClassification(name_attr)
        system.data.load_upload(dat, DATASET_NAME);
        system.structure.initializeForce();
        system.structure.initializeRadar();
        system.structure.initializeForceAxes(d3_radviz.data().angles);
        system.structure.initializeRadarAxes(d3_radviz.data().angles);


        let f_context_menu = function(_) {
            //system.structure.initializeForceAxes(_);
            //system.structure.initializeRadarAxes(_);
            //system.radar.changeRadar(_);
        }
        let f_click = function(a, b, c) {
            //system.radar.drawRadar(a, b, c);
            //system.structure.uploadProgressBar();

        }

        let f_drag_end = function(a) {
            //system.structure.initializeForceAxes(a);
            //system.structure.initializeRadarAxes(a);
            //system.radar.changeRadar(a);

        }

        let f_mouse_over = function(a, b) {
            
            //system.spring.drawForce(a, b);

            var div = d3.select(".tooltip")
            div.transition()
                .duration(200)
                .style("opacity", .9)

            .delay(500);
            div.html('(' + b.x1.toFixed(2) + ',' + b.x2.toFixed(2) + ')<br> EE: ' + b.errorE.toFixed(2) + '<br> <font size="1">PR: '+ b.representativeSimilarity.toFixed(3)+'</font>')
                .style('left', (d3.event.pageX) + 'px')
                .style('top', (d3.event.pageY - 50) + 'px')
                .style('color', 'white')
                .style('background', 'black')
        }

        let f_mouse_out = function() {
            d3.selectAll(".lineforce").remove();
            var div = d3.select(".tooltip")
            div.transition()
                .duration(50)
                .style("opacity", 0);
        }
        d3_radviz.setFunctionClick(f_click)
        d3_radviz.setFunctionMouseOver(f_mouse_over)
        d3_radviz.setFunctionMouseOut(f_mouse_out)
        d3_radviz.setFunctionDragEnd(f_drag_end)
        d3_radviz.setFunctionContextMenu(f_context_menu)

        system.structure.legenda_cluster(Array.from(new Set(d3_radviz.data().attributes.filter(function(pilot) {
            return pilot.id === name_attr
        }).map(d => d.values)[0])))
        const set = d3_radviz.data().dimensions.map(d => d.values)
        d3.select('#container').call(d3_radviz);
        system.structure.uploadProgressBar();
        document.getElementById("btn_min_disposition").style.display = "none";
        document.getElementById("btn_max_disposition").style.display = "none";
        document.getElementById("btn_dependent_da_disposition").style.display = "none";
        document.getElementById("btn_independent_da_disposition").style.display = "none";
        document.getElementById("btn_vizrank_disposition").style.display = "none";
        document.getElementById("btn_radviz_pp_disposition").style.display = "none";
        document.getElementById("btn_t_statistic_disposition").style.display = "none";



    }

    this.initializeDB = (name_dataset,technique,cluster,selectedpoint,interaction) => {
        system.data.original_dimensions = '';
        //system.settings.cleanVisualization(); DA REINSERIRE
        //system.settings.resetVariables(); DA REINSERIRE

        
        d3_radviz.remove(true);
        system.data.nameDataset = name_dataset
     

        //system.settings.newDataset(system.data.LINK_SERVER +'data/' + name_dataset + '.csv', name_dataset);

        document.getElementById('lazoselection').checked = false
        d3_radviz = d3.radviz()

        d3.csv(system.data.LINK_SERVER +'data/' + name_dataset + '.csv').then(dataset => {

            DATASET_NAME = name_dataset
            let label_dataset = ''
            let namedataset = system.data.nameDataset
            let start_label = -1
            let end_label = -1
    
            label_dataset = namedataset
            if (label_dataset.indexOf('-') > 0) {
                start_label = label_dataset.indexOf('-') + 1
                label_dataset = label_dataset.substring(start_label)
            }
    
            if (label_dataset.indexOf('(') > 0) {
                end_label = label_dataset.indexOf('(')
                label_dataset = label_dataset.substring(0, end_label)
            } else if (label_dataset.indexOf('.') > 0) {
                end_label = label_dataset.indexOf('.')
                label_dataset = label_dataset.substring(0, end_label)
            }

            dimensions_removed = []
            attr_removed = []

            if (DATASET_NAME.indexOf('(') > 0) {
                name_attr = DATASET_NAME.substring(DATASET_NAME.indexOf('(') + 1, DATASET_NAME.indexOf(')'));
                ORIGINAL_CLASSIFIED = true
            }

            d3_radviz.data(dataset, name_attr)
            if (d3_radviz.data().attributes.length != 0) {
                name_attr = d3_radviz.data().attributes[0].id
                d3_radviz.setColorClassification()
                d3_radviz.setColorClassification(name_attr)
                ORIGINAL_CLASSIFIED = true

            } else if (DATASET_NAME.indexOf('(') > 0) {
                name_attr = DATASET_NAME.substring(DATASET_NAME.indexOf('(') + 1, DATASET_NAME.indexOf(')'));
                d3_radviz.setColorClassification(name_attr);
                ORIGINAL_CLASSIFIED = true

            } else {
                ORIGINAL_CLASSIFIED = false
            }

            //document.getElementById('avg-similarity').innerHTML = `<b>Avg ReprSimilarity: ${d3.mean(d3_radviz.data().entries, d => d.representativeSimilarity).toFixed(4)}</b>`
    
            system.data.load( system.data.LINK_SERVER + "data/" + name_dataset + ".csv", name_dataset);
       


            let f_context_menu = function(_) {

            }
            let f_click = function(a, b, c) {
                
                console.log('A',a,'B',b,'C',c)
                b.selected = !b.selected
                
                console.log(interaction)
                
                c.style('fill','black')

            }

            let f_drag_end = function(a) {
                

            }

            let f_mouse_over = function(a, b) {

                // #T_Budget-1618307108588

                
                console.log('mouse',a,b)
                Object.keys(b.dimensions).forEach(dim => {

                    // aggiungo i valori normalizzati
                let current_label_text = d3.select('#T_' + dim.replace(' ','') + '-'+ d3_radviz.getIndex())
                current_label_text.append('tspan')
                    .attr('class', 'norm-value-anchor')
                    .attr('x', current_label_text.attr('x'))
                    .attr('y', Number(current_label_text.attr('y'))+3)
                    .style('fill','white')
                    .html(
                        b.dimensions[dim].toFixed(4)
                    )
                })

                d3.selectAll('.norm-value-anchor').transition()
                    .duration(200)
                    .style('fill','black')
                    .delay(500);
                // cambio il colore delle labels
             d3.selectAll('.attr_label-' + d3_radviz.getIndex())
             .transition().duration(200)
                .style('fill','grey')
                .delay(500);

                // faccio vedere il tooltip
                var div = d3.select(".tooltip")
                div.transition()
                    .duration(200)
                    .style("opacity", .9)
                    .delay(500);
                
                let str = `Point #${b.id.replace('p', '')}`
                div.html(str)
                .style("left", (d3.event.pageX + 10) + "px")
                    .style("top", (d3.event.pageY - 20) + "px")
                    .style("color", "white")
                    .style("background", "black")
                //

            }

            let f_mouse_out = function() {
                //d3.selectAll(".lineforce").remove();
                var div = d3.select(".tooltip")
                div.transition()
                    .duration(50)
                    .style("opacity", 0);
                
                    d3.selectAll('.attr_label-' + d3_radviz.getIndex()).transition()
                .duration(50)
                    .style('fill','black')
                d3.selectAll('.norm-value-anchor').remove();

            }

            
            //d3_radviz.setFunctionUpdateResults(results1)
            if (interaction != 'none')
                d3_radviz.setFunctionClick(f_click)
            d3_radviz.setFunctionMouseOver(f_mouse_over)
            d3_radviz.setFunctionMouseOut(f_mouse_out)
            //d3_radviz.setFunctionDragEnd(f_drag_end)
            d3_radviz.setFunctionContextMenu(f_context_menu)
            
            if (cluster){
                d3_radviz.showDefaultColor(false)
                d3_radviz.showOutliers(false)
                d3_radviz.setQuality(false)
                
            } else {
                d3_radviz.setDefaultColorPoints('#67a9cf')
                d3_radviz.showDefaultColor(true)
                
            }
    
            //uci- effectiveness_error_heuristic - dependent_da - independent_da - radviz_pp - 
    
            
            if (technique === 'uci' )
                d3_radviz.updateRadviz();
            else if (technique === 'effectiveness_error_heuristic')
                d3_radviz.updateRadviz(d3.radvizDA.minEffectivenessErrorHeuristic(d3_radviz.data()));
            else if (technique === 'dependent_da')
                d3_radviz.updateRadviz(json_data[label_dataset][technique]);
            else if (technique === 'independent_da')
                d3_radviz.updateRadviz(json_data[label_dataset][technique]);
            else if (technique === 'radviz_pp')
                d3_radviz.updateRadviz(json_data[label_dataset][technique]);

            d3_radviz.setRadiusPoints(0.75)
            d3_radviz.setRightClick(false)
            d3_radviz.disableDraggableAnchors(true)
            d3.select('#container').call(d3_radviz);

            if (selectedpoint != ''){
                d3.select('#p_'+selectedpoint+'-'+d3_radviz.getIndex())
                    .raise()
                    .style('fill','#ef8a62')
            }
            
            
        })

        
        
    }

    

    this.removeDimDataset = (d, but) => {
        system.data.original_dimensions = '';
        system.settings.cleanVisualization();
        system.settings.resetVariables();
        let name_dataset = document.querySelector('#select-dataset option:checked').value;
        d3_radviz.remove(true);
        system.data.nameDataset = name_dataset
        system.settings.choiceDimensionsNewDataset(d, system.data.LINK_SERVER + 'data/' + name_dataset + '.csv', but)
    }

    this.start = () => {


        system.structure.initializeSVG();
        system.data.initializeScale();
        //system.structure.initializeForce();
        //system.structure.initializeRadar();


        system.radviz.initializeGrid();
        system.radviz.disegnapuntiedimensioni();
        let tot_distance = 0;

        system.data.points.forEach((p) => {
            system.radviz.calculatePerfectPointDisposition(p, system.data.dimensions_current);
            tot_distance = tot_distance + system.radviz.calculateDistanceDimensions(system.data.dimensions_current, p.order);
        });

        let clusters_array = system.data.points.map((d) => { return d[system.data.cluster_label[system.data.nameDataset]] });

        system.radviz.calculateInformation(system.data.points, system.data.dimensions_current);
        system.structure.initializeForceAxes(system.data.dimensions_current);
        system.structure.initializeRadarAxes(system.data.dimensions_current);
        system.structure.legenda_cluster(clusters_array);

        system.radviz.computeOptimization();

    }


    this.resetVisualization = function() {

        $('button').removeClass('active');
        if (document.querySelector('#select-dataset option:checked').value != '') {
            system.settings.initializeDB();
        } else {
            system.settings.initializeDBUploaded();
        }

        system.structure.uploadProgressBar();
    }

    this.updateRadviz = function(butt, _) {
        $('button').removeClass('active');
        $('#' + butt).addClass('active');

        if (_ == undefined)
            d3_radviz.updateRadviz();
        else
            d3_radviz.updateRadviz(_);

        
    }

    function setup_lasso(){

        // Lasso functions
        var lasso_start = function() {

            lasso.items()
                .style("stroke-width", "0.2");
        };

        var lasso_draw = function() {

            // Style the possible dots
            lasso.possibleItems()
                .style("stroke-width", "0.4")

            // Style the not possible dot
            lasso.notPossibleItems()
                .style("stroke-width", "0.2")
        };

        var lasso_end = function() {
            system.settings.deselectPoints();

            // Style the selected dots
            
            lasso.selectedItems()
                .each((d)=> {
                    system.radar.drawRadar(d3_radviz.data().angles, d, d3.select('#p_' + d.index+'-'+ d3_radviz.getIndex()))
                    //d.selected = true
                })

            lasso.selectedItems()
                .style("stroke", "black")
                .style("stroke-width", "0.4")

            // Reset the style of the not selected dots
            lasso.notSelectedItems().each((d)=> d.selected = false)
            lasso.notSelectedItems()
            .style("stroke", "black")
            .style("stroke-width", "0.2");
            system.structure.uploadProgressBar();
        };

        

        //d3.select('#chart svg').call(lasso);

        var lasso = d3.lasso()
        .closePathSelect(true)
            .closePathDistance(100)
            .items(d3.select(`#points-g-${d3_radviz.getIndex()}`).selectAll('circle'))
            .targetArea(d3.select(`.radviz-svg-${d3_radviz.getIndex()}`))
            .on("start",lasso_start)
            .on("draw",lasso_draw)
            .on("end",lasso_end);
            // Sets the drag area for the lasso on the rectangle #myLassoRect
            d3.select(`.radviz-svg-${d3_radviz.getIndex()}`).call(lasso);
    }

    this.lazoSelection = function () {

    if(document.getElementById('lazoselection').checked) {
        setup_lasso();
    } else {
        d3.select('.lasso').remove();
    }

    }

    this.reprPoint = function(){
        
        if(document.getElementById('representative-point-check').checked) {
            d3_radviz.showRepresentativePoint(true)
        } else {
            d3_radviz.showRepresentativePoint(false)
        }
    }

    this.updateDominance = function(){
        // 
        document.getElementById('dominance-mean-check').checked = false
        if(document.getElementById('dominance-check').checked) {
            d3.select('#grid-g-' + d3_radviz.getIndex()).selectAll("text.attr_label-" + d3_radviz.getIndex())
            .text((d)=> {
                return d.labeldominance.substring(0,10);}
            )
        } else {
            d3.select('#grid-g-' + d3_radviz.getIndex()).selectAll("text.attr_label-" + d3_radviz.getIndex())
            .text(d=>{
                if (d.value.includes(' ')) return d.value.substring(0, d.value.indexOf(' '));
                    else return d.value;
                }
            )
        }
    }

    this.updateDominanceMean = function(){
        document.getElementById('dominance-check').checked = false
        // 
        if(document.getElementById('dominance-mean-check').checked) {
            d3.select('#grid-g-' + d3_radviz.getIndex()).selectAll("text.attr_label-" + d3_radviz.getIndex())
            .text((d)=> {
                return d.labelmeandominance.substring(0,10);}
            )
        } else {
            d3.select('#grid-g-' + d3_radviz.getIndex()).selectAll("text.attr_label-" + d3_radviz.getIndex())
            .text(d=>{
                if (d.value.includes(' ')) return d.value.substring(0, d.value.indexOf(' '));
                    else return d.value;
                }
            )
        }
    }

    return this;
}).call({})