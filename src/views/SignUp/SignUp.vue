<template>
    <section class="signup-page flex-container">
        <div class="container-fluid ">
            <Loader v-if="loading" :show-full="true" loading-text=" Please wait..."/>
            <div class="row">
                <div class="col-md-8 hidden-xs hidd" style="padding: 0;margin: 0">
                    <div class="signup-bg" >

                        <div class="signup-left">
                            <img src="../../assets/images/jive-white.svg" alt='' class="signup-img-left"/>
                            <p class="signup-info-left">Manage your event successfully. With just a simple click, attendees have access to event invites – no paper needed.</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-4" style="padding:0;margin:0">
                    <div class="signup-form">
                        <div class="row" >
                            <div class="col-md-12 create">

                                <h2 class="creat">Create an Account</h2>
                            </div>

                        </div>

                        <div class="row">
                            <div class="contact_from">
                                <form @submit.prevent="Register">
                                    <div class="contact_input_area">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <input
                                                            type="text"
                                                            class="form-control"
                                                            name="first_name"
                                                            v-model="first_name"
                                                            id="first_name"
                                                            placeholder="First Name"
                                                            required/>
                                                </div>
                                            </div>

                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <input
                                                            type="name"
                                                            class="form-control"
                                                            name="last_name"
                                                            v-model="last_name"
                                                            id="last_name"
                                                            placeholder="Last Name" required/>
                                                </div>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <input type="name"
                                                           class="form-control"
                                                           name="username"
                                                           v-model="username"
                                                           placeholder="User Name"
                                                           required/>
                                                </div>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <input type="email"
                                                           class="form-control"
                                                           name="email"
                                                           v-model="email"
                                                           placeholder="E-mail"
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
                                                <button type="submit"  class="btn submit-btn1"> SIGNUP
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                </form>

                            </div>
                        </div>
                        <div class="row account">
                            <div class="col-md-10 pull-left logg">Already have an account?</div>
                            <div class="col-md-2 pull-right loog"> <router-link to="/" style="color:red" class="loggg">Login</router-link></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </section>

</template>
<script>
    import Loader from "../../components/Loader/Loader";
    import {userService} from "../../services/user.service";
    import {mapActions} from "vuex";

    export default {
        name: 'SignUpPage',
        components: {Loader},
        data: function () {
            return {
                first_name:'',
                last_name:'',
                username:'',
                email:'',
                password: '',
                loading: false,
                isSuccess: false,
            }
        },

        methods: {
            ...mapActions({loginUser: "LOGIN"}),
            async Register() {
                this.loading = true;
                await userService.register({
                    first_name: this.first_name,
                    last_name: this.last_name,
                    username: this.username,
                    email: this.email,
                    password: this.password,
                }).then((res) => {
                    this.$toastr.success(res.message, "", {timeOut: 5000});
                }).catch((error) => {
                    this.$toastr.error(error.data.errors, "signup failed!", {timeOut: 5000});
                });
                this.loading = false;

            },


        }

    }
</script>
