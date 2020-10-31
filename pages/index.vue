<template>
  <div class="home">
    <h1>Homepage</h1>

    <h1 class="headline">Hide in resolution less than medium</h1>
    <v-btn class="hidden-md-and-down">Click Me</v-btn>

    <v-spacer class="mt-4" />

    <h1 class="headline">Hide in resolution higher than medium</h1>
    <v-btn class="hidden-md-and-up">Click Me</v-btn>

    <v-spacer class="mt-4" />

    <h1 class="headline">Hide in small screens only</h1>
    <v-btn class="hidden-sm-only">Click Me</v-btn>
  </div>
</template>
