<template>

   <div class="home-page">
    <div class="row" style="justify-content: center;">
      <label id="head">Welcome to Smoothie Recipe</label>
    </div>
    
    <div id="toCreatRow" class="row" style="justify-content: center;">
      <nuxt-link to="/Create-recipe"><button id="btnAdd">Add</button></nuxt-link>
    </div>

   <div>
    <div class="row card-recipe" >
      <div class="col-4" v-for="(item,index) in allData" v-bind:key="item">
         <v-card class="mx-auto" max-width="400">
              <button @click="deleteRecipe('name'+index,index)" class="delete-btn">X</button>
            <div class="name-smoothie">
            <v-card-title :id="'name'+index">{{item.NameSmoothie}}</v-card-title>
            </div>
            <div class="row">
             <div class="col col-pad" >
                <span v-for="ingr in item.Ingredient" v-bind:key="ingr">
              <span class="ingr" >{{ingr.ingredient}}</span>
             </span>
             </div>
            </div>
              <button @click="openModal('name'+index)"  class="edit-btn">Edit</button>
          </v-card>
      </div>
    </div>
  </div>
  <v-dialog  max-width="60%" v-model="modalShow">
    <v-card >
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
        <div class="ingre-box"  v-for="(inItem,index) in ingreArr" v-bind:key="inItem.id" >
         <div class="row" id="ingre-box">
             <div class="col">
              <div class="row">
                <label>Add Ingredient</label>
            </div>
            <div class="row">
            <input  class="inputval" :id="'input'+index" v-model="inItem.ingredient" type="text" placeholder="Add your Ingredient">
            </div>
            </div>
        </div>
        <div class="row">
            <button @click="deleteIngredient(index)" id="delete-btn" >Delete</button>
            </div>
        </div>
        <div class="row" id="btn-row">
            <div class="col" id="btn-col">
            <button @click="addIngre" id="add-ingr">Add more ingredient</button>
            </div>
              <div class="col" id="btn-col">
            <button @click="saveRecipe" id="save" >Save this recipe</button>
            </div>
              <div class="col" id="btn-col">
             <button @click="closeModal" id="cancel">cancel</button>
            </div>
        </div>

    </div>
    </v-card>
  </v-dialog> 
  

</div>   



</template>

 <script>
 import {fireDb} from '~/plugins/firebase.js'
import { eventBus } from "@/eventBus";

  export default {
    data(){
      return{
        
        i:0,j:0,n:0,
        allData:[],
        title:'',
        ingreName:'',
        res:[],
        modalShow: false,
        ingreID:0,
        ingreArr:[{
          ingredient:''
        }]

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
       checkIsEmpty(){
             console.log(this.ingreArr.length);
            for(let index=0;index< this.ingreArr.length;index++){
              if(this.ingreArr[index].ingredient == "" ){
                console.log("pop out",index)
                alert("Please input ingredient")
                this.ingreArr.splice(index,1)        
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
            Ingredient: this.ingreArr,
            }
          try {
            await ref.set(document)
          } catch (e) {
            console.error(e)
          }
          alert("Create Success")
          this.modalShow = false
          window.location.reload(true)

        },
      openModal(id){
       this.ingreArr = []
       this.title=''
       this.ingreArr.splice(0,1)
       this.nameSmoothie= document.getElementById(id).textContent
       var name = this.nameSmoothie
       this.callData(name)
       this.modalShow = true;
        
      },
      async callData(dat){
        const ref = fireDb.collection("Smoothie-Recipe").doc(dat)
        let snap
        try {
          snap = await ref.get()
        } catch (e) {
          console.error(e)
        }
       
        this.ingreName = snap.data().Ingredient
        this.title = snap.data().NameSmoothie
        console.log(this.ingreName)
        for(this.i=0;this.i<this.ingreName.length;this.i++){
          this.ingreArr.push({
             ingredient:this.ingreName[this.i].ingredient
           })
         }
      },
         addIngre(){
           this.ingreArr.push({
             ingredient:''
           })
            console.log(this.ingreArr)
        },
          deleteIngredient(index){
            this.ingreArr.splice(index,1)
        },
      
        closeModal(){
          this.ingreArr = []
          this.title=''
          // this.modalShow = false
          // window.location.reload(true)
        },
        deleteRecipe(n,index){
           this.nameSmoothie= document.getElementById(n).textContent
           var name = this.nameSmoothie
          var conf = confirm("Do you want to delete this "+ name + "?");
           if( conf == true ) {
                this.allData.splice(index,1)
            fireDb.collection('Smoothie-Recipe').doc(name).delete().then(function(){
                console.log('Delete: '+ name)
        }).catch(function(error){
          console.log('Error delete document: ',error)
        })
                  return true;
               } else {
                  return false;
               }
          // this.allData.splice(index,1)
        }

  }
  }
</script>
<style>
.home-page{
  width: -webkit-fill-available;
}
  .container {
    min-height: 100vh;
    display: flex;
    justify-content: center;
  
    }
  #toCreatRow{
    margin-top: 5em;
  }
  #head{
    font-size: 5em;
    font-weight: 700;
  }
  #btnAdd{
        background: burlywood;
        width: 5em;
        color: black;
    }
    .delete-btn{
    width: 2em;
    height: 2em;
    background: #e22b2b;
    position: relative;
    margin-top: -1em;
    float: right;
    margin-right: 2em;
    border-radius: 2em;
    }
    .edit-btn{
    width: 4em;
    height: 2em;
    background: #b93260;
    position: relative;
    margin-top: -1em;
    float: right;
    margin-right: 2em;
    }
  .name-smoothie{
    height: 10em;
    padding-top: 2em;
    padding-left: 0.5em;
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
  .card-recipe{
    margin-top: 2em;
  }


  /* modal create */
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
.create-box{
  padding: 2em;
}
</style>