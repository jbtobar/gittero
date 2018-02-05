



emin = d3.entries(rts_min)
function devo(data,accessor,window) {
	data = data.slice(data.length-window,data.length)
	return d3.deviation(data, function(d) {return d.value[accessor]})

}
dshrow = dashboard.append('div').attr('class','row')
dashc1 = dshrow.append('div').attr('class','col-3')
dashc2 = dshrow.append('div').attr('class','col-9').attr('id','chartyboy').attr('style','height:250px')
vt = dashc1.append('table').attr('id','volatility_table')
r1 = vt.append('tr')
r1.append('td').attr('id','std_days_value').attr('class','vol_indicator')
r1.append('td').append('input').attr('id','std_days').attr('class','qty_input').attr('type','number').attr('value',360).attr('onchange','devot(this.value)')
r1.append('td').text('day Vol.')
// Standard deviation of annual log returns

function devot(days) {
	var numd = days
	var std = devo(emin,'returns',numd) * Math.sqrt(365)
	std = std * 100
	d3.select('#std_days_value').text(std.toFixed(2))

}
devot(30)



var rea_var = emin.slice(emin.length-1,emin.length)[0].value.rea_var
var rea_vol = emin.slice(emin.length-1,emin.length)[0].value.rea_vol



evol = d3.entries(rvi_min)
var rvi_pc = evol.slice(evol.length - 1,evol.length)[0].value.close
r2 = vt.append('tr')
r2.append('td').attr('id','rvi_pc').attr('value',rvi_pc).attr('class','vol_indicator').text(rvi_pc)
r2.append('td')
r2.append('td').text('RVI')


function devotRank(data,window) {
	data = data.slice(data.length - window, data.length)
	var max = d3.max(data,function(d) {return d.value.close})
	var min = d3.min(data,function(d) {return d.value.close})
	var last = data.slice(data.length - 1, data.length)[0].value.close
	var range = max - min 
	var rank = (last - min) / range
	console.log('rank ' + rank)
	var pcts = data.filter(function(d) {if (d.value.close < last){return d}})
	var pct = pcts.length / data.length
	console.log('Pctle ' + pct)
	return [rank,pct]

}
rp = devotRank(evol,360)

function rankot(days) {
	var numd = days
	rp = devotRank(evol,numd)
	rank = rp[0] * 100
	percentile = rp[1] * 100
	d3.select('#rank_days_value').text(rank.toFixed(2))
	d3.select('#percentile_days_value').text(percentile.toFixed(2))
}


r3 = vt.append('tr')
r3.append('td').attr('id','rank_days_value').attr('class','vol_indicator')
r3.append('td').append('input').attr('id','rank_days').attr('class','qty_input').attr('type','number').attr('value',360).attr('onchange','rankot(this.value)')
r3.append('td').text(' day IVR')

r4 = vt.append('tr')
r4.append('td').attr('id','percentile_days_value').attr('class','vol_indicator')
r4.append('td')
r4.append('td').text(' day IV %')

rankot(30)




//
// HIGHCHARTS
//



var testo = []
evol.forEach(function(d) {
	var dia = new Date(d.key).getTime()
	var m = [dia,d.value.close]

	testo.push(m)
})

vs = {'v1':[],'v2':[],'v3':[],'v4':[],'v5':[]}
d3.entries(snap1).forEach(function(d) {
	d = d.value
	var minuto = d.index
	var m = [minuto,d.vol_1]
	vs['v1'].push(m)
	var m = [minuto,d.vol_2]
	vs['v2'].push(m)
	var m = [minuto,d.vol_3]
	vs['v3'].push(m)
	var m = [minuto,d.vol_4]
	vs['v4'].push(m)
	var m = [minuto,d.vol_5]
	vs['v5'].push(m)
})

function chartyBoyFunk(index) {
	if (index == 'RVI') { var datums = testo }

	window.joni = Highcharts.stockChart('chartyboy', {


        rangeSelector: {
            selected: 1,
			height: 10,
			inputEnabled: false,
			
        },

		navigator: {
			enabled:false
        },
		scrollbar: {
			enabled:false
        },

        title: {
            text: 'RVI Index'
        },
		exporting: { enabled: false },
		// tooltip: {
		// 	enabled:true,
		//     formatter: function () {
	 //            return this.y;
	 //        }
	 //    },

        series: [{
            name: 'RVI Index',
            data: datums,
            type: 'area',
			lineWidth: 1,
            threshold: null,
            tooltip: {
                valueDecimals: 2
            },
            fillColor: {
                linearGradient: {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 1
                },
                stops: [
                    [0, Highcharts.getOptions().colors[0]],
                    [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                ]
            }
        }]
    })
}










function chartyBoyFunkV() {
	// if (index == 'v1') {var datums = vs['v1']; var datums2 = vs['v2']}

	window.joni = Highcharts.stockChart('chartyboy', {


        rangeSelector: {
            selected: 1,
			height: 10,
			inputEnabled: false,
			buttons: [{
			    type: 'minute',
			    count: 60,
			    text: '1m'
				},{
				    type: 'minute',
				    count: 360,
				    text: '6H'
				},{
			    type: 'minute',
			    count: 720,
			    text: '12H'
				},{
			    type: 'hour',
			    count: 24,
			    text: '1D'
				}],
        },
		navigator: {
			enabled:false
        },
		scrollbar: {
			enabled:false
        },

        title: {
            text: 'Volatilities'
        },
        legend: {enabled:true,},
		exporting: { enabled: false },
		// yAxis: {min:0},
		// tooltip: {
		// 	enabled:true,
		//     formatter: function () {
	 //            return this.y;
	 //        }
	 //    },

        series: [{
            name: 'V 1',
            data: vs['v1'],
            // type: 'area',
			lineWidth: 1,
            threshold: null,
            tooltip: {
                valueDecimals: 2
            },
            // fillColor: {
            //     linearGradient: {
            //         x1: 0,
            //         y1: 0,
            //         x2: 0,
            //         y2: 1
            //     },
            //     stops: [
            //         [0, Highcharts.getOptions().colors[0]],
            //         [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
            //     ]
            // }
        },{
            name: 'V 2',
            data: vs['v2'],
            // type: 'area',
			lineWidth: 1,
            threshold: null,
            tooltip: {
                valueDecimals: 2
            },
            // fillColor: {
            //     linearGradient: {
            //         x1: 0,
            //         y1: 0,
            //         x2: 0,
            //         y2: 1
            //     },
            //     stops: [
            //         [0, Highcharts.getOptions().colors[0]],
            //         [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
            //     ]
            // }
        },{
            name: 'V 3',
            data: vs['v3'],
            // type: 'area',
			lineWidth: 1,
            threshold: null,
            tooltip: {
                valueDecimals: 2
            },
            // fillColor: {
            //     linearGradient: {
            //         x1: 0,
            //         y1: 0,
            //         x2: 0,
            //         y2: 1
            //     },
            //     stops: [
            //         [0, Highcharts.getOptions().colors[0]],
            //         [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
            //     ]
            // }
        },{
            name: 'V 4',
            data: vs['v4'],
            // type: 'area',
			lineWidth: 1,
            threshold: null,
            tooltip: {
                valueDecimals: 2
            },
            // fillColor: {
            //     linearGradient: {
            //         x1: 0,
            //         y1: 0,
            //         x2: 0,
            //         y2: 1
            //     },
            //     stops: [
            //         [0, Highcharts.getOptions().colors[0]],
            //         [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
            //     ]
            // }
        },{
            name: 'V 5',
            data: vs['v5'],
            // type: 'area',
			lineWidth: 1,
            threshold: null,
            tooltip: {
                valueDecimals: 2
            },
            // fillColor: {
            //     linearGradient: {
            //         x1: 0,
            //         y1: 0,
            //         x2: 0,
            //         y2: 1
            //     },
            //     stops: [
            //         [0, Highcharts.getOptions().colors[0]],
            //         [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
            //     ]
            // }
        }]
    })
}
