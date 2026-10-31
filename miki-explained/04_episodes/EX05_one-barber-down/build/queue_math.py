#!/usr/bin/env python3
"""EX05 numbers: average wait in a multi-barber queue (Erlang C / M/M/c). Run: python3 build/queue_math.py"""
import math

def wait_minutes(walkins_per_hour, cut_minutes, barbers):
    lam, mu, c = walkins_per_hour, 60 / cut_minutes, barbers
    a, rho = lam / mu, lam / (mu * c)
    if rho >= 1:
        return rho, float("inf")
    s = sum(a ** k / math.factorial(k) for k in range(c))
    pc = (a ** c / math.factorial(c)) / (1 - rho)
    return rho, pc / (s + pc) / (c * mu - lam) * 60

for n in (3, 2):
    rho, w = wait_minutes(5, 20, n)
    print(f"{n} barbers: {rho:.0%} busy, average wait {w:.1f} min")
