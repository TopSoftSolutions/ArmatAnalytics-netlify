<template>
<div>
  <b-row v-for="(contact, index) in this.contactUs" :key="index" class="justify-content-center bg" id="contact">
    <b-col cols="12" class="text-center bg-white">
      <h1 class="contact">{{ contact.title }}</h1>
    </b-col>
    <b-col md="5" lg="5" sm="12">
     <div class="card shadow-0 border-0 pt-4">
          <ul style="list-style: none">
            <li class="py-2">
              <span class="me-3">
                <img src="/images/location.png" alt="" />
              </span>
              <span>{{ contact.location }}</span>
            </li>
            <li class="py-2">
              <span class="me-3">
                <img src="/images/client.png" alt="" />
              </span>
              <span>{{ contact.address }}</span>
            </li>
            <li class="py-2">
              <span class="me-3">
                <img src="/images/message.png" alt="" />
              </span>
              <span>{{ contact.email }}</span>
            </li>
            <li class="w-75">
              <hr />
            </li>
            <li class="py-2">
              <span class="me-3">
                <img src="/images/calendar.png" alt=""/>
              </span>
              <span>{{ contact.date }}</span>
            </li>
            <li class="py-2">
              <span class="me-3">
                <img src="/images/phone.png" alt="" />
              </span>
              <span>{{ contact.number }}</span>
            </li>
            <li class="py-2">
              <span class="me-3">
                <img class="linkedin-icon" src="/images/linkedin.png" alt="" />
              </span>
              <span>
                <a class="linkedin" :href="contact.linkedin" target="_blank">Follow us for updates</a>
              </span>
            </li>
          </ul>
        </div>
    </b-col>
    <b-col md="5" lg="5" sm="12">
      <div id="map-container-google" class="z-depth-1-half map-container">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3046.9500483849088!2d44.52720531568784!3d40.210174076099264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x406aa2cbf9b30759%3A0x64ece0a4c1151b7f!2sYeraz%20Business%20Center!5e0!3m2!1sen!2s!4v1676398198266!5m2!1sen!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </b-col>
  </b-row>
</div>

</template>
<script>
export default {
  name: "ContactUs",
  data() {
    return { contactUs: [] };
  },
  async fetch() {
    this.contactUs = await this.$content('contactus', { deep: true }).fetch();
  }
};
</script>
<style>
.contact {
  padding: 5rem;
}

.row .card, .row.bg {
  background-color: #f9fbfc;
}

#contact h1 {
  font-size: 45px;
  font-weight: 600;
  color: #263e52;
}

.linkedin, .linkedin:hover {
  color: #263e52;
  text-decoration: none;
}

.linkedin:hover {
  color: #4f6b81;
}

.linkedin-icon{
  margin-bottom: .5rem;
}
</style>
