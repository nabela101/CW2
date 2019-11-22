Vue.component('app-nav',{
    props:['menu'],
    template:'<a :href="menu.link">{{menu.text}}</a>'
});

const app = new Vue({
    el: "#app",
    data: {
        logged: false,
        fname: "",
        lname: "",
        email: "",
        psw: "",
        usertype: '',
        menuList:[
            {id:0,link:'index.html', text:'Home'},
            {id:1,link:'about.html', text:'About'},
            {id:2,link:'contact.html', text:'Contact'}
        ],
        img:  {
            src: 'logo.jpg',
            alt: 'A placeholder image of animals'
        },
        rows: [
            {'index':1,'topic': 'math', 'location': 'hendon', 'price': 100, 'time':'4pm weekdays','duration':'2 hour', 'reviews':{'average': 4.5, 'count':2, 'review':[{'name':'jon', 'star':4},{'name':'Nabela', 'star':5}]} },
            {'index':2,'topic': 'math', 'location': 'colindale', 'price': 80, 'time':'5pm weekdays','duration':'2 hour', 'reviews':{'average': 4.5, 'count':2, 'review':[{'name':'jon', 'star':3},{'name':'Nabela', 'star':5}]} },
            {'index':3,'topic': 'math', 'location': 'brent cross', 'price': 90, 'time':'6pm weekend','duration':'2 hour', 'reviews':{'average': 4.5, 'count':2, 'review':[{'name':'jon', 'star':5},{'name':'Nabela', 'star':5}]} },
            {'index':4,'topic': 'math', 'location': 'golders green', 'price': 120, 'time':'3pm weekdays','duration':'2 hour', 'reviews':{'average': 4.5, 'count':2, 'review':[{'name':'jon', 'star':4},{'name':'Nabela', 'star':2}]} },
            {'index':5,'topic': 'english', 'location': 'hendon', 'price': 110, 'time':'4pm weekend','duration':'2 hour', 'reviews':{'average': 4.5, 'count':2, 'review':[{'name':'jon', 'star':4},{'name':'Nabela', 'star':5}]} },
            {'index':6,'topic': 'english', 'location': 'colindale', 'price': 90, 'time':'5pm weekdays','duration':'2 hour', 'reviews':{'average': 4.5, 'count':2, 'review':[{'name':'jon', 'star':2},{'name':'Nabela', 'star':2}]} },
            {'index':7,'topic': 'english', 'location': 'brent cross', 'price': 90, 'time':'3pm weekdays','duration':'2 hour', 'reviews':{'average': 4.5, 'count':2, 'review':[{'name':'jon', 'star':1},{'name':'Nabela', 'star':5}]} },
            {'index':8,'topic': 'english', 'location': 'golders green', 'price': 130, 'time':'6pm weekdays','duration':'2 hour', 'reviews':{'average': 4.5, 'count':2, 'review':[{'name':'jon', 'star':4},{'name':'Nabela', 'star':5}]} },
            {'index':9,'topic': 'piano', 'location': 'hendon', 'price': 120, 'time':'4pm weekdays','duration':'2 hour', 'reviews':{'average': 4.5, 'count':2, 'review':[{'name':'jon', 'star':4},{'name':'Nabela', 'star':5}]} },
            {'index':10,'topic': 'piano', 'location': 'golders green', 'price': 140, 'time':'3pm weekdays','duration':'2 hour', 'reviews':{'average': 4.5, 'count':2, 'review':[{'name':'jon', 'star':4},{'name':'Nabela', 'star':5}]} }
        ],
        new_topic : '',
        new_location : '',
        new_price : '', 
        new_time : '',
        new_duration : '',
        user : [],
        reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
    },
    beforeMount: function() {
        this.usertype = this.$el.querySelector('[data-ref="type"]').value;
      },
    mounted: function(){
        let users = JSON.parse(localStorage.getItem("loggedinUser") || "[]");
        this.user = users;
        console.log(Object.keys(users).length);
        if(Object.keys(users).length > 0){
            if(users.email.length > 0){
                this.logged = true;
                console.log("Logged: "+ this.logged);
            }
        }
    },
    methods: {
        update_topic(){
            this.rows.forEach(element => {
                if(element.index==event.target.name){
                    element.topic = event.target.value
                }
            })      
        },
        update_price(){
            this.rows.forEach(element => {
                if(element.index==event.target.name){
                    element.price = event.target.value
                    console.log(element);
                }
            })
        },
        update_location(){
            this.rows.forEach(element => {
                if(element.index==event.target.name){
                    element.location = event.target.value
                    console.log(element);
                }
            })
        },
        update_time(){
            this.rows.forEach(element => {
                if(element.index==event.target.name){
                    element.time = event.target.value
                    console.log(element);
                }
            })
        },
        update_duration(){
            this.rows.forEach(element => {
                if(element.index==event.target.name){
                    element.duration = event.target.value
                    console.log(element);
                }
            })
        },
        addToClass(){
            this.rows.push({'topic':this.new_topic, 'location': this.new_location, 'price': this.new_price, 'time': this.new_time, 'duration': this.new_duration, 'reviews':{'average': 0.0, 'count':0, 'review':[]}  });
            console.log(this.rows);
        },
        remove(index){
            this.rows = $.grep(this.rows, function(e){ 
                return e.index != index; 
            });
            //this.rows = data;
            console.log(this.rows);
        },
        submit(){
            $(".alert").remove();
            let users = JSON.parse(localStorage.getItem("users") || "[]");
            emailexists = false;
            for (let u of users){
                if(this.email===u.email){
                    emailexists = true;
                    $("#registerForm").after("<div class='alert alert-danger'>Email already exists!</div>");
                    break;
                }
            }
            if(this.isEmailValid()){
                if(!emailexists){
                    let new_user = {
                        fname: this.fname,
                        lname: this.lname,
                        email: this.email,
                        password: this.psw,
                        usertype: this.usertype
                    };
                    
                    users.push(new_user);
                    localStorage.setItem("users",JSON.stringify(users));

                    console.log(localStorage);
                }
            }
            else{
                $("#registerForm").after("<div class='alert alert-danger'>Invalid Email!</div>");
            }

        },
        isEmailValid() {
            return (this.email == "")? "" : (this.reg.test(this.email)) ? true : false;
        },
        login(){
            $(".alert").remove();
            let users = JSON.parse(localStorage.getItem("users") || "[]");
            let loggedIn = [];
            //console.log(users[0]);
            emailFound = false;
            invalidPassword = true
            for (let u of users){
                if(this.email===u.email){
                    console.log("email found")
                    emailFound = true
                    if(this.psw===u.password){
                        console.log("User Found");
                        loggedIn = {
                            email: u.email,
                            fname: u.fname,
                            lname: u.lname,
                            type: u.usertype
                        };
                        this.usertype = u.usertype;
                        invalidPassword = false;
                        this.logged = true;
                        break;
                    }
                }
            }
            console.log(emailFound+"|"+invalidPassword);
            
            if(!emailFound){$("#registerForm").after("<div class='alert alert-danger'>Email is not registered!</div>")}
            else{
                if(invalidPassword){$("#registerForm").after("<div class='alert alert-danger'>Invalid Password!</div>")}
                else{
                    localStorage.setItem("loggedinUser",JSON.stringify(loggedIn));
                    if(this.usertype==="provider") window.location = "serviceprovider.html"; 
                    else window.location = "lab5.html"; 
                }
            }
                   
        },

        logout(){
            //let users = JSON.parse(localStorage.getItem("loggedinUser") || "[]");
            localStorage.removeItem("loggedinUser");
            this.logged = false;
            window.location = "login.html";
        }
    }

});
// const example = new Vue({
//   el: '#example',
//   data: {
//       title: 'image',
//       message: 'This is your image!',
//       name: 'nabela',
//       img:  {
//           src: 'logo.jpg',
//           alt: 'A placeholder image of animals'
//       }
//   }
// });

// const login = new Vue({
//     el: '#login',
//     data:{
//         page_title:'Login',
//         email:'',
//         password:'',
//         classes:[
//             {title:'Physics Book', price:12.34,reveiws:4.5},
//             {title:'sd',price:}
//         ]
//     },
//     methods:{
//         login(){
            
//         }
//     }
// });


// const app = new Vue({
//     el: '#app',
//     data: {
//       errors: [],
//       name: null,
//       email: null,
//       //movie: null
//     },
//     methods: {
//       checkForm: function (e) {
//         this.errors = [];
  
//         if (!this.name) {
//           this.errors.push("Name required.");
//         }
//         if (!this.email) {
//           this.errors.push('Email required.');
//         } else if (!this.validEmail(this.email)) {
//           this.errors.push('Valid email required.');
//         }
  
//         if (!this.errors.length) {
//           return true;
//         }
  
//         e.preventDefault();
//       },
//       validEmail: function (email) {
//         var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//         return re.test(email);
//       }
//     }
//   })
