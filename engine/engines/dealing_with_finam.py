import requests
import sqlite3
from datetime import datetime
from io import StringIO

def data_from_finam(symbol):
	"""
	gets csv data from finam and returns dataframe, interval is daily
	its set to get data from 2012 until current date, these parameters can be easily changed
	"""
	def get_finam_codes(symbol_code):
		connect = sqlite3.connect('./Finam/symbols.sqlite')
		cursor = connect.cursor()
		target_code = (symbol_code,)
		cursor.execute('SELECT * FROM bases WHERE EmitentCode=?', target_code)
		search_result = cursor.fetchone()
		if not search_result:
			print('Not found')
		else:
			print(search_result)
		return search_result
	symbol_code = 'SPFB.'+symbol
	sr = get_finam_codes(symbol_code)
	yt = datetime.now().strftime("%Y")
	today = datetime.now().strftime("%d.%m.%Y")
	url1 = 'http://export.finam.ru/table.txt?market=14&em='+sr[1]+'&code='+symbol_code+'&apply=0&df=1&mf=9&yf=2012&from=01.10.2012&dt=7&mt=6&yt='+yt+'&to='+today+'&p=8&f=SPFB.RTS_121001_170707&e=.txt&cn='+symbol+'&dtf=1&tmf=1&MSOR=1&mstime=on&mstimever=1&sep=1&sep2=1&datf=1&at=1'
	html = requests.get(url1).text
	df = pd.read_csv(StringIO(html))
	return df



 emo = {'AUDU': '81009', 'BR': '22460', 'GBMW': '181582', 'UCAD': '409339', 'UCHF': '175907', 'CHMF': '81023', 'CU': '81172', 'CY': '410570', 'GDBK': '181584', 'GDAI': '181583', 'ED': '21989', 'Eu': '22010', 'FEES': '81020', 'GOLD': '19898', 'GMKR': '17452', 'GBPU': '81010', 'GAZR': '17451', 'HYDR': '81025', 'UJPY': '175893', 'LKOH': '17453', 'MOEX': '390846', 'MXI': '436202', 'MGNT': '390848', 'MOPR': '81031', 'MTSI': '81029', 'MIX': '81408', 'NOTK': '19892', 'NLMK': '453418', 'OFZ2': '81173', 'OFZ4': '81174', 'OFZ6': '81746', 'OF15': '175864', 'OF10': '152663', 'PLD': '81011', 'PLT': '81012', 'RTS': '17455', 'ROSN': '19894', 'RTSS': '22890', 'RTKM': '17454', 'SUGR': '81159', 'SNGP': '81021', 'Si': '19899', 'GSIE': '181585', 'SNGR': '17457', 'SBPR': '81026', 'SBRF': '17456', 'SILV': '19902', 'TRNF': '19901', 'UTRY': '409337', 'TATN': '81024', 'UUAH': '175922', 'VTBR': '19891', 'RVI': '398008', 'GVW3': '181586'}



# url = 'http://export.finam.ru/SPFB.RTS_121001_170707.txt?market=14&em=17455&code=SPFB.RTS&apply=0&df=1&mf=9&yf=2012&from=01.10.2012&dt=7&mt=6&yt=2017&to=07.07.2017&p=8&f=SPFB.RTS_121001_170707&e=.txt&cn=SPFB.RTS&dtf=1&tmf=1&MSOR=1&mstime=on&mstimever=1&sep=1&sep2=1&datf=1&at=1'
# def key_value_map_finam_tickers():
# 	#  It returns emo
# 	df = pd.DataFrame(data[1]['securities'][1])
# 	connect = sqlite3.connect('./Finam/symbols.sqlite')
# 	cursor = connect.cursor()
# 	emo = {}
# 	not_found = []
# 	for i in df['ASSETCODE'].unique():
# 		target_code = ('SPFB.'+i,)
# 		cursor = connect.cursor()
# 		cursor.execute('SELECT * FROM bases WHERE EmitentCode=?', target_code)
# 		search_result = cursor.fetchone()
# 		if not search_result:
# 				print('Not found')
# 				print(i)
# 				not_found.append(i)
# 		else:
# 			emo[i] = search_result[1]
			# print(search_result)

	




# def get_finam_codes(symbol_code):
# 	connect = sqlite3.connect('./Finam/symbols.sqlite')
# 	cursor = connect.cursor()
# 	target_code = (symbol_code,)
# 	cursor.execute('SELECT * FROM bases WHERE EmitentCode=?', target_code)
# 	search_result = cursor.fetchone()
# 	if not search_result:
# 		print('Not found')
# 	else:
# 		print(search_result)
# 	return search_result

# symbol = 'RTS'
# symbol_code = 'SPFB.'+symbol
# sr = get_finam_codes(symbol_code)
# yt = '2017' # YEAR TODAY
# today = '07.07.2017'
# url1 = 'http://export.finam.ru/table.txt?market=14&em='+sr[1]+'&code='+symbol_code+'&apply=0&df=1&mf=9&yf=2012&from=01.10.2012&dt=7&mt=6&yt='+yt+'&to='+today+'&p=8&f=SPFB.RTS_121001_170707&e=.txt&cn='+symbol+'&dtf=1&tmf=1&MSOR=1&mstime=on&mstimever=1&sep=1&sep2=1&datf=1&at=1'

# http://export.finam.ru/SPFB.VTBR_121001_170715.txt?market=14&em=19891&code=SPFB.VTBR&apply=0&df=1&mf=9&yf=2012&from=01.10.2012&dt=15&mt=6&yt=2017&to=15.07.2017&p=8&f=SPFB.VTBR_121001_170715&e=.txt&cn=SPFB.VTBR&dtf=1&tmf=1&MSOR=1&mstime=on&mstimever=1&sep=1&sep2=1&datf=1&at=1
# 'http://export.finam.ru/SPFB.RTS_121001_170707.txt?market=14&em='17455'&code='SPFB.RTS'&apply=0&df=1&mf=9&yf=2012&from=01.10.2012&dt=7&mt=6&yt=2017&to=07.07.2017&p=8&f=SPFB.RTS_121001_170707&e=.txt&cn=SPFB.RTS&dtf=1&tmf=1&MSOR=1&mstime=on&mstimever=1&sep=1&sep2=1&datf=1&at=1'
# 'http://export.finam.ru/SPFB.Si_121001_170707.txt?market=14&em='19899'&code='SPFB.Si'&apply=0&df=1&mf=9&yf=2012&from=01.10.2012&dt=7&mt=6&yt=2017&to=07.07.2017&p=8&f=SPFB.Si_121001_170707&e=.txt&cn=SPFB.Si&dtf=1&tmf=1&MSOR=1&mstime=on&mstimever=1&sep=1&sep2=1&datf=1&at=1'
# 'http://export.finam.ru/SPFB.BR_121001_170707.txt?market=14&em='22460'&code='SPFB.BR'&apply=0&df=1&mf=9&yf=2012&from=01.10.2012&dt=7&mt=6&yt=2017&to=07.07.2017&p=8&f=SPFB.BR_121001_170707&e=.txt&cn=SPFB.BR&dtf=1&tmf=1&MSOR=1&mstime=on&mstimever=1&sep=1&sep2=1&datf=1&at=1'
# http://export.finam.ru/SPFB.Si_121001_170715.txt?market=14&em=19899&code=SPFB.Si&apply=0&df=1&mf=9&yf=2012&from=01.10.2012&dt=15&mt=6&yt=2017&to=15.07.2017&p=8&f=SPFB.Si_121001_170715&e=.txt&cn=SPFB.Si&dtf=1&tmf=1&MSOR=1&mstime=on&mstimever=1&sep=1&sep2=1&datf=1&at=1
# url = 'http://export.finam.ru/SPFB.BR_121001_170707.txt?market=14&em=17455&coapply=0&df=1&mf=9&yf=2012&from=01.10.2012&dt=7&mt=6&yt=2017&to=07.07.2017&p=8&f=SPFB.BR_121001_170707&e=.txt&cn=SPFB.BR&dtf=1&tmf=1&MSOR=1&mstime=on&mstimever=1&sep=1&sep2=1&datf=1&at=1'
# url = 'https://www.finam.ru/profile/mosbirzha-fyuchersy?market=14&em=SPFB.BR&apply=0&df=1&mf=9&yf=2012&from=01.10.2012&dt=15&mt=6&yt=2017&to=15.07.2017&p=8&f=SPFB.BR_121001_170715&e=.txt&cn=SPFB.BR&dtf=1&tmf=1&MSOR=1&mstime=on&mstimever=1&sep=1&sep2=1&datf=5&at=1'

