agGrid.initialiseAgGridWithAngular1(angular);
var module = angular.module("myApp", ["agGrid"]);

module.controller("pokecontroller", function($scope) {
    //url del archivo que contiene la data normalizada en formato .json
    const url = "./pokedata.json";
    //definicion de funcion que otorga una clase de css en base a si la o Columna es par o no
    const pokeClass = (e,columnAltColor) => {
      if(!columnAltColor){
        return e.rowIndex%2 === 0 ? 'pokeA pokeCell' : 'pokeB pokeCell'
      }else{
        return e.rowIndex%2 === 0 ? 'pokeC pokeCell' : 'pokeD pokeCell'
      }
      
    }
    /*llamado fetch usando la url previamente definida seguido de una llamada 
    a la api de gridOptions para mostrar los elementos disponibles desde la api
    */
    fetch(url)
    .then(response => response.json())
    .then(data => {
      $scope.gridOptions.api.setRowData(data);
    });
    /*definicion default de las columnas con elementos que todas las columnas 
    tienen asignados en caso de haber excepciones en la definicion individual 
    de cada columna se pueden sobre escribir*/
    const defaultColDef = {
      resizable: true,
      sortable: true,
    }

    /* funcion encargada de obtener el numero del pokemon de la fila 
    (rowActualData.data.number) y hacer la consulta a la pokeapi
    con este numero para obtener una imagen y presentarla como imagen en la columna Image
    */
    const getpokeImageFormatter = () => {
      const pokeImageFormatter = (rowActualData) => {
        console.log(rowActualData.data.number)
        const pokeImg = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${rowActualData.data.number}.png`
        const img = `<img class='pokeImg' src=${pokeImg}>`
        return img
      }
      return pokeImageFormatter;
  }
  

    /*definicion manual de las columnas disponibles 
    estan cuentan multiples opciones para los estilos pudiendo ser una especie de 
    "inline" con cellStyle, otra opcion es definir manual mente una clase y la 
    tercera opcion que en este caso fue la que se uso en la mayoria fue el uso de una funcion
    que recibe un evento con todos los datos de la celda, este es pasado como primer argumento
    a la funcion pokeClass y para añadir un diferenciado de colores entre columnas se añade
    un segundo argumento, este siendo un booleano,
    ademas se el control manual de el ancho para evitar un exceso de ancho al renderizar la
    grilla expandiendo todas las celdas
    */


    const columnDefs = [
        {
          headerName: "#",
          field: "number",
          filter: 'agNumberColumnFilter',
          cellStyle: {'background-color': '#b3e5fc'},
          minWidth: 50,
          maxWidth: 90,
        },
        {
          headerName: "Image",
          field: "Image",
          cellRenderer: 'pokeImageFormatter',
          cellClass: (e) => pokeClass(e,true),
          minWidth: 90,
          maxWidth: 95,
        },
        {
          headerName: "Name",
          field: "Name",
          filter: 'agTextColumnFilter',
          cellClass: (e) => pokeClass(e)
        },
        {
          headerName: "First Type",
          field: "FirstType",
          filter: 'agTextColumnFilter',
          cellClass: (e) => pokeClass(e,true),
          minWidth: 100,
          maxWidth: 140,

        },
        {
          headerName: "Second Type",
          field: "SecondType",
          filter: 'agTextColumnFilter',
          cellClass: (e) => pokeClass(e),
          minWidth: 100,
          maxWidth: 140,

        },
        {
          headerName: "Total",
          field: "Total",
          filter: 'agNumberColumnFilter',
          cellClass: (e) => pokeClass(e,true),
          minWidth: 80,
          maxWidth: 100,


        },
        {
          headerName: "HP",
          field: "HP",
          filter: 'agNumberColumnFilter',
          cellClass: (e) => pokeClass(e),
          minWidth: 80,
          maxWidth: 90,
        },
        {
          headerName: "Attack",
          field: "Attack",
          filter: 'agNumberColumnFilter',
          cellClass: (e) => pokeClass(e,true),
          minWidth: 80,
          maxWidth: 110,

        },
        {
          headerName: "Defense",
          field: "Defense",
          filter: 'agNumberColumnFilter',
          cellClass: (e) => pokeClass(e),
          minWidth: 80,
          maxWidth: 120,
        },
        {
          headerName: "SpAtk",
          field: "SpAtk",
          filter: 'agNumberColumnFilter',
          cellClass: (e) => pokeClass(e,true),
          minWidth: 80,
          maxWidth: 110,
        },
        {
          headerName: "SpDef",
          field: "SpDef",
          filter: 'agNumberColumnFilter',
          cellClass: (e) => pokeClass(e),
          minWidth: 80,
          maxWidth: 110,
        },
        {
          headerName: "Speed",
          field: "Speed",
          filter: 'agNumberColumnFilter',
          cellClass: (e) => pokeClass(e,true),
          minWidth: 80,
          maxWidth: 110,
        },
        {
          headerName: "Legendary",
          field: "Legendary",
          filter: 'agNumberColumnFilter',
          cellClass: (e) => pokeClass(e),
          minWidth: 120,
          maxWidth: 140,
        },

        
    ];
    /*se añaden las opciones de configuracion al objeto gridOptions se dejó en blanco
    el elemento rowData ya que este es llenado por la llamada fetch
    */
    $scope.gridOptions = {
        columnDefs: columnDefs,
        rowData:  [],
        defaultColDef:defaultColDef,
        components:{
          pokeImageFormatter:getpokeImageFormatter()
      }
    };

});
