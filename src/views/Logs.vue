<template>
  <div class="hello container">
    <div class="row">
        <div class="col s12 ">
            <div class="card">
                  <nav>
                    <div class="nav-wrapper light-green darken-3">
                      <form>
                        <div class="input-field">
                          <input id="search" type="search" v-model="searchQuery">
                          <label class="label-icon" for="search"><i class="material-icons">search</i></label>
                          <i class="material-icons">close</i>
                        </div>
                      </form>
                    </div>
                  </nav>
                <div class="table">
                    <logs-table
                    :rowData="rowData"
                    :columns="columnData"
                    :searchQuery="searchQuery">
                  </logs-table>
                </div>
            </div>
        </div>
    </div>

  </div>
</template>

<script>
    import firebase from 'firebase/app'
    import 'firebase/database'
    import moment from 'moment'
    import LogsTable from '../components/LogsTable.vue';

    export default {
        name: 'Logs',
        data() {
            return {
                searchQuery: '',
                columnData: ['photo', 'name', 'time'],
                rowData: [],
                tableRows: []
            }
        },
        mounted() {
            firebase.database().ref('logs/userLogs/').once('value').then(snapshot => {
                this.addRowTable(snapshot.val());
            })
        },
        updated() {},
        methods: {
            onRowClick: function(row) {
                console.log(row)
            },
            addRowTable: function(data) {
                for (let key in data) {
                    let time = moment(data[key].log).format("lll")
                    this.rowData.push({
                        name: data[key].name,
                        time: time,
                        photo: data[key].photoURL
                    })
                }
            }
        },
        components: {
            LogsTable
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped="">
    .hello {
        min-height: 85vh;
        margin-top: 35px
    }

    .table {
        padding: 27px
    }

</style>
