<template>
    <div>
        <table class="highlight">
            <thead>
                <tr>
                    <th v-for="key in columns">{{key|capitalize}}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="entry in filteredItems" v-on:click="click(entry)">
                    <td class="photocolumn">
                        <img :src="entry.photo" alt="" class="circle">
                    </td>
                    <td class="namecolumn">
                        {{entry.name}}
                    </td>
                    <td class="timecolumn">
                        {{entry.time}}
                    </td>
                </tr>
            </tbody>
        </table>
        <ul class="pagination left-align row">
            <li class=""><a href="#!" v-on:click="chevron('dec')"><i class="material-icons">chevron_left</i></a></li>
            <li class="waves-effect" v-for="(count, index) in pageCount" v-on:click="clickPaginate(count)" v-bind:class="{ active: (activePage == (count)) }"><a href="#!">{{count}}</a></li>
            <li class="waves-effect"><a href="#!" v-on:click="chevron('inc')"><i class="material-icons">chevron_right</i></a></li>
            <li class="right">
                <select class="browser-default" @change="onChange($event)">
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20" selected="selected">20</option>
                    <option value="50">50</option>
                    <option value="50">100</option>
                </select>
            </li>
        </ul>
    </div>
</template>

<script>
    import Fuse from 'fuse.js'
    import firebase from 'firebase/app'
    import 'firebase/database'
    
    export default {
        name: 'LogTables',
        props: {
            rowData: Array,
            columns: Array,
            searchQuery: String
        },
        data: function() {
            return {
                pageNumbers: 10,
                activePage: 1,
                backup: [],
                newRowData: []
            }
        },
        computed: {
            sortedItems: function() {
                if ((this.newRowData.length == 0)) {
                    this.newRowData = this.rowData
                }

                this.newRowData.sort((a, b) => {
                    return new Date(a.time) - new Date(b.time);
                });
                this.newRowData.reverse();
                return this.newRowData;
            },
            pageCount() {
                let l = Math.ceil(this.newRowData.length / this.pageNumbers);
                var arr = []
                for (var i = 1; i <= l; i++) {
                    arr.push(i)
                }
                return arr
            },
            filteredItems() {
                let start = ((this.activePage - 1) * this.pageNumbers);
                let end = Number(start) + Number(this.pageNumbers);
                return this.sortedItems.slice(start, end);
            },
        },
        filters: {
            capitalize: function(str) {
                return str.charAt(0).toUpperCase() + str.slice(1)
            }
        },
        methods: {
            clickPaginate(clickedNum) {
                if (!clickedNum) {
                    clickedNum = 1
                }
                this.activePage = clickedNum
            },
            onChange(event) {
                this.pageNumbers = event.target.value
            },
            chevron(incdec) {
                if (incdec == 'inc') {
                    if (this.activePage + 1 <= this.pageCount.length) {
                        this.clickPaginate(this.activePage + 1)
                    } else {
                        this.clickPaginate(1)
                    }
                } else {
                    if (this.activePage - 1 > 0) {
                        this.clickPaginate(this.activePage - 1)
                    } else {
                        this.clickPaginate(this.pageCount.length)
                    }
                }
            },
            click(entry) {
                firebase.database().ref('/logs/userLogs/'+ entry.id).remove();
                alert('removed')
            }
        },
        watch: {
            searchQuery: function(query) {
                var options = {
                    shouldSort: true,
                    threshold: 0.35,
                    keys: ["name", "time"]
                };

                var fuse = new Fuse(this.sortedItems, options)

                this.newRowData = fuse.search(query)
            }
        }
    }

</script>

<style scoped>
    .photocolumn,
    th:first-child,
    th:first-child {
        width: 12%;
        min-width: 70px;
    }

    .circle {
        width: 30px;
        margin-left: 4px;
    }

    td {
        padding: 5.5px 5px;
    }

    th.active .arrow {
        opacity: 1;
        background: transparent
    }

    .arrow {
        display: inline-block;
        vertical-align: middle;
        width: 0;
        height: 0;
        margin-left: 5px;
        opacity: 0.36;
    }

    .arrow.asc {
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-bottom: 4px solid #000;
    }

    .arrow.dsc {
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-top: 4px solid #000;
    }

    th.active .arrow[data-v-6f75ebdf] {
        opacity: 1;
        background: transparent;
    }

    .pagination li.active {
        background-color: #5a983f;
    }

</style>
