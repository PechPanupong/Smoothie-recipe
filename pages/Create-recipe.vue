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

        <div  v-for="(inItem,index) in ingredientArr" v-bind:key="inItem.id" >
         <div class="row" id="ingre-box">
             <div class="col">
              <div class="row">
                <label>Add Ingredient {{index}}</label>
            </div>
            <div class="row">
            <!-- <input id="ingredient" v-model="inItem.ingredient" type="text" placeholder="Add your Ingredient"> -->
            <input :id="index" v-model="inItem.ingredient" type="text" placeholder="Add your Ingredient">
            </div>
            <button @click="deleteIngredient(index)">Delete</button>
            </div>
        </div>
        </div>




        <div class="row" id="btn-row">
            <div class="col" id="add-in-col">
            <button @click="addIngredient" id="add-ingr">Add more ingredient</button>
            </div>
              <div class="col" id="save-col">
            <button id="save" @click="saveRecipe">Save this recipe</button>
            </div>
              <div class="col" id="cancel-col">
            <button @click="checkValue" id="cancel">cancel</button>
            </div>
        </div>

    </div>
<!-- <div>
   <v-dialog style="display: inline-table;" max-width="50em" v-model="open">
    <v-card class="p-5">
      <v-card-title>Add Books</v-card-title>
      <v-form>
        <v-text-field v-model="title" label="Enter Book Title"></v-text-field>
        <div  v-for="(inItem,index) in ingredientArr" v-bind:key="inItem.id" >
         <div style="padding-left: 2em;display: inline-table" class="row" id="ingre-box">
             <div class="col">
              <div class="row">
                <label>Add Ingredient {{index}}</label>
            </div>
            <div class="row">
            <input id="ingredient" v-model="inItem.ingredient" type="text" placeholder="Add your Ingredient">
            </div>
            <button @click="deleteIngredient(index)">Delete</button>
            </div>
        </div>
        </div>
      </v-form>
      <v-card-actions>
        <v-spacer></v-spacer>
         <div class="row" id="btn-row">
            <div class="col" id="add-in-col">
            <button @click="addIngredient" id="add-ingr">Add more ingredient</button>
            </div>
              <div class="col" id="save-col">
            <button id="save" @click="saveRecipe">Save this recipe</button>
            </div>
              <div class="col" id="cancel-col">
            <button @click="checkIsEmpty" id="cancel">cancel</button>
            </div>
        </div>

      </v-card-actions>
    </v-card>
  </v-dialog>

</div> -->
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
        eventBus.$on("open-add", this.open = true);
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
        checkValue(){
          for (let index = 0; index < this.ingredientArr.length; index++) {
            var topic
            var arr
            
            // this.arr = this.ingredientArr[index]
            // console.log(this.arr)

             this.ingredientArr.push({
              ingreID:this.ingreID++,
              ingredient:''
            })
            // console.log(this.ingredientArr[index].ingredient)
            
          }
        }
        
    }
   
}
</script>