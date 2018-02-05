
// var thead = table.append('thead')
// for (var i in colas){
// 	thead.append('th').text(colas[i])}
// }
// thead.append('th').text('STRK')
// thead.append('th').text('VOL')
// for (var i in putas){
// 	thead.append('th').text(colas[i])}
// }
// var tbody = table.append('tbody')


// mena = d3.entries(mona)
// expirations = d3.map(mena,function(d){return d.value.time_to_maturity}).keys()


// exp1 = mena.filter(function(d){if (d.value.time_to_maturity == "6"){return d}})
// exp1_calls = exp1.filter(function(d){if (d.value.option_type == "Call"){return d}})
// exp1_puts = exp1.filter(function(d){if (d.value.option_type == "Put"){return d}})

// chain
// for (var i in expirations) {
// 	ttm = expirations[i]
// 	table = chain.append('table').id('ttm'+ttm)
// 	exp1 = mena.filter(function(d){if (d.value.time_to_maturity == ttm){return d}})
// 	strikes = d3.map(exp1_calls,function(d){return d.value.strike}).keys()
// 	exp1_calls = exp1.filter(function(d){if (d.value.option_type == "Call"){return d}})
// 	exp1_puts = exp1.filter(function(d){if (d.value.option_type == "Put"){return d}})
// 	append_headers(table)
// 	tbody = table.append('tbody')
// 	for (var i in strikes) {
// 		strike_row = tbody.append('tr')
// 		stk_call = exp1_calls.filter(function(d){if (d.value.strike == strikes[i]){return d}})

// 	}

// }
// for (var i in expirations) {expirations[i] = Number(expirations[i])}
// expirations = expirations.sort(function(a,b){return a - b})
########
########
var colas = ['CODE','OP','NUM_T','LAST','BID','ASK','THEO']
var putas = ['THEO','BID','ASK','LAST','NUM_T','OP','CODE']



function append_headers(table) {
	var thead = table.append('thead')
	for (var i in colas){
		thead.append('th').text(colas[i])
	}
	thead.append('th').text('STRK')
	thead.append('th').text('VOL')
	for (var i in putas){
		thead.append('th').text(colas[i])
	}
}


mena = d3.entries(mona)
s1 = d3.nest()
  .key(function(d) { return d.value.time_to_maturity; })
  .entries(mena)
s1 = s1.sort(function(a,b){return a.key - b.key})
bomba = d3.select('#mid_pane')
for (var i in s1) {
	table = bomba.append('table')
	append_headers(table)
	tbody = table.append('tbody')
	s1_0 = d3.nest().key(function(d) {return d.value.strike}).entries(s1[i].values).sort(function(a,b){return a.key - b.key})
	for (var j in s1_0) {
	stk_row = tbody.append('tr')
	s1_0_0 = d3.nest().key(function(d) {return d.value.option_type}).entries(s1_0[j].values)
	var pc = 1
	if (s1_0_0[1].key == 'Call') {
		pc = 1
	} else {pc = 0}
	var sec = s1_0_0[pc].values[0].value
	var sec_id = s1_0_0[pc].values[0].key.split(' ')[0]
	var call_id = sec_id
	stk_row.append('td').attr('id',sec_id).text(sec_id)
	stk_row.append('td').attr('id',sec_id+'_open_pos').text(sec.open_pos)
	stk_row.append('td').attr('id',sec_id+'_num_trades').text(sec.num_trades)
	stk_row.append('td').attr('id',sec_id+'_last').text(sec.last)
	stk_row.append('td').attr('id',sec_id+'_bid').text(sec.bid)
	stk_row.append('td').attr('id',sec_id+'_ask').text(sec.ask)
	stk_row.append('td').attr('id',sec_id+'_theo').text(sec.theor_price)
	stk_row.append('td').attr('id',sec_id+'_strike').text(sec.strike)
	stk_row.append('td').attr('id',sec_id+'_volatility').text(sec.volatility)
	if (pc == 1) {pc = 0} else {pc = 1}
	var sec = s1_0_0[pc].values[0].value
	var sec_id = s1_0_0[pc].values[0].key.split(' ')[0]
	var put_id = sec_id
	stk_row.append('td').attr('id',sec_id+'_theo').text(sec.theor_price)
	stk_row.append('td').attr('id',sec_id+'_bid').text(sec.bid)
	stk_row.append('td').attr('id',sec_id+'_ask').text(sec.ask)
	stk_row.append('td').attr('id',sec_id+'_last').text(sec.last)
	stk_row.append('td').attr('id',sec_id+'_num_trades').text(sec.num_trades)
	stk_row.append('td').attr('id',sec_id+'_open_pos').text(sec.open_pos)
	stk_row.append('td').attr('id',sec_id).text(sec_id)
	call_and_put = call_id+'_'+put_id
	stk_row.attr('id',call_and_put)

}
}
#######
########
order_table = d3.select('#orders').append('table')
thead = order_table.append('thead')
thead.append('th').text('Order')
thead.append('th').text('Qty')
thead.append('th').text('Order')
thead.append('th').text('Type')
thead.append('th').text('Strike')
thead.append('th').text('TTM')
thead.append('th').text('Price')


var muna = d3.select("#RI95000BI7D_strike").append("svg").attr("style","position:absolute;width:100%").attr('id','tester').attr("transform","translate(-45,-4)").append("rect").attr("x", 0).attr("y", 0).attr('width',400).attr('height',25).attr('style',"stroke:purple;fill:none;stroke-width:5");

// This is to create the frame when clicking on a security
//

function clicker(aro,aro2) {
        window.aro = aro
        if (aro2 == "Call") {
                stk = aro.id.split('_')[0]+'_strike'
                exo = -362˜
                mexo = -2

        } else {
                stk = aro.id.split('_')[0]+'_volatility'
                stk = d3.select("#"+stk)["_groups"][0][0].previousElementSibling.id
                exo = -45
                mexo = -2
        }
        var frame = d3.select("#"+stk).append("svg")
                        .attr('id',aro.id.split('_')[0]+'_order')
                        .attr("style","position:absolute;width:400px;height:25px")
                        .attr("transform","translate("+exo+","+mexo+")")
                frame.append("rect")
                        .attr("x", 0)
                        .attr("y", 0)
                        .attr('width',400)
                        .attr('height',20)
                        .attr('style',"stroke:purple;fill:none;stroke-width:2")
                frame.append('circle').attr('cx',5).attr('cy',5).attr('r',5).style('fill','purple').attr('transform','translate(350,5)')
                        .on('click',function(d,i,m){
                        				window.chap = m;
                        				console.log(m);
                        				remove_order(m,'svg');
                        				// m[0].parentElement.remove()
                        			});

        connectToTable(aro,aro2)
}

function remove_order(circle,from_where) {
	if (from_where == 'svg') {
		var order = circle[0].parentElement
		d3.select('#'+order.id+'_table').remove()
		d3.select('#'+order.id).remove()
	} else {
		var order = circle.parentElement
		d3.select('#'+order.id.slice(0,-6)).remove()
		d3.select('#'+order.id).remove() 
	}

}
########################
########################

function order_table(){
	window.order_section = d3.select('#orders')
	order_section.append('h3').attr('id','orders_title').text('Order Entry')
	var table = order_section.append('table')
	var thead = table.append('thead')
	var hrow = thead.append('tr')
	hrow.append('th').text('TTM')
	hrow.append('th').text('Side')
	hrow.append('th').text('Qty')
	hrow.append('th').text('Stk')
	hrow.append('th').text('Type')
	hrow.append('th').text('Price')
	window.order_tbody = table.append('tbody').attr('id','order_tbody')
	
}


function connectToTable(aro,otype) {
	var row = order_tbody.append('tr').attr('id',aro.id.split('_')[0]+'_order_table')
	var ttm = aro.parentElement.parentElement.previousElementSibling.previousElementSibling.textContent.split(' ')[0]
	var strike = aro.parentElement.children[6].textContent
	row.append('td').text(Number(ttm))
	var side;
	
	if (otype == 'Call') {
		console.log('call')
	} else {

		if (aro.id.split('_')[1] == 'bid') {
			side = 'Sell'
		} else {
			if (aro.id.split('_')[1] == 'ask') {
				side = 'Buy'
			} else {
				// THEO
			}
		}
	}
	row.append('td').text(side)
	row.append('td').text(10)
	row.append('td').text(Number(strike))
	row.append('td').text(otype)
	row.append('td').text(Number(aro.textContent))
	row.append('td').attr('onclick','remove_order(this)').attr('style','color:red').text('X')
	
}


RI95000BI7D_order_table
RI95000BI7D_order




########
#########
var all_the_strikes = s1_0.map(function(d){return Number(d.key)})
sp = d3.select('#left_col').append('div')
sp.text(115030)

for (var i in all_the_strikes) {
	if ((Number(sp["_groups"][0][0].innerText) > all_the_strikes[i]) && (Number(sp["_groups"][0][0].innerText) < all_the_strikes[Number(i)+1])) {
		var stuko = all_the_strikes[i]
		var stuko2 = all_the_strikes[Number(i)+1]
		console.log(stuko,stuko2)
	}
}

function dont_miss_the_strike(price) {
	var rip = Number($('#RIZ7')[0].children[3].innerHTML)
	if ((rip > stuko) && (rip < stuko2)) {
		// console.log('yes')
	} else {
		for (var i in all_the_strikes) {
	if ((rip > all_the_strikes[i]) && (rip < all_the_strikes[Number(i)+1])) {
		var stuko = all_the_strikes[i]
		var stuko2 = all_the_strikes[Number(i)+1]
		console.log(stuko,stuko2)
		strks = d3.selectAll('.strike')
		strks["_groups"][0].forEach(function(d){if(d.innerText == stuko){console.log(d);atm_line(d)}})
	}
}
	}
}



strks = d3.selectAll('.strike')

function atm_line(row) {
	window.row = row
	d3.select('#'+row.id).append("svg").attr("style","position:absolute;width:720px;height:2px").attr('class','atmline').attr("transform","translate(-362,-4)").append("rect").attr("x", 0).attr("y", 0).attr('width',715).attr('height',2).attr('style',"stroke:red;fill:none;stroke-width:5")
}
strks["_groups"][0].forEach(function(d){if(d.innerText == stuko){console.log(d);atm_line(d)}})

########
#########
exh = d3.select('body').selectAll('.expiration_head')
exh.attr('onclick','close_body(this)')

function close_body(thing) {
	var stk_20
	var stk_50
	var stk_all
	window.thing = thing
	console.log(thing)
	if (thing.nextElementSibling.style.display != 'none') {
		thing.children[0].children[0].colSpan = thing.nextElementSibling.children.length
		thing.nextElementSibling.style.display = 'none'
		thing.nextElementSibling.nextElementSibling.style.display = 'none'
	} else {
		thing.children[0].children[0].colSpan = thing.nextElementSibling.children.length - 3
		stk_20 = d3.select(thing.children[0]).append('th').text(20)
		stk_50 = d3.select(thing.children[0]).append('th').text(50)
		stk_all = d3.select(thing.children[0]).append('th').text('All')
		thing.nextElementSibling.style.display = 'table-header-group'
		thing.nextElementSibling.nextElementSibling.style.display = 'table-row-group'
	}
}



exhr = exh.select('tr')
exhr.append('th').attr('class','strikes_list_button').text(20)
exhr.append('th').attr('class','strikes_list_button').text(50)
exhr.append('th').attr('class','strikes_list_button').text('All')


########
########
function flashRow(flash) {
	window.flash = flash
	for (var i in d3.range(255)) {
		flasher = 255 - i
	}
}
for (var i = d3.range(25).length - 1; i >= 0; i--) {
	// d3.range(25)[i]
	flahser = 'rgb(0,'+i+',0)'
	Thread.sleep(1000)
	// console.log(i)
}



var i = 1;                     //  set your counter to 1

function myLoop () {           //  create a loop function
   setTimeout(function () {    //  call a 3s setTimeout when the loop is called
      console.log(i);          //  your code here
      i++;                     //  increment the counter
      if (i < 255) {            //  if the counter < 10, call the loop function
         myLoop();             //  ..  again which will trigger another 
      }                        //  ..  setTimeout()
   }, 300)
}

myLoop();                      //  start the loop





d3.select('body').selectAll('.strike_selector_col').attr('onclick','strikeViews(this)')
function strikeViews(val) {
console.log(val)
window.val = val 
valks = val.parentElement.parentElement.nextElementSibling.nextElementSibling
atm = d3.select(valks).select('.atmline')
atmrow = atm["_groups"][0][0].parentElement.parentElement
$(atmrow.parentElement).children().hide()
$(atmrow).show()
atmrow_d = atmrow.nextElementSibling
atmrow_u = atmrow.previousElementSibling
$(atmrow_d).show()
$(atmrow_u).show()
if (Number(val.innerText) > 0) {
	var updown = Number(val.innerText)/2-2
	for (var i in d3.range(updown)) {
		atmrow_u = atmrow_u.previousElementSibling
		atmrow_d = atmrow_d.nextElementSibling
		$(atmrow_d).show()
		$(atmrow_u).show()
		console.log(atmrow)
	}
	atmrow_u = atmrow_u.previousElementSibling
	$(atmrow_u).show()
} else {
	$(atmrow.parentElement).children().show()
}


}







function displayStrikes(numb) {
    window.numb = numb 

    var display_body = numb.parentElement.parentElement.nextElementSibling.nextElementSibling

}


########
########
var sofar = []
if (msg.payload.split(',')[0] == 'ri_options') {
	sofar.push(msg)
}

function green_red(a,b) {
	if (a.innerHTML == b) {
		a.innerHTML = b
	} else {
		if (a.innerHTML > b) {
			a.style.color = 'rgb(255,0,0)' 
		} else {
			a.style.color = 'rgb(0,255,0)'
		}
	}
	a.innerHTML = b
}

function locate_the_options(message) {
	var code = message.payload.split(',')[2].split(' ')[0]
	if (code.startsWith('RI')) {
		// $('#'+code+'_bid')[0].innerHTML = message.payload.split(',')[3]
		green_red($('#'+code+'_bid')[0],message.payload.split(',')[3])
		// $('#'+code+'_ask')[0].innerHTML = message.payload.split(',')[4]
		green_red($('#'+code+'_ask')[0],message.payload.split(',')[4])
		// $('#'+code+'_last')[0].innerHTML = message.payload.split(',')
		// $('#'+code+'_last')[0].innerHTML = message.payload.split(',')[5]
		if (message.payload.split(',')[5] < $('#'+code+'_last')[0].innerHTML) {
			$('#'+code+'_last')[0].innerHTML = message.payload.split(',')[5]
			var o = 0;
			var c = 1                     //  set your counter to 1
			var rowcode = $('#'+code+'_last')[0].parentElement.id
			function myLoopR () {        //  create a loop function
			   setTimeout(function () {    //  call a 3s setTimeout when the loop is called
				d3.select('#'+rowcode).attr('style','background-color:rgba(255,'+o+','+o+','+c+')')
			             //  your code here
			      o=o+1;
			      c = c - 0.004                     //  increment the counter
			      if (o < 255) {            //  if the counter < 10, call the loop function
			         myLoopR();             //  ..  again which will trigger another
			      }                        //  ..  setTimeout()
			   }, 1)

			}
			myLoopR();

		} else {
			if (message.payload.split(',')[5] > $('#'+code+'_last')[0].innerHTML) {
				$('#'+code+'_last')[0].innerHTML = message.payload.split(',')[5]
				var o = 0;   
				var c = 1                    //  set your counter to 1
				var rowcode = $('#'+code+'_last')[0].parentElement.id
				function myLoop () {
				          //  create a loop function
				   setTimeout(function () {    //  call a 3s setTimeout when the loop is called
					d3.select('#'+rowcode).attr('style','background-color:rgba('+o+',255,'+o+','+c+')')
				             //  your code here
				      o=o+1;
				      c = c - 0.004                     //  increment the counter
				      if (o < 255) {            //  if the counter < 10, call the loop function
				         myLoop();             //  ..  again which will trigger another
				      }                        //  ..  setTimeout()
				   }, 1)
				   
				}
				myLoop()
			} 
		} 
		$('#'+code+'_num_trades')[0].innerHTML = message.payload.split(',')[6]
		$('#'+code+'_open_pos')[0].innerHTML = message.payload.split(',')[8]
		$('#'+code+'_open_pos')[0].parentElement.children[7].innerHTML = Number(message.payload.split(',')[9]).toFixed(2)
		$('#'+code+'_theo')[0].innerHTML = message.payload.split(',')[10]
		
	}
}




var o = 0;                     //  set your counter to 1
var rowcode = 'RI95000BI7D_RI95000BU7D'
function myLoop () {
var o = window.o           //  create a loop function
   setTimeout(function () {    //  call a 3s setTimeout when the loop is called
	d3.select('#'+rowcode).attr('style','background-color:rgb('+o+',255,'+o+')')
             //  your code here
      o=o+1;                     //  increment the counter
      if (o < 255) {            //  if the counter < 10, call the loop function
         myLoop();             //  ..  again which will trigger another
      }                        //  ..  setTimeout()
   }, 1)
}
myLoop()

var o = 0;                     //  set your counter to 1
var rowcode = 'RI95000BI7D_RI95000BU7D'
function myLoopR () {        //  create a loop function
   setTimeout(function () {    //  call a 3s setTimeout when the loop is called
	d3.select('#'+rowcode).attr('style','background-color:rgb(255,'+o+','+o+')')
             //  your code here
      o=o+1;                     //  increment the counter
      if (o < 255) {            //  if the counter < 10, call the loop function
         myLoopR();             //  ..  again which will trigger another
      }                        //  ..  setTimeout()
   }, 1)
}
myLoopR(); 

var o = 0;                     //  set your counter to 1
var rowcode = 'RI95000BI7D_RI95000BU7D'
function myLoopE () {        //  create a loop function
   setTimeout(function () {    //  call a 3s setTimeout when the loop is called
	d3.select('#'+rowcode).attr('style','background-color:rgb('+o+','+o+',255)')
             //  your code here
      o=o+1;                     //  increment the counter
      if (o < 255) {            //  if the counter < 10, call the loop function
         myLoopE();             //  ..  again which will trigger another
      }                        //  ..  setTimeout()
   }, 1)
}
myLoopE();

function shrinkToggle(smth) {


	function shrinkOn() {
		setTimeout(function() {
			d3.select('#'+section).attr('style',width_or_height+':'+o+'px')
			o = o - 5
			if (o > 30) {
				shrinkOn();
			}
		}, 1)
	}

	function shrinkOff() {
		setTimeout(function() {
			d3.select('#'+section).attr('style',width_or_height+':'+o+'px')
			o = o + 5
			if (o < sec_height) {
				shrinkOff();
			}
		}, 1)
	}

	var ind = smth.attributes.value.value

	if (ind == 1) {
		var o = 250
		var width_or_height = 'height'
		var section = 'orders'
		shrinkOn()
		smth.attributes.value.value = 0
	} else {
		var o = 0
		var sec_height = 250
		var width_or_height = 'height'
		var section = 'orders'
		shrinkOff()
		smth.attributes.value.value = 1
	}
}
d3.select('#orders_title').attr('onclick','shrinkToggle(this)').attr('value',1)


var curr_h = $(close_body_thing.nextElementSibling.nextElementSibling).height()



function close_body(thing) {
	thing = thing.parentElement.parentElement
	window.close_body_thing = thing
	console.log(thing)
	if (thing.nextElementSibling.style.display != 'none') {
		thing.nextElementSibling.style.display = 'none'
		// thing.nextElementSibling.nextElementSibling.style.display = 'none'
		var curr_h = $(thing.nextElementSibling.nextElementSibling).height()
		close_body_thing.nextElementSibling.nextElementSibling.value = curr_h
		var interval = curr_h / 50
		function shrinkOnTable() {
			setTimeout(function() {
				d3.select(section).attr('style',width_or_height+':'+o+'px')
				o = o - interval
				if (o > 0) {
					shrinkOnTable();
				}
			}, 1)
		}
		var o = curr_h
		var width_or_height = 'height'
		var section = thing.nextElementSibling.nextElementSibling
		shrinkOnTable()
		thing.children[0].children[1].hidden = true
		thing.children[0].children[2].hidden = true
		thing.children[0].children[3].hidden = true
		thing.children[0].children[0].colSpan = columns
//		thing.nextElementSibling.style.height = '0px'
//               thing.nextElementSibling.nextElementSibling.style.height = '0px'
//		thing.nextElementSibling.style.overflowY = 'hidden'
//                thing.nextElementSibling.nextElementSibling.style.overflowY = 'hidden'
	} else {
		thing.children[0].children[0].colSpan = columns - 3
		thing.children[0].children[1].hidden = false
                thing.children[0].children[2].hidden = false
                thing.children[0].children[3].hidden = false
		thing.nextElementSibling.style.display = 'table-header-group'
		// thing.nextElementSibling.nextElementSibling.style.display = 'table-row-group'
		var curr_h = $(close_body_thing.nextElementSibling.nextElementSibling).val()
		var interval = curr_h / 50
		function shrinkOffTable() {
			setTimeout(function() {
				d3.select(section).attr('style',width_or_height+':'+o+'px')
				o = o + interval
				if (o < curr_h) {
					shrinkOffTable();
				}
			}, 1)
		}
		var o = 0
		var width_or_height = 'height'
		var section = thing.nextElementSibling.nextElementSibling
		shrinkOffTable()
	}
}
function close_body(thing) {
	thing = thing.parentElement.parentElement
	window.close_body_thing = thing
	console.log(thing)
	if (thing.nextElementSibling.style.display != 'none') {
		thing.nextElementSibling.style.display = 'none'
		// thing.nextElementSibling.nextElementSibling.style.display = 'none'
		var curr_h = $(thing.nextElementSibling.nextElementSibling).height()
		thing.nextElementSibling.nextElementSibling.value = curr_h
		d3.select(thing.nextElementSibling.nextElementSibling).attr('class','open_table_not')
		var interval = curr_h / 50
		function shrinkOnTable() {
			setTimeout(function() {
				d3.select(section).attr('style',width_or_height+':'+o+'px')
				o = o - interval
				if (o > 0) {
					shrinkOnTable();
				}
			}, 1)
		}
		var o = curr_h
		var width_or_height = 'height'
		var section = thing.nextElementSibling.nextElementSibling
		shrinkOnTable()
		thing.children[0].children[1].hidden = true
		thing.children[0].children[2].hidden = true
		thing.children[0].children[3].hidden = true
		thing.children[0].children[0].colSpan = columns
//		thing.nextElementSibling.style.height = '0px'
//               thing.nextElementSibling.nextElementSibling.style.height = '0px'
//		thing.nextElementSibling.style.overflowY = 'hidden'
//                thing.nextElementSibling.nextElementSibling.style.overflowY = 'hidden'
	} else {
		thing.children[0].children[0].colSpan = columns - 3
		thing.children[0].children[1].hidden = false
                thing.children[0].children[2].hidden = false
                thing.children[0].children[3].hidden = false
		thing.nextElementSibling.style.display = 'table-header-group'
		// thing.nextElementSibling.nextElementSibling.style.display = 'table-row-group'
		var curr_h = $(thing.nextElementSibling.nextElementSibling).val()
		var interval = curr_h / 50
		function shrinkOffTable() {
			setTimeout(function() {
				d3.select(section).attr('style',width_or_height+':'+o+'px')
				o = o + interval
				if (o < curr_h) {
					shrinkOffTable();
				}
			}, 1)
		}
		var o = 0
		var width_or_height = 'height'
		var section = thing.nextElementSibling.nextElementSibling
		shrinkOffTable()
		d3.select(thing.nextElementSibling.nextElementSibling).attr('class','open_table')
	}
}


order_totals = order_section_row.append('div').attr('class','col').attr('id','order_totals')
order_totals.append('table').attr('id','order_totals_table')
var thead = d3.select('#order_totals_table').append('thead')
thead.append('th')
thead.append('th').text('DELTA')
thead.append('th').text('GAMMA')
thead.append('th').text('THETA')
thead.append('th').text('VEGA')
var tbody = d3.select('#order_totals_table').append('tbody')
tbody.append('td')
tbody.append('td').text()
tbody.append('td').text()
tbody.append('td').text()
tbody.append('td').text()




table {
	display:block

}
thead {
	display:table
}
tbody {
	display:table
}
th {
	min-width:20px
}



$('#'+msg.payload.split(',')[2].split(' ')[0].replace(/\./g,''))[0].children[1].innerHTML = msg.payload.split(',')[3]
$('#'+msg.payload.split(',')[2].split(' ')[0].replace(/\./g,''))[0].children[2].innerHTML = msg.payload.split(',')[4]
$('#'+msg.payload.split(',')[2].split(' ')[0].replace(/\./g,''))[0].children[3].innerHTML = msg.payload.split(',')[5]
########
########


function atm_manager(thing) {
	window.gangsta = thing
	console.log('here')
}

function idk() {

}




########
#########


s1_0 = d3.nest().key(function(d) {return d.value.strike}).entries(s1[0].values).sort(function(a,b){return a.key - b.key})
// s1_0.forEach(function(d){console.log(d)})

for (var j in s1_0) {
	stk_row = tbody.append('tr')
	s1_0_0 = d3.nest().key(function(d) {return d.value.option_type}).entries(s1_0[j].values)
	var pc = 1
	if (s1_0_0[1].key == 'Call') {
		pc = 1
	} else {pc = 0}
	var sec = s1_0_0[pc].values[0].value
	var sec_id = s1_0_0[pc].values[0].key.split(' ')[0]
	stk_row.append('td').attr('id',sec_id).text(sec_id)
	stk_row.append('td').attr('id',sec_id+'_open_pos').text(sec.open_pos)
	stk_row.append('td').attr('id',sec_id+'_num_trades').text(sec.num_trades)
	stk_row.append('td').attr('id',sec_id+'_last').text(sec.last)
	stk_row.append('td').attr('id',sec_id+'_bid').text(sec.bid)
	stk_row.append('td').attr('id',sec_id+'_ask').text(sec.ask)
	stk_row.append('td').attr('id',sec_id+'_theo').text(sec.theor_price)
	stk_row.append('td').attr('id',sec_id+'_strike').text(sec.strike)
	stk_row.append('td').attr('id',sec_id+'_volatility').text(sec.volatility)
	if (pc == 1) {pc = 0} else {pc = 1}
	var sec = s1_0_0[pc].values[0].value
	var sec_id = s1_0_0[pc].values[0].key.split(' ')[0]
	stk_row.append('td').attr('id',sec_id+'_theo').text(sec.theor_price)
	stk_row.append('td').attr('id',sec_id+'_bid').text(sec.bid)
	stk_row.append('td').attr('id',sec_id+'_ask').text(sec.ask)
	stk_row.append('td').attr('id',sec_id+'_last').text(sec.last)
	stk_row.append('td').attr('id',sec_id+'_num_trades').text(sec.num_trades)
	stk_row.append('td').attr('id',sec_id+'_open_pos').text(sec.open_pos)
	stk_row.append('td').attr('id',sec_id).text(sec_id)
}


s1_0_0 = d3.nest().key(function(d) {return d.value.option_type}).entries(s1_0[j].values)
var pc = 1
if (s1_0_0[1].key == 'Call') {
	pc = 1
} else {pc = 0}
var sec = s1_0_0[pc].values[0].value
var sec_id = s1_0_0[pc].values[0].key.split(' ')[0]
tbody.append('td').attr('id',sec_id).text(sec_id)
tbody.append('td').attr('id',sec_id+'_open_pos').text(sec.open_pos)
tbody.append('td').attr('id',sec_id+'_num_trades').text(sec.num_trades)
tbody.append('td').attr('id',sec_id+'_last').text(sec.last)
tbody.append('td').attr('id',sec_id+'_bid').text(sec.bid)
tbody.append('td').attr('id',sec_id+'_ask').text(sec.ask)
tbody.append('td').attr('id',sec_id+'_theo').text(sec.theor_price)
tbody.append('td').attr('id',sec_id+'_strike').text(sec.strike)
tbody.append('td').attr('id',sec_id+'_volatility').text(sec.volatility)
if (pc == 1) {pc = 0} else {pc = 1}
var sec = s1_0_0[pc].values[0].value
var sec_id = s1_0_0[pc].values[0].key.split(' ')[0]
tbody.append('td').attr('id',sec_id+'_theo').text(sec.theor_price)
tbody.append('td').attr('id',sec_id+'_bid').text(sec.bid)
tbody.append('td').attr('id',sec_id+'_ask').text(sec.ask)
tbody.append('td').attr('id',sec_id+'_last').text(sec.last)
tbody.append('td').attr('id',sec_id+'_num_trades').text(sec.num_trades)
tbody.append('td').attr('id',sec_id+'_open_pos').text(sec.open_pos)
tbody.append('td').attr('id',sec_id).text(sec_id)







// SITE WORKS FINE WITH NONE OF THE ABOVE CONSOLED IN

function updateTotals(garg) {
	console.log(garg)
	window.garg = garg
	window.qty = d3.select(garg)["_groups"][0][0].value
	qty = Number(qty)
	var code = garg.id.split('_')[0]

	var bgop = d3.select('#'+code+'_bgop')
	bgop.text((Number(margins[code]["bgop"]) * qty).toFixed(0))
	var bgonp = d3.select('#'+code+'_bgonp')
	bgonp.text((Number(margins[code]["bgonp"]) * qty).toFixed(0))
	var buydepo = d3.select('#'+code+'_buydepo')
	buydepo.text((Number(margins[code]["buydepo"]) * qty).toFixed(0))

	delt = d3.select('#'+code+'_delta')["_groups"][0][0].attributes.value.value
	delt = Number(delt)
	delt = delt * qty
	gamm = d3.select('#'+code+'_gamma')["_groups"][0][0].attributes.value.value
	gamm = gamm * qty
	gamm = Number(gamm)
	thet = d3.select('#'+code+'_theta')["_groups"][0][0].attributes.value.value
	thet = thet * qty
	thet = Number(thet)
	veg = d3.select('#'+code+'_vega')["_groups"][0][0].attributes.value.value
	veg = veg * qty
	veg = Number(veg)

	// d3.selet('#mr_sum').text()

	gtkrow = d3.select('#'+code+'_greeks').selectAll('td')
	gtkrow["_groups"][0][0].innerText = Number(delt).toFixed(2)
	gtkrow["_groups"][0][1].innerText = Number(gamm).toFixed(2)
	gtkrow["_groups"][0][2].innerText = Number(thet).toFixed(0)
	gtkrow["_groups"][0][3].innerText = Number(veg).toFixed(0)

	calculateTotals()
}






function connectToTable(aro,otype) {
	var code = aro.id.split('_')[0]
	var coda = aro.id.split('_')[0]
	var ttm = aro.parentElement.parentElement.previousElementSibling.previousElementSibling.textContent.split(' ')[0]
	var strike = aro.parentElement.id.split('_')[2]
	var qty
	dc = dc * (qty * Number(aro.textContent))
	var side;
	var dc;
	var go

	if (otype == 'Call') {
		console.log('call')
	} else {

		if (aro.id.split('_')[1] == 'bid') {
			side = 'Sell'
			dc = 1
		} else {
			if (aro.id.split('_')[1] == 'ask') {
				side = 'Buy'
				dc = -1
			} else {
				alert('Nope, no tradinga at theoretical, tap the bid or ask')
			}
		}
	}

	if ($('#'+code+'_order_table')[0]) {
		qty = Number(d3.select('#'+coda+'_order_qty')["_groups"][0][0].value)

		var bgop = d3.select('#'+code+'_bgop')
		bgop.text((Number(margins[code]["bgop"]) * qty).toFixed(0))
		var bgonp = d3.select('#'+code+'_bgonp')
		bgonp.text((Number(margins[code]["bgonp"]) * qty).toFixed(0))
		var buydepo = d3.select('#'+code+'_buydepo')
		depo.text((Number(margins[code]["buydepo"]) * qty).toFixed(0))
		 
	} else {
		qty = 10
		var row = order_tbody.append('tr').attr('id',aro.id.split('_')[0]+'_order_table')
		row.append('td').text(Number(ttm))
		row.append('td').attr('id',coda+'_order_side').text(side)
		// row.append('td').attr('id',coda+'_order_qty').text(qty)
		row.append('input').attr('id',coda+'_order_qty').attr('class','qty_input').attr('type','number').attr('value',10).attr('onchange','calculateTotals(this)')
		row.append('td').attr('id',coda+'_order_strike').text(Number(strike))
		row.append('td').attr('id',coda+'_order_otype').text(otype)
		row.append('td').attr('id',coda+'_order_price').text(Number(aro.textContent))
		row.append('td').attr('onclick','remove_order(this)').attr('style','color:red').text('X')	
		row.attr('value',dc).attr('onchange','connectToTable()')

		var tots = d3.select('#order_margins_table').select('tbody').append('tr').attr('id',code+'_margins')
		tots.append('td').text(code)
		var bgop = tots.append('td').attr('id',code+'_bgop').text((Number(margins[code]["bgop"]) * qty).toFixed(0))
		var bgonp = tots.append('td').attr('id',code+'_bgonp').text((Number(margins[code]["bgonp"]) * qty).toFixed(0))
		var buydepo = tots.append('td').attr('id',code+'_buydepo').text((Number(margins[code]["buydepo"]) * qty).toFixed(0))
		 
	}

	
	if (side == 'Buy') {
		buydepo.attr('style','color:rgb(0,255,0)')
		go = margins[code]["buydepo"] * qty
	} else {
		bgop.attr('style','color:rgb(0,255,0)')
		go = margins[code]["bgop"] * qty
	}
	tots.attr('value',go)

	delt = d3.select('#'+code+'_delta')["_groups"][0][0].attributes.value.value
	delt = delt * qty
	gamm = d3.select('#'+code+'_gamma')["_groups"][0][0].attributes.value.value
	gamm = gamm * qty
	thet = d3.select('#'+code+'_theta')["_groups"][0][0].attributes.value.value
	thet = thet * qty
	veg = d3.select('#'+code+'_vega')["_groups"][0][0].attributes.value.value
	veg = veg * qty

	if ($('#'+code+'_greeks')[0]) {
		console.log('you')
		gtkrow = d3.select('#'+code+'_greeks').selectAll('td')
		gtkrow["_groups"][0][0].innerText = Number(delt).toFixed(2)
		gtkrow["_groups"][0][0].innerText = Number(gamm).toFixed(2)
		gtkrow["_groups"][0][0].innerText = Number(thet).toFixed(0)
		gtkrow["_groups"][0][0].innerText = Number(veg).toFixed(0)

	} else {
		gkt = d3.select('#order_totals_table').select('tbody')
		gtkrow = gkt.append('tr').attr('id',code+'_greeks')
		gtkrow.append('td').text(Number(delt).toFixed(2))
		gtkrow.append('td').text(Number(gamm).toFixed(2))
		gtkrow.append('td').text(Number(thet).toFixed(0))
		gtkrow.append('td').text(Number(veg).toFixed(0))
	}

	calculateTotals()

}



function remove_order(circle,from_where) {
	if (from_where == 'svg') {
		var order = circle[0].parentElement
		d3.select('#'+order.id+'_table').remove()
		d3.select('#'+order.id).remove()
	} else {
		var order = circle.parentElement
		d3.select('#'+order.id.slice(0,-6)).remove()
		d3.select('#'+order.id).remove() 
	}
	d3.select('#'+order.id.split('_')[0]+'_margins').remove()
	d3.select('#'+order.id.split('_')[0]+'_greeks').remove()
	calculateTotals()
}

function calculateTotals() {
	var tb = d3.select('#order_margins_table').select('tbody')
	var tb2 = d3.select('#order_tbody')
	var sum = 0
	for (var i = 0; i < tb["_groups"][0][0].children.length; i++) {
		p = Number(tb["_groups"][0][0].children[i].attributes.value.value)
		q = Number(d3.select(tb2["_groups"][0][0].children[i]).select('.qty_input')["_groups"][0][0].value)
		sum = sum + (p * q)
		console.log(sum+'_'+q+'_'+'calked')
	}
	// var qty = Number(d3.select(tb["_groups"][0][0].children[i]).select('.qty_input')["_groups"][0][0].value)
	// console.log(sum+'_'+qty+'_'+'calked')
	// sum = sum * qty
	d3.select('#mr_sum').text(sum.toFixed(0))



	
	var sum = 0
	for (var i = 0; i < tb2["_groups"][0][0].children.length; i++) {
		p = Number(tb2["_groups"][0][0].children[i].attributes.value.value)
		q = Number(d3.select(tb2["_groups"][0][0].children[i]).select('.qty_input')["_groups"][0][0].value)
		sum = sum + (p * q)
		console.log(sum+'_'+q+'_'+'calked')
		 // qty = Number(tb["_groups"][0][0].children[i].children[5].innerText)
	}
	// console.log(sum)

	
	d3.select('#dc_sum').text(sum.toFixed(0))

	// Now with the greeks

	var tb = d3.select('#order_totals_table').select('tbody')
	// var sum = 0
	var de = 0
	var ga = 0
	var th = 0
	var vg = 0
	for (var i = 0; i < tb["_groups"][0][0].children.length; i++) {
		 de = de + Number(tb["_groups"][0][0].children[i].children[0].innerText)
		 ga = ga + Number(tb["_groups"][0][0].children[i].children[1].innerText)
		 th = th + Number(tb["_groups"][0][0].children[i].children[2].innerText)
		 vg = vg + Number(tb["_groups"][0][0].children[i].children[3].innerText)
		 
	}
	// console.log(sum)
	d3.select('#delta_sum').text(de.toFixed(2))
	d3.select('#gamma_sum').text(ga.toFixed(2))
	d3.select('#theta_sum').text(th.toFixed(0))
	d3.select('#vega_sum').text(vg.toFixed(0))
}








