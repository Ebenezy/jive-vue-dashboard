<template>
    <Layout>
        <!-- partial -->
        <div class="main-panel" slot="body">
            <div class="content-wrapper">
                <div class="page-header">
                    <h3 class="page-title">
              <span class="page-title-icon bg-jive-blue text-white mr-2">
                <i class="mdi mdi-home"></i>
              </span>
                        Dashboard
                    </h3>
                </div>
                <div class="row">
                    <div class="col-md-3 stretch-card grid-margin">
                        <div class="card bg-gradient-danger card-img-holder text-white">
                            <div class="card-body">
                                <img src="../../assets/images/circle.svg" class="card-img-absolute"
                                     alt="circle-image"/>
                                <h4 class="font-weight-normal mb-3">Wallet Balance
                                    <i class="mdi mdi-google-wallet mdi-18px float-right"></i>
                                </h4>
                                <h2 class="mb-5">{{user.details.balance || 0}}</h2>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3 stretch-card grid-margin">
                        <div class="card bg-gradient-info card-img-holder text-white">
                            <div class="card-body">
                                <img src="../../assets/images/circle.svg" class="card-img-absolute"
                                     alt="circle-image"/>
                                <h4 class="font-weight-normal mb-3"> Total Verified Invite
                                    <i class="mdi mdi-external-link mdi-18px float-right"></i>
                                </h4>
                                <h2 class="mb-5">{{user.details.verified_invite || 0}}</h2>
                                <!--<h6 class="card-text">Decreased by 10%</h6>-->
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3 stretch-card grid-margin">
                        <div class="card bg-gradient-success card-img-holder text-white">
                            <div class="card-body">
                                <img src="../../assets/images/circle.svg" class="card-img-absolute"
                                     alt="circle-image"/>
                                <h4 class="font-weight-normal mb-3">Total Event Created
                                    <i class="mdi-calender-check mdi-24px float-right"></i>
                                </h4>
                                <h2 class="mb-5">{{user.details.events_created || 0}}</h2>
                                <!--<h6 class="card-text">Increased by 5%</h6>-->
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3 stretch-card grid-margin">
                        <div class="card bg-gradient-primary card-img-holder text-white">
                            <div class="card-body">
                                <img src="../../assets/images/circle.svg" class="card-img-absolute"
                                     alt="circle-image"/>
                                <h4 class="font-weight-normal mb-3">Total Link Created
                                    <i class="mdi  mdi-external-link-square mdi-18px float-right"></i>
                                </h4>
                                <h2 class="mb-5">{{user.details.links_created || 0}}</h2>
                                <!--<h6 class="card-text">Increased by 5%</h6>-->
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-12 grid-margin">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title float-left">Recent Event</h4>

                                <div class="table-responsive">
                                    <table class="table">
                                        <thead>
                                        <tr>
                                            <th>
                                                Logo
                                            </th>
                                            <th>
                                               Event
                                            </th>
                                            <th>
                                                Start Date
                                            </th>
                                            <th>
                                                End Date
                                            </th>
                                            <th>
                                                Action
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-for="(users,index) in user.details.events" v-bind:key="index">
                                            <td>
                                                {{users.cover}}
                                            </td>
                                            <td>
                                                {{users.name}}
                                            </td>
                                            <td>
                                                {{users.start_date}}
                                            </td>
                                            <td>
                                                {{users.end_date}}
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-12 grid-margin">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title float-left">Recent Wallet Transaction</h4>
                                <h4 class="float-right">Wallet Balance: {{user.details.balance}}</h4>
                                <div class="table-responsive">
                                    <table class="table">
                                        <thead>
                                        <tr>
                                            <th>Reference</th>
                                            <th>Unit Worth</th>
                                            <th>Description</th>
                                            <th>User</th>
                                            <th>Type</th>
                                            <th>Created</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-for="(wallet, index) in user.details.wallet_history" v-bind:key="index">
                                            <td>{{wallet.reference}}</td>
                                            <td>{{wallet.unit_worth}}</td>
                                            <td>{{wallet.description}}</td>
                                            <td>{{wallet.user}}</td>
                                            <td>
                                                <label class="badge badge-gradient-success" v-if="wallet.type === 'Credit'">
                                                    {{wallet.type}}
                                                </label>
                                                <label class="badge badge-bonus" v-if="wallet.type === 'Bonus'">
                                                    {{wallet.type}}
                                                </label>

                                                <label class="badge badge-gradient-danger" v-else-if="wallet.type === 'Debit'">
                                                    {{wallet.type}}
                                                </label>

                                            </td>
                                            <td>{{wallet.created_at}}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-12 grid-margin">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title float-left"> Transaction History</h4>
                                <h4 class="float-right">Wallet Balance: {{user.details.balance}}</h4>
                                <div class="table-responsive">
                                    <table class="table">
                                        <thead>
                                        <tr>
                                            <th>Reference</th>
                                            <th>Amount Paid</th>
                                            <th>Paid By</th>
                                            <th>Subscription Type</th>
                                            <th>Status</th>
                                            <th>Created</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-for="(wallet, index) in user.details.transaction_history" v-bind:key="index">
                                            <td>{{wallet.reference}}</td>
                                            <td>{{wallet.amount_paid}}</td>
                                            <td>{{wallet.paid_by}}</td>
                                            <td>{{wallet.paid_for}}</td>
                                            <td>{{wallet.gateway_response}}</td>
                                            <td>{{wallet.created_at}}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
            <!-- content-wrapper ends -->
            <!-- partial:partials/_footer.html -->
            <footer class="footer">
                <div class="d-sm-flex justify-content-center justify-content-sm-between">
                        <span class="text-muted text-center text-sm-left d-block d-sm-inline-block">Copyright © 2017 Jive. All rights reserved.</span>
                    <span class="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">Hand-crafted & made with <i
                            class="mdi mdi-heart text-danger"></i></span>
                </div>
            </footer>
            <!-- partial -->
      
        <!-- main-panel ends -->
    </Layout>
</template>

<script>
    import Layout from '../../components/Layout';
    import {mapGetters} from 'vuex';


    export default {
        name: "Dashboard",
        components: {Layout},



        computed: {
            ...mapGetters({user: "GET_USER"}),
            currentPage() {
                return this.$route.name;
            }
        }
    }
</script>

<style scoped>
    .card .card-body {
        padding: 0.5rem 1.5rem;
    }

    .card-body > h4 {
        padding-top: 15px;
    }
</style>