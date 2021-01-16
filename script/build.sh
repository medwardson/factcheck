#!/bin/bash

build() {
    echo 'building react'

    rm -rf dist/*

    export INLINE_RUNTIME_CHUNK=false
    export GENERATE_SOURCEMAP=false
    export GOOGLE_API_KEY=AIzaSyDIYOa7B1fMDyEcBifamgtQvWmS4zoSTqw

    set GOOGLE_API_KEY=AIzaSyDIYOa7B1fMDyEcBifamgtQvWmS4zoSTqw && react-scripts build

    mkdir -p dist
    cp -r build/* dist

    mv dist/index.html dist/popup.html
}

build