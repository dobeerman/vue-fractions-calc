<template>
  <v-flex xs2 sm1>
    <template v-if="isFraction">
      <v-layout row>
        <v-flex xs12>
          <v-text-field
            v-model="item.numerator"
            flat
            hide-details
            mask="###"
            solo
            type="text"
            class="fraction-input numerator"
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
            mask="###"
            solo
            type="text"
            class="fraction-input denominator"
            @keyup="fixnum"
          ></v-text-field>
        </v-flex>
      </v-layout>
    </template>
    <template v-else>
      <v-layout row>
        <v-flex xs12 pt-4>
          <v-text-field
            v-model="item.operator"
            flat
            hide-details
            solo
            type="text"
            class="fraction-input operator"
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
      this.item.operator = this.item.operator.replace(/[^+*/-]{1}/g, '+')[0];
    },
    fixnum() {
      this.item.denominator = !this.item.denominator ? 1 : this.item.denominator;
    },
  },
};
</script>

<style scored>
.fraction-input {
  border-color: #bbb;
}
.fraction-input.numerator {
  border-width: 0 0 1px 0;
  border-style: solid;
}
.fraction-input.denominator {
  border-width: 0;
}
.fraction-input.operator {
  border: 1px dotted;
  border-radius: 5px !important;
}
</style>
