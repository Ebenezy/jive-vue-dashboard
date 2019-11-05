<template>
    <section class="signup-page flex-container">
        <Loader v-if="loading" :showFull=true loading-text="Please wait..."/>
        <div class="container-fluid ">
            <div class="row">
                <div class="col-md-4" style="padding: 0; margin: 0">
                    <div class="signup-form">
                        <div class="row" >
                            <div class="col-md-12 create">
                                <h2 class="creat">Login</h2>
                            </div>

                        </div>

                        <div class="row">
                            <div class="contact_from">
                                <form  ref="formdemo" @submit.prevent="Login">

                                    <div class="contact_input_area">
                                        <div class="row">


                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <input type="name"
                                                           class="form-control"
                                                           name="login"
                                                           v-model="login"
                                                           placeholder="Username"
                                                           required/>
                                                </div>
                                            </div>


                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <input type="password"
                                                           class="form-control"
                                                           name="password"
                                                           v-model="password"
                                                           placeholder="Password"
                                                           required/>
                                                </div>
                                            </div>

                                            <div class="col-12 submt">
                                                <button  type="submit"  class="btn submit-btn1"><i class=""></i> LOGIN
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                </form>

                            </div>
                        </div>
                        <div class="row account">
                            <div class="col-md-9 pull-left logg">Don't have an account?</div>
                            <div class="col-md-3 pull-right loog"> <router-link to="/signup" style="color:red" class="loggg ">Signup </router-link></div>
                        </div>
                    </div>
                </div>

                <div class="col-md-8 hidden-md hidden-sm hidden-xm" style="padding:0;margin: 0">
                    <div class="signup-bg">
                        <div class="signup-left">
                            <img src='../../assets/images/jive-white.svg' alt="" class="signup-img-left"/>
                            <p class="signup-info-left">Manage your event successfully. With just a simple click, attendees have access to event invites – no paper needed. </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>

</template>
<!-- container-scroller -->

<script>
    import Loader from "../../components/Loader/Loader";
    import {mapActions} from 'vuex';
    import router from '../../router';


    export default {
        name: 'Login',
        components: {Loader},
        data: function () {
            return {login: '', password: '', loading: false}
        },
        methods: {
            ...mapActions({loginUser: 'LOGIN'}),
            async Login() {
                this.loading = true;
                await this.loginUser({
                    login: this.login,
                    password: this.password
                }).then(function () {
                    router.push({name: 'dashboard'});
                }).catch((error) => {
                    this.$toastr.error(error.error, "Login Failed!", {timeOut: 5000});
                });
                this.loading = false;
            }
        }
    }
</script>