<template>
  <!-- <section class="container">
    <div>
      <h2>
        Write to Firestore.
      </h2>
      <div>
        <button @click="writeToFirestore" :disabled="writeSuccessful">
          <span v-if="!writeSuccessful">Write now</span>
          <span v-else>Successful!</span>
        </button>
      </div>
    </div>
    <div>
      <h2>
        Read from Firestore.
      </h2>
      <div>
        <button @click="readFromFirestore" :disabled="readSuccessful">
          <span v-if="!readSuccessful">Read now</span>
          <span v-else>Successful!</span>
        </button>
        <p>{{text}}</p>
        <p>{{text2}}</p>

      </div>
    </div>
  </section> -->
  <!-- <nuxt-link :to="`/Create-recipe`">
                <v-btn>View</v-btn>
              </nuxt-link> -->
   <div>
    <div class="row">
    <label id="head">Welcome to Smoothie Recipe</label>
    </div>
<div id="toCreatRow" class="row">
  <div class="col"><label>To create your recipe please click</label></div>
  <div class="col">
    <nuxt-link to="/Create-recipe"><button id="btnAdd">Add</button></nuxt-link>

  </div>
    
    </div>

    <div class="row" >
      <div class="col-4" v-for="names in allRecipe" v-bind:key="names.id">
     <v-card class="mx-auto" max-width="400">
    <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" height="200px"></v-img>
    <v-card-title>{{names}}</v-card-title>
    
    <div>
    <v-card-text>{{recipeIngredient}}</v-card-text>
    </div>
    <v-card-actions>
      <v-spacer></v-spacer>
      <slot name="button"></slot>
    </v-card-actions>
  </v-card>

      </div>
   
      
    </div>
    </div>

    
</template>
 <script>
 import {fireDb} from '~/plugins/firebase.js'

  export default {
    data(){
      return{
        i:0,j:0,
        allRecipe:[],
        arrIngre:[],
        arrIngre2:[],
        allIngredient:[{
          
        }],
        recipeIngredient:'',
        recipeTitle:'',
        tmp:''
      }
    },
    created(){
       fireDb.collection('Smoothie-Recipe').get().then((dat)=>{
            dat.forEach(element => {    
              this.recipeTitle = element.data().NameSmoothie
                this.allRecipe.push(element.data().NameSmoothie)
                // console.log(element.data().Ingredient);
                this.tmp = element.data().Ingredient
                // console.log(this.tmp)
                this.allIngredient.push(this.tmp)
               
            })
                console.log(this.allIngredient.length)

             for(this.i=1;this.i<this.allIngredient.length;this.i++){
                console.log(this.allIngredient[this.i])
                this.arrIngre.push(this.allIngredient[this.i])

                for(this.j=0;this.j<this.allIngredient[this.i].length;this.j++){
                  // console.log(this.allIngredient[this.i][this.j].ingredient)
                  this.arrIngre2.push(this.allIngredient[this.i][this.j].ingredient)
                  // this.recipeIngredient = this.allIngredient[this.i][this.j].ingredient
                  
                }
              
              }
                  console.log(this.arrIngre)
                  console.log(this.arrIngre2)

        })

       

          //   fireDb.collection("Smoothie-Recipe").get().then(function(querySnapshot) {
          //   querySnapshot.forEach(function(doc) {
          //   console.log(doc.id, " => ", doc.data());
          //    this.allName.push(doc.id)
          //   });
            
          //     console.log(this.allName)

          // });
         
     
        
    },
    methods: {
        forFunc(lenght){
          for(this.i;this.i<=lenght;this.i++){
            console.log(this.i)
          }
        }
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
</style>