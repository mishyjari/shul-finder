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
  
## To Do
- Searching
  - Allow for sorting by different fields
  - Filters should take multiple options
  - Allow users to select number results per page
- Geoloation
  - Handle errors in reverse geocode requests, allow for auto searching beyond just their town
  - Geocode addresses and link to map
  - Allow for searching withing a given radius of a location
- User Interface
  - Overall layout and style
  - Preview and show pages for each result
  - Map view
    - Integrate with Apple Mapkit, provide user location and overviews with pins for each shul
  - Create mobile-responsive design
  - Link to webpage for each shul
- Data
  - Current data is incomplete per inconsistencies on mavensearch. Refine scraper as much as possible and manually fix remaining errors
- Views
  - Factor into partials