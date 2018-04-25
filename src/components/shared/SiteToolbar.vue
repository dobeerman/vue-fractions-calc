<template>
  <v-container grid-list-md fluid>
    <v-layout row wrap>
      <v-flex xs12>
        <v-toolbar>
          <v-toolbar-title>TEST TASK</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn flat exact :to="{name: 'Home'}">Home</v-btn>
            <v-btn flat :to="{name: 'FractionsCalc'}">Fractions</v-btn>
            <v-btn flat :to="{name: 'WebSocket'}">Websocket</v-btn>
          </v-toolbar-items>
        </v-toolbar>
      </v-flex>
    </v-layout>
  </v-container>
</template>
