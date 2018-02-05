function runtheGreek(code) {

	var c_or_p = margins[code].optiontype
	var sec = mona[code+" [SPBOPT]"]
	var vol = sec.volatility/100
	var price_step = 10
	var price_step_price = margins[code].pstepval
	var oy = 365
	c_or_p = c_or_p.toLocaleUpperCase()
	var theo = BlackScholes(c_or_p,stockprice,sec.strike,sec.time_to_maturity/oy,r_rate,vol)
	theo = Math.ceil(theo / 10) * 10
	var delta = BSM_delta2(c_or_p,stockprice,sec.strike,0,sec.time_to_maturity/oy,r_rate,vol)
	var gamma = BSM_gamma(stockprice, sec.strike, 0, sec.time_to_maturity/oy, r_rate,vol)
	gamma = gamma * 100

	var theta = BSM_theta(stockprice, sec.strike, 0, sec.time_to_maturity/oy, r_rate,vol)
	theters = theta/price_step/price_step_price * global_margin
	var vega = BSM_vega(stockprice, sec.strike, 0, sec.time_to_maturity/oy, r_rate,vol)
	vega = vega/price_step/price_step_price
	vega =  Math.ceil(vega / 10) * 10
	// console.log(code)
	// console.log('Theo:',theo)
	// console.log('Delta:',delta)
	// console.log('gamma:',gamma)
	// console.log('vega:',vega)
	// console.log('theters:',theters)
	return {'code':code,'c_or_p':c_or_p,'theo':theo,'delta':delta,'gamma':gamma,'vega':vega,'theta':theters}
}

function(message) {
	if (codeposher.includes(code)) {
		$('#'+code+'_updateButt').click()
	}
}



function uncrazeThePosh(posh) {
	var push = []
	push.message = posh
	return push 
}
push = uncrazeThePosh(posh)
miramaxW(push)




d3.select('body').append('button').attr('id',code+'_updateButt').attr('onclick','updateMe(this)').attr('hidden',true)



// 
// 
// 

function updateMe(sec) {
	console.log('eh')
	window.eh = sec
	var code = eh.id.split("_")[0]
	var position = Number($('#'+code+'_totnet')[0].innerText)
	if (position > 0) {
		var price_to_close = mona[code+" [SPBOPT]"].bid
	} else {
		var price_to_close = mona[code+" [SPBOPT]"].ask
	}
	var theor_price = mona[code+" [SPBOPT]"].theor_price

	var num = $('#'+code+'_position_apr')[0].innerText
	num = Number(num) 
	var tot_net = $('#'+code+'_totnet')[0].innerText
	var tot_net = Number(tot_net)
	if (tot_net > 0) {var bid_or_ask = 'bid'; var z = -1} else {var bid_or_ask = 'ask';var z = 1}

	$('#'+code+'_position')[0].innerText = price_to_close


	var vm_if_close = (num - price_to_close) * z * margins[code].pstepval
	var vm_theo = (num - theor_price) * z * margins[code].pstepval

	$('#'+code+'_position_vm1').text(vm_if_close)
	$('#'+code+'_position_vm2').text(vm_theo.toFixed(2))
	var gk = runtheGreek(code)
	var d = gk['delta'].toFixed(2) * tot_net
	var v = gk['vega'] * tot_net
	var g = gk['gamma'].toFixed(3) * tot_net
	var t = gk['theta'].toFixed() * tot_net
	$('#'+code+'_position_d').text(d.toFixed(2))
	$('#'+code+'_position_v').text(v)
	$('#'+code+'_position_g').text(g)
	$('#'+code+'_position_t').text(t)

console.log('update YEAH!!')	
}



function updateMalls() {
	codeposher.forEach(function(d) {
		$('#'+d+'_updateButt').click()
	})
}


function sumItUp(thing) {
	window.sit = thing
	console.log('sit')
}

function miramaxW(dats) {

	var entries3 = d3.nest()
	    .key(function(d) { return d.SEC_UNDERLYING; })
	    .key(function(d) { return d.SEC_EXPIRY_DATE; })
	    .entries(dats.message);
	if (tablusa) {tablusa.remove()}
	tablusa = d3.select('#mid_pane_accounts').append('table').attr('id','tiesto')
	headz = tablusa.append('tr').append('tr').append('tr').append('tr').append('tr')
	headz.append('th').attr('class','smoke_smoke').text("____________________")
	headz.append('th').attr('class','smoke_code').text("CODE")
	headz.append('th').attr('class','smoke_strike').text("STRIKE")
	headz.append('th').attr('class','smoke_type').text("TYPE")
	headz.append('th').attr('class','smoke_total_net').text("NP")
	headz.append('th').attr('class','smoke_avsonprice').text("APR")
    headz.append('th').attr('class','smoke_avsonprice').text("P")
	headz.append('th').attr('class','smoke_varmargin').text("ViC")
	headz.append('th').attr('class','smoke_varmargin').text("VM")

	headz.append('th').attr('class','smoke_delta').text("D")
	headz.append('th').attr('class','smoke_vega').text("V")
	headz.append('th').attr('class','smoke_gamma').text("G")
	headz.append('th').attr('class','smoke_theta').text("Th")
	entries3.forEach(function(d) {
		console.log("UNDERLYING IS",d.key)
		tr1 = tablusa.append('tr')
		var tro = tr1.append('tr').attr('class','overall_keyco_row').attr('onclick','hideMyKids(this)')
		tro.append('td').attr('id',d.key+'_overall_key').attr('class','overall_keyco').text(d.key)
		tro.append('td').attr('id',d.key+'_overall_vm1').append('button').attr('onclick','sumItUp(this)').attr('class','sumItUp').attr('hidden',true)
		tro.append('td').attr('id',d.key+'_overall_vm2').append('button').attr('onclick','sumItUp(this)').attr('class','sumItUp').attr('hidden',true)
		tro.append('td').attr('id',d.key+'_overall_d').append('button').attr('onclick','sumItUp(this)').attr('class','sumItUp').attr('hidden',true)
		tro.append('td').attr('id',d.key+'_overall_v').append('button').attr('onclick','sumItUp(this)').attr('class','sumItUp').attr('hidden',true)
		tro.append('td').attr('id',d.key+'_overall_g').append('button').attr('onclick','sumItUp(this)').attr('class','sumItUp').attr('hidden',true)
		tro.append('td').attr('id',d.key+'_overall_t').append('button').attr('onclick','sumItUp(this)').attr('class','sumItUp').attr('hidden',true)

		tr1 = tr1.append('tr')
		d.values.forEach(function(e) {
			console.log("______expiration",e.key)
			tr2 = tr1.append('tr').attr('class','smoky')
			var ky = e.key.slice(0,10)
			var tro = tr2.append('tr').attr('class','overall_keyco_row').attr('onclick','hideMyKids(this)')
			tro.append('td').attr('id',d.key+'_'+ky+'_overall_key').attr('class','overall_keyco').text("_____"+ky)
			tro.append('td').attr('id',d.key+'_'+ky+'_overall_vm1').append('button').attr('onclick','sumItUp(this)').attr('class','sumItUp').attr('hidden',true)
			tro.append('td').attr('id',d.key+'_'+ky+'_overall_vm2').append('button').attr('onclick','sumItUp(this)').attr('class','sumItUp').attr('hidden',true)
			tro.append('td').attr('id',d.key+'_'+ky+'_overall_d').append('button').attr('onclick','sumItUp(this)').attr('class','sumItUp').attr('hidden',true)
			tro.append('td').attr('id',d.key+'_'+ky+'_overall_v').append('button').attr('onclick','sumItUp(this)').attr('class','sumItUp').attr('hidden',true)
			tro.append('td').attr('id',d.key+'_'+ky+'_overall_g').append('button').attr('onclick','sumItUp(this)').attr('class','sumItUp').attr('hidden',true)
			tro.append('td').attr('id',d.key+'_'+ky+'_overall_t').append('button').attr('onclick','sumItUp(this)').attr('class','sumItUp').attr('hidden',true)
			tr2 = tr2.append('tr')
			
				e.values.forEach(function(g){
					window.icho = g
					console.log("__________________________",
						g.SEC_SHORT_NAME)
					// 	g.STRIKE,
					// 	g.TYPE,
					// 	g.TOTAL_NET,
					// 	g.AVRPOSNPRICE,
					// 	g.VARMARGIN
					// 	)
					tr4 = tr2.append('tr').attr('class','smoky')
					var code = g.SEC_SHORT_NAME
					var tot_net = Number(g.TOTAL_NET)
					tr4.append('td').attr('class','smoke_smoke').text("____________________")
					tr4.append('td').attr('class','smoke_code' ).text(code)
					tr4.append('td').attr('class','smoke_strike').text(g.STRIKE)
					tr4.append('td').attr('class','smoke_type').text(g.TYPE)
					tr4.append('td').attr('class','smoke_total_net').attr('id',code+'_totnet').text(tot_net)
					var num = g.AVRPOSNPRICE
					if (num % 1 != 0) { num = num.toFixed(2) }
					tr4.append('td').attr('class','smoke_avsonprice').attr('id',code+'_position_apr').text(num)
					if (tot_net > 0) {var bid_or_ask = 'bid'; var z = -1} else {var bid_or_ask = 'ask';var z = 1}
					// var price_to_close = $('#'+code+'_'+bid_or_ask)[0].innerHTML
					var price_to_close = mona[code+" [SPBOPT]"][bid_or_ask]
					tr4.append('td').attr('class','smoke_avsonprice').attr('id',code+'_position').text(price_to_close)
					var vm_if_close = (num - price_to_close) * z * margins[code].pstepval 
					tr4.append('td').attr('class','smoke_varmargin').attr('id',code+'_position_vm1').text(vm_if_close)
					tr4.append('td').attr('class','smoke_varmargin').attr('id',code+'_position_vm2').text(g.VARMARGIN)
					var gk = runtheGreek(code)
					var d = gk['delta'] * tot_net
					var v = gk['vega'] * tot_net
					var g = gk['gamma'] * tot_net
					var t = gk['theta'] * tot_net
					tr4.append('td').attr('class','smoke_delta').attr('id',code+'_position_d').text(d.toFixed(2))
					tr4.append('td').attr('class','smoke_vega').attr('id',code+'_position_v').text(v)
					tr4.append('td').attr('class','smoke_gamma').attr('id',code+'_position_g').text(g.toFixed(3))
					tr4.append('td').attr('class','smoke_theta').attr('id',code+'_position_t').text(t.toFixed())
					tr4.append('button').attr('id',code+'_updateButt').attr('onclick','updateMe(this)').attr('hidden',true)
				})
			
		})
	})

indicatorPaste(dats)

window.codeposher = dats.message.map(function(d) {return d.SEC_SHORT_NAME})
}










window.flashactive = true
var mara = []
var latest_msg;
function locate_the_options(message) {
	var code = message.payload.split(',')[2].split(' ')[0]
	if ($('#'+code+'_last')[0]) {
 		var now = new Date()
		latest_msg = now
	} else {
		mara.push(message)
		return
	}
	if (code.startsWith(seccode)) {
		// $('#'+code+'_bid')[0].innerHTML = message.payload.split(',')[3]
		green_red($('#'+code+'_bid')[0],message.payload.split(',')[3])
		// $('#'+code+'_ask')[0].innerHTML = message.payload.split(',')[4]
		green_red($('#'+code+'_ask')[0],message.payload.split(',')[4])
		// $('#'+code+'_last')[0].innerHTML = message.payload.split(',')
		// $('#'+code+'_last')[0].innerHTML = message.payload.split(',')[5]
		if (message.payload.split(',')[5] < $('#'+code+'_last')[0].innerHTML) {
			$('#'+code+'_last')[0].innerHTML = message.payload.split(',')[5]
			if (flashactive == true) {
				var rowcode = code+'_last'
				var color = 'green'
				gb(rowcode,color)
			}

		} else {
			if (message.payload.split(',')[5] > $('#'+code+'_last')[0].innerHTML) {
				$('#'+code+'_last')[0].innerHTML = message.payload.split(',')[5]
				if (flashactive == true) {
					var rowcode = code+'_last'
                                	var color = 'red'
                                	gb(rowcode,color)
				}
			} else {
				if (message.payload.split(',')[6]>$('#'+code+'_num_trades')[0].innerHTML) {
					console.log('numup')
				if (flashactive == true) {
					var rowcode = code+'_last'
                                	var color = 'blue'
                                	gb(rowcode,color)
				}
				}
			} 
		} 
		$('#'+code+'_num_trades')[0].innerHTML = message.payload.split(',')[6]
		$('#'+code+'_open_pos')[0].innerHTML = message.payload.split(',')[8]
		d3.select($('#'+code+'_last')[0].parentElement).select('.volatility')['_groups'][0][0].innerHTML = Number(message.payload.split(',')[9]).toFixed(3)
//		$('#'+code+'_open_pos')[0].parentElement.children[7].innerHTML = Number(message.payload.split(',')[9]).toFixed(2)
		$('#'+code+'_theo')[0].innerHTML = message.payload.split(',')[10]
		$('#'+code+'_last')[0].innerHTML = message.payload.split(',')[5]
	}
	updateTheMatrix(message)
}



function updateTheMatrix(message) {
	var msg = message.payload.split(',')
	var code = msg[2]
	console.log(mona[code])
	mona[code].bid = Number(msg[3])
	mona[code].ask = Number(msg[4])
	mona[code].last = Number(msg[5])
	mona[code].num_trades = Number(msg[6])
	mona[code].open_pos = Number(msg[8])
	mona[code].volatility = Number(msg[9])
	mona[code].theor_price = Number(msg[10])
	console.log('done it')
	console.log(mona[code])
}












