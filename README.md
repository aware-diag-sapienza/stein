# STEIN
Marco Angelini, Graziano Blasilli, Simone Lenti, Giuseppe Santucci:
STEIN: speeding up evaluation activities with a Seamless Testing Environment INtegrator.
https://doi.org/10.2312/eurovisshort.20181083

```
@inproceedings {eurovisshort.20181083,
booktitle = {EuroVis 2018 - Short Papers},
editor = {Jimmy Johansson and Filip Sadlo and Tobias Schreck},
title = {{STEIN: Speeding up Evaluation Activities With a Seamless Testing Environment INtegrator}},
author = {Angelini, Marco and Blasilli, Graziano and Lenti, Simone and Santucci, Giuseppe},
year = {2018},
publisher = {The Eurographics Association},
ISBN = {978-3-03868-060-4},
DOI = {10.2312/eurovisshort.20181083}
}
```

# How to run STEIN

Stein works under a web server. ```server.py``` is a simple python server to run it, but for result upload capiability it requires a webserver wirh php. You can use your custom server, but you have to implement the uploading logic used in ```save.php```. And change ```js/stein.js``` the pointer ```var serverUploadUrl = "save.php";``` to the script. 


## Design
Run ```server.py``` and open ```design.html```.
Write the url of the system to encapsulate. If the system is on a different domain CORS on the browser has to be disabled. To do this, you can use Chrome or Firefox plugins for example.

## Evaluation
Once the design is completed, the ```stein-config.json``` will be created. Put it in the root of the poject. since it is used by ```evaluation.html```. If stein is running under a webserver with php enabled, the results are uploaded on the server. Otherwise the result is downloaded from the local browser.

