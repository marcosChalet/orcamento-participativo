import React, { createContext } from 'react';
import Strapi from "strapi-sdk-js";

let localIP:string = '192.168.0.6'

const api = new Strapi({
    url: `http://${localIP}:1337`,
    prefix: "/api",
    store: {
      key: "strapi_jwt",
      useLocalStorage: false,
      cookieOptions: { path: "/" },
    },
    axiosOptions: {
      headers: {
        'Authorization': 'Bearer 0ff43ad4a5309535078ffc1ece03c4408b9786e1a1e5e616479999a85cc15eaa6bc0f1b47731777a9d883c74dfc53bd3c7248b7ff9de0175846462168bb4849ab0225bc59c0cc3963e62916b8f9e95bb5bbc24e9d5d987c2f20334ad20187605d8078d55592d782205499b2b42bd6260c9ebb216d52928b6986b923fece42817',
        'Content-Type': 'application/json',
      }
    },
  })

const strapi = api;

export default strapi;