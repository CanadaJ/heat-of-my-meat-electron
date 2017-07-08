#!/usr/bin/python
from max31855 import MAX31855, MAX31855Error
import sys, os, time

# Pins designated for the MAX31855
cs_pin = 10
clock_pin = 7
data_pin = 8
units = "f"
thermocouple = MAX31855(cs_pin, clock_pin, data_pin, units)

temp = thermocouple.get()
str_temp = str(temp)
print(temp) # Console output is nice
thermocouple.cleanup()
