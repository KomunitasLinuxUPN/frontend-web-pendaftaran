<template>
  <div class="team">
    <h1 class="subtitle-1 grey--text">This is a team page</h1>

    <v-container class="my-16">
      <v-row>
        <v-col
          v-for="person in team"
          :key="person.id"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <v-card flat class="text-center">
            <v-responsive class="pt-4">
              <v-avatar size="80" class="grey lighten-2">
                <img :src="person.avatar" />
              </v-avatar>
            </v-responsive>
            <v-card-text>
              <p class="subtitle-1 mb-2">{{ person.name }}</p>
              <p class="grey--text">{{ person.role }}</p>
            </v-card-text>
            <v-card-actions>
              <v-btn text color="grey">
                <v-icon small left>mdi-message</v-icon>
                <span>Message</span>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

interface Team {
  id: string
  name: string
  role: string
  avatar: string
}

export default defineComponent({
  head: {
    title: 'Team',
  },
  setup() {
    const team: Team[] = [
      {
        id: 'u1',
        name: 'Amir Hakim',
        role: 'Web developer',
        avatar: 'images/avatar-1.png',
      },
      {
        id: 'u2',
        name: 'Rafael',
        role: 'Graphic designer',
        avatar: 'images/avatar-2.png',
      },
      {
        id: 'u3',
        name: 'Doni Alfiando',
        role: 'Web developer',
        avatar: 'images/avatar-3.png',
      },
      {
        id: 'u4',
        name: 'Uzumaki Bayu',
        role: 'Social media maverick',
        avatar: 'images/avatar-4.png',
      },
      {
        id: 'u5',
        name: 'Uzumaki Saburo',
        role: 'Sales guru',
        avatar: 'images/avatar-5.png',
      },
    ]

    return {
      team,
    }
  },
})
</script>
