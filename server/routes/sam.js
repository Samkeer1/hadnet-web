/* eslint-disable no-console */
const router = require('express').Router();
const axios = require('axios');
const { addBusiness } = require('../../database/helpers');

/**
 ********* requests to these endpoints must be preceded by: '/api/sam' ********
 */

/**
  * get requests to '/' take in a zip code as part of the request's params, and query the SAM
  * API for minority owned businesses that share request's zip code.
  *
  * after results are returned, they are filtered based on field codes corresponding with
  * African American owned businesses. This functionality seeds the database with verified
  * businesses.
  * The addresses associated with these businesses are used to retrieve coordinates to place
  * businesses on the map view.
  */
router.get('/:zip', (req, res) => {
  const { zip } = req.params;
  console.log('request made');
  axios.get('https://api.data.gov/sam/v3/registrations', {
    params: {
      api_key: process.env.SAM_API_KEY,
      qterms: `(minorityOwned:true)+AND+(samAddress.zip:${zip})`,
      start: 1,
      length: 4,
    },
  })
    .then((results) => {
      const dataList = results.data.results;
      const links = dataList.map(listing => listing.links[0].href);
      console.log(links);
      const promises = links.map(link => axios.get(link, {
        params: {
          api_key: process.env.SAM_API_KEY,
        },
      }));
      return Promise.all(promises);
    })
    .then((results) => {
      results.forEach((result) => {
        const listing = result.data.sam_data.registration;
        const businessEntry = {
          name: listing.legalBusinessName,
          phoneNumber: listing.electronicBusinessPoc.usPhone,
          email: listing.electronicBusinessPoc.email,
          urlHomepage: null,
          address: `${listing.samAddress.line1} ${listing.samAddress.city}, ${listing.samAddress.stateorProvince} ${listing.samAddress.zip}-${listing.samAddress.zipPlus4}`,
          latitude: null,
          longitude: null,
          averageRating: 0,
          legalBusinessName: listing.legalBusinessName,
        };
        const streetNum = listing.samAddress.line1.split(' ')[0];
        const streetAdd = listing.samAddress.line1.split(' ');
        streetAdd.shift();
        const street = encodeURI(streetAdd.join(' ').trim());
        axios.get(`https://api.tomtom.com/search/2/structuredGeocode.json?countryCode=USA&streetNumber=${streetNum}&streetName=${street}&municipality=New%20Orleans&countrySubdivision=Louisiana&postalCode=${listing.samAddress.zip}&extendedPostalCodesFor=Addr&key=${process.env.MAPS_API_KEY}`
        )
          .then((results) => {
            const latitude = results.data.results[0].position.lat;
            const longitude = results.data.results[0].position.lon;
            console.log(latitude, longitude);
            businessEntry.latitude = latitude;
            businessEntry.longitude = longitude;
            if (listing.businessTypes.includes('OY')) {
              addBusiness(businessEntry)
                .then((result) => {
                });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
