import pandas as pd
from collections import Counter
import numpy as np
import os
from sklearn import svm, cross_validation, neighbors
from sklearn.ensemble import VotingClassifier, RandomForestClassifier

def process_data_for_labels(ticker):
    hm_days = 7
    df = DF
    # df = pd.read_csv('/MOEX/June15_close_price.csv')
    tickers = df.columns.values.tolist()
    df.fillna(0, inplace=True)

    for i in range(1,hm_days+1):
        df['{}_{}d'.format(ticker,i)] = (df[ticker].shift(-i) - df[ticker]) / df[ticker]

    df.fillna(0, inplace=True)
    return tickers, df

def buy_sell_hold(*args):
    cols = [c for c in args]
    requirement = 0.02
    for col in cols:
        if col > requirement:
            return 1
        if col < -requirement:
            return -1
    return 0


def extract_featuresets(ticker):
    tickers, df = process_data_for_labels(ticker)

    df['{}_target'.format(ticker)] = list(map( buy_sell_hold,
                                               df['{}_1d'.format(ticker)],
                                               df['{}_2d'.format(ticker)],
                                               df['{}_3d'.format(ticker)],
                                               df['{}_4d'.format(ticker)],
                                               df['{}_5d'.format(ticker)],
                                               df['{}_6d'.format(ticker)],
                                               df['{}_7d'.format(ticker)] ))


    vals = df['{}_target'.format(ticker)].values.tolist()
    str_vals = [str(i) for i in vals]
    print('Data spread:',Counter(str_vals))

    df.fillna(0, inplace=True)
    df = df.replace([np.inf, -np.inf], np.nan)
    df.dropna(inplace=True)

    df_vals = df[[ticker for ticker in tickers]].pct_change()
    df_vals = df_vals.replace([np.inf, -np.inf], 0)
    df_vals.fillna(0, inplace=True)

    X = df_vals.values
    y = df['{}_target'.format(ticker)].values

    return X,y,df


def do_ml(ticker):
    X, y, df = extract_featuresets(ticker)

    X_train, X_test, y_train, y_test = cross_validation.train_test_split(X,
                                                        y,
                                                        test_size=0.25)

    #clf = neighbors.KNeighborsClassifier()

    clf = VotingClassifier([('lsvc',svm.LinearSVC()),
                            ('knn',neighbors.KNeighborsClassifier()),
                            ('rfor',RandomForestClassifier())])


    clf.fit(X_train, y_train)
    confidence = clf.score(X_test, y_test)
    print('accuracy:',confidence)
    predictions = clf.predict(X_test)
    print('predicted class counts:',Counter(predictions))
    print()
    print()
    return confidence





DF = pd.read_pickle('./MOEX/alz.p')
DF.drop(names,axis=1,inplace=True)
iv = pd.read_csv('RTS_IV.csv',delimiter=';',index_col=1,parse_dates=True)
DF.join(iv['IV'],how='left')











df['{}_target'.format(ticker)] = list(map( buy_sell_hold,
                                           df['{}_1d'.format(ticker)],
                                           df['{}_2d'.format(ticker)],
                                           df['{}_3d'.format(ticker)],
                                           df['{}_4d'.format(ticker)],
                                           df['{}_5d'.format(ticker)],
                                           df['{}_6d'.format(ticker)],
                                           df['{}_7d'.format(ticker)] ))


vals = df['{}_target'.format(ticker)].values.tolist()
str_vals = [str(i) for i in vals]
print('Data spread:',Counter(str_vals))

df.fillna(0, inplace=True)
df = df.replace([np.inf, -np.inf], np.nan)
df.dropna(inplace=True)
