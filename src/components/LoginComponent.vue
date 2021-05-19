<template>

    <div v-if="this.$store.state.LoggedIn">
        <h1>Welcome!</h1>
        <div>

            <input required type="text" name="email" v-model="input.email" placeholder="Email" />
            <input required type="password" name="password" v-model="input.password" placeholder="New Password" />
            <input required type="password" name="oldpassword" v-model="input.oldpassword" placeholder="Old Password" />
            <button type="button" v-on:click="changepass()">Change Password</button>
        </div>
        <div>
            <button type="button" v-on:click="logout()">Logout</button>
        </div>
    </div>
    <div id="login" v-else>
        <h1>Login</h1>
        <input required type="text" name="email" v-model="input.email" placeholder="Email" />
        <input required type="password" name="password" v-model="input.password" placeholder="Password" />
        <input type="submit" v-on:click="login()" placeholder="Login"/>
    </div>
</template>

<script>
    import store from '../Store/Store.ts';
    export default {
        name: 'Login',
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
                let url = "https://localhost:44368/api/account/login";
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
                let url = "https://localhost:44368/api/account/password";
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    
</style>

