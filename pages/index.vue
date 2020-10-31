<template>
  <div class="home">
    <h1>Homepage</h1>

    <v-spacer class="mt-4" />

    <h1 class="headline">Coloring button using class</h1>
    <v-btn class="pink white--text">Click Me</v-btn>
    <v-btn dark color="pink">Click Me</v-btn>

    <v-spacer class="mt-4" />

    <h1 class="headline">Custom button effect</h1>
    <v-btn depressed color="pink white--text">Click Me</v-btn>
    <v-btn text color="pink">Click Me</v-btn>

    <v-spacer class="mt-4" />

    <h1 class="headline">Icon button</h1>
    <v-btn depressed color="pink white--text">
      <v-icon left>mdi-email</v-icon>
      <span>Email Me</span>
    </v-btn>

    <v-btn depressed small color="pink white--text">
      <v-icon left small>mdi-email</v-icon>
      <span>Email Me</span>
    </v-btn>

    <v-btn depressed large color="pink white--text">
      <span>Email Me</span>
      <v-icon right large>mdi-email</v-icon>
    </v-btn>

    <v-spacer class="mt-4" />

    <h1 class="headline">
      Coloring the button using color props and Circle button (FAB)
    </h1>
    <v-btn fab dark color="purple">
      <v-icon>mdi-heart</v-icon>
    </v-btn>
  </div>
</template>
