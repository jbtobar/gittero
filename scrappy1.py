import os
import pandas as pd


for i in os.listdir('.'):
	print(i)


df = pd.read_csv(i,delimiter='\t')
df['Base'] = df['Option base'].str[:2]
ri = df.loc[df['Base'] == 'RI']

ri.sort_values('Vol. today',ascending=False)[['Option type','Strike','Expiration']].head(1)


ri.sort_values('Num. bids',ascending=False)[['Option type','Strike','Expiration']].head(1)


ri.sort_values('Num. offers',ascending=False)[['Option type','Strike','Expiration']].head(1)

DF = pd.DataFrame()
for i in range(114):
	df = pd.read_csv('./all_options_all_params/'+leerums[i],delimiter='\t')
	print('./all_options_all_params/'+leerums[i])
	df['Base'] = df['Option base'].str[:2]
	ri = df.loc[df['Base'] == 'RI']
	ri = ri.loc[ri['Option type'] == 'Call']
	atm = iv.iloc[i]['STRIKE']
	print(iv.iloc[i])
	atms = ri.loc[ri['Strike'] == atm]
	atms = atms[['Expiration','Volatility']]
	atms = atms.set_index('Expiration').T
	atms['Stk'] = atm
	atms['STRIKE'] = iv.iloc[i]['STRIKE']
	atms['DATE'] = iv.iloc[i]['DATE']
	atms['dt'] = leerums[i].rsplit('.')[0][-4:]
	atms['IV'] = iv.iloc[i]['IV']
	DF = DF.append(atms)
	print('appended')





DF = pd.DataFrame()
for i in range(114):
	df = pd.read_csv('./all_options_all_params/'+leerums[i],delimiter='\t')
	print('./all_options_all_params/'+leerums[i])
	if df['Option base'].dtype == 'float64':
		df['Base'] = df['Unnamed: 0']
	else:
		df['Base'] = df['Option base'].str[:2]
	ri = df.loc[df['Base'] == 'RI']
	ri = ri.loc[ri['Option type'] == 'Call']
	atm = ivi.iloc[i]['STRIKE']
	print(ivi.iloc[i])
	atms = ri.loc[ri['Strike'] == atm]
	atms = atms[['Expiration','Volatility']]
	atms = atms.set_index('Expiration').T
	atms['Stk'] = atm
	atms['STRIKE'] = ivi.iloc[i]['STRIKE']
	atms['DATE'] = ivi.iloc[i]['DATE']
	atms['dt'] = leerums[i].rsplit('.')[0][-4:]
	atms['IV'] = ivi.iloc[i]['IV']
	DF = DF.append(atms)
	print('appended')

atms = ric.loc[ric['Strike'] == atm]


['DATE', 'dt',
       'IV', 'STRIKE', 'Stk','10/19/2017', '12/21/17', '12/21/2017', '2/15/18', '2/15/2018',
       '2/22/17', '3/15/18', '3/15/2018', '3/16/17', '3/2/17', '3/23/17',
       '3/30/17', '4/13/17', '4/20/17', '4/27/17', '4/6/17', '5/11/17',
       '5/18/17', '5/25/17', '5/4/17', '6/1/17', '6/15/17', '6/15/2017',
       '6/21/18', '6/21/2018', '6/22/17', '6/22/2017', '6/29/2017', '6/8/17',
       '6/8/2017', '7/13/2017', '7/20/17', '7/20/2017', '7/27/2017',
       '7/6/2017', '8/10/2017', '8/17/17', '8/17/2017', '8/3/2017', '9/19/19',
       '9/19/2019', '9/20/18', '9/20/2018', '9/21/17', '9/21/2017', ]



leerums = [
'all_options_all_params_0601.csv',
'all_options_all_params_0602.csv',
'all_options_all_params_0605.csv',
'all_options_all_params_0606.csv',
'all_options_all_params_0607.csv',
'all_options_all_params_0608.csv',
'all_options_all_params_0609.csv',
'all_options_all_params_0613.csv',
'all_options_all_params_0614.csv',
'all_options_all_params_0615.csv',
'all_options_all_params_0616.csv',
'all_options_all_params_0619.csv',
'all_options_all_params_0620.csv',
'all_options_all_params_0621.csv',
'all_options_all_params_0622.csv',
'all_options_all_params_0623.csv',
'all_options_all_params_0626.csv',
'all_options_all_params_0627.csv',
'all_options_all_params_0628.csv',
'all_options_all_params_0629.csv',
'all_options_all_params_0630.csv',
'all_options_all_params_0703.csv',
'all_options_all_params_0704.csv',
'all_options_all_params_0705.csv',
'all_options_all_params_0706.csv',
'all_options_all_params_0707.csv',
'all_options_all_params_0710.csv',
'all_options_all_params_0711.csv',
'all_options_all_params_0712.csv',
'all_options_all_params_0713.csv',
'all_options_all_params_0714.csv',
'all_options_all_params_0717.csv',
'all_options_all_params_0718.csv',
'all_options_all_params_0719.csv',
'all_options_all_params_0720.csv',
'all_options_all_params_0721.csv',
'all_options_all_params_0724.csv',
'all_options_all_params_0725.csv',
'all_options_all_params_0726.csv',
'all_options_all_params_0727.csv',
'all_options_all_params_0728.csv',
'all_options_all_params_0731.csv',
'all_options_all_params_0801.csv',
'all_options_all_params_0802.csv',
'all_options_all_params_0803.csv',
'all_options_all_params_0804.csv',
'all_options_all_params_0807.csv',
]


# THIS RESULT IS UNEXPECTED
dd['closer'] = ''
dd['closer_v'] = 0.0
john = []
for i in range(len(dd)):
	v = dd['IV'][i]
	diff_k = 10
	for j in dd.columns[2:47]:
		vv = dd[j][i]
		diff = abs(vv-v)
		if (diff < diff_k):
			dd['closer_v'][i] = diff 
			dd['closer'][i] = j
		else:
			pass

for i in dd.columns[2:]:
	dd[i] = dd[i] - dd['IV']

vals = []
vals_x = []
for i in range(114):
	vals.append(dd.ix[i].dropna().abs().sort_values().index[0])
	vals_x.append(dd.ix[i].dropna().abs().sort_values()[0])

jorge = [['Day','Volume','Trades'],]
for i in os.listdir('.'):
	if i.startswith('t'):
		df = pd.read_csv(i,delimiter='\t')
		d = i.rsplit('_')[4].rsplit('.')[0]
		suma = df['Volume'].sum()
		trades = len(df)
		jorge.append([d,suma,trades])


for i in dali.columns[3:]:
	print(i)
	d = str(i)[:10]
	# print(d)
	dali.rename(columns={i:d},inplace=True)



	[
	['DATE','IV','STRIKE','2017-02-22 00:00:00', '2017-03-02 00:00:00', '2017-03-16 00:00:00',
       '2017-03-23 00:00:00', '2017-03-30 00:00:00', '2017-04-06 00:00:00',
       '2017-04-13 00:00:00', '2017-04-20 00:00:00', '2017-04-27 00:00:00',
       '2017-05-04 00:00:00', '2017-05-11 00:00:00', '2017-05-18 00:00:00',
       '2017-05-25 00:00:00', '2017-06-01 00:00:00', '2017-06-08 00:00:00',
       '2017-06-15 00:00:00', '2017-06-22 00:00:00', '2017-06-29 00:00:00',
       '2017-07-06 00:00:00', '2017-07-13 00:00:00', '2017-07-20 00:00:00',
       '2017-07-27 00:00:00', '2017-08-03 00:00:00', '2017-08-10 00:00:00',
       '2017-08-17 00:00:00', '2017-09-21 00:00:00', '2017-10-19 00:00:00',
       '2017-12-21 00:00:00', '2018-02-15 00:00:00', '2018-03-15 00:00:00',
       '2018-06-21 00:00:00', '2018-09-20 00:00:00', '2019-09-19 00:00:00']



for i in range(50):
	mf.ix[i].replace(0.0,np.nan).dropna().plot()
