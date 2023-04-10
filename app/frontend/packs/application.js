// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

import * as ActiveStorage from "@rails/activestorage"
import Rails from "@rails/ujs"
import "channels"

Rails.start()
ActiveStorage.start()

import 'scripts'
import 'styles'

//vue.js
import Vue from 'vue/dist/vue.esm';
import List from 'components/list';
import draggable from 'vuedraggable';

document.addEventListener("DOMContentLoaded",function(event){
    let el = document.querySelector('#board');
    if (el) {
        new Vue({
            el: el,
            data: {
                lists: [] //JSON.parse(el.dataset.lists)
            },
            components: { List: List,draggable },
            methods: {
                listMoved(event){
                    // console.log(event);
                    let data = new FormData();
                    data.append("list[position]", event.moved.newIndex + 1);

                    Rails.ajax({
                        // /lists/2/move
                        url: `/lists/${this.lists[event.moved.newIndex].id}/move`,
                        type: 'PUT',
                        data: data,
                        dataType: 'json',
                        success: resp => {
                            console.log(resp);
                        },
                        error: err => {
                            console.log(err);
                        } 
                    });
                }
            },
            beforeMount() {
                Rails.ajax({
                    url: 'lists.json',
                    type: 'GET',
                    dataType: 'json',
                    success: resp => {
                        // console.log(resp);
                        this.lists = resp;
                    },
                    error: err => {
                        console.log(err);
                    }
                });
            }
        });
    }
})