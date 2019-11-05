<template>
    <Layout>
        <div class="main-panel" slot="body">
            <div class="content-wrapper">
                <div class="page-header">
                    <h3 class="page-title">
                            <span class="page-title-icon bg-jive-blue text-white mr-2"> <i
                                    class="mdi mdi-cash-multiple"></i></span>
                        Payments
                    </h3>
                </div>
                <div style="textAlign:'center', justifyContent:'center',alignItems:center" className="animated fadeIn">
                <Loader v-if="loading" :showFull=true :loading-text="loadingText"/>

                <h2 class="choose-plan">Choose Your Payment Plan</h2>
                    <div class="animated fadeIn">
                        <div class="container">
                        <div class="row">
                <div class="col-md-4" v-for="(payment, index) in paymentData" :key="index">
                    <div class="choose">
                    <h2 class="head-bg">{{payment.name}}</h2>
                    <p>N{{payment.price}}<span>/ Monthly</span> </p>
                    <p>{{payment.amount}}<span>/ Users</span></p>
                     <!--<RavePayment v-bind:price="paymentData.price" v-bind:subscription="paymentData.uuid"/>-->
                        <button type="submit" class="btn2 submit">PAY NOW</button>
                </div>

        </div>
                        

                </div>
                </div>
            </div>
            </div>
            </div>
            </div>
    
      
    </Layout>
</template>

<script>
    import Layout from '../../components/Layout';
    import {Paymentservice} from "../../services/PaymentPlan.Service";
    // import {RavePayment} from "../../components/RavePayment"
    import Loader from '../../components/Loader/Loader';



    const action = [
        {
            class: 'btn btn-primary',
            actionType: 'click',
            callback: 'UpgradeAdmin',
            args: ['AdminId'],
            text: 'Upgrade Admin'
        },
        // {
        //     class: 'btn btn-danger',
        //     actionType: 'click',
        //     callback: 'BlockUser',
        //     text: 'Block User'
        // }
    ];


    export default {
        name: "paymentplan",
        props:['price','subscription'],
            
        
        data() {
            return {
                title: "PaymentPlan",
                perPage: 10,
                sortable: false,
                searchable: true,
                loading: true,
                paymentData: [],
                isLoading:false,
                actions: action,
                loadingText:"loading...",
                callbacks: ['test', 'UpgradeAdmin'],
            }
        },
        async created() {
             this.loading=true
            await Paymentservice.payment().then((response) => {
                 this.paymentData=response
                 window.console.log(this.paymentData)
                this.loading = false;
            }).catch((err) => window.console.log(err));
        },
         methods: {
                test(adminId) {
                    window.console.log("AdminId:" + adminId);
                },
                blockUser() {
                    window.alert('Blocked User');
                },
                
            },
        components: {Layout,Loader}
    }
</script>

<style scoped>

</style>