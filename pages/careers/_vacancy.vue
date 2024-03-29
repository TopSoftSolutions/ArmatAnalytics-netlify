<template>
  <div>
    <div id="submit-wrap" v-for="(elem, index) in submitWrap" :key="index">
      <section class="img-overlay-color" :style="{ '--overlaycolor': elem.color }">
        <b-container fluid class="bv-row bv-row-flex-cols pt-5 img-responsive">
          <b-row class="text-center pt-5">
            <b-col align-self="center" cols="12" class="text">
              <div>
                <span class="pt-lg-5 wrap-body">{{ $route.params.vacancy }}</span>
              </div>
            </b-col>
          </b-row>
        </b-container>
        <div class="img-responsive-wrap" :style="{ backgroundImage: 'url(' + elem.image + ')' }"></div>
      </section>
    </div>
    <!-- Application form Start -->
    <b-container fluid="sm" class="submit-container py-5">
      <b-card class="border-0 shadow-r" style="border-radius: 10px">
        <b-card-body>
          <form :name="$route.params.vacancy"
                method="POST"
                enctype="multipart/form-data"
                data-netlify="true"
                data-netlify-recaptcha="true"
                @submit.prevent="onSubmit">
            <input type="hidden" name="form-name" :value="$route.params.vacancy" />
            <b-row class="my-3">
              <b-col col lg="6" md="6" sm="6">
                <b-form-input
                  class="border-blue"
                  size="lg"
                  type="text"
                  name="name"
                  placeholder="Name"
                ></b-form-input>
              </b-col>
              <b-col col lg="6" md="6" sm="6">
                <b-form-input
                  class="border-blue"
                  size="lg"
                  type="text"
                  name="surname"
                  placeholder="Surname"
                ></b-form-input>
              </b-col>
            </b-row>
            <b-row class="my-5">
              <b-col col lg="12" md="12" sm="12">
                <b-form-input
                  class="border-blue"
                  size="lg"
                  type="tel"
                  name="phonenumber"
                  placeholder="Phone Number"
                ></b-form-input>
              </b-col>
            </b-row>
            <b-row class="my-5">
              <b-col col lg="12" md="12" sm="12">
                <b-form-input
                  class="border-blue"
                  size="lg"
                  type="email"
                  name="email"
                  placeholder="Email"
                  trim
                ></b-form-input>
              </b-col>
            </b-row>
            <b-row class="my-5">
              <b-col col lg="12" md="12" sm="12">
                <p class="font-weight-bold">If there is anything you would like us to know, please write below:</p>
                <b-form-textarea
                  class="border-blue"
                  rows="8"
                  size="lg"
                  name="message"
                  placeholder="Message (Please type your inquiry in detail.) "
                  trim
                ></b-form-textarea>
              </b-col>
            </b-row>
            <b-row class="my-5">
              <b-col col lg="12" md="12" sm="12">
                <b-form-file id="input-file" name="resume" size="lg" @change="previewFiles"></b-form-file>
                <b-button type="button" size="lg" class="w-100 attach-button" @click="chooseFiles()">
                  <b-img class="attach-image" src="/images/attach-svgrepo-com-1.png"></b-img>
                  <span id="file-input-text">Attach Resume</span>
                </b-button>
              </b-col>
            </b-row>
            <recaptcha />
            <b-row class="mt-5">
              <b-col col lg="12" md="12" sm="12">
                <b-button type="submit" class="w-100 apply-button" size="lg" variant="primary">Apply</b-button>
              </b-col>
            </b-row>
            <b-row class="mt-4">
              <b-col class="text-center">
                <p v-if="submitMessage">{{ submitMessage }}</p>
              </b-col>
            </b-row>
          </form>
        </b-card-body>
      </b-card>
    </b-container>
    <!-- Application form End -->
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  name: 'SubmitPage',
  data() {
    return {
      submitMessage: null
    }
  },
  methods: {
    chooseFiles() {
      document.getElementById('input-file').click()
    },
    previewFiles(event) {
      let files = event.target.files
      if (files.length > 0) {
        document.getElementById('file-input-text').innerText = files[0].name
      }
    },
    async onSubmit(event) {
      try {
        // Wait for the reCAPTCHA token
        await this.$recaptcha.getResponse()
        // Submit the form to Netlify
        const response = await fetch('/', {
          method: 'POST',
          // headers: {
          //   'Content-Type': 'application/x-www-form-urlencoded'
          // },
          body: new FormData(event.target)
        })

        // Throw an error if the response was not successful
        if (!response.ok) {
          console.log(response)
          throw new Error('Response was not successful')
        }

        // Say thank you and reset reCAPTCHA
        this.submitMessage = 'Your application was submitted successfully!'
        await this.$recaptcha.reset()
      } catch {
        // Error message if something goes wrong
        this.submitMessage = 'Something went wrong, please try again.'
      }
    }
  },
  async asyncData({ $content }) {
    let submitWrap = await $content('submitwrap').fetch()

    return {
      submitWrap,
    }
  },
}
</script>

<style>
.wrap-body {
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 2.8em;
  color: white;
  font-weight: 600;
}

.img-overlay-color {
  background-color: var(--overlaycolor);
  height: 35vh;
  position: relative;
  opacity: 0.9;
}

.img-responsive-wrap {
  position: absolute;
  left: 0;
  top: 0;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  height: 35vh;
  opacity: 0.2;
}

.wrap-body {
  z-index: 99;
  position: relative;
}

.submit-container {
  max-width: 700px;
}

.shadow-r {
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 35px;
}

.border-blue {
  border: 1px solid #72aff7;
}

.apply-button {
  background-color: #72aff7;
  border-color: #72aff7;
}

.b-form-file {
  display: none !important;
}

.attach-button {
  background-color: #fff;
  color: #72aff7;
  border-color: #72aff7;
}

.attach-button:hover,
.attach-button:focus {
  background-color: #72aff7;
  color: #fff;
  border-color: #72aff7;
}

.attach-button:hover .attach-image,
.attach-button:focus .attach-image {
  filter: brightness(0) invert(1);
}

::placeholder {
  /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: #6d6d6d !important;
  opacity: 0.3 !important;
}

:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: #6d6d6d !important;
  opacity: 0.3 !important;
}

::-ms-input-placeholder {
  /* Microsoft Edge */
  color: #6d6d6d !important;
  opacity: 0.3 !important;
}
</style>