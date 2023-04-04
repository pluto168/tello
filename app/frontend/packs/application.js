// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

import Rails from "@rails/ujs"
import * as ActiveStorage from "@rails/activestorage"
import "channels"

Rails.start()
ActiveStorage.start()

import 'scripts'
import 'styles'

//vue.js
import Vue from 'vue/dist/vue.esm';
import List from 'components/list';

document.addEventListener("DOMContentLoaded",function(event){
    let el = document.querySelector('#board');
    if (el) {
        new Vue({
            el: el,
            data: {
                lists: JSON.parse(el.dataset.lists)
            },
            components: {
                List: List
            }
        });
    }
})