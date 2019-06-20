<template>
  <table class="highlight">
    <thead>
        <tr>
            <th v-for="key in columns"
              @click="sortBy(key)"
              :class="{ active: sortKey == key }">
              {{ key | capitalize }}
              <span class="arrow" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'">
              </span>
            </th>
        </tr>
    </thead>
    <tbody>
      <tr v-for="entry in filteredHeroes">
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
</template>

<script>
    export default {
        name: 'LogTables',
        props: {
            rowData: Array,
            columns: Array,
            filterKey: String
        },
        data: function() {
            var sortOrders = {}
            this.columns.forEach(function(key) {
                sortOrders[key] = 1
            })
            return {
                sortKey: '',
                sortOrders: sortOrders
            }
        },
        computed: {
            filteredHeroes: function() {
                var sortKey = this.sortKey
                var filterKey = this.filterKey && this.filterKey.toLowerCase()
                var order = this.sortOrders[sortKey] || 1
                var rowData = this.rowData
                if (filterKey) {
                    rowData = rowData.filter(function(row) {
                        return Object.keys(row).some(function(key) {
                            return String(row[key]).toLowerCase().indexOf(filterKey) > -1
                        })
                    })
                }
                if (sortKey) {
                    rowData = rowData.slice().sort(function(a, b) {
                        a = a[sortKey]
                        b = b[sortKey]
                        return (a === b ? 0 : a > b ? 1 : -1) * order
                    })
                }
                return rowData
            }
        },
        filters: {
            capitalize: function(str) {
                return str.charAt(0).toUpperCase() + str.slice(1)
            }
        },
        methods: {
            sortBy: function(key) {
                this.sortKey = key
                this.sortOrders[key] = this.sortOrders[key] * -1
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

</style>
