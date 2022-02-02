<template>
    <div>
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-12 col-md-3 mb-2">
                                <label>Tanggal</label>
                                <input type="text" class="form-control" id="daterangepicker" readonly>
                            </div>
                            <div class="col-12 col-md-3 mb-2">
                                <label>Kode Device</label>
                                <input type="text" class="form-control" v-model="form.code">
                            </div>
                            <div class="col-12 col-md-3 mb-2">
                                <label>No. WA</label>
                                <input type="text" class="form-control" v-model="form.phone">
                            </div>
                            <div class="col-12 col-md-3 mb-2">
                                <label>Pemilik</label>
                                <input type="text" class="form-control" v-model="form.user_name">
                            </div>
                            <div class="col-12 col-md-3 mb-2">
                                <label>Status</label>
                                <select class="form-control" v-model="form.status">
                                    <option value="all">Semua</option>
                                    <option value="IDLE">IDLE</option>
                                    <option value="LOADING">LOADING</option>
                                    <option value="PAIRING">PAIRING</option>
                                    <option value="PAIRED">PAIRED</option>
                                </select>
                            </div>
                            <div class="col-12 col-md-3 mb-2">
                                <button type="button" class="btn btn-info btn-md" @click="onLoad">Cari</button>
                                <button type="button" class="btn btn-dark btn-md" @click="onReset">Reset</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12">
                <div class="card">
                  <div class="card-header">
                    <h3 class="card-title">Daftar Device</h3>
                    <div class="card-tools">

                    </div>
                  </div>
                  <!-- /.card-header -->
                  <div class="card-body table-responsive p-0">
                    <table class="table table-hover text-nowrap">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>User</th>
                          <th>Date</th>
                          <th>Status</th>
                          <th>Reason</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>183</td>
                          <td>John Doe</td>
                          <td>11-7-2014</td>
                          <td><span class="tag tag-success">Approved</span></td>
                          <td>Bacon ipsum dolor sit amet salami venison chicken flank fatback doner.</td>
                        </tr>
                        <tr>
                          <td>219</td>
                          <td>Alexander Pierce</td>
                          <td>11-7-2014</td>
                          <td><span class="tag tag-warning">Pending</span></td>
                          <td>Bacon ipsum dolor sit amet salami venison chicken flank fatback doner.</td>
                        </tr>
                        <tr>
                          <td>657</td>
                          <td>Bob Doe</td>
                          <td>11-7-2014</td>
                          <td><span class="tag tag-primary">Approved</span></td>
                          <td>Bacon ipsum dolor sit amet salami venison chicken flank fatback doner.</td>
                        </tr>
                        <tr>
                          <td>175</td>
                          <td>Mike Doe</td>
                          <td>11-7-2014</td>
                          <td><span class="tag tag-danger">Denied</span></td>
                          <td>Bacon ipsum dolor sit amet salami venison chicken flank fatback doner.</td>
                        </tr>
                      </tbody>
                    </table>
                    <pagination :records="total" v-model="page" :per-page="per_page" @paginate="onLoad"></pagination>
                  </div>
                  <!-- /.card-body -->
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import $ from 'jquery';
import 'daterangepicker/daterangepicker.js';
import 'daterangepicker/daterangepicker.css';
import Query from 'query-string';
export default {
    data() {
        return {
            isLoading: false,
            page: 1,
            per_page: 25,
            total: 0,
            items: [],
            form: {
                code: null,
                user_name: null,
                phone: null,
                status: 'all',
                first_date: null,
                last_date: null
            },
            date_range: null
        }
    },
    created() {
        const self = this;
        $(function() {
            $('#daterangepicker').daterangepicker({
                "locale": {
                    "format": "YYYY-MM-DD"
                },
                "cancelButtonClasses": "btn-dark",
                "autoUpdateInput": false,
                "showDropdowns": true,
                "minYear": 2021,
                "maxYear": 2021,
                ranges: {
                    'Today': [moment().tz(window.TIMEZONE), moment().tz(window.TIMEZONE)],
                    'Yesterday': [moment().tz(window.TIMEZONE).subtract(1, 'days'), moment().tz(window.TIMEZONE).subtract(1, 'days')],
                    'Last 7 Days': [moment().tz(window.TIMEZONE).subtract(6, 'days'), moment().tz(window.TIMEZONE)],
                    'Last 30 Days': [moment().tz(window.TIMEZONE).subtract(29, 'days'), moment().tz(window.TIMEZONE)],
                    'This Month': [moment().tz(window.TIMEZONE).startOf('month'), moment().tz(window.TIMEZONE).endOf('month')],
                    'Last Month': [moment().tz(window.TIMEZONE).subtract(1, 'month').startOf('month'), moment().tz(window.TIMEZONE).subtract(1, 'month').endOf('month')]
                },
                "alwaysShowCalendars": true,
                "startDate": moment().tz(window.TIMEZONE),
                "endDate": moment().tz(window.TIMEZONE),
                "minDate": "2021-01-01",
                "maxDate": moment().tz(window.TIMEZONE),
                "opens": "right"
            }, function(start, end, label) {
                self.date_range = [start, end];
                self.onRange();
            });

            $('#daterangepicker').on('apply.daterangepicker', function(ev, picker) {
                $(this).val(picker.startDate.format('YYYY-MM-DD') + ' - ' + picker.endDate.format('YYYY-MM-DD'));
                self.date_range = [picker.startDate, picker.endDate];
                self.onRange();
            });
        });
        this.onLoad();
    },
    methods: {
        onRange() {
            this.form.first_date = this.date_range[0]
                ? moment(this.date_range[0]).format("YYYY-MM-DD") + " 00:00:00"
                : null;
            this.form.last_date = this.date_range[1]
                ? moment(this.date_range[1]).format("YYYY-MM-DD") + " 23:59:59"
                : null;
        },
        onLoad() {
            const self = this;
            axios.get('/devices?' + Query.stringify(this.form))
                .then(r => {
                    console.log(r);
                })
                .catch(e => {
                    console.log(e);
                });
        },
        onReset() {
            this.form = {
                code: null,
                user_name: null,
                phone: null,
                status: 'all',
                first_date: null,
                last_date: null
            }
        }
    }
}
</script>
