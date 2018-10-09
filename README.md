Scrapes and download images from http://ecosia.org with list of search queries stored in .csv file and then groups them automatically into there appropriate folders. Created the scrapper while I was collaborating with @Emmarex on Vegetables recognition and classification Model to make a dataset to use to train the AI.

## How to use
Clone this repository and the install the dependencies.
```
    npm install
```
Then run, in the project folder run the following command
```
    // node scrap [pathToTheCSVFile] [numberOfPicturesPerQuery]
    // for example
    node scrap ./veg.csv 5
```
An that is it :-)

### Options
- `[pathToTheCSVFile]`            The path to the csv file that contains queries to scrape from ecosia.org (default: ./veg.csv)
- `[numberOfPicturesPerQuery]`    Number of pictures to scrape per query. (default: 4)


### License
[The MIT License](LICENSE.md)

