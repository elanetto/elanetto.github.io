# -*- coding: utf-8 -*-

from PIL import Image
import math
import os
import sys


def resize(file):
    img = Image.open(file)
    x, y = img.size
    x2, y2 = x//3, y//3
    img = img.resize((x2,y2),Image.ANTIALIAS)
    output = f'{file}'
    img.save(output,quality=90)


#resize("start_here_9B.jpg")


cwd = os.getcwd()

for file in os.listdir(cwd):
    if ".jpg" in file:
        #print(file)
        resize(file)

