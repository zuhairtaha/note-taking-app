"use strict";

// https://codepen.io/leninalberto/pen/aGzwre
//import $ from "jquery"

/*
 import {defaultExport as $, defaultExport as jQuery} from 'jquery';
 import M from "materialize-css"

 M.AutoInit()

 $(() => {
 $('.parallax').parallax()
 $(".button-collapse").sideNav()
 })*/
M.AutoInit();
var elem = document.querySelector('.sidenav');
M.Sidenav.init(elem, {
  inDuration: 350,
  outDuration: 350,
  edge: 'right'
}); //M.parallax(document.querySelector('.button-collapse'))