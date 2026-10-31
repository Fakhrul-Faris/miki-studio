#!/usr/bin/env python3
"""EX09 numbers: 3 checkouts, 3-minute baskets, 70 % busy. Separate lines (each customer joins a line at random and stays,
no switching) = three M/M/1 queues; one line to the next free barber = one M/M/3 queue (Erlang C). Run: python3 build/queue_math.py"""
import math
cut, rho, c = 3.0, 0.7, 3
mu = 1 / cut; lam = c * rho * mu
wq_sep = rho / (1 - rho) * cut; p_sep = rho * math.exp(-(mu - lam / c) * 5)
a = lam / mu; s = sum(a ** k / math.factorial(k) for k in range(c)); pc = a ** c / math.factorial(c) / (1 - rho); pw = pc / (s + pc)
wq_one = pw / (c * mu - lam); p_one = pw * math.exp(-(c * mu - lam) * 5)
print(f"walk-ins/hour {lam * 60:.1f}")
print(f"separate lines: average wait {wq_sep:.1f} min, {p_sep:.0%} wait over 5 min")
print(f"one line:       average wait {wq_one:.1f} min, {p_one:.0%} wait over 5 min  ({1 - wq_one / wq_sep:.0%} shorter)")
print("pick 1 of 3 equal lines: chance another line beats yours = 2/3")
