"""
This is the options math library
its purpose is to serve the options_deck user interface
"""

import math
import numpy as np
from time import time
t0 = time()
# Parameters
S0=1165.
K=105.
T=1.0
r=0.05
sigma=0.2
M=60
dt=T/M
I=250000
# Simulating I paths with M time steps
# S = S0 * np.exp(np.cumsum((r - 0.5 * sigma ** 2) * dt + sigma * math.sqrt(dt)
# * np.random.standard_normal((M + 1, I)), axis=0)) # sum instead of cumsum would also do
  # if only the final values are of interest
# S[0] = S0
# Calculating the Monte Carlo estimator
# C0 = math.exp(-r * T) * sum(np.maximum(S[-1] - K, 0)) / I


def monte_carlo_calc(S0,K,T,r,sigma,M):
    """
    returns array S of size M+1 x I,
    where M is time steps and I is number of paths
    """
    I = 250000
    dt = T / M
    S = S0 * np.exp(np.cumsum((r - 0.5 * sigma ** 2) * dt + sigma * math.sqrt(dt) * np.random.standard_normal((M + 1, I)), axis=0))
    print(len(S))
    print(len(S.T))
    return S

# Results output
# tnp2 = time() - t0
# print("European Option Value %7.3f" % C0)
# print("Duration in Seconds %7.3f" % tnp2)
# import matplotlib
# matplotlib.use('Qt5Agg')

# import matplotlib.pyplot as plt
# plt.plot(S[:, :10])
