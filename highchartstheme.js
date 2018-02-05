Highcharts.theme = {
    colors: ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', 
             '#FF9655', '#FFF263', '#6AF9C4'],
    chart: {
        spacingBottom: 2,
        spacingTop: 2,
        spacingLeft: 2,
        zoomType: 'x',
        spacingRight: 2,
        marginBottom: 2,
        marginTop: 2,
        marginLeft: 2,
        marginRight: 2,
        backgroundColor: {
            linearGradient: [0, 0, 500, 500],
            stops: [
                [0, 'rgba(255, 255, 255,0.0)'],
                [1, 'rgba(240, 240, 255,0.0)']
            ]
        },
    },
    rangeSelector: {
        buttonTheme: {
            fill:'none',
        },
        buttonPosition: {
            x:5,
            y:250,
        }
    },
    
    title: {
        style: {
            color: '#000',
            font: 'bold 16px "Trebuchet MS", Verdana, sans-serif'
        }
    },
    subtitle: {
        style: {
            color: '#666666',
            font: 'bold 12px "Trebuchet MS", Verdana, sans-serif'
        }
    },

    yAxis : {
        gridLineColor: 'rgb(0,0,0)',
    },

    legend: {
        itemStyle: {
            font: '9pt Trebuchet MS, Verdana, sans-serif',
            color: 'black'
        },
        itemHoverStyle:{
            color: 'gray'
        }   
    }
};

// Apply the theme
Highcharts.setOptions(Highcharts.theme);






// THE GOOD ONE:::
Highcharts.theme = {
    chart: {
        backgroundColor: 'rgba(0,0,0,0)',
        // spacingTop: 2,
        marginTop: 0,
    },
    yAxis : {
        gridLineColor: 'rgb(0,0,0)',
    },
    xAxis : {
        lineColor:'black', 
        // labels: {
        //     y: -20,
        // },
        tickColor:'black',
        // tickPosition:'inside',
    },
    // rangeSelector: {
    //     buttonTheme: {
    //         fill:'none',
    //         color: 'lightgrey',
    //     },
    //     buttonPosition: {
    //         // x:5,
    //         y:-25,
    //     },
    //     states: {
    //         select: {
    //             fill:'none',
    //             style: {
    //                 color:'white',
    //             },
    //         },
    //     },
    // },
    rangeSelector: {
            selected: 1,
            height: 10,
            inputEnabled: false,
            buttonPosition: {
                x:5,
                y:-25,
            },
            buttonTheme: { // styles for the buttons
            fill: 'none',
            stroke: 'none',
            'stroke-width': 0,
            r: 8,
            // style: {
            //     color: '#039',
            //     fontWeight: 'bold'
            // },
            states: {
                hover: {
                },
                select: {
                    fill: 'none',
                    style: {
                        color: 'lightgrey'
                    }
                }
                // disabled: { ... }
            }
        },
        },
    title: {
        align: 'right',
    },
}
Highcharts.setOptions(Highcharts.theme);















Highcharts.theme = {
    colors: ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', 
             '#FF9655', '#FFF263', '#6AF9C4'],
    chart: {
        height:250,
        width:640,
        spacingBottom: 2,
        spacingTop: 2,
        spacingLeft: 2,
        zoomType: 'x',
        spacingRight: 2,
        marginBottom: 2,
        marginTop: 2,
        marginLeft: 2,
        marginRight: 2,
        backgroundColor: {
            linearGradient: [0, 0, 500, 500],
            stops: [
                [0, 'rgba(255, 255, 255,0.0)'],
                [1, 'rgba(240, 240, 255,0.0)']
            ]
        },
    },
    rangeSelector: {
        buttonTheme: {
            fill:'none',
        },
        buttonPosition: {
            x:5,
            y:20,
        }
    },
    rangeSelector: {
            selected: 1,
            height: 10,
            inputEnabled: false,
            buttonTheme: { // styles for the buttons
            fill: 'none',
            stroke: 'none',
            'stroke-width': 0,
            // r: 8,
            // style: {
                // color: '#039',
                // fontWeight: 'bold'
            // },
            states: {
                hover: {
                },
                select: {
                    fill: 'none',
                    style: {
                        color: 'white'
                    }
                }
                // disabled: { ... }
            }
        },
        },
    
    title: {
        style: {
            color: '#000',
        }
    },
    subtitle: {
        style: {
            color: '#666666',
        }
    },

    yAxis : {
        gridLineColor: 'rgb(0,0,0)',
    },
    xAxis : {
        lineColor:'black', 
        labels: {
            y: -20,
        },
        tickColor:'black',
        tickPosition:'inside',
    },
    

    legend: {
        itemStyle: {
            color: 'black'
        },
        itemHoverStyle:{
            color: 'gray'
        }   
    }
};

// Apply the theme
Highcharts.setOptions(Highcharts.theme);

