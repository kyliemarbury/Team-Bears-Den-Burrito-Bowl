# This script filters out blocks that have transparency, as well as any other blocks that would not work for a palette
# It then crops the blocks to 16x16
# The output is saved in the FilterBlocksOutput folder

# to use make sure that there is no FilterBlocksOutput folder in the directory
import os
from PIL import Image
import shutil
import glob
from PIL import ImageOps

# function taken from internet
def hastransparency(img):
    if img.info.get("transparency", None) is not None:
        return True
    if img.mode == "P":
        transparent = img.info.get("transparency", -1)
        for _, index in img.getcolors():
            if index == transparent:
                return True
    elif img.mode == "RGBA":
        extrema = img.getextrema()
        if extrema[3][0] < 255:
            return True
    return False


destination = os.mkdir("FilterBlocksOutput")
des2 = os.mkdir("BadBlocks")
folder = input("Type the folder name to filter ")
for file in glob.glob(folder+"/*png"):
    print(file)
    img = Image.open(file)
    if hastransparency(img):
        img.close()
        file2 = shutil.copy(file, "BadBlocks")
        img = Image.open(file2)
        w, h = img.size
        border = (0,h-16,0,0)
        img = ImageOps.crop(img, border)
        img.save(file2)
        continue
    else:
        if (file == folder + "\debug.png"):
            img.close()
            continue
        elif (file == folder + "\debug2.png"):
            img.close()
            continue
        elif (file == folder + "\grass_block_top.png"):
            img.close()
            continue
        elif ("door" in file):
            img.close()
            file2 = shutil.copy(file, "BadBlocks")
            img = Image.open(file2)
            w, h = img.size
            border = (0,h-16,0,0)
            img = ImageOps.crop(img, border)
            img.save(file2)
            continue
        elif ("jigsaw" in file):
            img.close()
            continue
        img.close()
        file2 = shutil.copy(file, "FilterBlocksOutput")
        img = Image.open(file2)
        w, h = img.size
        border = (0,h-16,0,0)
        img = ImageOps.crop(img, border)
        img.save(file2)