
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
                tr1.append('tr').attr('onclick','hideMyKids(this)').text(d.key)
                tr1 = tr1.append('tr')
                d.values.forEach(function(e) {
                        console.log("______expiration",e.key)
                        tr2 = tr1.append('tr').attr('class','smoky')
                        tr2.append('tr').attr('onclick','hideMyKids(this)').text("_____"+e.key.slice(0,10))
                        tr2 = tr2.append('tr')
                        
                                e.values.forEach(function(g){
                                        window.icho = g
                                        console.log("__________________________",
                                                g.SEC_SHORT_NAME)
                                        //      g.STRIKE,
                                        //      g.TYPE,
                                        //      g.TOTAL_NET,
                                        //      g.AVRPOSNPRICE,
                                        //      g.VARMARGIN
                                        //      )
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
                                        tr4.append('td').attr('class','smoke_avsonprice').text(num)
                                        if (tot_net > 0) {var bid_or_ask = 'bid'; var z = -1} else {var bid_or_ask = 'ask';var z = 1}
                                        var price_to_close = $('#'+code+'_'+bid_or_ask)[0].innerHTML
                                        tr4.append('td').attr('class','smoke_avsonprice').attr('id',code+'_position').text(price_to_close)
                                        var vm_if_close = (num - price_to_close) * z * margins[code].pstepval 
                                        tr4.append('td').attr('class','smoke_varmargin').text(vm_if_close)
                                        tr4.append('td').attr('class','smoke_varmargin').text(g.VARMARGIN)
                                        var gk = runtheGreek(code)
                                        var d = gk['delta'].toFixed(2) * tot_net
                                        var v = gk['vega'] * tot_net
                                        var g = gk['gamma'].toFixed(3) * tot_net
                                        var t = gk['theta'].toFixed() * tot_net
                                        tr4.append('td').attr('class','smoke_delta').text(d)
                                        tr4.append('td').attr('class','smoke_vega').text(v)
                                        tr4.append('td').attr('class','smoke_gamma').text(g)
                                        tr4.append('td').attr('class','smoke_theta').text(t)
                                        tr4.append('button').attr('id',code+'_updateButt').attr('onclick','updateMe(this)').attr('hidden',true)
                                })
                        
                })
        })

indicatorPaste(dats)
window.codeposher = dats.message.map(function(d) {return d.SEC_SHORT_NAME})
}

