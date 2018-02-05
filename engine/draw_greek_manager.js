console.log('im here! optionsmath.js')

var positions_tablist = []

function BlackScholes(PutCallFlag, S, X, T, r, v) {
  var d1 = (Math.log(S / X) + (r + v * v / 2) * T) / (v * Math.sqrt(T));
  var d2 = d1 - v * Math.sqrt(T);
  if (PutCallFlag === "CALL") {
    return ( S * CND(d1)-X * Math.exp(-r * T) * CND(d2) );
  } else {
    return ( X * Math.exp(-r * T) * CND(-d2) - S * CND(-d1) );
  }
}

/* The cummulative Normal distribution function: */
function CND(x){
  if(x < 0) {
    return ( 1-CND(-x) );
  } else {
    k = 1 / (1 + .2316419 * x);
    return ( 1 - Math.exp(-x * x / 2)/ Math.sqrt(2*Math.PI) * k * (.31938153 + k * (-.356563782 + k * (1.781477937 + k * (-1.821255978 + k * 1.330274429)))) );
  }
}

// GOOD dN()
function dN(x) {
	// whats dN()
	return Math.exp(-0.5 * x ** 2) / Math.sqrt(2 * Math.PI)
}
// GOOD DELTA
function BSM_delta(S, X, t, T, r, v) {
	var d1 = (Math.log(S / X) + (r + v * v / 2) * T) / (v * Math.sqrt(T))
	var delta = CND(d1)
	return delta
}
// CONFIRM THIS PUT DELTA!!!!


function BSM_delta_PUT(S, X, t, T, r, v) {
	var d1 = (Math.log(S / X) + (r + v * v / 2) * T) / (v * Math.sqrt(T))
	var delta = CND(-d1)*(-1)
	return delta
}

// GOOD GAMMA
function BSM_gamma(S, X, t, T, r, v) {
	var d1 = (Math.log(S / X) + (r + v * v / 2) * T) / (v * Math.sqrt(T))
	var gamma = dN(d1) / (S * v * Math.sqrt(T - t))
	return gamma
}
// GOOD THETA
function BSM_theta(S, X, t, T, r, v) {
	var d1 = (Math.log(S / X) + (r + v * v / 2) * T) / (v * Math.sqrt(T))
	var d2 = d1 - v * Math.sqrt(T - t)
	var theta = -(S * dN(d1) * v / (2 * Math.sqrt(T - t)) + r * X * Math.exp(-r * (T - t)) * CND(d2))
	return theta
}
// GOOD RHO
function BSM_rho(S, X, t, T, r, v) {
	var d1 = (Math.log(S / X) + (r + v * v / 2) * T) / (v * Math.sqrt(T))
	var d2 = d1 - v * Math.sqrt(T - t)
	var rho = X * (T - t) * Math.exp(-r * (T - t)) * CND(d2)
	return rho
}
// GOOD VEGA
function BSM_vega(S, X, t, T, r, v) {
	var d1 = (Math.log(S / X) + (r + v * v / 2) * T) / (v * Math.sqrt(T))
	var vega = S * dN(d1) * Math.sqrt(T - t)
	return vega
}







var is_there_st
var is_there_mt
var is_there_sr
var is_there_vy
var is_there_profit
var is_there_delta
var is_there_gamma
var is_there_theta
var is_there_rho
var is_there_vega

function restore_empty_greeks() {
		console.log('restoring the empty greeks')
		is_there_st = false
		is_there_mt = false
		is_there_sr = false
		is_there_vy = false
		is_there_profit = false
		is_there_delta = false
		is_there_gamma = false
		is_there_theta = false
		is_there_rho = false
		is_there_vega = false
}

function redo_positions_tablist(inputer) {
		if (inputer.valueAsNumber < 0) {
				inputer.previousElementSibling.textContent = "SELL"
				inputer.style.borderColor = 'red'
		} else {
				inputer.previousElementSibling.textContent = "BUY"
				inputer.style.borderColor = 'green'
		}
		// window.inputer = inputer
		// console.log(inputer)


		var ror = d3.select('#positions_body')
		var mo = ror.selectAll('tr')
		positions_tablist = []
		mo["_groups"][0]["forEach"](function(x){
				positions_tablist.push(
					[
						x.children[1].innerText,
						x.children[2].innerText,
						x.children[3].innerText,
						x.children[4].innerText,
						x.children[5].innerText,
						x.children[6].innerText,
						x.children[7].innerText,
						x.children[8].firstElementChild.lastElementChild.valueAsNumber,
					]
				)
				// console.log()
		})
		console.log(positions_tablist)
		// x.children[6].innerText
		restore_empty_greeks()
}





var PutCallFlag,S,X,T,t,r,v
function get_that_Contract() {
		PutCallFlag = 'CALL'
		S = 100000
		X = 100000
		T = .01
		t = 0
		r = 0.05
		v = 0.2
		return PutCallFlag,S,X,T,t,r,v
}
function get_that_Contract_UNO() {
		PutCallFlag = 'CALL'
		S = 100000
		X = 100000
		T = 1
		t = 0
		r = 0.05
		v = 0.2
		$('#actual_stockprice')[0].value = S
		$('#actual_volatility')[0].value = v
		$('#actual_date')[0].value = T
		return PutCallFlag,S,X,T,t,r,v
}
function put_actual(S,v,T) {
		$('#actual_stockprice')[0].value = S
		$('#actual_volatility')[0].value = v
		$('#actual_date')[0].value = T
}

function get_that_Contract_DOS() {
		if($('#s2_stockprice')[0].value == '') {
				console.log('hi')
				S = 100000
				v = 0.2
				T = .5
				$('#s2_stockprice')[0].value = S
				$('#s2_volatility')[0].value = v
				$('#s2_date')[0].value = T
		} else {
			S = $('#s2_stockprice')[0].value
			v = $('#s2_volatility')[0].value
			T = $('#s2_date')[0].value
		}
		PutCallFlag = 'CALL'
		X = 100000
		t = 0
		r = 0.05
		return PutCallFlag,S,X,T,t,r,v
}
function get_that_Contract_TRES() {
	if($('#s3_stockprice')[0].value == '') {
			console.log('hi')
			S = 100000
			v = 0.2
			T = .001
			$('#s3_stockprice')[0].value = S
			$('#s3_volatility')[0].value = v
			$('#s3_date')[0].value = T
	} else {
		S = $('#s3_stockprice')[0].value
		v = $('#s3_volatility')[0].value
		T = $('#s3_date')[0].value
	}
	PutCallFlag = 'CALL'
	X = 100000
	t = 0
	r = 0.05
	return PutCallFlag,S,X,T,t,r,v
}
function draw_greek_manager(which_greek) {
	var l1 = 75000
	var l2 = 125000
	var ll = 250
	var klist = d3.range(l1,l2,ll)
	var ksers
	if (which_greek == 'strike') {
		if (is_there_st == true) {
			console.log('I shouldnt be redrawing...')
		} else {
			var ll1 = 75
			var ll2 = 125
			var lll = 0.25
			var lklist = d3.range(ll1,ll2,lll)

			var ksers1 = lklist.map(function(d) {
				PutCallFlag,S,X,T,t,r,v = get_that_Contract_UNO()
				return BlackScholes(PutCallFlag, S, d, T, r, v)
			})
			var ksers2 = lklist.map(function(d) {
				PutCallFlag,S,X,T,t,r,v = get_that_Contract_DOS()
				return BlackScholes(PutCallFlag, S, d, T, r, v)
			})
			var ksers3 = lklist.map(function(d) {
				PutCallFlag,S,X,T,t,r,v = get_that_Contract_TRES()
				return BlackScholes(PutCallFlag, S, d, T, r, v)
			})
			var ksers = [ksers1,ksers2,ksers3]
			draw_greek(which_greek,klist,ksers)
			is_there_st = true
		}
	}
	if (which_greek == 'maturity') {
		// draw matureter
		if (is_there_mt == true) {
			//
		} else {
			var ll1 = .0001
			var ll2 = 1
			var lll = .005
			var lklist = d3.range(ll1,ll2,lll)

			var ksers1 = lklist.map(function(d) {
				PutCallFlag,S,X,T,t,r,v = get_that_Contract_UNO()
				return BlackScholes(PutCallFlag, S, X, d, r, v)
			})
			var ksers2 = lklist.map(function(d) {
				PutCallFlag,S,X,T,t,r,v = get_that_Contract_DOS()
				return BlackScholes(PutCallFlag, S, X, d, r, v)
			})
			var ksers3 = lklist.map(function(d) {
				PutCallFlag,S,X,T,t,r,v = get_that_Contract_TRES()
				return BlackScholes(PutCallFlag, S, X, d, r, v)
			})
			var ksers = [ksers1,ksers2,ksers3]
			draw_greek(which_greek,klist,ksers)
			is_there_mt = true
		}
	}
	if (which_greek == 'short_rate') {
		// draw shortrater
		if (is_there_sr == true) {
			//
		} else {
			var ll1 = 0
			var ll2 = 0.1
			var lll = .0005
			var lklist = d3.range(ll1,ll2,lll)

			var ksers1 = lklist.map(function(d) {
				PutCallFlag,S,X,T,t,r,v = get_that_Contract_UNO()
				return BlackScholes(PutCallFlag, S, X, T, d, v)
			})
			var ksers2 = lklist.map(function(d) {
				PutCallFlag,S,X,T,t,r,v = get_that_Contract_DOS()
				return BlackScholes(PutCallFlag, S, X, T, d, v)
			})
			var ksers3 = lklist.map(function(d) {
				PutCallFlag,S,X,T,t,r,v = get_that_Contract_TRES()
				return BlackScholes(PutCallFlag, S, X, T, d, v)
			})
			var ksers = [ksers1,ksers2,ksers3]
			draw_greek(which_greek,klist,ksers)
			is_there_sr = true
		}
	}
	if (which_greek == 'volatility') {
		// draw volatiliter
		if (is_there_vy == true) {
			//
		} else {
			var ll1 = .01
			var ll2 = .51
			var lll = .0025
			var lklist = d3.range(ll1,ll2,lll)


			var ksers1 = lklist.map(function(d) {
				PutCallFlag,S,X,T,t,r,v = get_that_Contract_UNO()
				return BlackScholes(PutCallFlag, S, X, T, r, d)
			})
			var ksers2 = lklist.map(function(d) {
				PutCallFlag,S,X,T,t,r,v = get_that_Contract_DOS()
				return BlackScholes(PutCallFlag, S, X, T, r, d)
			})
			var ksers3 = lklist.map(function(d) {
				PutCallFlag,S,X,T,t,r,v = get_that_Contract_TRES()
				return BlackScholes(PutCallFlag, S, X, T, r, d)
			})
			var ksers = [ksers1,ksers2,ksers3]
			draw_greek(which_greek,klist,ksers)
			is_there_vy = true
		}
	}
	if (which_greek == 'profit') {
		if (is_there_profit == true) {
			//
		} else {
			//
			// var l1 = 75
			// var l2 = 125
			// var ll = 0.25
			// var klist = d3.range(l1,l2,ll)


			var ksers1 = klist.map(function(d) {
				var sol = 0
				positions_tablist.forEach(function(x) {
						var sol1 = BlackScholes(x[1], d, x[2], x[3], r, v) * x[7]
						sol = sol+sol1
				})
				return sol
			})
			var ksers2 = klist.map(function(d) {
				PutCallFlag,S,X,T,t,r,v = get_that_Contract_DOS()
				// return BlackScholes(PutCallFlag, d, X, T, r, v)
				var sol = 0
				positions_tablist.forEach(function(x) {
						var sol1 = BlackScholes(x[1], d, x[2], T, r, v)  * x[7]
						sol = sol+sol1
				})
				return sol
			})
			var ksers3 = klist.map(function(d) {
				PutCallFlag,S,X,T,t,r,v = get_that_Contract_TRES()
				// return BlackScholes(PutCallFlag, d, X, T, r, v)
				var sol = 0
				positions_tablist.forEach(function(x) {
						var sol1 = BlackScholes(x[1], d, x[2], T, r, v)  * x[7]
						sol = sol+sol1
				})
				return sol
			})
			var ksers = [ksers1,ksers2,ksers3]
			window.ksers = ksers
			draw_greek(which_greek,klist,ksers)
			is_there_profit = true
		}
	}
	if (which_greek == 'delta') {
		if (is_there_delta == true) {
			//
		} else {
			//
			// var l1 = 75
			// var l2 = 125
			// var ll = 0.25
			// var klist = d3.range(l1,l2,ll)


			var ksers1 = klist.map(function(d) {
				PutCallFlag,S,X,T,t,r,v = get_that_Contract_UNO()
				return BSM_delta(d, X, t, T, r, v)
			})
			var ksers2 = klist.map(function(d) {
				PutCallFlag,S,X,T,t,r,v = get_that_Contract_DOS()
				return BSM_delta(d, X, t, T, r, v)
			})
			var ksers3 = klist.map(function(d) {
				PutCallFlag,S,X,T,t,r,v = get_that_Contract_TRES()
				return BSM_delta(d, X, t, T, r, v)
			})
			var ksers = [ksers1,ksers2,ksers3]
			draw_greek(which_greek,klist,ksers)
			is_there_delta = true
		}
	}
	if (which_greek == 'gamma') {
		if (is_there_gamma == true) {
			//
		} else {
			//
			// var l1 = 75
			// var l2 = 125
			// var ll = 0.25
			// var klist = d3.range(l1,l2,ll)


			var ksers1 = klist.map(function(d) {
				PutCallFlag,S,X,T,t,r,v = get_that_Contract_UNO()
				return BSM_gamma(d, X, t, T, r, v)
			})
			var ksers2 = klist.map(function(d) {
				PutCallFlag,S,X,T,t,r,v = get_that_Contract_DOS()
				return BSM_gamma(d, X, t, T, r, v)
			})
			var ksers3 = klist.map(function(d) {
				PutCallFlag,S,X,T,t,r,v = get_that_Contract_TRES()
				return BSM_gamma(d, X, t, T, r, v)
			})
			var ksers = [ksers1,ksers2,ksers3]
			draw_greek(which_greek,klist,ksers)
			is_there_gamma = true
		}
	}
	if (which_greek == 'theta') {
		if (is_there_theta == true) {
			//
		} else {
			//
			// var l1 = 75
			// var l2 = 125
			// var ll = 0.25
			// var klist = d3.range(l1,l2,ll)


			var ksers1 = klist.map(function(d) {
				PutCallFlag,S,X,T,t,r,v = get_that_Contract_UNO()
				return BSM_theta(d, X, t, T, r, v)
			})
			var ksers2 = klist.map(function(d) {
				PutCallFlag,S,X,T,t,r,v = get_that_Contract_DOS()
				return BSM_theta(d, X, t, T, r, v)
			})
			var ksers3 = klist.map(function(d) {
				PutCallFlag,S,X,T,t,r,v = get_that_Contract_TRES()
				return BSM_theta(d, X, t, T, r, v)
			})
			var ksers = [ksers1,ksers2,ksers3]
			draw_greek(which_greek,klist,ksers)
			is_there_theta = true
		}
	}
	if (which_greek == 'rho') {
		if (is_there_rho == true) {
			//
		} else {
			//
			// var l1 = 75
			// var l2 = 125
			// var ll = 0.25
			// var klist = d3.range(l1,l2,ll)


			var ksers1 = klist.map(function(d) {
				PutCallFlag,S,X,T,t,r,v = get_that_Contract_UNO()
				return BSM_rho(d, X, t, T, r, v)
			})
			var ksers2 = klist.map(function(d) {
				PutCallFlag,S,X,T,t,r,v = get_that_Contract_DOS()
				return BSM_rho(d, X, t, T, r, v)
			})
			var ksers3 = klist.map(function(d) {
				PutCallFlag,S,X,T,t,r,v = get_that_Contract_TRES()
				return BSM_rho(d, X, t, T, r, v)
			})
			var ksers = [ksers1,ksers2,ksers3]
			draw_greek(which_greek,klist,ksers)
			is_there_rho = true
		}
	}
	if (which_greek == 'vega') {
		if (is_there_vega == true) {
			//
		} else {
			//
			// var l1 = 75
			// var l2 = 125
			// var ll = 0.25
			// var klist = d3.range(l1,l2,ll)


			var ksers1 = klist.map(function(d) {
				PutCallFlag,S,X,T,t,r,v = get_that_Contract_UNO()
				return BSM_vega(d, X, t, T, r, v)
			})
			var ksers2 = klist.map(function(d) {
				PutCallFlag,S,X,T,t,r,v = get_that_Contract_DOS()
				return BSM_vega(d, X, t, T, r, v)
			})
			var ksers3 = klist.map(function(d) {
				PutCallFlag,S,X,T,t,r,v = get_that_Contract_TRES()
				return BSM_vega(d, X, t, T, r, v)
			})
			var ksers = [ksers1,ksers2,ksers3]
			draw_greek(which_greek,klist,ksers)
			is_there_vega = true
		}
	}
	function draw_greek(which_greek,klist,ksers) {
		klist = klist.map(function(d){return d.toFixed(2)})
		window.varia = Highcharts.chart(which_greek+'_container', {

    title: {
        text: which_greek
    },

    subtitle: {
        enabled:false,
    },

    yAxis: {
        title: {
            text: 'Present Value'
        }
    },
		xAxis: {
				categories: klist,
				title: {text:which_greek}
		},
    legend: {
			// enabled:false
        // layout: 'horizontal',
        align: 'right',
        verticalAlign: 'top',
				horizontalAlign: 'right',
    },
		exporting: {
				enabled:false
		},
    // plotOptions: {
    //     series: {
    //         pointStart: 2010
    //     }
    // },

    series: [{
        name: 'Actual',
        data: ksers[0],
    },{
        name: 'Scenario 1',
        data: ksers[1],
    },{
        name: 'Scenario 2',
        data: ksers[2],
    }]

});
	}

}


if (which_greek == 'profit') {
	if (is_there_profit == true) {
		//
	} else {
		//
		// var l1 = 75
		// var l2 = 125
		// var ll = 0.25
		// var klist = d3.range(l1,l2,ll)


		var ksers1 = klist.map(function(d) {
			var sol = 0
			positions_tablist.forEach(function(x) {
					var sol1 = BlackScholes(x[1], d, x[2], x[3], r, v) * x[7]
					sol = sol+sol1
			})
			return sol
		})
		var ksers2 = klist.map(function(d) {
			PutCallFlag,S,X,T,t,r,v = get_that_Contract_DOS()
			// return BlackScholes(PutCallFlag, d, X, T, r, v)
			var sol = 0
			positions_tablist.forEach(function(x) {
					var sol1 = BlackScholes(x[1], d, x[2], T, r, v)  * x[7]
					sol = sol+sol1
			})
			return sol
		})
		var ksers3 = klist.map(function(d) {
			PutCallFlag,S,X,T,t,r,v = get_that_Contract_TRES()
			// return BlackScholes(PutCallFlag, d, X, T, r, v)
			var sol = 0
			positions_tablist.forEach(function(x) {
					var sol1 = BlackScholes(x[1], d, x[2], T, r, v)  * x[7]
					sol = sol+sol1
			})
			return sol
		})
		var ksers = [ksers1,ksers2,ksers3]
		window.ksers = ksers
		draw_greek(which_greek,klist,ksers)
		is_there_profit = true
	}
}


var c = 0
var proffits = []
var minos = solvarray.filter(function(d){return d>0})
for (var i in minos) {
	var apo = 99750
	var vapo = 100000
	nostra.filter(function(d){
		if (d > apo) {
			if (d < vapo) {
				return d
			} else {}
		} else {}
	}).length

	c++
}

c = 0


var c = 0
var proffits = []
var minos = molvarray.filter(function(d){return d[1]>0})
proffits.push(minos[0][0])
for (var i in minos) {
	if (c < minos.length-1) {
		var apo = minos[c][0]
		var vapo = minos[c+1][0]
		if (vapo - apo > 10) {
			// moffits.push([vapo,apo])
			proffits.push(apo)
			proffits.push(vapo)
		} else {
			//
		}
		c++
	}
}
proffits.push(minos[minos.length-1][0])
var proby_proffits = []
for (var i = 0; i < proffits.length; i=i+2) {
	proby_proffits.push([proffits[i],proffits[i+1]])
	console.log(proffits[i],proffits[i+1])
}


ksers[0].filter(function(d){return d>0})

solvarray.filter(function(d){return d>0}).forEach(function(a,b) {
	if (a == d3.min(solvarray.filter(function(d){return d>0}))) {
			window.mark = [a,b]
		}
			else {}
})

solvarray.filter(function(d){return d<0}).length


var solvalist = d3.range(75000,125000,10)
var ksers1 = solvalist.map(function(d) {
	return BlackScholes(x[1], d, x[2], x[3], r, v) * x[7]
})

var apo = 99750
var vapo = 100000
nostra.filter(function(d){
	if (d > apo) {
		if (d < vapo) {
			return d
		} else {}
	} else {}
}).length

ksers[0].forEach(function(a,b){
	console.log(a,b)
})
