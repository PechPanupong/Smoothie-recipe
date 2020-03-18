<template>
  <v-card class="mx-auto" max-width="400">
    <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" height="200px"></v-img>
    <v-card-title>{{recipeTitle}}</v-card-title>
    
    <v-card-text>{{recipeIngredient}}</v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <slot name="button"></slot>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  props: ["recipeTitle", "recipeIngredient"]
};
</script>