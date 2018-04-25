<template>
  <v-flex xs2 sm1>
    <template v-if="isFraction">
      <v-layout row>
        <v-flex xs12>
          <v-text-field
            v-model="item.numerator"
            flat
            hide-details
            mask="##"
            solo
            type="text"
            class="fraction-input"
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-divider></v-divider>
      <v-layout row>
        <v-flex xs12>
          <v-text-field
            v-model="item.denominator"
            flat
            hide-details
            mask="##"
            solo
            type="text"
            class="fraction-input"
            @keyup="fixnum"
          ></v-text-field>
        </v-flex>
      </v-layout>
    </template>
    <template v-else>
      <v-layout row>
        <v-flex xs12>
          <v-text-field
            v-model="item.operator"
            flat
            hide-details
            solo
            type="text"
            class="fraction-input"
            @keyup="op"
          ></v-text-field>
        </v-flex>
      </v-layout>
    </template>
  </v-flex>
</template>

<script>
export default {
  name: 'Fraction',

  props: ['item'],

  computed: {
    isFraction() {
      return typeof this.item.denominator !== 'undefined';
    },
  },

  methods: {
    op() {
      this.item.operator = this.item.operator.replace(/[^+*/-]/g, '+');
    },
    fixnum() {
      this.item.denominator = !this.item.denominator ? 1 : this.item.denominator;
    },
  },
};
</script>

<style scored>
.fraction-input {
  border: 1px dotted #bbb;
  border-radius: 5px !important;
}
</style>
