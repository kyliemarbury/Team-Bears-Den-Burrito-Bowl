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
directory = os.fsencode("slock")
for file in glob.glob("slock/*.png"):
    print(file)
    img = Image.open(file)
    if hastransparency(img):
        img.close()
        continue
    else:
        if (file == "slock\debug.png"):
            img.close()
            continue
        elif (file == "slock\debug2.png"):
            img.close()
            continue
        elif (file == "slock\grass_block_top.png"):
            img.close()
            continue
        elif ("door" in file):
            img.close()
            continue
        img.close()
        file2 = shutil.copy(file, "FilterBlocksOutput")
        img = Image.open(file2)
        w, h = img.size
        border = (0,h-16,0,0)
        img = ImageOps.crop(img, border)
        img.save(file2)