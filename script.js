"use strict"
require(["esri/Map",
 "esri/views/MapView",
  "esri/layers/FeatureLayer",
  "esri/widgets/Widget",
  "esri/widgets/Expand",
  "esri/widgets/BasemapGallery",
  "esri/widgets/LayerList",
  "esri/widgets/Legend",
  "esri/widgets/Measurement",
  "esri/widgets/Search",
  "dijit/form/Button",
], (Map, MapView, FeatureLayer, Widget, Expand, BasemapGallery, LayerList, Legend, Measurement, Search, Button) => {

    const warPointRenderer = {
        type: "simple",
        symbol: {
          type: "simple-marker",
            size: 6,
            color: "red",
            width: "18px",
            height: "18px",
            outline: { 
                width: 1,
                color: "white"
          }
        }
      }

    const warPointPopup = {
        title: "Bitwa pod {Miejsce}",
        content: "Bitwa odbyłą się {Data}. Wynikiem bitwy było zwycięstwo {zwyc}<img src='{img}'>"
      }


    const featureLayer = new FeatureLayer({
        url: "https://services9.arcgis.com/XzFo5ArWiIwKyBgo/arcgis/rest/services/Bitwy/FeatureServer",
        renderer:warPointRenderer,
        popupTemplate: warPointPopup,
      });

    const map = new Map({
      basemap: "topo-vector",
      layers: [featureLayer]
    });
    
    const view = new MapView({
      container: "map",
      map: map,
      center: [19, 48.5],
      zoom: 6,
    });


    // Widget
    const basemapGalleryWg = new BasemapGallery({
      view: view
    });

    const expWg = new Expand({
      view: view,
      content: basemapGalleryWg
    });

    view.ui.add(expWg, {position: "bottom-left"});
    //Widget LayerList

    const layerList = new LayerList({
      view: view
    });

    const expWgLay = new Expand({
      view: view,
      content: layerList
    });
// Widget Legend
    const legend = new Legend({
      view: view
    });

    const expWgLeg = new Expand({
      view: view,
      content: legend
    });
// Widget measurement
    const measurement = new Measurement({
      view: view,
      activeTool: null
    });


    const element = document.createElement('div');
        element.className = "esri-icon-measure esri-widget--button esri-widget esri-interactive";
        element.addEventListener('click', function() {
          const tool = measurement.activeTool === "distance" ? null : "distance";
          measurement.activeTool = tool;
         }); 
      

    

    
// Widget search
     const search = new Search({
      view: view
    });
    const expWgSearch = new Expand({
      view: view,
      content: search
    });
    
    view.ui.add([expWgLay, expWgLeg, expWgSearch], {position: "top-right"});
    view.ui.add([measurement], {position: "bottom-right"});
    view.ui.add(element, "top-right");



   
    
    


    // Zoom
    document.getElementById("ced").addEventListener("click", function(){
        view.goTo({
            center: [14.157222,  52.855278],
            zoom:8,
          })

    });

    document.getElementById("wol").addEventListener("click", function(){
      view.goTo({
          center: [23.948333,  50.798611],
          zoom:8,
        })

    });

    document.getElementById("gru").addEventListener("click", function(){
      view.goTo({
          center: [20.094444,  53.483333],
          zoom:8,
        })

      });

    document.getElementById("leg").addEventListener("click", function(){
      view.goTo({
        center: [16.222778,  51.145278],
        zoom:8,
      })

    });

    document.getElementById("war").addEventListener("click", function(){
      view.goTo({
        center: [27.883333,  43.216667],
        zoom:8,
      })

    });

  });
