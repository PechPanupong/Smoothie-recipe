<template>

   <div class="home-page">
    <div class="row" style="justify-content: center;">
      <label id="head">Welcome to Smoothie Recipe</label>
    </div>
    
    <div id="toCreatRow" class="row" style="justify-content: center;">
      <nuxt-link class="noline" to="/Create-recipe"><v-btn id="btnAdd">Add Your Recipe</v-btn></nuxt-link>
    </div>

   <div>
    <div class="row card-recipe" >
      <div class="col-4" style="padding-top:2em" v-for="(item,index) in allData" v-bind:key="index">
         <v-card class="mx-auto recipe-card" max-width="400">
              <!-- <button @click="deleteRecipe('name'+index,index)" class="delete-btn">X</button> -->
              <v-btn  @click="deleteRecipe('name'+index,index)" style="width:3em" class="delete-btn" depressed><v-icon>{{ icons.mdiDelete }}</v-icon></v-btn >

            <div class="name-smoothie">
            <v-card-title  :id="'name'+index">{{item.NameSmoothie}}</v-card-title>
            </div>
            <div class="row">
             <div class="col col-pad" >
                <span v-for="(ingr,index) in item.Ingredient" v-bind:key="index">
              <span class="ingr" >{{ingr.ingredient}}</span>
             </span>
             </div>
            </div>
              <!-- <button @click="openModal('name'+index)"  class="edit-btn">Edit</button> -->
              <v-btn  @click="openModal('name'+index)"  class="edit-btn"><v-icon>{{ icons.mdiPencil }}</v-icon></v-btn >
              
          </v-card>
      </div>
    </div>
  </div>
  <v-dialog  max-width="60%" v-model="modalShow">
    <v-card >
       <div id="create-recipe" class="create-box">
        <div class="row" id="head-title">
            <h1>
                Edit Smoothie
            </h1>
        </div>
        <div class="row" id="title-box">
            <div class="col">
            <!-- <div class="row">
                <label>Add title of smoothie </label>
            </div> -->
            <div class="row">
            <!-- <input id="title-smooth" v-model="title" type="text" placeholder="Add your title Smoothie"> -->
            <v-text-field   label="Add Smoothie name" class="inputval" id="title-smooth" v-model="title" ></v-text-field>

            </div>
        </div>
        </div>
        <div class="ingre-box"  v-for="(inItem,index) in ingreArr" v-bind:key="index" >
         <div class="row" id="ingre-box">
             <div class="col">
              <!-- <div class="row">
                <label>Add Ingredient</label>
            </div> -->
            <div class="row">
            <!-- <input  class="inputval" :id="'input'+index" v-model="inItem.ingredient" type="text" placeholder="Add your Ingredient"> -->
            <v-text-field  label="Add Ingredient" class="inputval" :id="'input'+index" v-model="inItem.ingredient" ></v-text-field>
            </div>
            </div>
        </div>
        <div class="row">
            <!-- <button @click="deleteIngredient(index)" id="delete-btn" >Delete</button> -->
            <v-btn @click="deleteIngredient(index)" class="delete-ingredient" >Delete</v-btn>
            </div>
        </div>
        <div class="row" id="btn-row">
            <div class="col" id="btn-col">
            <!-- <button @click="addIngre" id="add-ingr">Add more ingredient</button>  -->
            <v-btn @click="addIngre" id="add-ingr">Add more ingredient</v-btn>
            </div>
              <div class="col" id="btn-col">
            <!-- <button @click="saveRecipe" id="save" >Save this recipe</button>                     -->
            <v-btn @click="saveRecipe" id="save" >Save this recipe</v-btn>
            </div>
              <div class="col" id="btn-col">
             <!-- <button @click="closeModal" id="cancel">cancel</button>     -->
             <v-btn @click="closeModal" id="cancel">cancel</v-btn>
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
import {
    mdiPencil,
    mdiDelete,
  } from '@mdi/js'

  export default {
    data(){
      return{
        icons: {
        mdiDelete,
        mdiPencil
      },
        i:0,j:0,n:0,
        allData:[],
        title:'',
        ingreName:'',
        res:[],
        modalShow: false,
        ingreID:0,
        ingreArr:[{
          ingredient:''
        }],
        isEmpty:false,
        tmpArr:[]

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
         this.j = this.ingreArr.length
         console.log(this.j)
        
        for(let index=0;index<this.ingreArr.length ;index++){
            console.log(this.ingreArr[index].ingredient)
              if(this.ingreArr[index].ingredient != "" ){
                console.log("has empty")
                this.tmpArr.push(this.ingreArr[index])
              }else{
                console.log("No empty")
              }
            
            }
            console.log(this.tmpArr)
          // for(let index=0;index<this.ingreArr.length ;index++){
          //   console.log(this.ingreArr[index].ingredient)
          //     if(this.ingreArr[index].ingredient = "" ){
          //       console.log(index)
          //       console.log("has empty")
          //       this.ingreArr.splice(index,1)  
          //       console.log(this.ingreArr.length)  
          //     }else{
          //       console.log("No empty")
          //     }
            
          //   }
          //  console.log(this.ingreArr)
            
           },
           deleteOldDoc(){
             var oldnamedoc = localStorage.getItem('name')
          
          fireDb.collection('Smoothie-Recipe').doc(oldnamedoc).delete().then(function(){
                console.log('Delete: '+ oldnamedoc)
        }).catch(function(error){
          console.log('Error delete document: ',error)
        })

           },
      async saveRecipe() {
         if(this.title == ""){
           alert("Please input your recipe name")
            return false
          }
          this.checkIsEmpty();
          this.deleteOldDoc();
          var NameCollec= "Smoothie-Recipe"
          var namedoc = this.title
            const ref = fireDb.collection(NameCollec).doc(namedoc)
            const document = {
            NameSmoothie: this.title,
            // Ingredient: this.ingreArr,
            Ingredient: this.tmpArr,
            }
          try {
            await ref.set(document)
          } catch (e) {
            console.error(e)
          }
          alert("Create Success")
          console.log(this.title)
          this.tmpArr = []
          this.modalShow = false
          window.location.reload(true)

        },
      openModal(id){
       this.ingreArr = []
       this.title=''
       this.ingreArr.splice(0,1)
       this.nameSmoothie= document.getElementById(id).textContent
       var name = this.nameSmoothie
       localStorage.setItem('name',name)
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
         this.j = this.ingreName.length
         console.log(this.j)
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
          this.tmpArr = []
          this.title=''
          this.modalShow = false
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
.noline{
  text-decoration-line: none;
}
.home-page{
  width: -webkit-fill-available;
}
.recipe-card{
  background: #bb6e6e !important;
-webkit-box-shadow: 12px 14px 25px -2px rgba(0,0,0,0.41);
-moz-box-shadow: 12px 14px 25px -2px rgba(0,0,0,0.41);
box-shadow: 12px 14px 25px -2px rgba(0,0,0,0.41);
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
    color: #ffffff;
    font-weight: 700;
  }
  #btnAdd{
        background: burlywood;
        width: 18em;
    color: black;
    height: 2em;
    border-radius: 1em;
    font-size: 1.5em;
    font-weight: 700;
    }
    .delete-btn{
    /* width: 3.5em !important;
    height: 3em;
    background: #e22b2b !important;
    position: relative;
    margin-top: -1em;
    float: right;
    margin-right: 2em;
    border-radius: 2em;
    padding-left: 10px !important; */

     min-width: 2em !important;
    height: 3em !important;
    background: #e22b2b !important;
    position: relative;
    margin-top: -1em;
    float: right;
    margin-right: -1em;
    border-radius: 2em !important;
    }
    .edit-btn{
    width: 5em;
    height: 5em !important;
    background: #b93260 !important;
    position: relative;
    margin-top: -2em;
    float: right;
    margin-right: 2em;
    border-radius: 100% !important;
    }
  .name-smoothie{
    height: 10em;
    padding-top: 2em;
    padding-left: 0.5em;
  }
  .ingr{
        color:white;
    display: inline-block;
    font-size: 1em;
    font-weight: 700;
    line-height: 14px;
    margin-right: 2px;
    margin-bottom: 16px;
    margin-right: 12px;
    padding: 3px 12px;
    border: 1px solid white;
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
    color: blanchedalmond;
}
.ingre-box{
  padding-bottom: 1em;
  margin-top: 1em;
}
#head-title{
    height: 5em;
    align-items: center;
    font-size: 2em;
    justify-content: center;
    display: flex;
    color: #e6cbe2;
}
#title-box{
    height: 8em;
    display: flex;

}
#ingre-box{
    height: 5em;
    display: flex;
    margin-top: 1em;
}
.delete-ingredient{
  color: #000000;
    background: #e0b6b0 !important;
    width: 5em;
    border-radius: 5em;
    height: 1.5em !important;
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
  /* padding: 2em; */
      padding: 2em 6em;
      /* background: #e0b6b0; */
}

</style>