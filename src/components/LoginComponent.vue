<template>
    <div v-if="this.$store.state.LoggedIn">
        <h1>Welcome!</h1>
        <div>
            <b-form-input required type="text" name="email" v-model="input.email" placeholder="Email" />
            <b-form-input required type="password" name="password" v-model="input.password" placeholder="New Password" />
            <b-form-input required type="password" name="oldpassword" v-model="input.oldpassword" placeholder="Old Password" />
            <b-button type="b-button" v-on:click="changepass()">Change Password</b-button>
        </div>
        <div>
            <b-button type="b-button" v-on:click="logout()">Logout</b-button>
        </div>
    </div>
    <div id="login" v-else>
        <h1>Login</h1>
        <b-form-input required type="text" name="email" v-model="input.email" placeholder="Email" />
        <b-form-input required type="password" name="password" v-model="input.password" placeholder="Password" />
        <b-form-input type="submit" v-on:click="login()" placeholder="Login"/>
    </div>
</template>

<script>
import {API_URL} from "./../globals"
    import store from '../Store/Store.ts';
    export default {
        name: 'LoginComponent',
        data() {
            return {
                input: {
                    email: "",
                    password: "",
                    oldpassword: ""
                }
            }
        },
        store,
        methods: {
            async login() {
                if(this.input.email==="" | this.input.password===""){
                    return;
                }
                let url = API_URL + "api/account/login";
                try {
                    let obj = 
                    {
                        Email: this.input.email, 
                        Password: this.input.password,
                        OldPassword: ""
                    }

                    let response = await fetch(url, {
                        method: "POST",
                        body: JSON.stringify(obj),//Assumes data is in an object called form
                        headers: new Headers({
                            "Content-Type": "application/json"
                        })
                    });
                    if (response.ok) {
                        let token = await response.json();
                        localStorage.setItem("token", token.jwt);
                        this.$store.commit("login");
                        this.input.password = "";
                        this.input.email = "";
                        //Change view to some other component// ...
                    }

                    else {
                        alert("Server returned: " + response.statusText);
                    }

                }

                catch (err) {
                    alert("Error: " + err);
                }

                return;
            },
            async changepass() {
                let url = API_URL + "api/account/password";
                try {
                    let obj = 
                    {
                        Email: this.input.email, 
                        Password: this.input.password,
                        OldPassword: this.input.oldpassword
                    }

                    let response = await fetch(url, {
                        method: "PUT",
                        body: JSON.stringify(obj),//Assumes data is in an object called form
                        headers: new Headers({
                            "Content-Type": "application/json",
                            "Authorization" : "Bearer " + localStorage.getItem("token"),
                        })

                    });
                    if (response.ok) {
                        this.input.password = "";
                        this.input.email = "";
                        this.input.oldpassword = "";
                        alert("Password has been changed!")
                        //Change view to some other component// ...
                    }

                    else {
                        alert("Server returned: " + response.statusText);
                    }

                }

                catch (err) {
                    alert("Error: " + err);
                }

                return;
            },
            async logout() {
                
                localStorage.removeItem("token");
                this.$store.commit("logout");
                this.input.password = "";
                this.input.email = "";
                  
                return;
            },
        }
    }
</script>