<template>
  <v-container grid-list-xs text-xs-center>
    <v-layout row wrap>
      <v-flex xs12>
        <v-layout row>
          <v-flex xs12 sm6 offset-sm3>
            <v-card>
              <v-toolbar color="cyan" dark>
                <v-toolbar-side-icon></v-toolbar-side-icon>
                <v-toolbar-title v-if="!isNamed">Comments</v-toolbar-title>
                <v-toolbar-title v-else>{{ name }}'s comments </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon>
                  <v-icon>search</v-icon>
                </v-btn>
              </v-toolbar>
              <v-list three-line>
                <template v-for="(comment, idx) in comments">
                  <v-subheader v-if="comment.system" :key="idx">
                    {{ comment.system }}
                  </v-subheader>
                  <v-list-tile
                    v-else
                    avatar
                    :key="comment.title"
                  >
                    <!-- @click="sendMessage(idx)" -->
                    <v-list-tile-avatar>
                      <img :src="comment.avatar">
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      <v-list-tile-title v-html="comment.name"></v-list-tile-title>
                      <v-list-tile-sub-title v-html="comment.comment"></v-list-tile-sub-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                      <v-btn icon ripple @click="removeMessage(comment.id)">
                        <v-icon color="grey lighten-1">cancel</v-icon>
                      </v-btn>
                    </v-list-tile-action>
                  </v-list-tile>
                  <v-divider
                    v-if="idx < comments.length - 1"
                    inset
                    :key="`${idx}-divider`"
                  ></v-divider>
                </template>
              </v-list>
              <v-card-text>
                <v-text-field
                  v-if="!isNamed"
                  name="name"
                  label="Name"
                  id="name"
                  v-model="name"
                  @keyup.13="setName"
                ></v-text-field>
                <v-text-field
                  v-else
                  name="comment"
                  label="Comment"
                  id="comment"
                  solo-inverted
                  v-model="comment"
                  @keyup.13="sendMessage"
                ></v-text-field>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'WebSocket',

  data() {
    return {
      ws: null,

      name: '',
      isNamed: false,

      comment: '',

      comments: [],
    };
  },

  beforeMount() {
    const wsUri = 'ws://echo.websocket.org/';

    this.ws = new WebSocket(wsUri);
    this.ws.onopen = (evt) => {
      this.onOpen(evt);
    };
    this.ws.onclose = (evt) => {
      this.onClose(evt);
    };
    this.ws.onmessage = (evt) => {
      this.onMessage(evt);
    };
    this.ws.onerror = (evt) => {
      this.onError(evt);
    };
  },

  methods: {
    setName() {
      this.isNamed = true;
    },

    sendMessage() {
      if (!this.comment) {
        return;
      }

      this.ws.send(
        JSON.stringify({
          id: this.comments.length + 1,
          name: this.name,
          comment: this.comment,
        }),
      );
      this.comment = '';
    },

    removeMessage(id) {
      this.ws.send(JSON.stringify({ remove: id }));
    },

    onOpen() {
      this.comments.push({ system: 'CONNECTED' });
    },
    onClose() {
      this.comments.push({ system: 'DISCONNECTED' });
    },
    onMessage(evt) {
      const comment = JSON.parse(evt.data);

      if (comment.remove) {
        const index = this.comments.findIndex(el => el.id === comment.remove);
        this.comments.splice(index, 1);
        return;
      }

      Object.assign(comment, { avatar: `https://avatars.io/twitter/${comment.name}` });

      this.comments.push(comment);
    },
    // eslint-disable-next-line no-unused-vars
    onError(evt) {
      this.comments.push({ system: 'ERROR' });
    },
  },
};
</script>

<style scoped>
.toolbar__title {
  color: white;
}
</style>
