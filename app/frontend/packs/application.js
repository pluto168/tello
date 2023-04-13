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
import draggable from 'vuedraggable';
import store from 'stores/list';
import { mapGetters, mapActions } from "vuex"
import List from 'components/list';
import Newlist from 'components/newlist';

document.addEventListener("DOMContentLoaded",function(event){
    let el = document.querySelector('#board');
    if (el) {
        new Vue({
            el: el,
            store: store,
            // data: {
            //     lists: [] //JSON.parse(el.dataset.lists)
            // },
            computed: {
                // ...mapGetters(["lists"])
                lists: {
                    get(){
                        return this.$store.state.lists;
                    },
                    set(value) {
                        this.$store.commit('UPDATE_LISTS',value);
                    }
                }
            },
            components: { List: List,draggable, Newlist},
            methods: {
                ...mapActions(["loadList","moveList"]),
                // listMoved(event){
                    // console.log(event);
                    // let data = new FormData();
                    // data.append("list[position]", event.moved.newIndex + 1);

                    // Rails.ajax({
                    //     // /lists/2/move
                    //     url: `/lists/${this.lists[event.moved.newIndex].id}/move`,
                    //     type: 'PUT',
                    //     data: data,
                    //     dataType: 'json',
                    //     success: resp => {
                    //         console.log(resp);
                    //     },
                    //     error: err => {
                    //         console.log(err);
                    //     } 
                    // });
                // }
            },
            beforeMount() {
                this.loadList();
            }
        });
    }
})