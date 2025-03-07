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
                  placeholder="Name*"
                ></b-form-input>
              </b-col>
              <b-col col lg="6" md="6" sm="6">
                <b-form-input
                  class="border-blue"
                  size="lg"
                  type="text"
                  name="surname"
                  placeholder="Surname*"
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
                  placeholder="Phone Number*"
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
                  placeholder="Email*"
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
                <b-button type="submit" class="w-100 apply-button" size="lg" variant="primary">Submit</b-button>
              </b-col>
            </b-row>
            <b-row class="mt-4">
              <b-col class="text-center">
                <h5 :class="`${submitMessageColor}`" v-if="submitMessage">{{ submitMessage }}</h5>
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
      submitMessage: null,
      submitMessageColor: ""
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
    validateFields(fields) {
      if (!fields.name) return 'Please enter your name.';
      if (!fields.surname) return 'Please enter your surname.';
      if (!fields.phonenumber) return 'Please enter your phone number.';
      if (!fields.email) return 'Please enter your email.';
      return null; // No errors
    },
    sendEmail(payload) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
          user: process.env.SMTP_USERNAME,
          pass: process.env.SMTP_PASSWORD,
        },
        secure: false,
        requireTLS: true,
      })

      const mailOptions = {
        from: `${process.env.SMTP_SENDER_NAME} <${process.env.SMTP_SENDER_EMAIL}>`,
        to: payload.email,
        subject: 'Application Confirmation',
        text: `Dear ${payload.name},\n\n

          Thank you for applying for the ${payload.vacancy} position at Armat Analytics. We have received your application and will review it shortly. If your qualifications match our needs, we will contact you for the next steps.\n\n
          
          Best regards,\n
          Armat Analytics`,
      }

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(`Failed to send email. Error: ${error.message}`)
          return {
            statusCode: 500,
            body: JSON.stringify({ error: err.message }),
          }
        } else {
          console.log('Email sent successfully:', info)
          return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Email sent successfully!' }),
          }
        }
      })
    },
    async onSubmit(event) {
      try {
        event.preventDefault(); // Prevent default form submission

        const formData = new FormData(event.target);
        
        // Get form values and trim text inputs
        const fields = {
          name: formData.get('name')?.trim(),
          surname: formData.get('surname')?.trim(),
          phonenumber: formData.get('phonenumber')?.trim(),
          email: formData.get('email')?.trim(),
        };

        // Validate required fields
        const errorMessage = this.validateFields(fields);
        if (errorMessage) {
          this.submitMessageColor = "text-danger";
          this.submitMessage = errorMessage;
          return;
        }

        // Wait for the reCAPTCHA token
        await this.$recaptcha.getResponse();
        
        // Submit the form to Netlify
        const response = await fetch(process.env.SUBMISSION_URL, {
          method: "POST",
          body: formData,
        });

        // Throw an error if the response was not successful
        if (!response.ok) {
          console.log(response);
          throw new Error("Response was not successful");
        }

        // Say thank you and reset reCAPTCHA
        this.submitMessageColor = "text-success";
        this.submitMessage = "Application successfully submitted. Thank you!";
        await this.$recaptcha.reset();

        // Clear the form inputs
        event.target.reset();
        document.getElementById("file-input-text").innerText = "No file chosen";
      } catch {
        // Error message if something goes wrong
        this.submitMessageColor = "text-danger";
        this.submitMessage = "Something went wrong, please try again.";
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