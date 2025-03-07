<template>
    <div>
        <!-- Start wrap -->
        <section v-for="(key, index) in keyTosuccess" :key="index" class="careers-wrap"  :style="{backgroundImage: 'url(' + key.image + ')'}">
            <b-container class="pt-5">
                <b-row class="pt-4">
                    <b-col class="pt-lg-4 text-center">
                        <h2 class="wrap-title pt-lg-5">{{ key.title }}</h2>
                        <p class="pt-3 wrap-description">{{ key.description }}</p>
                    </b-col>
                </b-row>
            </b-container>
        </section>
        <!-- End wrap -->
        <!-- Start Why-join -->
        <div id="join-boxes" >
            <div id="why-join" class="text-center pt-5 bg-white">
                <h1 class="py-5 title">Why join Armat Analytics?</h1>
            </div>
            <b-container class="my-5 p-5">
                <div class="py-5">
                    <b-row class="row g-5">
                        <b-col class="mb-4" v-for="(why, index) in whyJoin" :key="index" md="6" lg="6" sm="12" >
                            <div class="shadow-w round-w bg-white h-100 p-2">
                                <b-row class="pt-4">
                                    <b-col md="2" class="text-center">
                                        <img class="align-item-center" :src="why.icon" alt="">
                                    </b-col>
                                    <b-col md="6" class="pt-2">
                                        <div class="text-lg-left text-md-left text-center">
                                        <h6 class="pb-2 box-t">{{ why.title }}</h6>
                                        </div>
                                    </b-col>
                                </b-row>
                                <b-row>
                                    <b-col md="2"></b-col>
                                    <b-col md="9">
                                        <p class="pb-3 box-d">{{ why.description }}</p>
                                    </b-col>
                                </b-row>
                            </div>
                        </b-col>
                    </b-row>
                </div>
            </b-container>
        </div>
     <!-- end Why-join -->
     <!-- Start The Root -->
        <section class="root pt-5" id="root">
            <b-container class="bv-example-row">
                <b-row class="text-center">
                    <b-col col lg="12">
                        <h1 class="title pb-5">The ROOT program</h1>
                    </b-col>
                </b-row>
                <b-row align-h="center" class="pb-5">
                    <b-col lg="5" order-lg="1" md="5" order-md="1" sm="12" order="1" class="text-lg-left">
                        <div class="pt-5">
                            <p class="root-p" v-html="$md.render(theRootProgram.filter(p => p.slug === 'mission')[0].description)"></p>
                        </div>
                    </b-col>
                    <b-col lg="5" order-lg="2" md="5" order-md="2" sm="12" order="2" class="text-lg-right">
                        <img class="img-fluid" :src=" theRootProgram.filter(p => p.slug === 'mission')[0].image" alt="">
                    </b-col>
                </b-row>
                <b-row align-h="center" class="ml-lg-5 pt-5">
                    <b-col lg="5" order-lg="1" md="5" order-md="1" sm="12" order="2" class="text-lg-left">
                        <div class="m-lg-3">
                           <img class="img-fluid me-lg-5" :src="theRootProgram.filter(p => p.slug === 'training')[0].image" alt="">
                        </div>
                    </b-col>
                    <b-col lg="5" order-lg="2" md="5" order-md="2" sm="12" order="1" class="text-lg-left">
                        <div class="pt-lg-5 ml-lg-5">
                            <p class="root-p" v-html="$md.render(theRootProgram.filter(p => p.slug === 'training')[0].description)"></p>
                        </div>
                    </b-col>
                </b-row>
                <b-row v-if="theRootSubjects.length > 0" class="py-5 root-subjects">
                    <b-col cols lg="12" md="12">
                        <img class="img-fluid dashed-curved-line" src="/images/vector-1.png" />
                    </b-col>
                    <b-col cols lg="2" md="2"></b-col>
                    <b-col cols lg="8" md="8" class="dashed-container pt-5">
                        <div class="text-center pb-1">
                            <h5 class="pb-5 pt-2 root-h5">{{ theRootSubjects[0].title }}</h5>
                        </div>
                        <b-row>
                            <b-col cols lg="6" md="6" class="d-sm-flex justify-content-center">
                                <ul class="purple-dot ul-font">
                                    <li v-for="(subject, index) in theRootSubjects[0].Subjects.slice(0, subjectsCount/2)" :key="index">
                                        {{ subject.title }}
                                    </li>
                                </ul>
                            </b-col>
                            <b-col cols lg="6" md="6" class="pb-5 d-sm-flex justify-content-center">
                                <ul class="blue-dot ul-font">
                                    <li v-for="(subject, index) in theRootSubjects[0].Subjects.slice(subjectsCount/2, subjectsCount)" :key="index">
                                        {{ subject.title }}
                                    </li>
                                </ul>
                            </b-col>
                        </b-row>
                    </b-col>
                    <b-col lg="12" md="12" sm="12">
                        <div class="text-center pt-5">
                        <p class="description" v-html="$md.render(theRootSubjects[0].description)"></p>
                        </div>
                        <div class="text-center py-5" id="sub-button">
                            <NuxtLink :to="`/careers/The ROOT program`" class="btn btn-primary btn-lg text-capitalize">Submit application</NuxtLink>
                        </div>
                    </b-col>
                </b-row>

            </b-container>
      </section>
     <!-- End The Root -->
    <!-- accordion -->
        <section class="section-background pb-5">
            <b-row class="text-center py-5">
                <b-col>
                <h1 class="title">Our vacancies</h1>
                </b-col>
             </b-row>
            <b-container class="accordion-container" id="accordion">
                <div v-for="(vacancy, index) in sortedVacancies" :key="index" class="accordion" role="tablist">
                    <b-card no-body class="accordion-item mb-2">
                        <b-card-header class="border-0 py-4 bg-transparent" role="tab">
                            <div class="left-border"></div>
                            <b-button class="accordion-button accordion-button-noborder d-flex justify-content-between"
                            block v-b-toggle="'accordion-' + index" variant="transparent">
                                <h6 class="mb-lg-0 text-left sas-font">{{ vacancy.title }}</h6>
                                <b-img class="plus-icon" src="/images/icons8-plus-50.png" width="30"></b-img>
                            </b-button>
                        </b-card-header>
                        <b-collapse :id="`accordion-${index}`" accordion="my-accordion" role="tabpanel">
                            <b-card-body class="accordion-body">
                                <b-card-text v-html="$md.render(vacancy.description)"></b-card-text>
                                <div class="text-lg-right my-3">
                                    <NuxtLink :to="`/careers/${vacancy.title}`" class="btn btn-primary btn-lg border-0 text-capitalize">Submit application</NuxtLink>
                                </div>
                            </b-card-body>
                        </b-collapse>
                    </b-card>
                </div>
            </b-container>
        </section>
      <!-- /accordion -->
    </div>
</template>

<script>
import _ from 'lodash'
export default {
    name: 'CareersPage',
    computed: {
        sortedVacancies() {
            return [...this.ourVacancies].sort((a, b) => a.orderKey - b.orderKey);
        }
    },
    async asyncData({ $content }) {
        let keyTosuccess = await $content('keytosuccess').fetch();
        let whyJoinContents = await $content('whyjoin').fetch();
        let whyJoin = _.orderBy(whyJoinContents, 'sortkey');
        let ourVacancies = await $content('ourvacancies').fetch();
        let theRootProgram = await $content('therootprogram').fetch();
        let theRootSubjects = await $content('therootsubjects').fetch();
        let subjectsCount = theRootSubjects[0].Subjects.length;
        return {
            keyTosuccess,
            whyJoin,
            theRootProgram,
            theRootSubjects,
            subjectsCount,
            ourVacancies
        }
    }
}
</script>

<style>


body {
    font-family:'Source Sans Pro', sans-serif;
}

button {
    display: block;
    border: none;
}

.row h6 {
    font-family: 'Poppins';
    font-size: 17px;
    font-weight: bold;
}

.careers-wrap {
    background-repeat: no-repeat;
    background-size: cover;
    height: 60vh;
}

.wrap-title {
    font-size: 2.375em;
    letter-spacing: .08rem;
    font-weight: 400;
    line-height: 1.2;
    color: white;
}

.wrap-description{
    font-size: 1.625em;
    font-weight: 300;
    letter-spacing: .08rem;
    color: white;
}

.shadow-w {
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 28px;
}
.round-w {
    border-radius: 1rem;
}

.box-d {
    font-size: 1.063em;
    font-family: 'Open Sans', sans-serif;
    font-weight: 400;
    color: #67748E;
}

.box-t {
    font-family: 'Open Sans', sans-serif;
    font-size: 1.375em;
    color: #252F40;
    font-weight: 600;
}

#join-boxes {
    background-color: #F9FBFC;
}



/* accordion */

.bg-transparent {
    box-shadow: none!important;
}
.accordion-container {
    max-width: 1100px;
}
.section-background {
    background-color: #F9FBFC;
}

.sas-font{
    font-weight: 600;
    font-size: 1.250em;
    color: #263E52;
}

.card-text {
    color: #263E52;
    opacity: .95;
    font-size: 1.063em;
}
#accordion .accordion-item {
    border: .12em solid #81C3FD;
    border-radius: 5px;

}

.card-header{
    position: relative;
    box-shadow: none!important;
}

.accordion-button-noborder:not(.collapsed){
    box-shadow: none!important;
    background-color: #F9FBFC!important;
}
.accordion-button-noborder.collapsed{
    background-color: #F9FBFC!important;
    box-shadow: none!important;
}

.card-header .left-border {
    background-color: #81C3FD;
    width: 5px;
    height: 25px;
    position: absolute;
    left: -1px;
    top: calc(50% - 10px);
    z-index: 2;
}


.plus-icon{
    transition: .3s;
}

.accordion-button:not(.collapsed) .plus-icon{
    transform: rotate(-137deg)!important;
    transition: .3s;
}

/* .accordion-button:not(.collapsed):after {
    transform: rotate(-137deg)!important;
}

.accordion-button:after {
    background-image: url(static/images/icons8-plus-50.png)!important;
} */

#accordion .btn-primary {
    background-color:var(--cornflowerblue-color);
    font-family: 'Source Sans Pro';
    font-size: 16px;
}

#accordion {
    background-color: #F9FBFC;
}

#accordion .accordion-item {
    background-color: transparent;
}

/* #accordion .accordion-header{
    box-shadow:#F9FBFC!important;
} */
/* /accordion */
/*  root */
.root-p {
    font-family: 'Source Sans Pro';
    font-size: 24px;
    color: var(--darkerblue-color);
}

.root-h2 {
    font-family: 'Source Sans Pro';
    font-weight: 600;
    color: var(--darkerblue-color);
}
.root-h5 {
    font-family: 'Source Sans Pro';
    font-weight: 600;
    color: var(--darkerblue-color);
    font-size: 20px;
}

.root-h2 .h2color {
    font-family: 'Source Sans Pro';
    font-weight: 600;
    color: var(--cornflowerblue-color);
    font-size: 32px;
}

.root {
    background-image: url('/images/Tracé\ 2.svg');
    background-size: 100vh 100%;
    position: relative;
    background-repeat: no-repeat;
    z-index: 10;
}

.root-subjects {
    position: relative;
}

.dashed-curved-line{
    position: absolute;
    bottom: 6vh;
    left: 7%;
    display: none;
}

.dashed-container{
    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='20' ry='20' stroke='rgba(0, 0, 0, 0.2)' stroke-width='3' stroke-dasharray='20%2c 20' stroke-dashoffset='100' stroke-linecap='square'/%3e%3c/svg%3e");
    border-radius: 1.250em;
}

.purple-dot {
    list-style-image: url('/images/purple-dot.png');
}

.blue-dot{
    list-style-image: url('/images/blue-dot.png');
}

.ul-font {
    font-size: 1.08em;
    color: #263E52;
    opacity: 0.9;
}

ul.ul-font li {
    margin-bottom: 0.5em;
}

#sub-button .btn {
    background-color: #81C3FD;
    border: none;
}

@media only screen and (min-width: 1366px) {
 .dashed-curved-line {
    display: block;
  }
}

/*  root */
</style>