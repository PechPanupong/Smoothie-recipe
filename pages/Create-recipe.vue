<template>
<div class="container">
 <div id="create-recipe" class="create-box">
        <div class="row" id="head-title">
            <h1>
                Add New Smoothie Recipe
            </h1>
        </div>
        <div class="row" id="title-box">
            <div class="col">
            <div class="row">
                <label>Add title of smoothie </label>
            </div>
            <div class="row">
            <input id="title-smooth" v-model="title" type="text" placeholder="Add your title Smoothie">
            </div>
        </div>
        </div>

        <div class="ingre-box"  v-for="(inItem,index) in ingredientArr" v-bind:key="inItem.id" >
         <div class="row" id="ingre-box">
             <div class="col">
              <div class="row">
                <label>Add Ingredient {{index}}</label>
            </div>
            <div class="row">
            <!-- <input id="ingredient" v-model="inItem.ingredient" type="text" placeholder="Add your Ingredient"> -->
            <input  class="inputval" :id="index" v-model="inItem.ingredient" type="text" placeholder="Add your Ingredient">
            </div>
            
            <!-- <button id="delete-btn" @click="deleteIngredient(index)">Delete</button> -->
            </div>
        </div>
        <div class="row">
            <button id="delete-btn" @click="deleteIngredient(index)">Delete</button>
              
            </div>
        </div>




        <div class="row" id="btn-row">
            <div class="col" id="btn-col">
            <button @click="addIngredient" id="add-ingr">Add more ingredient</button>
            </div>
              <div class="col" id="btn-col">
            <button id="save" @click="saveRecipe">Save this recipe</button>
            </div>
              <div class="col" id="btn-col">
             <nuxt-link to="/"><button id="cancel">cancel</button></nuxt-link>
            </div>
        </div>

    </div>
</div>



   
</template>
<script>
 import {fireDb} from '~/plugins/firebase.js'
 import { eventBus } from "@/eventBus";

export default {
  component(){

  },
    data(){
        return{
          open:false,
            title:'',
            ingredient:'',

          ingreID:1,
            ingreObj:{},
            ingredientArr:[{
              ingreID:0,
              ingredient:''
            }],

            NameShow:'',
            IngreShow:''
        }
    },
    mounted(){
        // eventBus.$on("open-add", this.open = true);
        //do when page loaded
        console.log('Init Page');
        fireDb.collection('Smoothie-Recipe').get().then((dat)=>{
            dat.forEach(element => {
              
                console.log(element.data())
                
            });
        })
        // console.log(this.recipeArr)
        // console.log(this.ingredientArr);
        
        //  const ref = fireDb.collection(NameCollec).doc(namedoc)
        // let snap
        // try {
        //   snap = await ref.get()
        // } catch (e) {
        //   // TODO: error handling
        //   console.error(e)
        // }
    
    },
    methods:{
           checkIsEmpty(){
             var filtered
             console.log(this.ingredientArr.length);
            for(let index=0;index< this.ingredientArr.length;index++){
              if(this.ingredientArr[index].ingredient == "" ){
                console.log("pop out",index)
                alert("Please input ingredient")
                this.ingredientArr.splice(index,1)        
              }else{
                console.log("No empty")
              }
            }
            
           },
        
          async saveRecipe() {
           this.checkIsEmpty();
          var NameCollec= "Smoothie-Recipe"
          var namedoc = this.title
            const ref = fireDb.collection(NameCollec).doc(namedoc)
            const document = {
            NameSmoothie: this.title,
            Ingredient: this.ingredientArr,
            }
          try {
            await ref.set(document)
          } catch (e) {
            console.error(e)
          }
          alert("Create Success")
          console.log("Set Title:",this.title," Set Ingredient:",this.ingredientArr)
        },
      
        addIngredient(){
            console.log('Test function at Init page')
            this.ingreObj
            this.ingredientArr.push({
              ingreID:this.ingreID++,
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
.container {
    display: flex;
    justify-content: center;
}
.inputval{
  width: 100%;
    padding-top: 1em;
    padding-bottom: 1em;
        height: 2em;
}
.ingre-box{
  padding-bottom: 1em;
}
#head-title{
    height: 5em;
    align-items: center;
    font-size: 2em;
}
#title-box{
    height: 5em;
    display: flex;

}
#ingre-box{
    height: 5em;
    display: flex;
}
#delete-btn{
    background: red;
    width: 5em;
    border-radius: 5em;
    /* margin-top: 1em; */
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


</style>