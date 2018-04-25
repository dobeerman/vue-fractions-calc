<template>
  <v-container grid-list-xs text-xs-center>
    <v-layout row wrap>
      <v-flex xs12>
        <h1>Fractions</h1>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs10>
        <v-layout row wrap>
          <fraction-item
            v-for="(item, idx) in items"
            :item="item"
            :key="idx"
          ></fraction-item>
        </v-layout>
      </v-flex>
      <v-flex xs2 class="indigo white--text" text-xs-right>
        <v-layout row wrap>


          <v-flex d-flex xs12 sm6 md4 pt-4>
            <v-card flat>
              <v-card-title class="display-1">
                {{ result.intNum }}
              </v-card-title>
            </v-card>
          </v-flex>
          <v-flex d-flex xs12 sm6 md3>
            <v-layout row wrap>
              <v-flex d-flex class="numerator">
                <v-card flat>
                  <v-card-text class="headline" v-text="result.numerator"></v-card-text>
                </v-card>
              </v-flex>
              <v-flex d-flex>
                <v-card flat>
                  <v-card-text class="headline" v-text="result.denominator"></v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12>
        <v-btn @click="addFraction" :disabled="disabled">{{ btnText }}</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { Fraction } from 'fractional';
import FractionItem from './Fraction';

export default {
  name: 'FractionsCalc',

  components: {
    FractionItem,
  },

  data() {
    return {
      disabled: false,

      btnText: 'add fraction',

      items: [
        { numerator: 1, denominator: 2 },
        { operator: '+' },
        { numerator: 2, denominator: 6 },
      ],

      operators: {
        '+': (a, b) => a.add(b),
        '-': (a, b) => a.subtract(b),
        '*': (a, b) => a.multiply(b),
        '/': (a, b) => a.divide(b),
      },
    };
  },

  methods: {
    round(n) {
      return Math.round(n * 100) / 100;
    },
    addFraction() {
      this.items.push({ operator: '+' }, { numerator: '1', denominator: '1' });
      if (this.items.length > 10) {
        this.disabled = true;
        this.btnText = 'go to perelman!';
      }
    },
  },

  computed: {
    result() {
      let currentOp = '+';

      let result = '0';

      this.items.forEach((item, idx) => {
        const { numerator, denominator, operator } = item;

        if (!idx) {
          result = new Fraction(numerator * 1, denominator * 1);
        } else if (operator) {
          currentOp = operator;
        } else if (numerator && denominator) {
          if (!this.operators[currentOp]) {
            return;
          }
          result = this.operators[currentOp](result, new Fraction(numerator * 1, denominator * 1));
        }
      });

      const [intNum, fract] = result.toString().split(' ');
      const [numerator, denominator] = fract ? fract.split('/') : intNum.split('/');
      return { intNum: fract ? intNum : null, numerator, denominator };
    },
  },
};
</script>

<style scoped>
.numerator {
  border-bottom: 2px solid white;
}
</style>
