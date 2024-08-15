// ==UserScript==
// @name         VidSrc.Me TMDB Video Player
// @namespace
// @version      0.0.1
// @updateURL    https://raw.githubusercontent.com/Tommy0412/VidSrc.Me-TMDB-Video-Player/main/userscript.js
// @downloadURL  https://raw.githubusercontent.com/Tommy0412/VidSrc.Me-TMDB-Video-Player/main/userscript.js
// @description  VidSrc.Me TMDB Video Player
// @author       Tommy0412
// @license      MIT
// @match        https://www.themoviedb.org/movie/*
// @match        https://www.themoviedb.org/tv/*
// @icon         https://www.themoviedb.org/favicon.ico
// @connect      themoviedb.org
// @connect      vidsrc.xyz
// ==/UserScript==

(function() {
    'use strict';

    const currentUrl = document.URL;
    const type = currentUrl.split('/')[3];
    const match = type === "tv" ? currentUrl.match(/\/tv\/(\d+)/) : currentUrl.match(/\/movie\/(\d+)/);
    const api = match ? match[1] : "";

    var player_url, location, iframeId;

    if (type === "movie") {
        player_url = `https://vidsrc.xyz/embed/movie/${api}`;
        iframeId = "vidsrc.xyz.movie";
    } else if (type === "tv") {
        player_url = `https://vidsrc.xyz/embed/tv/${api}`;
        iframeId = "vidsrc.xyz.tv";
    } else {
        console.error("Unsupported page type:", type);
        return;
    }

    location = document.querySelector("div.header");
    if (!location) {
        console.error("Cannot find suitable location to insert iframe.");
        return;
    }

    const existingIframe = document.getElementById(iframeId);
    if (existingIframe) {
        existingIframe.remove();
    }

    let ifr = document.createElement("iframe");
    ifr.id = iframeId;
    ifr.height = 400;
    ifr.width = 400;
    ifr.allowFullscreen = "true";
    ifr.webkitallowfullscreen = "true";
    ifr.mozallowfullscreen = "true";
    ifr.src = player_url;

    location.after(ifr);
})();
