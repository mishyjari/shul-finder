## Shul Finder

## Vision:
An interactive map application listing synagogues near the user or given any particular parameters (location, movement, etc)

## Progress
- Initial stage; building a web scraper to pull data on synagogues from [Maven Search](http://www.mavensearch.com/synagogues/synagogues.asp). They have a fairly thorough library of synagogues internationally, but it is organized in inconsistent tables with minimal metadata. Edge case results are being ironed out. 
- Set up router with Express.js and database with MongoDB. Results from scraper now stored in database for retrival
- Search box will find results by name, city or state, including partials and case insensitive
- Filter by different movements. Currently fetches all movements from the database to generate a list. This data needs to be normalized, and could probably be made static to reduce network traffic
- If user has location services, the application will run a search based on the name of their town (reverse geocode via mapbox).
- Currently set to a max results per load of 10. If additional results are present, will render a load more button which will fetch the next 10 results from the database
- Filters menu will actively filter by movement name. 
- When an active search is present, a span containing an x will render to reset that search
- Cards have collapsible detailed view
- Apple Mapkit:
  - Map renders and will create an annotation at user location if location services are enabled
  - Searching will pass results through mapbox geocoding to return coordinates and create annotation at that point. Currently limited to 10 results for dev purposes. Annotations should be static data to prevent taxing mapbox api
  
## To Do
- Searching
  - Allow for sorting by different fields
  - More dynamic and specific searches, map search strings onto objects
- Geoloation
  - Handle errors in reverse geocode requests, allow for auto searching beyond just their town
  - Geocode addresses and link to map
  - Allow for searching withing a given radius of a location
- User Interface
  - Overall layout and style
  - Preview and show pages for each result
  - Map view
    - Annotations should be static to prevent taxing mapbox api
    - Create styles and dynamic interaction for annotations
    - Search by radius, default to results near users location
  - Create mobile-responsive design
  - Link to webpage for each shul
- Data
  - Current data is incomplete per inconsistencies on mavensearch. Refine scraper as much as possible and manually fix remaining errors