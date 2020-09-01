from bs4 import BeautifulSoup
import requests
import json

# Create inital response object
url = 'http://www.mavensearch.com/synagogues/synagogues.asp'
res = requests.get(url, timeout=5)
content = BeautifulSoup(res.content, 'html.parser')

# This page is -mostly- a list of links to countries (except for US, which lists states)
links = content.findAll('a')

# Find all links pointing to a country or state => ['Country Name', Relative URL]
countryUrls = [[link.contents[0],link.attrs['href']] for link in links if link.attrs['href'].find('synagogues/C') >= 0]

# US Points to states, fortunately the URLS are sequential, so we can just pull 298-398
statesUrls = [url for url in countryUrls if int(url[1][-3:]) > 297 and int(url[1][-3:]) < 349]

# Just focusing on US States:

# Take the relative url for a states page and return the cities and towns [name, url]
def visitState(url):
    stateUrl = 'http://www.mavensearch.com' + url
    stateRes = requests.get(stateUrl, timeout=5)
    stateContent = BeautifulSoup(stateRes.content, 'html.parser')

    townUrls = [[link.contents[0],link.attrs['href']] for link in stateContent.findAll('a') if link.attrs['href'].find('synagogues/C') >= 0 and len(link.attrs['href']) > len(url)+2]
    return townUrls

# Get all synagogues within a town's page
def getSynagogues(url):
    townUrl = 'http://www.mavensearch.com' + url
    townRes = requests.get(townUrl, timeout=5)
    townContent = BeautifulSoup(townRes.content, 'html.parser')


    # Navigating these tables is tricky since theres very little meta data,
    # Everything must be done relativistically, so there winds up being a lot of bad data,
    # Especially since the data is populated so inconsistently

    # The only cells which will contain a link to /map are data cells for a synagogue
    # Create a list of these cells using these parameters
    links = townContent.findAll('a')
    synagogueTables = [link.parent.parent.parent.parent for link in links if link.attrs['href'].find("/synagogues/map/") >= 0]

    synagogues = []
    for synagogue in synagogueTables:

        # This data needs to be broken up in a more efficient way, slicing by index is inconsistent
        # And traversing sequentially wont work either
        body = synagogue.findAll('td')
        data = body[2:-2]

        # Using a try..except to handle compilation errors from bad data
        try:
            synagogueData = {
                'name': body[0].contents[0].strip() or '',
                'url': body[1].a['href'].strip() or '',
                'address': body[2].contents[0].strip() or '',
                'city': synagogue.findAll('a', href=url)[0].contents[0].strip() or '',
                'zip': synagogue.findAll('a', href=url)[0].parent.contents[1].strip() or '',
                'phone': data.pop().contents[0].split("\n")[0].replace('Tel: ', '').strip() or '',
                'movement': data[-1].contents[0].strip() or '',
            }

            for pair in synagogueData.items():
                # Some data will come out as its html tag, which the json writer doesnt like
                # Just make it a string for now.
                if str(pair[1]) != pair[1]:
                    synagogueData[pair[0]] = str(pair[1])

            synagogues.append(synagogueData)
        except:
            # Something's bad, just dump all the td elements into a string for debugging
            synagogues.append({"ERROR": str(body)})

    return synagogues

usSynagogues = {}

# Loop over the states and create one large dictionary

for state in statesUrls:
    synagogues = []

    towns = visitState(state[1])

    for town in towns:
        try:
            synagogueData = {
                town[0]: getSynagogues(town[1])
            }
            synagogues.append(synagogueData)
        except:
            synagogues.append({'ERROR': town})

    try:
        usSynagogues[state[0]].append(synagogues)
    except:
        usSynagogues[state[0]] = [synagogues]


with open('synagogues.json', 'w') as outfile:
    json.dump(usSynagogues, outfile)
