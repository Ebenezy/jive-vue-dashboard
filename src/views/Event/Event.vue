<template>
    <Layout>
        <div slot="head">
            <modal name="event-link" :height="400">
                <div class="modal-header"><p style="margin-left:10">{{linkData.name}}</p></div>
                <div class="modaly">
                    <p style="fontweight:10px">Event ID: <span> {{linkData.event_id}}</span></p>
                    <p>Invite Link: http://jiveqrcode.herokuapp.com/invite/{{linkData.friendly_url}}</p>
                    <p>Description: {{linkData.message}}</p>
                    <p>Max-Usage: {{linkData.max_usage}}</p>
                    <p>Number of Clicks:{{linkData.visit_count}}
                    <p>Date: {{linkData.created_at}}</p>

                </div>
                <div class="modal-footer">
                    <button @click="closeEventLink" class="btn btn-primary mx-auto">Close</button>
                </div>
            </modal>
        </div>
         <div slot="head">
            <modal name="event-edit" :height="500">
                <div class="modal-header">
                    Edit Event 
                </div>
               
                <div class="modal-footer">
                    <button @click="closeEditEvent" class="btn btn-primary mx-auto">Close</button>
                </div>
            </modal>
        </div>
        <!-- partial -->
        <div class="main-panel" slot="body">
            <Loader v-if="isLoading" :showFull=true :loading-text="loadingText"/>
            <div class="content-wrapper">
                <div class="page-header">
                    <h3 class="page-title">
                            <span class="page-title-icon bg-jive-blue text-white mr-2"> <i
                                    class="mdi mdi-cash-multiple"></i></span>
                        Event
                    </h3>
                </div>
                <div class="row">
                    <div class="col-lg-12 grid-margin stretch-card">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title"></h4>
                                <Datatable :columns="columns" :data="eventsData" @deleteevent="deleteevent"
                                           @eventLink="eventLink" @openEventModal="openEventModal"
                                           :loading="loading" :actions="actions">
                                </Datatable>
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
    import {eventService} from "../../services/Event.service";
    import Datatable from '../../components/Datatable/Datatable';
    import Loader from '../../components/Loader/Loader';  
    import 'vue-datetime/dist/vue-datetime.css'
    import moment from 'moment'


    const action = [
        {
            class: 'btn btn-primary',
            callback: 'openEventModal',
            args: ['AdminId'],
            text: 'Edit',
            title: "Confirm this transaction as successful",
        },
        {
            class: 'btn btn-danger',
            callback: 'deleteevent',
            args: ['AdminId'],
            text: 'Delete',
            title: "Confirm this transaction as successful",
        },
        {
            class: 'btn btn-info',
            callback: 'eventLink',
            args: ['AdminId'],
            text: 'Invite ',
        }
    ];

    export default {
        name: "Event",
        data() {
            return {
                title: "Event",
                columns: ['Logo', 'Event', 'Start Date', 'End Date',],
                perPage: 10,
                sortable: false,
                searchable: true,
                loading: true,
                eventsData: [],
                actions: action,
                callbacks: ['test', 'delete '],
                isLoading: false,
                loadingText: "loading...",
                linkData:[],
                name: '',
                descritpion: '',
                start_date: '',
                end_date: '',
                max_usage:'',
                description:'',
                color:'',
                logo:'',
            }
        },
        async created() {
          await this.fetchEvents();  
        },
        methods: {
            fetchEvents() {
                this.eventsData = [];

                eventService.eventlist().then((response) => {
                response.forEach(({logo_url: logo, end_date: date_end, start_date:date_start, name:event_name, uuid:adminId}) => {
                    this.eventsData.push({
                        Logo: '<img :src="http://198.58.110.127/jive-api/event_logo/"'+logo+'"/>',
                         Event: event_name,
                        'Start Date':date_start,
                        'End Date':date_end,
                        'AdminId':adminId,
                    
                    });
                });
                this.loading = false;
            }).catch((err) => {
                  window.console.log(err)
                });
            },
            deleteevent(ref) {
                this.loadingText = "deleting event...";
                this.isLoading = true;
                eventService.deleteevent(ref).then((res)=>{
                    this.isLoading = false;
                    this.eventsData.splice(ref, 1);
                    this.$toastr.success(res.message, {timeOut: 5000});
                    this.loading = false;
                }).catch((err) => {
                    this.isLoading = false;
                    this.$toastr.error(err.message || "Event delete failed", "Error!", {timeOut: 5000});
                });
            },
            deletePay() {
                window.alert('deleted');
            },
            openEventModal(){
                      this.$modal.show('event-edit');
            },
            closeEventLink() {
                this.$modal.hide('event-link');
            },
            closeEditEvent() {
                this.$modal.hide('comfirm-payment');
            },
            eventLink(reference) {
                this.loadingText = "please wait...";
                this.isLoading = true;

                eventService.vieweventlink(reference).then((response) => {
                    this.isLoading = false;
                    let that=this
                    response.forEach(function(item){
                        that.linkData=item
                    });
                
                    this.$modal.show('event-link');
                }).catch((err) => this.$toastr.error(err.message || "Event link failed", "Error!", {timeOut: 5000}));

            },
            eventedit(reference) {
                this.loadingText = "please wait...";
                this.isLoading = true;
                 this.loading = true;
                 let bodyFormData = new FormData()
                bodyFormData.set('name', this.name);
                bodyFormData.set('start_date', moment(this.start_date).format('MM/DD/YYYY hh:mma'));
                bodyFormData.set('end_date', moment(this.end_date).format('MM/DD/YYYY hh:mma'));
                bodyFormData.set('max_usage', this.max_usage);
                bodyFormData.set('description',this.description)
                bodyFormData.set('logo',this.logo);
                eventService.editevent(reference).then((response) => {
                this.isLoading = false;
                this.$toastr.success(response.message, {timeOut: 5000});

                 
                  
                }).catch((err) => this.$toastr.error(err.message || "Event link failed", "Error!", {timeOut: 5000}));

            }
        },
        components: {
            Layout, Datatable, Loader
        }
    }
</script>

<style scoped>

</style>