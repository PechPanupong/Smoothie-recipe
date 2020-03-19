<template>

   <div>
    <div class="row" style="justify-content: center;">
      <label id="head">Welcome to Smoothie Recipe</label>
    </div>
    
    <div id="toCreatRow" class="row" style="justify-content: center;">
      <nuxt-link to="/Create-recipe"><button id="btnAdd">Add</button></nuxt-link>
    </div>

   <div>
    <div class="row" >
      <div class="col-4" v-for="item in allData" v-bind:key="item.id">
         <v-card class="mx-auto" max-width="400">
            <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" height="200px"></v-img>
            <v-card-title>{{item.NameSmoothie}}</v-card-title>
            <div class="row">
             <div class="col col-pad" >
                <span v-for="ingr in item.Ingredient" v-bind:key="ingr">
          
              <span class="ingr" >{{ingr.ingredient}}</span>
             </span>
             </div>
            </div>
             <!-- <div v-for="ingr in item.Ingredient" v-bind:key="ingr">
              <v-card-text>{{ingr.ingredient}}</v-card-text>
             </div> -->
            
             <button class="edit-btn">Edit</button>
            <!-- <v-card-actions>
            <v-spacer></v-spacer>
             <slot name="button"></slot>
            </v-card-actions> -->
          </v-card>
      </div>
    </div>
  </div>

</div>   

</template>
 <script>
 import {fireDb} from '~/plugins/firebase.js'


  export default {
    data(){
      return{
        i:0,j:0,n:0,
        allData:[],
        recipeIngredient:'',
        recipeTitle:'',
        tmp:'',
       
      }
    },
    created(){
      //call data
       fireDb.collection('Smoothie-Recipe').get().then((dat)=>{
            dat.forEach(element => {    
                this.allData.push(element.data());
            })
        })
        console.log(this.allData)

    },
    methods: {
        
  }
    // data() {
    //   return {
    //     writeSuccessful: false,
    //     readSuccessful: false,
    //     text: "",
    //     text2:""
    //   }
    // },
    // async asyncData({app, params, error}) {
    //   const ref = fireDb.collection("test").doc("test")
    //   let snap
    //   try {
    //     snap = await ref.get()
    //   } catch (e) {
    //     // TODO: error handling
    //     console.error(e)
    //   }
      
    //   return {
    //     text: snap.data().text
    //   }
    //   console.log(snap.data())
    //   console.log('test async')
    // },
    // methods: {
    //   async writeToFirestore() {
    //     var NameCollec= "NameCollec"
    //     var namedoc = "newdoc"
    //     const ref = fireDb.collection(NameCollec).doc(namedoc)
    //     const document = {
    //       Name: "Pech",
    //       Description: "Pech test insert"
    //     }
    //     try {
    //       await ref.set(document)
    //     } catch (e) {
    //       console.error(e)
    //     }
    //     this.writeSuccessful = true
        
    //   },
    //   async readFromFirestore() {
    //     const ref = fireDb.collection(NameCollec).doc(namedoc)
    //     let snap
    //     try {
    //       snap = await ref.get()
    //     } catch (e) {
    //       // TODO: error handling
    //       console.error(e)
    //     }
    //     this.Name = snap.data().text
    //     this.Description = snap.data().text2
    //     // this.text = snap.data().text
    //     // this.text2 = snap.data().text2
        
    //     this.readSuccessful = true
    //   }
    // }
  }
</script>
<style>
  .container {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    /* align-items: center; */
    /* text-align: center; */
  }
  #toCreatRow{
    margin-top: 5em;;
  }
  #head{
    font-size: 5em;;
  }
  #btnAdd{
        background: burlywood;
        width: 5em;
        color: black;
    }
    .edit-btn{
    width: 4em;
    height: 2em;
    background: blueviolet;
    position: relative;
    margin-top: -1em;
    float: right;
    margin-right: 2em;
    }
  .ingr{
        color:rgb(219, 62, 180);
    display: inline-block;
    font-size: 1em;
    font-weight: 700;
    line-height: 14px;
    margin-right: 2px;
    margin-bottom: 16px;
    margin-right: 12px;
    padding: 3px 12px;
    border: 1px solid rgb(219, 62, 180);
    border-radius: 10px;
    white-space: nowrap;
  }
  .col-pad{
    padding-left: 2em;
  }
</style>