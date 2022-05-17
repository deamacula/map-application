<template>
  <div class="container">
    <div class="header">
      <div class="left-header">
        <img src='~/assets/img/DB_Logo.png' class="logo">
        <h1 class="title">Map App</h1>
        <b-button v-b-modal.modal-prevent-closing class="button--green">Add Point</b-button>
      </div>
    </div>
    <!-- Building map with Leaflet -->
    <div id="map-wrap" class="map" style="position: absolute; width: 60%;">
      <no-ssr>
        <l-map :zoom="3" :center="[52.48164558821036, 13.35704783445724]">
          <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tile-layer>
          <l-marker v-for="(point, index) in points" :key="index"
            :lat-lng="[point.properties.lat_y, point.properties.long_x]">
            <l-popup>
              {{ point.properties.name }}
            </l-popup>
          </l-marker>
        </l-map>
      </no-ssr>
    </div>
    <div class="json-code">
      <div class="top">
        <b-icon-code-square></b-icon-code-square><span>JSON</span>
      </div>
      <div class="body-code">
        <pre> {{ JSON.stringify(points, null, 2) }} </pre>
      </div>
    </div>
    <!-- Creating Popup modal form -->
    <div>
      <b-modal id="modal-prevent-closing" ref="modal" title="Add new Point" @show="resetModal" @hidden="resetModal" @ok="handleOk">
        <form ref="form" @submit.stop.prevent="handleSubmit">
          <b-form-group label="Name" label-for="name-input" invalid-feedback="Name is required" :state="nameState">
            <b-form-input id="name-input" v-model="name" :state="nameState" required ></b-form-input>
          </b-form-group>
          <b-form-group label="Elevation" label-for="elevation-input" invalid-feedback="Elevation is required" :state="nameState">
            <b-form-input id="elevation-input" v-model="elevation" :state="elevationState" required></b-form-input>
          </b-form-group>
          <b-form-group label="Comment" label-for="comment-input" invalid-feedback="Comment is required" :state="commentState">
            <b-form-input id="comment-input" v-model="comment" :state="commentState" required></b-form-input>
          </b-form-group>
          <b-form-group label="Lat Y" label-for="latY-input" invalid-feedback="Lat Y is required" :state="latYState">
            <b-form-input id="latY-input" v-model="latY" :state="latYState" required type="number"></b-form-input>
          </b-form-group>
          <b-form-group label="Lat X" label-for="latX-input" invalid-feedback="Lat X is required" :state="latXState">
            <b-form-input id="latX-input" v-model="latX" :state="latXState" required></b-form-input>
          </b-form-group>
          <b-form-group label="Region" label-for="region-input" invalid-feedback="Region is required" :state="regionState">
            <b-form-input id="region-input" v-model="region" :state="regionState" required></b-form-input>
          </b-form-group>
          <b-form-group label="Feature Class" label-for="featureclass-input" invalid-feedback="Feature Class is required" :state="featureclassState">
            <b-form-input id="featureclass-input" v-model="featureclass" :state="featureclassState" required>
            </b-form-input>
          </b-form-group>
        </form>
      </b-modal>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      points: [],
      name: '',
      nameState: null,
      elevation: '',
      elevationState: null,
      comment: '',
      commentState: null,
      latY: '',
      latYState: null,
      latX: '',
      latXState: null,
      region: '',
      regionState: null,
      featureclass: '',
      featureclassState: null
    }
  },
  methods: {
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity()
      this.nameState = valid
      this.elevationState = valid
      this.commentState = valid
      this.latYState = valid
      this.latXState = valid
      this.regionState = valid
      this.featureclassState = valid
      return valid
    },
    resetModal() {
      this.name = ''
      this.nameState = null
      this.elevation = ''
      this.elevationState = null
      this.comment = ''
      this.commentState = null
      this.latY = ''
      this.latYState = null
      this.latX = ''
      this.latXState = null
      this.region = ''
      this.regionState = null
      this.featureclass = ''
      this.featureclassState = null
    },
    handleOk(bvModalEvent) {
      // Prevent modal from closing
      bvModalEvent.preventDefault()
      // Trigger submit handler
      this.handleSubmit()
    },
    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return
      }
      // Push the point to Points List
      var temp = {
        "type": "Feature",
        "properties": {
          "scalerank": 2,
          "name": this.name,
          "elevation": this.elevation,
          "comment": this.comment,
          "name_alt": null,
          "lat_y": this.latY,
          "long_x": this.latX,
          "nation1": null,
          "nation2": null,
          "note": null,
          "region": this.region,
          "subregion": null,
          "featureclass": this.featureclass
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            37.35325164703161,
            -3.075714746279047
          ]
        }
      }
      //this.points = [temp].concat(this.points)
      this.points.push(temp)
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide('modal-prevent-closing')
      })
    }
  },
  async fetch() {
    var json = await fetch(
      'http://127.0.0.1:3000/getPoints'
    ).then(res => res.json())
    this.points = json.features
  }
};
</script>
<style>
/* Calling css file */
@import '~/assets/style/style.css';
</style>

