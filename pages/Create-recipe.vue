<template>
<div class="container">
 <div id="create-recipe" class="create-box">
        <div class="row" id="head-title">
            <h1 id="add-head">
                Add New Smoothie Recipe
            </h1>
        </div>
        <div class="row" id="title-box">
            <div class="col">
            <!-- <div class="row">
                <label class="add-name" >Add title of smoothie </label>
            </div> -->
            <div class="row" >
            <!-- <input id="title-smooth" v-model="title" type="text" placeholder="Add your title Smoothie"> -->
            <v-text-field class="addval" v-model="title" label="Add Smoothie name"></v-text-field>
            </div>
        </div>
        </div>

        <div class="ingre-box"  v-for="(inItem,index) in ingredientArr" v-bind:key="index" >
         <div class="row" id="ingre-box">
             <div class="col">
              <!-- <div class="row">
                <label class="add-ingre">Add Ingredient </label>
            </div> -->
            <div class="row">
            <!-- <input  class="inputval" :id="'input'+index" v-model="inItem.ingredient" type="text" placeholder="Add your Ingredient"> -->
            <v-text-field class="addval" :id="'input'+index" v-model="inItem.ingredient" label="Add Ingredient"></v-text-field>
            </div>
            
            <!-- <button id="delete-btn" @click="deleteIngredient(index)">Delete</button> -->
            </div>
        </div>
        <div class="row">
            <button class="delete-ingredient" @click="deleteIngredient(index)">Delete</button>
              
            </div>
        </div>




        <div class="row" id="btn-row">
            <div class="col" id="btn-col">
            <!-- <button @click="addIngredient" id="add-ingr">Add more ingredient</button>        -->
                 <v-btn @click="addIngredient" id="add-ingr">Add more ingredient</v-btn>
            </div>
              <div class="col" id="btn-col">
            <!-- <button id="save" @click="saveRecipe">Save this recipe</button>          -->
               <v-btn id="save" @click="saveRecipe">Save this recipe</v-btn>
            </div>
              <div class="col" id="btn-col">
             <!-- <nuxt-link to="/"><button id="cancel">Back to home page</button></nuxt-link>         -->
                  <nuxt-link class="noline" to="/"><v-btn id="cancel">Back to home page</v-btn></nuxt-link>
            </div>
            
        </div>

    </div>
</div>



   
</template>
<script>
 import {fireDb} from '~/plugins/firebase.js'
import { eventBus } from '../eventBus';
 

export default {
  component(){

  },
    data(){
        return{
          open:false,
            title:'',
            ingredient:'',
            ingreObj:{},
            ingredientArr:[{
              ingredient:''
            }],

            NameShow:'',
            IngreShow:'',
            test:'',
            tmpIngreArr:[]
        }
    },
    created(){
      console.log('test create()')
  
    },
  
    mounted(){
      
        console.log('Init Page');
        fireDb.collection('Smoothie-Recipe').get().then((dat)=>{
            dat.forEach(element => {
              
                console.log(element.data())
                
            });
        })
    
    },
    methods:{
           checkIsEmpty(){
            // for(let index=0;index< this.ingredientArr.length;index++){
            //   if(this.ingredientArr[index].ingredient == "" ){
            //     console.log("pop out",index)
            //     // alert("Please input ingredient")
            //     this.ingredientArr.splice(index,1)        
            //   }else{
            //     console.log("No empty")
            //   }
            // }
             for(let index=0;index<this.ingredientArr.length ;index++){
            console.log(this.ingredientArr[index].ingredient)
              if(this.ingredientArr[index].ingredient != "" ){
                console.log("has empty")
                this.tmpIngreArr.push(this.ingredientArr[index])
              }else{
                console.log("No empty")
              }
            
            }
            console.log(this.tmpIngreArr)
            
           },
        
          async saveRecipe() {
            const curr = window.location.origin
            console.log(curr)
            if(this.title == ""){
           alert("Please input your recipe name")
            return false
          }
           this.checkIsEmpty();
          var NameCollec= "Smoothie-Recipe"
          var namedoc = this.title
            const ref = fireDb.collection(NameCollec).doc(namedoc)
            const document = {
            NameSmoothie: this.title,
            // Ingredient: this.ingredientArr,
            Ingredient: this.tmpIngreArr,
            }
          try {
            await ref.set(document)
          } catch (e) {
            console.error(e)
          }
          alert("Create Success")

          window.location = curr+'/'
          console.log("Set Title:",this.title," Set Ingredient:",this.tmpIngreArr)
          this.title=""
          this.tmpIngreArr[0]=""
          
        
    
        },
      
        addIngredient(){
            console.log('Test function at Init page')
            // this.ingreObj
            this.ingredientArr.push({
              // ingreID:this.ingreID++,
              ingredient:''
            })

        },
        deleteIngredient(index){
            this.ingredientArr.splice(index,1)
        },
      
        
    }
   
}
</script>

<style>
.noline{
  text-decoration-line: none;
}
.container {
    display: flex;
    justify-content: center;
}

.add-name{
 color: #983c89;
}
.add-ingre{
 color: #983c89;
}

.addval{
    width: 100%;
    padding-top: 1em;
    padding-bottom: 1em;
    height: 2em;
    color: black !important;
}

.ingre-box{
  padding-bottom: 1em;
  margin-top: 0em;
}
#head-title{
    height: 5em;
    align-items: center;
    font-size: 2em;
    color: #ffffff;
}
#title-box{
    height: 8em;
    display: flex;

}
#ingre-box{
    height: 5em;
    display: flex;
}
.delete-ingredient{
  color: #000000;
    background: #e0b6b0 !important;
    width: 5em;
    border-radius: 5em;
    height: 1.5em !important;
    /* margin-top: 1em; */
}
#delete-btn{
    background: #b7adab;
    width: 5em;
    border-radius: 5em;
    margin-top: 1em;
    color: black;
    
}
#btn-row{
  padding-top: 5em;
}
#btn-col{
  display: flex;
    justify-content: center;
}
#add-ingr{
background: white;
color: black;
    width: 13em;
    border-radius: 5em;
    height:2em
}
#save{
background: rgb(19, 171, 177);
color: rgb(255, 251, 251);
    width: 13em;
    border-radius: 5em;
    height:2em
}
#cancel{
background: rgb(197, 15, 15);
color: rgb(255, 251, 251);
    width: 13em;
    border-radius: 5em;
    height:2em
}

/* .theme--dark.v-input input
 {
  color: rgb(143, 1, 131) !important;
} */

</style>