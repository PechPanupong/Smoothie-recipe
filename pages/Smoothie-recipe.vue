<template>
<div>
    <div class="row">
    <label id="head">Welcome to Smoothie Recipe</label>
    </div>
<div id="toCreatRow" class="row">
    <label>To create your recipe please click</label>
    </div>
    <div id="addbtnRow" class="row">
    <button @click.stop="openModal" id="btnAdd">Add</button>
    </div>
    </div>
</template>
<script>
import { eventBus } from "@/eventBus";
export default {
    openModal() {
      eventBus.$emit("open-add-recipe");
    }
}
</script>

<style>
    #head{
        font-size: 5em;
    }
    #toCreateRow{
        margin-top: 2em;
    }
    #addbtnRow{
         margin-top: 2em;
    }
    #btnAdd{
        background: burlywood;
        width: 5em;
        color: black;
    }
</style>