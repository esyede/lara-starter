<template>
<div class="card">
    <div class="card-header">
        <h3 class="card-title">Devices</h3>
        <button class="btn btn-sm btn-success float-right"><i class="fas fa-plus"></i> Tambah</button>
    </div>
    <form>
        <div class="card-body">
            <div id="example2_wrapper" class="dataTables_wrapper dt-bootstrap4">
                <div class="row">
                    <div class="col-sm-12">
                        <table id="example2" class="table table-bordered table-hover dataTable dtr-inline" role="grid" aria-describedby="example2_info">
            <thead>
                <tr role="row">
                    <th class="sorting sorting_asc">Name</th>
                    <th class="sorting">Phone</th>
                    <th class="sorting">WA Name</th>
                    <th class="sorting">Device</th>
                    <th class="sorting">Status</th>
                    <th class="sorting">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr class="odd">
                    <td>Meizu</td>
                    <td>6288217906171</td>
                    <td>Suyadi</td>
                    <td>Meizu (64%)</td>
                    <td>PAIRED</td>
                    <td>
                        <button class="btn btn-info btn-sm" v-tooltip="'Pair'"><i class="fas fa-key"></i></button>
                        <button class="btn btn-primary btn-sm" v-tooltip="'Settings'"><i class="fas fa-wrench"></i></button>
                        <button class="btn btn-danger btn-sm" v-tooltip="'Delete'"><i class="fas fa-trash"></i></button>
                    </td>
                </tr>
                <tr class="even">
                    <td>Meizu</td>
                    <td>6288217906171</td>
                    <td>Suyadi</td>
                    <td>Meizu (64%)</td>
                    <td>PAIRED</td>
                    <td>
                        <button class="btn btn-info btn-sm" v-tooltip="'Pair'"><i class="fas fa-key"></i></button>
                        <button class="btn btn-primary btn-sm" v-tooltip="'Settings'"><i class="fas fa-wrench"></i></button>
                        <button class="btn btn-danger btn-sm" v-tooltip="'Delete'"><i class="fas fa-trash"></i></button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
<div class="row">
    <div class="col-sm-12 col-md-5">
        <div class="dataTables_info" id="example2_info" role="status" aria-live="polite">Showing 1 to 10 of 57 entries
        </div>
    </div>
    <div class="col-sm-12 col-md-7">
        <div class="dataTables_paginate paging_simple_numbers pull-right" id="example2_paginate">
            <ul class="pagination justify-content-end">
                <li class="paginate_button page-item previous disabled" id="example2_previous">
                    <a href="#" aria-controls="example2" data-dt-idx="0" tabindex="0" class="page-link">Previous</a>
                </li>
                <li class="paginate_button page-item active">
                    <a href="#" aria-controls="example2" data-dt-idx="1" tabindex="0" class="page-link">1</a>
                </li>
                <li class="paginate_button page-item ">
                    <a href="#" aria-controls="example2" data-dt-idx="2" tabindex="0" class="page-link">2</a>
                </li>
                <li class="paginate_button page-item ">
                    <a href="#" aria-controls="example2" data-dt-idx="3" tabindex="0" class="page-link">3</a>
                </li>
                <li class="paginate_button page-item next" id="example2_next">
                    <a href="#" aria-controls="example2" data-dt-idx="7" tabindex="0" class="page-link">Next</a>
                </li>
            </ul>
        </div>
    </div>
</div>
</div>
</div>
</form>
</div>
</template>
<script>
    export default {
      name: "devices.index",
      data() {
        return {
          page: 1,
          total: 0,
          per_page: 20,
          isLoading: true,
          sort: "desc",
          dateRange: null,
          firstDate: null,
          lastDate: null
        };
      },
      created() {
        // ..

        this.onLoad();
      },
      methods: {
        onLoad() {
            const self = this;
            this.isLoading = true;
            axios.get(
                "/devices?page=" + self.page +
                "&per_page=" + self.per_page +
                "&amount=" + self.amount +
                "&merchant=" + self.merchant +
                "&status=" + self.status +
                "&reference=" + self.reference +
                "&firstDate=" + self.firstDate +
                "&lastDate=" + self.lastDate
            )
            .then(result => {
                self.items = result.data.data;
                self.total = result.data.total;
                self.page = result.data.current_page;
                self.per_page = result.data.per_page;
                this.isLoading = false;
            })
                .catch(err => {
                this.isLoading = false;
            });
        },
        onRange() {
            this.firstDate = this.dateRange[0]
                ? moment(this.dateRange[0]).format("YYYY-MM-DD") + " 00:00:00"
                : null;

            this.lastDate = this.dateRange[1]
                ? moment(this.dateRange[1]).format("YYYY-MM-DD") + " 23:59:59"
                : null;
        },
        onSearch() {
            this.page = 1;
            this.onLoad();
        },
        onReset() {
            $('input#date_range').val("");
            this.page = 1;
            this.per_page = 20;
            this.dateRange= null;
            this.firstDate= null;
            this.lastDate= null;
            this.onLoad();
        },
      }
    };
</script>
