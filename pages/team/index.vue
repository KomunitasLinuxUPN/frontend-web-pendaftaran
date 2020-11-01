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
            <v-responsive class="pt-4">Image goes here</v-responsive>
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
import { uuid } from 'vue-uuid'

interface Team {
  id: string
  name: string
  role: string
}

export default defineComponent({
  head: {
    title: 'Team',
  },
  setup() {
    const team: Team[] = [
      { id: uuid.v4(), name: 'Amir Hakim', role: 'Web developer' },
      { id: uuid.v4(), name: 'Rafael', role: 'Graphic designer' },
      { id: uuid.v4(), name: 'Doni Alfiando', role: 'Web developer' },
      { id: uuid.v4(), name: 'Uzumaki Bayu', role: 'Social media maverick' },
      { id: uuid.v4(), name: 'Uzumaki Saburo', role: 'Sales guru' },
    ]

    return {
      team,
    }
  },
})
</script>
